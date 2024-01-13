import styles from "./chat-button.module.scss";
import PropTypes from "prop-types";
import ChatBox from "#components/chat-box/chat-box";
import { useState } from "react";

ChatButton.propTypes = {
  children: PropTypes.node.isRequired,
  booking: PropTypes.object.isRequired,
  propertyName: PropTypes.string.isRequired,
};
function ChatButton({ children, booking, propertyName }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      {isChatOpen && (
        <ChatBox
          booking={booking}
          propertyName={propertyName}
          close={() => {
            setIsChatOpen(false);
          }}
        />
      )}
      <button
        className={styles.chatButton}
        onClick={() => {
          setIsChatOpen(true);
        }}
      >
        {children}
      </button>
    </>
  );
}

export default ChatButton;
