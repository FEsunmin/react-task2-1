import React from "react";
import styled from "styled-components";
import ListComp from "./ListComp";

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const ListContainer = ({ data, onExpenseClick }) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <Container>
      {data.length === 0 ? (
        <p>아직 지출 내역이 없습니다</p>
      ) : (
        sortedData.map((item) => (
          <ListComp key={item.id} item={item} onClick={onExpenseClick} />
        ))
      )}
    </Container>
  );
};

export default ListContainer;
