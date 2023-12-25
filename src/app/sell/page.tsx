'use client'
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Select,
    Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import imgToUrl from '../services/cloudinary.service';



const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Sell = () => {


    const handleFinish = async (values: any) => {
        let image_url = ''
        console.log(values)
        const { img, ...body } = values
        if (img.file) {
            image_url = await imgToUrl(img.file)
        }
        body.image_url = image_url
        console.log('>>> checkbody: ', body)
    }
    return (
        <>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={handleFinish}
            >
                <Form.Item required={true} label="Số tướng" name='heroes_num'>
                    <Input />
                </Form.Item>
                <Form.Item required={true} label="Số trang phục" name='costumes_num'>
                    <Input />
                </Form.Item>
                <Form.Item required={true} label="Rank" name='rank'>
                    <Select>
                        <Select.Option value="thachdau">Thách đấu</Select.Option>
                        <Select.Option value="chientuong">Chiến tướng</Select.Option>
                        <Select.Option value="caothu">Cao thủ</Select.Option>
                        <Select.Option value="tinhanh">Tinh Anh</Select.Option>
                        <Select.Option value="kimcuong">Kim Cương</Select.Option>
                        <Select.Option value="bachkim">Bạch kim</Select.Option>
                        <Select.Option value="vang">{'< '}Bạch kim</Select.Option>
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
                    <Input />
                </Form.Item>
                <Button htmlType="submit">Đăng ký bán tài khoản</Button>
            </Form>
        </>
    )
}

export default Sell