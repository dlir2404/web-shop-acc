import {
    Button,
    Checkbox,
    Form,
    InputNumber,
    Select,
    Upload,
    message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import imgToUrl from '../services/cloudinary.service';
import { useMutation } from '@tanstack/react-query';
import sellService from '../services/sell.service';
import { ISell } from '../shared/type/sell.type'
import { useState } from 'react';

const SellForm = () => {
    const [isButtonLoading, setIsButtonLoading] = useState(false)

    const sellMutation = useMutation({
        mutationFn: (values: ISell) => sellService.sell(values),
        onSuccess(data, variables, context) {
            message.success('Đăng ký bán tài khoản thành công')
            setIsButtonLoading(false)
        },
        onError(error, variables, context) {
            console.log(error)
            message.error('Có lỗi')
            setIsButtonLoading(false)
        },
    })


    const handleFinish = async (values: any) => {
        setIsButtonLoading(true)
        let image_url = ''
        console.log(values)
        const { img, ...body } = values
        if (img.file) {
            image_url = await imgToUrl(img.file)
        }
        body.image_url = image_url
        sellMutation.mutate(body)
    }
    return (
        <>
            <div className='bg-gray-100 rounded-2xl py-8 max-w-[800px] mb-8 mx-auto'>
                <div className='text-center text-2xl font-semibold my-8'>
                    <h3>Gửi yêu cầu bán tài khoản</h3>
                </div>
                <div className='w-[600px] mx-auto mb-8'>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: 600 }}
                        onFinish={handleFinish}
                        className='ml-[50px]'
                        labelAlign='left'
                    >
                        <Form.Item required={true} label="Số tướng" name='heroes_num'>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item required={true} label="Số trang phục" name='costumes_num'>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item required={true} label="Rank" name='rank'>
                            <Select>
                                <Select.Option value="Thách đấu">Thách đấu</Select.Option>
                                <Select.Option value="Chiến tướng">Chiến tướng</Select.Option>
                                <Select.Option value="Cao thủ">Cao thủ</Select.Option>
                                <Select.Option value="Tinh Anh">Tinh Anh</Select.Option>
                                <Select.Option value="Kim Cương">Kim Cương</Select.Option>
                                <Select.Option value="Bạch kim">Bạch kim</Select.Option>
                                <Select.Option value="< Bạch kim">{'< '}Bạch kim</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item required={true} label="Full ngọc" name="is_full_gems" valuePropName="checked">
                            <Checkbox>Full ngọc</Checkbox>
                        </Form.Item>
                        <Form.Item
                            label='Ảnh profile'
                            name='img'
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
                        <Form.Item required={true} label="Giá muốn bán" name='price'>
                            <InputNumber className='min-w-[80px]' />
                        </Form.Item>
                        <Button loading={isButtonLoading} className='ml-[155px]' htmlType="submit">Đăng ký bán tài khoản</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default SellForm