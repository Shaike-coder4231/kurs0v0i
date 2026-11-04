export default function Empty({ title, sub = '', action = null }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '3rem', marginBottom: 16 }}>🗂️</div>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      {sub && <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>{sub}</p>}
      {action}
    </div>
  );
}