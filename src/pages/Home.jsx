import React, { useContext } from "react";
import ListContainer from "../components/ListComponents/ListContainer";
import BoxContainer from "../components/BoxComponents/BoxContainer";
import FromComp from "../components/FormComponents/FromComp";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../contexts/ExpenseContext";

const Home = () => {
  const { boxIndex, setBoxIndex, expenses, addExpense } =
    useContext(ExpenseContext);
  const navigate = useNavigate();

  const handleClick = (index) => {
    setBoxIndex(index);
  };

  const getFilteredData = (boxIndex) => {
    const year = 2024;
    const month = boxIndex + 1;
    const filteredData = expenses.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month
      );
    });

    return filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const handlPageClick = (detailId) => {
    navigate(`/detail/${detailId}`);
  };

  return (
    <>
      <FromComp onAddExpense={addExpense} />
      <BoxContainer
        boxData={Array.from({ length: 12 }, (_, index) => ({
          title: `${index + 1}월`,
          index,
        }))}
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
