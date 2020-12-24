import React, { useState, useEffect, useRef, useReducer } from "react";
import { PokemonDetailContainer } from "../containers/PokemonDetailContainer";
import Fab from '@material-ui/core/Fab';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import { Box, Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from '@emotion/react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { green, red, yellow } from '@material-ui/core/colors';
import LoadingOverlay from 'react-loading-overlay';
import disableScroll from 'disable-scroll';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4)
  },
  imgButton:{
    width: 250,
    height: 250,
  },
  dialogRoot:{
    borderRadius: '2rem'
  }
}));

const CustomButton = withStyles((theme) => ({
  root: ({value}) => ({
    color: theme.palette.getContrastText("#F0CE00"),
    backgroundColor: "#F0CE00",
    '&:hover': {
      backgroundColor: yellow[600],
    },
    borderRadius: '2rem',
    fontSize: '1em',
    height: 70,
    width: 234,
    disabled: value
  }),
}))(Button);

function ClickableFAB(props) {
  const {children} = props;
  const classes = useStyles();

  return (
      <div className={classes.root}>
          {children}
      </div>
);
}

function PokemonDetail() {
  const classes = useStyles();
  const [open1, setOpen1] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isActive, setActive] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const inputRef = useRef("");
  let pokeObj = {}
  const [inventory, setInventory] = useState([]);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  let timestamp = Date.now();
  timestamp = new Intl.DateTimeFormat('en-US', {day: '2-digit', month: 'long', year: 'numeric', 
  hour: 'numeric', minute: 'numeric', hour12: false}).format(timestamp);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleFailed = () => {
    setOpenFailed(false);
  };
  
  const handleSuccess = () => {
    pokeObj = {
      id: localStorage.getItem("id"),
      pokeName: localStorage.getItem("pokeName"),
      nickName: inputRef.current.value,
      date: timestamp,
      img: localStorage.getItem("pokeImg")
    }
    setInventory( localStorage.getItem("inventory") ? Object.values(JSON.parse(localStorage.getItem("inventory"))).filter(ele => ele.id !== "").concat(pokeObj) : [pokeObj]);
    inputRef.current.value = "";
    forceUpdate();
    setOpenSuccess(false);
  };

  const handleCatch = () => {
    setActive(false);
  };
  useEffect(() => {
    if (!isActive) {
      setTimeout(function(){setActive(true); disableScroll.on();
        if(true){
          setOpenSuccess(true);
        } else {
          setOpenFailed(true);
        }
      }, 1000); 
    }
    if (open1){
      setOpen1(false);
    }
    if(inventory.length > 0){
      
    
      localStorage.setItem("inventory", JSON.stringify(inventory));
    }

  }, [inventory, openSuccess, isActive, disableScroll.off()]);

 


  return (
    <LoadingOverlay
      active={!isActive}
      spinner={<Box mb={4}><Paper elevation={0} css={css`
      width:200px;
      height:200px;
      background: url('/img/pokeball.png') center center/cover no-repeat;`}></Paper></Box>}
      text='Catching...'>
      <PokemonDetailContainer forceUpdate={_}/>
      <ClickableFAB>
      <Fab onClick={handleClickOpen1} variant="round" css={css`
          width:100px;
          height:100px;
          background: url('/img/pokeball.png') center center/cover no-repeat;`}>
      </Fab>
      </ClickableFAB>

      <Dialog 
      classes={{paper: classes.dialogRoot}}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
      TransitionComponent={Transition}
      keepMounted
      open={openSuccess}
      fullWidth={true}>
        <DialogTitle>
        <Box mt={3}>
        <Typography variant="h3" align="center" style={{ color: green[500] }}>
         <CheckCircleIcon fontSize="large" style={{ color: green[500] }} /> Success!
        </Typography>
        </Box>

        <Box my={1}>
        <Typography variant="h5" align="center">
          Congratulations trainer! <strong>{localStorage.getItem("pokeName")}</strong> is yours now
        </Typography>
        </Box>
        <Box my={1}>
        <Typography variant="body1" align="center" css={css`opacity: 0.8`}>
          Give it the best name and make it your greatest partner!
        </Typography>
        </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>

          <Paper
            elevation={0}
            css={css`
              text-align: center;
              border-radius: 2rem;
              `}>
            <img
              src={
                localStorage.getItem("pokeImg")
              }
              css={css`
                width: 150px;
                height: 150px;    
                -webkit-filter: drop-shadow(5px 5px 7px rgba(0, 0, 0, 0.5));
                filter: drop-shadow(5px 5px 7px rgba(0, 0, 0, 0.5));
              `}
            />
          </Paper>    
          
          <Grid container direction="column" alignContent="scretch" justify="center">
            <Grid item xs={12}>
          <Box my={2}>
            <TextField
        placeholder="e.g. Nakama"
        label="Name"  
        fullWidth
        inputRef={inputRef} 
        onChange={(text) => (setBtnDisabled(!text.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        color="secondary"/>
          </Box>
          </Grid>
          </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container direction="column" alignContent="center" justify="center">
            <Grid item xs={12}>
              <Box mb={4}>
              <CustomButton disabled={btnDisabled} onClick={handleSuccess}><Typography 
                css={css`
                  font-weight: 800;
                `}>Done</Typography></CustomButton>   
              </Box>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog 
      classes={{paper: classes.dialogRoot}}
      TransitionComponent={Transition}
      keepMounted
      open={openFailed}
      fullWidth={true}>
        <DialogTitle>
        <Box mt={3}>
        <Typography variant="h3" align="center" style={{ color: red[500] }}>
         <CancelIcon fontSize="large" style={{ color: red[500] }} /> Failed
        </Typography>
          
        </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>

          <Box mb={8}>
          <Typography variant="h4" align="center">
            Oops <strong>{localStorage.getItem("pokeName")}</strong> has run away, better luck next time trainer!
          </Typography>
          </Box>            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container direction="column" alignContent="center" justify="center">
            <Grid item xs={12}>
              <Box mb={4}>
              <CustomButton onClick={handleFailed}><Typography 
                css={css`
                  font-weight: 800;
                `}>Dismiss</Typography></CustomButton>   
              </Box>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog
      fullWidth={true}
        classes={{paper: classes.dialogRoot}}
        open={open1}  
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}>
        <DialogTitle>
          <Box my={3}>
        <Typography variant="h5" align="center">
          Wow.. great choice, trainer! 
        </Typography>
          
        <Typography variant="h5" align="center">
           Ready to catch <strong>{localStorage.getItem("pokeName")}</strong>?
        </Typography>
        </Box>
        <Box my={1}>
        <Typography variant="body1" align="center" css={css`opacity: 0.5`}>
           *Probability rate is 50%
        </Typography>
        </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Paper
            elevation={0}
            css={css`
              text-align: center;
              border-radius: 2rem;
              `}>
            <img
              src={
                localStorage.getItem("pokeImg")
              }
              css={css`
                width: 150px;
                height: 150px;    
                -webkit-filter: drop-shadow(5px 5px 7px rgba(0, 0, 0, 0.5));
                filter: drop-shadow(5px 5px 7px rgba(0, 0, 0, 0.5));
              `}
            />
          </Paper>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container direction="column" alignContent="center" justify="center">
            <Grid item xs={12}>
              <CustomButton onClick={handleCatch}><Typography 
                css={css`
                  font-weight: 800;
                `}>CATCH</Typography></CustomButton>   
            </Grid>
            <Grid item xs={12}>
              <Box mt={2} mb={4}>
                  <Button onClick={handleClose1}>
                    <Typography>I'll come back next time!</Typography>
                  </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      </LoadingOverlay>
  );
}

export default PokemonDetail;
