import React from 'react';
import './Button.css';

const STYLES = [
    'btn--primary',
    'btn-outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Button = ({ children, onClick }) => {

    return(
        <button className='btn' onClick={onClick}>
            {children}
        </button>
    )

} 