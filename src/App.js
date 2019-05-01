import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import FretSound from './components/guitar/fret-sound';
import StringTrain from './components/guitar/string-train';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Navbar />
                <div className="app-container flex-start">
                    <FretSound />
                    <StringTrain />
                </div>
            </div>
        );
    }
}

export default App;
