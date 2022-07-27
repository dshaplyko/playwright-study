export const BASE_URL = process.env.BASE_URL || "https://trade-sg.oslsandbox.com";
export const password = process.env.USER_PASS;

export const TEST_USERS = {
  MAIN: {
    email: "inna_hetman@epam.com",
    password,
  },
  EMPTY: {
    email: "andy.wong+empty@osl.com",
    password,
  },
  TWO_FA: {
    email: "andy.wong+2fa@osl.com",
    password,
  },
  WITH_GROUPS: {
    email: "andy.wong+transferTest@osl.com",
    password,
  },
  TRADER: {
    email: "andy.wong@osl.com",
    password,
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
export const BTC_WALLET_ADDRESS = "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq";
export const USDT_WALLET_ADDRESS = "0xc6cde7c39eb2f0f0095f41570af89efc2c1ea828";
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
export const LIGHT_GREEN = "#7ed321";
export const MAIN_COLOR = "#2F5668";
export const NOTIFICATIONS_PLACEHOLDER = "No Notifications For The Moment";
export const NON_VALID_CREDENTIALS_MESSAGE = "Your password is incorrect";
export const SUCCESSFUL_REGISTRATION_MESSAGE = "You have created a new account!";
export const EXISTING_EMAIL_ERROR =
  "This email address has already been registered but not activated. Didn't receive the welcome message in email?";
export const RESET_EMAIL_MESSAGE = /The email will be sent if your account has been registered with us./;
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
export const VERIFY_DIALOG_TEXT =
  /Buy and trade with your trusted partner (.*) and benefit from the institutional-grade offerings/;
export const PRIMARY_HINT =
  "Used for Deposit, Withdrawal and Transfer of Funds only. This account can`t be used for Trading";
export const EXCHANGE_HINT =
  "Used for Trading on Exchange only. You can transfer funds from PRIMARY to EXCHANGE or EXCHANGE to PRIMARY";
export const BROKERAGE_HINT =
  "Used for Trading on OTC and RFQ only. You can transfer funds from PRIMARY to BROKERAGE or BROKERAGE to PRIMARY";
export const FIAT_CURRENCIES = ["USD", "EUR", "AUD", "SGD", "HKD", "JPY", "CHF", "GBP", "PHP"];
export const DIGITAL_CURRENCIES = ["BTC", "USDC", "USDT", "ETH", "BCH", "SUSHI"];
export type TransactionTypes = "Primary" | "Exchange" | "Brokerage" | "ExtTradeVenue-ZM";
export const RFQ_TRADING_PROHIBITED =
  "Your trading activity is temporarily unavailable.For any assistance, please contact our customer hotline.";
export const RFQ_QUOTES_NOT_AVAILABLE = "Quote(s) are only available for above digital assets.";
export const RFQ_MAXIMUM_SELL_ERROR = /Exceeds the maximum size of \[ (\d)+[.](\d)+ ]/;
export const RFQ_MINIMUM_SELL_ERROR = /Less than the minimum size of \[ (\d){1}[.](\d)+ ]/;
export const RFQ_INSUFFIENCT_AMOUNT = "Insufficient limit for submitted quotation, please refer to your limit usage.";
export const RFQ_CUSTOMER_SUPPORT =
  /Request cannot be completed at the moment. Please contact our customer support for assistance./;
export const RFQ_QUOTE_EXPIRED = "The quote has expired. Please try again.";
export const INVALID_CAPTCHA = "Invalid captcha entered. Please try again.";
