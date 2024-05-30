import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DetailComp from "../components/DetailComponent/DetailComp";
import { updateExpense, deleteExpense } from "../store/expenseSlice";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
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
    dispatch(updateExpense(updatedExpense));
    navigate(-1);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(deleteExpense(detailExpense.id));
      navigate(-1);
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
