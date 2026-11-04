import { db } from '../utils/db';

export const CATEGORIES = [
  { key: 'os', name: 'Операционные системы', icon: '🖥️' },
  { key: 'office', name: 'Офисные пакеты', icon: '📊' },
  { key: 'antivirus', name: 'Антивирусы и защита', icon: '🛡️' },
  { key: 'graphics', name: 'Графика и дизайн', icon: '🎨' },
  { key: 'dev', name: 'Разработка и IDE', icon: '💻' },
  { key: 'cloud', name: 'Облачные сервисы', icon: '☁️' },
  { key: 'utility', name: 'Утилиты и плагины', icon: '🔧' },
  { key: 'database', name: 'Базы данных и серверы', icon: '🗄️' },
];

export const LICENSE_MULT = { Personal: 1, Business: 2.4, Enterprise: 5.8 };
const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

function escapeXml(s) {
  return String(s).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));
}

function makeThumb(icon, title) {
  const short = String(title).slice(0, 22);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#e2e8f0"/></linearGradient></defs>
    <rect width="400" height="400" fill="url(#g)"/>
    <text x="200" y="180" font-size="120" text-anchor="middle">${icon}</text>
    <text x="200" y="280" font-size="22" text-anchor="middle" fill="#0f172a" font-family="sans-serif" font-weight="700">${escapeXml(short)}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

export const api = {
  async listProducts({ limit = 12, skip = 0, q = '', category = '', sortBy = '', order = '', license = '' } = {}) {
    let list = db.getProducts().map(raw => {
      const cat = CAT_MAP[raw.category] || { name: 'ПО', icon: '📦' };
      const thumb = makeThumb(cat.icon, raw.title);
      return {
        ...raw, categoryName: cat.name, sku: 'LIC-' + String(raw.id).padStart(4, '0'),
        thumbnail: thumb, images: [thumb], activation: 'Ключ активации', delivery: 'Мгновенно на e-mail'
      };
    });

    if (q) { const s = q.toLowerCase(); list = list.filter(p => p.title.toLowerCase().includes(s)); }
    if (category) list = list.filter(p => p.category === category);
    if (license) list = list.filter(p => p.licenseTypes.includes(license));

    if (sortBy) {
      const dir = order === 'desc' ? -1 : 1;
      list.sort((a, b) => sortBy === 'price' ? (a.price - b.price) * dir : (a.rating - b.rating) * dir);
    }
    return { products: list.slice(skip, skip + limit), total: list.length };
  },
  async getProduct(id) {
    const list = await this.listProducts({ limit: 1000 });
    const p = list.products.find(x => x.id === +id);
    if (!p) throw new Error('Товар не найден');
    return p;
  },
  async getCategories() { return CATEGORIES; },
  async getOrders() {
    return db.getOrders().map(o => ({
      id: 'ORD-' + o.id, total: o.total, totalProducts: o.quantity,
      status: 'paid', createdAt: o.date,
      email: db.getClients().find(c => c.id === o.clientId)?.email || '—'
    }));
  },
  async login(body) {
    const res = await fetch(`https://dummyjson.com/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Неверный логин или пароль');
    return res.json();
  },
};