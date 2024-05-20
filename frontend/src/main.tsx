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
import ModifyUser from './routes/User';

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/br_code",
    element: <BrCode />,
  },
  {
    path: "/pipeline_info",
    element: <PipelineInfo />,
  },
  {
    path: "/user",
    element: <ModifyUser />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
