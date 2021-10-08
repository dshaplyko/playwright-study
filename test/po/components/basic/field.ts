import { Element } from "./element";

export class Field extends Element {
  type(test: string) {
    return this.locator.type(test);
  }

  getText(): Promise<string> {
    return this.locator.innerText();
  }
}
