import React from 'react';
import { Building, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 'var(--space-xl)' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a', textAlign: 'center' }}>
                Welcome to Employee Management System
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px', lineHeight: 1.6 }}>
                Manage your organization's departments and employees efficiently with our comprehensive management solution.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', width: '100%', maxWidth: '900px' }}>
                <div className="home-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div className="icon-box blue">
                            <Building size={24} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: '#0f172a' }}>Departments</h2>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Manage organizational departments</p>
                        </div>
                    </div>

                    <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                        Create, edit, and organize your company's departments. Track department codes, names, and descriptions.
                    </p>

                    <button className="btn-black" onClick={() => navigate('/departments')}>
                        Go to Departments <ArrowRight size={16} />
                    </button>
                </div>

                <div className="home-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div className="icon-box green">
                            <Users size={24} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: '#0f172a' }}>Employees</h2>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Manage employee information</p>
                        </div>
                    </div>

                    <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                        Add, update, and track employee records including personal details, salary information, and department assignments.
                    </p>

                    <button className="btn-black" onClick={() => navigate('/employees')}>
                        Go to Employees <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
