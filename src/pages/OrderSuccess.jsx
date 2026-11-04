import { Link, useParams } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import Empty from '../components/Empty';

export default function OrderSuccess() {
  const { id } = useParams();
  const { getById } = useOrders();
  const order = getById(id);

  if (!order) return <Empty title="Заказ не найден" />;

  return (
    <div className="form-card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3rem' }}>✅</div>
      <h2>Заказ оплачен!</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Номер: <b>{order.id}</b></p>
      <div style={{ background: 'var(--bg-body)', padding: 16, borderRadius: 12, textAlign: 'left' }}>
        {order.items.map((i, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <b>{i.title}</b><br /><code>{i.key}</code>
          </div>
        ))}
      </div>
      <Link to="/catalog" className="btn" style={{ marginTop: 24 }}>Продолжить покупки</Link>
    </div>
  );
}