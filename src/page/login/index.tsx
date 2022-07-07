import { notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';
import LoginBoard from '../../components/login-board';
import './index.css';

export default function Login() {

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div className='main-container'>
      <div className='wallpaper'>
        <LoginBoard title={'C++程序设计'}
          subtitle={'程序设计自主教学与学习平台'}
          userId={userId}
          password={password}
          onUserIdChange={(userId: string) => setUserId(userId)}
          onPasswordChange={(password: string) => setPassword(password)}
          onSubmit={() => { 
            login(userId, password, () => {
              notification.success({
                message: '登录成功',
                placement: 'top'
              });
              setTimeout(() => {
                navigate('/home');
              }, 2000)
            }, (e) => {
              notification.error({
                message: '登录失败',
                description: e,
                placement: 'top'
              });
            })
          }} />
      </div>
    </div>
  )
}