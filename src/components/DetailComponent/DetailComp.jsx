import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Frame = styled.div`
  width: 1000px;
  height: 550px;
  margin: 0 auto;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const Content = styled.div`
  width: 950px;
  height: 500px;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 18px;
`;

const TextBox = styled.p`
  width: 600px;
  height: 40px;
  display: flex;
  padding-left: 20px;
  border: 1px solid;
  border-radius: 5px;
  font-size: 18px;
  align-items: center;
  margin-bottom: 40px;
`;

const InputBox = styled.input`
  width: 600px;
  height: 40px;
  display: flex;
  padding-left: 20px;
  border: 1px solid;
  border-radius: 5px;
  font-size: 18px;
  align-items: center;
  margin-bottom: 40px;
`;

const BtnFrame = styled.div`
  width: 600px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 120px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  margin-right: 20px;
  cursor: pointer;
`;

const DetailComp = ({ detailExpense }) => {
  const navigate = useNavigate();

  const dateRef = useRef(detailExpense.date);
  const itemRef = useRef(detailExpense.item);
  const amountRef = useRef(detailExpense.amount);
  const descriptionRef = useRef(detailExpense.description);

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    const updatedExpense = {
      ...detailExpense,
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: parseFloat(amountRef.current.value),
      description: descriptionRef.current.value,
    };

    const updatedExpenses = JSON.parse(localStorage.getItem("expenses")).map(
      (expense) => (expense.id === updatedExpense.id ? updatedExpense : expense)
    );
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    navigate(-1);
  };

  const handleDelete = () => {
    if (window.confirm("정말 이 지출 항목을 삭제하시겠습니까?")) {
      const updatedExpenses = JSON.parse(
        localStorage.getItem("expenses")
      ).filter((expense) => expense.id !== detailExpense.id);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      navigate(-1);
    }
  };

  return (
    <Frame>
      <Content>
        <div>
          <Title>날짜</Title>
          {isEditing ? (
            <InputBox
              type="date"
              defaultValue={detailExpense.date}
              ref={dateRef}
            />
          ) : (
            <TextBox>{detailExpense.date}</TextBox>
          )}
        </div>
        <div>
          <Title>분류</Title>
          {isEditing ? (
            <InputBox defaultValue={detailExpense.item} ref={itemRef} />
          ) : (
            <TextBox>{detailExpense.item}</TextBox>
          )}
        </div>
        <div>
          <Title>비용</Title>
          {isEditing ? (
            <InputBox
              type="number"
              defaultValue={detailExpense.amount}
              ref={amountRef}
            />
          ) : (
            <TextBox>{detailExpense.amount}</TextBox>
          )}
        </div>
        <div>
          <Title>설명</Title>
          {isEditing ? (
            <InputBox
              defaultValue={detailExpense.description}
              ref={descriptionRef}
            />
          ) : (
            <TextBox>{detailExpense.description}</TextBox>
          )}
        </div>
        <BtnFrame>
          {isEditing ? (
            <Button onClick={handleUpdate}>확인</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>수정</Button>
          )}
          <Button onClick={handleDelete}>삭제</Button>
          <Button onClick={() => navigate(-1)}>뒤로가기</Button>
        </BtnFrame>
      </Content>
    </Frame>
  );
};

export default DetailComp;
