import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './routes/LoginPage';
import { DashboardPage } from './routes/DashboardPage';
import { AlbumPage } from './routes/AlbumPage';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='albums' element={<DashboardPage />}>
        <Route path=':albumId' element={<AlbumPage/>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
