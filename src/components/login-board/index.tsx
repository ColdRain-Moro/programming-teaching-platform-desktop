import { Button, Input } from 'antd';
import './index.css';

/**
 * 登录面板
 * 状态提升
 * @param props 
 * @returns 
 */
export default function LoginBoard(props: {
    title: string,
    subtitle: string,
    userId: string,
    password: string,
    onUserIdChange: (userId: string) => void,
    onPasswordChange: (password: string) => void,
    onSubmit: () => void;
}) {
    return (
        <div className='login-board'>
            <h1>{props.title}</h1>
            <p>{props.subtitle}</p>
            <Input size='large' className='inp user' placeholder="学号" value={props.userId} onChange={(e) => props.onUserIdChange(e.target.value)} />
            <Input.Password size='large' className='inp pass' placeholder="密码" value={props.password} onChange={(e) => props.onPasswordChange(e.target.value)} />
            <Button size='large' className='submit-btn' type='primary' onClick={props.onSubmit}>登入</Button>
        </div>
    )
}