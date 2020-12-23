import React from 'react';
import {Grid, Container} from '@material-ui/core';

function Pokebag() {
    return (
        <>
            <Container maxWidth={'xl'}>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item
                        xs={12}
                        sm={12}
                        md={6}
                        xl={6}>
                        <p>ASD</p>
                    </Grid>
                    <Grid item
                        xs={12}
                        sm={12}
                        md={6}
                        xl={6}>
                        <p>WASD</p>
                    </Grid>
                </Grid>
            </Container>
        </>
    )

}

export default Pokebag;
