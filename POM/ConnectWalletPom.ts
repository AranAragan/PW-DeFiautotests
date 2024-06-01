import { Page } from '@playwright/test';

export  class ConnectWalletPOM{

    constructor(public testPage: Page){}


    async connectWalletSide(){
        await this.testPage.getByRole('banner').getByRole('button', { name: 'Connect Wallet' }).click();
    }


    async connectMetaMask(){
        await this.testPage.getByRole('button', { name: 'Metamask' }).click();  
    }


}