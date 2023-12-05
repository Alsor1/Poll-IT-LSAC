import React from 'react';

function Logout({ user, onLogout }) {
  const handleLogout = () => {

    onLogout();
  };

  return (
    <div>
      <h1 
      onClick={handleLogout}
      style={{
        color:"#04395E",
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '22px',
        cursor: 'pointer',
        margin:"0px",
        paddingTop:"2.5px",
      }}
      >Logout</h1>
    </div>
  );
}

export default Logout;