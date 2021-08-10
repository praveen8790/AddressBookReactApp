import React, {Component} from 'react';
import deleteIcon from '../assets/icons/delete-black-18dp.svg'
import updateIcon from '../assets/icons/create-black-18dp.svg';
import '../assets/css/dashboard.css'
import AddressbookService from "./service/addressbookService";
import {Person} from "./person";

const Display = (props) =>{
    const deletePerson=(id)=>{
        new AddressbookService().deletePerson(id)
            .then(responseText => {
                window.location.reload();
                window.alert("person Removed Successfully");
            }).catch(error => {
            console.log("Error while Removing the Employee")
        })
    }

    const updatePerson=(person) =>{
        props.onUpdate(person)
    }

    return(
        <tbody>
        <tr>
            <th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>PIN Code</th><th>Mobile Number</th><th>Actions</th>
        </tr>

        {
            props.addressbook.map((person) => (
                <tr key = {person._id}>
                    <td>{person._name}</td>
                    <td>{person._address}</td>
                    <td>{person._city}</td>
                    <td>{person._state}</td>
                    <td>{person._pin}</td>
                    <td>{person._mobile}</td>
                    <td><img src={deleteIcon} className="icon"  alt="delete" onClick={()=>deletePerson(person._id)}/>
                        <img src={updateIcon} className="icon"  alt="edit" onClick={()=>updatePerson(person)}/></td>
                </tr>
            ))
        }
        </tbody>

    )
}

export default Display;