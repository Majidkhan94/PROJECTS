import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from "../Export.js";
import {CartProvider} from "../Components/CartContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
      <Routing />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
)
