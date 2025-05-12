import axios from 'axios';

export const uploadMediaToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
    formData.append('folder', 'WEB-SALES');

    // Tự động xác định endpoint dựa vào loại file
    const isVideo = file.type.startsWith('video');
    const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/${
        isVideo ? 'video' : 'image'
    }/upload`;

    try {
        const response = await axios.post(uploadUrl, formData);
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
};
