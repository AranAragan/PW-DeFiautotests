"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const dappwright_1 = __importDefault(require("@tenkeylabs/dappwright"));
test_1.test.describe("Swap", () => {
    let wallet, gasopt, browserContext, testPage, _;
    test_1.test.beforeAll(async () => {
        [wallet, testPage, browserContext] = await dappwright_1.default.bootstrap("", {
            wallet: "metamask",
            version: "10.25.0",
            seed: 'whisper december wedding pet pig trouble sock orphan brass odor brain dry',
            password: 'YadQa123'
        });
    });
    (0, test_1.test)("Polygon MetaMask connect", async () => {
        await testPage.goto('https://yad.finance/');
        await testPage.getByRole("banner").getByRole("button", { name: "Launch App" }).click();
        await testPage.getByRole('banner').getByRole('button', { name: 'Ethereum' }).click();
        await testPage.getByRole('button', { name: 'Optimism' }).click();
        await testPage.getByRole('complementary').getByRole('button', { name: 'Connect Wallet' }).click();
        await testPage.getByRole('button', { name: 'Metamask' }).click();
        await wallet.approve();
        await testPage.getByRole('textbox').click();
        await testPage.getByRole('textbox').fill('0.000000001');
        await testPage.waitForTimeout(3000);
        await testPage.getByRole("button", { name: "SWAP" }).click();
        await wallet.confirmTransaction({
            gas: 4,
            priority: 3,
            gasLimit: 202020,
        });
        await testPage.waitForSelector('.mx-auto > .fixed > .z-\\[6\\] > .mt-5 > .h-10:nth-child(2)');
        await testPage.click('.mx-auto > .fixed > .z-\\[6\\] > .mt-5 > .h-10:nth-child(2)');
        await testPage.click('.Toastify__toast-body');
        await testPage.pause();
    });
});
