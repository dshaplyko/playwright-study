import { expect, Locator, Page } from "@playwright/test";
import { REPORT_TYPES, COMPARE_CONDITIONS, ATTRIBUTES } from "../config";
import { checkArrayType } from "./main";

export const expectPageURLContains = async (page: Page, toContain: string | RegExp): Promise<void> => {
  await expect(page, "Page URL does not contain needed text").toHaveURL(toContain);
};

export const expectElementVisibility = async (element: Locator, visibility: boolean): Promise<void> => {
  const elementsCount: number = await element.count();

  if (elementsCount > 1) {
    for (let i = 0; i < elementsCount; i++) {
      const assert = expect(element.nth(i), `Visibility of ${element} element collection is incorrect`);
      if (visibility) {
        await assert.toBeVisible();
      } else {
        await assert.toBeHidden();
      }
    }
  } else {
    const assert = expect(element, `Visibility of ${element} element is incorrect`);
    if (visibility) {
      await assert.toBeVisible();
    } else {
      await assert.toBeHidden();
    }
  }
};

export const expectArrayIncludes = (arr: string[], toBeIncluded: any[], option = true): void => {
  let assert = expect(arr, `Array ${JSON.stringify(arr)} does not include "${toBeIncluded}"`);
  if (!option) {
    assert = assert.not;
  }

  assert.toEqual(expect.arrayContaining(toBeIncluded));
};

export const expectArraySorted = (arr: number[] | string[]): void => {
  let arrayToCompare = [];

  if (checkArrayType(arr) === "number") {
    arrayToCompare = [...arr].sort((a: number, b: number) => b - a);
  } else {
    arrayToCompare = [...arr].map((item: string) => item.toLowerCase()).sort();
    arr = arr.map((item) => String(item).toLowerCase());
  }

  expect(arr, `${JSON.stringify(arr)} is not sorted properly`).toEqual(arrayToCompare);
};

export const expectReportValid = (option: REPORT_TYPES, report: any) => {
  report.forEach((object: any) => {
    switch (option) {
      case REPORT_TYPES.TRANSACTION:
        expect("Processed Date Time").toBeInObject(object);
        expect("Method").toBeInObject(object);
        expect("Amount").toBeInObject(object);
        expect("Currency").toBeInObject(object);
        expect("Status").toBeInObject(object);
        expect("Fee").toBeInObject(object);
        expect("Additional Information").toBeInObject(object);
        break;
      case REPORT_TYPES.TRADE:
        expect("Processed Date Time").toBeInObject(object);
        expect("Order Reference Id").toBeInObject(object);
        expect("Aggressor").toBeInObject(object);
        expect("Action").toBeInObject(object);
        expect("Traded Amount").toBeInObject(object);
        expect("Traded Currency").toBeInObject(object);
        expect("Price").toBeInObject(object);
        expect("Settlement Amount").toBeInObject(object);
        expect("Settlement Currency").toBeInObject(object);
        expect("Transaction State").toBeInObject(object);
        expect("Fee").toBeInObject(object);
        expect("Fee Currency").toBeInObject(object);
        break;
      case REPORT_TYPES.RFQ:
        expect("Processed Date Time").toBeInObject(object);
        expect("Action").toBeInObject(object);
        expect("Traded Amount").toBeInObject(object);
        expect("Traded Currency").toBeInObject(object);
        expect("Price").toBeInObject(object);
        expect("Settlement Amount").toBeInObject(object);
        expect("Settlement Currency").toBeInObject(object);
        expect("Transaction State").toBeInObject(object);
        expect("Fee").toBeInObject(object);
        expect("Fee Currency").toBeInObject(object);
        break;
      case REPORT_TYPES.TRANSFER_FUNDS:
        expect("Processed Date Time").toBeInObject(object);
        expect("From").toBeInObject(object);
        expect("To").toBeInObject(object);
        expect("Amount").toBeInObject(object);
        expect("Currency").toBeInObject(object);
        expect("Transfer Fund State").toBeInObject(object);
        expect("Executed By").toBeInObject(object);
        break;
    }
  });
};

export const expectElementEquality = <T>(element: T, toEqual: T, option = true): void => {
  let assert = expect(element, `Equality of ${element} and ${toEqual} is incorrect`);
  if (!option) {
    assert = assert.not;
  }
  assert.toEqual(toEqual);
};

export const expectItemToContainText = (element: string, toContain: string | string[]): void => {
  const assert = expect(element, `The ${element} does not contain "${toContain}" text`);

  if (Array.isArray(toContain)) {
    toContain.forEach((item) => assert.toContain(item));
  } else {
    assert.toContain(toContain);
  }
};

export const expectElementToContainText = async (
  element: Locator,
  toContain: string | string[],
  option = true
): Promise<void> => {
  let assert = expect(element, `The ${element} does not contain "${toContain}" text`);
  if (!option) {
    assert = assert.not;
  }
  return assert.toContainText(toContain);
};

export const expectElementToHaveText = async (
  element: Locator,
  toContain: string | RegExp | string[],
  option = true
): Promise<void> => {
  let assert = expect(element, `The ${element} does not have "${toContain}" text`);
  if (!option) {
    assert = assert.not;
  }
  await assert.toHaveText(toContain, {
    timeout: 60000,
  });
};

export const expectElementToBeDisabled = async (element: Locator, option = true): Promise<void> => {
  return option
    ? expect(element, `The ${element} is not disabled`).toBeDisabled()
    : expect(element, `The ${element} is not enabled`).toBeEnabled();
};

export const expectElementToHaveValue = async (element: Locator, toContain: string | RegExp): Promise<void> => {
  await expect(element, `The ${element} does not have "${toContain}" value`).toHaveValue(toContain);
};

export const expectNumbersComparison = (
  numbers: string[] | number,
  toCompare: number,
  condition: COMPARE_CONDITIONS
): void => {
  const customExpect = (item: string[] | number, message: string, condition: COMPARE_CONDITIONS) => {
    const assert = expect(item, message);
    if (condition === COMPARE_CONDITIONS.MORE) {
      return assert.toBeGreaterThan(toCompare);
    } else if (condition === COMPARE_CONDITIONS.LESS) {
      return assert.toBeLessThan(toCompare);
    } else if (condition === COMPARE_CONDITIONS.MORE_OR_EQUAL) {
      return assert.toBeGreaterThanOrEqual(toCompare);
    } else if (condition === COMPARE_CONDITIONS.LESS_OR_EQUAL) {
      return assert.toBeLessThanOrEqual(toCompare);
    }
  };

  if (typeof numbers === "number") {
    return customExpect(numbers, `${numbers} is not ${condition} than ${toCompare}`, condition);
  } else {
    const absNumbers = numbers.map((number: string) => Math.abs(parseInt(number)));

    return absNumbers.forEach((number: number) => {
      return customExpect(number, `Items from ${JSON.stringify(numbers)} not ${condition} ${toCompare}`, condition);
    });
  }
};

export const expectElementToHaveAttribute = async (
  element: Locator,
  attribute: ATTRIBUTES,
  value: string,
  option = true
): Promise<void> => {
  let assert = expect(element, `"${element}" has improper "${attribute}" attribute`);
  if (!option) {
    assert = assert.not;
  }
  await assert.toHaveAttribute(attribute, new RegExp(value));
};

export const expectToHaveCount = async (element: Locator, count: number): Promise<void> => {
  await expect(element, `Element's count is not ${count}`).toHaveCount(count);
};
