import { Dialog } from '@mui/material';
import BorderLine from '../BorderLine';

function CoverPopUp({ isOpen, onClose, children }) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullScreen
            sx={{
                backdropFilter: 'blur(2px)',
                backgroundColor: 'rgba(59, 59, 59, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            PaperProps={{
                sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    boxShadow: 'none',
                },
            }}
        >
            <BorderLine className="flex items-center justify-center">{children}</BorderLine>
        </Dialog>
    );
}

export default CoverPopUp;
