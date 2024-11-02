import React,{lazy, Suspense} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './pages/HomePage';
import CountryDetails from './pages/CountryDetails';
import Spiner from './components/Spiner';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:name" element={<CountryDetails/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;