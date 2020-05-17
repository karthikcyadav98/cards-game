import React, { Component } from 'react';
import { Grid, Segment, Header, Divider, Button, Modal, Radio, Select, Image } from 'semantic-ui-react';
import Club from '../img/club.jpg';
import Spade from '../img/spade.jpg';
import Heart from '../img/heart.jpg';
import Diamond from '../img/diamond.png';

class GamePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Deck: [ { key: 1, denom: 1, suit: 'heart', color: 'red' } ],
			suits: [
				{ key: 1, value: 'heart', text: 'heart', color: 'red' },
				{ key: 2, value: 'diamond', text: 'diamond', color: 'red' },
				{ key: 3, value: 'club', text: 'club', color: 'black' },
				{ key: 4, value: 'spade', text: 'spade', color: 'black' }
			],
			color: [ { key: 1, value: 'red', text: 'red' }, { key: 2, value: 'black', text: 'black' } ],
			player1Moves: [],
			player2Moves: [],
			activePlayer1Moves: [],
			activePlayer2Moves: [],
			playerDisplay: true,
			open: false,
			anyCard: true,
			suitCard: false,
			colorCard: false,
			colorValue: '',
			suitValue: ''
		};
	}

	//Lifecycle method
	async componentDidMount() {
		let deckCards = [ {} ];
		var k = 0;
		var id = 1;

		await this.state.suits.map((suit) => {
			for (let i = 0; i < 13; i++) {
				deckCards.push({
					key: k + 1,
					denom: i + 1,
					suit: suit.value,
					color: suit.color,
					colorId: id < 27 ? id++ : (id = 1)
				});
				k++;
				if (id == 27) {
					id = 1;
				}
			}
		});

		await this.setState({
			Deck: [ this.state.Deck, deckCards ]
		});

		let prevDeck = this.state.Deck[1];

		prevDeck.splice(0, 1);
		await this.setState({
			Deck: prevDeck
		});

		console.log('dech', this.state.Deck);
	}

	//Toggle Player
	handlePlayerDisplay = () => {
		if (this.state.playerDisplay == null) {
			this.setState({ playerDisplay: true });
		} else {
			this.setState({
				playerDisplay: !this.state.playerDisplay,
				open: true
			});
		}
	};

	//Popup Cancel Button
	handleCancel = () => {
		this.setState({
			open: false
		});
	};

	//Radio Button
	handleRadio = (value) => {
		if (value === 'any') {
			this.setState({
				anyCard: true,
				suitCard: false,
				colorCard: false
			});
		}
		if (value === 'suit') {
			this.setState({
				anyCard: false,
				suitCard: true,
				colorCard: false
			});
		}
		if (value === 'color') {
			this.setState({
				anyCard: false,
				suitCard: false,
				colorCard: true
			});
		}
	};

	//PopUp Submit Button
	handleSubmit = async () => {
		let randomNum;

		//Any Card Selection
		if (this.state.anyCard) {
			if (!this.state.playerDisplay) {
				randomNum = Math.floor(Math.random() * (52 - 1) + 1);

				let player1Cards = this.state.player1Moves;
				let active1Card = this.state.activePlayer1Moves;

				this.state.Deck.map((item) => {
					if (randomNum == item.key) {
						player1Cards.push(item);
						let push = null;
						active1Card.map((card) => {
							if (card.denom < item.denom) {
								push = true;
							}
						});
						active1Card.push(item);
					}
				});
				await this.setState({
					player1Moves: player1Cards,
					activePlayer1Moves: active1Card,
					open: false
				});

				//remove that card from deck
				let prevDeck = this.state.Deck;

				prevDeck.splice(randomNum, 1);

				this.setState({
					Deck: prevDeck
				});
			} else {
				randomNum = Math.floor(Math.random() * (52 - 1) + 1);

				let player2Cards = this.state.player2Moves;

				this.state.Deck.map((item) => {
					if (randomNum == item.key) {
						player2Cards.push(item);
					}
				});
				await this.setState({
					player2Moves: player2Cards,
					open: false
				});

				//remove that card from deck
				let prevDeck = this.state.Deck;

				prevDeck.splice(randomNum, 1);

				this.setState({
					Deck: prevDeck
				});
			}
		}

		//Suit Card
		if (this.state.suitCard) {
			if (!this.state.playerDisplay) {
				randomNum = Math.floor(Math.random() * (13 - 1) + 1);
				let player1Cards = this.state.player1Moves;

				let itemToSplice = null;
				this.state.Deck.map((item) => {
					if (randomNum == item.denom && this.state.suitValue == item.suit) {
						player1Cards.push(item);
						itemToSplice = item;
					}
				});
				await this.setState({
					player1Moves: player1Cards,
					open: false
				});

				//remove that card from deck
				if (itemToSplice != null) {
					let prevDeck = this.state.Deck;
					console.log('itemToSplice.key', itemToSplice.key);
					prevDeck.splice(itemToSplice.key, 1);

					this.setState({
						Deck: prevDeck
					});
				}
			} else {
				randomNum = Math.floor(Math.random() * (13 - 1) + 1);
				let player2Cards = this.state.player2Moves;

				let itemToSplice = null;
				this.state.Deck.map((item) => {
					if (randomNum == item.denom && this.state.suitValue == item.suit) {
						player2Cards.push(item);
						itemToSplice = item;
					}
				});
				await this.setState({
					player2Moves: player2Cards,
					open: false
				});

				//remove that card from deck
				if (itemToSplice != null) {
					let prevDeck = this.state.Deck;
					console.log('itemToSplice.key', itemToSplice.key);
					prevDeck.splice(itemToSplice.key, 1);

					this.setState({
						Deck: prevDeck
					});
				}
				console.log('prevcart', this.state.Deck);
			}
		}

		//Color Card
		if (this.state.colorCard) {
			if (!this.state.playerDisplay) {
				randomNum = Math.floor(Math.random() * (26 - 1) + 1);
				let player1Cards = this.state.player1Moves;

				let itemToSplice = null;
				this.state.Deck.map((item) => {
					if (randomNum == item.colorId && this.state.colorValue == item.color) {
						console.log(item.color);
						player1Cards.push(item);
						itemToSplice = item;
					}
				});
				await this.setState({
					player1Moves: player1Cards,
					open: false
				});

				//remove that card from deck
				if (itemToSplice != null) {
					let prevDeck = this.state.Deck;
					console.log('itemToSplice.key', itemToSplice.key);
					prevDeck.splice(itemToSplice.key, 1);

					this.setState({
						Deck: prevDeck
					});
				}
			} else {
				randomNum = Math.floor(Math.random() * (26 - 1) + 1);
				let player2Cards = this.state.player2Moves;

				let itemToSplice = null;
				this.state.Deck.map((item) => {
					if (randomNum == item.colorId && this.state.colorValue == item.color) {
						player2Cards.push(item);
						itemToSplice = item;
					}
				});
				await this.setState({
					player2Moves: player2Cards,
					open: false
				});

				//remove that card from deck
				if (itemToSplice != null) {
					let prevDeck = this.state.Deck;
					console.log('itemToSplice.key', itemToSplice.key);
					prevDeck.splice(itemToSplice.key, 1);

					this.setState({
						Deck: prevDeck
					});
				}
				console.log('prevcart', this.state.Deck);
			}
		}
	};

	//handle selections
	handleSelection = (e, data) => {
		this.setState({
			[data.name]: data.value
		});
	};

	render() {
		return (
			<div>
				<Header block>
					<h1>Player{+this.state.playerDisplay ? ' 1 ' : ' 2 '}Turn to Pick Card</h1>
				</Header>
				<Grid container style={{ marginTop: 10 }}>
					<Grid.Column width={8}>
						<Segment>
							<Header>Player 1 Moves</Header>
							<Divider />
							<Button
								color="green"
								onClick={this.handlePlayerDisplay}
								disabled={
									this.state.playerDisplay != null && this.state.playerDisplay == true ? false : true
								}
							>
								Pick a Card
							</Button>
							<Divider />
							{this.state.player1Moves !== '' &&
								this.state.player1Moves.map((item) => {
									return (
										<Grid>
											<Grid.Column style={{ marginTop: 30 }} as="h1" width={5}>
												{item.denom}
											</Grid.Column>
											<Grid.Column width={5}>
												<Image
													src={
														item.suit === 'heart' ? (
															Heart
														) : item.suit === 'diamond' ? (
															Diamond
														) : item.suit === 'spade' ? (
															Spade
														) : item.suit === 'club' ? (
															Club
														) : null
													}
												/>
											</Grid.Column>
											<Grid.Column style={{ marginTop: 30 }} as="h1" width={5}>
												{item.color}
											</Grid.Column>
										</Grid>
									);
								})}
						</Segment>
					</Grid.Column>

					<Grid.Column width={8}>
						<Segment>
							<Header>Player 2 Moves</Header>
							<Divider />
							<Button
								color="green"
								onClick={this.handlePlayerDisplay}
								disabled={
									this.state.playerDisplay != null && this.state.playerDisplay == false ? false : true
								}
							>
								Pick a Card
							</Button>
							<Divider />
							{this.state.player2Moves !== '' &&
								this.state.player2Moves.map((item) => {
									return (
										<Grid>
											<Grid.Column style={{ marginTop: 30 }} as="h1" width={5}>
												{item.denom == 1 ? (
													'A'
												) : item.denom == 11 ? (
													'J'
												) : item.denom == 12 ? (
													'Q'
												) : item.denom == 13 ? (
													'K'
												) : (
													item.denom
												)}
											</Grid.Column>
											<Grid.Column width={5}>
												<Image
													src={
														item.suit === 'heart' ? (
															Heart
														) : item.suit === 'diamond' ? (
															Diamond
														) : item.suit === 'spade' ? (
															Spade
														) : item.suit === 'club' ? (
															Club
														) : null
													}
												/>
											</Grid.Column>
											<Grid.Column style={{ marginTop: 30 }} as="h1" width={5}>
												{item.color}
											</Grid.Column>
										</Grid>
									);
								})}
						</Segment>
					</Grid.Column>
				</Grid>

				<Modal open={this.state.open}>
					<Modal.Header>Select an option</Modal.Header>
					<Modal.Content>
						<Radio
							as="h1"
							label="Choose any Card"
							style={{ marginLeft: 10 }}
							checked={this.state.anyCard}
							onClick={() => {
								this.handleRadio('any');
							}}
						/>
						<Radio
							as="h1"
							label="Choose card by SUIT"
							style={{ marginLeft: 10 }}
							checked={this.state.suitCard}
							onClick={() => {
								this.handleRadio('suit');
							}}
						/>
						<Radio
							as="h1"
							label="Choose card by COLOR"
							style={{ marginLeft: 10 }}
							checked={this.state.colorCard}
							onClick={() => {
								this.handleRadio('color');
							}}
						/>
						<br />
						<div style={{ textAlign: 'center' }}>
							{this.state.suitCard && (
								<Select
									clearable
									name="suitValue"
									value={this.state.suitValue}
									onChange={this.handleSelection}
									placeholder="Select Suit"
									options={this.state.suits}
								/>
							)}
							{this.state.colorCard && (
								<Select
									clearable
									name="colorValue"
									value={this.state.colorValue}
									onChange={this.handleSelection}
									placeholder="Select Color"
									options={this.state.color}
								/>
							)}
						</div>
					</Modal.Content>
					<Divider />
					<div style={{ textAlign: 'right', marginBottom: 10, marginRight: 10 }}>
						<Button onClick={this.handleSubmit} color="green">
							Submit
						</Button>
						<Button onClick={this.handleCancel} color="red">
							Cancel
						</Button>
					</div>
				</Modal>
			</div>
		);
	}
}

export default GamePage;
