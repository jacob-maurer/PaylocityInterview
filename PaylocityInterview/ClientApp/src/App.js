import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Employee } from './components/Employee';
import { AddEditEmployeeForm } from './components/AddEditEmployeeForm';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/employees' component={Employee} />
                <Route path='/employee/add' component={AddEditEmployeeForm} />
                <Route path='/employee/edit/:id' component={AddEditEmployeeForm} />
            </Layout>
        );
    }
}
