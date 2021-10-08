import { expect, Locator } from "@playwright/test/index.js";

export const checkSmth = async (element: Locator) => {
  await expect(element).toBeVisible();
};
