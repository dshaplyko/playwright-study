export const BASE_URL = process.env.BASE_URL;
/**
 * //TODO: move to the secure place a little bit later
 */

export const loginRequestBody = {
  username: "user",
  password: "password",
  trusted: true,
  captcha: "",
  platform: null,
  device: {
    h: "173bb01280d0a76e0e97ca90df69389d",
    l: "ru-RU",
    r: "900x1440",
    h2: "d0fe52bfa9318da3c801e9d19d8e59a91f067862ce53cf2301879ab1bd6997a7",
  },
};

export const balanceRegexp = /([0-9])+[,]+([0-9])+[.]+(\d){2}/g;
export const PERCENTAGE = 100;
export const DECIMAL_PART = 2;
export const FUNDS_FIAT_ERROR = "Please contact the support team for more information.";
export const FUNDS_ALERT_DIGITAL_ASSET =
  "Please save your old Digital Asset address at secure place before creating the new Digital Asset address.";
export const FUNDS_ERROR_SELECT_PAYMENT =
  "Cannot create new digital asset address. Please use the current digital asset address at least once before creating a new digital asset address.";
export const FUNDS_VERIFICATION_MESSAGE =
  "You are required to complete our verification process prior to being able to make payment in.";
export const BROKERAGE_VERIFICATION_MESSAGE =
  "No trading pair is available at the moment. For more information, please contact us.";
export const WALLET_ADDRESS = "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq";
export const BANK_WIRE_INSTRUCTION =
  "NOTE: International wire transfers usually take 2-5 business days and are subject to our stringent AML compliance requirements.";
export const SIGNET_TRANSFER_INSTRUCTION =
  "Signet transfers are usually completed within 30 minutes and are subject to our stringent AML compliance requirements.";
export const BASIC_INSTRUCTION =
  "NOTE: Domestic wire transfers usually take 2-5 business days and are subject to our stringent AML compliance requirements.";
export const TEST_CONTACT = {
  name: "Test User",
  reference: "Test User BTC",
  assetAddress: "2NCufv57dMLUsvnpeMXpJwEDrWhqehML8fa",
  currency: "BTC",
};

export const RED_COLOR = "rgba(209, 31, 63, 0.8)";
export const GREEN_COLOR = "rgba(49, 165, 137, 0.8)";
export const NOTIFICATIONS_PLACEHOLDER = "No Notifications For The Moment";
export const NON_VALID_CREDENTIALS_MESSAGE = "Your password is incorrect";
export const SUCCESSFUL_REGISTRATION_MESSAGE = "You have created a new account!";
export const EXISTING_EMAIL_ERROR =
  "This email address has already been registered but not activated. Didn't receive the welcome message in email?";
export const RESET_EMAIL_MESSAGE = "The email will be sent if your account has been registered with us.";
export const SITE_NOT_AVAILABLE = "Site temporarily unavailable, we will resume full function shortly.";
export const USER_DATA = {
  email: "test@email.com",
  phoneNumber: "+375291111111",
  country: "Andorra",
  accept: true,
};
export const WEAK_PASSWORD_MESSAGE =
  "Your Password must be between 8 and 20 characters; it must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.";
export const NO_REPORT_MESSAGE =
  "There are no results for your report query. Please adjust the query and search again.";
export const SCHEDULED_MAINTENANCE_MESSAGE =
  /We will be undergoing scheduled maintenance of our Exchange at 7:00 AM. Other platform services remain operational and will not be impacted. The Exchange service will resume at 07:30 AM - Resting orders on the Exchange will be reinstated after the maintenance./;
export const WRONG_OTP = "The OTP you entered is invalid";
export const WRONG_YUBIKEY = "The YubiKey you entered is invalid";
export const JAPAN_ACCOUNT_TYPES = ["Saving", "Checking", "Payment In"];
