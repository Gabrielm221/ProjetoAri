import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const ListEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/agenda', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await api.delete(`/agenda/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvents(events.filter((event) => event.id !== eventId)); // Remove o evento da lista
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  return (
    <div>
      <h2>Agenda</h2>
      <Link to="/agenda/create">Adicionar Novo Evento</Link>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <span>{event.title} - {event.date}</span>
            <Link to={`/agenda/update/${event.id}`}>Editar</Link>
            <button onClick={() => handleDelete(event.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListEvents;
