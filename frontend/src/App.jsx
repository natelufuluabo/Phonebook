import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
// import ContactList from './components/ContactList';
// import AddContactForm from './components/AddContactForm';
import ContactCard from './components/ContactCard';

function App() {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  async function fetchAllContacts() {
    const response = await axios.get("http://localhost:3001/contacts");
    setContacts(response.data);
  }
  async function fetchOneContact() {
    const response = await axios.get("http://localhost:3001/contacts/1");
    setContact(response.data);
  }
  useEffect(() => {
    fetchAllContacts();
    fetchOneContact();
  }, []);
  return (
    <>
      <Navbar />
      {/* <ContactList contacts={contacts} /> */}
      {/* <AddContactForm contacts={contacts} setContacts={setContacts} /> */}
      <ContactCard contact={contact} />
    </>
  )
}

export default App
