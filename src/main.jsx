import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './MainLayout/MainLayout.jsx';
import { ScoketProvider } from './providers/Socket.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    // children: [
    //   {
    //     path: "/room/:roomId",
    //     element: <h1>Hii</h1>
    //   }
    // ]
  },
  {
    path: "/room/:roomId",
    element: <h1>Hii</h1>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ScoketProvider>
      <RouterProvider router={router} />
    </ScoketProvider>
  </React.StrictMode>,
)
