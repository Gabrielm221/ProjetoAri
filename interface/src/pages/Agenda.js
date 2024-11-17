import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Agenda.css';

const Agenda = () => {
  const navigate = useNavigate();
  const [prescricoes, setPrescricoes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  
  useEffect(() => {
    const fetchPrescricoes = async () => {
      try {
        const response = await api.get('/prescricao/agenda');//Rota que busca as prescrições do usuário
        setPrescricoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar prescrições', error);
      }
    };

    fetchPrescricoes();
  }, []);

  //Função para excluir a prescrição
  const handleDelete = async (idPrescricao) => {
    try {
      await api.delete(`/prescricao/${idPrescricao}`); //Chama a API para deletar a prescrição
      setPrescricoes(prescricoes.filter(prescricao => prescricao.id !== idPrescricao));//Atualiza o estado local
      alert('Prescrição excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir prescrição', error);
      alert('Erro ao excluir a prescrição.');
    }
  };

  return (
    <div className="agenda">
      <h2 className="title">Agenda de Medicamentos</h2>
      <div className="agenda-container">
        {prescricoes.length === 0 ? (
          <p className="empty-message">Nenhuma prescrição encontrada para exibir.</p>
        ) : (
          prescricoes.map((prescricao) => (
            <div key={prescricao.id} className="card">
              <h3>{prescricao.Remedio.nome}</h3>
              <p><strong>Função:</strong> {prescricao.Remedio.funcao}</p>
              <p><strong>Dosagem:</strong> {prescricao.Remedio.dosagem} mg</p>
              <p><strong>Observação:</strong> {prescricao.observacao}</p>
              <p><strong>Data Início:</strong> {new Date(prescricao.dt_inicio).toLocaleDateString()}</p>
              <p><strong>Data Fim:</strong> {new Date(prescricao.dt_fim).toLocaleDateString()}</p>

              {/*Botão para excluir a prescrição */}
              <button 
                className="delete-button" 
                onClick={() => handleDelete(prescricao.id)}>
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Agenda;
