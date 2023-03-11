import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StorePicker />} />
        <Route path='/store/:storeId' element={<App />} />
        <Route element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;