import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await api.login({ username, password });
      login(user);
      showToast('Вход выполнен', 'success');
      navigate('/profile');
    } catch { showToast('Ошибка входа', 'error'); }
  };

  return (
    <div className="form-card">
      <h2>Вход</h2>
      <form onSubmit={submit} style={{ marginTop: 24 }}>
        <div className="form-group"><label>Логин</label><input value={username} onChange={(e) => setUsername(e.target.value)} /></div>
        <div className="form-group"><label>Пароль</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        <button className="btn block">Войти</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 16, fontSize: '.85rem' }}>Нет аккаунта? <Link to="/register">Регистрация</Link></p>
    </div>
  );
}