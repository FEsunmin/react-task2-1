import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ListContainer from "../components/ListComponents/ListContainer";
import BoxContainer from "../components/BoxComponents/BoxContainer";
import FromComp from "../components/FormComponents/FromComp";
import { useNavigate } from "react-router-dom";
import { setBoxIndex, addExpense } from "../store/expenseSlice";

const Home = () => {
  const boxIndex = useSelector((state) => state.expenses.boxIndex);
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (index) => {
    dispatch(setBoxIndex(index));
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

  const handlePageClick = (detailId) => {
    navigate(`/detail/${detailId}`);
  };

  return (
    <>
      <FromComp onAddExpense={(expense) => dispatch(addExpense(expense))} />
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
        onExpenseClick={handlePageClick}
      />
    </>
  );
};

export default Home;
