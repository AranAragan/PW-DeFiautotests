"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const commands_1 = __importDefault(require("../commands"));
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const url = "https://api.stage.yetanotherdefi.com/v1/1";
test_1.test.describe.configure({ mode: 'parallel' });
commands_1.default.GetTokens(true);
test_1.test.describe('Get price for pair', async () => {
    const array = JSON.parse(fs_1.default.readFileSync("./test.json").toString());
    const _address2 = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT
    array.forEach((_address) => {
        (0, test_1.test)(`${_address.symbol}: ${_address.address} to USDT: ${_address2}`, async ({ request }) => {
            if (_address.address == _address2) {
                console.log("Similar tokens");
            }
            else {
                let amountEtoNum = await commands_1.default.eToNumber(1 * 10 ** _address.decimals);
                let params = {
                    fromTokenAddress: _address.address,
                    toTokenAddress: _address2,
                    amount: amountEtoNum,
                    slippage: 1,
                    chainID: 1,
                    excludeAggregator: '1inch'
                };
                const agent = new https_1.default.Agent({
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
                let _response = await (0, axios_1.default)(config);
                (0, test_1.expect)(_response.status, `Response: ${await _response.statusText}`).toBe(200);
            }
        });
    });
});
