import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class WelcomPage extends Component {
	render() {
		return (
			<div className="background">
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<h1 style={{ fontSize: '70px', fontWeight: 'bold' }}>Welcome to cards game</h1>
				<Button
					style={{ fontSize: '30px' }}
					color="black"
					onClick={() => {
						window.location.assign('/game');
					}}
				>
					Start the Game
				</Button>
			</div>
		);
	}
}

export default WelcomPage;
