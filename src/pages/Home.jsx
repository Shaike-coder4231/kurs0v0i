import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/ProductCard';
import { SkeletonGrid } from '../components/Skeleton';
import Empty from '../components/Empty';

export default function Home() {
  const [popular, setPopular] = useState(null);
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [p, c] = await Promise.all([api.listProducts({ limit: 8, sortBy: 'rating', order: 'desc' }), api.getCategories()]);
        setPopular(p.products); setCats(c);
      } catch (e) { setError(e.message); }
    })();
  }, []);

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg,#4f46e5,#06b6d4)', color: '#fff', padding: '60px 40px', borderRadius: 'var(--radius-lg)', marginBottom: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, fontSize: '12rem', opacity: .1 }}>💾</div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 16, lineHeight: 1.2 }}>Цифровые лицензии<br />с мгновенной выдачей</h1>
        <p style={{ marginBottom: 24, opacity: .9, maxWidth: 500, fontSize: '1.1rem' }}>Официальное ПО: операционные системы, офисные пакеты, антивирусы, IDE, облачные сервисы.</p>
        <Link to="/catalog" className="btn" style={{ background: 'white', color: 'var(--primary)' }}>Перейти в каталог</Link>
      </section>

      <h2 style={{ marginBottom: 24, fontSize: '1.5rem' }}>Популярные продукты</h2>
      {error ? <Empty title="Ошибка" sub={error} /> : !popular ? <SkeletonGrid n={4} /> : <div className="grid">{popular.map((p) => <ProductCard key={p.id} product={p} />)}</div>}

      <h2 style={{ margin: '48px 0 24px', fontSize: '1.5rem' }}>Категории</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))' }}>
        {cats.map((c) => (
          <Link key={c.key} to={`/catalog?category=${c.key}`} style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '24px 16px', textAlign: 'center', color: 'var(--text-main)', fontWeight: 600, boxShadow: 'var(--shadow-sm)', transition: '.2s' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{c.icon}</div>
            {c.name}
          </Link>
        ))}
      </div>
    </>
  );
}