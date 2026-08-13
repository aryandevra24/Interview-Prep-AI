import puppeteer from 'puppeteer';
import path from 'path';
import env from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

export const generatePdfFromHtml = async htmlContent => {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });

    return await page.pdf({
      format: 'A4',
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '15mm',
        right: '15mm',
      },
    });
  } catch (error) {
    if (env.NODE_ENV !== 'production') {
      console.error('[PDF Generation Error]', error.message);
    }
    throw new ApiError(500, 'Unable to generate resume PDF.');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
