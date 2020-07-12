This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I found a [card api](https://deckofcardsapi.com) and decided that I wanted to try and create a game using it. I love to play Solitaire, so I chose to replicate it using React.

#### Features of the game:
- Can select a card and click on the position you would like to move it to
- Can de-select a card if you no longer want to move it
- You can only move cards into positions that they are allowed to move to (for example a black card onto a red card)
- You can only move Ace cards into the empty positions in the top right corner, and from there, add cards in ascending order of that suit.
- Cards display in a staggared appearance so you can see all cards below.
- You can select and move a card that is not the top card, by selecting it and choosing where to move it.

To run the game, clone this repo, run `npm i` and then `npm start`. Go to http://localhost:3000 in your browser to view the app.
