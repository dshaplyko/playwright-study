// playwright.config.ts
import { PlaywrightTestConfig, expect } from "@playwright/test";
import { BASE_URL } from "./test/config/constants";
import path from "path";
import methods from "./test/utils/expectExtend";

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./global-setup"),
  expect: {
    timeout: 35000,
  },
  use: {
    baseURL: BASE_URL,
    storageState: "./test/config/states/state.json",
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    acceptDownloads: true,
  },
  testDir: "./test/tests",
  workers: 4,
  retries: 1,
  timeout: 75000,
  reporter: [
    ["list"],
    [
      "junit",
      {
        outputFile: path.join(process.cwd(), "common", "report.xml"),
      },
    ],
    [
      "html",
      {
        outputFolder: path.join(process.cwd(), "common", "html-report"),
        open: "never",
      },
    ],
  ],
  outputDir: path.join(process.cwd(), "common", "result"),
};

expect.extend(methods);

export default config;
