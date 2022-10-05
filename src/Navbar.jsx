import React from 'react'
import logo from './file.png'
export default function Navbar() {
    return (
        <div className='navbar' style={{ height: '45px', borderBottom: '1px solid rgb(52 52 52)', backgroundColor: 'rgb(41 41 41)', display: 'flex', alignItems: 'center' }}>
            <div className="App" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="left" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <a href='/' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',color:'inherit',textDecoration:'none' }} >
                    <img style={{width:'32px',marginRight:'9px'}} src={logo} alt="" />
                    <h3 style={{letterSpacing:'0.98px'}}>PASTEDEN</h3>
                    </a>
                    <a href='/' style={{ backgroundColor: '#61ba65', color: 'white', border: 'none', outline: 'none', padding: '4.5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px',marginLeft:'22px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',textDecoration:'none' }}><span style={{fontSize:'14px',fontWeight:'bold',marginRight:'5px'}}>+</span>paste</a>
                </div>
                <div className="right">
                <div className="sameline" style={{display:'flex',flexDirection:'row'}}>
                    <button style={{width:'80px',color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px'}}>Login</button>
                    <button style={{width:'80px',marginLeft:'12px',color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px'}}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
