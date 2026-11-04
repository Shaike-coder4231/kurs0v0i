import { Link } from 'react-router-dom';
import { LICENSE_MULT } from '../api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { fmt } from '../utils/format';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { showToast } = useToast();
  const minPrice = product.price * (LICENSE_MULT[product.licenseTypes[0]] || 1);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="thumb">
        <span className="license-tag">{product.licenseTypes[0]}</span>
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </Link>
      <div>
        <Link to={`/product/${product.id}`} style={{ color: 'var(--text-main)' }}><div className="title">{product.title}</div></Link>
        <div className="brand">{product.brand} · {product.categoryName}</div>
        <div className="price">от {fmt(minPrice)}</div>
        <button className="btn" onClick={() => { add(product, product.licenseTypes[0], 1); showToast('Добавлено в корзину', 'success'); }}>В корзину</button>
      </div>
    </div>
  );
}