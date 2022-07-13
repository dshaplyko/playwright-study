import { Locator, Page } from "@playwright/test";
import { Element } from "./element";
import { getRandomIndex } from "../../../utils";
import { Logger } from "../../../logger/logger";
const logger = new Logger("Dropdown component");

export class Dropdown extends Element {
  readonly page: Page;

  readonly dropdown: Locator;

  readonly options: Locator;

  readonly input: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.dropdown = this.page.locator("ul[role='listbox'], ul[role='menu']");
    this.options = this.dropdown.locator("li");
    this.input = this.rootEl.locator("input");
  }

  getOptionsCount(): Promise<number> {
    return this.options.count();
  }

  async clickByText<T>(text: T): Promise<void> {
    await this.rootEl.click();
    return this.dropdown.locator(`text="${text}"`).first().click();
  }

  clickByValue(text: string): Promise<void> {
    return this.dropdown.locator(`[data-value='${text}']`).click();
  }

  async getOptionsText(): Promise<string[]> {
    const texts: string[] = await this.options.allInnerTexts();

    logger.debug(`Text Array: ${JSON.stringify(texts, null, "\t")}`);
    return texts.filter((item) => item !== "All" && item !== "Fiat Currencies");
  }

  async getAttributesText(): Promise<string[]> {
    const options = await this.options.elementHandles();
    const attributes: string[] = [];
    for (const option of options) {
      attributes.push(await option.getAttribute("data-value"));
    }
    logger.debug(`Attributes Array: ${JSON.stringify(attributes, null, "\t")}`);
    return attributes.filter((item) => !!item && item !== "ccy.label.fiatgroup");
  }

  async chooseAndRememberRandomOption(): Promise<string> {
    await this.click();
    const allOptionsValue: string[] = await this.getAttributesText();
    const allOptionsText: string[] = await this.getOptionsText();
    const randomIndex = getRandomIndex(allOptionsValue);
    const randomValue = allOptionsValue[randomIndex];
    logger.debug(`Chosen value is '${allOptionsText[randomIndex]}'`);

    await this.clickByValue(randomValue);
    return allOptionsText[randomIndex];
  }
}
