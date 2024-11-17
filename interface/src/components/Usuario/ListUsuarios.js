import React, { useEffect, useState } from 'react';
import api from '../../api';

const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao listar usuários:', error);
      }
    };
    
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} ({usuario.email}) - {usuario.status ? 'Ativo' : 'Inativo'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsuarios;