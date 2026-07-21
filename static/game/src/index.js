import { StreetFighterGame } from './StreetFighterGame.js';

const startGame = () => {
	if (window.STREETFIGHTER_GAME) return;
	try {
		const game = new StreetFighterGame();
		window.STREETFIGHTER_GAME = game;
		game.start();
	} catch (error) {
		console.error('[streetfighter] game startup failed', error);
		window.dispatchEvent(
			new CustomEvent('streetfighter:game-error', {
				detail: { message: error instanceof Error ? error.message : String(error) },
			})
		);
	}
};

// This module is included at the end of the public page. Waiting for `load`
// here is racy: slow nested module imports can finish after the frame has
// already fired its load event, leaving the canvas permanently blank.
startGame();
