// READ, DELETE Towns

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Towns() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [towns, setTowns] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/town")
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result); // <--- check this out in the console
                    setTowns(result);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            );
    }, []);

    function deleteTown(id) {
        fetch("http://127.0.0.1:8000/api/town/" + id, { method: "DELETE" })
        .then(
            (response) => {
                console.log(response);
                if (response.status === 204) {
                    const remaining = towns.filter((p) => id !== p.id);
                    setTowns(remaining);
                    alert("Deleted successful.");
                } else {
                    alert("Delete not successful, because this town has asigned customers. Please delete customers first.");
                }
            }
        );
    }

    const editTown = id => {
        window.location = '/editTown/' + id
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <button className="btn btn-dark addbtn">
                    <Link className="link" to="/addTown">
                        <FontAwesomeIcon icon="fa-solid fa-plus" />
                        Add Town
                    </Link>
                </button>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Town ID</th>
                                <th>Town</th>
                                <th>Distance km</th>
                                <th>Days</th>
                                <th>Price EUR</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {towns.map((town) => (
                                <tr key={town.id}>
                                    <td>{town.id}</td>
                                    <td>{town.town_title}</td>
                                    <td>{town.distance}</td>
                                    <td>{town.days}</td>
                                    <td>{town.price}</td>
                                    <td>{town.title}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteTown(town.id)}
                                            className="btn btn-dark">
                                            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                                            Delete
                                        </button>
                                        <button onClick={() => editTown(town.id)} 
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

export default Towns;
