/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><i className="fa-solid fa-address-book"></i> PhoneBook</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
