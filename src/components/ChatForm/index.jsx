import NavigationIcon from '@mui/icons-material/Navigation';
import { useRef } from 'react';

function ChatForm({ setChatHistory }) {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = '';
        setChatHistory((history) => [...history, { role: 'user', text: userMessage }]);
        setTimeout(() => setChatHistory((history) => [...history, { role: 'admin', text: 'hello, user' }]), 600);
    };

    return (
        <form
            action="#"
            className="h-10 flex items-center border-2 p-1 border-solid border-[#dadada] rounded-full focus-within:border-blue-400 transition duration-150 ease-in-out"
            onSubmit={handleFormSubmit}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Nhập dữ liệu..."
                className="peer h-full border-none outline-none bg-transparent text-sm w-full px-3 whitespace-pre-wrap"
                required
            />
            <button className="w-8 h-8 flex items-center justify-center border-none outline-none rounded-full bg-blue-400 shrink-0 hidden peer-valid:flex">
                <NavigationIcon sx={{ fontSize: '20px' }} className="text-white" />
            </button>
        </form>
    );
}

export default ChatForm;
