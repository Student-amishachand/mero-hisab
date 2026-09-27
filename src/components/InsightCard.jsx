import { formatCurrency } from "../utils/constants";
import "./InsightCard.css";

const InsightCard = ({ transactions, monthlyExpenses, budget }) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const byCategory = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});
  const top = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  const percentage = budget > 0 ? Math.round((monthlyExpenses / budget) * 100) : null;

  let message = "Start adding transactions and Mero Hisab will show useful spending insights.";
  if (top) message = `Your highest spending category is ${top[0]} at ${formatCurrency(top[1])}.`;
  if (budget > 0 && monthlyExpenses > budget) message = `You've exceeded your monthly budget by ${formatCurrency(monthlyExpenses - budget)}.`;
  else if (budget > 0) message = `${percentage}% of your monthly budget has been used. ${formatCurrency(budget - monthlyExpenses)} is remaining.`;

  return (
    <section className="card insight-card">
      <div className="insight-icon">💡</div>
      <div>
        <span className="eyebrow">HISAB INSIGHT</span>
        <h3>Know your spending</h3>
        <p>{message}</p>
      </div>
    </section>
  );
};

export default InsightCard;
