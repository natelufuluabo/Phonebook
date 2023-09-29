
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><i className="fa-solid fa-address-book"></i> PhoneBook</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"><i className="fa-solid fa-user"></i> Contacts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa-solid fa-user-group"></i> Groups</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}