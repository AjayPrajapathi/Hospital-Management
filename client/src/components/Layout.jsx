import SideNavbar from '../components/SideNavbar';
import '../Styles/layout.css'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout">
      <SideNavbar />
      <div className="content">
        <Outlet /> {/* This will render child routes */}
      </div>
    </div>
  );
}
