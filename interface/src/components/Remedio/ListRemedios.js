// src/components/Remedio/ListRemedios.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

const ListRemedios = () => {
  const navigate = useNavigate();
  const [remedios, setRemedios] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRemedios = async () => {
      try {
        const response = await api.get('/remedios');
        setRemedios(response.data);
      } catch (error) {
        console.error('Erro ao listar remédios', error);
      }
    };

    fetchRemedios();
  }, []);

  return (
    <div>
      <h2>Lista de Remédios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {remedios.map((remedio) => (
            <tr key={remedio.id}>
              <td>{remedio.id}</td>
              <td>{remedio.nome}</td>
              <td>{remedio.funcao}</td>
              <td>
                <button onClick={() => window.location.href = `/remedios/atualizar/${remedio.id}`}>Editar</button>
                <button onClick={() => console.log('Excluir', remedio.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRemedios;
