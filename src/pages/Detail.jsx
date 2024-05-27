import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailComp from "../components/DetailComponent/DetailComp";

const Detail = () => {
  const { id } = useParams();

  const [detailExpense, setdetailExpense] = useState(null);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      const expenses = JSON.parse(storedExpenses);
      const foundExpense = expenses.find((item) => item.id === id);
      setdetailExpense(foundExpense);
    }
  }, [id]);

  return (
    <div>
      {detailExpense ? (
        <DetailComp detailExpense={detailExpense} />
      ) : (
        <p>아직 지출 내역이 없습니다</p>
      )}
    </div>
  );
};

export default Detail;
