import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

function LogoutButton() {
  // Check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect after login

  };

  useEffect(() => {
    // Update the state whenever localStorage changes
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem('token'));
    };

    window.addEventListener('storage', checkLoginStatus); // Listen to storage changes
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  // Only render the button if the user is logged in
  if (!localStorage.getItem('token')) {
    return null; // Return nothing if the user is not logged in
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
}

export default LogoutButton;
