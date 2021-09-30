// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";
import path from "path";
const baseURL = "http://ecsc00a01c5c.epam.com:7171";

const config: PlaywrightTestConfig = {
  use: {
    baseURL,
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  reporter: [
    ["list"],
    [
      "junit",
      {
        outputFile: path.join(process.cwd(), "common", "report.xml"),
      },
    ],
  ],
  outputDir: path.join(process.cwd(), "common", "result"),
};
export default config;
