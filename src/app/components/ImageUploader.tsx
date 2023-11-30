import React, { useState, ChangeEvent } from 'react';

const ImageUploader = () => {
    const [image, setImage] = useState('');

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files ? e.target?.files[0] : null

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
                setImage(data.secure_url);
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error during upload:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleUpload} />
            {image && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={image} alt="Uploaded" />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
