/*eslint-disable no-unused-vars*/
import React from 'react';
 /*eslint-enable no-unused-vars*/
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import {PokemonsContainer} from "../containers/PokemonsContainer";
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from '@emotion/react'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}));

function ScrollTop(props) {
    const {children, window} = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick}
                role="presentation"
                className={
                    classes.root
            }>
                {children} </div>
        </Zoom>
    );
}

function Home(props) {
    let clearKeys = ["pokeImg", "pokeName", "id"]
    return (
        <>
        {clearKeys.forEach(k =>localStorage.removeItem(k))}
        <Hidden mdDown>
            <div css={
                css `
                    background: url('/tokopedia-test/img/home.png') center center/cover no-repeat;
                    height: 90vh;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    object-fit: contain;
                    `
            }></div>
            </Hidden>

            <Hidden only={['lg', 'xl', 'xs']}>
            <div css={
                css `
                    background: url('/tokopedia-test/img/home-md.png') center center/cover no-repeat;
                    height: 110vh;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    object-fit: contain;
                    `
            }></div>
            </Hidden>
            
            
            <Hidden smUp>
            <div css={
                css `
                    background: url('/tokopedia-test/img/home-xs.png') center center/cover no-repeat;
                    height: 80vh;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    object-fit: contain;
                    `
            }></div>
            </Hidden>
            <Toolbar id="back-to-top-anchor"/>
            <Container maxWidth={'xl'}>
                <PokemonsContainer/>
            </Container>
            <ScrollTop {...props}>
                <Fab color="secondary" size="large" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </>
    );
}

export default Home;
