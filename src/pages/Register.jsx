import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ user: '', pass: '' });

  const submit = (e) => {
    e.preventDefault();
    login({ id: Date.now(), username: form.user, role: 'customer', accessToken: 'fake' });
    navigate('/profile');
  };

  return (
    <div className="form-card">
      <h2>Регистрация</h2>
      <form onSubmit={submit} style={{ marginTop: 24 }}>
        <div className="form-group"><label>Логин</label><input required onChange={e => setForm({...form, user: e.target.value})} /></div>
        <div className="form-group"><label>Пароль</label><input type="password" required onChange={e => setForm({...form, pass: e.target.value})} /></div>
        <button className="btn block">Создать аккаунт</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 16 }}><Link to="/login">Уже есть аккаунт</Link></p>
    </div>
  );
}