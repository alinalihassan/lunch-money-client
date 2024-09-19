//#region Currencies
// List updated from https://lunchmoney.dev/#appendix
type Currency =
  | "aed"
  | "afn"
  | "all"
  | "amd"
  | "ang"
  | "aoa"
  | "ars"
  | "aud"
  | "awg"
  | "azn"
  | "bam"
  | "bbd"
  | "bdt"
  | "bgn"
  | "bhd"
  | "bif"
  | "bmd"
  | "bnd"
  | "bob"
  | "brl"
  | "bsd"
  | "btc"
  | "btn"
  | "bwp"
  | "byn"
  | "bzd"
  | "cad"
  | "cdf"
  | "chf"
  | "clp"
  | "cny"
  | "cop"
  | "crc"
  | "cuc"
  | "cup"
  | "cve"
  | "czk"
  | "djf"
  | "dkk"
  | "dop"
  | "dzd"
  | "egp"
  | "ern"
  | "etb"
  | "eur"
  | "fjd"
  | "fkp"
  | "gbp"
  | "gel"
  | "ggp"
  | "ghs"
  | "gip"
  | "gmd"
  | "gnf"
  | "gtq"
  | "gyd"
  | "hkd"
  | "hnl"
  | "hrk"
  | "htg"
  | "huf"
  | "idr"
  | "ils"
  | "imp"
  | "inr"
  | "iqd"
  | "irr"
  | "isk"
  | "jep"
  | "jmd"
  | "jod"
  | "jpy"
  | "kes"
  | "kgs"
  | "khr"
  | "kmf"
  | "kpw"
  | "krw"
  | "kwd"
  | "kyd"
  | "kzt"
  | "lak"
  | "lbp"
  | "lkr"
  | "lrd"
  | "lsl"
  | "ltl"
  | "lvl"
  | "lyd"
  | "mad"
  | "mdl"
  | "mga"
  | "mkd"
  | "mmk"
  | "mnt"
  | "mop"
  | "mro"
  | "mur"
  | "mvr"
  | "mwk"
  | "mxn"
  | "myr"
  | "mzn"
  | "nad"
  | "ngn"
  | "nio"
  | "nok"
  | "npr"
  | "nzd"
  | "omr"
  | "pab"
  | "pen"
  | "pgk"
  | "php"
  | "pkr"
  | "pln"
  | "pyg"
  | "qar"
  | "ron"
  | "rsd"
  | "rub"
  | "rwf"
  | "sar"
  | "sbd"
  | "scr"
  | "sdg"
  | "sek"
  | "sgd"
  | "shp"
  | "sll"
  | "sos"
  | "srd"
  | "std"
  | "svc"
  | "syp"
  | "szl"
  | "thb"
  | "tjs"
  | "tmt"
  | "tnd"
  | "top"
  | "try"
  | "ttd"
  | "twd"
  | "tzs"
  | "uah"
  | "ugx"
  | "usd"
  | "uyu"
  | "uzs"
  | "vef"
  | "vnd"
  | "vuv"
  | "wst"
  | "xaf"
  | "xcd"
  | "xof"
  | "xpf"
  | "yer"
  | "zar"
  | "zmw"
  | "zwl";

//#endregion

//#region User
export interface User {
  /**
   * Unique identifier for user
   */
  user_id: number;
  /**
   * User's name
   */
  user_name: string;
  /**
   * User's email
   */
  user_email: string;
  /**
   * Unique identifier for the associated budgeting account
   */
  account_id: number;
  /**
   * Name of the associated budgeting account
   */
  budget_name: string;
  /**
   * Primary currency from user's settings
   */
  primary_currency: Currency;
  /**
   * User-defined label of the developer API key used. Returns null if nothing has been set.
   */
  api_key_label?: number;
}
//#endregion

//#region Categories
export interface Category {
  /**
   * A unique identifier for the category.
   */
  id: number;
  /**
   * The name of the category. Must be between 1 and 40 characters.
   */
  name: string;
  /**
   * The description of the category. Must not exceed 140 characters.
   */
  description?: string;
  /**
   * If true, the transactions in this category will be treated as income.
   */
  is_income: boolean;
  /**
   * If true, the transactions in this category will be excluded from the budget.
   */
  exclude_from_budget: boolean;
  /**
   * If true, the transactions in this category will be excluded from totals.
   */
  exclude_from_totals: boolean;
  /**
   * If true, the category is archived and not displayed in relevant areas of the Lunch Money app.
   */
  archived?: boolean;
  /**
   * The date and time of when the category was last archived (in the ISO 8601 extended format).
   */
  archived_on?: string;
  /**
   * The date and time of when the category was last updated (in the ISO 8601 extended format).
   */
  updated_at?: string;
  /**
   * The date and time of when the category was created (in the ISO 8601 extended format).
   */
  created_at?: string;
  /**
   * If true, the category is a group that can be a parent to other categories.
   */
  is_group: boolean;
  /**
   * The ID of a category group (or null if the category doesn't belong to a category group).
   */
  group_id?: number;
  /**
   * Numerical ordering of categories
   */
  order?: number;
  /**
   * For category groups, this will populate with the categories nested within and include id, name, description and created_at fields.
   */
  children?: CategoryChildren[];
  /**
   * 	For grouped categories, the name of the category group
   */
  group_category_name?: string;
}

export interface CategoryChildren {
  /**
   * A unique identifier for the category.
   */
  id: number;
  /**
   * The name of the category. Must be between 1 and 40 characters.
   */
  name: string;
  /**
   * The description of the category. Must not exceed 140 characters.
   */
  description?: string;
  /**
   * The date and time of when the category was created (in the ISO 8601 extended format).
   */
  created_at?: string;
}
//#endregion

//#region Tags
export interface Tag {
  /**
   * Unique identifier for tag
   */
  id: number;
  /**
   * User-defined name of tag
   */
  name: string;
  /**
   * User-defined description of tag
   */
  description?: string;
  /**
   * If true, the tag will not show up when creating or updating transactions in the Lunch Money app
   */
  archived: boolean;
}
//#endregion

//#region Transactions
export type TransactionStatus = "cleared" | "uncleared" | "pending";

export type RecurringCadence =
  | "once a week"
  | "every 2 weeks"
  | "twice a month"
  | "monthly"
  | "every 2 months"
  | "every 3 months"
  | "every 4 months"
  | "twice a year"
  | "yearly";

export type RecurringType = "cleared" | "suggested" | "dismissed";

export type AssetStatus = "active" | "closed";

export type TransactionSource =
  | "api"
  | "csv"
  | "manual"
  | "merge"
  | "plaid"
  | "recurring"
  | "rule"
  | "user";

export interface Transaction {
  /**
   * Unique identifier for transaction.
   */
  id: number;
  /**
   * Date of transaction in ISO 8601 format.
   */
  date: string;
  /**
   * Name of payee. If recurring_id is not null, this field will show the payee of associated recurring expense instead of the original transaction payee.
   */
  payee: string;
  /**
   * Amount of the transaction in numeric format to 4 decimal places.
   */
  amount: string;
  /**
   * Three-letter lowercase currency code of the transaction in ISO 4217 format.
   */
  currency: Currency;
  /**
   * The amount converted to the user's primary currency. If the multicurrency feature is not being used, `to_base` and `amount` will be the same.
   */
  to_base: number;
  /**
   * Unique identifier of associated category (see Categories).
   */
  category_id?: number;
  /**
   * Name of category associated with transaction.
   */
  category_name?: string;
  /**
   * Unique identifier of associated category group, if any.
   */
  category_group_id?: number;
  /**
   * Name of category group associated with transaction, if any.
   */
  category_group_name?: string;
  /**
   * Based on the associated category's property, denotes if transaction is treated as income.
   */
  is_income: boolean;
  /**
   * Based on the associated category's property, denotes if transaction is excluded from budget.
   */
  exclude_from_budget: boolean;
  /**
   * Based on the associated category's property, denotes if transaction is excluded from totals.
   */
  exclude_from_totals: boolean;
  /**
   * The date and time of when the transaction was created (in the ISO 8601 extended format).
   */
  created_at: string;
  /**
   * The date and time of when the transaction was last updated (in the ISO 8601 extended format).
   */
  updated_at: string;
  /**
   * One of the following:
   * * `cleared`: User has reviewed the transaction
   * * `uncleared`: User has not yet reviewed the transaction
   * * `pending`: Imported transaction is marked as pending. This should be a temporary state.
   *
   * *Note: special statuses for recurring items have been deprecated.*
   */
  status: TransactionStatus;
  /**
   * Denotes if transaction is pending (not posted).
   */
  is_pending: boolean;
  /**
   * User-entered transaction notes If recurring_id is not null, this field will be description of associated recurring expense.
   */
  notes?: string;
  /**
   * The transactions original name before any payee name updates. For synced transactions, this is the raw original payee name from your bank.
   */
  original_name?: string;
  /**
   * Unique identifier of associated recurring item.
   */
  recurring_id?: number;
  /**
   * The payee of associated recurring expense instead of the original transaction.
   */
  recurring_payee?: string;
  /**
   * Description of associated recurring item.
   */
  recurring_description?: string;
  /**
   * Cadence of associated recurring item. One of the following:
   * * `once a week`
   * * `every 2 weeks`
   * * `twice a month`
   * * `monthly`
   * * `every 2 months`
   * * `every 3 months`
   * * `every 4 months`
   * * `twice a year`
   * * `yearly`
   */
  recurring_cadence?: RecurringCadence;
  /**
   * Type of associated recurring. One of the following:
   * * `cleared`
   * * `suggested`
   * * `dismissed`
   */
  recurring_type?: RecurringType;
  /**
   * Amount of associated recurring item.
   */
  recurring_amount?: string;
  /**
   * Currency of associated recurring item.
   */
  recurring_currency?: Currency;
  /**
   * Exists if this is a split transaction. Denotes the transaction ID of the original transaction.
   */
  parent_id?: number;
  /**
   * True if this transaction is a parent transaction and is split into 2 or more other transactions
   */
  has_children: boolean;
  /**
   * Exists if this transaction is part of a group. Denotes the parent’s transaction ID.
   */
  group_id?: number;
  /**
   * True if this transaction represents a group of transactions. If so, amount and currency represent the totalled amount of transactions bearing this transaction’s id as their group_id. Amount is calculated based on the user’s primary currency.
   */
  is_group: boolean;
  /**
   * Unique identifier of associated manually-managed account.
   *
   * *Note: `plaid_account_id` and `asset_id` cannot both exist for a transaction.*
   */
  asset_id?: number;
  /**
   * Institution name of associated manually-managed account
   */
  asset_institution_name?: string;
  /**
   * Name of associated manually-managed account.
   */
  asset_name?: string;
  /**
   * Display name of associated manually-managed account.
   */
  asset_display_name?: string;
  /**
   * Status of associated manually-managed account. One of the following:
   * * `active`
   * * `closed`
   */
  asset_status?: AssetStatus;
  /**
   * Unique identifier of associated Plaid account.
   *
   * *Note: `plaid_account_id` and `asset_id` cannot both exist for a transaction.*
   */
  plaid_account_id?: number;
  /**
   * Name of associated Plaid account.
   */
  plaid_account_name?: string;
  /**
   * Mask of associated Plaid account.
   */
  plaid_account_mask?: string;
  /**
   * Institution name of associated Plaid account.
   */
  institution_name?: string;
  /**
   * Display name of associated Plaid account.
   */
  plaid_account_display_name?: string;
  /**
   * Metadata associated with imported transaction from Plaid.
   */
  plaid_metadata?: string;
  /**
   * Source of the transaction. One of the following:
   * * `api`
   * * `csv`
   * * `manual`
   * * `merge`
   * * `plaid`
   * * `recurring`
   * * `rule`
   * * `user`
   */
  source?: TransactionSource;
  /**
   * Display name for payee for transaction based on whether or not it is linked to a recurring item. If linked, returns `recurring_payee` field. Otherwise, returns the `payee` field.
   */
  display_name?: string;
  /**
   * Display notes for transaction based on whether or not it is linked to a recurring item. If linked, returns `recurring_notes` field. Otherwise, returns the `notes` field.
   */
  display_notes?: string;
  /**
   * Display name for associated account (manual or Plaid). If this is a synced account, returns `plaid_account_display_name` or `asset_display_name`.
   */
  account_display_name?: string;
  /**
   * Array of Tag objects.
   */
  tags: Tag;
  /**
   * Array of child Transaction objections, these objects are slimmed down to the more essential fields, and contain an extra field called `formatted_date` that contains the date of transaction in ISO 8601 format
   */
  children?: TransactionChildren[];
  /**
   * User-defined external ID for any manually-entered or imported transaction. External ID cannot be accessed or changed for Plaid-imported transactions. External ID must be unique by asset_id. Max 75 characters.
   */
  external_id?: string;
}

interface TransactionChildren {
  /**
   * Unique identifier for transaction.
   */
  id: number;
  /**
   * Name of payee. If recurring_id is not null, this field will show the payee of associated recurring expense instead of the original transaction payee.
   */
  payee: string;
  /**
   * Amount of the transaction in numeric format to 4 decimal places.
   */
  amount: string;
  /**
   * Three-letter lowercase currency code of the transaction in ISO 4217 format.
   */
  currency: Currency;
  /**
   * Date of transaction in ISO 8601 format.
   */
  date: string;
  /**
   * Date of transaction in ISO 8601 format.
   */
  formatted_date: string;
  /**
   * User-entered transaction notes.
   */
  notes?: string;
  /**
   * Unique identifier of associated manually-managed account.
   *
   * *Note: `plaid_account_id` and `asset_id` cannot both exist for a transaction.*
   */
  asset_id?: number;
  /**
   * Unique identifier of associated Plaid account.
   *
   * *Note: `plaid_account_id` and `asset_id` cannot both exist for a transaction.*
   */
  plaid_account_id?: number;
  /**
   * The amount converted to the user's primary currency. If the multicurrency feature is not being used, `to_base` and `amount` will be the same.
   */
  to_base: number;
}
//#endregion

//#region Recurring Items
export type RecurringSource = "manual" | "transaction" | "system" | null;

export interface RecurringItemsSubset {
  /**
   * Payee or payer of the recurring item.
   */
  payee: string;
  /**
   * Amount of the recurring item in numeric format to 4 decimal places. For recurring items with flexible amounts, this is the average of the specified min and max amounts.
   */
  amount: number;
  /**
   * Three-letter lowercase currency code for the recurring item in ISO 4217 format.
   */
  currency: Currency;
  /**
   * The amount converted to the user's primary currency. If the multicurrency feature is not being used, `to_base` and `amount` will be the same.
   */
  to_base: number;
}

export interface RecurringItems {
  /**
   * Unique identifier for recurring item
   */
  id: number;
  /**
   * Denotes when recurring item starts occurring in ISO 8601 format. If null, then this recurring item will show up for all time before `end_date`.
   */
  start_date?: string;
  /**
   * Denotes when recurring item stops occurring in ISO 8601 format. If null, then this recurring item has no set end date and will show up for all months after `start_date`.
   */
  end_date?: string;
  /**
   * Payee or payer of the recurring item.
   */
  payee: string;
  /**
   * Three-letter lowercase currency code for the recurring item in ISO 4217 format.
   */
  currency: Currency;
  /**
   * The id of the user who created this recurring item.
   */
  created_by: number;
  /**
   * The date and time of when the recurring item was created (in the ISO 8601 extended format).
   */
  created_at: string;
  /**
   * The date and time of when the recurring item was updated (in the ISO 8601 extended format).
   */
  updated_at: string;
  /**
   * Initial date that a transaction associated with this recurring item occurred. This date is used in conjunction with values of quantity and granularity to determine the expected dates of recurring transactions in the period.
   */
  billing_date: string;
  /**
   * If any, represents the original name of the recurring item as denoted by the transaction that triggered its creation.
   */
  original_name?: string;
  /**
   * If any, represents the user-entered description of the recurring item.
   */
  description?: string;
  /**
   * If any, denotes the plaid account associated with the creation of this recurring item (see Plaid Accounts).
   */
  plaid_account_id?: number;
  /**
   * If any, denotes the manually-managed account (i.e. asset) associated with the creation of this recurring item (see Assets).
   */
  asset_id?: number;
  /**
   * This can be one of three values:
   * * `manual`: User created this recurring expense manually from the Recurring Expenses page
   * * `transaction`: User created this by converting a transaction from the Transactions page
   * * `system`: Recurring expense was created by the system on transaction import
   * * `null`: Some older recurring expenses may not have a source.
   */
  source: RecurringSource;
  /**
   * If any, the user-entered notes for the recurring item.
   */
  notes?: string;
  /**
   * Amount of the recurring item in numeric format to 4 decimal places. For recurring items with flexible amounts, this is the average of the specified min and max amounts.
   */
  amount: number;
  /**
   * If any, denotes the unique identifier for the associated category to this recurring item.
   */
  category_id?: number;
  /**
   * If any, denotes the unique identifier of associated category group.
   */
  category_group_id?: number;
  /**
   * Based on the associated category's property, denotes if the recurring transaction is treated as income.
   */
  is_income: boolean;
  /**
   * Based on the associated category's property, denotes if the recurring transaction is excluded from totals.
   */
  exclude_from_totals: boolean;
  /**
   * The unit of time used to define the cadence of the recurring item. One of:
   * * `weeks`
   * * `months`
   * * `years`
   */
  granularity: string;
  /**
   * The number of granularity units between each recurrence
   */
  quantity?: number;
  /**
   * An object which contains dates as keys and lists as values. The dates will include all the dates in the month that a recurring item is expected, as well as the last date in the previous period and the first date in the next period. The value for each key is a list of [Summarized Transaction Objects](https://lunchmoney.dev/#summarized-transaction-object) that matched the recurring item for that date (if any).
   */
  occurrences: { [date: string]: SummarizedTransactionObject };
  /**
   * A list of all the [Summarized Transaction Objects](https://lunchmoney.dev/#summarized-transaction-object) for transactions that that have occurred in the query month for the recurring item (if any).
   */
  transactions_within_range?: SummarizedTransactionObject[];
  /**
   * A list of date strings when a recurring transaction is expected but has not (yet) occurred.
   */
  missing_dates_within_range?: string[];
  /**
   * Denotes the value of the start_date query parameter, or if none was provided, the date when the request was made. This indicates the month used by the system when populating the response.
   */
  date?: string;
  /**
   * The amount converted to the user's primary currency. If the multicurrency feature is not being used, `to_base` and `amount` will be the same.
   */
  to_base: number;
}

/**
 * This object, which includes a subset of fields from the Transaction Object,
 * may be included in the list of transactions associated with a date in the `occurrences` object,
 * or in the `transactions_within_range` list.
 */
export interface SummarizedTransactionObject {
  /**
   * Unique identifier for the transaction that matched this recurring item.
   */
  id: number;
  /**
   * Date of transaction in ISO 8601 format.
   */
  date: string;
  /**
   * Amount of the transaction in numeric format to 4 decimal places.
   */
  amount: string;
  /**
   * Three-letter lowercase currency code of the transaction in ISO 4217 format.
   */
  currency: Currency;
  /**
   * Payee or payer of the recurring item.
   */
  payee: string;
  /**
   * Unique identifier of associated category (see Categories).
   */
  category_id?: number;
  /**
   * Unique identifier of associated recurring item.
   */
  recurring_id?: number;
  /**
   * The amount converted to the user's primary currency. If the multicurrency feature is not being used, `to_base` and `amount` will be the same.
   */
  to_base: number;
}
//#endregion

//#region Budgets

export interface Budget {
  /**
   * Name of the category, will be "Uncategorized" if no category is assigned.
   */
  category_name: string;
  /**
   * Unique identifier for category, can be null when category_name is "Uncategorized".
   */
  category_id?: number;
  /**
   * Name of the category group, if applicable.
   */
  category_group_name?: string;
  /**
   * Unique identifier for category group.
   */
  group_id?: number;
  /**
   * If true, this category is a group.
   */
  is_group?: boolean;
  /**
   * If true, this category is an income category (category properties are set in the app via the Categories page).
   */
  is_income: boolean;
  /**
   * If true, this category is excluded from budget (category properties are set in the app via the Categories page).
   */
  exclude_from_budget: boolean;
  /**
   * If true, this category is excluded from totals (category properties are set in the app via the Categories page).
   */
  exclude_from_totals: boolean;
  /**
   * For each month with budget or category spending data, there is a data object with the key set to the month in format YYYY-MM-DD.
   */
  data: BudgetData[];
  /**
   * Object representing the category's budget suggestion configuration.
   */
  config?: BudgetConfig;
  /**
   * Numerical ordering of budgets.
   */
  order: number;
  /**
   * True if the category is archived and not displayed in relevant areas of the Lunch Money app.
   */
  archived: boolean;
  /**
   * Returns a list object that contains an array of Recurring Expenses objects (just the `payee`, `amount`, `currency`, and `to_base` fields) that affect this budget.
   */
  recurring?: RecurringItemsSubset[];
}

export interface BudgetData {
  /**
   * The budget amount, as set by the user. If empty, no budget has been set.
   */
  budget_amount?: number;
  /**
   * The budget currency, as set by the user. If empty, no budget has been set.
   */
  budget_currency?: Currency;
  /**
   * The budget converted to the user's primary currency.
   * If the multicurrency feature is not being used, `budget_to_base` and `budget_amount` will be the same.
   * If empty, no budget has been set.
   */
  budget_to_base?: number;
  /**
   * The total amount spent in this category for this time period in the user's primary currency.
   */
  spending_to_base: number;
  /**
   * Number of transactions that make up `spending_to_base`.
   */
  num_transactions: number;
  /**
   * If true, the budget_amount is only a suggestion based on the set config.
   * If not present, it is false (meaning this is a locked-in budget)
   */
  is_automated?: boolean;
}

export type BudgetConfigCadence =
  | "monthly"
  | "twice a month"
  | "once a week"
  | "every 3 months"
  | "every 4 months"
  | "twice a year"
  | "yearly";

export type BudgetConfigAutoSuggest =
  | "budgeted"
  | "fixed"
  | "fixed-rollover"
  | "spent";

export interface BudgetConfig {
  /**
   * Unique identifier for config.
   */
  config_id: number;
  /**
   * One of:
   * * monthly
   * * twice a month
   * * once a week
   * * every 3 months
   * * every 4 months
   * * twice a year
   * * yearly
   */
  cadence: BudgetConfigCadence;
  /**
   * Amount in numeric format.
   */
  amount: number;
  /**
   * Three-letter lowercase currency code for the recurring expense in ISO 4217 format.
   */
  currency: Currency;
  /**
   * The amount converted to the user's primary currency.
   */
  to_base: number;
  /**
   * One of:
   * * budgeted
   * * fixed
   * * fixed-rollover
   * * spent
   */
  auto_suggest: BudgetConfigAutoSuggest;
}
//#endregion

//#region Assets
export type AssetTypeName =
  | "cash"
  | "credit"
  | "investment"
  | "real estate"
  | "loan"
  | "vehicle"
  | "cryptocurrency"
  | "employee compensation"
  | "other liability"
  | "other asset";

export interface Asset {
  /**
   * Unique identifier for asset.
   */
  id: number;
  /**
   * Primary type of the asset.
   */
  type_name: AssetTypeName;
  /**
   * Optional asset subtype.
   */
  subtype_name?: string;
  /**
   * Name of the asset.
   */
  name: string;
  /**
   * Display name of the asset.
   */
  display_name?: string;
  /**
   * Current balance of the asset in numeric format to 4 decimal places.
   */
  balance: string;
  /**
   * Date/time the balance was last updated in ISO 8601 extended format.
   */
  balance_as_of: string;
  /**
   * The date this asset was closed.
   */
  closed_on?: string;
  /**
   * Three-letter lowercase currency code of the balance in ISO 4217 format.
   */
  currency: Currency;
  /**
   * Name of institution holding the asset.
   */
  institution_name?: string;
  /**
   * If true, this asset will not show up as an option for assignment when creating transactions manually.
   */
  exclude_transactions: boolean;
  /**
   * Date/time the asset was created in ISO 8601 extended format.
   */
  created_at: string;
}
//#endregion

//#region Plaid Accounts
export type PlaidAccountType =
  | "credit"
  | "depository"
  | "brokerage"
  | "cash"
  | "loan"
  | "investment";

export type PlaidAccountStatus =
  | "active"
  | "inactive"
  | "relink"
  | "syncing"
  | "error"
  | "not found"
  | "not supported";

export interface PlaidAccount {
  /**
   * Unique identifier of Plaid account.
   */
  id: number;
  /**
   * Date account was first linked in ISO 8601 format.
   */
  date_linked: string;
  /**
   * Name of the account. Can be overridden by the user. Field is originally set by Plaid.
   */
  name: string;
  /**
   * Display name of the account, if not set it will return a concatenated string of institution and account name..
   */
  display_name?: string;
  /**
   * Primary type of account.
   */
  type: PlaidAccountType;
  /**
   * Optional subtype name of account. This field is set by Plaid and cannot be altered.
   */
  subtype?: string;
  /**
   * Mask (last 3 to 4 digits of account) of account. This field is set by Plaid and cannot be altered.
   */
  mask: string;
  /**
   * Name of institution associated with account. This field is set by Plaid and cannot be altered.
   */
  institution_name: string;
  /**
   * Denotes the current status of the account within Lunch Money.
   */
  status: PlaidAccountStatus;
  /**
   * Current balance of the account in numeric format to 4 decimal places. This field is set by Plaid and cannot be altered.
   */
  balance: string;
  /**
   * Currency of account balance in ISO 4217 format. This field is set by Plaid and cannot be altered.
   */
  currency: Currency;
  /**
   * Date balance was last updated in ISO 8601 extended format. This field is set by Plaid and cannot be altered.
   */
  balance_last_update: string;
  /**
   * Optional credit limit of the account. This field is set by Plaid and cannot be altered.
   */
  limit?: number;
  /**
   * Date of earliest date allowed for importing transactions. Transactions earlier than this date are not imported.
   */
  import_start_date?: string;
  /**
   * Timestamp in ISO 8601 extended format of the last time Lunch Money imported new data from Plaid for this account.
   */
  last_import?: string;
  /**
   * Timestamp in ISO 8601 extended format of the last successful check from Lunch Money for updated data or timestamps from Plaid in ISO 8601 extended format (not necessarily date of last successful import).
   */
  last_fetch?: string;
  /**
   * Timestamp in ISO 8601 extended format of the last time Plaid successfully connected with institution for new transaction updates, regardless of whether any new data was available in the update.
   */
  plaid_last_successful_update?: string;
}
//#endregion

//#region Crypto
export type CryptoSource = "synced" | "manual";

export interface Crypto {
  /**
   * Unique identifier for a manual crypto account (no ID for synced accounts).
   */
  id?: number;
  /**
   * Unique identifier for a synced crypto account (no ID for manual accounts, multiple currencies may have the same `zabo_account_id`).
   */
  zabo_account_id?: number;
  /**
   * One of:
   * * `synced`: this account is synced via a wallet, exchange, etc.
   * * `manual`: this account balance is managed manually.
   */
  source: CryptoSource;
  /**
   * Name of the crypto asset.
   */
  name: string;
  /**
   * Display name of the crypto asset (as set by user).
   */
  display_name?: string;
  /**
   * Current balance.
   */
  balance: string;
  /**
   * Date/time the balance was last updated in ISO 8601 extended format.
   */
  balance_as_of: string;
  /**
   * Abbreviation for the cryptocurrency.
   */
  currency: string;
  /**
   * The current status of the crypto account. Either active or in error.
   */
  status: string;
  /**
   * Name of provider holding the asset.
   */
  institution_name?: string;
  /**
   * Date/time the asset was created in ISO 8601 extended format.
   */
  created_at: string;
  /**
   * The balance converted to the user's primary currency.
   */
  to_base?: number;
}
//#endregion
