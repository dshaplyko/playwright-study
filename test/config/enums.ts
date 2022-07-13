/* eslint-disable */
export enum WIDGETS {
  YOUR_PORTFOLIO = "your-portfolio",
  DIGITAL_ASSETS = "digital-assets",
  FIAT_CURRENCIES = "fiat-currencies",
}

export enum ATTRIBUTES {
  ENABLED = "aria-enabled",
  DISABLED = "aria-disabled",
  SELECTED = "aria-selected",
  PLACEHOLDER = "placeholder",
}

export enum PORTFOLIO_COLUMNS {
  CURRENCY = "Currency",
  DISRTIBUTION = "Distribution",
  TOTAL = "Total",
  PRIMARY = "Primary",
  BROKERAGE = "Brokerage",
  EXCHANGE = "Exchange",
  LEVERAGE = "Leverage",
  BUY = "Unsettled Buy",
  SELL = "Unsettled Sell",
}

export enum ACTIVITY_COLUMNS {
  METHOD = "Method",
  AMOUNT = "Amount",
  CURRENCY = "Currency",
  ACCOUNT_GROUP = "Account Group",
  GROUP_OWNER = "Account Group Owner",
  FEE = "Fee",
  DESCRIPTION = "Description",
  STATUS = "Status",
  INITIATED = "Initiated",
  INITIATED_BY = "Initiated By",
}

export enum ACTIVITY_COLUMNS_NAMES {
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
  CUSTOMER_SUPPORT = "customer-support",
  ACCOUNT_BOX = "premium",
  UPGRADE_YOUR_ACCOUNT = "upgrade-your-account",
  YOUR_CONSOLE = "cta-enabled-card",
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
  MarginInterest = "Margin Interest",
  MarginLoan = "Margin Loan",
  MarginLiq = "Liquidation RFQ Trade",
}

export enum TRANSACTION_FILTER_CURRENCIES {
  BTC = "BTC",
  USDT = "USDT-ERC20",
  SGD = "SGD",
  ETH = "ETH",
  BCH = "BCH",
  USD = "USD",
  USDC = "USDC",
  SUSHI = "SUSHI",
  PHP = "PHP",
  EUR = "EUR",
  CAD = "CAD",
  BRL = "BRL",
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
  OTP = "**/2fa/otp/*",
  POSTS = "**/post?category*",
  CURRENT = "**/accounts/current*",
  LIMIT = "**/user/limit*",
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
  USDT_ERC20 = "USDT-ERC20",
  EUR = "EUR",
  HKD = "HKD",
  BTC = "BTC",
  XRP = "XRP",
  GBP = "GBP",
  CHF = "CHF",
  JPY = "JPY",
  SGD = "SGD",
  IRFQ = "iRFQ 3",
  ETH = "ETH",
  BCH = "BCH",
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
  DEFAULT = "andy.wong+transferTest@osl.com",
  ACCOUNT_GROUP_2 = "AccountGroup2",
  DEMO = "billy.chan+demo@osl.com",
}

export enum CONSOLE_ITEMS {
  ACCOUNT = "My Account",
  TRANSLATION = "Translation",
  FEATURES = "Features",
  PAGES = "Pages",
  IMAGES = "Images",
  THEMING = "Theming",
  GENERAL = "General",
  POSTS = "Posts",
  SOCIAL_MEDIA = "Social media",
  MEDIA = "Media",
  EXTERNAL_LINKS = "External links",
}

export enum FEATURES_OPTIONS {
  ANNOUNCEMENTS = "Announcements",
  API = "Api",
  MARKET_INSIGHTS = "Market Insights",
  IN_THE_PRESS = "In The Press",
  BLOCKCHAIN_EXPLORER = "Blockchain Explorer",
  BOOTLOADER_LOGO = "Bootloader Logo",
  ORDER_BOOK = "Order Book",
  TICKER = "Ticker",
  TRADE = "Trade",
}

export enum PAGES {
  ABOUT = "about",
  FEES = "fees",
  SECURITY = "security",
}

export enum MEDIA {
  TWITTER = "twitter",
  FACEBOOK = "facebook",
  YOUTUBE = "youtube",
  QQ = "qq",
}

export enum LIMIT_ROWS {
  TYPE,
  EXPOSURE,
  TOTAL,
  USAGE,
}
