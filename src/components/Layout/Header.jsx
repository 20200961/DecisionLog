import React, { useEffect } from 'react'
import { HeaderContainer, Logo, Nav, NavLink, NavLinks } from './Layout.styled'
import { ROUTES } from '../../routes/routePaths'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  })
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  }
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo to={ROUTES.HOME}>Decision Log</Logo>
        <NavLinks>
          <NavLink to={ROUTES.HOME} className={isActive(ROUTES.HOME)}>홈</NavLink>
          <NavLink to={ROUTES.LOGIN} className={isActive(ROUTES.LOGIN)}>로그인</NavLink>
          <NavLink to={ROUTES.MYPAGE} className={isActive(ROUTES.MYPAGE)}>마이페이지</NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  )
}

export default Header