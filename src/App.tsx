import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OrdersProvider } from './context/OrdersContext';
import { GarageView } from './components/GarageView';
import { CreateOrderPage } from './pages/CreateOrderPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { ClientPortalPage } from './pages/ClientPortalPage';
import { ClientOrderDetailPage } from './pages/ClientOrderDetailPage';

function App() {
  return (
    <OrdersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/garage" element={<GarageView />} />
          <Route path="/garage/new" element={<CreateOrderPage />} />
          <Route path="/garage/order/:orderId" element={<OrderDetailPage />} />
          <Route path="/client" element={<ClientPortalPage />} />
          <Route path="/client/order/:orderId" element={<ClientOrderDetailPage />} />
        </Routes>
      </BrowserRouter>
    </OrdersProvider>
  );
}

export default App
