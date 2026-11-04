import { NavLink, Outlet } from 'react-router-dom';
export default function AdminLayout() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '200px 1fr' }}>
      <aside style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 12, height: 'fit-content' }}>
        <NavLink to="/admin/products" style={({isActive}) => ({ display: 'block', padding: 10, borderRadius: 8, background: isActive ? 'var(--primary-light)' : 'transparent', color: isActive ? 'var(--primary)' : 'inherit', marginBottom: 4 })}>📦 Товары</NavLink>
        <NavLink to="/admin/orders" style={({isActive}) => ({ display: 'block', padding: 10, borderRadius: 8, background: isActive ? 'var(--primary-light)' : 'transparent', color: isActive ? 'var(--primary)' : 'inherit' })}>🛒 Заказы</NavLink>
      </aside>
      <div><Outlet /></div>
    </div>
  );
}