import puppeteer from "puppeteer";
import { ResumeData } from "@/types/resume";
import { renderResumeHtml } from "./templates";

export async function generateResumePdf(
  data: ResumeData,
  title: string
): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(renderResumeHtml(data, title), {
      waitUntil: "load",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in",
      },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
