import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { UserProvider } from './contextAPI/Headers.jsx'
import { ProSidebarProvider } from 'react-pro-sidebar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
   <UserProvider>
   <ProSidebarProvider>

      <App />
   </ProSidebarProvider>
   </UserProvider>
   </BrowserRouter>
  </React.StrictMode>,
)
