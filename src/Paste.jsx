import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { collection, addDoc } from "firebase/firestore";
import { db } from './config';
import cryptoRandomString from 'crypto-random-string';
import { useNavigate } from 'react-router-dom';

export const Paste = () => {
    const [data, setData] = useState('')
    const navigate = useNavigate()
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const newPaste = async () => {
        if (!data) {
            return toast.error('You cannot create an empty paste.', {
                duration: 4000,
                style: {
                    fontSize: '11.75px',
                    fontFamily: 'Poppind'
                },
            });
        }
        const newId = cryptoRandomString({ length: 6 })
        const userExist = JSON.parse(localStorage.getItem('user'))
        const docRef = await addDoc(collection(db, "paste"), {
            data: data,
            dislike: 0,
            id: id ? id : newId,
            like: 0,
            password: password ? password : null,
            protected: password !== '',
            timestamp: new Date().toString(),
            uid: userExist ? userExist.uid : null,
            username: userExist ? userExist.uid : `guest${cryptoRandomString({ length: 5 })}`,
            views: 0
        });
        if (docRef.id) {
            navigate(`/${id ? id : newId}`)
        }
    }
    return (
        <div className='pastepage'>
            <Toaster />
            <p style={{ marginBottom: '9px', fontSize: '12.5px', fontWeight: 'bold', color: '#ddd', letterSpacing: '0.68px', fontFamily: 'Poppins' }}>New Paste</p>
            <textarea value={data} onChange={e => setData(e.target.value)} placeholder='Paste Something' spellCheck={false}></textarea>
            <p style={{ marginBottom: '9px', fontSize: '12.5px', fontWeight: 'bold', color: '#ddd', letterSpacing: '0.68px', marginTop: '19px' }}>Optional Paste Settings</p>
            <div className="optional-box" style={{ display: 'flex', flexDirection: 'row', borderTop: '1px solid rgb(52 52 52)', paddingTop: '15px', height: '325px', marginBottom: '15px' }}>
                <div className="left" style={{ width: '50%', borderRight: '1px solid rgb(52 52 52)' }}>
                    <table style={{ gap: '9px', width: '80%' }}>
                        <tr>
                            <td><label htmlFor="password" style={{ fontSize: '11.5px' }}>Password:</label></td>
                            <td> <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter Password' style={{ width: '100%' }} id="password" type="text" /></td>
                        </tr>
                        <tr>
                            <td> <label htmlFor="dencode" style={{ fontSize: '11.5px' }}>Paste Name / Title:</label></td>
                            <td> <input value={id} onChange={e => setId(e.target.value)} placeholder='Not Recommended' style={{ width: '100%' }} id="dencode" type="text" /></td>
                        </tr>
                        <tr>
                            <td> </td>
                            <button onClick={() => newPaste()} style={{ color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.05px', padding: '7px 12px', borderRadius: '2px', marginTop: '15px', marginLeft: '9px' }}>Create New Paste</button>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div className="right" style={{ width: '50%' }}>
                    <div className="wrapper" style={{ width: '95%', marginLeft: 'auto', paddingTop: '19px', display: 'flex', flexDirection: 'column' }}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fguest.png?alt=media&token=8e691b33-b1ab-451e-b4d2-0257c76daa52" style={{ width: '45px' }} alt="" />
                        <p style={{ fontSize: '12px', marginTop: '9px' }}>Hello <span style={{ fontWeight: 'bold' }}> Guest</span></p>
                        <div className="sameline" style={{ display: 'flex', flexDirection: 'row', marginTop: '9px' }}>
                            <button style={{ width: '80px', color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px' }}>Login</button>
                            <button style={{ width: '80px', marginLeft: '12px', color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px' }}>Sign Up</button>
                        </div>
                        <button style={{ width: '195px', marginTop: '10px', color: '#ddd', backgroundColor: '#dd4b39 ', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><img src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fgoogle-plus.png?alt=media&token=401c95d4-97f2-415f-adf6-f9aa22c148ab" alt="" style={{ width: '25px', marginRight: '9px' }}></img>Login with Google</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
