"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetPOM = void 0;
class WidgetPOM {
    constructor(testPage) {
        this.testPage = testPage;
        this.PlaceholderFill = this.testPage.getByPlaceholder('Custom');
    }
    async textBox() {
        await this.testPage.getByRole('textbox').first().click();
    }
    async textBoxFill() {
        await this.testPage.getByRole('textbox').first().fill('100');
    }
    async fromTokenBscDai() {
        await this.testPage.getByRole('button', { name: 'D Dai Token_logo DAI' }).click();
    }
    async toTokenBscUsdt() {
        await this.testPage.getByRole('link', { name: 'T Tether USD_logo USDT' }).click();
    }
    async burgerWidget() {
        await this.testPage.getByRole('complementary').locator('svg').first().click();
    }
    async placeholderCustom() {
        await this.testPage.getByPlaceholder('Custom').click();
    }
    async placeholderCustomFill(text) {
        await this.PlaceholderFill.fill(text);
    }
    async settingsOkButton() {
        await this.testPage.click('.mt-auto>button:nth-child(2)');
    }
    // async settingsResetButton(){
    //     await this.testPage.click('.mt-auto>button:nth-child(1)');
    // }
    async swapButton() {
        await this.testPage.getByRole("button", { name: "SWAP" }).click();
    }
    async fromTokenEthUsdt() {
        await this.testPage.getByRole('link', { name: 'T Tether USD_logo USDT' }).click();
    }
    async toTokenEthDai() {
        await this.testPage.getByRole('button', { name: 'D Dai Stablecoin_logo DAI' }).click();
    }
    async fromTokenMaticUsdt() {
        await this.testPage.getByRole('link', { name: 'A Aave Matic Market USDT_logo amUSDT' }).click();
    }
}
exports.WidgetPOM = WidgetPOM;
