import {
  expect, Page, Locator,
} from "@playwright/test";

export const verifyPageUrlContains = async (page: Page, urlToCheck: string): Promise<void> => {
  await expect(page).toHaveURL(urlToCheck);
};

export const expectElementVisibility = async (element: Locator, visibility: boolean): Promise<Locator> => {
  const elementsCount = await element.count();

  if (elementsCount > 1) {
    for (let i = 0; i < elementsCount; i++) {
      const assert = expect(element.nth(i));
      if (visibility) {
        return assert.toBeVisible();
      }
      return assert.toBeHidden();
    }
  } else {
    const assert = expect(element);
    if (visibility) {
      return assert.toBeVisible();
    }
    return assert.toBeHidden();
  }
};

export const expectAllItemsFromArrayAreEqual = (arr: string[], toContain: string) => {
  arr.forEach(item => expect(item).toBe(toContain));
};
