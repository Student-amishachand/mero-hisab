import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import "./Transactions.css";

const Transactions = ({ transactions, onAddTransaction, onDelete }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="page-container">
      <section className="page-heading-row">
        <div>
          <span className="eyebrow">YOUR MONEY</span>
          <h1>Transactions</h1>
          <p>View, filter, sort, and delete your transactions.</p>
        </div>
        <button className="primary-button" onClick={() => setShowForm(true)}>
          + Add Transaction
        </button>
      </section>

      <TransactionList transactions={transactions} onDelete={onDelete} />

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

export default Transactions;
