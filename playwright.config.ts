// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";
import { BASE_URL } from "./test/config/constants";
import path from "path";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: BASE_URL,
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  workers: 2,
  // retries: 1,
  timeout: 120000,
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
