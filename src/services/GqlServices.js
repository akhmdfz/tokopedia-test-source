import gql from "graphql-tag";


export const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int){
        pokemons(limit: $limit, offset: $offset){
            results{
                id
                name
                image
                url
            }            
        }
    }
`

export const GET_POKEMON = gql`
    query pokemon($name: String!){
        pokemon(name: $name) {
            sprites{
                front_default
            }            
            moves {
                move {
                    name
                    url
                }
            }
            types {
                slot
                type {
                    name 
                    url
                }
            }            
        }
    }
`