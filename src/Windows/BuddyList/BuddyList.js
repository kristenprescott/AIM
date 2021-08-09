import "./BuddyList.css";
import favicon from "../../assets/icons/window-icon.png";
import logo from "../../assets/images/profile-logo.png";
// import doorOpen from "../../assets/sounds/door_open.wav";
// import doorShut from "../../assets/sounds/door_close.wav";
// import recieveIM from "../../assets/sounds/im_recieve.wav";
import sendIM from "../../assets/sounds/im_send.wav";
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

import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

import { useMessageDispatch, useMessageState } from "../../context/message";

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

export default function BuddyList(props) {
  const [active, setActive] = useState({
    activeTab: 0,
  });
  const handleChange = (e, value) => setActive({ activeTab: value });
  const { activeTab } = active;

  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true)?.screenname;

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  // TODO: Fix aimBotMarkup
  let aimBotMarkup;
  if (!users || loading) {
    aimBotMarkup = <p>Loading..</p>;
  } else if (users.length === 0) {
    aimBotMarkup = <p>No users have joined yet</p>;
  } else if (users.length > 0) {
    if (users.isBot === true) {
      aimBotMarkup = users.map((user) => {
        <p>{user.screenname}</p>;
      });
    }
  }

  let buddyListMarkup;
  if (!users || loading) {
    buddyListMarkup = <p>Loading..</p>;
  } else if (users.length === 0) {
    buddyListMarkup = <p>No users have joined yet</p>;
  } else if (users.length > 0) {
    buddyListMarkup = users.map((user) => {
      const selected = selectedUser === user.screenname;
      return (
        <div
          style={{ cursor: "pointer" }}
          role="button"
          key={user.screenname}
          className={classNames("screennames", { "bg-white": selected })}
          onClick={() =>
            dispatch({ type: "SET_SELECTED_USER", payload: user.screenname })
          }
        >
          <img
            alt="avatar"
            src={user.avatar}
            className="avatar"
            style={{ width: "30px" }}
          />
          <div>
            <p className="screenname">{user.screenname}</p>
            <p className="messages">
              {user.latestMessage
                ? user.latestMessage.content
                : "You are now connected!"}
            </p>
            {/* <p>{user.latestMessage.content}</p> */}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="IM">
      <button onClick={props.signOut} className="temp-btn">
        SignOut
      </button>
      <Window className="window buddyListWindow">
        <WindowHeader className="window-header buddyListWindowHeader">
          <div className="window-header-title-logo">
            {/* TODO: Change icon in window header */}
            <img className="favicon" alt="favicon" src={favicon} />
            {/* TODO: Make <Screenname>'s BuddyList dynamic */}
            <span className="windowTitle" style={{ margin: "1px" }}>
              {props.screenname && props.screenname}'s Buddy List...
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
            <TabBody style={{ height: "100%" }}>
              {activeTab === 0 && (
                <div style={{ height: "100%" }}>
                  <Cutout id="cutout">
                    <div className="buddyList">
                      <details>
                        <summary>AIM Bots(1/1)</summary>
                        <div className="buddyListMarkup">{aimBotMarkup}</div>
                      </details>
                      <details>
                        <summary>Buddies(4/18)</summary>
                        <div className="buddyListMarkup">{buddyListMarkup}</div>
                      </details>
                      <details>
                        <summary
                          style={{ color: "darkgray", fontStyle: "italic" }}
                        >
                          Offline(13/18)
                        </summary>
                        <div className="buddyListMarkup">{buddyListMarkup}</div>
                      </details>
                    </div>
                  </Cutout>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <Fieldset label="Order:">
                    <div style={{ padding: "0.5em 0 0.5em 0" }}>Amount:</div>
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
      </Window>
    </div>
  );
}

// TODO: add sound notif
