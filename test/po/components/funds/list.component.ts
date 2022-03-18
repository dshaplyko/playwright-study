import { Locator } from "@playwright/test";
import { Element } from "../basic/element";
import { getRandomIndex } from "../../../utils";
import { Logger } from "../../../logger/logger";
import { CURRENCIES } from "../../../config";
const logger = new Logger("Funds Page > Currencies List");

export class List extends Element {
  readonly items: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.items = this.el.locator("div");
  }

  async getAllCurrenciesText(): Promise<string[]> {
    const currenciesLength = 2;
    let allListText: string[] = await this.items.allTextContents();
    while (allListText.length <= currenciesLength) {
      allListText = await this.items.allTextContents();
    }

    return allListText;
  }

  async getCurrencies(): Promise<{
    fiatCurrencies: string[];
    digitalAssets: string[];
  }> {
    const allListText: string[] = await this.getAllCurrenciesText();
    const fiatCurrenciesIndex = allListText.indexOf("Fiat Currencies");
    const digitalAssetsIndex = allListText.indexOf("Digital Assets");

    return {
      fiatCurrencies: allListText.slice(fiatCurrenciesIndex + 1, digitalAssetsIndex),
      digitalAssets: allListText.slice(digitalAssetsIndex + 1, allListText.length),
    };
  }

  async chooseCurrency(currency: CURRENCIES): Promise<void> {
    try {
      const allListText: string[] = await this.getAllCurrenciesText();
      const index = allListText.indexOf(currency);
      await this.items.nth(index).click();
    } catch (e) {
      throw new Error(`No such currency, ${e}`);
    }
  }

  async getRandomDigitalAsset(): Promise<void> {
    const allListText: string[] = (await this.getCurrencies()).digitalAssets;
    const randomIndex = getRandomIndex(allListText);
    await this.items.locator(`text=${allListText[randomIndex]}`).click();
    logger.info(`Chosen value is '${allListText[randomIndex]}'`);
  }
}
