import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function Button({ title, link, handle, icon }) {
    const buttonStyles =
        'flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-medium text-[20px] transition duration-200';

    return link ? (
        <Link to={link} className={buttonStyles}>
            {icon && <FontAwesomeIcon className="text-lg" icon={icon} />}
            {title}
        </Link>
    ) : (
        <div onClick={handle} className={buttonStyles} role="button">
            {icon && <FontAwesomeIcon className="text-lg" icon={icon} />}
            {title}
        </div>
    );
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    handle: PropTypes.func,
    icon: PropTypes.object,
};

export default Button;
