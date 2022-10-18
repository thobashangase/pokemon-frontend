import { React, useState, useEffect } from "react";
import axios from "axios";
import TitleCase from "react-title-case";
import * as Constants from '../constants';

const Home = () => {
    const [pokemons, setPokemons] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = () => {
            try {
                let pokemonInfoRequestData = [];
                let pokemonObjectList = [];

                axios.get(
                    Constants.ApiBaseUrl + "/api/Pokemon"
                ).then((json) => {
                    json.data.forEach((pokemon) => {
                        pokemonInfoRequestData.push(axios.get(pokemon.url));
                    });

                    axios.all(pokemonInfoRequestData).then(
                        axios.spread((...allData) => {
                            allData.forEach((pokemonDataResponse) => {
                                let pokemon = {
                                    id: pokemonDataResponse.data.id,
                                    name: pokemonDataResponse.data.name,
                                    img: pokemonDataResponse.data.sprites.other.home.front_default,
                                    types: pokemonDataResponse.data.types,
                                    url: pokemonDataResponse.data.url
                                };

                                pokemonObjectList.push(pokemon);
                            });
                            
                            setPokemons(pokemonObjectList);
                            setError(null);
                        })
                    );
                });
            } catch(error)  {
                console.error(error);
                setError(error.message);
                setPokemons(null);
            } finally {
                setLoading(false);
            };
        }        

        getData();
    }, []);

    return (
        <div className="Home">
            {
                loading && <div>Please wait...</div>
            }
            {
                error && <div>{ `There seems to be a problem fetching Pokemon data - ${ error }`}</div>
            }
            <div className="wrapper">
            {
                pokemons && pokemons.map(pokemon => 
                    <div className="col-md-6" key={ pokemon.id }>
                        <div className="card mb-3" onClick={() => { window.location.href = `/${ pokemon.id }`; }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-7 col-sm-8">
                                        <h3 className="card-title">
                                            <TitleCase string={ pokemon.name } />
                                        </h3>
                                        <h6>Type/s</h6>
                                        { 
                                            pokemon.types?.map(type => 
                                                <span className="badge rounded-pill bg-primary" key={ type.type.name }>
                                                    <TitleCase string={ type.type.name } />
                                                </span>
                                            )
                                        }
                                    </div>
                                    <div className="col-5 col-sm-4">
                                        <img src={ pokemon.img } className="img-fluid" alt="..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    );
}

export default Home;