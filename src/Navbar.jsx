import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from './App'
import logo from './file.png'
export default function Navbar() {
    const context = useContext(AppContext)
    const navigate=useNavigate()
    function logout(){
        context.setAuth(null)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar' style={{ height: '45px', borderBottom: '1px solid rgb(52 52 52)', backgroundColor: 'rgb(41 41 41)', display: 'flex', alignItems: 'center' }}>
            <div className="App" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="left" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Link to='/' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'inherit', textDecoration: 'none' }} >
                        <img style={{ width: '32px', marginRight: '9px' }} src={logo} alt="" />
                        <h3 style={{ letterSpacing: '0.98px' }}>PASTEDEN</h3>
                    </Link>
                    <Link to='/' style={{ backgroundColor: '#61ba65', color: 'white', border: 'none', outline: 'none', padding: '4.5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', marginLeft: '22px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><span style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '5px' }}>+</span>paste</Link>
                </div>
                <div className="right">
                    <div className="sameline" style={{ display: 'flex', flexDirection: 'row' }}>
                        {
                            !context.auth ? <> <button className='hide' onClick={()=>navigate('/login')}  style={{ width: '80px', color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px' }}>Login</button>
                                <button className='hide' onClick={()=>navigate('/signup')} style={{ width: '80px', marginLeft: '12px', color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px' }}>Sign Up</button></> : <>
                                <img src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fguest.png?alt=media&token=8e691b33-b1ab-451e-b4d2-0257c76daa52" style={{ width: '30px', marginRight: '15px' }} alt="" />
                                <p className='hide' style={{ fontSize: '12px', marginTop: '9px' }}>Hello , <span style={{  }}>{context.auth.currentUser.email}</span></p>
                                <button onClick={()=>logout()} style={{ width: '80px', marginLeft: '12px', color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px' }}>Log out</button>

                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
