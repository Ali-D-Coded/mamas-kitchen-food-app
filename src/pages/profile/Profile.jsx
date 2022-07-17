import React from 'react'
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div>
      Profile
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/payment">
        <button>Payments</button>
      </Link>
    </div>
  );
}

export default Profile