export const BASE_URL = "http://localhost:4200";
export const TEST_USER = {
  email: process.ENV.PASS,
  password: process.ENV.EMAIL,
};

export const loginRequestBody = {
  username: TEST_USER.email,
  password: TEST_USER.password,
  trusted: true,
  captcha: "",
  platform: null,
  device: {
    h: "a1367d727a5d724ba754ed37cb920fc8",
    l: "ru-RU",
    r: "900x1440",
    h2: "f4acd7c5aab3d4bb0312adf4c000bd69962b7524667b12c548d7cb11add21b7f",
  },
};

export const balanceRegexp: RegExp = /([0-9])+[,]+([0-9])+[.]+(\d){2}/g;
export const PERCENTAGE = 100;
export const DECIMAL_PART = 2;
