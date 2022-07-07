import './App.css'
import 'antd/dist/antd.min.css'
import Login from './page/login'
import { Route, Routes } from 'react-router-dom'
import Home from './page/home'

function App() {

  return (
    <Routes>
      <Route path='/'>
        <Route index element={ <Login /> }></Route>
        <Route path='home' element={ <Home /> }></Route>
      </Route>
    </Routes>
  )
}

export default App
