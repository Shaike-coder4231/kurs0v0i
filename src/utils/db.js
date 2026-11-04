const KEYS = { products: 'shop_products', clients: 'shop_clients', orders: 'shop_orders_data' };

export async function initDB() {
  if (localStorage.getItem('shop_db_initialized')) return;
  try {
    const [prod, client, order] = await Promise.all([
      fetch('/data/products.json').then(r => r.json()),
      fetch('/data/clients.json').then(r => r.json()),
      fetch('/data/orders.json').then(r => r.json())
    ]);
    localStorage.setItem(KEYS.products, JSON.stringify(prod));
    localStorage.setItem(KEYS.clients, JSON.stringify(client));
    localStorage.setItem(KEYS.orders, JSON.stringify(order));
    localStorage.setItem('shop_db_initialized', 'true');
  } catch (e) { console.error('Ошибка загрузки JSON:', e); }
}

export const db = {
  getProducts: () => JSON.parse(localStorage.getItem(KEYS.products) || '[]'),
  getClients: () => JSON.parse(localStorage.getItem(KEYS.clients) || '[]'),
  getOrders: () => JSON.parse(localStorage.getItem(KEYS.orders) || '[]'),
  saveProducts: (data) => localStorage.setItem(KEYS.products, JSON.stringify(data)),
  saveClients: (data) => localStorage.setItem(KEYS.clients, JSON.stringify(data)),
  saveOrders: (data) => localStorage.setItem(KEYS.orders, JSON.stringify(data)),
  getReviews: () => JSON.parse(localStorage.getItem('shop_reviews') || '[]'),
  addReview: (review) => {
    const reviews = db.getReviews();
    reviews.push({ ...review, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('shop_reviews', JSON.stringify(reviews));
  },
  reset: () => {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    localStorage.removeItem('shop_db_initialized');
    localStorage.removeItem('shop_reviews');
    window.location.reload();
  }
};