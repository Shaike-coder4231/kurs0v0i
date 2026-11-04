import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Header onCartOpen={() => setDrawerOpen(true)} />
      <main className="container"><Outlet /></main>
      <Footer />
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}