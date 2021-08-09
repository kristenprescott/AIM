import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

export default function Message({ user }) {
  //

  return (
    <>
      <div>
        <p className="screenname">{user.screenname}</p>
        <p className="messages">
          {user.latestMessage ? user.latestMessage.content : ""}
        </p>
        {/* <p>{user.latestMessage.content}</p> */}
      </div>
    </>
  );
}
