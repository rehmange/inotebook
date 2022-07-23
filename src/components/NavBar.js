import React  from 'react'
import {Link, useLocation,useHistory} from "react-router-dom";
const NavBar = () => {
  let location = useLocation();
  let history = useHistory()
  const handeleLogout =()=>{
    localStorage.removeItem('token')
    history.push("/login")
  }
    // console.log(location.pathname);
  
  return (
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className={`navbar-brand nav-link  ${location.pathname==="/about"?"active":""} `} to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link  ${location.pathname==="/"?"active":""} `} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link  ${location.pathname==="/about"?"active":""} `} to="/about">about</Link>
        </li>
      </ul>
        {!localStorage.getItem('token')?
        <div>
          <Link className="btn btn-primary mx-1" to="/login" type="submit">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup" type="submit">Sign UP</Link>
        </div>:<button className='btn btn-primary' onClick={handeleLogout}>Log Out</button>}
    </div>
  </div>
</nav>
  )
}

export default NavBar