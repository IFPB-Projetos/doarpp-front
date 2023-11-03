
import './App.css'
import {RouterProvider} from 'react-router-dom';
import { router } from './routes/router';
import Menu from './screens/Menu/Menu';

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
