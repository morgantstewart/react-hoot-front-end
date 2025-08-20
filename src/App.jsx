import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import HootList from './components/HootList/HootList';

import { UserContext } from './contexts/UserContext';
import * as hootService from './services/hootService';



const App = () => {
  const { user } = useContext(UserContext);

  // Debug logging
  console.log('App component rendered, user:', user);

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
  
      // console log to verify
      console.log('hootsData:', hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/hoots' element={<HootList />} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
