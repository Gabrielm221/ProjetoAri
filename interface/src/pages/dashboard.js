import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';  // Supondo que você tenha configurado o axios para a API
import logoutUser from '../auth/Logout';
import './Dashboard.css'

const DashBoard = () => {
  const navigate = useNavigate();
  const [prescricoes, setPrescricoes] = useState([]);
  const [historicos, setHistoricos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redireciona para a página de login se o token não estiver presente
      navigate('/login');
    }
  }, [navigate]);

  // Função para buscar os dados de medicamentos, prescrições e históricos
  const fetchData = async () => {
    try {
      const prescricaoRes = await api.get('/prescricao');
      setPrescricoes(prescricaoRes.data)
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    fetchData();  // Carregar os dados assim que o componente for montado
  }, []);

  const handleCreateMedico = () => {
    navigate("/criarremedios");
  };

  const handleCreatePrescricao = () => {
    navigate("/criarprescricao");
  };

  const handleCreateHistorico = () => {
    navigate("/criarhistorico");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Ari - Agenda de Remédios para Idosos</h1>
        <button onClick={() => navigate('/logout')} className="btn-logout">
          Logout
        </button> 
      </div>
      <div className="dashboard-main">
        <div className="dashboard-card">
          <h2>Medicamentos</h2>
          <button className="btn-create" onClick={handleCreateMedico}>Adicionar Medicamento à Agenda</button>
        </div>

        <div className="dashboard-card">
          <h2>Histórico</h2>
          <button onClick={() => navigate('/listarhistorico')} className="btn-historico">
            Listar Histórico de Uso
          </button>
        </div>

        <div className="dashboard-card">
          <h2>Agenda</h2>
          <button onClick={() => navigate('/agenda')} className="btn-agendamentos">
            Ir para seus Agendamentos
          </button>
        </div>
      </div>  
    </div>
  );
};

export default DashBoard;
