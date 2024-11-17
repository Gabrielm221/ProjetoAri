import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

const UpdateUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [status, setStatus] = useState(true);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Recebe o ID do usuário via URL

  // Função para buscar os dados do usuário no backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/usuarios/${id}`);
        const userData = response.data;
        setNome(userData.nome);
        setEmail(userData.email);
        setSenha(userData.senha); // Considerando que você não quer expor a senha diretamente, pode ser interessante tratá-la de outra forma
        setDataNascimento(userData.data_nascimento.split('T')[0]); // Ajustando para o formato de data
        setStatus(userData.status);
      } catch (error) {
        setErro('Erro ao buscar os dados do usuário.');
        console.error(error);
      }
    };

    fetchUserData();
  }, [id]);

  // Função para lidar com a atualização do formulário
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validações simples
    if (!nome || !email || !senha || !dataNascimento) {
      setErro('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await api.put(`/usuarios/${id}`, {
        nome,
        email,
        senha,
        data_nascimento: dataNascimento,
        status
      });

      alert('Dados atualizados com sucesso!');
      navigate('/usuarios'); // Redireciona para a lista de usuários ou outra página relevante
    } catch (error) {
      setErro('Erro ao atualizar os dados do usuário.');
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <div className="update-user-container">
      <h2>Atualizar Usuário</h2>
      {erro && <div className="error-message">{erro}</div>}
      <form onSubmit={handleUpdate}>
        <div className="input-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="status">Ativo?</label>
          <input
            type="checkbox"
            id="status"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>

        <button type="submit" className="btn-submit">Atualizar</button>
      </form>
    </div>
  );
};

export default UpdateUsuario;
