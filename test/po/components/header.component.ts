/* eslint-disable require-await */
import { Locator } from "@playwright/test";
import { Field } from "../components/basic/field";

export default class Header {
  readonly locator: Locator;

  readonly portfolioLink: Field;

  constructor(locator: Locator) {
    this.locator = locator;
    this.portfolioLink = new Field(this.locator.locator("a[href*='user']"));
  }

  // async getText(): Promise<string> {
  //   return this.locator.innerText();
  // }
}
