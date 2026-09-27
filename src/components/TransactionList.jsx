import { useMemo, useState } from "react";
import TransactionItem from "./TransactionItem";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";
import "./TransactionList.css";

const TransactionList = ({ transactions, onDelete }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...transactions]
      .filter((item) => type === "all" || item.type === type)
      .filter((item) => category === "all" || item.category === category)
      .filter((item) => !query || `${item.description} ${item.category}`.toLowerCase().includes(query))
      .sort((a, b) => {
        const first = new Date(a.date);
        const second = new Date(b.date);
        return sort === "newest" ? second - first : first - second;
      });
  }, [transactions, search, type, category, sort]);

  const categories = [...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])];

  return (
    <section className="card transaction-list">
      <div className="section-heading">
        <div>
          <h3>All Transactions</h3>
          <p>{filtered.length} of {transactions.length} entries</p>
        </div>
      </div>

      <div className="filters">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search..." />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="transaction-list-rows">
        {filtered.length ? (
          filtered.map((item) => <TransactionItem key={item.id} transaction={item} onDelete={onDelete} />)
        ) : (
          <div className="empty-state">
            <div>🧾</div>
            <h3>No transactions found</h3>
            <p>{transactions.length ? "Try changing your filters." : "Add your first transaction to start your hisab."}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TransactionList;
