import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { SpeedInsights } from "@vercel/speed-insights/react"

// Tambahkan tautan CDN Font Awesome di sini
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
fontAwesomeLink.rel = 'stylesheet';
document.head.appendChild(fontAwesomeLink);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SpeedInsights/>
    <App />
  </React.StrictMode>,
)
