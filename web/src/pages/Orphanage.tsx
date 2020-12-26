import React, { useEffect, useState } from "react";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";

import api from "../services/api";

import Sidebar from '../components/Sidebar';
import mapIcon from "../utils/mapIcon";

import "../styles/pages/orphanage.css";

interface Images {
  id: number;
  path: string;
}

interface OrphanageState {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Images[];
}

interface OrphanagesParams {
  id: string;
}

export default function Orphanage() {
  const { id } = useParams<OrphanagesParams>();
  const [orphanage, setOrphanage] = useState<OrphanageState>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function getOrphanages() {
      const response = await api.get(`/orphanages/${id}`);
      setOrphanage(response.data);
    }
    getOrphanages();
  },[id]);

  if(!orphanage) {
    return <p>cargando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
            <img
              src={orphanage.images[activeImageIndex].path}
              alt={orphanage.name}
            />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  className={activeImageIndex === index ? "active" : ""}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.path} alt={orphanage.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude,orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude,orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver ruta en google maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Intrucción para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fin de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  No atendemos <br />
                  fin de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
