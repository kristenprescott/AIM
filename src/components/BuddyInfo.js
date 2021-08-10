import { useAuthDispatch } from "../context/auth";

// import Users from "./Users";
// import Messages from "./Messages";
import BuddyList from "../Windows/BuddyList/BuddyList";
import InstantMessage from "../Windows/InstantMessage/InstantMessage";

export default function Profile({ history }) {
  const dispatch = useAuthDispatch();

  const signOut = () => {
    dispatch({ type: "SIGNOUT" });
    history.push("/signon");
  };

  return (
    <div
      className="Profile"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Users /> */}
      {/* <Messages /> */}
      {/* <InstantMessage /> */}
      {/* <BuddyList signOut={signOut} /> */}
    </div>
  );
}
