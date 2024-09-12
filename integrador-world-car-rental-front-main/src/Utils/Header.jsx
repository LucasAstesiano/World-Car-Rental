import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import { useEffect, useState } from "react";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'react-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Exit from "../RoutesUsers/Exit";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

function Header() {

  const [user, setUser] = useState({})
  const jwt = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  let inicial = "";

  const url = `http://localhost:8080/usuario/buscarEmail?email=${email}`

  const config = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer ' + jwt
    },
  }

  useEffect(() => {
    fetch(url, config)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)
        setUser(data)
        const idUser = data.id
        localStorage.setItem("id", idUser)
      })
  }, [jwt])
  if (user.nombre != null) {
    inicial = (user.nombre[0]).toUpperCase()
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }


  return (
    <section className="head">
      <div className="logo">
        <Link to="/"><img src="../src/Redes/CAR 2@3x.png" alt="Logo" className="" /></Link>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <Link to="/"><li>Inicio</li></Link>
          <Link to="/favorites"><li>Favoritos</li></Link>
          <Link to="/galeries"><li>Galeria</li></Link>
          <Link to="/myreservation"><li>Mis Reservas</li></Link>
          <Link to="/politics"><li>Politicas</li></Link>
        </ul>
      </nav>
      {user.rol === "ADMIN" ? (
        <ul className="admin">
          <Link to="/homeAdmin"><li>Administrar</li></Link>
        </ul>
      ) : (
        <></>
      )}
      {jwt ? (
        <>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <h3 className="user-name" onClick={(e) => { toggleMenu() }}>{inicial}</h3>
            </Dropdown.Toggle>
            {isOpen ?
              <Dropdown.Menu className="menu-user">
                <div className="head-user">
                  <div className="icono-user">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                  </div>
                  <ul className="info-usuario">
                    <li className="username">{user.nombre}</li>
                    <li>{user.dni}</li>
                    <li>{user.rol.toLowerCase()}</li>
                  </ul>
                </div>
                <Dropdown.Item className="item"><Link to='/perfil'><button className="exit">Editar perfil</button></Link></Dropdown.Item>
                <Dropdown.Item className="item"><Link to="/contact"><button className="exit">Ayuda</button></Link></Dropdown.Item>                 
                <Dropdown.Item className="item"><Exit /></Dropdown.Item>
              </Dropdown.Menu> : <></>}
          </Dropdown>
        </>
      ) : (
        <ul className="registro">
          <Link to="/login"><li><button className="headerbutton">Iniciar Sesion</button></li></Link>
          <Link to="/registration"><li><button className="headerbutton">Crear Cuenta</button></li></Link>
        </ul>
      )}

    </section>

  )
}

export default Header;