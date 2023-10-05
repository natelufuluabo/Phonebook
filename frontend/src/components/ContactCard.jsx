/* eslint-disable react/prop-types */
import "../app.scss";
import { useState } from "react";
import EditContatForm from "./EditContatForm";
import axios from "axios";

export default function ContactCard({ contact, setContact }) {
    const [editing, setEditing] = useState(false);
    const handleDelete = async () => {
        const response = await axios.delete(`http://localhost:3000/api/contacts/${contact._id}`);
        console.log(response.data);
    }
    return (
        <>
            {
                !editing &&
                <div className="cardContainer">
                    <a href="#"><i className="fa-solid fa-arrow-left"></i> Contact List</a>
                    <div className="cardBody">
                        <h2 className="cardTitle">Contact Card</h2>
                        <p className="cardText m-0"><span><strong>First Name:</strong> {contact.first_name}</span></p>
                        <p className="cardText m-0"><span><strong>Last Name:</strong> {contact.last_name}</span></p>
                        <p className="cardText m-0"><span><strong>Email:</strong> {contact.email}</span></p>
                        <p className="cardText m-0"><span><strong>City:</strong> {contact.city}</span></p>
                        <p className="cardText m-0"><span><strong>Province:</strong> {contact.province}</span></p>
                        <p className="cardText m-0"><span><strong>Groups:</strong> {contact.groups.join(", ")}</span></p>
                        <p className="cardText m-0"><span><strong>Phone:</strong> {contact.phone_number}</span></p>
                        <div className="d-flex align-items-center gap-2">
                            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                            <button onClick={() => setEditing(true)} className="btn btn-info">Edit</button>
                        </div>
                    </div>
                </div>
            }
            { editing && <EditContatForm contact={contact} setEditing={setEditing} setContact={setContact} /> }
        </>
    )
}
