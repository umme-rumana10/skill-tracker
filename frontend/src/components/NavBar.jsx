import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const { pathname } = useLocation();
  const active = (path) => (pathname === path ? 'nav-link active' : 'nav-link');

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="brand">Skill Tracker</div>
        <div className="nav-links">
          <Link to="/" className={active('/')}>Home</Link>
          <Link to="/report" className={active('/report')}>Report</Link>
        </div>
      </div>
    </nav>
  );
}
