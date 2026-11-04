import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useFav } from '../context/FavContext';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import Empty from '../components/Empty';

export default function Favorites() {
  const { ids } = useFav();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Promise.all(ids.map((id) => api.getProduct(id).catch(() => null))).then((list) => setProducts(list.filter(Boolean)));
  }, [ids]);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Избранное' }]} />
      {!ids.length ? <Empty title="Пусто" action={<Link to="/catalog" className="btn">В каталог</Link>} /> : <div className="grid">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>}
    </>
  );
}