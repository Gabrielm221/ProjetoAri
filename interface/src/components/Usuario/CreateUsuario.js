import React, { useState } from 'react';
import api from '../../api';
import './CriarUsuario.css'; // Certifique-se de importar o CSS corretamente

const CreateUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [status, setStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios', { nome, email, senha, data_nascimento: dataNascimento });
      alert('Usuário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div className="login-container"> {}
      <h2>Criar Usuário</h2>
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input  
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          required
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)} // Mudança para capturar booleano
          />
          <label>Status Ativo</label>
        </div>
        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  );
};

export default CreateUsuario;
