/* eslint-disable react/prop-types */
import "../app.scss";
import { useState } from "react";
export default function ContactList({ contacts }) {
    contacts.sort((a, b) => {
        const nameA = a.last_name.toUpperCase();
        const nameB = b.last_name.toUpperCase(); 
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;      
        return 0;
    });
    const [filter, setFilter] = useState("All");
    const contactsToShow = contacts.filter(contact => {
        if (filter === "All") return contact
        return contact.groups.includes(filter);
    })
    return (
        <div className='mx-auto pt-5 px-2 overflow-scroll d-flex flex-column gap-3 listContainer'>
            <h2>All Contacts</h2>
            <div className="d-flex align-items-center gap-2">
                <p className="m-0">Show : </p>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {filter}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a onClick={() => setFilter("All")} className="dropdown-item" href="#">All</a>
                        <a onClick={() => setFilter("Favorites")} className="dropdown-item" href="#">Favorites</a>
                        <a onClick={() => setFilter("Emergency")} className="dropdown-item" href="#">Emergency</a>
                        <a onClick={() => setFilter("Family")} className="dropdown-item" href="#">Family</a>
                        <a onClick={() => setFilter("Friends")} className="dropdown-item" href="#">Friends</a>
                        <a onClick={() => setFilter("Work")} className="dropdown-item" href="#">Work</a>
                    </div>
                </div>
            </div>
            <ul className="list-group list-group-flush">
                {
                    contactsToShow.map(contact => {
                    return (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={contact.id}>
                            {contact.last_name}, {contact.first_name} 
                            <div className='d-flex gap-3'>
                                <i className="fa-solid fa-pen"></i>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                        </li>
                    )
                    })
                }
            </ul>
        </div>
    )
}
