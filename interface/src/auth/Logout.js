import api from '../api'; 
import { useEffect } from 'react';
import './Logout.css';

const Logout = () => {
  useEffect(() => {
    const logoutUser = async () => {
      try {
        await api.post('/usuarios/logout', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });

        //Exclui o token armazenado no localStorage
        localStorage.removeItem('token');

  
        setTimeout(() => {
          window.location.href = '/login';  
        }, 1500); 

      } catch (error) {
      }
    };

    logoutUser();
  }, []); 

  return (
    <div className="logout-container">
      <h2>Deslogando...</h2>
      <p>Aguarde enquanto você está sendo deslogado. Você será redirecionado para a página de login em breve.</p>
    </div>
  );
};

export default Logout;
