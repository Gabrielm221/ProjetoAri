import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './historico.css'

const ListHistoricos = () => {
  const navigate = useNavigate();
  const [historicos, setHistoricos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      //Redireciona para a página de login se o token não estiver presente
      navigate('/login');
    }
  }, [navigate]);
  
  useEffect(() => {
    const fetchHistoricos = async () => {
      try {
        const response = await api.get('/historico');
        console.log('Resposta da API:', response.data); //Verifique a estrutura da resposta

        //Garantir que a resposta tenha a chave 'historico' que é um array
        if (Array.isArray(response.data.historico)) {
          setHistoricos(response.data.historico); //Atualizar o estado com o array dentro de 'historico'
        } else {
          console.error('A resposta não contém um array válido de históricos:', response.data);
          setHistoricos([]);//Garantir que historicos seja sempre um array
        }
      } catch (error) {
        console.error('Erro ao listar históricos', error);
      }
    };

    fetchHistoricos();
  }, []);

  return (
    <div className="historico-container">
      <h2 className="historico-title">Lista de Históricos</h2>
      {historicos.length === 0 ? (
        <p className="no-historicos">Nenhum histórico encontrado.</p>//Mensagem caso não haja históricos
      ) : (
        <table className="historico-table">
          <thead>
            <tr>
              <th>ID da Prescrição</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {historicos.map((historico) => (
              <tr key={historico.id}>
                <td>{historico.id_prescricao}</td>
                <td>{new Date(historico.dt_atual).toLocaleDateString()}</td> {/*Formatar data */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListHistoricos;
