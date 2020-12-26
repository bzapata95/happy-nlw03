import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../services/api';

import mapIcon from "../utils/mapIcon";

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

interface OrphanageState {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageState[]>([]);

  useEffect(() => {
    async function getOrphanages() {
      const response = await api.get('/orphanages');
      setOrphanages(response.data);
    }
    getOrphanages();
  },[])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escoja un orfanato en el mapa</h2>
          <p>
              Muchos niños estan esperando por tu visita :)
          </p>
        </header>

        <footer>
          <strong>Perú</strong>
          <span>Ayacucho, huamanga</span>
        </footer>
      </aside>

      <Map 
          center={[-13.1746934,-74.2296709]}
          zoom={15}
          style={{ width: '100%', height: '100%'}}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude,orphanage.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}

        </Map>

        <Link to="/orphanages/create" className="create-orphanage">
            <FiPlus size={32} color="#fff" />
        </Link>
    </div>
  );
}

export default OrphanagesMap;