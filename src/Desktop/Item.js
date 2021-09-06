import styled from "styled-components";
import "@react95/icons/icons.css";

const StyledItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 25%;
  padding: 10px 0;
`;

const StyledSpan = styled.span`
  margin-top: 5px;
`;

export default function File({ item, openNotepad }) {
  const { name, icon } = item;
  return (
    <StyledItem>
      {/* <Icon name={icon} className="pointer" onClick={() => openNotepad(item)} /> */}
      <StyledSpan>{name}</StyledSpan>
    </StyledItem>
  );
}
