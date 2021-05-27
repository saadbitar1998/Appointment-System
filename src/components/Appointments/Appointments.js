import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'
import Cookie from "js-cookie";
import Item from './Item';
import './Appointments.css'

const Appointments = (props) => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getUsersAppointments();
    }, [])

    const getUsersAppointments = () => {

        const token = Cookie.get("token"); 
        const userId = Cookie.get("userId");

        fetch('http://localhost:8080/appointments/' + userId, {
            headers: { 
              Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch posts.');
            }
            return res.json();
          })
        .then(resData => {
            console.log(resData);
            setAppointments(resData.appointments);
        })
        .catch(error => {
            console.log(error);
        });
    }


    

    return (
        <div classNameName="container">
            <Navbar {...props}/>

            { 
            appointments.length > 0 ? 
                <table>
                <thead>
                    <tr>
                        <th data-type="text-short">Start Time</th>
                        <th data-type="text-short">End Time</th>
                        <th data-type="text-long">User</th>
                        <th data-type="text-long">Status</th>
                        <th data-type="text-short">Accept</th>
                        <th data-type="text-short">Reject</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map(item => {
                                return (
                                    <Item item={item} />
                                )
                            })

                        }
                    
                    </tbody>
                </table>
                : 
                <p>No Appointments Available</p>
            }

        </div>
    )
}

export default Appointments;
