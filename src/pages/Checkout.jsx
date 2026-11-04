import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { fmt } from '../utils/format';
import { formatPhone } from '../utils/phone';
import Breadcrumbs from '../components/Breadcrumbs';
import Empty from '../components/Empty';

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const { add } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!items.length) return <Empty title="Корзина пуста" action={<Link to="/catalog" className="btn">В каталог</Link>} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return showToast('Заполните обязательные поля', 'error');
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    const order = add({
      email, customerName: name, phone, paymentMethod: 'card',
      items: items.map((i) => ({ title: i.title, licenseType: i.licenseType, qty: i.qty, price: i.price, sku: i.sku, key: 'XXXX-' + Math.random().toString(36).slice(2, 6).toUpperCase() })),
      total,
    });
    clear();
    navigate(`/order/${order.id}`);
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Корзина', to: '/cart' }, { label: 'Оформление' }]} />
      <div className="form-card">
        <h2 style={{ marginBottom: 24 }}>Контактные данные</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>E-mail</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="form-group"><label>Имя и фамилия</label><input type="text" required value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="form-group"><label>Телефон</label><input type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="7(___)___-__-__" /></div>
          <button className="btn block" type="submit" disabled={submitting}>{submitting ? 'Обработка...' : `Оплатить ${fmt(total)}`}</button>
        </form>
      </div>
    </>
  );
}