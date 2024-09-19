import type { AssetTypeName, Crypto, Transaction } from "./lunch-money-types";

export interface EndpointArguments {
  [s: string]: any;
}

//#region Categories
export interface CategoryEndpointArguments {
  /**
   * Name of category. Must be between 1 and 40 characters.
   */
  name: string;
  /**
   * Description of category. Must be less than 140 categories.
   */
  description?: string;
  /**
   * Whether or not transactions in this category should be treated as income.
   */
  is_income?: boolean;
  /**
   * Whether or not transactions in this category should be excluded from budgets.
   */
  exclude_from_budget?: boolean;
  /**
   * Whether or not transactions in this category should be excluded from calculated totals.
   */
  exclude_from_totals?: boolean;
  /**
   * Whether or not category should be archived.
   */
  archived?: boolean;
  /**
   * Assigns the newly-created category to an existing category group.
   */
  group_id?: number;
}

export interface CategoryGroupEndpointArguments {
  /**
   * Name of category. Must be between 1 and 40 characters.
   */
  name: string;
  /**
   * Description of category. Must be less than 140 categories.
   */
  description?: string;
  /**
   * Whether or not transactions in this category should be treated as income.
   */
  is_income?: boolean;
  /**
   * Whether or not transactions in this category should be excluded from budgets.
   */
  exclude_from_budget?: boolean;
  /**
   * Whether or not transactions in this category should be excluded from calculated totals.
   */
  exclude_from_totals?: boolean;
  /**
   * Array of category_id to include in the category group.
   */
  category_ids?: string[];
  /**
   * Array of strings representing new categories to create and subsequently include in the category group.
   */
  new_categories?: number[];
}

export interface CategoryGroupAddEndpointArguments {
  /**
   * Array of category_id to include in the category group.
   */
  category_ids?: number[];
  /**
   * Array of strings representing new categories to create and subsequently include in the category group.
   */
  new_categories?: number[];
}

export interface CategoryEndpointResponse {
  category_id: string;
}
//#endregion

//#region Transactions
export type TransactionStatusSubset = "cleared" | "uncleared";

export interface DraftTransaction {
  /**
   * Must be in ISO 8601 format (YYYY-MM-DD).
   */
  date: string;
  /**
   * Numeric value of amount. i.e. $4.25 should be denoted as 4.25.
   */
  amount: string | number;
  /**
   * Unique identifier for associated category_id. Category must be associated with the same account and must not be a category group.
   */
  category_id?: number;
  /**
   * Max 140 characters.
   */
  payee?: string;
  /**
   * Three-letter lowercase currency code in ISO 4217 format. The code sent must exist in our database. Defaults to user account's primary currency.
   */
  currency?: string;
  /**
   * Unique identifier for associated asset (manually-managed account). Asset must be associated with the same account.
   */
  asset_id?: number;
  /**
   * Unique identifier for associated recurring expense. Recurring expense must be associated with the same account.
   */
  recurring_id?: number;
  /**
   * Max 350 characters.
   */
  notes?: string;
  /**
   * Must be either `cleared` or `uncleared`. Defaults to `uncleared`.
   *
   * *Note: special statuses for recurring items have been deprecated.*
   */
  status?: TransactionStatusSubset;
  /**
   * User-defined external ID for transaction. Max 75 characters. External IDs must be unique within the same `asset_id`.
   */
  external_id?: string;
  /**
   * Passing in a number will attempt to match by ID. If no matching tag ID is found, an error will be thrown.
   * Passing in a string will attempt to match by string. If no matching tag name is found, a new tag will be created.
   */
  tags: (string | number)[];
}

export interface TransactionsEndpointArguments {
  /**
   * Filter by tag. Only accepts IDs, not names.
   */
  tag_id?: number;
  /**
   * Filter by recurring expense.
   */
  recurring_id?: number;
  /**
   * Filter by Plaid account.
   */
  plaid_account_id?: number;
  /**
   * Filter by category. Will also match category groups.
   */
  category_id?: number;
  /**
   * Filter by asset.
   */
  asset_id?: number;
  /**
   * Filter by group (returns transaction groups).
   */
  is_group?: boolean;
  /**
   * Filter by status. Can be `cleared` or `uncleared`.
   *
   * *Note: special statuses for recurring items have been deprecated.*
   */
  status?: string;
  /**
   * Denotes the beginning of the time period to fetch transactions for. Defaults to beginning of current month. Required if end_date exists. Format: YYYY-MM-DD.
   */
  start_date?: string;
  /**
   * Denotes the end of the time period you'd like to get transactions for. Defaults to end of current month. Required if start_date exists. Format: YYYY-MM-DD.
   */
  end_date?: string;
  /**
   * Pass in true if you’d like expenses to be returned as negative amounts and credits as positive amounts. Defaults to false.
   */
  debit_as_negative?: boolean;
  /**
   * Pass in true if you’d like to include imported transactions with a pending status.
   */
  pending?: boolean;
  /**
   * Sets the offset for the records returned
   */
  offset?: number;
  /**
   * Sets the maximum number of records to return.
   */
  limit?: number;
}

export interface TransactionEndpointArguments {
  /**
   * Pass in true if you’d like expenses to be returned as negative amounts and credits as positive amounts. Defaults to false.
   */
  debit_as_negative: boolean;
}

export interface TransactionsEndpointResponse {
  /**
   * List of transactions
   */
  transactions: Transaction[];
  /**
   * Boolean to indicate whether there are more transactions that are not shown
   */
  has_more: boolean;
}

export interface TransactionsCreateEndpointArguments {
  /**
   * List of transactions to insert.
   */
  transactions: DraftTransaction[];
  /**
   * If true, will apply account’s existing rules to the inserted transactions. Defaults to false.
   */
  apply_rules?: boolean;
  /**
   * If true, the system will automatically dedupe based on transaction date, payee and amount. Note that deduping by external_id will occur regardless of this flag.
   */
  skip_duplicates?: boolean;
  /**
   * If true, will check new transactions for occurrences of new monthly expenses. Defaults to false.
   */
  check_for_recurring?: boolean;
  /**
   * If true, will assume negative amount values denote expenses and positive amount values denote credits. Defaults to false.
   */
  debit_as_negative?: boolean;
  /**
   * If true, will skip updating balance if an asset_id is present for any of the transactions. Defaults to true.
   */
  skip_balance_update?: boolean;
}

export interface TransactionsCreateEndpointResponse {
  /**
   * IDs of inserted transactions
   */
  ids: number[];
}

export interface TransactionUpdateEndpointArguments {
  /**
   * The transaction update object. Must include an `id` matching an existing transaction.
   */
  transaction: TransactionUpdate;
  /**
   * If true, will assume negative amount values denote expenses and positive amount values denote credits. Defaults to false.
   */
  debit_as_negative: boolean;
  /**
   * If false, will skip updating balance if an asset_id is present for any of the transactions.
   */
  skip_balance_update: boolean;
}

export interface SplitTransactionEndpointArguments {
  /**
   * Defines the split of a transaction. You may not split an already-split transaction, recurring transaction, or group transaction.
   */
  split: Split[];
  /**
   * If true, will assume negative amount values denote expenses and positive amount values denote credits. Defaults to false.
   */
  debit_as_negative: boolean;
  /**
   * If false, will skip updating balance if an asset_id is present for any of the transactions.
   */
  skip_balance_update: boolean;
}

export interface TransactionUpdate {
  /**
   * Must be in ISO 8601 format (YYYY-MM-DD).
   */
  date: string;
  /**
   * Unique identifier for associated category_id. Category must be associated with the same account and must not be a category group.
   */
  category_id: number;
  /**
   * Max 140 characters.
   */
  payee: string;
  /**
   * You may only update this if this transaction was not created from an automatic import, i.e. if this transaction is not associated with a `plaid_account_id`.
   */
  amount?: number | string;
  /**
   * You may only update this if this transaction was not created from an automatic import, i.e. if this transaction is not associated with a `plaid_account_id`. Defaults to user account's primary currency.
   */
  currency: string;
  /**
   * Unique identifier for associated asset (manually-managed account). Asset must be associated with the same account. You may only update this if this transaction was not created from an automatic import, i.e. if this transaction is not associated with a `plaid_account_id`.
   */
  asset_id: number;
  /**
   * Unique identifier for associated recurring expense. Recurring expense must be associated with the same account.
   */
  recurring_id: number;
  /**
   * Max 350 characters.
   */
  notes: string;
  /**
   * Must be either `cleared` or `uncleared`. Defaults to `uncleared`.
   *
   * *Note: special statuses for recurring items have been deprecated.*
   */
  status: TransactionStatusSubset;
  /**
   * User-defined external ID for transaction.
   * Max 75 characters.
   * External IDs must be unique within the same `asset_id`.
   * You may only update this if this transaction was not created from an automatic import, i.e. if this transaction is not associated with a `plaid_account_id`.
   */
  external_id: string;
  /**
   * Input must be an array, or error will be thrown.
   * Passing in a number will attempt to match by ID.
   * If no matching tag ID is found, an error will be thrown.
   * Passing in a string will attempt to match by string.
   * If no matching tag name is found, a new tag will be created.
   * Pass in `null` to remove all tags.
   */
  tags: (number | string)[];
}

export interface Split {
  /**
   * Max 140 characters. Sets to original payee if none defined.
   */
  payee?: string;
  /**
   * Must be in ISO 8601 format (YYYY-MM-DD). Sets to original date if none defined.
   */
  date?: string;
  /**
   * Unique identifier for associated `category_id`.
   * Category must be associated with the same account.
   * Sets to original category if none defined.
   */
  category_id?: number;
  /**
   * Sets to original notes if none defined.
   */
  notes?: string;
  /**
   * Individual amount of split.
   * Currency will inherit from parent transaction.
   * All amounts must sum up to parent transaction amount.
   */
  amount: string | number;
}

export interface TransactionUpdateEndpointResponse {
  /**
   * If the transaction was successfully updated
   */
  updated: boolean;
}

export interface SplitTransactionEndpointResponse {
  /**
   * If the transaction was successfully updated
   */
  updated: boolean;
  /**
   * If a split was part of the request, an array of newly-created split transactions will be returned.
   */
  split?: number[];
}

export interface UnsplitTransactionsEndpointArguments {
  /**
   * Array of transaction IDs to unsplit. If one transaction is unsplittable, no transaction will be unsplit.
   */
  parent_ids: number[];
  /**
   * If true, deletes the original parent transaction as well. Note, this is irreversible!
   */
  remove_parents: boolean;
}

/**
 * Returns an array of IDs of deleted transactions.
 */
export type UnsplitTransactionsEndpointResponse = number[];

export interface GetTransactionGroupEndpointArguments {
  /**
   * Transaction ID to be fetched.
   */
  transaction_id: number;
}

export interface CreateTransactionGroupEndpointArguments {
  /**
   * Date for the grouped transaction.
   */
  date: string;
  /**
   * Payee name for the grouped transaction.
   */
  payee: string;
  /**
   * Category for the grouped transaction
   */
  category_id?: number;
  /**
   * Notes for the grouped transaction.
   */
  notes?: string;
  /**
   * Array of tag IDs for the grouped transaction.
   */
  tags?: number[];
  /**
   * Array of transaction IDs to be part of the transaction group.
   */
  transactions: number[];
}

/**
 * Returns the ID of the newly created transaction group.
 */
export type CreateTransactionGroupEndpointResponse = number;

export interface DeleteTransactionGroupEndpointResponse {
  /**
   * IDs of the transactions that were part of the deleted group
   */
  transactions: number[];
}
//#endregion

//#region Recurring Items
export interface RecurringItemsEndpointArguments {
  start_date?: string;
  debit_as_negative?: boolean;
}
//#endregion

//#region Budgets
export interface GetBudgetEndpointArguments {
  /**
   * Start date for the budget period.
   * Lunch Money currently only supports monthly budgets, so your date should be the start of a month (eg. 2021-04-01).
   */
  start_date: string;
  /**
   * End date for the budget period.
   * Lunch Money currently only supports monthly budgets, so your date should be the end of a month (eg. 2021-04-30).
   */
  end_date: string;
  /**
   * Currency for the budgeted amount (optional).
   * If empty, will default to your primary currency
   */
  currency?: string;
}

export interface UpsertBudgetEndpointArguments {
  /**
   * Start date for the budget period.
   * Lunch Money currently only supports monthly budgets, so your date must always be the start of a month (eg. 2021-04-01).
   */
  start_date: string;
  /**
   * Unique identifier for the category.
   */
  category_id: number;
  /**
   * Amount for budget.
   */
  amount: number;
  /**
   * Currency for the budgeted amount (optional).
   * If empty, will default to your primary currency
   */
  currency?: string;
}

export interface UpsertBudgetEndpointResponseCategoryGroup {
  /**
   * Unique identifier for the category.
   */
  category_id: number;
  /**
   * Amount for budget.
   */
  amount: number;
  /**
   * Currency for the budgeted amount (optional).
   * If empty, will default to your primary currency
   */
  currency?: string;
  /**
   * Start date for the budget period.
   * Lunch Money currently only supports monthly budgets, so your date must always be the start of a month (eg. 2021-04-01).
   */
  start_date: string;
}

export interface UpsertBudgetEndpointResponse {
  category_group: UpsertBudgetEndpointResponseCategoryGroup;
}

export interface DeleteBudgetEndpointArguments {
  /**
   * Start date for the budget period.
   * Lunch Money currently only supports monthly budgets, so your date must always be the start of a month (eg. 2021-04-01).
   */
  start_date: string;
  /**
   * Unique identifier for the category.
   */
  category_id: number;
}

export type DeleteBudgetEndpointResponse = boolean;
//#endregion

//#region Assets
export interface AssetEndpointArguments {
  /**
   * Must be one of:
   * * `cash`
   * * `credit`
   * * `investment`
   * * `other`
   * * `real estate`
   * * `loan`
   * * `vehicle`
   * * `cryptocurrency`
   * * `employee compensation`
   */
  type_name?: AssetTypeName;
  /**
   * Max 25 characters.
   */
  subtype_name?: string;
  /**
   * Max 45 characters.
   */
  name?: string;
  /**
   * Display name of the asset (as set by user).
   */
  display_name?: string;
  /**
   * Numeric value of the current balance of the account.
   * Do not include any special characters aside from a decimal point!
   */
  balance?: string;
  /**
   * Has no effect if balance is not defined.
   * If balance is defined, but balance_as_of is not supplied or is invalid, current timestamp will be used.
   */
  balance_as_of?: string;
  /**
   * Three-letter lowercase currency in ISO 4217 format.
   * The code sent must exist in our database.
   * Defaults to user's primary currency.
   */
  currency?: string;
  /**
   * Max 50 characters.
   */
  institution_name?: string;
  /**
   * The date this asset was closed.
   */
  closed_on?: string;
  /**
   * If true, this asset will not show up as an option for assignment when creating transactions manually
   */
  exclude_transactions?: boolean;
}
//#endregion

//#region Plaid Accounts
export interface SyncPlaidAccountsEndpointArguments {
  /**
   * Start date for fetch (ignored if end_date is null).
   */
  start_date?: string;
  /**
   * End date for fetch (ignored if start_date is null).
   */
  end_date?: string;
  /**
   * Specific ID of a plaid account to fetch.
   * If left empty, endpoint will trigger a fetch for all eligible accounts
   */
  plaid_account_id?: number;
}

export type SyncPlaidAccountsEndpointResponse = boolean;
//#endregion

//#region Crypto
export interface UpdateCryptoEndpointArguments {
  /**
   * Official or full name of the account. Max 45 characters.
   */
  name?: string;
  /**
   * 	Display name for the account. Max 25 characters.
   */
  display_name?: string;
  /**
   * Name of provider that holds the account. Max 50 characters.
   */
  institution_name?: string;
  /**
   * Numeric value of the current balance of the account.
   * Do not include any special characters aside from a decimal point!
   */
  balance?: number;
  /**
   * Cryptocurrency that is supported for manual tracking in our database.
   */
  currency?: string;
}

export type UpdateCryptoEndpointResponse = Omit<Crypto, "balance_as_of">;
//#endregion
