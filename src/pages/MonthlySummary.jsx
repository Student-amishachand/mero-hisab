import { useMemo, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import SpendingChart from "../components/SpendingChart";
import BudgetCard from "../components/BudgetCard";
import { formatCurrency, getMonthLabel, getMonthValue } from "../utils/constants";
import "./MonthlySummary.css";

const MonthlySummary = ({ transactions, budget, onSetBudget }) => {
  const [month, setMonth] = useState(getMonthValue());

  const monthTransactions = useMemo(
    () => transactions.filter((t) => t.date?.startsWith(month)),
    [transactions, month]
  );

  const income = monthTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount), 0);
  const expenses = monthTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = income - expenses;

  const chartData = useMemo(() => {
    const totals = {};
    monthTransactions.filter((t) => t.type === "expense").forEach((t) => { totals[t.category] = (totals[t.category] || 0) + Number(t.amount); });
    return Object.entries(totals).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [monthTransactions]);

  const topCategory = chartData[0]?.name || "No data";

  return (
    <main className="page-container">
      <section className="summary-heading">
        <div>
          <span className="eyebrow">MONTHLY REPORT</span>
          <h1>{getMonthLabel(month)}</h1>
          <p>A simple snapshot of your income, spending, and savings.</p>
        </div>
        <input className="month-picker" type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      </section>

      <div className="summary-grid">
        <SummaryCard title="Income" value={formatCurrency(income)} icon="↗" variant="income" />
        <SummaryCard title="Expenses" value={formatCurrency(expenses)} icon="↘" variant="expense" />
        <SummaryCard title="Net Balance" value={formatCurrency(balance)} icon="💰" variant="balance" />
        <SummaryCard title="Top Category" value={topCategory} icon="🏷️" variant="monthly" />
      </div>

      <div className="summary-content-grid">
        <SpendingChart data={chartData} title="This Month's Spending" />
        <BudgetCard budget={budget} monthlyExpenses={expenses} onSetBudget={onSetBudget} />
      </div>

      <section className="card monthly-note">
        <span className="eyebrow">MONTHLY INSIGHT</span>
        <h3>{expenses === 0 ? "No expenses recorded yet." : `You spent ${formatCurrency(expenses)} in ${getMonthLabel(month)}.`}</h3>
        <p>{balance >= 0 ? `${formatCurrency(balance)} remains after this month's recorded expenses.` : `Expenses are ${formatCurrency(Math.abs(balance))} higher than income for this month.`}</p>
      </section>
    </main>
  );
};

export default MonthlySummary;
