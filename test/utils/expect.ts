import { expect, Locator, Page } from "@playwright/test";
import { REPORT_TYPES, COMPARE_CONDITIONS, STATES } from "../config";

export const expectPageURLContains = async (page: Page, toContain: string | RegExp): Promise<void> => {
  await expect(page, "Page URL does not contain needed text").toHaveURL(toContain);
};

export const expectElementVisibility = async (element: Locator, visibility: boolean): Promise<void> => {
  const elementsCount: number = await element.count();

  if (elementsCount > 1) {
    for (let i = 0; i < elementsCount; i++) {
      const assert = expect(element.nth(i), `Visibility of ${element} is incorrect`);
      if (visibility) {
        await assert.toBeVisible();
      } else {
        await assert.toBeHidden();
      }
    }
  } else {
    const assert = expect(element, `Visibility of ${element} collection is incorrect`);
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

export const expectAllArrayItemsEqual = (arr: string[], toEqual: string, option = true): void => {
  arr.forEach((item, index, array) => {
    let assert = expect(item, `Equality of ${item} and ${toEqual} is incorrect. Array: ${JSON.stringify(array)}`);

    if (!option) {
      assert = assert.not;
    }
    assert.toEqual(toEqual);
  });
};

export const expectArraySortedDescending = (arr: number[]): void => {
  const arrayToCompare = [...arr].sort((a, b) => b - a);
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

export const expectItemToContainText = (element: string, toContain: string): void => {
  expect(element, `The ${element} does not contain "${toContain}" text`).toContain(toContain);
};

export const expectElementToHaveText = async (element: Locator, toContain: string | RegExp): Promise<void> => {
  await expect(element, `The ${element} does not have "${toContain}" text`).toHaveText(toContain);
};

export const expectElementToBeDisabled = async (element: Locator, option = true): Promise<Locator> => {
  return option
    ? expect(element, `The ${element} is not disabled`).toBeDisabled()
    : expect(element, `The ${element} is not enabled`).toBeEnabled();
};

export const expectElementToHaveValue = async (element: Locator, toContain: string | RegExp): Promise<void> => {
  await expect(element, `The ${element} does not have "${toContain}" value`).toHaveValue(toContain);
};

export const expectNumbersComparison = (numbers: string[], toCompare: number, condition: COMPARE_CONDITIONS): void => {
  const absNumbers = numbers.map((number: string) => Math.abs(parseInt(number)));

  return absNumbers.forEach((number: number) => {
    const assert = expect(number, `Items from ${JSON.stringify(numbers)} not ${condition} ${toCompare}`);

    if (condition === COMPARE_CONDITIONS.MORE) {
      assert.toBeGreaterThan(toCompare);
    } else if (condition === COMPARE_CONDITIONS.LESS) {
      assert.toBeLessThan(toCompare);
    } else if (condition === COMPARE_CONDITIONS.MORE_OR_EQUAL) {
      assert.toBeGreaterThanOrEqual(toCompare);
    } else if (condition === COMPARE_CONDITIONS.LESS_OR_EQUAL) {
      assert.toBeLessThanOrEqual(toCompare);
    }
  });
};

export const expectGreaterThan = (item: number, toCompare: number): void => {
  expect(item, `${item} is not greater than ${toCompare}`).toBeGreaterThan(toCompare);
};

export const expectToBeGreaterOrEqual = (item: number, toCompare: number) => {
  expect(item, `"${item}" is not greater or equal to "${toCompare}"`).toBeGreaterThanOrEqual(toCompare);
};

export const expectElementsState = async (element: Locator, state: STATES, option = true): Promise<void> => {
  let assert = expect(element, `"${element}" has improper "${state}" state`);
  if (!option) {
    assert = assert.not;
  }
  await assert.toHaveAttribute(`aria-${state}`, "true");
};

export const expectEnumContains = (items: string[], enumToCheck: any): void => {
  expect(
    items.every((item) => Object.values(enumToCheck).includes(item)),
    `"The items of ${JSON.stringify(items)}" do not exist in ${JSON.stringify(enumToCheck)}`
  ).toEqual(true);
};

export const expectBackgroundColor = async (element: Locator, color: string): Promise<void> => {
  await expect(element, `The background color is not ${color}`).toHaveCSS("background-color", color);
};

export const expectToHaveCount = async (element: Locator, count: number): Promise<void> => {
  await expect(element, `Element's count is not ${count}`).toHaveCount(count);
};
