import React, { useContext, useState } from 'react';
import './chat.css';
import UserContex from '../context/User.jsx';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [count, SetCount] = useState(0);
  const [loading, setLoading] = useState(false);
  let { userData } = useContext(UserContex);

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user px-5' }]);
      setInput('');
      setLoading(true);  // Start loading
      setTimeout(async () => {
        const token = localStorage.getItem('UserToken');
        const userMessage = input.toLowerCase();
        if (count === 0) {
          const aiResponse = `Welcome ${userData.userName} to Ai Pharmacy ... `;
          setMessages(prevMessages => [...prevMessages, { text: aiResponse, sender: 'ai px-5 ms-auto' }]);
          SetCount(1);
        } else if (['bye', 'thank you', 'thanks', 'good bye'].includes(userMessage)) {
          setMessages(prevMessages => [...prevMessages, { text: 'Bye, don’t forget to visit a doctor', sender: 'ai px-5 ms-auto' }]);
        } else {
          const { data } = await axios.post('http://localhost:5000/chat', { message: input }, { headers: { Authorization: `Rama__${token}` } });
          console.log(data);
          setMessages(prevMessages => [...prevMessages, { text: `you have "${data.Disease}" , you should visit Doctor`, sender: 'ai px-5 ms-auto' }]);
        }
        setLoading(false);  // Stop loading
      }, 1000);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    SetCount(0);
  };

  return (
    <div className='chat_bg h-100 py-5'>
      <div className="title text-center position-relative">
        <div className=" d-flex justify-content-center align-items-center ">
          <h2 className='text-black'>Al's Chat</h2>
          <span className="position-absolute fs-3">Al's Chat</span>
        </div>
        <p className="container-fluid w-100 d-flex py-3 justify-content-center align-items-center lead">
          You can write your symptoms and I will predict your disease
        </p>
      </div>
      <div className='subchat'>
        <div className='chat_title'>
          <img src='img/pharmacyfooter.png' className='chat-img'></img>
        </div>
        <div className="chat-container chat_layouts ">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="message ai px-5 ms-auto">
                Typing...
              </div>
            )}
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
