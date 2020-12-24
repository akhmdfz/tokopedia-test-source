import React, { useState, useEffect }  from "react";
import { getPokemon } from "../services/RestServices";
import { CircularProgress } from "@material-ui/core";
import {useParams} from "react-router-dom";
import {PokemonDetailList} from "../components/PokemonDetailList";


export function PokemonDetailContainer({forceUpdate}) {
    let { id } = useParams();
    const [isSubscribed, setIsSubscribed] = useState(true)
    const [pokemonData, setPokemonData] = useState(null)
    const initialURL = 'https://pokeapi.co/api/v2/pokemon/';


    useEffect(() => {
      const loadPokemonMoves = async (data) => {
        let _pokemonData = await Promise.all(data.moves.map(async x => {
          let pokemonRecord = await getPokemon(x.move.url)
          return pokemonRecord
        }))
        if(isSubscribed){        
          setPokemonData({
            ...data,
            moves_detail: [..._pokemonData]
        });
      }

      }
        async function fetchData() {
          return await getPokemon(initialURL + id);
        }
        fetchData().then( x => {
          loadPokemonMoves(x);

        })
        
        return () => setIsSubscribed(false)
      }, [id, isSubscribed]) 


    return (
        <>
            {pokemonData !== null ? (
                <PokemonDetailList
                    pokemon={pokemonData}
                    forceUpdate={forceUpdate}>

                    </PokemonDetailList>
            ) : <CircularProgress />}
                    
        </>
        
    )
}
