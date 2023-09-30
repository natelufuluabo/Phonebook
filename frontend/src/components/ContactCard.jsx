/* eslint-disable react/prop-types */
import "../app.scss";

export default function ContactCard({ contact }) {
    return (
        <div className="cardContainer">
            <a href="#"><i className="fa-solid fa-arrow-left"></i> Contact List</a>
            <div className="cardBody">
                <h2 className="cardTitle">Contact Card</h2>
                <p className="cardText m-0"><span><strong>First Name:</strong> {contact.first_name}</span> <button><i className="fa-solid fa-pen"></i></button></p>
                <p className="cardText m-0"><span><strong>Last Name:</strong> {contact.last_name}</span> <button><i className="fa-solid fa-pen"></i></button></p>
                <p className="cardText m-0"><span><strong>Email:</strong> {contact.email}</span> <button><i className="fa-solid fa-pen"></i></button></p>
                <p className="cardText m-0"><span><strong>City:</strong> {contact.city}</span> <button><i className="fa-solid fa-pen"></i></button></p>
                <p className="cardText m-0"><span><strong>Province:</strong> {contact.province}</span> <button><i className="fa-solid fa-pen"></i></button></p>
                <p className="cardText m-0"><span><strong>Groups:</strong> {contact.groups.join(", ")}</span> <button><i className="fa-solid fa-pen"></i></button></p>
                <p className="cardText m-0"><span><strong>Phone:</strong> {contact.phone_number}</span> <button><i className="fa-solid fa-pen"></i></button></p>
                <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-danger">Delete</button>
                    <button className="btn btn-info" disabled>Save</button>
                </div>
            </div>
        </div>
    )
}
