import "./styles.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import { styleReset } from "react95";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import { useState, useEffect } from "react";

import { useAuthDispatch } from "../context/auth";

import Taskbar from "./Taskbar";
// import Explorer from "./Explorer";
// import Notepad from "./Notepad";
import Shortcuts from "./Shortcuts";
import BuddyList from "../Windows/BuddyList/BuddyList";

const GlobalStyles = createGlobalStyle`
image-rendering: pixelated;
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;

export default function Desktop({ history }) {
  const dispatch = useAuthDispatch();

  const isMobile = window.innerWidth < 850;

  // const [explorerOpened, toggleExplorer] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [notepadOpened, toggleNotepad] = useState(false);
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   // toggleExplorer(true);
  //   // toggleNotepad(!isMobile);
  // }, [isMobile]);

  // const closeExplorer = () => {
  //   toggleExplorer(false);
  // };

  // const openExlorer = () => {
  //   toggleExplorer(true);
  // };

  // const closeNotepad = () => {
  //   toggleNotepad(false);
  // };

  // const openNotepad = (item) => {
  //   setSelectedItem(item);
  //   toggleNotepad(true);
  // };

  const signOut = () => {
    dispatch({ type: "SIGNOUT" });

    window.location.href = "/signon";
    // history.push("/signon");
  };

  return (
    <div
      id="Desktop"
      style={{
        height: "100vh",
        backgroundColor: "#018281",
      }}
    >
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <BuddyList signOut={signOut} />

        {/* <Shortcuts openExplorer={openExlorer} /> */}
        {/*       
      {explorerOpened && (
        <Explorer
          items={items}
          closeExplorer={closeExplorer}
          openNotepad={openNotepad}
          isMobile={isMobile}
        />
      )}
      {notepadOpened && (
        <Notepad
          closeNotepad={closeNotepad}
          selectedItem={selectedItem}
          isMobile={isMobile}
        />
      )} */}

        <Taskbar />
      </ThemeProvider>
    </div>
  );
}
