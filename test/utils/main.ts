/* eslint-disable no-return-assign */
import { DECIMAL_PART } from "../config";

export const getValueAsNumber = (amount: string): number => parseFloat(amount.replace(/[^(.|\d)]+/g, ""));

export const calculateSumFromTable = (values: string[]): number => parseFloat(values.reduce((acc, curr) => acc += getValueAsNumber(curr), 0).toFixed(DECIMAL_PART));
