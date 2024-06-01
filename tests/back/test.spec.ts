import { test, chromium } from '@playwright/test'
import axios from 'axios';

async function sendRequest() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = 'https://api.yad.finance/v1/1/quote';
  const params = {
    fromTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    toTokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    amount: '10360626725435665415',
    slippage: '1',
    excludeAggregator: ['1inch', 'zrx', 'rfqt']
  };

  const requestUrl = ${url}?${new URLSearchParams(params)};

  await page.goto(requestUrl);

  // Extract the response from the page
  const responseBody = await page.evaluate(() => {
    return document.body.innerText;
  });

  // Close the browser
  await browser.close();

  // Send request using Axios to log the response
  try {
    const response = await axios.get(requestUrl);
    console.log('Axios response:', response.data);
  } catch (error) {
    console.error('Axios error:', error);
  }

  // Log the response obtained from the page
  console.log('Playwright response:', responseBody);
}

sendRequest().catch(console.error);