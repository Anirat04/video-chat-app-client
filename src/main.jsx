import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './MainLayout/MainLayout.jsx';
import { ScoketProvider } from './providers/Socket.jsx';
import Room from './MainLayout/Pages/Room/Room.jsx';
import { PeerProvider } from './providers/Peer.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
  },
  {
    path: "/room/:roomId",
    element: <Room />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ScoketProvider>
      <PeerProvider>
        <RouterProvider router={router} />
      </PeerProvider>
    </ScoketProvider>
  </React.StrictMode>,
)
