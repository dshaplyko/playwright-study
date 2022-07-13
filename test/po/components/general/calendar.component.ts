import { Locator, Page } from "@playwright/test";
import { Element } from "../basic/element";

export class Calendar extends Element {
  readonly page: Page;

  readonly root: Locator;

  readonly yearPicker: Locator;

  readonly yearButtons: Locator;

  readonly dayButtons: Locator;

  readonly calendarButton: Locator;

  readonly currentDay: Locator;

  readonly input: Element;

  readonly nextMonthButton: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.root = this.page.locator(".MuiCalendarPicker-root");
    this.yearPicker = this.root.locator("[aria-label='calendar view is open, switch to year view']");
    this.yearButtons = this.root.locator("div.PrivatePickersYear-root");
    this.dayButtons = this.root.locator("button.MuiPickersDay-root");
    this.calendarButton = this.rootEl.locator("button[aria-label*='date']");
    this.currentDay = this.root.locator("button.MuiPickersDay-today");
    this.input = new Element(this.rootEl.locator("input"));
    this.nextMonthButton = this.root.locator("button[title='Next month']");
  }

  async selectPreviousDate(year: string, day: string): Promise<void> {
    await this.calendarButton.click();
    await this.yearPicker.click();
    await this.yearButtons.locator(`text=${year}`).click();
    await this.dayButtons.locator(`text=${day}`).click();
  }

  async selectCurrentDay(): Promise<void> {
    await this.calendarButton.click();
    if (await this.currentDay.first().isHidden()) {
      await this.nextMonthButton.click();
    }
    await this.currentDay.first().click();
  }
}
