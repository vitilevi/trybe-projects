import React from 'react'
import Main from './components/Main';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>Curiosity pics from mars!</h1>
        </header>
        <Main />
      </div>
    );
  }
}

export default App;
