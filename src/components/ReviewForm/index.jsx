import { useState } from 'react';
import Image from '~/components/Image';
import StarRate from '~/components/StarRate';
import { uploadMediaToCloudinary } from '~/pages/Admin/CreateProduct/Constant';

function ReviewForm({
    initialRating = 0,
    initialContent = '',
    initialMedia = [],
    onSubmit,
    onCancel,
    submitLabel = 'Gửi đánh giá',
}) {
    const [rating, setRating] = useState(initialRating);
    const [content, setContent] = useState(initialContent);
    const [mediaFiles, setMediaFiles] = useState(initialMedia || []);

    const handleMediaUpload = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedUrls = await Promise.all(files.map((file) => uploadMediaToCloudinary(file)));
        setMediaFiles((prev) => [...prev, ...uploadedUrls]);
    };

    const handleRemoveMedia = (index) => setMediaFiles((prev) => prev.filter((_, i) => i !== index));

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            rating,
            content,
            mediaFiles,
        });
    };

    return (
        <div className="bg-white w-full p-8 mt-8">
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <h2 className="uppercase mb-4 text-xl">Đánh giá của bạn</h2>
                <StarRate className="mb-4" sizeStar={40} gap={4} rating={rating} setRating={setRating} />

                <h2 className="uppercase mb-4 text-xl">Nhận xét của bạn</h2>
                <textarea
                    placeholder="Nội dung đánh giá"
                    className="border text-xl p-2 w-full rounded"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input className="text-xl" type="file" accept="image/*,video/*" multiple onChange={handleMediaUpload} />
                <div className="flex gap-4 flex-wrap">
                    {mediaFiles.map((url, index) => (
                        <div key={index} className="relative">
                            {url.match(/.(mp4|webm)$/) ? (
                                <video controls className="w-32 h-32">
                                    <source src={url} type="video/mp4" />
                                </video>
                            ) : (
                                <Image src={url} className="w-32 h-32 object-cover rounded" />
                            )}
                            <button
                                type="button"
                                onClick={() => handleRemoveMedia(index)}
                                className="absolute top-0 right-0 px-2 text-red-500 hover:text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-4">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="text-lg bg-gray-200 px-4 py-2 rounded text-gray-600 hover:bg-gray-300"
                        >
                            Hủy
                        </button>
                    )}
                    <button
                        type="submit"
                        className="text-xl bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReviewForm;
