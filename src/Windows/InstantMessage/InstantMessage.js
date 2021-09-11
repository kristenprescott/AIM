import "./InstantMessage.css";
import { InstantMessageBtn, SendBtn } from "../../assets/icons/buttons/index";
import {
  BoldIcon,
  ItalIcon,
  UnderlineIcon,
  FontIcon,
  FontColorIcon,
  FontLargeIcon,
  FontSmallIcon,
  LinkIcon,
  ImgFileIcon,
  EmojiIcon,
  MailIcon,
  NewsIcon,
} from "../../assets/icons/textEditor/index";

// TODO: Change first received IM to recieveFir1stsound
import {
  BuddyOnAlert,
  BuddyOffAlert,
  Receive1stIMAlert,
  ReceiveIMAlert,
  SendIMAlert,
} from "../../assets/sounds/index";

import {
  Button,
  Select,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import { Frame } from "@react95/core";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import { useAuthState } from "../../context/auth";
import { useMessageDispatch, useMessageState } from "../../context/message";

export default function InstantMessage({ setOpenIM, GET_MESSAGES }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
    console.assert(position);
  };

  const { user } = useAuthState();
  const { users } = useMessageState();
  const selectedUser = users.find((u) => u.selected === true);

  useEffect(() => {
    getMessages({ variables: { from: user.screenname } });
  }, []);

  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDropdown = (e) => {
    setOpenDropdown(!openDropdown);
  };

  const [
    getMessages,
    { loadding: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  function playSendIm() {
    let playSendIM = new Audio(SendIMAlert);
    playSendIM.play();
  }

  function playRecieveIM() {
    let playRecieveIM = new Audio(ReceiveIMAlert);
    playRecieveIM.play();
  }

  function playDoorOpen() {
    let playDoorOpen = new Audio(BuddyOnAlert);
    playDoorOpen.play();
  }

  function playDoorShut() {
    let playDoorShut = new Audio(BuddyOffAlert);
    playDoorShut.play();
  }

  const handleSendIMClick = (e) => {
    e.preventDefault();
    playSendIm();
    // Send message data
    console.log("Message sent!");
  };

  const handleRecieveIMClick = (e) => {
    e.preventDefault();
    playRecieveIM();
    // Send message data
    console.log("Message sent!");
  };

  const handlePlayDoorOpen = (e) => {
    e.preventDefault();
    playDoorOpen();
    // Send message data
    console.log("Message sent!");
  };

  const handlePlayDoorShut = (e) => {
    e.preventDefault();
    playDoorShut();
    // Send message data
    console.log("Message sent!");
  };

  const handleCloseIM = () => {
    setOpenIM(false);
  };

  let messagesMarkup;
  if (!messagesData || messagesLoading) {
    messagesMarkup = <p>Loading...</p>;
  } else if (messagesData.length === 0) {
    messagesMarkup = <p>You have no message history with {user.screenname}</p>;
  } else if (messagesData > 0) {
    return (messagesMarkup = messagesData.map((message) => (
      <div key={message.uuid} className="instantMessages">
        <span>{message.from}: </span> <p>{message.content}</p>
      </div>
    )));
  }

  return (
    <div className="IM">
      <Draggable handle="#handle" onDrag={(e, data) => trackPos(data)}>
        <Window className="window InstantMessage" style={{}}>
          <div className="box">
            <div id="handle" className="handle">
              <WindowHeader
                className="window-header imWindowHeader"
                style={{ cursor: "grab" }}
              >
                <div className="window-header-title-logo" style={{}}>
                  <img
                    alt="instant message icon"
                    className="favicon"
                    src={InstantMessageBtn}
                  />
                  <span className="windowTitle" style={{ margin: "1px" }}>
                    {/* TODO: Add `screenname - ` before 'Instant Message' below */}
                    Instant Message
                  </span>
                </div>
                <div className="window-header-btns">
                  <Button square style={{ margin: "1px" }}>
                    <span role="img" aria-label="recycle">
                      {/* _  */}
                      {/* – */}
                      &minus;
                    </span>
                  </Button>
                  <Button square style={{ margin: "1px" }}>
                    <span role="img" aria-label="recycle">
                      {/* ▢ */}□
                    </span>
                  </Button>
                  <Button
                    square
                    style={{ margin: "1px" }}
                    onClick={() => {
                      handleCloseIM();
                    }}
                  >
                    <span role="img" aria-label="recycle">
                      &times;
                    </span>
                  </Button>
                </div>
              </WindowHeader>
            </div>
            <Toolbar>
              <Button variant="menu" size="sm">
                <span style={{ textDecoration: "underline" }}>F</span>ile
              </Button>
              <Button variant="menu" size="sm">
                <span style={{ textDecoration: "underline" }}>E</span>dit
              </Button>
              <Button variant="menu" size="sm">
                I<span style={{ textDecoration: "underline" }}>n</span>sert
              </Button>
              <Button variant="menu" size="sm">
                <span style={{ textDecoration: "underline" }}>P</span>eople
              </Button>
            </Toolbar>
            <hr className="hr"></hr>
            <WindowContent className="WindowContent">
              <div className="select-container">
                <div className="select-wrapper">
                  <label
                    htmlFor="From"
                    style={{ marginRight: "5px", fontSize: "8px" }}
                  >
                    From:
                  </label>
                  <Select
                    width="19em"
                    options={[{ label: "", value: "any" }]}
                    open={false}
                    onChange={() => {
                      handleDropdown();
                      console.log("openDropdown? ", openDropdown);
                    }}
                    style={{ margin: " 0px 7px" }}
                  />
                </div>
                <div className="select-wrapper">
                  <label
                    htmlFor="To"
                    style={{ marginRight: "25px", fontSize: "8px" }}
                  >
                    To:
                  </label>
                  <Select
                    width="19em"
                    options={[{ label: "", value: "any" }]}
                    open={false}
                    onChange={() => {
                      handleDropdown();
                      console.log("openDropdown? ", openDropdown);
                    }}
                    style={{ margin: " 0px 5px" }}
                  />
                </div>
              </div>
              <div className="toolbar-container">
                <div className="toolbar-section1">
                  <img
                    alt="font color"
                    src={FontColorIcon}
                    style={{ padding: "0px 10px " }}
                  />
                  <img
                    alt="font color"
                    src={FontIcon}
                    style={{ padding: "0px 10px " }}
                  />
                </div>
                <hr
                  style={{
                    height: "100%",
                    border: "1px inset gainsboro",
                  }}
                ></hr>
                <div className="toolbar-section2">
                  <img
                    alt="font color"
                    src={FontSmallIcon}
                    style={{ padding: "0px 10px " }}
                  />
                  <img
                    alt="font color"
                    src={FontIcon}
                    style={{ padding: "0px 10px " }}
                  />
                  <img
                    alt="font color"
                    src={FontLargeIcon}
                    style={{ padding: "0px 10px " }}
                  />
                </div>
                <hr
                  style={{
                    height: "100%",
                    border: "1px inset gainsboro",
                  }}
                ></hr>
                <div className="toolbar-section3">
                  <img
                    alt="font color"
                    src={BoldIcon}
                    style={{ padding: "0px 10px " }}
                  />
                  <img
                    alt="font color"
                    src={ItalIcon}
                    style={{ padding: "0px 10px " }}
                  />
                  <img
                    alt="font color"
                    src={UnderlineIcon}
                    style={{ padding: "0px 10px " }}
                  />
                </div>
                <hr
                  style={{
                    height: "100%",
                    border: "1px inset gainsboro",
                  }}
                ></hr>
                <div className="toolbar-section4">
                  <img
                    alt="font color"
                    src={LinkIcon}
                    style={{ padding: "0px 10px " }}
                  />
                  <img
                    alt="font color"
                    src={ImgFileIcon}
                    style={{ padding: "0px 10px " }}
                  />
                  <img
                    alt="font color"
                    src={MailIcon}
                    style={{ padding: "0px 10px " }}
                  />
                  <img
                    alt="font color"
                    src={EmojiIcon}
                    style={{ padding: "0px 10px " }}
                  />
                </div>
                <hr
                  style={{
                    height: "100%",
                    border: "1px inset gainsboro",
                  }}
                ></hr>
                <div className="toolbar-section5">
                  <img
                    alt="font color"
                    src={FontColorIcon}
                    style={{ padding: "0px 10px " }}
                  />
                  <img
                    alt="font color"
                    src={NewsIcon}
                    style={{ padding: "0px 10px " }}
                  />
                </div>
              </div>
              <Frame width={600} height={220} padding={1} margin={1}>
                <Frame
                  height="100%"
                  width="100%"
                  bg="white"
                  style={{
                    border: "inset 3px solid gray",
                    borderRadius: "0px",
                    boxShadow:
                      "-2px -2px 3px rgba(0,0,0,0.9), 2px 2px 0px floralwhite",
                  }}
                >
                  {/* <div>
                    <p className="screenname">{user.screenname}</p>
                    <p className="messages">
                      {user.latestMessage ? user.latestMessage.content : "..."}
                    </p>
                  </div> */}

                  <div>
                    {messagesData && messagesData.getMessages.length > 0 ? (
                      messagesData.getMessages.map((message) => (
                        <p
                          key={message.uuid}
                          style={{ fontSize: "20px", padding: "6px" }}
                        >
                          <span
                            style={{
                              fontWeight: "900",
                              color: "red",
                              margin: "10px",
                              marginRight: "13px",
                            }}
                          >
                            {message.from}:
                          </span>
                          <span>{message.content}</span>
                        </p>
                      ))
                    ) : (
                      // TODO: replace with ... anim
                      <p
                        style={{
                          fontSize: "20px",
                          marginLeft: "10px",
                        }}
                      >
                        ...
                      </p>
                    )}
                  </div>
                </Frame>
              </Frame>

              {/* <div className="messages">{selectedChatMarkup}</div> */}
              {/* <div className="messages">
                  {messagesData && { messagesMarkup }}
                </div> */}

              {/* <div>
                  {messagesData && messagesData.getMessages.length > 0 ? (
                    <p key={messagesData.message.uuid}>
                      {messagesData.message.content}
                    </p>
                  ) : (
                    <p>Messages:</p>
                  )}
                </div> */}

              <div className="textfield">
                <div className="footer-btns-wrapper">
                  <img
                    alt="font color"
                    src={SendBtn}
                    style={{ width: "50px", margin: "0px 9%" }}
                    onClick={handlePlayDoorOpen}
                  />

                  <img
                    alt="font color"
                    src={SendBtn}
                    style={{ width: "50px", margin: "0px 9%" }}
                    onClick={handlePlayDoorShut}
                  />

                  <img
                    alt="font color"
                    src={SendBtn}
                    style={{ width: "50px", margin: "0px 9%" }}
                    onClick={handleRecieveIMClick}
                  />
                </div>

                <hr
                  style={{
                    height: "100%",
                    border: "1px inset gainsboro",
                  }}
                ></hr>
                <div className="send-btn-wrapper">
                  <button
                    className="send-btn"
                    type="submit"
                    onClick={handleSendIMClick}
                  >
                    <img
                      alt="send message"
                      src={SendBtn}
                      style={{ width: "125%", padding: "0px", margin: "0px" }}
                    />
                  </button>
                </div>
              </div>
            </WindowContent>
            <div className="inner"></div>
          </div>
        </Window>
      </Draggable>
    </div>
  );
}
