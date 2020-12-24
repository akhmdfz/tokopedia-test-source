import React from "react";
import Color from 'color';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {Waypoint} from "react-waypoint";
import Skeleton from '@material-ui/lab/Skeleton';
import {Palette} from "react-palette";
import {NavLink} from "react-router-dom";


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    actionArea: {
      borderRadius: 16,
      transition: '0.2s',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    media: ({color}) => ({
      width: '100%',
      height: 0,
      paddingBottom: '100%',
      backgroundColor: color
    }),
    card: ({ color }) => ({
      borderRadius: 16,
      '&:hover': {
        boxShadow: `0 6px 12px 0 ${Color(color)
          .rotate(-12)
          .darken(0.2)
          .fade(0.5)}`,
      },
    }),
    content: {
        textAlign: 'center'
    },
    title: {
      fontSize: '1.1rem',
      fontWeight: 900,
      color: '#000',
      textTransform: 'capitalize',
    },
    subtitle: {
      color: '#000',
      opacity: 0.87,
      marginTop: '0.5rem',
      fontWeight: 500,
      fontSize: 14,
    },  
    contentTag: {
      position: 'flex',
      bottom: 0,
      width: '100%',
      zIndex: 1,
      padding: '1rem 0.5rem',
    },
    tag: ({color}) => ( {
      display: 'inline-block',
      backgroundColor: color,
      borderRadius: '0.5rem',
      padding: '2px 0.5rem',
      color: '#fff',
      marginBottom: '0.5rem',
      fontWeight: "bold",
      fontSize: 18,
      float: 'right'
    }),
  
}));

const CustomCard = ({ classes, image, title, subtitle, id, name, loading }) => {

  return (
    <CardActionArea className={classes.actionArea} component={NavLink} to={"/tokopedia-test/detail/"+id+"/"+name}>
      <Card className={classes.card} >
      {loading ? (<Skeleton animation="wave" variant="rect"/>) : 
      (<CardMedia className={classes.media} image={image}>
            <div className={classes.contentTag}>
        <div className={classes.tag}>{(('0000') + id).slice(-('0000').length)}</div>
      </div>
      </CardMedia>)}
    {
    loading ? (
        <React.Fragment>
            <Skeleton animation="wave"
                height={10}
                style={
                    {marginBottom: 6}
                }/>
            <Skeleton animation="wave"
                height={10}
                style={
                {marginBottom: 6}
            }/>
        </React.Fragment>
    ) : (
        <CardContent className={classes.content} >
          <Typography className={classes.title} variant={'h2'} noWrap>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>)}
      </Card>
    </CardActionArea>
  );
};



export const PokemonList = React.memo(function PokemonLists({pokemons, onLoadMore, loading}){
  const Styles = (colors) => useStyles({color: colors});
  return(
  <div>
  <Grid container
      className={
        Styles.root
      }
      spacing={2}>
      <Grid item
          xs={12} zeroMinWidth>
          <Grid container justify="center"
              spacing={4}>
              {
              pokemons.results.map((x, i) => (
                  <Grid key={
                          x.id
                      }
                      item
                      xs={8}
                      sm={4}
                      md={3}
                      lg={2} >
                      <Palette src={x.image}>
                          {({data}) => (
                            <CustomCard
                            id={x.id}
                            name={x.name}
                            loading = {loading}
                            classes={Styles(data.vibrant)}
                            title={x.name}
                            subtitle={"Owned : " + Object.values(JSON.parse(localStorage.getItem("inventory"))).filter(ele => ele.pokeName === x.name.charAt(0).toUpperCase() + x.name.slice(1)
                            ).length}
                            image={x.image}
                        />              
                          )}
                        </Palette>
                      {
                      i === pokemons.results.length - 10 && (
                          <Waypoint onEnter={
                              () => onLoadMore()
                          }/>
                      )
                  } 
                  </Grid>
              ))} 
              </Grid>
      </Grid>
  </Grid>
</div>
  )
}) 

export default PokemonList;
