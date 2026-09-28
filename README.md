# Mero Hisab — Personal Expense Tracker

Mero Hisab is a React-based personal finance dashboard for recording income
and expenses, tracking the current balance, and understanding spending habits.

## Required features
- Add income and expense transactions with an amount, category, description, and date.
- View the running balance: **total income − total expenses**.
- Review transactions and delete individual entries.
- Filter transactions by category or transaction type and sort them by date.
- Persist transactions and preferences with `localStorage`.
- Switch between light and dark mode.

## Stretch goals
- Spending chart grouped by category.
- Monthly spending summary.
- Monthly budget with an exceeded-budget warning.

## Getting started

### Prerequisites

- Node.js and npm

### Install and run

```bash
npm install
npm run dev
```

Then open the local development URL displayed in the terminal.

## Data storage

The application stores transactions and display preferences in the browser's
`localStorage`. Data is therefore retained between sessions on the same
browser, but it is not synchronized across devices.


## Main packages used

- **Tailwind CSS** + `@tailwindcss/vite` for utility-based styling.
- **React Toastify** for simple success/delete notifications.
- **Recharts** for the spending-by-category chart.
