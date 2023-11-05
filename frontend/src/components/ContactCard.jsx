/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import '../app.scss';
import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import EditContatForm from './EditContatForm';
import axios from 'axios';

export default function ContactCard() {
  const [editing, setEditing] = useState(false);
  const [contact, setContact] = useState({});
  const {id} = useParams();
  const handleDelete = async () => {
    const response = await axios.delete(`http://localhost:3000/api/contacts/${contact._id}`);
    console.log(response.data);
  };
  async function fetchOneContact() {
    const response = await axios.get(`http://localhost:3000/api/contacts/${id}`);
    setContact(response.data);
  }
  const groupSetence = () => {
    let sentence = '';
    for (let i = 0; i < contact.groups.length; i++) {
      sentence += ` ${contact.groups[i]},`;
    }
    return sentence;
  };
  useEffect(() => {
    fetchOneContact();
  }, []);
  return (
    <>
      {
        !editing &&
                <div className="cardContainer">
                  <Link to="/contacts"><i className="fa-solid fa-arrow-left"></i> Contact List</Link>
                  <div className="cardBody">
                    <h2 className="cardTitle">Contact Card</h2>
                    <p className="cardText m-0"><span><strong>First Name:</strong> {contact.first_name}</span></p>
                    <p className="cardText m-0"><span><strong>Last Name:</strong> {contact.last_name}</span></p>
                    <p className="cardText m-0"><span><strong>Email:</strong> {contact.email}</span></p>
                    <p className="cardText m-0"><span><strong>City:</strong> {contact.city}</span></p>
                    <p className="cardText m-0"><span><strong>Province:</strong> {contact.province}</span></p>
                    <p className="cardText m-0"><span><strong>Groups:</strong> {groupSetence()}</span></p>
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
  );
}
