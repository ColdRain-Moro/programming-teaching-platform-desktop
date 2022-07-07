import { EditTwoTone, EyeTwoTone, FundTwoTone } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd'
import { useEffect, useState } from 'react';
import Code from '../../components/code';
import './index.css'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export default function Home() {

    const [items, setItems] = useState<MenuItem[]>([
        getItem('日常练习', 'partice', <EditTwoTone />, [
            getItem('Option 1', '1'),
            getItem('Option 2', '2'),
            getItem('Option 3', '3'),
            getItem('Option 4', '4'),
          ]),
          getItem('查看考试', 'exam_info', <EyeTwoTone />),
          getItem('练习统计', 'statistics', <FundTwoTone />),
    ])

    useEffect(() => {
        console.log("Test")
    }, [])

    return (
        <div className='main-container'>
            <Menu mode="inline" items={items} />
        </div>
    )
}