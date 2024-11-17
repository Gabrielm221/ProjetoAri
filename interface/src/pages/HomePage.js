import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/criarusuario');
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Ari - Agenda de Remédios para Idosos</h1>
        <p>Organize e controle a medicação dos seus entes queridos de forma simples e eficiente.</p>
      </div>

      <div className="home-buttons">
        <button className="btn-login" onClick={handleLogin}>
          Fazer Login
        </button>
        <button className="btn-register" onClick={handleRegister}>
          Criar Conta
        </button>
      </div>
    </div>
  );
};

export default HomePage;
