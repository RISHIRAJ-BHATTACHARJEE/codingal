import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PassengersPage from './pages/PostsPage.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div className="h-screen" />} />
          <Route path="posts" element={<PassengersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
