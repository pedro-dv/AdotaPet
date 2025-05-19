import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  background: #fff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.05);
  && label {
    font-size: 1rem;
    color: #374151;
    margin-bottom: 0.5rem;
    display: block;
    text-align: center;
  }
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: #1f2937;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.1rem;
  margin-bottom: 1.2rem;
  border: 1px solid #d1d5db;
  border-radius: 0.6rem;
  font-size: 1rem;
  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: #3b82f6;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #2563eb;
  }
`;

const AddPet = () => {
  const [form, setForm] = useState({ name: '', age: '', breed: '', whatsapp: '', image: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in form) data.append(key, form[key]);

    try {
      await api.post('/pets', data);
      toast.success('Pet cadastrado!');
      navigate('/');
    } catch {
      toast.error('Erro ao cadastrar pet');
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>Doar um Pet</Title>
        <Input name="name" placeholder="Nome do pet" onChange={handleChange} required />
        <Input name="age" placeholder="Idade" onChange={handleChange} required />
        <Input name="breed" placeholder="Raça" onChange={handleChange} required />
        <Input name="whatsapp" placeholder="WhatsApp para contato" onChange={handleChange} required />
        <label htmlFor="">Foto</label>
        <Input name="image" type="file" accept="image/*" onChange={handleChange} required />
        
        
        <Button type="submit">Enviar</Button>
      </form>
    </Container>
  );
};

export default AddPet;
