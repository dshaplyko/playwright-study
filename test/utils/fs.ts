import { Page } from "@playwright/test";
import csv from "csvtojson";
import { Logger } from "../logger/logger";
const logger = new Logger("FS module");

const getDownloadedFilePath = async (page: Page, action: Promise<void>): Promise<string> => {
  const [download] = await Promise.all([
    page.waitForEvent("download", {
      timeout: 5000,
    }), // wait for download to start
    action,
  ]);
  const path: string = await download.path();
  logger.debug(path);
  return path;
};

export const getDocAsJson = async (page: Page, action: Promise<void>) => {
  const path: string = await getDownloadedFilePath(page, action);
  const jsonDoc = await csv().fromFile(path);
  logger.debug(JSON.stringify(jsonDoc));
  return jsonDoc;
};
