import { createContext, useContext, useState, useCallback } from 'react';
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }, []);
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <div className="toast" style={{ background: toast.type === 'error' ? 'var(--danger)' : toast.type === 'success' ? 'var(--success)' : 'var(--text-main)' }}>{toast.msg}</div>}
    </ToastContext.Provider>
  );
}
export const useToast = () => useContext(ToastContext);