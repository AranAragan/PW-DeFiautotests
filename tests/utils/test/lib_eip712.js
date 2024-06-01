"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_test_utils_1 = require("@0x/contracts-test-utils");
const dev_utils_1 = require("@0x/dev-utils");
const utils_1 = require("@0x/utils");
const chai = __importStar(require("chai"));
const artifacts_1 = require("./artifacts");
const wrappers_1 = require("./wrappers");
contracts_test_utils_1.chaiSetup.configure();
const expect = chai.expect;
const blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(contracts_test_utils_1.web3Wrapper);
describe('LibEIP712', () => {
    let lib;
    before(async () => {
        await blockchainLifecycle.startAsync();
        // Deploy LibEIP712
        lib = await wrappers_1.TestLibEIP712Contract.deployFrom0xArtifactAsync(artifacts_1.artifacts.TestLibEIP712, contracts_test_utils_1.provider, contracts_test_utils_1.txDefaults, {});
    });
    after(async () => {
        await blockchainLifecycle.revertAsync();
    });
    /**
     * Tests a specific instance of EIP712 domain hashing.
     * @param lib The LibEIP712 contract to call.
     * @param name The name of the domain.
     * @param version The version of the domain.
     * @param chainId The chain id of the domain.
     * @param verifyingContract The verifying contract address of the domain.
     */
    async function testHashEIP712DomainAsync(name, version, chainId, verifyingContract) {
        const expectedHash = utils_1.signTypedDataUtils.generateDomainHash({
            name,
            version,
            chainId,
            verifyingContract,
        });
        const actualHash = await lib
            .externalHashEIP712DomainSeperator(name, version, new utils_1.BigNumber(chainId), verifyingContract)
            .callAsync();
        expect(actualHash).to.be.eq(utils_1.hexUtils.concat(expectedHash));
    }
    describe('_hashEIP712Domain', async () => {
        it('should correctly hash empty input', async () => {
            await testHashEIP712DomainAsync('', '', 0, contracts_test_utils_1.constants.NULL_ADDRESS);
        });
        it('should correctly hash non-empty input', async () => {
            await testHashEIP712DomainAsync('_hashEIP712Domain', '1.0', 62, lib.address);
        });
        it('should correctly hash non-empty input', async () => {
            await testHashEIP712DomainAsync('_hashEIP712Domain', '2.0', 0, lib.address);
        });
    });
    /**
     * Tests a specific instance of EIP712 message hashing.
     * @param lib The LibEIP712 contract to call.
     * @param domainHash The hash of the EIP712 domain of this instance.
     * @param hashStruct The hash of the struct of this instance.
     */
    async function testHashEIP712MessageAsync(domainHash, hashStruct) {
        // Remove the hex prefix from the domain hash and the hash struct
        const unprefixedDomainHash = domainHash.slice(2, domainHash.length);
        const unprefixedHashStruct = hashStruct.slice(2, hashStruct.length);
        // Hash the provided input to get the expected hash
        const input = '0x1901'.concat(unprefixedDomainHash.concat(unprefixedHashStruct));
        const expectedHash = utils_1.hexUtils.hash(input);
        // Get the actual hash by calling the smart contract
        const actualHash = await lib.externalHashEIP712Message(domainHash, hashStruct).callAsync();
        // Verify that the actual hash matches the expected hash
        expect(actualHash).to.be.eq(expectedHash);
    }
    describe('_hashEIP712Message', () => {
        it('should correctly hash empty input', async () => {
            await testHashEIP712MessageAsync(contracts_test_utils_1.constants.NULL_BYTES32, contracts_test_utils_1.constants.NULL_BYTES32);
        });
        it('should correctly hash non-empty input', async () => {
            await testHashEIP712MessageAsync('0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6', // keccak256(abi.encode(1))
            '0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace');
        });
        it('should correctly hash non-empty input', async () => {
            await testHashEIP712MessageAsync('0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace', // keccak256(abi.encode(2))
            '0xc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b');
        });
    });
});
