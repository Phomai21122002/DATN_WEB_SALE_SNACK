import logoSale from '~/assets/images/Logo-sales.png';

function ChatMessage({ chat }) {
    return (
        <div className={`flex items-center justify-${chat.role === 'admin' ? 'start' : 'end'}`}>
            {chat.role === 'admin' && (
                <img src={logoSale} alt="Logo" className="w-10 h-10 self-end object-contain cursor-pointer" />
            )}
            <p
                className={`max-w-[75%] p-2 mx-2 bg-[#e6ebfe] rounded-md ${
                    chat.role === 'admin' ? 'rounded-bl-none' : 'rounded-br-none'
                }  text-black text-sm break-words`}
            >
                {chat.text}
            </p>
            {chat.role === 'user' && (
                <img src={logoSale} alt="Logo" className="w-10 h-10 self-end object-contain cursor-pointer" />
            )}
        </div>
    );
}

export default ChatMessage;
