import { Locator, Page } from "@playwright/test";
import { Element } from "../basic/element";
import { Dropdown } from "../basic/dropdown";

export class ContactCard extends Element {
  readonly page: Page;

  readonly contactIcon: Locator;

  readonly editButton: Locator;

  readonly transferOutDigitalAssetButton: Locator;

  readonly contactNameInput: Locator;

  readonly referenceNameInput: Locator;

  readonly digitalAssetAddressInput: Locator;

  readonly digitalAsset: Dropdown;

  readonly cancelButton: Locator;

  readonly saveButton: Locator;

  readonly deleteContactButton: Locator;

  readonly deleteAddressButton: Locator;

  readonly addNewAddressButton: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.contactIcon = this.rootEl.locator("div[data-test-id='contact-icon']");
    this.editButton = this.rootEl.locator("button[data-test-id='edit-button']");
    this.transferOutDigitalAssetButton = this.rootEl.locator("button", { hasText: "Transfer out Digital Assets" });
    this.contactNameInput = this.rootEl.locator("div[data-test-id='contact-name-input'] input");
    this.referenceNameInput = this.rootEl.locator("input[placeholder*='digital asset address name.']");
    this.digitalAssetAddressInput = this.rootEl.locator("input[placeholder*='digital asset address.']");
    this.digitalAsset = new Dropdown(this.rootEl.locator("#currency"), this.page);
    this.cancelButton = this.rootEl.locator("button[data-test-id='cancel-button']");
    this.saveButton = this.rootEl.locator("button[data-test-id='save-button']");
    this.deleteContactButton = this.rootEl.locator("button[data-test-id='delete-contact-button']");
    this.deleteAddressButton = this.rootEl.locator("button[data-test-id='delete-address-button']");
    this.addNewAddressButton = this.rootEl.locator("button[data-test-id='add-new-address-button']");
  }

  async fillContactCard({
    name,
    reference,
    assetAddress,
    currency,
  }: {
    name: string;
    reference: string;
    assetAddress: string;
    currency: string;
  }): Promise<void> {
    await this.contactNameInput.fill(name);
    await this.referenceNameInput.fill(reference);
    await this.digitalAssetAddressInput.fill(assetAddress);
    await this.digitalAsset.clickByText(currency);
    await this.saveButton.click();
  }

  getAddressesCount(): Promise<number> {
    return this.referenceNameInput.count();
  }

  deleteAddress(index: number): Promise<void> {
    return this.deleteAddressButton.nth(index - 1).click();
  }
}
