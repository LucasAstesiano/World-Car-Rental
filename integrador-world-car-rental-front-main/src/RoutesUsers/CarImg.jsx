import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CarImg = () => {

  const { id } = useParams();
  const [vehicleDetails, setVehicleDetails] = useState();
  const [verMas, setVerMas] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/vehiculo/buscar/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVehicleDetails(data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles del vehículo:', error);
      });
  }, [id]);

  const handleGoBack = () => {
    window.history.back(); // Vuelve a la página anterior
  };

  return (
    <div className='car-img'>
      {vehicleDetails ? (
        <>
          <div className='img-principal'>
            <img src={vehicleDetails.imagen[0]} alt="imagen del vehiculo 1" />
          </div>


          <div className='carimg-grill'>

            <img src={vehicleDetails.imagen[1]} alt="imagen del vehiculo 2" />
            <img src={vehicleDetails.imagen[2]} alt="imagen del vehiculo 3" />
            <img src={vehicleDetails.imagen[3]} alt="imagen del vehiculo 4" />
            <img src={vehicleDetails.imagen[4]} alt="imagen del vehiculo 5" />

          </div>


          <div className='botones-ver-mas'>
            <button onClick={handleGoBack}>
              Volver
            </button>
          </div>

        </>
      ) : (
        <p>Cargando Imágenes</p>
      )}
    </div>
  );
}

export default CarImg;