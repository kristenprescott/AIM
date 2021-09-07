import "./BuddyList.css";
import runningMan from "../../assets/icons/logo-icon.png";
import logo from "../../assets/images/profile-logo.png";
// TODO: Add sounds

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
import Draggable from "react-draggable";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

import { useMessageDispatch, useMessageState } from "../../context/message";
import { useAuthState } from "../../context/auth";
import InstantMessage from "../InstantMessage/InstantMessage";

export default function BuddyList() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
    console.assert(position);
  };

  const [openIM, setOpenIM] = useState(false);
  const dispatch = useMessageDispatch();
  const { user } = useAuthState();
  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true)?.screenname;

  const handleSelectedUser = () => {
    dispatch({ type: "SET_SELECTED_USER", payload: user.screenname });
    setOpenIM(true);
  };

  const [active, setActive] = useState({
    activeTab: 0,
  });

  const handleChange = (e, value) => setActive({ activeTab: value });
  const { activeTab } = active;

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  let usersMarkup;
  if (!users || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (users.length === 0) {
    usersMarkup = <p></p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => {
      const selected = user.screenname;
      return (
        <div
          style={{ cursor: "pointer" }}
          role="button"
          key={user.screenname}
          className={classNames("screennames", { "bg-white": selected })}
          onClick={() => {
            handleSelectedUser();
          }}
        >
          <p>{user.screenname}</p>
          {/* <img
            alt="imagePath"
            src={user.imagePath}
            className="imagePath"
            style={{ width: "30px" }}
          /> */}
          <div>
            {/* <p>{user.latestMessage ? user.latestMessage.content : "..."}</p> */}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="IM BuddyList">
      {openIM && (
        <InstantMessage setOpenIM={setOpenIM} GET_MESSAGES={GET_MESSAGES} />
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
                  {/* // TODO: Change icon in window header */}
                  <img className="favicon" alt="AIM icon" src={runningMan} />
                  {/* // TODO: Make <Screenname>'s BuddyList dynamic */}
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
                {/*  --------------BUDDYLIST--------------  */}
                <TabBody style={{ height: "100%" }}>
                  {activeTab === 0 && (
                    <div style={{ height: "100%" }}>
                      <Cutout id="cutout">
                        <div className="buddyList">
                          <details>
                            <summary>AIM Bots(1/1)</summary>
                            <div className="buddyListMarkup">
                              {/* {botMarkup} */}
                            </div>
                          </details>
                          <details>
                            <summary>Buddies(4/18)</summary>
                            <div className="buddyListMarkup">{usersMarkup}</div>
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
                            <div className="buddyListMarkup">{usersMarkup}</div>
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
                {/* Put some content here */}
              </Panel>
            </WindowContent>

            <div className="inner"></div>
          </div>
        </Window>
      </Draggable>
    </div>
  );
}

// TODO: add sound notif

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
