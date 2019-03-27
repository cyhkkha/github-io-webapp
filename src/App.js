import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Guitar from './components/guitar-fingerboard/index'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <Guitar />
            </div>
        );
    }
}

export default App;
