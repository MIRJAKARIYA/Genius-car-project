import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [year, setYear] = useState('');
    useEffect(() =>{
        const yr = new Date();
        setYear(yr.getFullYear());
    }, [])
    return (
        <footer className='text-center mt-5'>
            <p><small>copyright @ {year}</small></p>
        </footer>
    );
};

export default Footer;