import "./styles.css";
// TODO: Look into Intersection Observer API to handle window position/focus etc

import { useAuthDispatch } from "../context/auth";

import BuddyList from "../Windows/BuddyList/BuddyList";

export default function Desktop({ history }) {
  const dispatch = useAuthDispatch();

  const signOut = () => {
    dispatch({ type: "SIGNOUT" });

    window.location.href = "/signon";
    // history.push("/signon");
  };

  return (
    <div id="Desktop">
      <button
        onClick={signOut}
        className="temp-btn"
        style={{ cursor: "pointer" }}
      >
        SignOut
      </button>
      <BuddyList />
    </div>
  );
}
