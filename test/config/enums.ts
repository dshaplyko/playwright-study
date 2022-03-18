/* eslint-disable */
export enum WIDGETS {
  YOUR_PORTFOLIO = "your-portfolio",
  DIGITAL_ASSETS = "digital-assets",
  FIAT_CURRENCIES = "fiat-currencies",
}

export enum STATES {
  ENABLED = "enabled",
  DISABLED = "disabled",
  SELECTED = "selected",
}

export enum PORTFOLIO_COLUMNS {
  CURRENCY = "currency",
  DISRTIBUTION = "distribution",
  TOTAL = "total",
  PRIMARY = "primary",
  BROKERAGE = "brokerage",
  EXCHANGE = "exchange",
  LEVERAGE = "leverage",
  BUY = "unsettled-buy",
  SELL = "unsettled-sell",
}

export enum ACTIVITY_COLUMNS {
  METHOD = "method",
  AMOUNT = "amount",
  CURRENCY = "currency",
  ACCOUNT_GROUP = "accountGroup",
  GROUP_OWNER = "groupOwner",
  FEE = "fee",
  DESCRIPTION = "description",
  STATUS = "status",
  INITIATED = "initiated",
  INITIATED_BY = "initiatedBy",
}

export enum FEATURE_HIGHLIGHT {
  GET_VERIFIED = "get-verified",
  NEW_SITE_CONSOLE = "your-console",
  CASH_OUT = "cash-out",
  DEPOSIT_CASH = "payment-in",
  BUY_COIN = "purchase-",
  DEPOSIT_COIN = "transfer-in-",
  ENABLE_TWO_FACTOR = "enable-2-factor-security",
  REGISTER_EXTERNAL_ADDRESSES = "register-external-addresses",
  CUSTOMER_SUPPORT = "customer-support",
  ACCOUNT_BOX = "premium",
  UPGRADE_YOUR_ACCOUNT = "upgrade-your-account",
}

export enum REPORT_TYPES {
  TRANSACTION = "Transaction",
  TRADE = "Trade",
  RFQ = "iRFQ",
  TRANSFER_FUNDS = "Transfer Funds",
}

export enum TRANSACTION_FILTER_TYPES {
  Deposit = "Payment In",
  RFQ = "iRFQ",
  Trade = "Trade",
  Transaction = "Transaction",
  Withdrawal = "Payment Out",
  RFS = "RFS",
}

export enum TRANSACTION_STATUSES {
  CANCELLED = "Cancelled",
  CANCELLED_INSUFFICIENT_FUNDS = "Cancelled, Insufficient Funds",
  PENDING = "Pending Settlement",
  PENDING_CONFIRM = "Pending User Confirmation",
  PENDING_LC_SUB_CHECKS = "Pending Compliance Check",
  PENDING_REVERSE = "Pending Reverse",
  PROCESSED = "Processed",
  REVERSED = "Reversed",
  SUBMITTED = "Submitted",
  SUSPENDED = "Suspended",
}

export enum COMPARE_CONDITIONS {
  MORE = "more than",
  MORE_OR_EQUAL = "more or equal",
  LESS = "less than",
  LESS_OR_EQUAL = "less or equal",
}

export enum BALANCE_ENUM {
  Primary,
  Exchange,
  Brokerage,
}

export enum URLs {
  CONFIG = "**/config*",
  ACCOUNT = "**/account*",
  NEXT_STEPS = "**/nextSteps*",
  DEPOSIT_METADATA = "**/depositMetaData*",
  DEPOSIT_NOTIFICATIONS = "**/activity/depositNotifications*",
  BANK_INFO = "**/bankInfo*",
  BANK_METADATA = "**/bankMetaData*",
  SUBMIT_COIN_WITHDRAWAL = "**/submitCoinWithdrawal*",
  SUBMIT_CASH_WITHDRAWAL = "**/submitCashWithdrawal*",
  WITHDRAWAL_METADATA = "**/withdrawalMetaData*",
  CONTACT = "**/user/contact*",
  REMOVE_CONTACT = "**/user/contact/c0bc32cd-c489-4b53-b147-5728d090508c*",
  REGISTER = "**/register/*",
  SETTINGS = "**/settings/waiveEmailConfirmation*",
  QUOTE = "**/quote/save*",
  SAVE_TRADE = "**/trade/save*",
  PASSWORD = "**/security/password*",
  SECURITY = "**/2fa/otp*",
  API = "**/settings/apiKey*",
  LOGIN = "**/login*",
}

export enum SETTINGS_TABS {
  GENERAL = "general",
  VERIFY = "verify",
  SECURITY = "twoFactor",
  NOTIFICATIONS = "notifications",
  API = "apiKeys",
  TRANSFER_OUT = "waiveEmailConfirmation",
  PASSWORD = "password",
}

export enum TIMEZONES {
  HK = "Asia / China / Hong Kong (+08: 00)",
  MINSK = "Europe / Belarus / Minsk (+02: 00)",
}

export enum CURRENCIES {
  AUD = "AUD",
  BAT = "BAT",
  USD = "USD",
  USDT = "USDT",
  EUR = "EUR",
  HKD = "HKD",
  BTC = "BTC",
  XRP = "XRP",
  GBP = "GBP",
  CHF = "CHF",
  JPY = "JPY",
  SGD = "SGD",
  IRFQ = "iRFQ 3",
}

export enum BANK_TRANSFER_FORMS {
  SIGNET_TRANSFER = "Signet Transfer",
  BANK_WIRE = "Bank Wire",
  GENERIC_BANK_TRANSFER = "Generic Bank Transfer",
  HK_BANK_TRANSFER = "Hong Kong Bank Transfer",
  SEPA = "EU Bank (SEPA)",
  AUSTRALIAN_BANK_TRANSFER = "Australian Bank Transfer",
  SWISS_BANK_TRANSFER = "Swiss bank transfer",
  JAPAN_BANK_TRANSFER = "Japan Bank Transfer",
  PAN = "Bank Transfer",
}

export enum NOTIFICATION_OPTIONS {
  TRADE = "trade",
  AUTHENTICATION = "authEvents",
  ORDER_ACTIVITY = "orderEvents",
  ACCOUNT_ACTIVITY = "accountEvents",
  NEWS = "subscribed",
  PROMOTIONS = "promotions",
}

export enum PASSWORD_STRENGTH {
  WEAK = "Weak",
  MEDIUM = "Medium",
  STRONG = "Strong",
  VERY_STRONG = "Very Strong",
}

export enum REPORT_FORM {
  TRANSACTION = "Transaction Report",
  TRADE = "Trade Report",
  TRANSFER_FUNDS = "Transfer Fund Report",
  BUY_SELL = "Buy/Sell Report",
}

export enum TWO_FA_SETTINGS {
  OTP = "OTP (One-Time Password)",
  YUBIKEY = "YubiKeys",
}

export enum USER_VERIFICATION_STATE {
  CRYPTO_VERIFIED = "CRYPTO_VERIFIED",
  KYC_VERIFIED = "KYC_VERIFIED",
  PENDING_DEPOSIT = "PENDING_DEPOSIT",
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  PRE_VERIFIED = "PRE_VERIFIED",
  REJECTED = "REJECTED",
  UNVERIFIED = "UNVERIFIED",
  VERIFIED = "VERIFIED",
}

export enum USER_VERIFICATION_MESSAGES {
  NOT_SUPPORTED_JURISDICTION = "We are not currently accepting verifications from your selected/ detected jurisdiction.",
  KYC_VERIFIED = "KYC_VERIFIED",
  PENDING_DEPOSIT = "PENDING_DEPOSIT",
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  PRE_VERIFIED = "PRE_VERIFIED",
  REJECTED = "We could not process your verification request. Please contact customer support.",
  UNVERIFIED = "Your account and details have not been verified. Select verify below to begin the process.",
  VERIFIED = "Your verification application has been completed.  You now maintain verified status.",
}

export enum ACCOUNT_GROUPS {
  DEFAULT = "Default",
  ACCOUNT_GROUP_2 = "AccountGroup2",
  ACCOUNT_GROUP_3 = "AccountGroup3",
  ACCOUNT_GROUP_4 = "AccountGroup4",
  ACCOUNT_GROUP_5 = "AccountGroup5",
  TEST_GROUP_2 = "testGroup2",
}
