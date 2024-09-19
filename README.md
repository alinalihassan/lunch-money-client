# LunchMoney API Client

<div align="center">
  <img src="assets/lunch-money-api-logo.png" width="45%" />
  <img src="assets/ts-logo-round-128.svg" width="45%" />
</div>

This is a TypeScript client for the LunchMoney API.

## Installation

```bash
npm install lunchmoney-api-client
```

## Usage

First, import the `LunchMoney` class and create an instance with your API token:

```typescript
import LunchMoney from 'lunchmoney-api-client';

const lunchMoney = new LunchMoney('your-api-token-here');
```

Then you can use the various methods to interact with the LunchMoney API:

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

## Types

The client uses TypeScript and provides type definitions for all method arguments and responses.Refer to the `dist/index.d.ts` file for detailed type information.

## Contributing

Contributions are welcome! Please submit a pull request or create an issue to discuss proposed changes.

## License

[MIT License](LICENSE)