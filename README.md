# LunchMoney API Client

<div align="center">
  <img src="assets/lunch-money-api-logo.png" width="45%" style="max-height: 100px; width: auto;"/>
  <img src="assets/ts-logo-round-128.svg" width="45%" style="max-height: 100px; width: auto;"/>
</div>

<div align="center">
This is a TypeScript client for the LunchMoney API.
</div>


<p align="center">
  <a href="https://github.com/alinalihassan/lunch-money-client"><img src="https://img.shields.io/npm/v/lunch-money-client" alt="NPM"></a>
  <a href="https://github.com/alinalihassan/lunch-money-client/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alinalihassan/lunch-money-client?color=blue&label=License" alt="License"></a>
</p>

## Installation

```bash
npm install lunch-money-client
```

## Usage

First, import the `LunchMoney` client with your API token:

```typescript
import LunchMoney from 'lunch-money-client';

const lunchMoney = new LunchMoney('your-api-token-here');
```

The types are documented with the information from the [API docs](https://lunchmoney.dev/). You can use the various methods to interact with the LunchMoney API:

```typescript
// Get user details
const user = await lunchMoney.getUser();

// Get all categories
const categories = await lunchMoney.getCategories();

// Get transactions for the current month
const transactions = await lunchMoney.getTransactions();
```

## Available Methods

The client provides methods for interacting with various LunchMoney API endpoints:

### User
- `getUser()`: Get details on the current user.

### Categories
- `getCategories()`: Get a list of all categories.
- `getCategory(id)`: Get details on a single category.
- `createCategory(args)`: Create a new category.
- `createCategoryGroup(args)`: Create a new category group.
- `updateCategory(id, args)`: Update a category.
- `addToCategoryGroup(id, args)`: Add a category to a group.
- `deleteCategory(id)`: Delete a category.
- `forceDeleteCategory(id)`: Force delete a category.

### Tags
- `getTags()`: Get all tags.

### Transactions
- `getTransactions(args?)`: Get transactions.
- `getTransaction(id: number, args?)`: Get a specific transaction.
- `createTransactions(args)`: Create multiple transactions.
- `updateTransaction(id: number, args)`: Update a transaction.
- `splitTransaction(id: number, args)`: Split a transaction.
- `unsplitTransactions(args)`: Unsplit transactions.
- `getTransactionGroup(id)`: Get a transaction group.
- `createTransactionGroup(args)`: Create a transaction group.
- `deleteTransactionGroup(id)`: Delete a transaction group.

### Recurring Items
- `getRecurringItems(args?)`: Get recurring items.

### Budgets
- `getBudgets(args?)`: Get budgets.
- `upsertBudget(args?)`: Create or update a budget.
- `deleteBudget(args?)`: Delete a budget.

### Assets
- `getAssets()`: Get all assets.
- `createAsset(args)`: Create an asset.
- `updateAsset(id, args)`: Update an asset.

### Plaid Accounts
- `getPlaidAccounts()`: Get all Plaid accounts.
- `syncPlaidAccounts(args)`: Sync Plaid accounts.

### Crypto
- `getCrypto()`: Get all cryptocurrency assets.
- `updateCrypto(id, args)`: Update a manually-managed crypto asset.

## Contributing

Contributions are welcome! Please submit a pull request or create an issue to discuss proposed changes.

## License

[MIT License](LICENSE)