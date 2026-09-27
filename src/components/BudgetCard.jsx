import { useState } from "react";
import { formatCurrency } from "../utils/constants";
import "./BudgetCard.css";

const BudgetCard = ({ budget, monthlyExpenses, onSetBudget }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(budget || "");

  const percentage = budget > 0 ? (monthlyExpenses / budget) * 100 : 0;
  const exceeded = budget > 0 && monthlyExpenses > budget;
  const remaining = budget - monthlyExpenses;

  const save = (event) => {
    event.preventDefault();
    const next = Number(value);
    if (next >= 0) {
      onSetBudget(next);
      setEditing(false);
    }
  };

  return (
    <section className="card budget-card">
      <div className="budget-top">
        <div>
          <span className="eyebrow">MONTHLY BUDGET</span>
          <h3>{budget ? formatCurrency(monthlyExpenses) : "Set your budget"}</h3>
        </div>
        <button className="text-button" onClick={() => setEditing((v) => !v)}>
          {editing ? "Cancel" : budget ? "Edit" : "Set budget"}
        </button>
      </div>

      {editing ? (
        <form className="budget-form" onSubmit={save}>
          <label>
            Budget amount
            <div className="budget-input"><span>Rs.</span><input type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} /></div>
          </label>
          <button className="primary-button" type="submit">Save budget</button>
        </form>
      ) : budget ? (
        <>
          <div className="budget-meta">
            <span>{formatCurrency(monthlyExpenses)} spent</span>
            <span>{formatCurrency(budget)} limit</span>
          </div>
          <div className="progress-track">
            <div className={`progress-fill ${exceeded ? "over" : ""}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
          </div>
          <div className={`budget-message ${exceeded ? "warning" : ""}`}>
            {exceeded
              ? `⚠️ Over budget by ${formatCurrency(Math.abs(remaining))}`
              : `✓ ${formatCurrency(remaining)} remaining`}
          </div>
        </>
      ) : (
        <p className="budget-empty">Set a monthly limit to keep your spending on track.</p>
      )}
    </section>
  );
};

export default BudgetCard;
