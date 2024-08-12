import React from 'react';
import img from '../../assets/CECQIcon.png';


export default function HeaderLogin() {
    return (
<header className="bg-dark text-white">
  <nav className="navbar">
    <div className="row container-fluid">
      <div className="col-1 d-flex align-items-center justify-content-start">
        <div id='imgcecq' className="d-flex align-items-center">
          <img src={img} className="img-fluid" alt="Logo" id="img-icon-brand" />
          <a id="CECQ" href="#">CECQ</a>
        </div>
      </div>
    </div>
  </nav>
</header>
    )
}