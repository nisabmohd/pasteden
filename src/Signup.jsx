import React, { useContext, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AppContext } from './App';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './config';
import { uid } from 'uid';

const auth = getAuth();
export const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const context = useContext(AppContext)
  const navigate = useNavigate()


  async function signup() {
    if (!email || !password || !username) {
      return toast.error('Fill all credentials', {
        duration: 3000,
        style: {
          fontSize: '11.75px',
          fontFamily: 'Poppind'
        },
      });
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const newEmail = user.auth.currentUser.email
        const data = {
          email: newEmail,
          uid: uid(),
          paste: [],
          username: username
        }
        addDoc(collection(db, "user"), data).then(() => {
          context.setAuth(data)
          localStorage.setItem('auth', JSON.stringify(data))
          navigate('/')
        })
      })
      .catch((error) => {
        const errorMessage = error.message;
        return toast.error(errorMessage, {
          duration: 3000,
          style: {
            fontSize: '11.75px',
            fontFamily: 'Poppind'
          },
        });
      });
  }
  return (
    <div className='signup' style={{ height: '93vh' }}>
      <Toaster />
      <h4 style={{ marginLeft: '9px', marginTop: '19px', marginBottom: '12px' }}>Create a new account</h4>
      <table style={{ gap: '9px', width: '80%', marginTop: '4.8vh' }}>
        <tr>
          <td><label htmlFor="email" style={{ fontSize: '11.5px' }}>Email:</label></td>
          <td> <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter email' style={{ width: '100%' }} id="email" type="email" /></td>
        </tr>
        <tr>
          <td><label htmlFor="username" style={{ fontSize: '11.5px' }}>Username:</label></td>
          <td> <input value={username} onChange={e => setUsername(e.target.value)} placeholder='Enter username' style={{ width: '100%' }} id="username" type="text" /></td>
        </tr>
        <tr>
          <td> <label htmlFor="dencode" style={{ fontSize: '11.5px' }}>Password:</label></td>
          <td> <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter Password' style={{ width: '100%' }} id="dencode" /></td>
        </tr>
        <tr>
          <td> </td>
          <button onClick={() => signup()} style={{ color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.05px', padding: '7px 12px', borderRadius: '2px', marginTop: '15px', marginLeft: '9px' }}>Create New Account</button>
          <td></td>
        </tr>
      </table>
    </div>
  )
}
