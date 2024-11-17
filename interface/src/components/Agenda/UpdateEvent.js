import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

const UpdateEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/agenda/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTitle(response.data.title);
        setDate(response.data.date);
      } catch (error) {
        console.error('Erro ao buscar evento:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = { title, date };
      await api.put(`/agenda/${id}`, updatedEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Evento atualizado com sucesso!');
      navigate('/agenda'); // Redireciona para a lista de eventos
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      alert('Houve um erro ao atualizar o evento.');
    }
  };

  return (
    <div>
      <h2>Editar Evento</h2>
      <form onSubmit={handleUpdateEvent}>
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
        <button type="submit">Atualizar Evento</button>
      </form>
    </div>
  );
};

export default UpdateEvent;
