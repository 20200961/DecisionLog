import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import DecisionListPage from '../pages/DecisionListPage'
import DecisionDetailPage from '../pages/DecisionDetailPage'
import MyPage from '../pages/MyPage'
import Login from '../pages/Login'
import { ROUTES } from './routePaths'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<DecisionListPage />} />
          <Route path="decisions/:id" element={<DecisionDetailPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes