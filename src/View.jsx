import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from './config'
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from './App';

export const View = () => {
    const params = useParams()
    const navigate=useNavigate()
    const context = useContext(AppContext)
    const [load, setLoad] = useState(true)
    const [data, setData] = useState('')
    const [isprotected, setProtected] = useState(false)
    const [password, setPassword] = useState('')
    const [response, setResp] = useState(null)
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [views, setViews] = useState(0)
    const [docid, setDocId] = useState(null)

    useEffect(() => {
        const { id } = params
        const pasteRef = collection(db, "paste");
        const q = query(pasteRef, where("id", "==", id));
        async function get() {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const resp = doc.data();
                setDocId(doc.id)
                setProtected(resp.protected)
                setData(resp.data)
                setResp(resp)
                setLoad(false)
                setLikes(resp.like)
                setViews(resp.views)
                setDislikes(resp.dislike)
            });
        }
        get()

    }, [params])
    
    useEffect(() => {
        async function update() {
            await setDoc(doc(db, "paste", docid), {
                ...response, views: views + 1
            });
        }
        update()
    }, [docid, response, views])

    const unlock = () => {
        if (!isprotected) return
        if (!password || password !== response.password) {
            return toast.error('Invalid Password.', {
                duration: 4000,
                style: {
                    fontSize: '11.75px',
                    fontFamily: 'Poppind'
                },
            });
        }
        setProtected(false)
    }
    const likehandle = async () => {
        if (!docid || !context.auth) return;
        await setDoc(doc(db, "paste", docid), { ...response, like: likes + 1 });
        setLikes(prev => prev + 1)
    }
    const dislikehandle = async () => {
        if (!docid || !context.auth) return;
        await setDoc(doc(db, "paste", docid), { ...response, dislike: dislikes + 1 });
        setDislikes(prev => prev + 1)
    }
    return (
        <div className='viewpage' >
            <Toaster />
            {
                <textarea readonly="readonly" style={{ cursor: 'copy', height: '43vh' }} spellCheck={false} value={load ? "loading ...." : (!isprotected) ? data : 'Enter password below to unlock ..'}></textarea>
            }
            <p style={{ marginBottom: '9px', fontSize: '12.5px', fontWeight: 'bold', color: '#ddd', letterSpacing: '0.68px', marginTop: '19px' }}>Paste Options</p>
            <div className="optional-box" style={{ display: 'flex', flexDirection: 'row', borderTop: '1px solid rgb(52 52 52)', paddingTop: '15px', height: '325px', marginBottom: '15px' }}>
                <div className="left" style={{ width: '50%', borderRight: '1px solid rgb(52 52 52)' }}>
                    <table style={{ gap: '9px' }}>
                        <tr>
                            <td><label htmlFor="password" style={{ fontSize: '11.5px', marginRight: '10px' }}>Password:</label></td>
                            <td> <input placeholder='Enter Password' readonly={!isprotected && "readonly"} value={password} onChange={(e) => setPassword(e.target.value)} style={{ backgroundColor: 'transparent', cursor: isprotected ? 'pointer' : 'not-allowed' }} id="password" type="text" /></td>
                        </tr>
                        <tr>
                            <td> <label htmlFor="dencode" style={{ fontSize: '11.5px', marginRight: '10px' }}>Paste Name / Title:</label></td>
                            <td> <input readonly="readonly" style={{ cursor: 'not-allowed' }} placeholder='Not Recommended' value={response && response.id} id="dencode" type="text" /></td>
                        </tr>
                        <tr>
                            <td> </td>
                            <button disabled={!isprotected} onClick={() => unlock()} style={{ color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: isprotected ? 'pointer' : 'not-allowed', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px', marginTop: '15px', marginLeft: '9px' }}>Unlock Paste</button>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div className="right" style={{ width: '50%' }}>
                    <div className="wrapper" style={{ width: '95%', marginLeft: 'auto', paddingTop: '19px', display: 'flex', flexDirection: 'column' }}>
                        <div className="sameline" style={{ display: 'flex', flexDirection: 'row', marginTop: '1px', marginBottom: '15px' }}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fguest.png?alt=media&token=8e691b33-b1ab-451e-b4d2-0257c76daa52" style={{ width: '45px', marginRight: '18px' }} alt="" />
                            <p style={{ fontSize: '12px', marginTop: '9px' }}> From <span style={{ fontWeight: 'bold' }}> {response && response.username}</span></p>
                        </div>
                        <div className="sameline" style={{ display: 'flex', flexDirection: 'column', marginTop: '5px', marginBottom: '5px' }}>
                            <div className="timestamp" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <i class="fi fi-rr-time-check"></i><p style={{ fontSize: '12px', marginLeft: '9px' }}> {response && response.timestamp.slice(0, 24)}</p>
                            </div>
                            <div className="sameline" style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '5px' }}>
                                <div onClick={() => likehandle()} className="timestamp" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: context.auth ? 'pointer' : 'not-allowed' }}>
                                    <i style={{ marginTop: '-8px' }} class="fi fi-rs-hand backwards"></i><p style={{ fontSize: '12px', marginLeft: '9px' }}> {likes}</p>
                                </div>
                                <div onClick={() => dislikehandle()} className="timestamp" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '15px', cursor: context.auth ? 'pointer' : 'not-allowed' }}>
                                    <i style={{ marginBottom: '-1px' }} class="fi fi-rs-hand"></i><p style={{ fontSize: '12px', marginLeft: '9px' }}> {dislikes}</p>
                                </div>
                                <div className="timestamp" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '15px' }}>
                                    <i style={{ marginBottom: '-1px' }} class="fi fi-rr-eye"></i><p style={{ fontSize: '12px', marginLeft: '9px' }}> {views}</p>
                                </div>
                            </div>
                        </div>
                        {
                            !context.auth && (<><div className="sameline" style={{ display: 'flex', flexDirection: 'row', marginTop: '9px' }}>
                                <button onClick={()=>navigate('/login')}  style={{ width: '80px', color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px' }}>Login</button>
                                <button onClick={()=>navigate('/signup')}  style={{ width: '80px', marginLeft: '12px', color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px' }}>Sign Up</button>
                            </div>
                                <button style={{ width: '195px', marginTop: '10px', color: '#ddd', backgroundColor: '#dd4b39 ', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.75px', padding: '5px 8px', borderRadius: '2px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><img src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fgoogle-plus.png?alt=media&token=401c95d4-97f2-415f-adf6-f9aa22c148ab" alt="" style={{ width: '25px', marginRight: '9px' }}></img>Login with Google</button></>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
