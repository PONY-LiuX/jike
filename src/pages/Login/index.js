import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { fetchLogin } from '@/store/modules/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (value) => {
        console.log(value);
        //触发异步action fetchLogin
        await dispatch(fetchLogin(value))
        //登陆完毕跳转
        navigate('/')
        //提示用户
        message.success('登陆成功')
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger='onBlur'>
                    <Form.Item
                        name='mobile'
                        // label='手机号'
                        //多条串行校验逻辑，先触发第一条，再触发第二条
                        rules={[
                            {
                                required: true,
                                message: '请输入您的手机号'
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号格式'
                            }
                        ]}>
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        name='code'
                        // label='验证码'
                        rules={[
                            { required: true, message: '请输入验证码' }
                        ]}>
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login