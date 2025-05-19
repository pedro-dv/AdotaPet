import { useEffect, useState } from 'react';
import api from '../services/api';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  padding: 2rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
`;

const PetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;
const ImgPet = styled.img`
    width: 100%;
    height: 220px;
    object-fit: cover;
    transition: filter 0.3s ease;
    filter: ${(props) => (props.adopted ? 'grayscale(100%) opacity(0.6)' : 'none')};
`;

const PetCard = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    transition: filter 0.3s ease;
    filter: ${(props) => (props.$adopted ? 'grayscale(100%) opacity(0.6)' : 'none')};
  }

  .card-content {
    padding: 1.25rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    color: #111827;
  }

  p {
    margin: 0.25rem 0;
    color: #4b5563;
    font-size: 0.95rem;
  }

  .adopted {
    margin-top: 0.5rem;
    color: #10b981;
    font-weight: 600;
  }
`;


const Home = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get('/pets').then((res) => setPets(res.data));
  }, []);

  return (
    <PageContainer>
      <Title>🐾 Pets para Adoção</Title>
      <PetsGrid>
        {pets.map((pet) => (
          <PetCard key={pet.id} $adopted={pet.adopted}>
            <img src={`http://localhost:5000/uploads/${pet.image}`} alt={pet.name} />
            <div className="card-content">
              <h3>{pet.name} ({pet.breed})</h3>
              <p>Idade: {pet.age}</p>
              {pet.adopted && <p className="adopted">Adotado</p>}
              <p>WhatsApp: {pet.whatsapp}</p>
            </div>
          </PetCard>
        ))}
      </PetsGrid>
    </PageContainer>
  );
};

export default Home;
