import React, { useEffect, useContext, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Context } from "../store/appContext";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

export const MapComp = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();
    const mapRef = useRef(null); // Referencia para la instancia del mapa

    let onMapClick = null;

    // Dependiendo de la ruta, define la función para manejar clics en el mapa
    if (location.pathname === '/agregarmascota') {
        onMapClick = (e) => {
            const { lat, lng } = e.latlng;
            actions.setCoords(lng, lat);
            L.popup()
                    .setLatLng(e.latlng)
                    .setContent("Ubicación seleccionada: " + e.latlng.toString() + " Pulsa el boton de enviar abajo para finalizar.")
                    .openOn(mapRef.current);
            // console.log("Ubicación seleccionada:", e.latlng);
        };
    }

    useEffect(() => {
        // Inicializar el mapa solo una vez
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([-32.5, -56], 6);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapRef.current);

            if (onMapClick) {
                mapRef.current.on('click', onMapClick);
            }
        }

        // Eliminar los marcadores anteriores
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapRef.current.removeLayer(layer);
            }
        });

        // Crear un grupo de clúster
        var markers = L.markerClusterGroup({
            showCoverageOnHover: false, // No mostrar cobertura del clúster al pasar el mouse
            zoomToBoundsOnClick: true,  // Zoom cuando se hace clic en el clúster
            maxClusterRadius: 35,       // Reducir el radio del clúster para que se agrupen más fácilmente
            disableClusteringAtZoom: 17, // No agrupar cuando se acerca mucho
            spiderfyOnMaxZoom: true,
            removeOutsideVisibleBounds: true,
            animate:true,
        });

        // Agregar marcadores para cada mascota
        store.mascotas.forEach(mascota => {
            if (mascota.coord_y && mascota.coord_x) {
                const iconUrl = mascota.url_image || 'https://www.shutterstock.com/image-illustration/experience-mesmerizing-world-butterfly-animal-260nw-2355746757.jpg'; // Usa la URL de la imagen de la mascota

                const iconClass = mascota.estado.toLowerCase(); // 'perdido' o 'encontrado'
                
                const marker = L.marker([mascota.coord_y, mascota.coord_x], {
                    icon: L.icon({
                        className: `rounded-icon ${iconClass}`,
                        iconUrl: iconUrl,
                        iconSize: [40, 40], // Ajusta el tamaño según la imagen
                        iconAnchor: [20, 40],
                        popupAnchor: [0, -40]
                    })
                })
                .bindPopup(`<b>${mascota.nombre}</b><br/><b>${mascota.especie_name}</b><br/>${mascota.estado}`);
                markers.addLayer(marker);

            }
        });

        // Añadir el grupo de clúster al mapa
        mapRef.current.addLayer(markers);

    }, [store.mascotas, onMapClick]); // Escuchar cambios en store.mascotas y onMapClick

    return (
        <div className="" style={{ backgroundColor: "#040926", color: "#E0E1DD" }}>
            <div id="map" style={{ height: "300px" }}>
                {/* El mapa se renderizará aquí */}
            </div>
        </div>
    );
};
