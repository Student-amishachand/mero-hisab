import { useState } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";
import "./TransactionForm.css";

const today = new Date().toISOString().split("T")[0];

const TransactionForm = ({ onAddTransaction, onCancel, compact = false }) => {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(today);
  const [error, setError] = useState("");

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const changeType = (newType) => {
    setType(newType);
    setCategory("");
  };

const submit = (event) => {
  event.preventDefault();

  if (!amount) {
    setError("Please enter an amount.");
    return;
  }

  if (Number(amount) <= 0) {
    setError("Amount must be greater than 0.");
    return;
  }

  if (!category) {
    setError("Please select a category.");
    return;
  }

  if (!description.trim()) {
    setError("Please enter a description.");
    return;
  }

  if (!date) {
    setError("Please select a date.");
    return;
  }

  if (date > today) {
    setError("Transaction date cannot be in the future.");
    return;
  }

  onAddTransaction({
    type,
    amount: Number(amount),
    category,
    description: description.trim(),
    date,
  });

  setAmount("");
  setCategory("");
  setDescription("");
  setDate(today);
  setError("");

  if (onCancel) onCancel();
};

  return (
    <form className={`transaction-form ${compact ? "compact" : "card"}`} onSubmit={submit}>
      <div className="form-title-row">
        <div>
          <h3>Add Transaction</h3>
          <p>Keep your hisab up to date.</p>
        </div>
        {onCancel && <button type="button" className="close-button" onClick={onCancel}>×</button>}
      </div>

      <div className="type-switch">
        <button type="button" className={type === "expense" ? "selected expense" : ""} onClick={() => changeType("expense")}>↓ Expense</button>
        <button type="button" className={type === "income" ? "selected income" : ""} onClick={() => changeType("income")}>↑ Income</button>
      </div>

      <div className="form-grid">
        <label>
          Amount
          <div className="amount-input">
            <span>Rs.</span>
            <input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" />
          </div>
        </label>

        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Choose category</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label>
          Description
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Lunch with friends" maxLength={80} />
        </label>

        <label>
          Date
          <input
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            />
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button className="primary-button full" type="submit">+ Add Transaction</button>
    </form>
  );
};

<div className="empty-state">
  <h3>No transactions yet</h3>
  <p>Add your first income or expense to start tracking your money.</p>
</div>

export default TransactionForm;
