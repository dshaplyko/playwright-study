import { Locator, Page } from "@playwright/test";
import { Dropdown } from "../../basic/dropdown";
import { Table } from "../../general/table.component";
import { Main } from "./main.component";

export class Translation extends Main {
  readonly environments: Dropdown;

  readonly languagesButton: Locator;

  readonly promoteButton: Locator;

  readonly infoButton: Locator;

  readonly searchInput: Locator;

  readonly category: Dropdown;

  readonly translationTable: Table;

  readonly keys: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.environments = new Dropdown(this.rootEl.locator("div[data-test-id='environments-select']"), this.page);
    this.languagesButton = this.rootEl.locator("button>svg[data-testid='LanguageIcon']");
    this.searchInput = this.rootEl.locator("input#translation-table-search");
    this.category = new Dropdown(this.rootEl.locator("div#translation-table-category"), this.page);
    this.translationTable = new Table(this.rootEl.locator("div[data-test-id='translation-table']"));
    this.promoteButton = this.rootEl.locator("header button>svg[data-testid='VisibilityIcon']");
    this.infoButton = this.rootEl.locator("button>svg[data-testid='InfoIcon']");
    this.keys = this.translationTable.rows.locator("div div:first-child");
  }

  async hoverRow(index: number): Promise<void> {
    await this.translationTable.waitForVisible();
    await this.translationTable.rows.nth(index).hover();
  }

  async promoteItem(index: number): Promise<void> {
    await this.hoverRow(index + 1);
    await this.hoverRow(index);
    await this.translationTable.rootEl.locator("button:has(>svg[data-testid='VisibilityIcon'])").nth(index).click();
  }

  async editItem(index: number): Promise<void> {
    await this.hoverRow(index);
    await this.translationTable.rootEl.locator("button:has(>svg[data-testid='EditIcon'])").nth(index).click();
  }
}
