import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { MovieList, EditMovie, NewMovie, MovieDetails, NotFound } from './pages/index';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header className="p-3 mb-2 header">
        <div className="title">Movie Card Library CRUD</div>
      </header>
      <div className="content text-white">
        <div className="add-btn">
          <Link className="add btn-sm btn-dark text-white" to="/movies/new">
            ADICIONAR CARTÃO
          </Link>
        </div>
        <Switch>
          <Route exact path="/" component={ MovieList } />
          <Route path="/movies/new" component={ NewMovie } />
          <Route path="/movies/:id/edit" component={ EditMovie } />
          <Route path="/movies/:id" component={ MovieDetails } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
