import React, { forwardRef } from 'react';

export const Input = forwardRef(({ label, error, required, className = '', ...props }, ref) => {
    return (
        <div className={`input-group ${className}`}>
            {label && (
                <label className="input-label">
                    {label} {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
                </label>
            )}
            <input ref={ref} className="input-field" required={required} {...props} />
            {error && <span className="error-text">{error}</span>}
        </div>
    );
});
Input.displayName = 'Input';
