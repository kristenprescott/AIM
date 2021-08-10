import "./BuddyList.css";
import favicon from "../../assets/icons/window-icon.png";
import logo from "../../assets/images/profile-logo.png";
// import doorOpen from "../../assets/sounds/door_open.wav";
// import doorShut from "../../assets/sounds/door_close.wav";
// import recieveIM from "../../assets/sounds/im_recieve.wav";
// import sendIM from "../../assets/sounds/im_send.wav";
import {
  Button,
  Checkbox,
  Cutout,
  Fieldset,
  NumberField,
  Panel,
  Tab,
  Tabs,
  TabBody,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import classNames from "classnames";

import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { useAuthState } from "../../context/auth";
import { useMessageDispatch, useMessageState } from "../../context/message";

// import Users from "../../components/Users";
// import Message from "../../components/Message";

import InstantMessage from "../InstantMessage/InstantMessage";

import Draggable from "react-draggable";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      screenname
      role
      imagePath
      createdAt
      buddyInfo
      phoneNumber
      email
      buddies {
        id
        screenname
        role
        email
        phoneNumber
        imagePath
      }
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
    }
  }
`;

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

export default function BuddyList({ signOut }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const [openIM, setOpenIM] = useState(false);

  const { user } = useAuthState();
  const [imOpen, setImOpen] = useState(false);
  const [active, setActive] = useState({
    activeTab: 0,
  });
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  // const selectedUser = users?.find((u) => u.selected === true)?.screenname;
  const handleChange = (e, value) => setActive({ activeTab: value });
  const { activeTab } = active;

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  const [
    getMessages,
    { loadding: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    // when selectedUser, fetch messges
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser, getMessages]);

  const handleSelectedUser = () => {
    setSelectedUser(user.screenname);
    setOpenIM(true);
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

  // TODO: Fix botMarkup
  let botMarkup;
  if (!users || loading) {
    botMarkup = <p>Loading...</p>;
  } else if (users.length === 0) {
    botMarkup = <p>All bots are currently under routine maintenance.</p>;
  } else if (users.length > 0) {
    botMarkup = users.map((user) => {
      const selected = selectedUser === user.screenname;
      if (users.role === "bot") {
        return (
          <div
            style={{ cursor: "pointer" }}
            role="button"
            key={user.screenname}
            className={classNames("screennames", { "bg-white": selected })}
            onClick={() => {
              setImOpen(true);
              console.log(imOpen);
              dispatch({ type: "SET_SELECTED_USER", payload: user.screenname });
            }}
          >
            <p>{user.screenname}</p>;
          </div>
        );
      }
      return botMarkup;
    });
  }

  let buddyListMarkup;
  if (!users || loading) {
    buddyListMarkup = <p>Loading...</p>;
  } else if (users.length === 0) {
    buddyListMarkup = <p></p>;
  } else if (users.length > 0) {
    buddyListMarkup = users.map((user) => {
      const selected = selectedUser === user.screenname;
      return (
        <div
          style={{ cursor: "pointer" }}
          role="button"
          key={user.screenname}
          className={classNames("screennames", { "bg-white": selected })}
          onClick={() => {
            handleSelectedUser();
          }}
          // onClick={() =>
          //   dispatch({ type: "SET_SELECTED_USER", payload: user.screenname })
          // }
        >
          {user.screenname}
          {/* <img
            alt="imagePath"
            src={user.imagePath}
            className="imagePath"
            style={{ width: "30px" }}
          /> */}
          {/* <Message user={user} /> */}
        </div>
      );
    });
  }

  return (
    <div className="IM BuddyList">
      <button onClick={signOut} className="temp-btn">
        SignOut
      </button>
      {openIM && (
        <InstantMessage
          messagesData={messagesData}
          messagesMarkup={messagesMarkup}
          selectedUser={selectedUser}
          setOpenIM={setOpenIM}
        />
      )}
      <Draggable handle="#handle" onDrag={(e, data) => trackPos(data)}>
        <Window className="window buddyListWindow">
          <div className="box">
            <div id="handle" className="handle">
              <WindowHeader
                className="window-header buddyListWindowHeader"
                style={{ cursor: "grab" }}
              >
                <div className="window-header-title-logo">
                  {/* TODO: Change icon in window header */}
                  <img className="favicon" alt="favicon" src={favicon} />
                  {/* TODO: Make <Screenname>'s BuddyList dynamic */}
                  <span className="windowTitle" style={{ margin: "1px" }}>
                    {user && user.screenname} 's Buddy List...
                  </span>
                </div>

                <div className="window-header-btns">
                  <Button square style={{ margin: "1px" }}>
                    <span role="img" aria-label="recycle">
                      &minus;
                    </span>
                  </Button>
                  <Button square style={{ margin: "1px" }}>
                    <span role="img" aria-label="recycle">
                      □
                    </span>
                  </Button>
                  <Button square style={{ margin: "1px" }}>
                    <span role="img" aria-label="recycle">
                      &times;
                    </span>
                  </Button>
                </div>
              </WindowHeader>
            </div>
            <Toolbar>
              <Button variant="menu" size="sm">
                <span style={{ textDecoration: "underline" }}>M</span>y AIM
              </Button>
              <Button variant="menu" size="sm">
                <span style={{ textDecoration: "underline" }}>P</span>eople
              </Button>
              <Button variant="menu" size="sm">
                <span style={{ textDecoration: "underline" }}>H</span>elp
              </Button>
            </Toolbar>
            <hr className="hr"></hr>

            <WindowContent className="WindowContent" style={{ height: "23em" }}>
              <div className="logo">
                <img
                  alt="logo"
                  src={logo}
                  style={{ width: "50%", height: "50%" }}
                />
              </div>
              <div className="" style={{ height: "100%" }}>
                <Tabs value={activeTab} onChange={handleChange}>
                  <Tab value={0} style={{ cursor: "pointer" }}>
                    Online
                  </Tab>
                  <Tab value={1} style={{ cursor: "pointer" }}>
                    List Setup
                  </Tab>
                </Tabs>
                {/* // --------------BUDDYLIST-------------- // */}
                <TabBody style={{ height: "100%" }}>
                  {activeTab === 0 && (
                    <div style={{ height: "100%" }}>
                      <Cutout id="cutout">
                        <div className="buddyList">
                          <details>
                            <summary>AIM Bots(1/1)</summary>
                            <div className="buddyListMarkup">{botMarkup}</div>
                          </details>
                          <details>
                            <summary>Buddies(4/18)</summary>
                            <div className="buddyListMarkup">
                              {buddyListMarkup}
                            </div>
                          </details>
                          <details>
                            <summary
                              style={{
                                color: "darkgray",
                                fontStyle: "italic",
                              }}
                            >
                              Offline(13/18)
                            </summary>
                            <div className="buddyListMarkup">
                              {buddyListMarkup}
                            </div>
                          </details>
                        </div>
                      </Cutout>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div>
                      <Fieldset label="Order:">
                        <div style={{ padding: "0.5em 0 0.5em 0" }}>
                          Amount:
                        </div>
                        <NumberField width="100%" min={0} defaultValue={0} />
                        <br />
                        <Checkbox
                          name="shipping"
                          value="fast"
                          label="Fast shipping"
                          onChange={() => null}
                          defaultChecked
                        />
                      </Fieldset>
                    </div>
                  )}
                </TabBody>
              </div>
              <Panel variant="well" id="panel">
                Put some content here
              </Panel>
            </WindowContent>

            <div className="inner"></div>
          </div>
        </Window>
      </Draggable>
      ;
    </div>
  );
}

// TODO: add sound notif
