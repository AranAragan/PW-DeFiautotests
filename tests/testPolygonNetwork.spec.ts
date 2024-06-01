import { BrowserContext, Page, test, expect } from "@playwright/test";
import dappwright, { Dappwright } from "@tenkeylabs/dappwright";
import { WidgetPOM } from "../POM/WidgetPom";
import { NetworkPOM } from "../POM/NetworkPom";
import { ConnectWalletPOM } from "../POM/ConnectWalletPom";



test.describe("Swap", () => {
  let wallet: Dappwright, browserContext: BrowserContext, testPage: Page, _;
  

  test.beforeAll(async () => {
    
    [wallet, testPage, browserContext] = await dappwright.bootstrap("", {
      wallet: "metamask",
      version: "10.25.0",
      seed: 'whisper december wedding pet pig trouble sock orphan brass odor brain dry',
      password: 'YadQa123'
    });

  });
  
  test("Polygon MetaMask connect", async () => {
   
    await wallet.importPK('0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0');
    await expect(wallet.addNetwork({networkName: 'Testnet', rpc: 'http://localhost:8545', chainId: 1337, symbol: 'ETH',
  }),).rejects.toThrowError(SyntaxError);
    await wallet.addNetwork({networkName: "Polygon",rpc: "https://frosty-magical-vineyard.optimism.quiknode.pro/9746a26b51ed60ea1fcea4f19575c1b0ab73b922/",chainId: 137,symbol: "MATIC"});
    await wallet.switchNetwork('Localhost 8545');

    const widget = new WidgetPOM(testPage);
    const network = new NetworkPOM(testPage);
    const conwal = new ConnectWalletPOM(testPage)
    
    await testPage.goto("http://localhost:3000/137/exchange/matic/dai");
    await testPage.evaluate(() => {
      localStorage["testNetwork"] = '{"maskId":"137"}';
    });
    await testPage.reload();
        // await testPage.getByRole("banner").getByRole("button", { name: "Launch App" }).click();
    await network.networksBanner();
    await network.networksTestNet();
    await conwal.connectWalletSide();
    await conwal.connectMetaMask();
    await wallet.approve();
    await widget.toTokenEthDai();
    await widget.fromTokenMaticUsdt();
    await widget.burgerWidget();
    await widget.placeholderCustom();
    await widget.placeholderCustomFill('30%')
    await widget.settingsOkButton();
    await testPage.waitForTimeout(3000)
    await widget.swapButton();
    await wallet.confirmTransaction();
    await testPage.waitForSelector('.mx-auto > .fixed > .z-\\[6\\] > .mt-5 > .h-10:nth-child(2)');
    await testPage.click('.mx-auto > .fixed > .z-\\[6\\] > .mt-5 > .h-10:nth-child(2)');
    await testPage.click('.Toastify__toast-body');
    await testPage.pause()
  });

});