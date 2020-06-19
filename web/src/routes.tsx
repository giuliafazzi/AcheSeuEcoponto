import React, { useDebugValue } from 'react'
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import ProcurarEcopontos from './pages/ProcurarEcopontos';
import CriarEcoponto from './pages/CriarEcoponto';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={ProcurarEcopontos} path="/ecopontos" />
            <Route component={CriarEcoponto} path="/criar-ecoponto" />
        </BrowserRouter>
    );
};

export default Routes;