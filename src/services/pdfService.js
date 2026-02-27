const chromium = require("@sparticuz/chromium");
const puppeteerCore = require("puppeteer-core");

let localPuppeteer = null;
try {
  localPuppeteer = require("puppeteer");
} catch (error) {
  localPuppeteer = null;
}

const isVercel = Boolean(process.env.VERCEL);

const getBrowser = async () => {
  if (isVercel) {
    const executablePath = await chromium.executablePath();
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath,
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport,
    });
  }

  if (localPuppeteer) {
    return localPuppeteer.launch({
      headless: true,
    });
  }

  throw new Error(
    "No local browser found. Install puppeteer for local usage or run on Vercel."
  );
};

const htmlToPdfBuffer = async (html) => {
  const browser = await getBrowser();
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });
    return pdf;
  } finally {
    await browser.close();
  }
};

module.exports = {
  htmlToPdfBuffer,
};
