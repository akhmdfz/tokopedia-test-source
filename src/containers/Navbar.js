import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import NavBarCollapse from "../components/NavbarCollapse";


export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 300) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    window.addEventListener('scroll', changeBackground);
    
    const CustomTypography = withStyles({
        root: {
            color: "#00478C"
        }
    })(Typography);


    return (
        <React.Fragment>
            <AppBar position="sticky" color={
                    'primary'
                }
                elevation={
                    !navbar ? 0 : 2
            }>
                <Toolbar disableGutters={true}>
                    <Container maxWidth={'xl'}>
                        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item
                                xs={11}>
                                <CustomTypography variant="h4" component="div" noWrap>
                                    <Box fontWeight="fontWeightBold"
                                        ml={2}
                                        mt={3}>
                                        Pokéble
                                    </Box>
                                </CustomTypography>

                                <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                                    <Grid item>
                                        <CustomTypography variant={"subtitle1"}
                                            noWrap>
                                            <Box ml={2}
                                                mb={2}>
                                                <Hidden xsDown>
                                                    Kiblatnya pokemon anak Indonesia
                                                </Hidden>
                                            </Box>
                                        </CustomTypography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item
                                xs={1}>
                                <Hidden xsDown>
                                    <Box ml={2}
                                        mt={3}>
                                        <NavBarCollapse/>
                                    </Box>
                                </Hidden>
                                <Hidden smUp>
                                    <Box ml={2}
                                        mt={1}>
                                        <NavBarCollapse/>
                                    </Box>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
