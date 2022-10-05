import React, { useContext, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from './App';
import { useNavigate } from 'react-router-dom';
const auth = getAuth();
export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const context = useContext(AppContext)
  const navigate=useNavigate()

  const login = async () => {
    if (!email || !password) {
      return toast.error('Fill all credentials', {
        duration: 3000,
        style: {
          fontSize: '11.75px',
          fontFamily: 'Poppind'
        },
      });
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        context.setAuth(user.auth)
        localStorage.setItem('auth', JSON.stringify(user.auth))
        navigate('/')
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
    <div className='login' style={{ height: '93vh' }}>
      <Toaster />
      <h4 style={{ marginLeft: '9px', marginTop: '19px', marginBottom: '12px' }}>Login to your account</h4>
      <table style={{ gap: '9px', width: '80%', marginTop: '4.8vh' }}>
        <tr>
          <td><label htmlFor="email" style={{ fontSize: '11.5px' }}>Email:</label></td>
          <td> <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter email' style={{ width: '100%' }} id="email" type="email" /></td>
        </tr>
        <tr>
          <td> <label htmlFor="dencode" style={{ fontSize: '11.5px' }}>Password:</label></td>
          <td> <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter Password' style={{ width: '100%' }} id="dencode" /></td>
        </tr>
        <tr>
          <td> </td>
          <button onClick={() => login()} style={{ color: '#ddd', backgroundColor: 'rgb(56 55 55)', fontFamily: 'Poppins', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '11.05px', padding: '7px 12px', borderRadius: '2px', marginTop: '15px', marginLeft: '9px' }}>Login With Your Account</button>
          <td></td>
        </tr>
      </table>
    </div>
  )
}
