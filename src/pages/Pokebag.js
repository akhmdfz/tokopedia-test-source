import React, { useEffect, useReducer, useState } from "react";
import {Container, Box, Divider, Button, Paper } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Color from "color";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Palette } from "react-palette";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from '@emotion/react';
import { blue, red} from '@material-ui/core/colors';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { NavLink } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  actionArea: {
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  media: ({ color }) => ({
    width: "100%",
    height: 0,
    paddingBottom: "100%",
    backgroundColor: color,
  }),
  card: ({ color }) => ({
    borderRadius: 16,
    "&:hover": {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: {
    textAlign: "center",
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: 900,
    color: "#000",
    textTransform: "capitalize",
  },
  subtitle: {
    color: "#000",
    opacity: 0.87,
    marginTop: "0.5rem",
    fontWeight: 500,
    fontSize: 14,
  },
  contentTag: {
    bottom: 0,
    width: "100%",
    zIndex: 1,
    padding: "1rem 0.5rem",
  },
  tag: ({ color }) => ({
    display: "inline-block",
    backgroundColor: color,
    borderRadius: "0.5rem",
    padding: "2px 0.5rem",
    color: "#fff",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    fontSize: 18,
    float: 'right'
  })
}));

const dialogStyle = makeStyles(()=>({
  dialogRoot:{
    borderRadius: '2rem'
  }
}))

const CustomButton = withStyles((theme) => ({
    root: ({colors, bgcolor, width}) => ({
      color: theme.palette.getContrastText(colors),
      backgroundColor: colors,
      '&:hover': {
        backgroundColor: bgcolor[600],
      },
      borderRadius: '2rem',
      fontSize: '0.3em',
      height: 30,
      width: width,
    }),
  }))(Button);



export const Pokebag = React.memo(function Pokebag() {
    const [open, setOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    /*eslint-disable no-unused-vars*/
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    /*eslint-enable no-unused-vars*/
    let addColor = {}
    const handleOpen = (id, color) => {
        setOpen(!open);
        addColor = Object.values(JSON.parse(localStorage.getItem("inventory"))).map((x) => {
            return {
                ...x,
                listId: id,
                color: color
            }
        })
        setSelectedPokemon(addColor[id]);
    }
    const handleClose = () => {
        setOpen(false)
    }
    const releasePokemon = (id) => {
        localStorage.setItem("inventory", JSON.stringify(Object.values(JSON.parse(localStorage.getItem("inventory"))).filter(function (x, i) {return i!==id} )));
        setOpen(false);
        forceUpdate();
    }
    useEffect(() => {
    }, [])
  const Styles = (colors) => useStyles({ color: colors });
  const classes = dialogStyle();
  let clearKeys = ["pokeImg", "pokeName", "id"];
  return (
    <>
      {clearKeys.forEach((k) => localStorage.removeItem(k))}
      <Container maxWidth={"xl"}>
        <Grid container className={Styles.root} spacing={2}>
            <Grid item xs={12}>
                        <Box mt={5}>
                            <Typography variant="h4">
                                My Pokebag content
                            </Typography>
                        </Box>
                        <Box my={3}>
                        <Divider variant="middle" />
                        </Box>
                        </Grid>
          <Grid item xs={12} zeroMinWidth>
            <Grid container justify="center" spacing={4}>
              {Object.values(JSON.parse(localStorage.getItem("inventory"))).filter(ele => ele.id !== "").length > 0 ? (Object.values(JSON.parse(localStorage.getItem("inventory"))).map(
                (x, i) => (
                  <Grid key={i} item xs={8} sm={4} md={3} lg={2}>
                    <Palette src={x.img}>
                      {({ data }) => (
                          <>
                            <CardActionArea
                            className={Styles(data.vibrant).actionArea} onClick={() => handleOpen(i, data.vibrant)}>
                            <Card className={Styles(data.vibrant).card}>
                                <CardMedia className={Styles(data.vibrant).media} image={x.img}>
                                    <div className={Styles(data.vibrant).contentTag}>
                                    <div className={Styles(data.vibrant).tag}>
                                        {("0000" + x.id).slice(-"0000".length)}
                                    </div>
                                    </div>
                                </CardMedia>
                                <CardContent className={Styles(data.vibrant).content}>
                                    <Typography className={Styles(data.vibrant).title} variant={"h2"} noWrap>
                                    {x.pokeName}
                                    </Typography>
                                    <Typography className={Styles(data.vibrant).subtitle}>{x.nickName}</Typography>
                                </CardContent>
                            </Card>
                            </CardActionArea>                        
                        </>
                      )}
                    </Palette>
                  </Grid>
                )
              )) : (<>
                <Box mt={3}>
                    <Typography variant="h2">
                        Go catch some Pokémon!
                    </Typography>
                </Box>
              </>)}
            </Grid>
          </Grid>
        </Grid>
        <Dialog
    fullWidth={true}
      classes={{paper: classes.dialogRoot}}
      open={open}  
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}>
      <DialogTitle css={css`background: ${selectedPokemon.color}`}>
        <Box pt={1}>
      <Typography variant="h5" align="right" css={css`color: #fff; font-weight: 600`}>
      {("0000" + selectedPokemon.id).slice(-"0000".length)}
      </Typography>
      </Box>
      </DialogTitle>
      <DialogContent css={css`background: ${selectedPokemon.color}`}>
        <Paper
          elevation={0}
          css={css`
            text-align: center;
            border-radius: 2rem;
            background: ${selectedPokemon.color};
            `}>
          <img
          alt="high-res-poke-img"
            src={selectedPokemon.img}
            css={css`
              width: 150px;
              height: 150px;    
              -webkit-filter: drop-shadow(5px 5px 7px rgba(0, 0, 0, 0.5));
              filter: drop-shadow(5px 5px 7px rgba(0, 0, 0, 0.5));
            `}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
          <Box pb={4}>
        <Grid container direction="row" alignContent="center" justify="center">
            <Grid item xs={12}>
        <Box pt={1} ml={2}>
        <Typography variant="body1" align="left">
            Original name: <strong>{selectedPokemon.pokeName}</strong>
        </Typography>
        </Box>
        </Grid>
            <Grid item xs={12}>
        <Box pt={1} ml={2}>
        <Typography variant="h4" align="left">
            <strong>{selectedPokemon.nickName}</strong>
        </Typography>
        </Box>
        </Grid>
            <Grid item xs={12}>
        <Box ml={2}>
        <Typography variant="body2" align="left">
            Catched on: {selectedPokemon.date}
        </Typography>
        </Box>
        </Grid>
            <Grid item xs={11} sm={7} md={7} lg={7} xl={7}>
        <Box mx={1} pt={3} >
            <CustomButton colors="#00478C" bgcolor={blue} width={"-webkit-fill-available"} component={NavLink} to={"/tokopedia-test/detail/"+selectedPokemon.id+"/"+selectedPokemon.pokeName}>
            <Typography css={css`
                      display: flex;
                      align-items: center;
                      flex-wrap: wrap;
                      text-transform: capitalize`}>
                See detail <ArrowRightAltIcon css={css`margin-left: 0.4em`}/>
            </Typography>
            </CustomButton>
            </Box>
            </Grid>
            <Grid item xs={11} sm={5} md={5} lg={5} xl={5}>
            <Box mx={1} pt={3} >
            <CustomButton colors="#DB2E2E" bgcolor={red} width={"-webkit-fill-available"} onClick={() => {window.confirm('Sure to release this pokemon?') && releasePokemon(selectedPokemon.listId)}}>
            <Typography css={css`
                      display: flex;
                      align-items: center;
                      flex-wrap: wrap;
                      text-transform: capitalize`}>
                Release
            </Typography>
            </CustomButton>
            </Box>
            </Grid>
        </Grid>
        </Box>
      </DialogActions>
      <Grid container direction="row" alignContent="center" justify="flex-start">
        </Grid>
    </Dialog>
      </Container>
    </>
  );
}
)

export default Pokebag;
