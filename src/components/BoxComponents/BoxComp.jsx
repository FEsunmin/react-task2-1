import React from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  width: 120px;
  height: 60px;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 15px;
  color: ${(props) => (props.active ? "white" : "black")};
  background-color: ${(props) => (props.active ? "#50e2c0" : "lightgrey")};
`;

function BoxComp({ active, onClick, title }) {
  return (
    <StyledBox active={active} onClick={onClick}>
      {title}
    </StyledBox>
  );
}

export default BoxComp;
