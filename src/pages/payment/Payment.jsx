import React from 'react'
import { Link } from 'react-router-dom';

const Payment = () => {
  return (
    <div>
      Payment
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      <Link to="/">
        <button>home</button>
      </Link>
    </div>
  );
}

export default Payment