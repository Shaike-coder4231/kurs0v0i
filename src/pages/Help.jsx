import Breadcrumbs from '../components/Breadcrumbs';
export default function Help() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Руководство' }]} />
      <h1 style={{ marginBottom: 24 }}>📖 Руководство</h1>
      <div style={{ background: 'var(--bg-card)', padding: 24, borderRadius: 'var(--radius-lg)' }}>
        <h3>Как купить лицензию</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Выберите тип лицензии на странице товара, добавьте в корзину, укажите e-mail и оплатите. Ключ придёт моментально.</p>
      </div>
    </>
  );
}