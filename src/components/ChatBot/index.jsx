import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useEffect, useRef, useState } from 'react';

import logoSale from '~/assets/images/Logo-sales.png';
import ChatForm from '../ChatForm';
import ChatMessage from '../ChatMessage';

function ChatBot() {
    const [chatHistory, setChatHistory] = useState([]);
    const [showChatBot, setShowChatBot] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div>
            <button
                onClick={() => setShowChatBot((prev) => !prev)}
                className="flex items-center justify-center fixed w-[60px] h-[60px] right-[50px] bottom-[50px] cursor-pointer 
               rounded-[50%] bg-blue-500 shadow-[0_5px_5px_rgba(0,0,0,0.25)] transition-transform duration-300"
            >
                <span
                    className={`absolute transition-transform duration-300 ${
                        showChatBot ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                    }`}
                >
                    <ModeCommentIcon sx={{ fontSize: '32px' }} className="text-white" />
                </span>
                <span
                    className={`absolute transition-transform duration-300 ${
                        showChatBot ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                    }`}
                >
                    <CloseIcon sx={{ fontSize: '32px' }} className="text-white" />
                </span>
            </button>

            <div
                className={`fixed overflow-hidden w-[350px] right-[50px] bottom-[120px] rounded-xl bg-white origin-bottom-right ease-in-out duration-100 shadow-[0_35px_35px_rgba(0,0,0,0.25)] ${
                    showChatBot
                        ? 'opacity-1 scale-[1] pointer-event-auto cursor-pointer'
                        : 'opacity-0 scale-[0.2] pointer-event-none'
                }`}
            >
                <div className="flex items-center justify-between bg-blue-500 p-3">
                    <div className="flex items-center">
                        <img src={logoSale} alt="Logo" className="w-10 h-10 object-contain cursor-pointer" />
                        <p className="text-white px-2 text-xl font-semibold">Phô mai</p>
                    </div>
                    <div
                        onClick={() => setShowChatBot((prev) => !prev)}
                        className="px-[6px] rounded-[50%] hover:bg-blue-400 transition duration-300 ease-in-out"
                    >
                        <KeyboardArrowDownIcon sx={{ fontSize: '24px' }} className="text-white" />
                    </div>
                </div>
                <div ref={chatContainerRef} className="flex flex-col h-[350px] p-3 pb-[70px] gap-4 overflow-auto">
                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
                    ))}
                </div>
                <div className="absolute bottom-0 p-3 w-full bg-white">
                    <ChatForm setChatHistory={setChatHistory} />
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
