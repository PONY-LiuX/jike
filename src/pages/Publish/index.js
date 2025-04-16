import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { createArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
    // //获取频道列表 下面的已经封装
    // const [channelList, setChannelList] = useState([])
    // useEffect(() => {
    //     //1 封装函数 函数体内调用接口 声明在内部是因为只想触发一次？
    //     const getChannelList = async () => {
    //         const res = await getChannelAPI()
    //         setChannelList(res.data.channels)
    //     }
    //     //2 存入数据
    //     getChannelList()

    // }, [])

    const { channelList } = useChannel()

    //提交表单
    const onFinish = (formValue) => {
        //校验封面类型imageType和图片列表适量是否对应，相等的时候才提交
        if (imageList.length !== imageType) return message.warning('封面数量不匹配！')
        // console.log(formValue);
        const { title, content, channel_id } = formValue
        // 1. 按照接口需要的格式处理表单收集到的数据
        const poseData = {
            title,
            content,
            cover: {
                type: imageType, //封面模式
                images: imageList.map(item => item.response.data.url)  //图片列表
            },
            channel_id
        }
        //调用接口提交
        createArticleAPI(poseData)
    }

    //上传图片回调
    const [imageList, setImageList] = useState([])
    const onChange = (value) => {
        // console.log(value);
        setImageList(value.fileList)
    }

    //切换图片封面类型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        // console.log(e.target.value);
        setImageType(e.target.value)
        setImageList([])
    }

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '发布文章' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {/* value:用户选择之后会自动收集齐起来作为接口的提交字段 */}
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* 
                        listType：决定选择框的外观样式
                        showUploadList：控制显示上传列表
                        整个上传过程会不断执行onChange
                         */}
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            onChange={onChange}
                            maxCount={imageType}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish