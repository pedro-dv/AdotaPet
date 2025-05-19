import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #1f2937; /* tom escuro moderno (tailwind slate-800) */
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: #f9fafb;
    margin: 0 1rem;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #3b82f6; /* azul vibrante */
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;

    a {
      margin: 0.25rem 0;
    }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Nav>
      <div>
        <Link to="/">Adopet</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-pet">Doar Pet</Link>
      </div>
      <div>
        {token ? (
          <button onClick={logout}>Sair</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;
