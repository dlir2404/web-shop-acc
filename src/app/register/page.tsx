'use client'
import React, { useState } from 'react';

import { Upload, Form, Button } from 'antd';
import ImageUploader from '../components/ImageUploader';
import { PlusOutlined } from '@ant-design/icons';


export default function Home() {

    return (
        <>
            <Form onFinish={(values) => {
                console.log({ values })
            }}>
                <Form.Item
                    label='profile'
                    name='profilePicture'
                    rules={[
                        {
                            required: true,
                            message: 'Please uploade image'
                        }
                    ]}
                >
                    <Upload
                        name='profile'
                        listType="picture-card"
                        beforeUpload={(file) => {
                            return new Promise((resolve, reject) => {
                                if (file.size > 2) {
                                    reject('File size excceed')
                                } else {
                                    resolve('success')
                                }
                            })
                        }}
                        maxCount={1}>
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Button type='primary' htmlType='submit'>Submit</Button>
            </Form>
            <ImageUploader></ImageUploader>
        </>
    )
}