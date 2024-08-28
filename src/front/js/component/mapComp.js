import React, { useEffect, useContext, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Context } from "../store/appContext";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import imagenDefault from "/workspaces/MascotAppUy-FinalProject/src/front/img/logo mactopapp oscuro.png"

export const MapComp = ({ selectedDepartmentCoords, selectedLocalityCoords, mapHeight, mapWidth, mapZoom, mascotaCoords }) => {
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
                    .setContent("Ubicación seleccionada. Pulsa el boton de ENVIAR arriba para publicar.")
                    .openOn(mapRef.current);
            // console.log("Ubicación seleccionada:", e.latlng);
        };
    }

    useEffect(() => {
        // Inicializar el mapa solo una vez
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([-32.5, -56], mapZoom);
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
                const iconUrl = mascota.url_image || imagenDefault; // Usa la URL de la imagen de la mascota

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
                .bindPopup(`
                        <div style="text-align: center;">
                            <b>${mascota.nombre}</b><br/>
                            <img src="${mascota.url_image}" alt="${mascota.nombre}" style="width:100px;height:auto; margin: 7px;"><br/>
                            Es un ${mascota.especie_name} ${mascota.estado}<br/>
                            en ${mascota.localidad_name}<br/>
                            el día ${mascota.fecha_perdido}<br/>
                            <a href="/mascota/${mascota.id}" class="nav-link">
                            <button type="button" style="background-color: #007bff; color: white; border: none; padding: 1px 5px; border-radius: 5px;">Más datos</button>
                            </a>
                        </div>
                    `);
                markers.addLayer(marker);

            }
        });

        // Añadir el grupo de clúster al mapa
        mapRef.current.addLayer(markers);

        // Manejo del zoom en base a la selección
        if (selectedLocalityCoords) {
            const { coord_x, coord_y } = selectedLocalityCoords;
            mapRef.current.setView([coord_y, coord_x], 12); // Ajusta el zoom según necesites
        } else if (selectedDepartmentCoords) {
            const { coord_x, coord_y } = selectedDepartmentCoords;
            mapRef.current.setView([coord_y, coord_x], 8); // Ajusta el zoom según necesites
        } else if (mascotaCoords) {
            const { coord_x, coord_y } = mascotaCoords;
            mapRef.current.setView([coord_y, coord_x], mapZoom);
        }

    }, [store.mascotas, onMapClick, selectedDepartmentCoords, selectedLocalityCoords, mascotaCoords, mapZoom]);


    return (
        <div className="d-flex justify-content-center" style={{ height: '100%', width: '100%' }}>
            <div id="map"
              style={{ height: mapHeight, width: mapWidth  }}
              >
                {/* El mapa se renderizará aquí */}
            </div>
        </div>
    );
};
