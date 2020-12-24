import React, { useState, useEffect }from "react";
import {
  Grid,
  Typography,
  Container,
  Paper,
  Box,
  CircularProgress
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HistoryIcon from "@material-ui/icons/History";
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { NavLink, useParams } from "react-router-dom";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, ThemeProvider } from "@emotion/react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import { typeLabelColors } from "../helpers/typeColors";
import Chip from '@material-ui/core/Chip';
import { getPokemon } from "../services/RestServices";
import {AutoSizer, Column, Table} from 'react-virtualized';
import 'react-virtualized/styles.css';

function PokemonAbilityContainer({abilityURL}) {
  const [abilityData, setAbilityData] = useState(null)

  useEffect(() => {
    let isSubscribed = true
      async function fetchData() {
        return await getPokemon(abilityURL);
      }
      fetchData().then( x => {
        if(isSubscribed){     
            setAbilityData(x);
        }
    })
      
      return () => isSubscribed = false
    }, [localStorage.getItem("inventory")])


  return (
    <>
      {abilityData !== null ? (
        <>
        {abilityData.effect_entries.map((x) => 
          <Typography variant="body1" key={x.effect} align="justify">
              {x.language.name === "en" && x.effect}
           </Typography>
        )}
        </>
      ) : <CircularProgress />}
    </>
      
  )
}

export const PokemonDetailList = React.memo(function PokemonDetail({pokemon, forceUpdate}) {
  let { id, name } = useParams();
  let typoTheme = responsiveFontSizes(createMuiTheme());
  const [updated, setUpdated] = useState(0);
  useEffect(()=>{
    setUpdated(forceUpdate);
  },[forceUpdate])
  return (
    <>
    {localStorage.setItem("pokeName", name.charAt(0).toUpperCase() + name.slice(1)),
    localStorage.setItem("id", id)}
      <Container maxWidth={"xl"}>
      <Box>
              <Typography
                variant="h4"
                css={css`
                  font-weight: 600;
                  opacity: 0.37;
                  display: inline;
                `}
              >
                {("0000" + id).slice(-"0000".length)}
              </Typography>

              <Typography
                variant="h4"
                css={css`
                  font-weight: 600;
                  display: inline;
                  margin-left: 1rem;
                `}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
            </Box>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={4}>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <Box mt={3}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
              >
                <Grid item xs={12} sm={12}>
                  <Paper
                    elevation={1}
                    css={css`
                      text-align: center;
                      border-radius: 2rem;
                      background: radial-gradient(circle, ${typeLabelColors[pokemon.types[0].type.name]} 15%, ${pokemon.types.length > 1 ? typeLabelColors[pokemon.types[1].type.name] : typeLabelColors[pokemon.types[0].type.name]} 100%);
                    `}
                  >
                    {localStorage.setItem("pokeImg", pokemon.sprites.other["official-artwork"].front_default)}
                    <img
                      src={
                        pokemon.sprites.other["official-artwork"].front_default
                      }
                      css={css`
                        width: 250px;
                        height: 250px;    
                        -webkit-filter: drop-shadow(5px 5px 7px rgba(0, 0, 0, 0.5));
                        filter: drop-shadow(5px 5px 7px rgba(0, 0, 0, 0.5));
                      `}
                    />
                  </Paper>
                </Grid>
                <Box mt={3}>
                  <Grid item xs={12} css={css`
                      display: flex;
                      align-items: center;
                      flex-wrap: wrap;
                    `}>
                  {Object.values(JSON.parse(localStorage.getItem("inventory"))).filter(ele => ele.pokeName === name.charAt(0).toUpperCase() + name.slice(1)
                        ).length > 0 ? (
                          <>
                          
                    <CheckCircleIcon
                      fontSize="large"
                      css={css`
                        color: #2f79d9;
                        display: inline;
                        margin-right: 0.5rem;
                      `}
                    />
                    <ThemeProvider theme={typoTheme}>
                      <Typography
                        variant="h4"
                        css={css`
                          display: inline;
                        `}>
                        {Object.values(JSON.parse(localStorage.getItem("inventory"))).filter(ele => ele.pokeName === name.charAt(0).toUpperCase() + name.slice(1)
                        ).length} in Pokebag
                      </Typography>
                    </ThemeProvider>
                          </>
                        ) : (
                          <>
                          <RemoveCircleIcon
                          fontSize="large"
                          css={css`
                          color: #9ea9b1;
                            display: inline;
                            margin-right: 0.5rem;
                          `} />
                    <ThemeProvider theme={typoTheme}>
                      <Typography
                        variant="h4"
                        css={css`
                        color: #9ea9b1;
                          display: inline;
                        `}>
                          You have none
                      </Typography>
                    </ThemeProvider>                          
                          </>
                        )}
                  </Grid>
                </Box>
                <Box mt={1}>
                  <Grid
                    item
                    xs={12}
                    css={css`
                      display: flex;
                      align-items: center;
                      flex-wrap: wrap;
                    `}
                  >
                    <HistoryIcon
                      css={css`
                        margin-right: 0.5rem;
                      `}
                    />
                    <ThemeProvider theme={typoTheme}>
                      <Typography
                        variant="h5"
                        css={css`
                          margin-right: 0.5rem;
                        `}
                      >
                        Last Catch:
                      </Typography>
                      <Typography
                        variant="h6"
                        css={css`
                          opacity: 0.7;
                        `}
                      >
                  {Object.values(JSON.parse(localStorage.getItem("inventory"))).filter(ele => ele.pokeName === name.charAt(0).toUpperCase() + name.slice(1)).length > 0 ? (
                          <>
                          {Object.values(JSON.parse(localStorage.getItem("inventory"))).sort((a,b) => {return new Date(b.date) - new Date(a.date)}).filter(ele => ele.pokeName === name.charAt(0).toUpperCase() + name.slice(1))[0].date}
                          </>
                        ) : (
                          <>
                          N/A
                          </>
                        )}      
                      </Typography>
                    </ThemeProvider>
                  </Grid>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6}>
          <Box mt={3}>
              <Typography
                variant="h4"
                css={css`
                  font-weight: 600;
                  display: inline;
                `}
              >
                Type
              </Typography>
            </Box>
            <Box mt={1}>
                {pokemon.types.map((x) => 
                    <Chip component={Typography} label={x.type.name.charAt(0).toUpperCase() + x.type.name.slice(1)} 
                    css={css`color: white; margin-right: 0.4rem; font-size: 1em; background-color: ${typeLabelColors[x.type.name]}`}/>

                )}                
            </Box>

            <Box mt={5}>
              <Typography
                variant="h4"
                css={css`
                  font-weight: 600;
                  display: inline;
                `}
              >
                Abilities & Skills
              </Typography>
            </Box>         

            {pokemon.abilities.map((x) =>
            <>
            <Box mt={1} css={css`
                      display: flex;
                      align-items: center;
                      flex-wrap: wrap;`}>
              <OfflineBoltIcon css={css`margin-right: 0.5rem; color: #2f79d9;`}/>
              <Typography variant="h6" css={css`font-style: italic; font-weight: 600`}>
                  {x.ability.name.charAt(0).toUpperCase() + x.ability.name.slice(1)}
              </Typography>
            </Box>
            
            <Box ml={4}>
                <PokemonAbilityContainer abilityURL={x.ability.url} />
            </Box>   
            </>
            )}
            
            <Box my={2}>
                    <NavLink to="/pokebag">
                      <Typography
                        css={css`
                          font-weight: 600;
                          display: flex;
                          flex-wrap: wrap;
                          float: right;
                        `}
                      >
                        Check My {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
                        <ChevronRightIcon />
                      </Typography>
                    </NavLink>
                  </Box>                   
          </Grid>
        </Grid>
        <Box my={3}>
        <Divider variant="middle" />
        </Box>
        <Box mt={2}>
          
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center">
            <Grid item xs={12}>
            <Box mt={1}>
              <Typography
                variant="h4"
                css={css`
                  font-weight: 600;
                  display: inline;
                `}>
                Moves
              </Typography>
            </Box>         
            </Grid>
            <Grid item xs={12}>
  <Box mt={2}>
    <AutoSizer disableHeight>
      {({width}) => (

<Table     
  width={width}
  height={300}
  headerHeight={40}
  rowHeight={50}
  rowStyle={{alignItems: "stretch"}}
  rowCount={pokemon.moves.length}
  rowGetter={({index}) => pokemon.moves_detail[index]}>
    <Column flexGrow={1} label="Name" width={50} dataKey="name" headerRenderer={({label}) => <Typography css={css`font-weight: 600;`}>{label}</Typography>} cellRenderer={({rowData})=> <Typography variant="caption">{rowData.name.charAt(0).toUpperCase() + rowData.name.slice(1)}</Typography>}/>
    <Column flexGrow={1} label="Class" width={50} dataKey="class" headerRenderer={({label}) => <Typography css={css`font-weight: 600;`}>{label}</Typography>} cellRenderer={({rowData})=><Typography variant="caption">{rowData.damage_class.name.charAt(0).toUpperCase() + rowData.damage_class.name.slice(1)}</Typography>}/>
    <Column flexGrow={1} label="Type" width={50} dataKey="type" headerRenderer={({label}) => <Typography css={css`font-weight: 600; `}>{label}</Typography>} cellRenderer={({rowData})=> <Chip component={Typography} label={rowData.type.name.charAt(0).toUpperCase() + rowData.type.name.slice(1)} 
    css={css`color: white; font-size: 1em; background-color: ${typeLabelColors[rowData.type.name]}`}/>}/>
</Table>
      )}
        </AutoSizer>
        </Box>
        </Grid>
        </Grid>
        </Box>
      
      </Container>
    </>
  );
});

export default PokemonDetailList;
