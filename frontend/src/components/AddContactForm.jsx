/* eslint-disable react/prop-types */
import "../app.scss";
import { useState } from "react";
import axios from "axios";

export default function AddContactForm({ contacts, setContacts }) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        city: "",
        province: "",
        groups: [],
        phone_number: ""
    });
    const handleIputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setFormData({ ...formData, groups: [ ...formData.groups, event.target.value ] });
            return
        } else {
            const index = formData.groups.indexOf(event.target.value);
            if (index !== -1) formData.groups.splice(index, 1);
            return
        }
    }
    const saveNewContact = async () => {
        const response = await axios.post("http://localhost:3001/contacts", formData);
        setContacts(contacts.concat(response.data))
    }
    const handleFormSubmission = async (event) => {
        event.preventDefault();
        await saveNewContact();
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        })
        setFormData({
            first_name: "",
            last_name: "",
            email: "",
            city: "",
            province: "",
            groups: [],
            phone_number: ""
        });
    };
    return (
        <div className="container pt-4 formContainer">
            <h2>Add Contact</h2>
            <form onSubmit={handleFormSubmission}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input onChange={handleIputChange} value={formData.first_name} type="text" className="form-control" name="first_name" id="firstName" placeholder="Enter your first name" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input onChange={handleIputChange} value={formData.last_name} type="text" className="form-control" name="last_name" id="lastName" placeholder="Enter your last name" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input onChange={handleIputChange} value={formData.email} type="email" className="form-control" name="email" id="email" placeholder="Enter your email" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input onChange={handleIputChange} value={formData.city} type="text" className="form-control" name="city" id="city" placeholder="Enter your city" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="province" className="form-label">Province</label>
                    <select onChange={handleIputChange} value={formData.province} className="form-select" name="province" id="province" required>
                        <option value="" selected disabled>Select your province</option>
                        <option value="Alberta">Alberta</option>
                        <option value="British Columbia">British Columbia</option>
                        <option value="Manitoba">Manitoba</option>
                        <option value="New Brunswick">New Brunswick</option>
                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                        <option value="Nova Scotia">Nova Scotia</option>
                        <option value="Ontario">Ontario</option>
                        <option value="Prince Edward Island">Prince Edward Island</option>
                        <option value="Quebec">Quebec</option>
                        <option value="Saskatchewan">Saskatchewan</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Groups</label>
                    <div className="form-check">
                        <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" value="Favorites" id="groupFavorites"/>
                        <label className="form-check-label" htmlFor="groupFavorites">
                            Favorites
                        </label>
                    </div>
                    <div className="form-check">
                        <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" value="Emergency" id="groupEmergency"/>
                        <label className="form-check-label" htmlFor="groupEmergency">
                            Emergency
                        </label>
                    </div>
                    <div className="form-check">
                        <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" value="Family" id="groupFamily"/>
                        <label className="form-check-label" htmlFor="groupFamily">
                            Family
                        </label>
                    </div>
                    <div className="form-check">
                        <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" value="Friends" id="groupFriends"/>
                        <label className="form-check-label" htmlFor="groupFriends">
                            Friends
                        </label>
                    </div>
                    <div className="form-check">
                        <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" value="Work" id="groupWork"/>
                        <label className="form-check-label" htmlFor="groupWork">
                            Work
                        </label>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input onChange={handleIputChange} value={formData.phone_number} type="tel" className="form-control" name="phone_number" id="phoneNumber" placeholder="Enter your phone number" required/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
