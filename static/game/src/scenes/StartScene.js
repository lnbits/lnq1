import { SCENE_WIDTH } from '../constants/stage.js';
import { LOGO_FLASH_DELAY } from '../constants/battle.js';
import { BattleScene } from './BattleScene.js';

export class StartScene {
	logoImg = document.getElementById('Logo');

	text = 'WAITING FOR PAID PLAYERS';
	repeatTime = 3;
	position = 10;
	logoFlash = false;
	flashTimer = 0;
	brightness = 0;
	contrast = 3;
	sceneEnded = false;
	startTimeout = undefined;

	endStartScene = () => {
		if (!window.STREETFIGHTER_CAN_PLAY || window.STREETFIGHTER_ROUND_STARTING) return;
		if (window.STREETFIGHTER_IS_AUTHORITY !== true) return;
		window.dispatchEvent(new CustomEvent('streetfighter:start-request'));
	};

	startBattleScene = () => {
		if (!window.STREETFIGHTER_CAN_PLAY || this.sceneEnded) return;
		this.sceneEnded = true;
		this.changeScene(BattleScene);
		window.removeEventListener('click', this.endStartScene);
		window.removeEventListener('streetfighter:start-match', this.onStartMatch);
	};

	onStartMatch = (event) => {
		const startAtMs = Number(event.detail?.startAtMs || 0);
		const delay = Math.max(0, startAtMs - Date.now());
		if (this.startTimeout) window.clearTimeout(this.startTimeout);
		window.STREETFIGHTER_ROUND_STARTING = true;
		this.startTimeout = window.setTimeout(this.startBattleScene, delay);
	};

	constructor(changeScene) {
		this.changeScene = changeScene;
		window.removeEventListener('click', this.endStartScene);
		window.removeEventListener('streetfighter:start-match', this.onStartMatch);
		window.addEventListener('click', this.endStartScene);
		window.addEventListener('streetfighter:start-match', this.onStartMatch);
	}

	updateLogo = (time) => {
		this.logoFlash = false;
	};

	updateTextPosition = (time) => {
		this.position -= time.secondsPassed * 100;
	};

	update = (time) => {
		this.updateLogo(time);
		this.updateTextPosition(time);
	};

	drawText = (context) => {
		context.fillStyle = 'white';
		context.font = '12px Arial';
		const text = window.STREETFIGHTER_CAN_PLAY
			? window.STREETFIGHTER_ROUND_STARTING
				? 'GET READY'
				: window.STREETFIGHTER_IS_AUTHORITY === true
					? 'CLICK ANYWHERE TO START'
					: 'WAITING FOR RYU TO START'
			: window.STREETFIGHTER_MATCH_ENDED
				? 'MATCH FINISHED'
				: 'PAY TO FIGHT - STAGE LOCKED';
		const textWidth = context.measureText(text).width;

		for (let i = 0; i < this.repeatTime; i++) {
			context.fillText(text, this.position + i * (textWidth + 30), 18);
		}

		if (this.position < (-textWidth + -30) * this.repeatTime) {
			this.position = SCENE_WIDTH;
		}
	};

	drawLogo = (context) => {
		if (this.logoFlash) {
			context.fillStyle = 'black';
			context.fillRect(112, 22, 170, 80);
			return;
		}
		context.drawImage(
			this.logoImg,
			0,
			0,
			this.logoImg.width,
			this.logoImg.height,
			112,
			22,
			170,
			80
		);
		context.fillStyle = '#111720';
		context.fillRect(112, 78, 170, 24);
		context.fillStyle = '#0b4b9b';
		context.font = 'bold 18px Arial';
		context.textAlign = 'center';
		context.fillText('By Alan bits', 197, 96);
		context.textAlign = 'left';
	};

	drawControls = (context) => {
		context.fillStyle = 'rgba(0, 0, 0, 0.75)';
		context.fillRect(46, 120, 290, 78);
		context.strokeStyle = '#f4b13d';
		context.strokeRect(46.5, 120.5, 289, 77);
		context.fillStyle = '#fff';
		context.font = '13px Arial';
		const side = window.STREETFIGHTER_LOCAL_SIDE
			? window.STREETFIGHTER_LOCAL_SIDE.toUpperCase()
			: 'SPECTATOR';
		context.fillText(`YOU ARE ${side}`, 66, 142);
		context.font = '11px Arial';
		context.fillText('Move: W A S D', 66, 162);
		context.fillText('Punch: Q E R', 66, 178);
		context.fillText('Kick: F V G', 190, 178);
		context.fillStyle = '#d7d9e2';
		context.fillText('Only your assigned fighter uses these controls.', 66, 193);
	};

	draw = (context) => {
		context.fillStyle = '#111720';
		context.fillRect(0, 0, SCENE_WIDTH, 224);
		context.fillStyle = '#24313d';
		context.fillRect(0, 170, SCENE_WIDTH, 54);
		context.fillStyle = '#384655';
		context.fillRect(0, 196, SCENE_WIDTH, 28);
		this.drawLogo(context);
		this.drawText(context);
		this.drawControls(context);
	};
}
