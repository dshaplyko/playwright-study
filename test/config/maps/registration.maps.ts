import { USER_DATA } from "../constants";

export const registrationMap = [
  {
    name: "should not register without email address",
    email: "",
    phoneNumber: USER_DATA.phoneNumber,
    country: USER_DATA.country,
    accept: USER_DATA.accept,
    message: /Please provide your email address/,
  },
  {
    name: "should not register without phone number",
    email: "test@mail.ru",
    phoneNumber: "",
    country: USER_DATA.country,
    accept: USER_DATA.accept,
    message: /Please provide your phone number/,
  },
  {
    name: "should not register without country selection",
    email: "test@mail.ru",
    phoneNumber: USER_DATA.phoneNumber,
    country: "",
    accept: USER_DATA.accept,
    message: /You must select your country of residence/,
  },
  {
    name: "should not register without acceptance Terms of Use",
    email: "test@mail.ru",
    phoneNumber: USER_DATA.phoneNumber,
    country: USER_DATA.country,
    accept: false,
    message: /You must accept the terms and conditions before using this site./,
  },
];
