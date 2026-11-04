import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import Empty from '../components/Empty';

export default function Profile() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1>Привет, {user.firstName || user.username}</h1>
        <button className="btn ghost" onClick={logout}>Выйти</button>
      </div>
      <h2 style={{ marginBottom: 16 }}>Мои заказы</h2>
      {!orders.length ? <Empty title="Заказов нет" /> : orders.map(o => (
        <div key={o.id} style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 12, marginBottom: 12 }}>
          <b>{o.id}</b> — {o.total}$
        </div>
      ))}
    </>
  );
}