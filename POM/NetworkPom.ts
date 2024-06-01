import { Page } from '@playwright/test';

export  class NetworkPOM{

    constructor(public testPage: Page){}


    async networksBanner(){
        await this.testPage.click('.sticky > .mx-auto > .hidden > .relative > .flex')
    }

    async networksETH(){
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(1)')
    }

    async networksBSC(){
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(2)')
    }

    async networksAvalanche(){
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(3)')
    }

    async networksPolygon(){
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(4)')
    }

    async networksFantom(){
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(5)')
    }

    async networksOptimism(){
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(6)')
    }

    async networksTestNet(){
        await this.testPage.click('.relative > .top-full > .text-regular3 > .grid > .flex:nth-child(7)')
    }

}