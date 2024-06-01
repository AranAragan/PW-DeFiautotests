"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectWalletPOM = void 0;
class ConnectWalletPOM {
    constructor(testPage) {
        this.testPage = testPage;
    }
    async connectWalletSide() {
        await this.testPage.getByRole('banner').getByRole('button', { name: 'Connect Wallet' }).click();
    }
    async connectMetaMask() {
        await this.testPage.getByRole('button', { name: 'Metamask' }).click();
    }
}
exports.ConnectWalletPOM = ConnectWalletPOM;
