import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import WelcomePage from './pages/WelcomPage';
import GamePage from './pages/GamePage';

function App() {
	return (
		<div className="App">
			<Router>
				<Route exact path="/" component={WelcomePage} />
				<Route exact path="/game" component={GamePage} />
			</Router>
		</div>
	);
}

export default App;
