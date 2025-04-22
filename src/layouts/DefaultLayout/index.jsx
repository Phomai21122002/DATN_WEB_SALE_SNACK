import PropTypes from 'prop-types';
import ChatBot from '~/components/ChatBot';
import Footer from '~/components/Footer';
import Header from '~/components/Header/Header';

function DefaultLayout({ children }) {
    return (
        <div className="bg-gray-100">
            <Header />
            {children}
            <Footer />
            <ChatBot />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
