import "./SignUp.css";
import aimLogo from "../../assets/images/aim.svg";
import favicon from "../../assets/icons/window-icon.png";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Checkbox,
  Fieldset,
  TextField,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";

import Draggable from "react-draggable";

const SIGNUP_USER = gql`
  # mutation signUp($screenname: String!, $password: String!) {
  # signUp(screenname: $screenname, password: $password) {
  mutation signUp($screenname: String!, $password: String!, $role: String!) {
    signUp(screenname: $screenname, password: $password, role: $role) {
      screenname
      role
      # createdAt
    }
  }
`;

export default function SignUp(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
    console.assert(position);
  };

  const [variables, setVariables] = useState({
    screenname: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  const [signUpUser /*, { loading }*/] = useMutation(SIGNUP_USER, {
    update: (_, __) => props.history.push("/signon"),
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const submitSignUpForm = (e) => {
    e.preventDefault();

    signUpUser({ variables });

    // clear signUp form:
    setVariables({
      screenname: "",
      password: "",
      role: "user",
    });

    window.location.href = "/";
    // props.history.push("/signon");
  };

  return (
    <div className="SignUp">
      <Draggable handle="#handle" onDrag={(e, data) => trackPos(data)}>
        <Window className="window SignUpWindow">
          <div className="box">
            <div id="handle" className="handle">
              <WindowHeader className="window-header SignUpWindowHeader">
                <div className="window-header-title-logo">
                  <img
                    alt="favicon"
                    src={favicon}
                    style={{
                      cursor: "grab",
                      width: "1rem",
                      height: "1rem",
                      margin: "1px",
                    }}
                  />

                  <span className="windowTitle" style={{ margin: "1px" }}>
                    Get a Screenname
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
              <Fieldset autocomplete="off" label="ScreenName">
                <span style={{ color: "tomato" }}>
                  {errors && errors.screenname && errors.screenname}
                </span>

                <TextField
                  type="text"
                  value={variables.screenname}
                  onChange={(e) => {
                    setVariables({ ...variables, screenname: e.target.value });
                  }}
                  width={160}
                />
              </Fieldset>
              <Fieldset label="Password">
                <span style={{ color: "tomato" }}>
                  {errors && errors.password && errors.password}
                </span>

                <TextField
                  type="password"
                  value={variables.password}
                  onChange={(e) => {
                    setVariables({ ...variables, password: e.target.value });
                  }}
                  width={160}
                />
                <small
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  <a href="/signon"> Already have an account? SignOn</a>
                </small>
              </Fieldset>
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

            <div className="signOnBtnWrapper">
              <Button primary size="lg" onClick={submitSignUpForm}>
                Submit
              </Button>
            </div>
            <div className="versionWrapper">
              <small id="version">Version 5.38.2</small>
            </div>

            <div className="inner"></div>
          </div>
        </Window>
      </Draggable>
    </div>
  );
}
