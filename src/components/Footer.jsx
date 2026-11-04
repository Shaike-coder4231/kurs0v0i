import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h4>💾 SoftStore</h4>
          <p style={{ fontSize: '.9rem' }}>Цифровые лицензии и ПО с мгновенной выдачей ключей активации. Официальные поставки, техподдержка 24/7.</p>
        </div>
        <div>
          <h4>Каталог</h4>
          <Link to="/catalog">Все продукты</Link>
          <Link to="/catalog?category=os">Операционные системы</Link>
          <Link to="/catalog?category=office">Офисные пакеты</Link>
          <Link to="/catalog?category=antivirus">Антивирусы</Link>
        </div>
        <div>
          <h4>Помощь</h4>
          <Link to="/help">Руководство</Link>
          <Link to="/profile">Мои лицензии</Link>
          <Link to="/help">Активация</Link>
          <Link to="/help">Возврат</Link>
        </div>
        <div>
          <h4>Контакты</h4>
          <a href="tel:+78001234567">☎ 8 800 123-45-67</a>
          <a href="mailto:support@softstore.ru">✉ support@softstore.ru</a>
          <p style={{ marginTop: 10, fontSize: '.85rem' }}>© {new Date().getFullYear()} SoftStore</p>
        </div>
      </div>
    </footer>
  );
}