mport * as crypto from 'crypto';

const maxGetNonceAttempts = 100;

interface DeployerTransformerAddress {
  ChainID: number;
  Deployer: string;
  Transformer: string;
}

const deployersTransformersFileList: Record<string, Buffer> = {
  AffiliateFee: Buffer.from('...'), // Replace with actual file content
  FillQuote: Buffer.from('...'), // Replace with actual file content
  PayTaker: Buffer.from('...'), // Replace with actual file content
  PositiveSlippageFee: Buffer.from('...'), // Replace with actual file content
  SailRFQ: Buffer.from('...'), // Replace with actual file content
  WETH: Buffer.from('...'), // Replace with actual file content
};

interface NonceMap {
  [chainID: number]: Record<string, number>;
}

const nonceMap: NonceMap = {};

function loadNonce(): void {
  const tmpTfmAddrs: DeployerTransformerAddress[] = [];
  for (const tfmName in deployersTransformersFileList) {
    const tmfCfgData = deployersTransformersFileList[tfmName];
    tmpTfmAddrs.push(...JSON.parse(tmfCfgData.toString()));
  }

  for (const tfmAddr of tmpTfmAddrs) {
    const nonce = findTransformerNonce(tfmAddr.Transformer, tfmAddr.Deployer, maxGetNonceAttempts);

    if (nonce !== undefined) {
      const chainNonceList = nonceMap[tfmAddr.ChainID] || {};
      chainNonceList[tfmName] = nonce;
      nonceMap[tfmAddr.ChainID] = chainNonceList;
    }
  }
}

function findTransformerNonce(transformerAddr: string, deployerAddr: string, maxGuesses: number): number | undefined {
  if (deployerAddr === '0x0000000000000000000000000000000000000000') {
    throw new Error('empty address deployer');
  }

  if (transformerAddr === '0x0000000000000000000000000000000000000000') {
    throw new Error('empty address transformer');
  }

  const lowercaseTransformer = transformerAddr.toLowerCase();

  for (let nonce = 1; nonce < maxGuesses; nonce++) {
    const deployedTransformerAddress = getTransformerAddress(deployerAddr, nonce);

    if (deployedTransformerAddress === lowercaseTransformer) {
      return nonce;
    }
  }

  throw new Error('nonce not found');
}

function getTransformerAddress(deployerAddr: string, nonce: number): string {
  const data = rlpEncodeDeployerAndNonce(deployerAddr, nonce);
  const rlpHash = crypto.createHash('keccak256').update(data).digest();
  return rlpHash.slice(12).toString('hex');
}

function rlpEncodeDeployerAndNonce(deployerAddr: string, nonce: number): Buffer {
  const output: Buffer[] = [];
  output[0] = rlpEncodeStr(deployerAddr);
  output[1] = rlpEncodeUint32(nonce);

  const buf = Buffer.concat(output);

  const lenBuf = rlpEncodeLength(buf.length, 192);

  return Buffer.concat([lenBuf, buf]);
}

function rlpEncodeStr(input: string): Buffer {
  const inputBuf = rlpStrToBuffer(input);
  const lenBuf = rlpEncodeLength(inputBuf.length, 128);
  return Buffer.concat([lenBuf, inputBuf]);
}

function rlpEncodeUint32(input: number): Buffer