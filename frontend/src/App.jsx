import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
      <nav>
        <
      </nav>
      Hello, world!
    </>
  )
}

export default App
