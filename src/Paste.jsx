import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { db } from './config';
import cryptoRandomString from 'crypto-random-string';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from './App'

export const Paste = () => {
    const [data, setData] = useState('')
    const navigate = useNavigate()
    const context = useContext(AppContext)
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [diable, setDisable] = useState(false)

    const newPaste = async () => {
        if (diable) return
        if (!data) {
            return toast.error('You cannot create an empty paste.', {
                duration: 4000,
                style: {
                    fontSize: '11.75px',
                    fontFamily: 'Poppind'
                },
            });
        }
        setDisable(true)
        const pasteRef = collection(db, "paste");
        const q = query(pasteRef, where("id", "==", id));
        let found = false;
        async function get() {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const resp = doc.data();
                console.log(resp);
                if (resp.id === id) {
                    found = true
                }
            });
            if (found) {
                setDisable(false)
                return toast.error(`You cannot create a paste with "${id}".`, {
                    duration: 4000,
                    style: {
                        fontSize: '11.75px',
                        fontFamily: 'Poppind'
                    },
                });
            }
            const newId = cryptoRandomString({ length: 6 })
            const userExist = context.auth
            const docRef = await addDoc(collection(db, "paste"), {
                data: data,
                dislike: 0,
                id: id ? id : newId,
                like: 0,
                password: password ? password : null,
                protected: password !== '',
                timestamp: new Date().toString(),
                uid: userExist ? userExist.uid : null,
                username: userExist ? userExist.username : `guest${cryptoRandomString({ length: 5 })}`,
                views: 0
            });
            setDisable(false)
            if (docRef.id) {
                navigate(`/${id ? id : newId}`)
            }
        }
        get()

    }
    return (
        <div className='pastepage' >
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
                            <button onClick={() => newPaste()} style={{ color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: diable ? 'not-allowed' : 'pointer', fontSize: '11.05px', padding: '7px 12px', borderRadius: '2px', marginTop: '15px', marginLeft: '9px' }}>Create New Paste</button>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div className="right" style={{ width: '50%' }}>
                    <div className="wrapper" style={{ width: '95%', marginLeft: 'auto', paddingTop: '19px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {
                            context.auth ? <Link to={`/user/${context.auth.username+"="+context.auth.uid}`} style={{textDecoration:'none',color:'inherit'}}>
                                <img src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fguest.png?alt=media&token=8e691b33-b1ab-451e-b4d2-0257c76daa52" style={{ width: '55px' }} alt="" />
                                <p style={{ fontSize: '12px', marginTop: '9px' }}>Hello , <span style={{}}> {context.auth.username}</span></p>
                            </Link> : <>
                                <img src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fguest.png?alt=media&token=8e691b33-b1ab-451e-b4d2-0257c76daa52" style={{ width: '55px' }} alt="" />
                                <p style={{ fontSize: '12px', marginTop: '9px' }}>Hello , <span style={{}}>{"Guest - Login or Signup"}</span></p>
                            </>
                        }

                        {
                            !context.auth && (<><div className="sameline" style={{ display: 'flex', flexDirection: 'column', marginTop: '9px' }}>
                                <button onClick={() => navigate('/login')} style={{ width: '250px', color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px' }}>Login</button>
                                <button onClick={() => navigate('/signup')} style={{ width: '250px', color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px', marginTop: '14px' }}>Sign Up</button>
                            </div></>)
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}
