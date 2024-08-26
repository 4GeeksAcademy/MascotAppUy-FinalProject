import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/busqueda.css";

const InputBuscar = () => {
    const { store, actions } = useContext(Context);
    const nav = useNavigate();

    //buscador
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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

    const letras = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };


    const handleBuscar = async () => {
        if (query.length > 0) {
            const allResults = await actions.buscar(query);
            nav(`/resultados?query=${encodeURIComponent(query)}`, { state: { results: allResults } });
            setIsDropdownVisible(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita el comportamiento predeterminado del formulario
            handleBuscar();
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

    return (
        
            <div className="input-group mb-3 position-relative">
                    <input
                        type="text"
                        className="form-control"
                        value={query}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
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
                                                <span className="result-location">
                                                    {letras(result.localidad_name)}, {letras(result.departamento_name)}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button className="buscar btn btn-primary" onClick={() => handleBuscar(query)}>Buscar</button>
                </div>
       
    )
}

export default InputBuscar;