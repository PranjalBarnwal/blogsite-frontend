import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Signup from "./pages/Signup.tsx";
import Signin from "./pages/Signin.tsx";
import CompleteProfile from "./pages/CompleteProfile.tsx";
import Blogs from "./pages/Blogs.tsx";
import ViewBlog from "./pages/ViewBlog.tsx";
import Profile from "./pages/Profile.tsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ForgotPass from "./pages/ForgotPass.tsx";
import store from "./store.ts";
import { Provider } from "react-redux";
import ResetPassword from "./pages/ResetPassword.tsx";
import CreateBlog from "./pages/CreateBlog.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "completeProfile",
        element: <CompleteProfile />,
      },
      {
        path: "profile/:profileId",
        element: <Profile />,
      },
      {
        path: "post/:postId",
        element: <ViewBlog />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPass />,
      },
      {
        path: "resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "createBlog",
        element: <CreateBlog />,
      },
    ],
    // errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
