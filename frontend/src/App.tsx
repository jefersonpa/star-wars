import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './pages/Search/Search';
import Layout from './pages/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
