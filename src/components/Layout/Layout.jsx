import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header/NewHeader';
import NewSidebar from './SideBar/NewSidebar';
import { Outlet } from 'react-router-dom';
import { items } from '../../stores/ItemPath/ItemPath';
import { useLocation } from 'react-router-dom';
import { RedirectProvider } from "../../stores/Context/RedirectContext";
import { useLayout } from '../../stores/Context/LayoutContext';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: '20px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function getPageName(path) {
  for (const item of items) {
    const routeRegex = new RegExp(`^${item.path.replace(/:\w+/g, '\\w+')}$`);
    if (routeRegex.test(path)) {
      return item.name;
    }
  }
  return 'Unknown Page';
}


export default function Layout() {
  const { showSidebar, setShowSidebar } = useLayout();
  const location = useLocation();
  const pathName = location.pathname;
  React.useEffect(() => {
    const pageName = getPageName(pathName);
    document.title = pageName;
  }, [pathName]);

  const handleDrawerClose = () => {
    setShowSidebar(false);
  };

  return (
    <RedirectProvider>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <Header pageName={getPageName(pathName)} />
        <NewSidebar open={showSidebar} handleDrawerClose={handleDrawerClose} />
        <Main open={showSidebar} sx={{backgroundColor:'#f7f7f8', width:"100%",display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:'10px'}}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </RedirectProvider>
  );
}
