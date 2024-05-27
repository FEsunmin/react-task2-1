import React from "react";
import styled from "styled-components";
import BoxComp from "./BoxComp";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
`;

const FlexContainer = styled.div`
  margin: 0 auto;
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxContainer = ({ boxData, boxIndex, handleClick }) => {
  return (
    <FlexContainer>
      <GridContainer>
        {boxData.map((box, index) => (
          <BoxComp
            key={index}
            title={box.title}
            active={index === boxIndex}
            onClick={() => handleClick(index)}
          />
        ))}
      </GridContainer>
    </FlexContainer>
  );
};

export default BoxContainer;
