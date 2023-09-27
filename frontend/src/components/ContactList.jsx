/* eslint-disable react/prop-types */
export default function ContactList({ contacts }) {
    contacts.sort((a, b) => {
        const nameA = a.last_name.toUpperCase();
        const nameB = b.last_name.toUpperCase(); 
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;      
        return 0;
      });
  return (
    <div className='text-center mx-auto pt-5 px-5 overflow-scroll h-75 w-75 d-flex flex-column align-items-stretch'>
        <h2>All Contacts</h2>
        <ul className="list-group list-group-flush">
            {
                contacts.map(contact => {
                return (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={contact.id}>
                        {contact.last_name}, {contact.first_name} 
                        <div className='d-flex gap-3'>
                            <i className="fa-solid fa-pen"></i>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </li>
                )
                })
            }
        </ul>
    </div>
  )
}
