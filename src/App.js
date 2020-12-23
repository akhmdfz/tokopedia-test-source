import React from 'react';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
import './App.css';
import Navbar from './containers/Navbar';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Pokebag from './pages/Pokebag';
import PokemonDetail from './pages/PokemonDetail';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F0CE00'
        },
        secondary: {
            main: '#F0B000'
        }
    }
});

function App() {
    const client = new ApolloClient({uri: 'https://graphql-pokeapi.vercel.app/api/graphql'});

    return (
        <ThemeProvider theme={theme}>
        {!localStorage.getItem("inventory") && localStorage.setItem("inventory", JSON.stringify([{id: '',pokeName: '', nickName: '', date: '', img: ''}]))}
            <ApolloProvider client={client}>
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/pokebag' component={Pokebag}/>
                        <Route path='/detail/:id/:name' component={PokemonDetail}/>
                    </Switch>
                </Router>
            </ApolloProvider>
        </ThemeProvider>
    );
}

export default App;
