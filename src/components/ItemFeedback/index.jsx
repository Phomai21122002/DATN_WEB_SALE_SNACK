import { memo, useEffect, useRef, useState } from 'react';
import noImage from '~/assets/images/No-image.png';
import Image from '~/components/Image';
import StarRate from '~/components/StarRate';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useStorage } from '~/Contexts';
import { DeleteFeedBack, UpdateFeedBack } from '~/services/Feedback';
import ReviewForm from '../ReviewForm';

function ItemFeedback({ feedback, product, refetchListFeedback }) {
    const menuRef = useRef();
    const { userData } = useStorage();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleEdit = () => {
        setIsOpen(false);
        setIsEditing(true);
    };
    const handleDelete = async (userId, feedbackId) => {
        setIsOpen(false);
        await DeleteFeedBack(userId, feedbackId);
        await refetchListFeedback();
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = async (rating, content, mediaFiles) => {
        try {
            await UpdateFeedBack(feedback.user.id, feedback.id, {
                productId: product?.id,
                content: content,
                rate: rating,
                urls: mediaFiles,
            });
            refetchListFeedback();
            setIsEditing(false);
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    return (
        <div className="mt-6 border-b-2 border-gray-300 relative">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        className="w-16 h-16 rounded-full object-contain"
                        src={feedback.user?.url || noImage}
                        alt="avatar"
                    />
                    <div className="mx-4 text-xl">
                        <h4 className="leading-none">{feedback.user.lastName + ' ' + feedback.user.firstName}</h4>
                        <StarRate rating={feedback?.rate || 0} setRating={() => {}} />
                        <p className="text-lg text-gray-500">{new Date(feedback.createdAt)?.toLocaleString()}</p>
                    </div>
                </div>

                {userData?.id === feedback?.user?.id && (
                    <div className="relative" ref={menuRef}>
                        <button onClick={toggleMenu} className="px-2 py-1 rounded-full hover:bg-gray-100">
                            <MoreVertIcon />
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-lg rounded-md z-10">
                                <button
                                    onClick={handleEdit}
                                    className="w-full text-sm px-4 py-2 text-left hover:bg-gray-100"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(feedback?.user?.id, feedback?.id)}
                                    className="w-full text-sm px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                                >
                                    Xóa
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="mx-4 my-2">
                {isEditing ? (
                    <ReviewForm
                        initialRating={feedback.rate}
                        initialContent={feedback.content}
                        initialMedia={feedback.imageFeedBacks.map((i) => i.url)}
                        submitLabel="Xác nhận"
                        onCancel={handleCancel}
                        onSubmit={({ rating, content, mediaFiles }) => handleSave(rating, content, mediaFiles)}
                    />
                ) : (
                    <>
                        <p className="whitespace-pre-line text-xl text-justify py-4">{feedback.content}</p>
                        {feedback.imageFeedBacks?.length > 0 && (
                            <div className="flex items-center flex-wrap py-2 gap-4">
                                {feedback.imageFeedBacks.map((url, i) => (
                                    <div key={i} className="w-36 h-36">
                                        {url.url.match(/.(mp4|webm)$/) ? (
                                            <video controls className="w-full h-full">
                                                <source src={url.url} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <Image src={url.url} className="object-cover w-full h-full" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default memo(ItemFeedback);
