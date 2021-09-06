// import { useState } from "react";

import { useAuthDispatch } from "../context/auth";

// import BuddyList from "../Windows/BuddyList/BuddyList";
// import InstantMessage from "../Windows/InstantMessage/InstantMessage";

export default function BuddyInfo({ history }) {
  const dispatch = useAuthDispatch();

  const signOut = () => {
    dispatch({ type: "SIGNOUT" });

    window.location.href = "/signon";
    // history.push("/signon");
  };

  return (
    <div
      className="BuddyInfo"
      style={
        {
          // width: "100vw",
          // height: "100vh",
        }
      }
    >
      {/* <Users /> */}
      {/* <Messages /> */}
      {/* <InstantMessage /> */}
      {/* <BuddyList signOut={signOut} /> */}
    </div>
  );
}
