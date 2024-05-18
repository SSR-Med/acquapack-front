// Dependencies
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// Routes
import Login from './routes/login/Login';
import BrCode from './routes/pipeline/BrCode';
import PipelineInfo from './routes/pipeline/PipelineInfo';

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/brcode",
    element: <BrCode />,
  },
  {
    path: "/pipelineinfo",
    element: <PipelineInfo />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
