import { createContext } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ToastContext = createContext();

function ToastProvider({ children }) {
    const value = { toast };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                toastStyle={{
                    color: '#000',
                    fontWeight: 'normal',
                    fontSize: '14px',
                }}
            />
        </ToastContext.Provider>
    );
}

export { ToastContext, ToastProvider };
