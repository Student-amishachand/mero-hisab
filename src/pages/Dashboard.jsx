import { useState } from "react";
import { Link } from "react-router-dom";
import SummaryCard from "../components/SummaryCard";
import TransactionItem from "../components/TransactionItem";
import TransactionForm from "../components/TransactionForm";
import { formatCurrency } from "../utils/constants";
import "./Dashboard.css";

const Dashboard = ({ transactions, stats, onAddTransaction, onDelete }) => {
  const [showForm, setShowForm] = useState(false);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <main className="page-container">
      <section className="hero">
        <div>
          <span className="eyebrow">WELCOME TO MERO HISAB</span>
          <h1>Your money, <span>understood.</span></h1>
          <p>Track your income and expenses in one simple place.</p>
        </div>
        <button className="primary-button add-button flex items-center gap-2 transition-transform hover:-translate-y-0.5" onClick={() => setShowForm(true)}>
          + Add Transaction
        </button>
      </section>

      <div className="summary-grid">
        <SummaryCard title="Total Balance" value={formatCurrency(stats.balance)} icon="💰" variant="balance" />
        <SummaryCard title="Total Income" value={formatCurrency(stats.income)} icon="↑" variant="income" />
        <SummaryCard title="Total Expenses" value={formatCurrency(stats.expenses)} icon="↓" variant="expense" />
      </div>

      <section className="card recent-card">
        <div className="section-heading">
          <div>
            <h3>Recent Transactions</h3>
            <p>Your latest income and expenses</p>
          </div>
          <Link className="view-link" to="/transactions">View all →</Link>
        </div>

        {recentTransactions.length ? (
          recentTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="empty-state">
            <div>🧾</div>
            <h3>No transactions yet</h3>
            <p>Add your first income or expense to start your hisab.</p>
          </div>
        )}
      </section>

      {showForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowForm(false);
          }}
        >
          <TransactionForm
            onAddTransaction={onAddTransaction}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
