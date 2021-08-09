import React from "react";
import { gql, useQuery } from "@apollo/client";

import { useMessageDispatch, useMessageState } from "../context/message";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      screenname
      createdAt
      role
      buddyInfo
      phoneNumber
      email
      imagePath
      buddies
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

export default function Users() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true)?.screenname;

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => dispatch({ type: "SET_USERS", payload: users }),
    onError: (err) => console.log(err),
  });

  // let buddyListMarkup;
  // if (!data || loading) {
  //   buddyListMarkup = <p>Loading..</p>;
  // } else if (data.getUsers.length === 0) {
  //   buddyListMarkup = <p>No one is online.</p>;
  // } else if (data.getUsers.length > 0) {
  //   buddyListMarkup = data.getUsers.map((user) => (
  //     <div
  //       style={{ display: "flex" }}
  //       className="selected-user"
  //       key={user.screenname}
  //       onClick={() => setSelectedUser(user.screenname)}
  //     >
  //       <div>
  //         <p
  //           className="screenname"
  //           style={{
  //             fontSize: "13px",
  //             fontWeight: "200",
  //             fontFamily: "'Arial', 'Helvetica', sans-'serif'",
  //           }}
  //         >
  //           {user.screenname}
  //         </p>
  //         {/* TODO: edit buddylist logic: */}
  //         {/* <p className="sub">
  //           {user.latestMessage ? user.latestMessage.content : "now connected"}
  //         </p> */}
  //       </div>
  //     </div>
  //     // <div key={user.screenname}>
  //     //   <p>{user.screenname}</p>
  //     // </div>
  //   ));
  // }

  let buddyListMarkup;
  if (!users || loading) {
    // <img alt="loading..." src={Loading} width="300px" height="300px" />;
    <p>Loading...</p>;
  } else if (users.length === 0) {
    <p>No one is online.</p>;
  } else if (users.length > 0) {
    buddyListMarkup = users.map((user) => {
      const selected = selectedUser.screenname === user.screenname;

      return (
        <div
          role="button"
          className="user-div"
          key={user.screenname}
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
            <h4>User:</h4>
            <p className="screenname">{user.screenname}</p>
            <h4>Messages:</h4>
            <p className="messages">
              {user.latestMessage
                ? user.latestMessage.content
                : "You are now connected!"}
            </p>
            <p>{user.latestMessage.content}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {buddyListMarkup}
    </div>
  );
}
