import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

const ListPrescricoes = () => {

  const navigate = useNavigate();
  const [prescricoes, setPrescricoes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redireciona para a página de login se o token não estiver presente
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPrescricoes = async () => {
      try {
        const response = await api.get('/prescricao');
        setPrescricoes(response.data);
      } catch (error) {
        console.error('Erro ao listar prescrições', error);
      }
    };
    
    fetchPrescricoes();
  }, []);

  return (
    <div>
      <h2>Lista de Prescrições</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Paciente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {prescricoes.map((prescricao) => (
            <tr key={prescricao.id}>
              <td>{prescricao.id}</td>
              <td>{prescricao.data}</td>
              <td>{prescricao.paciente}</td>
              <td>
                <button onClick={() => window.location.href = `/prescricao/atualizar/${prescricao.id}`}>Editar</button>
                <button onClick={() => console.log('Excluir', prescricao.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPrescricoes;