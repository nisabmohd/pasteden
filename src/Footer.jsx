import React from 'react'

export const Footer = () => {
    return (
        <div className='footer' style={{ height: '45px', backgroundColor: '#252525', display: 'flex', alignItems: 'center' }}>
            <div className='App' style={{ fontFamily: 'Poppins', fontSize: '12px', textAlign: 'center' }}>
                © 2022 Pasteden - developed and maintained by <a style={{ color: 'white', textDecoration: 'none' }} target="_blank" href="https://github.com/nisabmohd" rel="noreferrer">NisabMohd</a>
            </div>
        </div>
    )
}
