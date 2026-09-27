import { formatCurrency, formatDate } from "../utils/constants";
import "./TransactionItem.css";

const categoryIcons = {
  Food: "🍔",
  Transport: "🚌",
  Shopping: "🛍️",
  Bills: "🧾",
  Education: "🎓",
  Entertainment: "🎬",
  Health: "❤️",
  Salary: "💼",
  Freelance: "💻",
  Business: "🏪",
  Allowance: "💵",
  "Other Income": "💰",
  Other: "📦",
};

const TransactionItem = ({ transaction, onDelete }) => {
  const isIncome = transaction.type === "income";

  return (
    <div className="transaction-item">
      <div className={`transaction-icon ${isIncome ? "income-bg" : "expense-bg"}`}>
        {categoryIcons[transaction.category] || "💸"}
      </div>
      <div className="transaction-info">
        <strong>{transaction.description}</strong>
        <span>{transaction.category} · {formatDate(transaction.date)}</span>
      </div>
      <strong className={isIncome ? "amount income-text" : "amount expense-text"}>
        {isIncome ? "+" : "-"}{formatCurrency(transaction.amount)}
      </strong>
      <button className="delete-button" onClick={() => onDelete(transaction.id)} title="Delete transaction">
        🗑️
      </button>
    </div>
  );
};

export default TransactionItem;
