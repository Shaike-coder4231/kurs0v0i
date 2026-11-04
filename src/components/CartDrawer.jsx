import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fmt } from '../utils/format';
import Empty from './Empty';

export default function CartDrawer({ open, onClose }) {
  const { items, total, count, remove } = useCart();
  if (!open) return null;

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 199 }} onClick={onClose} />
      <aside style={{ position: 'fixed', top: 0, right: 0, width: 360, maxWidth: '92vw', height: '100vh', background: 'var(--bg-card)', zIndex: 200, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 24, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
          <strong>Корзина · {count} шт.</strong>
          <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {!items.length ? <Empty title="Корзина пуста" action={<Link to="/catalog" className="btn" onClick={onClose}>В каталог</Link>} /> : items.map((i) => (
            <div key={i.key} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <img src={i.thumbnail} alt={i.title} style={{ width: 60, height: 60, objectFit: 'contain', background: 'var(--bg-body)', borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '.9rem' }}>{i.title}</h4>
                <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>{i.licenseType}</div>
                <div style={{ fontWeight: 600 }}>{fmt(i.price)} × {i.qty}</div>
              </div>
              <button className="icon-btn" onClick={() => remove(i.key)} style={{ width: 32, height: 32 }}>🗑️</button>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div style={{ padding: 24, borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: '1.1rem', fontWeight: 700 }}>
              <span>Итого:</span><span>{fmt(total)}</span>
            </div>
            <Link to="/cart" className="btn block" onClick={onClose}>Перейти в корзину</Link>
          </div>
        )}
      </aside>
    </>
  );
}