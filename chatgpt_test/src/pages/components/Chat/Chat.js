import { useState } from "react";
import Image from "next/image";

import styles from "./chat.module.css";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  async function onSubmit(event) {
    try {
      const response = await fetch("/api/conn_openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputValue }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      return data.result.trim();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const message = { text: inputValue, isUser: true };
    setMessages((prevMessages) => [...prevMessages, message]);
    const response = await onSubmit(inputValue);
    const botMessage = { text: response, isUser: false };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInputValue("");
  };

  return (
    <>
      <div className={styles.section}>
        <div className={styles.chat_container}>
          <div className={styles.container}>
            <div className={styles.message}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={message.isUser ? styles.user : styles.bot}
                >
                  {message.isUser ? (
                    <Image
                      src="/user.svg"
                      height={32}
                      width={32}
                      alt="avatar"
                    />
                  ) : (
                    <Image
                      src="/openai.svg"
                      height={32}
                      width={32}
                      alt="openai"
                    />
                  )}
                  {message.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={handleMessageSubmit} className={styles.form}>
          <textarea
            className={styles.textInput}
            type="text"
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button className={styles.submitButton} type="submit">
            <Image src="/send.svg" height={32} width={32} alt="send" />
          </button>
        </form>
      </div>
    </>
  );
}
