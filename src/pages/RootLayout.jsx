import Header from '../components/ui/Header.jsx';
import { Outlet } from 'react-router-dom';
function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default RootLayout;
