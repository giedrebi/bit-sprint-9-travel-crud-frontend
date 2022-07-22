// READ, DELETE Countries

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Countries() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries();
    }, [])
    function getCountries() {
        fetch("http://127.0.0.1:8000/api/country")
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result); // <--- check this out in the console
                    setCountries(result);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            );
    }

    function deleteCountry(id) {
        fetch("http://127.0.0.1:8000/api/country/" + id, { method: "DELETE" })
            .then((response) => {
                if (response.status === 204) {
                    const remaining = countries.filter((p) => id !== p.id);
                    setCountries(remaining);
                    alert("Deleted successful.");
                }
            }
        );
    }

    const editCountry = id => {
        window.location = '/editCountry/' + id
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <button className="btn btn-dark addbtn">
                    <Link className="link" to="/addCountry">
                        <FontAwesomeIcon icon="fa-solid fa-plus" /> 
                        Add Country
                    </Link>
                </button>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Country ID</th>
                                <th>Country</th>
                                <th>Weather of seasons</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {countries.map((country) => (
                                <tr key={country.id}>
                                    <td>{country.id}</td>
                                    <td>{country.title}</td>
                                    <td>{country.season_weather}</td>
                                    <td>
                                        <button onClick={() => deleteCountry(country.id)}
                                            className="btn btn-dark">
                                            <FontAwesomeIcon icon="fa-solid fa-trash-can" /> 
                                            Delete
                                        </button>
                                        <button onClick={() => editCountry(country.id)} 
                                            className="btn btn-dark">
                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Countries;
