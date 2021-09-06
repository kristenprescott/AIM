import aimLogo from "../../assets/images/aim.svg";
import favicon from "../../assets/icons/logo-icon.png";

import React, { useState } from "react";
import "./SignOn.css";
import {
  Button,
  Checkbox,
  Fieldset,
  TextField,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import { gql, useLazyQuery } from "@apollo/client";

import { useAuthDispatch } from "../../context/auth";

import BuddyList from "../BuddyList/BuddyList";

import Draggable from "react-draggable";

const SIGNON_USER = gql`
  query signOn($screenname: String!, $password: String!) {
    signOn(screenname: $screenname, password: $password) {
      id
      screenname
      role
      email
      phoneNumber
      buddyInfo
      imagePath
      updatedAt
      createdAt
      token
      buddies {
        id
        screenname
        role
        buddyInfo
        phoneNumber
        email
        imagePath
        createdAt
        updatedAt
      }
    }
  }
`;

export default function SignOn(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
    console.assert(position);
  };

  const [screenname, setScreenname] = useState("");
  const [variables, setVariables] = useState({
    screenname: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSignedOn, setIsSignedOn] = useState(false);

  const dispatch = useAuthDispatch();

  // TODO: Handled unauthorized user - conditionally redirect back to SignOn instead
  // useLazyQuery: executing queries manually.
  const [signOnUser /*, { loading }*/] = useLazyQuery(SIGNON_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      dispatch({ type: "SIGNON", payload: data.signOn });

      // Redirect to Home after signOn
      props.history.push("/");
    },
  });

  const submitSignOnForm = (e) => {
    e.preventDefault();

    setScreenname(variables.screenname);
    signOnUser({ variables });
    setIsSignedOn(true);
    console.log(`${variables.screenname} signed on :)`);
  };

  return (
    <div
      className="SignOn"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Draggable handle="#handle" onDrag={(e, data) => trackPos(data)}>
        {isSignedOn ? (
          <BuddyList screenname={screenname} />
        ) : (
          <Window className="window SignOnWindow">
            <div className="box">
              <div id="handle" className="handle">
                <WindowHeader
                  className="window-header buddyListWindowHeader"
                  style={{
                    cursor: "grab",
                    width: "auto",
                    height: "2.3em",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="window-header-title-logo"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      alt="favicon"
                      src={favicon}
                      style={{
                        width: "1rem",
                        height: "1rem",
                        margin: "1px",
                      }}
                    />

                    <span className="windowTitle" style={{ margin: "1px" }}>
                      SignOn
                    </span>
                  </div>

                  <div
                    className="window-header-btns"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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

              <WindowContent className="WindowContent">
                <img
                  alt="aimLogo"
                  src={aimLogo}
                  width="100%"
                  height="90%"
                  style={{ margin: "0px 5px" }}
                />
              </WindowContent>

              <div className="fieldsetWrapper">
                <Fieldset label="ScreenName">
                  <span style={{ color: "tomato" }}>
                    {errors && errors.screenname && errors.screenname}
                  </span>
                  <div value={variables.screenname}>
                    <TextField
                      autoComplete="new-password"
                      type="text"
                      autoFocus="true"
                      onFocus={(e) => e.target.select()}
                      defaultValue="<New User>"
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          screenname: e.target.value,
                        })
                      }
                      width={160}
                    />
                  </div>

                  <span
                    onClick={() => {
                      console.log("Get a screen name.");
                    }}
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "blue",
                    }}
                  >
                    <a href="/signup">Get a Screen Name</a>
                  </span>
                </Fieldset>
                <Fieldset label="Password">
                  <span style={{ color: "tomato" }}>
                    {errors && errors.password && errors.password}
                  </span>
                  <TextField
                    autocomplete="new-password"
                    type="password"
                    value={variables.password}
                    onChange={(e) =>
                      setVariables({ ...variables, password: e.target.value })
                    }
                    /*disabled*/ width={160}
                  />
                  <span
                    onClick={() => {
                      // TODO: create password reset
                      console.log("Reset password.");
                    }}
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "blue",
                    }}
                  >
                    <a href="/">Forgot Password?</a>
                  </span>
                </Fieldset>
                {/* TODO: Set checkboxes to interactive when there is text in the pw field */}
                <div className="checkboxWrapper">
                  <Checkbox
                    name="shipping"
                    value="shipping"
                    label="Save password"
                    disabled
                  />
                  <Checkbox
                    name="shipping"
                    value="shipping"
                    label="Auto-login"
                    disabled
                  />
                </div>
              </div>
              {/* TODO: Redirect after SignOn is not working for some reason */}
              <div className="signOnBtnWrapper">
                <Button onClick={submitSignOnForm} primary size="lg">
                  Sign On
                </Button>
              </div>

              <div className="versionWrapper">
                <small id="version">Version 5.38.2</small>
              </div>

              <div className="inner"></div>
            </div>
          </Window>
        )}
      </Draggable>
      ;
    </div>
  );
}
