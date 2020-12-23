import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMONS } from "../services/GqlServices";
import PokemonList from "../components/PokemonsList";
import { CircularProgress } from "@material-ui/core";

export function PokemonsContainer() {
    const { error: listPokemonError, loading: listPokemonLoading, data: listPokemondata, fetchMore: listPokemonFetch, networkStatus: listPokemonNetwork } = useQuery(GET_POKEMONS, {
      variables: { limit: 19 },
      notifyOnNetworkStatusChange: true
    });
    if(listPokemonError) return <div>errors</div>;
    if(!listPokemondata) return <CircularProgress />


    return (
        <div>
            {listPokemondata.pokemons.results && (
            <PokemonList 
                loading = {listPokemonLoading}
                pokemons={listPokemondata.pokemons || []} 
                onLoadMore= {() => 
                    listPokemonFetch({
                        variables: {
                            limit: 19,
                            offset: listPokemondata.pokemons.results.length + 1
                        },
                        updateQuery: (prev, {fetchMoreResult}) => {
                            if(!fetchMoreResult) return prev;
                            return {
                                pokemons: {
                                    __typename: "PokemonList",
                                    isLoading: true,
                                    results: [...prev.pokemons.results, ...fetchMoreResult.pokemons.results]
                                }
                            }
                        }
                    })}/>
                    )}
                    
                    {listPokemonNetwork === 3 && <CircularProgress />}
        </div>
        
    )
}
