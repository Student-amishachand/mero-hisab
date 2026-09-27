export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Business",
  "Allowance",
  "Other Income",
];

export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Education",
  "Entertainment",
  "Health",
  "Other",
];

export const STORAGE_KEY = "mero-hisab-transactions";
export const BUDGET_KEY = "mero-hisab-budget";
export const THEME_KEY = "mero-hisab-dark-mode";

export const formatCurrency = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getMonthValue = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export const getMonthLabel = (monthValue) => {
  if (!monthValue) return "";
  return new Date(`${monthValue}-01T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};
