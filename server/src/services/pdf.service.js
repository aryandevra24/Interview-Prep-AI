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

    console.log('[PDF] resolving chromium executable...');
    const executablePath = await chromium.executablePath();
    console.log('[PDF] launching browser at', executablePath);

    const browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--single-process', // fewer processes = lower memory on constrained hosts
        '--no-zygote',
      ],
      executablePath,
      headless: chromium.headless,
    });
    console.log('[PDF] browser launched');
    return browser;
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
    console.log('[PDF] starting generation, memory:', process.memoryUsage().rss / 1024 / 1024, 'MB');
    browser = await launchBrowser();
    const page = await browser.newPage();
    console.log('[PDF] page created, setting content...');

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });
    console.log('[PDF] content set, rendering PDF...');

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
    // Always log in full — silencing this in production is exactly what makes
    // Puppeteer/Chromium failures nearly impossible to diagnose from Render logs.
    console.error('[PDF Generation Error]', error.message);
    throw new ApiError(500, 'Unable to generate resume PDF.');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};