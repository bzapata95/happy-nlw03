import React from 'react';
import { FiPlus } from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg} alt="Happy"/>

                <h2>Escoga un orfanato en el mapa</h2>
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
        </Map>

        <Link to="" className="create-orphanage">
            <FiPlus size={32} color="#fff" />
        </Link>
    </div>
  );
}

export default OrphanagesMap;