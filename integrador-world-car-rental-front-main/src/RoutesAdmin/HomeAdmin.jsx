import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomeAdmin = () => {

  
  const [user,setUser]= useState({})
  const jwt= localStorage.getItem('token')
  const email=localStorage.getItem('email')
  
  
  const url=`http://localhost:8080/usuario/buscarEmail?email=${email}`
  
  const config={
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8','Authorization': 'Bearer ' + jwt
    },
  }
  
  useEffect(()=>{
      fetch(url,config)
    .then(response =>{
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);    
      setUser(data)
      console.log(user.rol);
    })
    }, []) 
  



  return (
    <section className='home-admin'>
      {jwt && (user.rol==="ADMIN") ?
      <>
        <h2>Administración</h2>
        <div className='admin-list'>
          <ul>
            <li><Link to="/add"><p>AGREGAR VEHICULO</p></Link></li>
            <li><Link to="/edit"><p>EDITAR VEHICULO</p></Link></li>
            <li><Link to="/listuser"><p>ADMINISTRAR USUARIOS</p></Link></li>
            <li><Link to="/list"><p>LISTA DE VEHICULOS</p></Link></li>          
          </ul>
        </div>
      </>
        :
        <h1>NO TIENES ACCESO A ESTA PAGINA</h1>
      }
    </section>
  )
}

export default HomeAdmin