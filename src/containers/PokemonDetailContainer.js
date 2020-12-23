import React, { useState, useEffect }  from "react";
import { getPokemon } from "../services/RestServices";
import { CircularProgress } from "@material-ui/core";
import {useParams} from "react-router-dom";
import {PokemonDetailList} from "../components/PokemonDetailList";


export function PokemonDetailContainer() {
    let { id } = useParams();
    let isSubscribed = true
    const [pokemonData, setPokemonData] = useState(null)
    const [loading, setLoading] = useState(true);
    const initialURL = 'https://pokeapi.co/api/v2/pokemon/';

    const loadPokemonMoves = async (data) => {
        let _pokemonData = await Promise.all(data.moves.map(async x => {
          let pokemonRecord = await getPokemon(x.move.url)
          return pokemonRecord
        }))
        if(isSubscribed){        
          setLoading(false);
          setPokemonData({
            ...data,
            moves_detail: [..._pokemonData]
        });
      }

      }
    useEffect(() => {
        async function fetchData() {
          return await getPokemon(initialURL + id);
        }
        fetchData().then( x => {
                loadPokemonMoves(x);

        })
        
        return () => isSubscribed = false
      }, [])

    




    return (
        <>
            {pokemonData !== null ? (
                <PokemonDetailList
                    pokemon={pokemonData}>

                    </PokemonDetailList>
            ) : <CircularProgress />}
                    
        </>
        
    )
}
