import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from './config';
import { Card } from './Card';


export const User = () => {

  const [data, setData] = useState([])
  const [respUser, setRespUser] = useState(null)
  const params = useParams()
  useEffect(() => {
    const uid = params.uid.split("=")[1]
    setData([])
    async function getUser() {
      const pasteRef = collection(db, "user");
      const q = query(pasteRef, where("uid", "==", uid));
      getDocs(q).then((s) => {
        s.forEach((doc) => {
          const resp = doc.data();
          setRespUser(resp)
        })
      })
    }
    getUser()

  }, [params])

  useEffect(() => {
    if (!respUser) return
    async function get() {
      const refpas = collection(db, "paste");
      const q = query(refpas, where("uid", "==", respUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const resp = doc.data();
        setData((prev) => {
          return [...prev, resp]
        })
      });
    }

    get()
  }, [respUser])

  return (
    <div className='userpage' style={{ height: '93vh' }}>
      <p style={{ marginBottom: '9px', fontSize: '12.5px', fontWeight: 'bold', color: '#ddd', letterSpacing: '0.68px', fontFamily: 'Poppins', marginTop: '39px' }}>User Deatails</p>

      {
        respUser && <div className="sameline" style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', textDecoration: 'none', color: 'inherit', marginTop: '12px' }}>
          <img src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fguest.png?alt=media&token=8e691b33-b1ab-451e-b4d2-0257c76daa52" style={{ width: '75px', marginRight: '18px' }} alt="" />
          <p style={{ fontSize: '13px', marginTop: '9px' }}> Username : <span style={{ fontWeight: 'bold' }}> {respUser.username}</span></p>
        </div>
      }
      <p style={{ marginBottom: '9px', fontSize: '12.5px', fontWeight: 'bold', color: '#ddd', letterSpacing: '0.68px', fontFamily: 'Poppins', marginTop: '39px' }}>Pastes</p>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          data.length !== 0 && data.map((item) =>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '15px' }}>
              <span style={{ marginRight: '8px', marginTop: '-3px' }}>-</span> <Card timestamp={item.timestamp} id={item.id} />
            </div>
          )
        }

      </div>

    </div>
  )
}
