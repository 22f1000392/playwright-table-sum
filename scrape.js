const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [53,54,55,56,57,58,59,60,61,62];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => Number(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b) => a + b, 0);
    console.log(`Seed ${seed} sum = ${sum}`);

    grandTotal += sum;
  }

  console.log("FINAL TOTAL =", grandTotal);

  await browser.close();
})();
