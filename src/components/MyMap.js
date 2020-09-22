import React, { useContext, useRef, useEffect } from "react";
import { Map, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import { Button } from 'react-bootstrap';

import PositionContext from "../context/position/PositionContext";

const MyMap = () => {
  
  //Obtener la posicion
  const PositionsContext = useContext(PositionContext);
  const { currentPosition, UpdatePosition } = PositionsContext;

  const refMarker = useRef(null);
  
  {/*
  useEffect(() => {
    if (isBeingDragged) {
      refMarker.current.leafletElement.openPopup();
    }
  }, [isBeingDragged]);
  */}
  
  //Funcion para alistar la actualizacion de marker
  const ChangeMarker = () => {
    const {lat, lng} = refMarker.current.leafletElement.getLatLng();
    UpdatePosition([lat, lng]);
  }
  
  return (
    currentPosition!==null?
      <Map center={currentPosition} zoom={15}> {/*onClick={event => AddMarker(event.latlng.lat, event.latlng.lng)}>*/}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
            position={currentPosition} 
            draggable 
            ref={refMarker} 
            onDragEnd={ChangeMarker} 
        />
        {/*isBeingDragged? (
            <Marker 
                position={marker.position} 
                name={marker.id} 
                key={marker.id} 
                draggable 
                ref={refMarker} 
                onDragEnd={() => ChangeMarker(marker.id)} 
            >
              <Popup 
                position={marker.position}
              >
                <div className="popup">
                  <p>Posicione el marcador exactamente<br/>
                    donde se encuentra la vivienda<br/> 
                    Luego pulse este botón
                  </p>
                  <div className="btn-popup">
                    <Button variant="success" onClick={ShowModal}>Llenar formulario</Button>
                  </div>
                  <MyModal/>
                </div>
              </Popup>
            </Marker>
        ): null*/}
      </Map>:null    
  );
}

export default MyMap;
