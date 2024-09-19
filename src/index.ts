import type {
  Asset,
  AssetEndpointArguments,
  Budget,
  GetBudgetEndpointArguments,
  Category,
  CategoryEndpointArguments,
  CategoryEndpointResponse,
  CategoryGroupAddEndpointArguments,
  CategoryGroupEndpointArguments,
  CreateTransactionGroupEndpointArguments,
  CreateTransactionGroupEndpointResponse,
  DeleteTransactionGroupEndpointResponse,
  EndpointArguments,
  GetTransactionGroupEndpointArguments,
  PlaidAccount,
  RecurringItems,
  RecurringItemsEndpointArguments,
  SplitTransactionEndpointArguments,
  SplitTransactionEndpointResponse,
  Tag,
  Transaction,
  TransactionEndpointArguments,
  TransactionsCreateEndpointArguments,
  TransactionsCreateEndpointResponse,
  TransactionsEndpointArguments,
  TransactionsEndpointResponse,
  TransactionUpdateEndpointArguments,
  TransactionUpdateEndpointResponse,
  UnsplitTransactionsEndpointArguments,
  UnsplitTransactionsEndpointResponse,
  User,
  UpsertBudgetEndpointArguments,
  UpsertBudgetEndpointResponse,
  DeleteBudgetEndpointArguments,
  DeleteBudgetEndpointResponse,
  SyncPlaidAccountsEndpointArguments,
  SyncPlaidAccountsEndpointResponse,
  Crypto,
  UpdateCryptoEndpointResponse,
  UpdateCryptoEndpointArguments,
} from "./types";

const BASE_URL = "https://dev.lunchmoney.app";

export class LunchMoney {
  token: string;
  constructor(token: string) {
    this.token = token;
  }

  //#region generic methods
  async get(endpoint: string, args?: EndpointArguments) {
    return this.request("GET", endpoint, args);
  }

  async post(endpoint: string, args?: EndpointArguments) {
    return this.request("POST", endpoint, args);
  }

  async put(endpoint: string, args?: EndpointArguments) {
    return this.request("PUT", endpoint, args);
  }

  async delete(endpoint: string, args?: EndpointArguments): Promise<any> {
    return this.request("DELETE", endpoint, args);
  }

  async request(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    args?: EndpointArguments
  ) {
    let url = `${BASE_URL}${endpoint}`;
    if (method === "GET" && args) {
      url += "?";
      url += Object.entries(args)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    }
    const headers = new Headers();
    headers.set("Accept", "*/*");
    headers.set("Authorization", `Bearer ${this.token}`);
    const options: RequestInit = {
      headers,
      method,
    };

    if ((method === "POST" || method === "PUT") && args) {
      options.body = JSON.stringify(args);
      headers.set("Content-Type", "application/json");
    }
    const response = await fetch(url, options);
    if (response.status > 399) {
      const r = await response.text();
      throw new Error(r);
    } else {
      return response.json();
    }
  }
  //#endregion

  //#region User
  /**
   * Use this endpoint to get details on the current user.
   * @returns Details on the current user.
   */
  async getUser(): Promise<User> {
    return await this.get("/v1/me");
  }
  //#endregion

  //#region Categories
  /**
   * Use this endpoint to get a flattened list of all categories in alphabetical order associated with the user's account.
   * @returns List of categories
   */
  async getCategories(): Promise<Category[]> {
    return (await this.get("/v1/categories")).categories;
  }

  /**
   * Use this endpoint to get hydrated details on a single category.
   *
   * *Note: if this category is part of a category group, its properties (`is_income`, `exclude_from_budget`, `exclude_from_totals`) will inherit from the category group.*
   * @param id Category ID to be fetched
   * @returns Category object
   */
  async getCategory(id: number): Promise<Category> {
    return (await this.get(`/v1/categories/${id}`)).categories;
  }

  /**
   * Use this endpoint to create a single category.
   * @param args Category arguments
   * @returns Returns the ID of the newly-created category
   */
  async createCategory(
    args: CategoryEndpointArguments
  ): Promise<CategoryEndpointResponse> {
    return await this.post("/v1/categories", args);
  }

  /**
   * Use this endpoint to create a single category.
   * @param args Category Group arguments
   * @returns Returns the ID of the newly-created category group
   */
  async createCategoryGroup(
    args: CategoryGroupEndpointArguments
  ): Promise<CategoryEndpointResponse> {
    return await this.post("/v1/categories/group", args);
  }

  /**
   * Use this endpoint to create a single category.
   * @param id Category ID to be updated
   * @param args Category arguments
   * @returns Returns the ID of the newly-created category
   */
  async updateCategory(
    id: number,
    args: CategoryEndpointArguments
  ): Promise<CategoryEndpointResponse> {
    return await this.put(`/v1/categories/${id}`, args);
  }

  /**
   * Use this endpoint to create a single category.
   * @param id Category group ID to be updated
   * @param args Category group add arguments
   * @returns If successfully deleted, returns true
   */
  async addToCategoryGroup(
    id: number,
    args: CategoryGroupAddEndpointArguments
  ): Promise<boolean> {
    return await this.post(`/v1/categories/group/${id}/add`, args);
  }

  /**
   * Use this endpoint to delete a single category or category group. This will only work if there are no dependencies, such as existing budgets for the category, categorized transactions, categorized recurring items, etc. If there are dependents, this endpoint will return what the dependents are and how many there are.
   * @param id Category ID to be deleted
   * @returns
   */
  async deleteCategory(id: number): Promise<boolean> {
    return await this.delete(`/v1/categories/${id}`);
  }

  /**
   * Use this endpoint to force delete a single category or category group and along with it, disassociate the category from any transactions, recurring items, budgets, etc.
   *
   * *Note: it is best practice to first try the Delete Category endpoint to ensure you don't accidentally delete any data. Disassociation/deletion of the data arising from this endpoint is irreversible!*
   * @param id Category ID to be deleted
   * @returns
   */
  async forceDeleteCategory(id: number): Promise<boolean> {
    return await this.delete(`/v1/categories/${id}/force`);
  }
  //#endregion

  //#region Tags
  /**
   * Use this endpoint to get a list of all tags associated with the user's account.
   * @returns List of tags associated with the user's account.
   */
  async getTags(): Promise<Tag[]> {
    return await this.get("/v1/tags");
  }
  //#endregion

  //#region Transactions
  /**
   * Use this endpoint to retrieve all transactions between a date range.
   *
   * Returns list of Transaction objects and a `has_more` indicator.
   * If no query parameters are set, this endpoint will return transactions for the current calendar month (see `start_date` and `end_date`)
   * @param args Get transactions args
   * @returns List of transactions and a boolean to indicate whether there's more
   */
  async getTransactions(
    args?: TransactionsEndpointArguments
  ): Promise<TransactionsEndpointResponse> {
    return await this.get("/v1/transactions", args);
  }

  /**
   * Use this endpoint to retrieve details about a specific transaction by ID.
   * @param id Transaction ID
   * @param args Get transaction args
   */
  async getTransaction(
    id: number,
    args?: TransactionEndpointArguments
  ): Promise<Transaction> {
    return await this.get(`/v1/transactions/${id}`, args);
  }

  /**
   * Use this endpoint to insert many transactions at once.
   * @param args Create transactions arguments.
   * @returns IDs of inserted transactions.
   */
  async createTransactions(
    args: TransactionsCreateEndpointArguments
  ): Promise<TransactionsCreateEndpointResponse> {
    return await this.post("/v1/transactions", {
      transactions: args.transactions,
      apply_rules: args.apply_rules ?? false,
      skip_duplicates: args.skip_duplicates ?? false,
      check_for_recurring: args.check_for_recurring ?? false,
      debit_as_negative: args.debit_as_negative ?? false,
      skip_balance_update: args.skip_balance_update ?? true,
    });
  }

  /**
   *
   * @param id Transaction ID to be updated.
   * @param args Transaction update arguments.
   * @returns Boolean to indicate whether the operation was successful.
   */
  async updateTransaction(
    id: number,
    args: TransactionUpdateEndpointArguments
  ): Promise<TransactionUpdateEndpointResponse> {
    return await this.put(`/v1/transactions/${id}`, args);
  }

  /**
   *
   * @param id Transaction ID to be split.
   * @param args Split transaction arguments.
   * @returns Boolean to indicate whether the operation was successful and a list of split transaction IDs
   */
  async splitTransaction(
    id: number,
    args: SplitTransactionEndpointArguments
  ): Promise<SplitTransactionEndpointResponse> {
    return await this.put(`/v1/transactions/${id}`, args);
  }

  /**
   * Use this endpoint to unsplit one or more transactions.
   * @param id Transaction ID to be split.
   * @param args Split transaction arguments.
   * @returns Returns an array of IDs of deleted transactions.
   */
  async unsplitTransactions(
    args: UnsplitTransactionsEndpointArguments
  ): Promise<UnsplitTransactionsEndpointResponse> {
    return await this.post(`/v1/transactions/unsplit`, args);
  }

  /**
   * Use this endpoint to get the parent transaction and associated children transactions of a transaction group.
   * @param id Transaction ID of either the parent or any of the children in the transaction group.
   * @returns Returns the hydrated parent transaction of a transaction group.
   */
  async getTransactionGroup(id: number): Promise<Transaction> {
    return await this.get(`/v1/transactions/group`, {
      transaction_id: id,
    } as GetTransactionGroupEndpointArguments);
  }

  /**
   * Use this endpoint to create a transaction group of two or more transactions.
   * @param args Create transaction group arguments
   * @returns Returns the ID of the newly created transaction group.
   */
  async createTransactionGroup(
    args: CreateTransactionGroupEndpointArguments
  ): Promise<CreateTransactionGroupEndpointResponse> {
    return await this.post(`/v1/transactions/group`, args);
  }

  /**
   * Use this endpoint to delete a transaction group. The transactions within the group will not be removed.
   * @param id Transaction group ID to be deleted
   * @returns Returns the IDs of the transactions that were part of the deleted group.
   */
  async deleteTransactionGroup(
    id: number
  ): Promise<DeleteTransactionGroupEndpointResponse> {
    return await this.delete(`/v1/transactions/group/${id}`);
  }
  //#endregion

  //#region Recurring Items
  /**
   * Use this endpoint to retrieve a list of recurring items to expect for a specified month.
   *
   * A different set of recurring items is expected every month. These can be `once a year`, `twice a year`, `every four months`, etc.
   *
   * If a recurring item is listed as `twice a month`, then the recurring item object returned will have an `occurrences` attribute populated by the different billing dates the system believes recurring transactions should occur, including the two dates in the current month, the last transaction date prior to the month, and the next transaction date after the month.
   *
   * If the recurring item is listed as `once a week`, then the recurring item object returned will have an `occurrences` object populated with as many times as there are weeks for the specified month, along with the last transaction from the previous month and the next transaction for the next month.
   *
   * In the same vein, if a recurring item that began last month is set to “Every 3 months”, then that recurring item object that occurred will not include any dates for this month.
   */
  async getRecurringItems(
    args?: RecurringItemsEndpointArguments
  ): Promise<RecurringItems[]> {
    return await this.get("/v1/recurring_items", args);
  }

  //#endregion

  //#region Budget
  /**
   * Use this endpoint to get full details on the budgets for all budgetable categories between a certain time period.
   * The budgeted and spending amounts will be broken down by month.
   * @param args Get budgets arguments.
   * @returns A list of budgets broken down by month.
   */
  async getBudgets(args?: GetBudgetEndpointArguments): Promise<Budget[]> {
    return await this.get("/v1/budgets", args);
  }

  /**
   * Use this endpoint to update an existing budget or insert a new budget for a particular category and date.
   *
   * If this is a sub-category, the response will include the updated category group's budget. This is because setting a sub-category may also update the category group's overall budget.
   *
   * *Note: Lunch Money currently only supports monthly budgets, so your date must always be the start of a month (eg. 2021-04-01)*
   * @param args Upsert budget arguments
   */
  async upsertBudget(
    args?: UpsertBudgetEndpointArguments
  ): Promise<UpsertBudgetEndpointResponse> {
    return await this.put("/v1/budgets", args);
  }

  /**
   * Use this endpoint to unset an existing budget for a particular category in a particular month.
   * @param args Delete budget arguments
   */
  async deleteBudget(
    args?: DeleteBudgetEndpointArguments
  ): Promise<DeleteBudgetEndpointResponse> {
    return await this.delete("/v1/budgets", args);
  }

  //#endregion

  //#region Assets
  /**
   * Use this endpoint to get a list of all manually-managed assets associated with the user's account.
   * @returns A list of assets
   */
  async getAssets(): Promise<Asset[]> {
    return (await this.get("/v1/assets")).assets;
  }

  /**
   * Use this endpoint to create a single (manually-managed) asset.
   * @param Asset create arguments
   * @returns Newly created asset
   */
  async createAsset(args: AssetEndpointArguments): Promise<Asset> {
    return await this.post("/v1/assets", args);
  }

  /**
   * Use this endpoint to update a single asset.
   * @param id Asset ID
   * @param args Asset update arguments
   * @returns The updated asset
   */
  async updateAsset(id: number, args: AssetEndpointArguments): Promise<Asset> {
    return await this.put(`/v1/assets/${id}`, args);
  }
  //#endregion

  //#region Plaid Accounts
  /**
   * Use this endpoint to get a list of all synced Plaid accounts associated with the user's account.
   *
   * Plaid Accounts are individual bank accounts that you have linked to Lunch Money via Plaid.
   * You may link one bank but one bank might contain 4 accounts. Each of these accounts is a Plaid Account.
   * @returns List of Plaid Accounts
   */
  async getPlaidAccounts(): Promise<PlaidAccount[]> {
    return (await this.get("/v1/plaid_accounts")).plaid_accounts;
  }

  /**
   * *This is an experimental endpoint and parameters and/or response may change.*
   *
   * Use this endpoint to trigger a fetch for latest data from Plaid.
   *
   * Returns true if there were eligible Plaid accounts to trigger a fetch for.
   * Eligible accounts are those who last_fetch value is over 1 minute ago. (Although the limit is every minute, please use this endpoint sparingly!)
   *
   * Note that fetching from Plaid is a background job.
   * This endpoint simply queues up the job.
   * You may track the `plaid_last_successful_update`, `last_fetch` and `last_import` properties to verify the results of the fetch.
   * @returns Boolean indicating whether the operation was successful
   */
  async syncPlaidAccounts(
    args: SyncPlaidAccountsEndpointArguments
  ): Promise<SyncPlaidAccountsEndpointResponse> {
    return await this.post("/v1/plaid_accounts/fetch", args);
  }
  //#endregion

  //#region Crypto
  /**
   * Use this endpoint to get a list of all cryptocurrency assets associated with the user's account.
   * Both crypto balances from synced and manual accounts will be returned.
   * @returns List of all cryptocurrency assets
   */
  async getCrypto(): Promise<Crypto[]> {
    return (await this.get("/v1/crypto")).crypto;
  }

  /**
   * Use this endpoint to update a single manually-managed crypto asset (does not include assets received from syncing with your wallet/exchange/etc).
   * These are denoted by source: manual from the GET call above.
   * @returns Updated Crypto asset
   */
  async updateCrypto(
    id: number,
    args: UpdateCryptoEndpointArguments
  ): Promise<UpdateCryptoEndpointResponse> {
    return await this.put(`/v1/crypto/manual/${id}`, args);
  }
  //#endregion
}

export default LunchMoney;
