import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/busqueda.css";
import { Link as ScrollLink } from "react-scroll";
import Swal from 'sweetalert2';

export const Busqueda = () => {
    const { store, actions } = useContext(Context);
    const nav = useNavigate();

    //buscador
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handlePublicar = () => {
        store.user ? nav("/agregarmascota") : Toast.fire({
            icon: "error",
            title: "Debes estar logueado para publicar.",
            showConfirmButton: false
        });
    };

    // Maneja la búsqueda en tiempo real
    const handleChange = async (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.length > 0) {
            const allResults = await actions.buscar(newQuery);
            setResults(allResults.slice(0, 4)); // Limita a las primeras 4 coincidencias
            setIsDropdownVisible(true);
        } else {
            setResults([]);
            setIsDropdownVisible(false);
        }
    };

    // Maneja el clic fuera del dropdown para ocultarlo
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.input-group') && !e.target.closest('.dropdown-menu')) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleBuscar = async () => {
        if (query.length > 0) {
            const allResults = await actions.buscar(query);
            nav(`/resultados?query=${encodeURIComponent(query)}`, { state: { results: allResults } });
        }
    };

    return (
        <div className="busqueda-container row py-lg-5">
            <style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')</style>
            <div className="col-lg-6 col-md-8 mx-auto text-center">
                <h1 className="mb-5 pb-5">Bienvenidos a MascotApp</h1>
                <h3 className="fw-light mb-4">¿Perdiste a tu mascota?</h3>

                <div className="input-group mb-3 position-relative">
                    <input
                        type="text"
                        className="form-control"
                        value={query}
                        onChange={handleChange}
                        placeholder="Perro, gato, raza, localidad, departamento"
                    />
                    {isDropdownVisible && results.length > 0 && (
                        <div className="dropdown-menu position-absolute">
                            <ul>
                                {results.map(result => (
                                    <li key={result.id}>
                                        <Link to={`/mascota/${result.id}`} onClick={() => setQuery('')}>
                                            <div className="dropdown-item">
                                                <span className="result-name">{result.nombre}</span>
                                                <span className="result-localidad">{result.localidad_name}, {result.departamento_name}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button className="buscar btn btn-primary" onClick={() => handleSearch(query)}>Buscar</button>
                </div>

                <div className="divider-container mb-4 mt-5">
                    <hr className="divider-line" />
                    <span className="divider-text fs-6 fw-lighter">O también puedes</span>
                    <hr className="divider-line" />
                </div>

                <div className="boton-container row mb-4 mt-5">
                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                        <button onClick={handlePublicar} className="boton-publicar btn btn-primary w-100">Publicar</button>
                    </div>
                    <div className="col-12 col-md-6">
                        <Link to="/" className="boton-adoptar btn btn-secondary w-100">Adoptar</Link>
                    </div>
                </div>

                <div className="explorar-container text-center mt-5">
                    <ScrollLink
                        to="explorar"
                        smooth={true}
                        duration={300}
                        className="explorar-link"
                    >
                        <div className="explorar-arrow"><i className="fa-solid fa-chevron-down"></i></div>
                    </ScrollLink>
                </div>
            </div>
        </div>
    );
};