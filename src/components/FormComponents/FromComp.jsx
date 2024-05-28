import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const FromContainer = styled.form`
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: space-between;
`;

const InputBox = styled.input`
  width: 180px;
  height: 30px;
`;

const BtnStyle = styled.button`
  width: 100px;
  height: 36px;
  margin-top: 20px;
  cursor: pointer;
`;

const TitleStyle = styled.label`
  height: 20px;
  font-size: 16px;
`;

const FlexStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const FromComp = ({ onAddExpense }) => {
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!date) newErrors.date = "날짜를 입력하세요.";
    if (!amount || isNaN(amount))
      newErrors.amount = "유효한 금액을 입력하세요.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const id = uuidv4();
      const newExpense = {
        id: id,
        date,
        item,
        amount: parseFloat(amount),
        description,
      };
      onAddExpense(newExpense);
      setDate("");
      setItem("");
      setAmount("");
      setDescription("");
      setErrors({});
    }
  };

  return (
    <FromContainer onSubmit={handleSubmit}>
      <FlexStyle>
        <TitleStyle>날짜:</TitleStyle>
        <InputBox
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <span>{errors.date}</span>}
      </FlexStyle>
      <FlexStyle>
        <TitleStyle>항목:</TitleStyle>
        <InputBox
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </FlexStyle>
      <FlexStyle>
        <TitleStyle>금액:</TitleStyle>
        <InputBox
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && <span>{errors.amount}</span>}
      </FlexStyle>
      <FlexStyle>
        <TitleStyle>내용:</TitleStyle>
        <InputBox
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FlexStyle>
      <BtnStyle type="submit">지출 등록</BtnStyle>
    </FromContainer>
  );
};

export default FromComp;
