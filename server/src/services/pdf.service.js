import env from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Launches a headless browser.
 * - In production (Render, etc.): uses puppeteer-core + @sparticuz/chromium,
 *   a self-contained Chromium build meant for constrained Linux hosts. This
 *   avoids the "browser downloaded during build isn't found at runtime"
 *   cache-path mismatch that full `puppeteer` runs into on platforms like Render.
 * - In development: uses the full `puppeteer` package, which manages its own
 *   bundled Chrome download and works out of the box on Windows/macOS/Linux.
 */
const launchBrowser = async () => {
  if (env.NODE_ENV === 'production') {
    const { default: chromium } = await import('@sparticuz/chromium');
    const { default: puppeteer } = await import('puppeteer-core');

    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  const { default: puppeteer } = await import('puppeteer');

  return puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });
};

export const generatePdfFromHtml = async htmlContent => {
  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });

    return await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '15mm',
        right: '15mm',
      },
    });
  } catch (error) {
    console.error('[PDF Generation Error]', error.message);
    throw new ApiError(500, 'Unable to generate resume PDF.');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
