import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import './Prescricao.css';  // Novo arquivo de estilos

const CreatePrescricao = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [observacao, setObservacao] = useState('');
  const [frequenciaValor, setFrequenciaValor] = useState('');
  const [frequenciaUnidade, setFrequenciaUnidade] = useState('');
  const [dtInicio, setDtInicio] = useState('');
  const [dtFim, setDtFim] = useState('');
  const [idRemedio, setIdRemedio] = useState(id || 0);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      const id_usuario = parseInt(decodedToken.id, 10);
      const idRemedioInt = parseInt(idRemedio, 10);
      const frequenciaValorInt = parseInt(frequenciaValor, 10);
      const statusBool = status === true;

      const response = await api.post('/prescricao', {
        observacao,
        frequencia_valor: frequenciaValorInt,
        frequencia_unidade: frequenciaUnidade,
        dt_inicio: dtInicio,
        dt_fim: dtFim,
        id_remedio: idRemedioInt,
        status: statusBool,
        id_usuario,
      });

      const lastPrescricaoResponse = await api.get('/prescricao/lastpresc')
      const prescricaoint = parseInt(lastPrescricaoResponse.data)

      await api.post('/historico', {
        id_prescricao: prescricaoint,
        status: statusBool,
      });

      alert('Prescrição e histórico criados com sucesso!');
      navigate('/dashboard');
 
    } catch (error) {
      console.error('Erro ao criar prescrição', error);
      if (error.response) {
        setMensagem(error.response.data.message || 'Erro ao criar prescrição na API.');
      } else {
        setMensagem('Erro desconhecido ao criar prescrição.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="prescricao-container">
      <h2>Criar Prescrição</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <form onSubmit={handleSubmit} className="prescricao-form">
        <div className="input-group">
          <label>Observação</label>
          <input
            type="text"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Frequência Valor</label>
          <input
            type="number"
            value={frequenciaValor}
            onChange={(e) => setFrequenciaValor(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Frequência Unidade</label>
          <input
            type="text"
            value={frequenciaUnidade}
            onChange={(e) => setFrequenciaUnidade(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Data de Início</label>
          <input
            type="date"
            value={dtInicio}
            onChange={(e) => setDtInicio(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Data de Fim</label>
          <input
            type="date"
            value={dtFim}
            onChange={(e) => setDtFim(e.target.value)}
            required
          />
        </div>

        {/* Campo oculto para o ID do remédio */}
        <input
          type="hidden"
          value={idRemedio}
          onChange={(e) => setIdRemedio(e.target.value)}
        />

        <div className="input-group">
          <label>Status Ativo</label>
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Prescrição'}
        </button>
      </form>
    </div>
  );
};

export default CreatePrescricao;
