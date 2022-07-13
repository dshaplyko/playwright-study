import { Locator, Page } from "@playwright/test";
import { Modal } from "./modal.component";

export class ManageLanguagesModal extends Modal {
  readonly langSelector: Locator;

  readonly items: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.langSelector = this.rootEl.locator("[data-test-id='language-popUp-content']");
    this.items = this.langSelector.locator("p");
  }

  async getAllLanguagesText(): Promise<string[]> {
    let allListText: string[] = await this.items.allTextContents();

    while (allListText.length <= 1) {
      allListText = await this.items.allTextContents();
    }

    return allListText;
  }

  async getLanguages(): Promise<{
    enabledLangs: string[];
    availableLangs: string[];
  }> {
    const allListText: string[] = await this.getAllLanguagesText();
    const enabledLangsIndex = allListText.indexOf("Languages enabled");
    const availableLangsIndex = allListText.indexOf("Languages available");

    return {
      enabledLangs: allListText.slice(enabledLangsIndex + 1, availableLangsIndex),
      availableLangs: allListText.slice(availableLangsIndex + 1, allListText.length),
    };
  }

  async waitUntilNumberChanged(initialNumber: number): Promise<void> {
    while (initialNumber === (await this.getLanguages()).availableLangs.length) {}
  }

  async addAndRememberAvailableLang(index: number): Promise<string> {
    const { availableLangs } = await this.getLanguages();
    const addedLanguage = availableLangs[index - 1];

    await this.langSelector.locator(`p:has-text("${addedLanguage}")~button`).click();
    await this.waitUntilNumberChanged(availableLangs.length);
    return addedLanguage;
  }

  async removeLanguageFromEnabled(language: string): Promise<void> {
    const { availableLangs } = await this.getLanguages();
    await this.langSelector.locator(`p:has-text("${language}")~button`).click();
    await this.waitUntilNumberChanged(availableLangs.length);
  }
}
