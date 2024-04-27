import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Layout from './pages/Layout.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Share from './pages/Share.jsx'
import PostInfo from './pages/PostInfo.jsx'
import UpdatePost from './pages/UpdatePost.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} path='/' element={<App />} />
        <Route index={false} path='share' element={<Share />} />
        <Route index={false} path='post/:postid' element={<PostInfo />} />
        <Route index={false} path='edit/:postid' element={<UpdatePost />} />
        {/* <Route index={false} path='new' element={<CreateCharacter />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
)
