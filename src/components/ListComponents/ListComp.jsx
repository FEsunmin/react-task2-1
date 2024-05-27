import React from "react";
import styled from "styled-components";

const Item = styled.div`
  width: 980px;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const Amount = styled.div`
  color: ${(props) => (props.amount > 100000 ? "red" : "green")};
  font-weight: bold;
`;

const ListComp = ({ item, onClick }) => {
  const handleClick = () => {
    onClick(item.id);
  };

  return (
    <Item onClick={handleClick}>
      <ItemDetails>
        <div>{item.date}</div>
        <div>
          {item.item.length > 20
            ? `${item.item.substring(0, 20)}...`
            : item.item}
        </div>
        <div>
          {item.description.length > 100
            ? `${item.description.substring(0, 100)}...`
            : item.description}
        </div>
      </ItemDetails>
      <Amount amount={item.amount}>{item.amount.toLocaleString()} 원</Amount>
    </Item>
  );
};

export default ListComp;
