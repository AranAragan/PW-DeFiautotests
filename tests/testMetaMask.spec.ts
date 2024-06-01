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

  test("BSCMetaMask connect", async () => {
   
    await wallet.importPK('0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0');
    await expect(wallet.addNetwork({networkName: 'Testnet', rpc: 'http://localhost:8545', chainId: 1337, symbol: 'BNB',
  }),).rejects.toThrowError(SyntaxError);
    await wallet.addNetwork({networkName: "Binance Smart Chain",rpc: "https://bsc-dataseed.binance.org/",chainId: 56,symbol: "BNB"});
    await wallet.switchNetwork('Localhost 8545');

    const widget = new WidgetPOM(testPage);
    const network = new NetworkPOM(testPage);
    const conwal = new ConnectWalletPOM(testPage)
    
    await testPage.goto("http://localhost:3000/56/exchange/bnb/dai");
    await testPage.evaluate(() => {
      localStorage["testNetwork"] = '{"maskId":"56"}';
    });
    await testPage.reload();
        // await testPage.getByRole("banner").getByRole("button", { name: "Launch App" }).click();
    await network.networksBanner();
    await network.networksTestNet();
    await conwal.connectWalletSide();
    await conwal.connectMetaMask();
    await wallet.approve();
    await widget.fromTokenBscDai();
    await widget.toTokenBscUsdt();
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

test.describe("Regress", ()=>{
  test('API', async ({ page }) => {
    await page.goto('https://yad.finance/');
    await page.getByRole('banner').getByRole('button', { name: 'Launch App' }).click();
    await page.getByRole('link', { name: 'API' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'View API Docs' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('link', { name: '/v2/tokens/list' }).click();
    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'API Documentation' }).click();
    const page2 = await page2Promise;
    const page1Promise3 = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Start your API integration' }).click();
    const page3 = await page1Promise;
    await page1.getByRole('button', { name: 'get ​/v1​/{chainID}​/tokens' }).click();
    await page2.getByRole('button', { name: 'get ​/health' }).click();
    await page.getByText('Launch App').click();
  });

  test('Docs', async ({ page }) => {
    await page.goto('https://yad.finance/');

    await Promise.all([
      page.click('.h-20 > [href="https://app.yad.finance"]'),
      page.waitForNavigation()
    ]);
  
    await Promise.all([
      page.click('[href="/documentation"]'),
      page.waitForNavigation()
    ]);
    await page.click('.text-orange400:nth-child(2)');
    await Promise.all([
      page.click('[href="#what_is_it"]'),
      page.waitForNavigation()
    ]);
    await Promise.all([
      page.click('[href="#is_it_safe"]'),
      page.waitForNavigation()
    ]);
    await page.click('.rounded-2xl:nth-child(2) .ml-auto');
    await Promise.all([
      page.click('[href="#how_do_i_create"]'),
      page.waitForNavigation()
    ]);
    await Promise.all([
      page.click('[href="#get_crypto"]'),
      page.waitForNavigation()
    ]);
    await Promise.all([
      page.click('[href="#do_swap"]'),
      page.waitForNavigation()
    ]);
    await Promise.all([
      page.click('[href="#native_token"]'),
      page.waitForNavigation()
    ]);
    await Promise.all([
      page.click('[href="#approve_tokens"]'),
      page.waitForNavigation()
    ]);
    await Promise.all([
      page.click('[href="#fees"]'),
      page.waitForNavigation()
    ]);
    await Promise.all([
      page.click('[href="#slippage_gas"]'),
      page.waitForNavigation()
    ]);
    await Promise.all([
      page.click('[href="#time_transaction"]'),
      page.waitForNavigation()
    ]);
    await page.click('[href="#contact"]');
    await page.getByText('Launch App').click();

  });

  test('Simple mode', async ({ page }) => {
    await page.goto('https://yad.finance/');
    await page.click('[href="https://app.yad.finance"]:nth-child(3)');
    await page.locator('.hidden > svg').click();
    await page.getByRole('banner').locator('span').nth(2).click();
    await page.getByRole('banner').locator('span').nth(3).click();
    await page.getByText('1D').first().click();
    await page.getByText('1W').first().click();
    await page.getByText('1M').first().click();
    await page.getByText('1Y').first().click();
    await page.getByText('All time').first().click();
    await page.getByRole('main').getByRole('button').click();
    await page.getByRole('main').getByRole('button').click();
    await page.getByRole('main').getByRole('link').click();
    await page.locator('.md\\:h-full > .hidden').click();
    await page.getByRole('banner').locator('span').nth(3).click();
    await page.getByRole('banner').locator('span').nth(2).click();

  });

  test('Widget', async ({ page }) => {
    await page.goto('https://yad.finance/');

    await page.click('[href="https://app.yad.finance"]:nth-child(3)');
    await page.getByRole('complementary').getByRole('link').click();
    await page.getByRole('button', { name: 'D Dai Stablecoin_logo DAI' }).click();
    await page.getByRole('link', { name: '0 0chain_logo ZCN' }).click();
    await page.getByRole('button', { name: 'E Ethereum_logo ETH' }).click();
    await page.getByRole('link', { name: '0 0x Protocol_logo ZRX' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('0chain').click();
    const page1 = await page1Promise;
    const page2Promise = page.waitForEvent('popup');
    await page.getByText('0x Protocol').click();
    const page2 = await page2Promise;
    await page.locator('.mb-11').click();
    await page.getByRole('complementary').locator('svg').first().click();
    await page.getByRole('button', { name: '0.5%' }).click();
    await page.getByRole('button', { name: '1%' }).click();
    await page.getByRole('button', { name: '3%' }).click();
    await page.getByPlaceholder('Custom').click();
    await page.getByPlaceholder('Custom').fill('5%');
    await page.getByRole('button', { name: 'Fast' }).click();
    await page.getByRole('button', { name: 'Medium' }).click();
    await page.getByRole('button', { name: 'Low' }).click();
    await page.locator('#gasPrice div').filter({ hasText: 'Custom' }).nth(1).click();
    await page.locator('#gasPrice div').filter({ hasText: 'Custom' }).nth(1).dblclick();
    await page.getByPlaceholder('Custom').click();
    await page.getByPlaceholder('Custom').fill('4%');
    await page.getByPlaceholder('Custom').press('Enter');
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('complementary').getByRole('button', { name: 'Connect Wallet' }).click();
  });

  test('Change a network', async ({ page }) => {
    await page.goto('https://yad.finance/');
    await page.locator('section').filter({ hasText: 'Built for the future Available todayLaunch appPrivacy PolicyCopyright © 2022 YAD' }).getByRole('button', { name: 'Launch app' }).click();
    await page.getByRole('banner').getByRole('button', { name: 'Ethereum' }).click();
    await page.getByRole('button', { name: 'BSC' }).click();
    await page.getByRole('button', { name: 'BSC' }).click();
    await page.getByRole('button', { name: 'Avalanche' }).click();
    await page.getByRole('banner').getByRole('button', { name: 'Avalanche' }).click();
    await page.getByRole('button', { name: 'Polygon' }).click();
    await page.getByRole('button', { name: 'Polygon' }).click();
    await page.getByRole('button', { name: 'Fantom' }).click();
    await page.getByRole('banner').getByRole('button', { name: 'Fantom' }).click();
    await page.getByRole('button', { name: 'Optimism' }).click();
    await page.getByRole('banner').getByRole('button', { name: 'Connect Wallet' }).click();
    await page.getByRole('button', { name: 'Ethereum' }).nth(2).click();
    await page.getByRole('button', { name: 'BSC' }).click();
    await page.getByRole('button', { name: 'Avalanche' }).click();
    await page.getByRole('button', { name: 'Polygon' }).click();
    await page.getByRole('button', { name: 'Fantom' }).click();
    await page.getByRole('button', { name: 'Optimism' }).click();
  });

  test('visible', async ({ page }) => {
    await page.goto('https://yad.finance/');
    await expect(page.getByRole('heading', { name: 'Simple and efficient multichain swap aggregator' })).toBeVisible()
    await expect(page.getByText('Find the best rate andswap 3500+ tokens in 6 chainsin one click')).toBeVisible();
    await page.getByText('Find the best rate andswap 3500+ tokens in 6 chainsin one click').click();
    await page.getByRole('heading', { name: 'Why swap with YAD?' }).click();
    await page.getByRole('heading', { name: 'Fast and efficient' }).click();
    await page.getByText('Tired of waiting for hours for your tokens to arrive? YAD finds the fastest and ').click();
    await page.locator('section').filter({ hasText: 'Why swap with YAD?Fast and efficientTired of waiting for hours for your tokens t' }).getByRole('heading', { name: 'Simple' }).click();
    await page.getByText('SecureYAD components are based on state of art solutions and time-tested.').click();
  });

})