import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Typewriter from './Typewriter';

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [conversations, setConversations] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversations]);

    const sendMessage = async () => {
        if (!message.trim() || isLoading) return;
        setLoading(true); 
        const newUserMessage = { text: message, sender: 'user' };
        setConversations(prevConversations => [...prevConversations, newUserMessage]);

       
        const loadingMessage = { text: "Loading...", sender: 'bot', loading: true };
        setConversations(prevConversations => [...prevConversations, loadingMessage]);

        setMessage('');
        const requestData = { question: message };
        try {
            const response = await axios.post('https://flowiseai.ots.tech/api/v1/prediction/08ff6967-6683-473f-b385-5c7c6955067e', requestData);
            const responseText = response.data.text;
            const newBotMessage = { text: responseText, sender: 'bot', loading: false };
           
            setConversations(prevConversations => prevConversations.map((conv, idx) => idx === prevConversations.length - 1 ? newBotMessage : conv));
        } catch (error) {
            const newErrorMessage = { text: 'Error retrieving response.', sender: 'bot', loading: false };
            
            setConversations(prevConversations => prevConversations.map((conv, idx) => idx === prevConversations.length - 1 ? newErrorMessage : conv));
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="bg-gray-800 min-h-screen flex flex-col items-center">
                <h1 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-center my-4">
                    Template Test
                </h1>
                <div className="w-full max-w-4xl shadow-lg rounded-lg bg-gray-900 text-white flex flex-col" style={{ height: '800px' }}>
                    <div className="p-4 space-y-2 flex-grow overflow-y-scroll" style={{ scrollbarWidth: 'thin', scrollbarColor: '#6b7280 #374151' }}>
                        <div className="space-y-2 px-[1rem]">
                            {conversations.map((conv, index) => (
                                <div key={index} className={`chat ${conv.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="avatar" src={conv.sender === 'user' ? 'https://vanwinefest.ca/wp-content/uploads/bfi_thumb/profile-default-male-nyg4vc4i3m1d5pote7rfsv4o4c7p5ka5an0pselxcc-nyhjt6b1oifa23xq2ehfxoh9vink6vuxyns1y35vkc.png' : 'https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif'} />
                                        </div>
                                    </div>
                                    <div className={`chat-bubble ${conv.sender === 'user' ? 'chat-bubble-primary' : 'chat-bubble-info'}`}>
                                        {conv.sender === 'bot' && conv.loading ? <span className="loading loading-dots loading-md"></span> : conv.sender === 'user' ? conv.text : <Typewriter text={conv.text} speed={50} />}
                                    </div>
                                    <div className="chat-footer opacity-50">
                                        {conv.sender === 'user' ? 'Seen' : 'Delivered'}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className="p-4">
                        <input
                            type="text"
                            className={`input input-bordered w-full ${isLoading ? 'bg-gray-700' : 'bg-gray-600'}`}
                            placeholder="Tapez votre message..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatBox;
