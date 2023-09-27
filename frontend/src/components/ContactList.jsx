/* eslint-disable react/prop-types */
export default function ContactList({ contacts }) {
  return (
    <div className='px-5 overflow-scroll h-100'>
        <ul className="list-group list-group-flush">
          {
            contacts.map(contact => {
              return (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={contact.id}>
                  {contact.first_name} {contact.last_name} 
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
