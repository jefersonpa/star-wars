import { Outlet } from 'react-router-dom';
import './style.css';

const Layout = () => {
  return (
    <>
      <header>
        <span className="layout__sw-starter">SWStarter</span>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
