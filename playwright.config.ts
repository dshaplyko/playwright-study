// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";
import { BASE_URL } from "./test/config/constants";
import path from "path";
const baseURL = BASE_URL || "https://trade-sg.oslsandbox.com";

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
  retries: 1,
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
