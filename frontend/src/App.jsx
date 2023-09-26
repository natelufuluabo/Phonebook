import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

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
      Hello, world!
    </>
  )
}

export default App
