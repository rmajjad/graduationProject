import axios from "axios";
import React, { useEffect, useState } from 'react';
import './chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [count, SetCount] = useState(0);


  const sendMessage = async () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user px-5' }]);
      setInput('');
      setTimeout(async () => {


        const token = localStorage.getItem('UserToken');
        const userMessage = input.toLowerCase();

        if (['hi', 'hello', 'good morning'].includes(userMessage)) {
          setMessages(prevMessages => [...prevMessages, { text: 'Welcome to Ai Pharmacy', sender: 'ai px-5 ms-auto' }]);
        } else if (['bye', 'thank you', 'thanks', 'good bye'].includes(userMessage)) {
          setMessages(prevMessages => [...prevMessages, { text: 'Bye, I advise you to visit a doctor', sender: 'ai px-5 ms-auto' }]);
        } else {
          const { data } = await axios.post('http://localhost:4000/chat', { message: input }, { headers: { Authorization: `Rama__${token}` } });
          console.log(data);
          setMessages(prevMessages => [...prevMessages, { text: `you have "${data.Medicine}" disease, you should visit Doctor`, sender: 'ai px-5 ms-auto' }]);
        }

      }, 1000);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    SetCount(0);
  };


  return (
    <div className='chat_bg'>
      <div className='subchat'>
        <div className='chat_title'>
          <img src='img/pharmacyfooter.png' className='chat-img'></img>
        </div>
        <div className="chat-container chat_layouts ">
          <div className="chat-window  ">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
            <button onClick={clearMessages}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}
