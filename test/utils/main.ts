/* eslint-disable no-return-assign */
import { DECIMAL_PART } from "../config";
import { test } from "@playwright/test";
type states = "clean" | "admin";

export const getValueAsNumber = (amount: string): number => parseFloat(amount.replace(/[^(.|\d)]+/g, ""));

export const calculateSumFromTable = (values: string[]): number =>
  parseFloat(values.reduce((acc, curr) => (acc += getValueAsNumber(curr)), 0).toFixed(DECIMAL_PART));

export const getRandomIndex = (arr: string[] | number[]) => Math.floor(Math.random() * arr.length);

export const waitSeveralSec = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const useState = (state: states) => {
  const path = state === "admin" ? "./test/config/states/admin.json" : "./test/config/states/default.json";

  test.use({
    storageState: path,
  });
};
