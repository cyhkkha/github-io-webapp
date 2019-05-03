import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import FretTrain from './components/guitar/fret-reain';
import NoteTrain from './components/guitar/note-train';
import TablatureTrain from './components/guitar/tablature-train';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Navbar />
                <div className="app-container flex-start">
                    <FretTrain />
                    <NoteTrain />
                    <TablatureTrain />
                </div>
            </div>
        );
    }
}

export default App;
