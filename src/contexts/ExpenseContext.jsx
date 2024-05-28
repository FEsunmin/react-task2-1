import React, { createContext, useState, useEffect } from "react";

const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [boxIndex, setBoxIndex] = useState(() => {
    const storedIndex = localStorage.getItem("selectedMonth");
    return storedIndex !== null && !isNaN(parseInt(storedIndex, 10))
      ? parseInt(storedIndex, 10)
      : 0;
  });

  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("selectedMonth", boxIndex.toString());
  }, [boxIndex]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const updateExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (expenseId) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    setExpenses(updatedExpenses);
  };

  return (
    <ExpenseContext.Provider
      value={{
        boxIndex,
        setBoxIndex,
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext, ExpenseProvider };
