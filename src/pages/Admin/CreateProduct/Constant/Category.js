import axios from 'axios';

export const categories = ['Điện tử', 'Thực phẩm', 'Đồ gia dụng', 'Thời trang'];

export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
    formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);
    formData.append('folder', 'WEB-SALES');
    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            formData,
        );
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
};
