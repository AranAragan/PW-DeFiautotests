import { test } from '@playwright/test'
import axios from "axios"
import transformERC20 from "./abis/TransformERC20.json"
import payTaker from "./abis/PayTakerTransformer.json"
import weth from "./abis/WethTransformer.json"
import affiliateFee from "./abis/AffiliateFeeTransformer.json"
import positiveSlippageFee from "./abis/PositiveSlippageFeeTransformer.json"
import fillQuote from "./abis/FillQuoteTransformer.json"
import sailRFQ from "./abis/SailRFQTransformer.json"
import sailAdapterSwap from "./abis/sailadapter.json"
import { utils } from 'ethers'
import fs from 'fs'

const
    chainId = 1,
    calldataListResponseIndex = 4,
    abis: {
        [chainId: number]: {
            [index: number]: {
                abi: any;
                functionSelector: string
            }
        }
    } = {
        1: {
            0: {
                abi: transformERC20,
                functionSelector: "415565b0"
            },
            1: {
                abi: sailAdapterSwap,
                functionSelector: "832b24bb",
            },
            2: {
                abi: payTaker,
                functionSelector: "a668c39e",
            },
            3: {
                abi: affiliateFee,
                functionSelector: "2360557d",
            },
            5: {
                abi: positiveSlippageFee,
                functionSelector: "921475f9",
            },
            7: {
                abi: fillQuote,
                functionSelector: "",
            },
            8: {
                abi: sailRFQ,
                functionSelector: "1cbd5bdd",
            }
        }
    }

function addFunctionSelector(calldata: string, functionSelector: string): string {
    return "0x" + functionSelector + calldata.split("0x").pop()
}

test.describe("Quote", async () => {
    test('one', async () => {
        const params = {
            fromTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
            toTokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            amount: "10360626725435665415",
            slippage: "1",
            gasPrice: "16000000000",
            feeRecipient: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            // buyTokenPercentageFee: "1",
            includeAggregator: "odos"
        }
        const response = await axios({
            url: `https://api.stg.yetanotherdefi.com/v1/${chainId}/quote`,
            method: "get",
            params: { ...params },
        })
        // const defaultAbi = abis[chainId][0].abi
        // const defaultAbiInterface = new utils.Interface(defaultAbi)
        // const abiDecodedMethod = defaultAbiInterface.decodeFunctionData(defaultAbi[0].name, response.data.calldata)
        // fs.writeFileSync(__dirname + "/result.json", JSON.stringify(abiDecodedMethod, null, 4))
        // const calldataList = abiDecodedMethod.slice()[calldataListResponseIndex]
        // calldataList.forEach(c => {
        //     const abiNumber = c[0]
        //     const currentAbi = abis[chainId][abiNumber].abi
        //     const currentAbiName = abis[chainId][abiNumber].abi[0].name
        //     const currentAbiFunctionSelector = abis[chainId][abiNumber].functionSelector
        //     const currentAbiInterface = new utils.Interface(currentAbi)
        //     let currentCalldata = c["data"]
        //     try {
        //         currentCalldata = addFunctionSelector(currentCalldata, currentAbiFunctionSelector)
        //         const currentDecoded = currentAbiInterface.decodeFunctionData(currentAbiName, currentCalldata)
        //         fs.writeFileSync(`${__dirname}/${currentAbiName}.decoded.json`, JSON.stringify(currentDecoded, null, 4))
        //     } catch (e) {
        //         fs.writeFileSync(`${__dirname}/${currentAbi[0].name}.error.json`, JSON.stringify(e, null, 4))
        //     }
        // })
    })
})