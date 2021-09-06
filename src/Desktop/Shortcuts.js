import "./styles.css";
import styled from "styled-components";
import "@react95/icons/icons.css";

const StyledShorcut = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  align-items: center;
`;

export default function Shortcut({ openExplorer }) {
  return (
    <div className="Shortcut">
      <StyledShorcut>
        {/* <Icon
          className="pointer"
          name="windows_exporer"
          onClick={() => openExplorer()}
        /> */}
        <div>Explorer</div>
      </StyledShorcut>
      <StyledShorcut>
        {/* <Icon
          className="pointer"
          name="media_cd"
        /> */}
        <div>Media</div>
      </StyledShorcut>
    </div>
  );
}
