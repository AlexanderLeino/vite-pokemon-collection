import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth } from './context/AuthCtx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth>
  </React.StrictMode>,
)
