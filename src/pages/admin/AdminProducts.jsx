import { useEffect, useState } from 'react';
import { api } from '../../api';
import { db } from '../../utils/db';
import { fmt } from '../../utils/format';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const loadData = () => api.listProducts({ limit: 100 }).then(d => setProducts(d.products));
  useEffect(() => { loadData(); }, []);

  const del = (id) => {
    if (!window.confirm('Удалить?')) return;
    db.saveProducts(db.getProducts().filter(p => p.id !== id));
    loadData();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1>Товары</h1>
        <button className="btn ghost" onClick={() => window.confirm('Сбросить БД?') && db.reset()}>🔄 Сбросить БД</button>
      </div>
      <div style={{ background: 'var(--bg-card)', borderRadius: 12 }}>
        {products.map(p => (
          <div key={p.id} style={{ padding: 16, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <div><b>{p.title}</b> ({p.categoryName})</div>
            <div>{fmt(p.price)} <button className="btn ghost" onClick={() => del(p.id)}>🗑️</button></div>
          </div>
        ))}
      </div>
    </>
  );
}