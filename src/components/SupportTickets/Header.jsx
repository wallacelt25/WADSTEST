import React from "react";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="brand-logo" />
        <div className="brand-name">Jellycat Support</div>
      </div>

      <nav className="nav-menu">
        <div className="nav-item">Dashboard</div>
        <div className="nav-item">Help Center</div>
        <div className="nav-item">My Tickets</div>
      </nav>

      <div className="user-profile">
        <div className="avatar">JS</div>
        <div className="user-name">John Smith</div>
      </div>
    </header>
  );
};
