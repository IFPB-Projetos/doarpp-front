import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './screens/Menu/Menu'
import { AuthProvider } from './contexts/auth'


function App() {
  return (
    <>
      <AuthProvider>
        <Menu />
        <Outlet />
      </AuthProvider>
    </>
  )
}

export default App
