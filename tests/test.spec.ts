import { test, expect } from '@playwright/test';
import Tokens from "../commands"
import fs from 'fs';
import axios from "axios";
import https from 'https'

const url = "https://api.stage.yetanotherdefi.com/v1/1"
test.describe.configure({ mode: 'parallel' })

Tokens.GetTokens(true)
test.describe('Get price for pair', async () => {
    const array = JSON.parse(fs.readFileSync("./test.json").toString());
    const _address2 = "0xdAC17F958D2ee523a2206206994597C13D831ec7" // USDT
    array.forEach((_address: any) => {
            test(`${_address.symbol}: ${_address.address} to USDT: ${_address2}`, async ({ request }) => {
                if (_address.address == _address2) {
                    console.log("Similar tokens")
                }
                else {
                    let amountEtoNum: any = await Tokens.eToNumber(1 * 10 ** _address.decimals)
                    let params = {
                        fromTokenAddress: _address.address,
                        toTokenAddress: _address2,
                        amount: amountEtoNum,
                        slippage: 1,
                        chainID: 1,
                        excludeAggregator: '1inch'
                    }
                    const agent = new https.Agent({  
                        rejectUnauthorized: false
                      });

                    let config = {
                        method: 'get',
                        url: url + '/price',
                        headers: {
                            "Accept-Encoding": "*",
                            "X-API-Key": "83225f08-ef4a-4995-a2b6-440a98248b4b"
                        },
                        params: params,
                        httpsAgent: agent,
                    };
                    let _response = await axios(config);


                    expect(_response.status, `Response: ${await _response.statusText}`).toBe(200);
                    

                }

            })

    })

});