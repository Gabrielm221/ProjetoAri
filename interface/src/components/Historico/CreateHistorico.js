import React, { useState } from 'react';
import api from '../../api';

const CreateHistorico = () => {

  const [prescricaoID, setPrescricao] = useState('');
  const [status, setStatus] = useState(true); //status como true por padrão
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    console.log('Prescrição ID:', prescricaoID);
    console.log('Status:', status);
  
    try {
      const id_prescricao = parseInt(prescricaoID);  
      console.log('Prescrição após parseInt:', id_prescricao);
      
      const response = await api.post('/historico', { id_prescricao, status });
      
      setMensagem('Histórico criado com sucesso!');
      setPrescricao(''); 
    } catch (error) {
      console.error('Erro ao criar histórico:', error);
      setMensagem('Erro ao criar histórico NAO ENTROU NA API.');
    }
  };

  return (
    <div>
      <h2>Criar Histórico</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="prescricaoID">ID da Prescrição</label>
          <input
            id="prescricaoID"
            type="text"
            value={prescricaoID}
            onChange={(e) => setPrescricao(e.target.value)}
            required
            placeholder="Digite o ID da Prescrição"
            title="ID da Prescrição"
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value === 'true')}
            title="Selecione o status"
          >
            <option value={true}>Ativo</option>
            <option value={false}>Inativo</option>
          </select>
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CreateHistorico;
