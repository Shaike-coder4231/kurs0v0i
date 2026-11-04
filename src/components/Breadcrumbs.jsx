import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  return (
    <div style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: 24 }}>
      {items.map((it, i) => (
        <span key={i}>
          {i > 0 && ' / '}
          {it.to ? <Link to={it.to} style={{ color: 'var(--text-muted)' }}>{it.label}</Link> : <span>{it.label}</span>}
        </span>
      ))}
    </div>
  );
}