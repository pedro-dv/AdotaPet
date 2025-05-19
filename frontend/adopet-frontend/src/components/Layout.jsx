import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import GlobalStyles from '../styles/GlobalStyles';

const Layout = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <main style={{ padding: '20px' }}>
      <Outlet />
    </main>
  </>
);

export default Layout;
