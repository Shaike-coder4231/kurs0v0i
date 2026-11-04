import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, CATEGORIES } from '../api';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { SkeletonGrid } from '../components/Skeleton';
import Empty from '../components/Empty';

const LIMIT = 12;

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const q = params.get('q') || '';
  const category = params.get('category') || '';
  const license = params.get('license') || '';
  const sort = params.get('sort') || '';

  useEffect(() => {
    let active = true;
    setLoading(true);
    (async () => {
      const [sortBy, order] = sort ? sort.split('-') : ['', ''];
      const res = await api.listProducts({ limit: LIMIT, q, category, sortBy, order, license });
      if (active) { setData(res); setLoading(false); }
    })();
    return () => { active = false; };
  }, [q, category, license, sort]);

  const setParam = (k, v) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next);
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Каталог' }]} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <h1 style={{ fontSize: '1.5rem' }}>{q ? `Поиск: ${q}` : 'Каталог'}</h1>
        <select value={sort} onChange={(e) => setParam('sort', e.target.value)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)' }}>
          <option value="">По умолчанию</option>
          <option value="price-asc">Цена ↑</option>
          <option value="price-desc">Цена ↓</option>
        </select>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
        <aside style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 'var(--radius-lg)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: 16 }}>Категории</h3>
          {CATEGORIES.map(c => (
            <div key={c.key} onClick={() => setParam('category', category === c.key ? '' : c.key)} style={{ padding: '8px 12px', cursor: 'pointer', background: category === c.key ? 'var(--primary-light)' : 'transparent', color: category === c.key ? 'var(--primary)' : 'inherit', borderRadius: 8, marginBottom: 4 }}>{c.name}</div>
          ))}
        </aside>
        <div>
          {loading ? <SkeletonGrid n={6} /> : !data?.products.length ? <Empty title="Ничего не найдено" /> : <div className="grid">{data.products.map(p => <ProductCard key={p.id} product={p} />)}</div>}
        </div>
      </div>
    </>
  );
}