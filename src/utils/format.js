export const fmt = (n) => '$' + (+n).toFixed(2);
export const fmtDate = (iso) => new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' });