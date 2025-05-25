import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './pages/Search/Search';
import Layout from './pages/Layout/Layout';
import Details from './pages/Details/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Search />} />
          <Route path="/details/:detailsBy/:id" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
