import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #222;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const PetList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
  gap: 1.8rem;
`;

const PetCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 18px rgba(0,0,0,0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
`;

const PetImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
`;

const PetName = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const PetWhats = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const AdoptButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#6b7280' : '#2563eb')};
  color: white;
  border: none;
  padding: 0.65rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-weight: 600;
  width: 100%;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#6b7280' : '#1e40af')};
  }
`;

const Dashboard = () => {
  const [pets, setPets] = useState([]);

  const fetchMyPets = async () => {
    try {
      const { data } = await api.get('/pets');
      const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
      const userPets = data.filter(p => p.userId === userId);
      setPets(userPets);
    } catch (error) {
      toast.error('Erro ao buscar pets');
    }
  };

  const markAsAdopted = async (id) => {
    try {
      await api.patch(`/pets/${id}/adopt`);
      toast.success('Pet marcado como adotado');
      fetchMyPets();
    } catch {
      toast.error('Erro ao marcar pet');
    }
  };

  useEffect(() => {
    fetchMyPets();
  }, []);

  return (
    <Container>
      <Title>Meus Pets</Title>
      <PetList>
        {pets.map((pet) => (
          <PetCard key={pet.id}>
            <PetImage src={`http://localhost:5000/uploads/${pet.image}`} alt={pet.name} />
            <PetName>{pet.name} - {pet.breed}</PetName>
            <PetWhats>{pet.whatsapp}</PetWhats>
            <AdoptButton onClick={() => markAsAdopted(pet.id)} disabled={pet.adopted}>
              {pet.adopted ? 'Adotado' : 'Marcar como adotado'}
            </AdoptButton>
          </PetCard>
        ))}
      </PetList>
    </Container>
  );
};

export default Dashboard;
