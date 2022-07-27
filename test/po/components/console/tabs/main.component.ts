import { Locator, Page } from "@playwright/test";
import { getRandomNumber } from "../../../../utils";
import { Dropdown } from "../../basic/dropdown";
import { Element } from "../../basic/element";
import { Logger } from "../../../../logger/logger";
const logger = new Logger("Console Items");

export class Main extends Element {
  readonly page: Page;

  readonly infoIcon: Locator;

  readonly platform: Dropdown;

  readonly accountCard: Locator;

  readonly saveButton: Locator;

  readonly header: Locator;

  readonly sort: Dropdown;

  readonly filter: Dropdown;

  readonly items: Locator;

  readonly noItemsMessage: Locator;

  readonly publishButton: Locator;

  readonly errorMessage: Locator;

  readonly plusIcon: Element;

  readonly titles: Locator;
  readonly uploadThisImageButton: Locator;
  readonly fileInputField: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.infoIcon = this.rootEl.locator("button:has(> svg[data-testid='InfoIcon'])");
    this.platform = new Dropdown(this.rootEl.locator("div[data-test-id='platform-select']"), this.page);
    this.accountCard = this.page.locator("div[data-test-id='account-card']");
    this.saveButton = this.rootEl.locator("button[data-test-id$='form-save-button']");
    this.header = this.rootEl.locator("header");
    this.sort = new Dropdown(this.rootEl.locator("#sort-button"), this.page);
    this.filter = new Dropdown(this.rootEl.locator("#filter-button"), this.page);
    this.items = this.rootEl.locator("ul .MuiListItem-gutters");
    this.noItemsMessage = this.rootEl.locator("div.MuiTypography-CONSOLE_SUBTEXT");
    this.publishButton = this.rootEl.locator("button", { hasText: "Publish" });
    this.errorMessage = this.rootEl.locator("[data-test-id='errors-block']");
    this.plusIcon = new Element(this.rootEl.locator("button:has(>svg[data-testid='AddIcon'])"));
    this.titles = this.items.locator(".MuiListItemText-primary");
    this.uploadThisImageButton = this.rootEl.locator("button", {
      has: page.locator("[data-testid='ArrowUpwardIcon']"),
    });
    this.fileInputField = this.rootEl.locator("input[type='file']");
  }

  publishItem(index: number): Promise<void> {
    return this.items.nth(index).locator("button[aria-label='publish']").click();
  }

  selectItem(index: number): Promise<void> {
    return this.items.nth(index).click();
  }

  removeItem(index: number): Promise<void> {
    return this.items
      .nth(index)
      .locator("button[data-test-id='delete-button'], [data-test-id^='link-item-delete-button']")
      .click();
  }

  waitForItems(item = 1): Promise<void> {
    return this.items.nth(item).waitFor();
  }

  async selectRandomItem(): Promise<void> {
    await this.waitForItems();
    const itemsCount = await this.items.count();
    const randomNumber = getRandomNumber(itemsCount);
    logger.info(`Random item is ${randomNumber}`);

    return this.selectItem(randomNumber);
  }

  selectItemByText(text: string): Promise<void> {
    return this.getItemByText(text).click();
  }

  getItemByText(text: string): Locator {
    return this.items.locator("span", { hasText: text });
  }

  getItemsCount(): Promise<number> {
    return this.items.count();
  }

  uploadFile(fileName: string): Promise<void> {
    return this.fileInputField.setInputFiles(`./test/config/images/${fileName}`);
  }
}
