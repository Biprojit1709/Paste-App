import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import HomePage from './Components/HomePage'
import Paste from './Components/Paste'
import ViewPaste from './Components/ViewPaste'
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar/>
        <HomePage/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>

    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>

    }
  ]
)


function App() {
  return (
    <div>
       <Toaster
        toastOptions={{
          duration: 1500,
          }}
      />
      <RouterProvider  router={router} />

    </div>
  )
}

export default App
