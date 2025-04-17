import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
//引入汉化包 时间选择器显示中文
import locale from 'antd/es/date-picker/locale/zh_CN'

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { delArticleAPI, getArtcleAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const navigate = useNavigate()
    //频道数据
    const { channelList } = useChannel()
    //定义枚举
    const status = {
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="green">审核通过</Tag>
    }
    // 准备列数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            //data是后端返回的状态status 根据它做条件渲染
            //data === 1 => 待审核
            //data === 2 => 审核通过
            // render: data => data === 1 ? <Tag color="warning">待审核</Tag> : <Tag color="green">审核通过</Tag>
            render: data => status[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
                        <Popconfirm
                            title="删除文章"
                            description="确认删除该条文章吗？"
                            onConfirm={() => delConfirm(data)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    //筛选数据功能
    //1 准备参数
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    })
    //获取文章列表
    const [list, setList] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getList() {

            const res = await getArtcleAPI(reqData)
            setList(res.data.results)
            setCount(res.data.total_count)
        }
        getList()
    }, [reqData])


    //2 获取筛选的数据
    const onFinish = (formValue) => {
        console.log(formValue)
        //3 表单收集到的数据放到参数中(不可变的方式)
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            status: formValue.status,
            begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date[1].format('YYYY-MM-DD')
        })
        //4 重新拉取文章列表 + 渲染table 但是和初始化界面的时候重复了
        //由reqData依赖发生变化，会重复执行副作用函数useEffect

    }

    //分页
    const onPageChange = (page) => {
        // console.log(page)
        //修改useEffect中的依赖项  引发数据的重新获取和修改
        setReqData({
            ...reqData,
            page
        })
    }

    //删除
    const delConfirm = async (data) => {
        // console.log(data)
        await delArticleAPI(data.id)
        //虽然没有改，但是React发现现在的对象和之前的不一样，所以会引发渲染 调用接口 请求
        setReqData({
            ...reqData
        })
    }

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={onFinish}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            // defaultValue="lucy"
                            style={{ width: 120 }}
                        >
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}

                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* 准备表格区域 */}
            <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={list} pagination={{
                    total: count,
                    pageSize: reqData.per_page,
                    onChange: onPageChange
                }
                } />
            </Card>
        </div>
    )
}

export default Article