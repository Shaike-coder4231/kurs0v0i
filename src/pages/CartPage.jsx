import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { fmt } from '../utils/format';
import Breadcrumbs from '../components/Breadcrumbs';
import Empty from '../components/Empty';

export default function CartPage() {
  const { items, count, total, updateQty, remove, clear } = useCart();
  const { showToast } = useToast();
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  if (!items.length) return <Empty title="Корзина пуста" action={<Link to="/catalog" className="btn">В каталог</Link>} />;

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'SOFT10') { setDiscount(total * 0.1); showToast('Скидка 10%', 'success'); }
    else { setDiscount(0); showToast('Неверный промокод', 'error'); }
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Корзина' }]} />
      <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div>
          {items.map((i) => (
            <div key={i.key} style={{ display: 'flex', gap: 16, padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', marginBottom: 12, alignItems: 'center' }}>
              <img src={i.thumbnail} alt="" style={{ width: 60, height: 60, objectFit: 'contain' }} />
              <div style={{ flex: 1 }}>
                <h4>{i.title}</h4>
                <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>{i.licenseType}</div>
                <div>{fmt(i.price)} × <input type="number" value={i.qty} onChange={(e) => updateQty(i.key, e.target.value)} style={{ width: 50 }} /> = <b>{fmt(i.price * i.qty)}</b></div>
              </div>
              <button className="btn ghost" onClick={() => remove(i.key)}>Удалить</button>
            </div>
          ))}
        </div>
        <aside style={{ background: 'var(--bg-card)', padding: 24, borderRadius: 'var(--radius-lg)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: 16 }}>Сумма: {fmt(total)}</h3>
          {discount > 0 && <div style={{ color: 'var(--success)', marginBottom: 16 }}>Скидка: -{fmt(discount)}</div>}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input type="text" placeholder="SOFT10" value={promo} onChange={(e) => setPromo(e.target.value)} style={{ flex: 1, padding: 10, border: '1px solid var(--border)', borderRadius: 8 }} />
            <button className="btn secondary" onClick={applyPromo}>ОК</button>
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 16 }}>Итого: {fmt(total - discount)}</div>
          <Link to="/checkout" className="btn block">Оформить заказ</Link>
        </aside>
      </div>
    </>
  );
}