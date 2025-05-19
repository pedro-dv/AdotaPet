import styled from "styled-components";

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #1f2937;
  color: #fff;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
`;


const FooterText = styled.p`
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© {new Date().getFullYear()} Adopet. Todos os direitos reservados.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
