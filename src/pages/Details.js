import axios from "axios";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TitleCase from "react-title-case";
import * as Constants from "./../constants"

const Details = () => {
    const { id } = useParams();
    const [ pokemonInfo, setPokemonInfo ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const getInfo = () => {
            try {
                axios.get(`${ Constants.PokemonInfoBaseUrl }/${ id }/`).then(
                    response => {
                        setPokemonInfo(response.data);
                    }
                );
            } catch (error)  {
                console.error(error);
                setError(error.message);
                setPokemonInfo(null);
            } finally {
                setLoading(false);
            };
        };

        getInfo();
    }, [id]);
    
    return (
        <div className="Details">
            {
                loading && <div>Please wait...</div>
            }
            {
                error && <div>{ `There seems to be a problem fetching Pokemon info - ${ error }`}</div>
            }
            <div className="wrapper">
            {
                pokemonInfo && 
                <>
                    <p>
                        <a href="/" className="btn btn-primary">Back to list</a>
                    </p>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-6">
                            <img src={ pokemonInfo.sprites.other.home.front_default } className="img-fluid rounded-start"
                                alt={ pokemonInfo.name } />
                            </div>
                            <div className="col-md-6">
                            <div className="card-body">
                                <h3 className="card-title">
                                    <TitleCase string={ pokemonInfo.name } />
                                </h3>
                                <div className="card-text">
                                <section>
                                    <h5>Type/s</h5>
                                    <div>
                                    {
                                        pokemonInfo.types?.map(type => 
                                            <span className="badge rounded-pill bg-primary" key={ type.type.name }>
                                                <TitleCase string={ type.type.name } />
                                            </span>
                                        )
                                    }
                                    </div>
                                    <hr />
                                </section>
                                <section>
                                    <h5>Specs</h5>
                                    <p><strong>Height: </strong>{ pokemonInfo.height }</p>
                                    <p><strong>Weight: </strong>{ pokemonInfo.weight }</p>
                                    <hr />
                                </section>
                                <section>
                                    <h5>Abilities</h5>
                                    <div>
                                    {
                                        pokemonInfo.abilities?.map(ability => 
                                            <span className="badge rounded-pill bg-success" key={ ability.ability.name }>
                                                <TitleCase string={ ability.ability.name } />
                                            </span>
                                        )
                                    }
                                    </div>
                                    <hr />
                                </section>
                                <section>
                                    <h5>Moves</h5>
                                    <div>
                                    {
                                        pokemonInfo.moves?.map(move => 
                                            <span className="badge rounded-pill bg-warning text-dark" key={ move.move.name }>
                                                <TitleCase string={ move.move.name } />
                                            </span>
                                        )
                                    }
                                    </div>
                                    <hr />
                                </section>
                                </div>
                                <a href="/" className="btn btn-primary">Back to list</a>
                            </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            </div>
        </div>
    )
}

export default Details;