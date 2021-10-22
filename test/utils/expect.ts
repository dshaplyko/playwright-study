import {
  expect, Page, Locator,
} from "@playwright/test/index.js";

export const verifyPageUrlContains = async (page: Page, urlToCheck: string): Promise<void> => {
  await expect(page).toHaveURL(urlToCheck);
};

export const expectElementVisibility = async (element: Locator, visibility: boolean): Promise<void> => {
  const assert = expect(element);
  if (visibility) {
    await assert.toBeVisible();
  } else {
    await assert.toBeHidden();
  }
};
