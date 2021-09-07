import "./styles.css";

// import { useState, useEffect } from "react";

import { useAuthDispatch } from "../context/auth";

// import Taskbar from "./Taskbar";
// import Explorer from "./Explorer";
// import Notepad from "./Notepad";
// import Shortcuts from "./Shortcuts";
import BuddyList from "../Windows/BuddyList/BuddyList";

export default function Desktop({ history }) {
  const dispatch = useAuthDispatch();

  // const [explorerOpened, toggleExplorer] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [notepadOpened, toggleNotepad] = useState(false);
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   toggleExplorer(true);
  //   toggleNotepad(!isMobile);
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
        // backgroundColor: "#018281",
      }}
    >
      <button
        onClick={signOut}
        className="temp-btn"
        style={{ cursor: "pointer" }}
      >
        SignOut
      </button>
      <BuddyList />

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

      {/* <Taskbar /> */}
    </div>
  );
}
