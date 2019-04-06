import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import FretSound from './components/guitar/fret-sound';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Navbar />
                <div className="app-container">
                    <FretSound />
                </div>
            </div>
        );
    }
}

export default App;
