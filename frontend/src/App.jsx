/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactList from './components/ContactList';
import LoginForm from './components/LoginForm';
import ContactCard from './components/ContactCard';

function App() {
  const [contacts, setContacts] = useState([]);
  async function fetchAllContacts() {
    const response = await axios.get('http://localhost:3000/api/contacts');
    setContacts(response.data);
  }
  useEffect(() => {
    fetchAllContacts();
  }, []);
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<LoginForm />}/>
          <Route path='/contacts' element={<ContactList contacts={contacts} />} />
          <Route path='/contacts/:id' element={<ContactCard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
