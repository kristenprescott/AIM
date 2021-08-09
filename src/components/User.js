import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_USER = gql`
  query getUser {
    getUser {
      id
      screenname
      role
      buddyInfo
      imagePath
      email
      phoneNumber
      buddies {
        id
        screenname
        role
        buddyInfo
        email
        imagePath
        phoneNumber
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

export default function User() {
  // TODO: Repurpose this for adding buddies to buddyList
  // const dispatch = useMessageDispatch();
  // const { users } = useMessageState();
  // const selectedUser = users?.find((u) => u.selected === true)?.screenname;

  // const { loading } = useQuery(GET_USER, {
  //   onCompleted: (data) => dispatch({ type: "SET_USER", payload: user }),
  //   onError: (err) => console.log(err),
  // });

  let userMarkup;
  if (!users || loading) {
    // <img alt="loading..." src={Loading} width="300px" height="300px" />;
    <p>Loading...</p>;
  }
  // else if (users.length === 0) {
  //   <p>No one is online.</p>;
  // } else if (users.length > 0) {
  //   userMarkup = users.map((user) => {
  //     const selected = selectedUser.screenname === user.screenname;

  //     return (
  //       <div
  //         role="button"
  //         className="user-div"
  //         key={user.screenname}
  //         onClick={() =>
  //           dispatch({ type: "SET_SELECTED_USER", payload: user.screenname })
  //         }
  //       >
  //         <img
  //           alt="avatar"
  //           src={user.avatar}
  //           className="avatar"
  //           style={{ width: "30px" }}
  //         />
  //         <div>
  //           <h4>User:</h4>
  //           <p className="screenname">{user.screenname}</p>
  //           <h4>Messages:</h4>
  //           <p className="messages">
  //             {user.latestMessage
  //               ? user.latestMessage.content
  //               : "You are now connected!"}
  //           </p>
  //           <p>{user.latestMessage.content}</p>
  //         </div>
  //       </div>
  //     );
  //   });
  // }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {userMarkup}
    </div>
  );
}
