/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
// import ContactList from './components/ContactList';
import LoginForm from './components/LoginForm';
// import AddContactForm from './components/AddContactForm';
// import ContactCard from './components/ContactCard';

function App() {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  // async function fetchAllContacts() {
  //   const response = await axios.get('http://localhost:3000/api/contacts');
  //   setContacts(response.data);
  // }
  // async function fetchOneContact() {
  //   const response = await axios.get('http://localhost:3000/api/contacts/651e065dfc550e6738de091b');
  //   setContact(response.data);
  // }
  // useEffect(() => {
  //   fetchAllContacts();
  //   fetchOneContact();
  // }, []);
  return (
    <>
      <Navbar />
      <LoginForm />
      {/* <ContactList contacts={contacts} /> */}
      {/* <AddContactForm contacts={contacts} setContacts={setContacts} /> */}
      {/* <ContactCard contact={contact} setContact={setContact} /> */}
    </>
  );
}

export default App;
