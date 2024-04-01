import React, { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Avatar from "@material-ui/core/Avatar";

const Chatbot = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    axios.get('./chatData.json')
      .then(response => {
        setChatData(response.data);
      })
      .catch(error => {
        console.error("Error al cargar los datos JSON:", error);
      });
  }, []);

  const getMessageSender = (messageText) => {
    const testMessages = [
      "Testest",
      "Testetsetst",
      "tetstetst",
      "Testestetst",
      "tetsetste",
    ];
    return testMessages.includes(messageText) ? "J" : null;
  };

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };


  const getBotResponse = (userMessage) => {
    const messageLowercase = userMessage.toLowerCase();
    const response = botResponses[messageLowercase];
    return (
      response ||
      "Sorry, I don't understand your question. Can you rephrase it or provide more details?"
    );
  };

  useEffect(() => {
     setMessages(chatData);
   }, []);

   const handleSendMessage = async () => {
    if (inputText.trim() === "") return;
    const userMessage = { text: inputText, sender: "user" };
  
    const botMessage = chatData.find(message => message.message_text === inputText && message.bot_sender === 1);
    const botMessageText = botMessage ? botMessage.message_text : "Lo siento, no tengo una respuesta para eso.";
  
    const botResponse = { text: botMessageText, sender: 'bot' };
  
    setMessages([...messages, userMessage, botResponse]);
    setInputText("");
  };
    const botResponses = {
      hello: "hi! how can i assist you today?",
      apples:
        "the customer asked: |||| do you sell apples?  ||| and i didn't know how to reply. can you tell me what i can reply to this?",
    };

    
  
  

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <Avatar alt="Avatar" src="./components/img/pngwing.com.png" />
        <h4> Georgia IA</h4>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="icon">
            <button onClick={toggleChatbot}>
              {isChatbotVisible ? (
                <CloseIcon style={{ fontSize: "15px" }} />
              ) : (
                <ArrowUpwardIcon style={{ fontSize: "20px" }} />
              )}
            </button>{" "}
          </div>
        </div>
      </div>

      <div
        id="chatbot"
        className={`chatbot ${isChatbotVisible ? "" : "hidden"}`}
      >
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user" : "bot"
              }`}
            >
              <p>{message.text}</p>
              <Avatar
                alt={message.sender}
                src={message.avatar}
                className="bot-avatar"
              />
            </div>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Hazme una Pregunta ......"
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
