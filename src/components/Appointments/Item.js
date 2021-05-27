import React, { useState } from 'react';
import './Item.css';
import Cookie from "js-cookie";

const Item = ({item}) => {

    const [appointment, setAppointment] = useState(item);

    console.log(item);

    const decideAppointment = (decision) => {

        const token = Cookie.get("token"); 
        fetch('http://localhost:8080/appointments/edit/' + item._id, {
            method: 'PUT',
            headers: { 
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_accepted: decision
            })
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Creating or editing a post failed!');
            }
            return res.json();
        })
        .then(resData => {
            setAppointment(resData.appointment);
        })

    }

    return (
        <tr>
            <td>{appointment.start_time}</td>
            <td>{appointment.end_time}</td>
            <td>{appointment.buyer}</td>
            <td>{appointment.is_accepted.toString()}</td>
            <td><button className="accept-button" onClick={() => decideAppointment(true)}>Accept</button></td>
            <td><button className="reject-button" onClick={() => decideAppointment(false)}>Reject</button></td>
        </tr>
    )
}

export default Item;
