import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
// import ContactList from './components/ContactList';
import AddContactForm from './components/AddContactForm';

function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    async function fetchAllContacts() {
      const response = await axios.get("http://localhost:3001/contacts");
      setContacts(response.data);
    }
    fetchAllContacts();
  }, []);
  return (
    <>
      <Navbar />
      {/* <ContactList contacts={contacts} /> */}
      <AddContactForm contacts={contacts} setContacts={setContacts} />
    </>
  )
}

export default App
