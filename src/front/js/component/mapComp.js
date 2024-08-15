import React, { useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

export const MapComp = () => {
    const { store } = useContext(Context);
    const mapRef = useRef(null); // Referencia para la instancia del mapa

    useEffect(() => {
        // Inicializar el mapa solo una vez
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([-32.5, -56], 6);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapRef.current);

            // Evento de clic en el mapa
            mapRef.current.on('click', (e) => {
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(mapRef.current);
            });
        }

        // Eliminar los marcadores anteriores
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapRef.current.removeLayer(layer);
            }
        });

        // Agregar marcadores para cada mascota
        store.mascotas.forEach(mascota => {
            if (mascota.coord_y && mascota.coord_x) {
                L.marker([mascota.coord_y, mascota.coord_x])
                    .addTo(mapRef.current)
                    .bindPopup(`<b>${mascota.nombre}</b><br/><b>${mascota.especie_name}</b><br/>${mascota.estado}`);
            }
        });

    }, [store.mascotas]); // Escuchar cambios en store.mascotas

    return (
        <div className="" style={{ backgroundColor: "#040926", color: "#E0E1DD" }}>
            <div id="map" style={{ height: "300px" }}>
                {/* El mapa se renderizará aquí */}
            </div>
        </div>
    );
};
