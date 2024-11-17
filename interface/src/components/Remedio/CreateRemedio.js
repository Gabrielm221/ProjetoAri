import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import './Remedio.css';

const CreateRemedio = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [dosagemS, setDosagem] = useState(0.0);
  const [status, setStatus] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  //Função para buscar os medicamentos já cadastrados
  const fetchMedicamentos = async () => {
    try {
      const response = await api.get('/remedios');
      setMedicamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar medicamentos:", error);
    }
  };

  //Carregar os medicamentos quando o componente é montado
  useEffect(() => {
    fetchMedicamentos();
  }, []);

  //Função para criar um novo medicamento
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dosagem = parseFloat(dosagemS);
      await api.post('/remedios', { nome, funcao, dosagem, status });
      setMensagem('Remédio criado com sucesso!');
      fetchMedicamentos(); // Atualiza a lista de medicamentos após criar um novo
    } catch (error) {
      console.error('Erro ao criar remédio:', error.response?.data || error.message);
      setMensagem('Erro ao criar remédio. Verifique os dados ou tente novamente.');
    }
  };

  // Função para navegar para a página de prescrição
  const handleClickPrescricao = (medId) => {
    navigate(`/criarprescricao/${medId}`);
  };

  return (
    <div className="create-remedio-container">
      <h2>Criar Remédio</h2>
      {mensagem && <p className="message">{mensagem}</p>}
      
      {/* Formulário para criar remédio */}
      <form onSubmit={handleSubmit} className="remedio-form">
        <div className="input-group">
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Função</label>
          <input
            type="text"
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Dosagem (mg)</label>
          <input
            type="text"
            value={dosagemS}
            onChange={(e) => setDosagem(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Status</label>
          <input
            type="checkbox"
            checked={status}
            onChange={() => setStatus(!status)}
          />
        </div>
        <button type="submit" className="submit-btn">Criar</button>
      </form>

      {/*Exibindo os medicamentos como cards */}
      <div className="cards-container">
        {medicamentos.length === 0 ? (
          <p className="no-medicamentos">Nenhum medicamento cadastrado.</p>
        ) : (
          medicamentos.map((med) => (
            <div 
              key={med.id} 
              className="card"
              onClick={() => handleClickPrescricao(med.id)}//Navegar para prescrição
            >
              <h4>{med.nome}</h4>
              <p><strong>Função:</strong> {med.funcao}</p>
              <p><strong>Dosagem:</strong> {med.dosagem}mg</p>
              <p><strong>Status:</strong> {med.status ? 'Ativo' : 'Inativo'}</p>
              {/* Texto que aparecerá ao passar o mouse */}
              <div className="hover-text">Adicionar à Agenda</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreateRemedio;
