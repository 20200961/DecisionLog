import React from 'react'
import { HeaderContainer, Logo, Nav, NavLink, NavLinks } from './Layout.styled'
import { ROUTES } from '../../routes/routePaths'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styled from 'styled-components'

const LogoutButton = styled.button`
    padding: 8px 16px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;

    &:hover {
        background: #cc0000;
        scale: 0.98;
    }
`

const UserInfo = styled.span`
    color: #666;
    font-weight: 600;
    margin-right: 16px;
`

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  }

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate(ROUTES.HOME);
    }
  }
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo to={ROUTES.HOME}>Decision Log</Logo>
        <NavLinks>
          <NavLink to={ROUTES.HOME} className={isActive(ROUTES.HOME)}>홈</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to={ROUTES.MYPAGE} className={isActive(ROUTES.MYPAGE)}>마이페이지</NavLink>
              <UserInfo>유저 : {currentUser?.name}</UserInfo>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          ) : (
            <NavLink to={ROUTES.LOGIN} className={isActive(ROUTES.LOGIN)}>로그인</NavLink>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  )
}

export default Header