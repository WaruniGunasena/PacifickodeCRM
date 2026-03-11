import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Departments } from './pages/Departments';
import { Employees } from './pages/Employees';

function App() {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fafbfc' }}>
                <Navbar />
                <main className="main-content" style={{ padding: 'var(--space-xl) var(--space-md)', flexGrow: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/departments" element={<Departments />} />
                        <Route path="/employees" element={<Employees />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
