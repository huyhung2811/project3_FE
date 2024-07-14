import './App.css';
import Login from './pages/guest/login';
import Home from './pages/User/Schedule/Home';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ProfileProvider } from './stores/Context/ProfileContext';
import { LayoutProvider } from './stores/Context/LayoutContext';
import { items } from './stores/ItemPath/ItemPath';
import { SnackbarProvider } from 'notistack';
import NewLayOut from './Layout/Layout';

function App() {

  return (
    <Router>
      <LayoutProvider>
        <SnackbarProvider maxSnack={3} autoHideDuration={2000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <div className="App">
              <Routes>
                <Route path='/login' element={<AuthRoute type="public"><Login /></AuthRoute>} />
                <Route path="/" element={<AuthRoute type="private"><ProfileProvider><NewLayOut/></ProfileProvider></AuthRoute>}>
                  <Route index element={<Home />} />
                  {
                    items.map((item) => (
                      <Route key={item.path} path={item.path} element={item.element} />
                    ))
                  }
                </Route>
              </Routes>
            </div>
        </SnackbarProvider>
      </LayoutProvider>
    </Router>
  );
}

function AuthRoute({ children, type }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();
  
  if (type === "private") {
    if (token) {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
}

export default App;
