import React from 'react'
import { Link } from 'react-router-dom'

export const Card = (props) => {
    return (
        <Link to={`/${props && props.id}`} className='card-paste' style={{ fontSize: '12px', display: 'flex', flexDirection: 'row', textDecoration: 'none', color: 'inherit',}}>
            <p><span style={{ fontWeight: 'bold' }}>Paste ID :</span> {props && props.id}</p>
            <span style={{ marginRight: '12px' }}></span>
            <p><span style={{ fontWeight: 'bold' }}>Date :</span> {props && props.timestamp.slice(0,24)}</p>
        </Link>
    )
}
