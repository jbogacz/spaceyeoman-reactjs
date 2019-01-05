// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES

import { Header } from '../Header';
import { Footer } from '../Footer';
import { HomePage } from '../pages/HomePage';
import { BuyPage } from '../pages/BuyPage';
import { MyPage } from '../pages/MyPage';

// COMPONENT

export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Header />
            <Switch>
                <Route path='/' component={HomePage} exact={true} />
                <Route path='/buy' component={BuyPage} />
                <Route path='/my' component={MyPage} />
                <Redirect to="/" />
            </Switch>
            <Footer />
        </Fragment>
    </BrowserRouter>
);