/* eslint-disable no-return-assign */
import { DECIMAL_PART } from "../config";
import { test } from "@playwright/test";

export const getValueAsNumber = (amount: string): number => parseFloat(amount.replace(/[^(.|\d)]+/g, ""));

export const calculateSumFromTable = (values: string[]): number =>
  parseFloat(values.reduce((acc, curr) => (acc += getValueAsNumber(curr)), 0).toFixed(DECIMAL_PART));

export const getRandomIndex = (arr: string[] | number[]) => Math.floor(Math.random() * arr.length);

export const getRandomNumber = (limit: number): number => Math.floor(Math.random() * limit);

export const convertNumberToString = (num: number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const waitSeveralSec = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const useState = (state: "clean" | "trader") => {
  const path = state === "trader" ? "./test/config/states/trader.json" : "./test/config/states/default.json";

  test.use({
    storageState: path,
  });
};

export const generateRandomString = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const checkArrayType = (arr: any[]): string => {
  if (arr.every((item: any) => typeof item === "string")) {
    return "string";
  } else if (arr.every((item) => typeof item === "number")) {
    return "number";
  } else {
    throw new Error("Array is not typeof string[] or number[]");
  }
};
