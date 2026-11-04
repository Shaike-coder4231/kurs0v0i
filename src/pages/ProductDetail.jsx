import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, LICENSE_MULT } from '../api';
import { db } from '../utils/db';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFav } from '../context/FavContext';
import { useToast } from '../context/ToastContext';
import { fmt, fmtDate } from '../utils/format';
import Breadcrumbs from '../components/Breadcrumbs';
import Empty from '../components/Empty';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { user } = useAuth();
  const { toggle, has } = useFav();
  const { showToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [license, setLicense] = useState('Personal');
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    api.getProduct(id).then((p) => {
      setProduct(p); setLicense(p.licenseTypes[0]);
      setReviews(db.getReviews().filter(r => r.productId === p.id));
    });
  }, [id]);

  if (!product) return <div className="skeleton" style={{ height: 400 }} />;

  const price = product.price * LICENSE_MULT[license];

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!user) return showToast('Войдите, чтобы оставить отзыв', 'error');
    db.addReview({ productId: product.id, userName: user.firstName || user.username, rating: +rating, text: comment });
    setReviews(db.getReviews().filter(r => r.productId === product.id));
    setComment(''); setRating(5);
    showToast('Спасибо за отзыв!', 'success');
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/catalog' }, { label: product.title }]} />
      <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 'var(--radius-lg)' }}>
          <img src={product.images[0]} alt="" style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }} />
        </div>
        <div>
          <h1>{product.title}</h1>
          <div style={{ fontSize: '2rem', fontWeight: 800, margin: '16px 0' }}>{fmt(price)}</div>
          {product.licenseTypes.map(t => (
            <div key={t} onClick={() => setLicense(t)} style={{ padding: 12, border: `1px solid ${t === license ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 8, marginBottom: 8, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <span>{t}</span><b>{fmt(product.price * LICENSE_MULT[t])}</b>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn" style={{ flex: 1 }} onClick={() => { add(product, license, qty); showToast('Добавлено', 'success'); }}>В корзину</button>
            <button className="btn secondary" style={{ flex: 1 }} onClick={() => { add(product, license, qty); navigate('/checkout'); }}>Купить</button>
          </div>

          <h3 style={{ marginTop: 40, marginBottom: 16 }}>Отзывы ({reviews.length})</h3>
          {user && (
            <form onSubmit={handleAddReview} style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                {[1,2,3,4,5].map(s => <button type="button" key={s} onClick={() => setRating(s)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: s <= rating ? 'var(--warn)' : '#ccc', cursor: 'pointer' }}>★</button>)}
              </div>
              <textarea value={comment} onChange={e => setComment(e.target.value)} required placeholder="Текст отзыва..." style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', marginBottom: 8 }} />
              <button className="btn">Отправить</button>
            </form>
          )}
          {reviews.map(r => (
            <div key={r.id} style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 16 }}>
              <b>{r.userName}</b> <span style={{ color: 'var(--warn)' }}>{'★'.repeat(r.rating)}</span>
              <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}