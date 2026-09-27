import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import MonthlySummary from "./pages/MonthlySummary";
import { BUDGET_KEY, STORAGE_KEY, THEME_KEY } from "./utils/constants";
import "./index.css";

const loadTransactions = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const App = () => {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem(BUDGET_KEY);
    return saved ? Number(saved) : 0;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(THEME_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, String(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    };
    setTransactions((current) => [newTransaction, ...current]);
    toast.success("Transaction added successfully!");
  };

  const deleteTransaction = (id) => {
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id)
    );
    toast.info("Transaction deleted.");
  };

  const setMonthlyBudget = (value) => {
    setBudget(Number(value) || 0);
  };

  const stats = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const expenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  return (
    <BrowserRouter>
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((current) => !current)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              transactions={transactions}
              stats={stats}
              onAddTransaction={addTransaction}
              onDelete={deleteTransaction}
            />
          }
        />
        <Route
          path="/transactions"
          element={
            <Transactions
              transactions={transactions}
              onAddTransaction={addTransaction}
              onDelete={deleteTransaction}
            />
          }
        />
        <Route path="/analytics" element={<Analytics transactions={transactions} />} />
        <Route
          path="/summary"
          element={
            <MonthlySummary
              transactions={transactions}
              budget={budget}
              onSetBudget={setMonthlyBudget}
            />
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </BrowserRouter>
  );
};

export default App;
