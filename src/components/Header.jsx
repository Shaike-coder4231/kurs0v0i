import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header({ onCartOpen }) {
  const { count } = useCart();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/catalog?q=${encodeURIComponent(query.trim())}` : '/catalog');
    setMenuOpen(false);
  };

  return (
    <header id="header">
      <div className="header-inner">
        <button className="icon-btn" style={{ display: 'none' }} onClick={() => setMenuOpen((v) => !v)}>☰</button>
        <Link to="/" className="logo">💾 Soft<span>Store</span></Link>
        <form className="search-box" onSubmit={submit}>
          <input type="search" placeholder="Поиск лицензий и ПО..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">🔍</button>
        </form>
        <div className="icon-btns">
          <Link className="icon-btn" to="/favorites" title="Избранное">♥</Link>
          <button className="icon-btn" onClick={onCartOpen} title="Корзина">
            🛒{count ? <span className="badge">{count}</span> : null}
          </button>
          <Link className="icon-btn" to={user ? '/profile' : '/login'} title="Кабинет">
            {user ? '👤' : '🔑'}
          </Link>
        </div>
      </div>
      <nav className="nav-cats" onClick={() => setMenuOpen(false)}>
        <Link to="/catalog">Все продукты</Link>
        <Link to="/catalog?category=os">Операционные системы</Link>
        <Link to="/catalog?category=office">Офисные пакеты</Link>
        <Link to="/catalog?category=antivirus">Антивирусы</Link>
        <Link to="/catalog?category=graphics">Графика</Link>
        <Link to="/catalog?category=dev">Разработка</Link>
        <Link to="/catalog?category=cloud">Облачные сервисы</Link>
        <Link to="/catalog?category=database">Базы данных</Link>
        <Link to="/admin/products">⚙️ Админ</Link>
        <Link to="/help">📖 Справка</Link>
      </nav>
    </header>
  );
}