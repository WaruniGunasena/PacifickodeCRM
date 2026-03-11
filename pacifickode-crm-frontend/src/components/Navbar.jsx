import React from 'react';
import { NavLink } from 'react-router-dom';
import { Contact, Home, Building, Users } from 'lucide-react';

export function Navbar() {
    return (
        <header style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', position: 'sticky', top: 0, zIndex: 10 }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
                <div style={{ padding: '1.25rem 0 0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ color: 'var(--color-primary)', display: 'flex' }}>
                        <Contact size={26} strokeWidth={2.5} />
                    </div>
                    <h1 style={{ fontSize: '1.25rem', margin: 0, color: '#0f172a', fontWeight: 700 }}>
                        Employee Management System
                    </h1>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    
                    <NavLink to="/" end className="nav-tab">
                        <Home size={18} /> Home
                    </NavLink>
                    <NavLink to="/departments" className="nav-tab">
                        <Building size={18} /> Departments
                    </NavLink>
                    <NavLink to="/employees" className="nav-tab">
                        <Users size={18} /> Employees
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
