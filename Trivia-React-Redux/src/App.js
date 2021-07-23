import React from 'react';
import { Route, Switch } from 'react-router';
import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
import Configuracao from './pages/Configuracao';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/configuracao" component={ Configuracao } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
