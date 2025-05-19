import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import GlobalStyles from '../styles/GlobalStyles';
import Footer from './Footer';
import styled from 'styled-components';

const MainContainer = styled.main`
  padding-bottom: 80px; // altura do footer + margem de segurança
`;

const Layout = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <MainContainer>
      <Outlet />
    </MainContainer>
    <Footer />
  </>
);

export default Layout;
