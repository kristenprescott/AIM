// import { useState } from "react";

import { useAuthDispatch } from "../context/auth";

import BuddyList from "../Windows/BuddyList/BuddyList";
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
      style={{
        width: "100vw",
        height: "100vh",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {/* <Users /> */}
      {/* <Messages /> */}
      {/* <InstantMessage /> */}
      <BuddyList
        // selectedUser={selectedUser}
        // setSelectedUser={setSelectedUser}
        signOut={signOut}
      />
    </div>
  );
}
