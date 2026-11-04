import { useEffect, useState } from 'react';
import { api } from '../../api';
import { fmt } from '../../utils/format';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.getOrders().then(setOrders); }, []);

  return (
    <>
      <h1 style={{ marginBottom: 24 }}>Заказы</h1>
      <div style={{ background: 'var(--bg-card)', borderRadius: 12 }}>
        {orders.map(o => (
          <div key={o.id} style={{ padding: 16, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <div><b>{o.id}</b> — {o.email}</div>
            <div><b>{fmt(o.total)}</b></div>
          </div>
        ))}
      </div>
    </>
  );
}