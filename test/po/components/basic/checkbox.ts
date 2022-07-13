import { Locator } from "@playwright/test";
import { Element } from "./element";
import { Logger } from "../../../logger/logger";
const logger = new Logger("Checkbox component");

export class Checkbox extends Element {
  constructor(locator: Locator) {
    super(locator);
  }

  async check(): Promise<void> {
    await this.rootEl.check();
  }

  async uncheck(): Promise<void> {
    await this.rootEl.uncheck();
  }

  async isChecked(): Promise<boolean> {
    const status = await this.rootEl.isChecked();
    logger.info(`${this.rootEl} is ${status}`);
    return status;
  }
}
