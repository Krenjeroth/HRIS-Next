'use client'
import React from 'react'
const LazyComponent: React.FC = () => {
    return (
        <div>
            <h2>This is a lazy-loaded component!</h2>
            <p>It only loads when it's needed.</p>
        </div>
    );
};

export default LazyComponent;
