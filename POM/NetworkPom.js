"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkPOM = void 0;
class NetworkPOM {
    constructor(testPage) {
        this.testPage = testPage;
    }
    async networksBanner() {
        await this.testPage.click('.sticky > .mx-auto > .hidden > .relative > .flex');
    }
    async networksETH() {
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(1)');
    }
    async networksBSC() {
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(2)');
    }
    async networksAvalanche() {
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(3)');
    }
    async networksPolygon() {
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(4)');
    }
    async networksFantom() {
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(5)');
    }
    async networksOptimism() {
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(6)');
    }
    async networksTestNet() {
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(7)');
    }
}
exports.NetworkPOM = NetworkPOM;
