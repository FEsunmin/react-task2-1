import React from "react";
import styled from "styled-components";
import ListComp from "./ListComp";

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const ListContainer = ({ data }) => {
  return (
    <Container>
      {data.map((item) => (
        <ListComp key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default ListContainer;
