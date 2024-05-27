import React, { useState, useEffect } from "react";
import ListContainer from "../components/ListComponents/ListContainer";
import BoxContainer from "../components/BoxComponents/BoxContainer";
import FromComp from "../components/FormComponents/FromComp";
import { useNavigate } from "react-router-dom";

const Home = () => {
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

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedMonth", boxIndex.toString());
  }, [boxIndex]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleClick = (index) => {
    setBoxIndex(index);
  };

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const boxData = Array.from({ length: 12 }, (_, index) => ({
    title: `${index + 1}월`,
    index,
  }));

  const getFilteredData = (boxIndex) => {
    const year = 2024;
    const month = boxIndex + 1;
    const filteredData = expenses.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month
      );
    });
    return filteredData;
  };

  const handlPageClick = (detailId) => {
    navigate(`/detail/${detailId}`);
  };

  return (
    <>
      <FromComp onAddExpense={addExpense} />
      <BoxContainer
        boxData={boxData}
        boxIndex={boxIndex}
        handleClick={handleClick}
      />
      <ListContainer
        data={getFilteredData(boxIndex)}
        onExpenseClick={handlPageClick}
      />
    </>
  );
};

export default Home;
