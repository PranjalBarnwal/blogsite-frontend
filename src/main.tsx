import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Signup from './pages/Signup.tsx'
import Signin from './pages/Signin.tsx'
import Blogs from './pages/Blogs.tsx'
import Profile from './pages/Profile.tsx'
import './index.css'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ForgotPass from './pages/ForgotPass.tsx'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "profile/:profileId",
        element: <Profile />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "forgotPass",
        element: <ForgotPass />,
      },
    ]
    // errorElement: <ErrorPage />,
  },
 
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
