import React, { useContext, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailComp from "../components/DetailComponent/DetailComp";
import { ExpenseContext } from "../contexts/ExpenseContext";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expenses, updateExpense, deleteExpense } = useContext(ExpenseContext);
  const detailExpense = expenses.find((item) => item.id === id);

  const [isEditing, setIsEditing] = useState(false);

  const dateRef = useRef(detailExpense.date);
  const itemRef = useRef(detailExpense.item);
  const amountRef = useRef(detailExpense.amount);
  const descriptionRef = useRef(detailExpense.description);

  const handleUpdate = () => {
    const updatedExpense = {
      ...detailExpense,
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
    };
    updateExpense(updatedExpense);
    navigate("/");
  };

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteExpense(detailExpense.id);
      navigate("/");
    }
  };

  return (
    <DetailComp
      detailExpense={detailExpense}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      dateRef={dateRef}
      itemRef={itemRef}
      amountRef={amountRef}
      descriptionRef={descriptionRef}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      navigate={navigate}
    />
  );
};

export default Detail;
