"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const dappwright_1 = __importDefault(require("@tenkeylabs/dappwright"));
const WidgetPom_1 = require("../POM/WidgetPom");
const NetworkPom_1 = require("../POM/NetworkPom");
const ConnectWalletPom_1 = require("../POM/ConnectWalletPom");
test_1.test.describe("Swap", () => {
    let wallet, browserContext, testPage, _;
    test_1.test.beforeAll(async () => {
        [wallet, testPage, browserContext] = await dappwright_1.default.bootstrap("", {
            wallet: "metamask",
            version: "10.25.0",
            seed: 'whisper december wedding pet pig trouble sock orphan brass odor brain dry',
            password: 'YadQa123'
        });
    });
    (0, test_1.test)("Fantom MetaMask connect", async () => {
        await wallet.importPK('0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0');
        await (0, test_1.expect)(wallet.addNetwork({ networkName: 'Testnet', rpc: 'http://localhost:8545', chainId: 1337, symbol: 'ETH',
        })).rejects.toThrowError(SyntaxError);
        await wallet.addNetwork({ networkName: "Fantom Opera", rpc: "https://ultra-smart-cherry.fantom.quiknode.pro/1cb977253f2aaf93c323069a90aa4d7f549f5a51/", chainId: 250, symbol: "FTM" });
        await wallet.switchNetwork('Localhost 8545');
        const widget = new WidgetPom_1.WidgetPOM(testPage);
        const network = new NetworkPom_1.NetworkPOM(testPage);
        const conwal = new ConnectWalletPom_1.ConnectWalletPOM(testPage);
        await testPage.goto("http://localhost:3000/250/exchange/btc/usdc");
        await testPage.evaluate(() => {
            localStorage["testNetwork"] = '{"maskId":"250"}';
        });
        await testPage.reload();
        // await testPage.getByRole("banner").getByRole("button", { name: "Launch App" }).click();
        await network.networksBanner();
        await network.networksTestNet();
        await conwal.connectWalletSide();
        await conwal.connectMetaMask();
        await wallet.approve();
        await widget.burgerWidget();
        await widget.placeholderCustom();
        await widget.placeholderCustomFill('30%');
        await widget.settingsOkButton();
        await testPage.waitForTimeout(3000);
        await widget.swapButton();
        await wallet.confirmTransaction();
        await testPage.waitForSelector('.mx-auto > .fixed > .z-\\[6\\] > .mt-5 > .h-10:nth-child(2)');
        await testPage.click('.mx-auto > .fixed > .z-\\[6\\] > .mt-5 > .h-10:nth-child(2)');
        await testPage.click('.Toastify__toast-body');
        await testPage.pause();
    });
});
