import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const newEvent = { title, date };
      await api.post('/agenda', newEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Evento criado com sucesso!');
      navigate('/agenda'); // Redireciona para a lista de eventos
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      alert('Houve um erro ao criar o evento.');
    }
  };

  return (
    <div>
      <h2>Criar Novo Evento</h2>
      <form onSubmit={handleCreateEvent}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do evento"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Criar Evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;
