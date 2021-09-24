// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";
import path from "path";
const baseURL: string = "https://playwright.dev/";

const config: PlaywrightTestConfig = {
  use: {
    baseURL,
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  reporter: [["list"], ["junit", {
    outputFile: path.join(process.cwd(), "common", "report.xml"),
  }]],
  outputDir: "common/results",
};
export default config;
