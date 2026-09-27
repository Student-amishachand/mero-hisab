import { useMemo } from "react";
import SpendingChart from "../components/SpendingChart";
import SummaryCard from "../components/SummaryCard";
import { formatCurrency } from "../utils/constants";
import "./Analytics.css";

const Analytics = ({ transactions }) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const total = expenses.reduce((sum, t) => sum + Number(t.amount), 0);

  const data = useMemo(() => {
    const totals = {};
    expenses.forEach((t) => { totals[t.category] = (totals[t.category] || 0) + Number(t.amount); });
    return Object.entries(totals).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const top = data[0];

  return (
    <main className="page-container">
      <section className="page-heading">
        <span className="eyebrow">SPENDING ANALYTICS</span>
        <h1>Understand your habits.</h1>
        <p>See which categories take the biggest share of your spending.</p>
      </section>

      <div className="summary-grid">
        <SummaryCard title="Total Spending" value={formatCurrency(total)} icon="💸" variant="expense" />
        <SummaryCard title="Categories Used" value={data.length} icon="◔" variant="monthly" />
        <SummaryCard title="Top Category" value={top?.name || "—"} icon="🏷️" variant="balance" />
        <SummaryCard title="Top Category Amount" value={top ? formatCurrency(top.value) : "Rs. 0"} icon="⭐" variant="income" />
      </div>

      <SpendingChart data={data} title="All-time Spending by Category" />
    </main>
  );
};

export default Analytics;
