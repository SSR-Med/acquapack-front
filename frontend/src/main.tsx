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
import ModifyRecord from './routes/record/Record';
import { NotFound } from './routes/error/Error';
import ModifyReference from './routes/record/Reference';
import Bug from './routes/bug/Bug';
import Machine from './routes/bug/Machine';
import Alert from './routes/bug/Alert';
import AlertTable from './routes/bug/AlertTable';
import Log from './routes/log/Log';

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
  },
  {
    path: "/record",
    element: <ModifyRecord />,
  },
  {
    path: "/reference",
    element: <ModifyReference />,
  },
  {
    path: "/bug",
    element: <Bug />,
  },
  {
    path: "/machine",
    element: <Machine />,
  },
  {
    path: "/alert",
    element: <Alert />,
  },
  {
    path: "/alert_table",
    element: <AlertTable />,
  },
  {
    path: "/log",
    element: <Log />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
