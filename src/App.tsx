import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OrdersProvider } from './context/OrdersContext';
import { GarageView } from './components/GarageView';
import { CreateOrderPage } from './pages/CreateOrderPage';

function App() {
  return (
    <OrdersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/garage" element={<GarageView />} />
          <Route path="/garage/new" element={<CreateOrderPage />} />
        </Routes>
      </BrowserRouter>
    </OrdersProvider>
  );
}

export default App
