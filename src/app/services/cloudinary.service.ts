import { message } from "antd";

const imgToUrl = async (file: File) => {

    // Kiểm tra xem file có tồn tại không
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dlir2404'); // Thay 'your_unsigned_upload_preset' bằng tên của unsigned upload preset của bạn

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dd0fae9zz/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            return data.secure_url
        } else {
            console.error('Upload failed');
            return
        }
    } catch (error) {
        console.error('Error during upload:', error);
        message.error('Upload ảnh bị lỗi')
        return
    }
}

export default imgToUrl