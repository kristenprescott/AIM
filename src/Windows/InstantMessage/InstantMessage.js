import "./InstantMessage.css";
import favicon from "../../assets/icons/window-icon.png";
import fontColor from "../../assets/icons/font-color.png";
import bold from "../../assets/icons/bold.png";
import ital from "../../assets/icons/ital.png";
import underline from "../../assets/icons/underline.png";
import fontSmall from "../../assets/icons/font-small.png";
import font from "../../assets/icons/font.png";
import fontLarge from "../../assets/icons/font-large.png";
import link from "../../assets/icons/link.png";
import imgFile from "../../assets/icons/img-file.png";
import emoji from "../../assets/icons/emoji.png";
import mail from "../../assets/icons/mail.png";
import news from "../../assets/icons/news.png";
import send from "../../assets/buttons/send.png";
import doorOpen from "../../assets/sounds/door_open.wav";
import doorShut from "../../assets/sounds/door_close.wav";
import recieveIM from "../../assets/sounds/im_recieve.wav";
import sendIM from "../../assets/sounds/im_send.wav";
import {
  Button,
  Select,
  TextField,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";

import React, { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import { useMessageDispatch, useMessageState } from "../../context/message";

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

export default function InstantMessage() {
  const [text, setText] = useState("");
  //   const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    console.log("message: ", e.target.value);
    setText(e.target.value);
  };

  const handleDropdown = (e) => {
    setIsOpen(!isOpen);
  };

  function playSendIm() {
    let playSendIM = new Audio(sendIM);
    playSendIM.play();
  }

  function playRecieveIM() {
    let playRecieveIM = new Audio(recieveIM);
    playRecieveIM.play();
  }

  function playDoorOpen() {
    let playDoorOpen = new Audio(doorOpen);
    playDoorOpen.play();
  }

  function playDoorShut() {
    let playDoorShut = new Audio(doorShut);
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

  const { users } = useMessageState();
  const dispatch = useMessageDispatch();

  const selectedUser = users?.find((u) => u.selected === true);
  const messages = selectedUser?.messages;

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.screenname } });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          screenname: selectedUser.screenname,
          messages: messagesData.getMessages,
        },
      });
    }
  }, [messagesData]);
  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p>Select a friend</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p>Loading..</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => (
      <p key={message.uuid}>{message.content}</p>
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = <p>You are now connected! send your first message!</p>;
  }

  // return <div className="messages">{selectedChatMarkup}</div>;

  return (
    <div className="IM">
      <Window className="window InstantMessage" style={{}}>
        <WindowHeader className="window-header imWindowHeader">
          <div className="window-header-title-logo" style={{}}>
            <img alt="favicon" className="favicon" src={favicon} />
            <span className="windowTitle" style={{ margin: "1px" }}>
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
            <Button square style={{ margin: "1px" }}>
              <span role="img" aria-label="recycle">
                &times;
              </span>
            </Button>
          </div>
        </WindowHeader>
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
                  console.log("isOpen? ", isOpen);
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
                  console.log("isOpen? ", isOpen);
                }}
                style={{ margin: " 0px 5px" }}
              />
            </div>
          </div>
          <div className="toolbar-container">
            <div className="toolbar-section1">
              <img
                alt="font color"
                src={fontColor}
                style={{ padding: "0px 10px " }}
              />
              <img
                alt="font color"
                src={font}
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
                src={fontSmall}
                style={{ padding: "0px 10px " }}
              />
              <img
                alt="font color"
                src={font}
                style={{ padding: "0px 10px " }}
              />
              <img
                alt="font color"
                src={fontLarge}
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
                src={bold}
                style={{ padding: "0px 10px " }}
              />
              <img
                alt="font color"
                src={ital}
                style={{ padding: "0px 10px " }}
              />
              <img
                alt="font color"
                src={underline}
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
                src={link}
                style={{ padding: "0px 10px " }}
              />
              <img
                alt="font color"
                src={imgFile}
                style={{ padding: "0px 10px " }}
              />
              <img
                alt="font color"
                src={mail}
                style={{ padding: "0px 10px " }}
              />
              <img
                alt="font color"
                src={emoji}
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
                src={fontColor}
                style={{ padding: "0px 10px " }}
              />
              <img
                alt="font color"
                src={news}
                style={{ padding: "0px 10px " }}
              />
            </div>
          </div>
          <TextField
            multiline
            fullWidth
            rows={6}
            cols={50}
            value={text}
            onChange={handleChange}
          >
            <div className="messages">{selectedChatMarkup}</div>
            {/* <div>
              {messagesData && messagesData.getMessages.length > 0 ? (
                <p key={message.uuid}>{message.conent}</p>
              ) : (
                <p>Messages:</p>
              )}
            </div> */}
          </TextField>

          <div className="textfield">
            <div className="footer-btns-wrapper">
              <img
                alt="font color"
                src={send}
                style={{ width: "50px", margin: "0px 9%" }}
                onClick={handlePlayDoorOpen}
              />

              <img
                alt="font color"
                src={send}
                style={{ width: "50px", margin: "0px 9%" }}
                onClick={handlePlayDoorShut}
              />

              <img
                alt="font color"
                src={send}
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
                  src={send}
                  style={{ width: "125%", padding: "0px", margin: "0px" }}
                />
              </button>
            </div>
          </div>
        </WindowContent>
      </Window>
    </div>
  );
}
