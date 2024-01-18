import "./chat-box.css";
// import { PiDotsThreeBold } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { db } from "#firebase/firebase.config";
import PropTypes from "prop-types";
import LoadingPage from "#pages/loading/loading";
import Balancer from "react-wrap-balancer";
import { AiOutlineClose } from "react-icons/ai";
import {
  ref,
  onValue,
  set,
  push,
  query,
  orderByChild,
} from "firebase/database";
import d from "dayjs";
import { connect } from "react-redux";
import { useClickAway } from "@uidotdev/usehooks";

ChatBox.propTypes = {
  propertyName: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  booking: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};
function ChatBox({ propertyName, currentUser, booking, close }) {
  const [text, setText] = useState("");
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const popupRef = useClickAway(close);
  const [messages, setMessages] = useState([]);

  const { mutate: addMessage, isPending } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      if (!text) return;
      const newMessage = {
        text,
        from: currentUser?._id,
        timestamp: Date.now(),
      };
      const chatsRef = ref(db, `messages/${booking?._id}`);
      const newMessageRef = push(chatsRef);
      set(newMessageRef, newMessage);
      setText("");
      inputRef.current?.focus();
    },
    onError: (firebaseError) => {
      console.log({ firebaseError });
    },
    onSuccess: () => {
      console.log("Message added successfully");
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    try {
      if (booking?._id) {
        const chatsRef = ref(db, `messages/${booking?._id}`);
        const queryRef = query(chatsRef, orderByChild("timestamp"));
        onValue(queryRef, (snapshot) => {
          const chatsData = snapshot.val();
          console.log({ chatsData });
          if (chatsData) setMessages(chatsData);
        });
      }
    } catch (err) {
      console.log({ err });
    }
  }, [booking, currentUser]);

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  const messagesKeys = messages ? Object.keys(messages) : [];
  return (
    <div className="cb-backdrop">
      <div className="cb-container" ref={popupRef}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "10px 20px",
            boxShadow:
              "#1b1f23a 0px 1px 0px, rgba(15, 14, 14, 0.417) 0px 3px 0px inset",
          }}
        >
          <h1>
            <Balancer>{propertyName}</Balancer>
          </h1>
          <button
            onClick={close}
            style={{
              width: "35px",
              aspectRatio: "1/1",
              background: "rgb(255, 247, 247)",
              color: "red",
              border: "none",
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="cb">
          <div className="cb-messages-container" ref={chatBoxRef}>
            {!messagesKeys?.length ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <p>Initiate Chat</p>
              </div>
            ) : (
              messagesKeys?.map((id) => {
                const message = messages?.[id];
                return (
                  <Message
                    key={id}
                    {...{
                      message,
                      isSent: message?.from === currentUser?._id,
                      date: d(new Date(message.timestamp)).format(
                        "DD, MMM, YYYY"
                      ),
                    }}
                  />
                );
              })
            )}
          </div>
          <form className="cb-footer" onSubmit={addMessage}>
            <img src="/add-md.png" alt="" className="cb-icon" />
            <input
              ref={inputRef}
              disabled={isPending}
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Type a message here"
              className="cb-text-box"
            />
            <img src="/link.png" alt="" className="cb-icon" />
            {isPending ? (
              <LoadingPage.Loader />
            ) : (
              <button className="cb-submit-button" disabled={isPending}>
                <img
                  style={{
                    opacity: text?.length > 0 ? 1 : 0.5,
                    cursor: "pointer",
                  }}
                  src="/send.png"
                  alt=""
                  className="cb-icon"
                />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  isSent: PropTypes.bool.isRequired,
};
function Message({ message, date, isSent }) {
  const { text } = message;

  // const profilePicStyles = {};
  // if (!isReceived && user?.profilePic) {
  //   profilePicStyles.backgroundImage = `url("${
  //     import.meta.env.VITE_SERVER_URL
  //   }/images/${user?.profilePic}")`;
  //   profilePicStyles.backgroundSize = "cover";
  //   profilePicStyles.backgroundPosition = "center";
  // }
  return (
    <div
      className="cb-message"
      style={{
        width: "60%",
        ...(isSent ? { marginLeft: "auto" } : { marginRight: "auto" }),
      }}
    >
      {/* {!isReceived ? (
        <div className="cb-sender-pic" style={profilePicStyles}>
          {!user?.profilePic && user?.initials}
        </div>
      ) : (
        <PiDotsThreeBold className="cb-dots" />
      )} */}
      <div className="cb-msg-text">
        <p className={`cb-message-text ${isSent ? "sent" : "received"}`}>
          {text}
        </p>
        {date && <p className="cb-msg-date">{date}</p>}
      </div>
    </div>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState)(ChatBox);
