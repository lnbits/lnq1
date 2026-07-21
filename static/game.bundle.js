// static/game/src/constants/controls.js
const Control = {
	LEFT: 'left',
	RIGHT: 'right',
	UP: 'up',
	DOWN: 'down',
	LIGHT_PUNCH: 'lightPunch',
	MEDIUM_PUNCH: 'mediumPunch',
	HEAVY_PUNCH: 'heavyPunch',
	LIGHT_KICK: 'lightKick',
	MEDIUM_KICK: 'mediumKick',
	HEAVY_KICK: 'heavyKick',
};

const SpecialMovesControls = {
	FORWARD: 'forward',
	BACKWARD: 'backward',
	UP: 'up',
	DOWN: 'down',
	FORWARD_DOWN: 'forwardDown',
	FORWARD_UP: 'forwardUp',
	BACKWARD_UP: 'backwardUp',
	BACKWARD_DOWN: 'backwardDown',
	LIGHT_PUNCH: 'lightPunch',
	MEDIUM_PUNCH: 'mediumPunch',
	HEAVY_PUNCH: 'heavyPunch',
	LIGHT_KICK: 'lightKick',
	MEDIUM_KICK: 'mediumKick',
	HEAVY_KICK: 'heavyKick',
};

const POLLING_RATE = 30; // milliseconds . for per seconds = 1000/POLLING_RATE

const POLLING_DELAY = 1000 / POLLING_RATE;

const MINIMUM_REPOLL_TIME = 200; // milliseconds before the same move/button is added into the history back to back

const __sf_constants_controls_js = {
	"Control": Control,
	"SpecialMovesControls": SpecialMovesControls,
	"POLLING_DELAY": POLLING_DELAY,
	"MINIMUM_REPOLL_TIME": MINIMUM_REPOLL_TIME
};


// static/game/src/config/controls.js
const PSControls = {
	X: 0,
	O: 1,
	SQ: 2,
	TR: 3,
	L1: 4,
	R1: 5,
	L2: 6,
	R2: 7,
	L3: 10,
	R3: 11,
	UP: 12,
	DOWN: 13,
	LEFT: 14,
	RIGHT: 15,
};

const controls = [
	{
		gamepad: {
			[Control.LEFT]: PSControls.LEFT,
			[Control.RIGHT]: PSControls.RIGHT,
			[Control.UP]: PSControls.UP,
			[Control.DOWN]: PSControls.DOWN,
			[Control.LIGHT_PUNCH]: PSControls.X,
			[Control.MEDIUM_PUNCH]: PSControls.SQ,
			[Control.HEAVY_PUNCH]: PSControls.L1,
			[Control.LIGHT_KICK]: PSControls.O,
			[Control.MEDIUM_KICK]: PSControls.TR,
			[Control.HEAVY_KICK]: PSControls.R1,
		},
		keyboard: {
			[Control.LEFT]: 'KeyA',
			[Control.RIGHT]: 'KeyD',
			[Control.UP]: 'KeyW',
			[Control.DOWN]: 'KeyS',
			[Control.LIGHT_PUNCH]: 'KeyQ',
			[Control.MEDIUM_PUNCH]: 'KeyE',
			[Control.HEAVY_PUNCH]: 'KeyR',
			[Control.LIGHT_KICK]: 'KeyF',
			[Control.MEDIUM_KICK]: 'KeyV',
			[Control.HEAVY_KICK]: 'KeyG',
		},
	},
	{
		gamepad: {
			[Control.LEFT]: PSControls.LEFT,
			[Control.RIGHT]: PSControls.RIGHT,
			[Control.UP]: PSControls.UP,
			[Control.DOWN]: PSControls.DOWN,
			[Control.LIGHT_PUNCH]: PSControls.X,
			[Control.MEDIUM_PUNCH]: PSControls.SQ,
			[Control.HEAVY_PUNCH]: PSControls.L1,
			[Control.LIGHT_KICK]: PSControls.O,
			[Control.MEDIUM_KICK]: PSControls.TR,
			[Control.HEAVY_KICK]: PSControls.R1,
		},
		keyboard: {
			[Control.LEFT]: 'KeyA',
			[Control.RIGHT]: 'KeyD',
			[Control.UP]: 'KeyW',
			[Control.DOWN]: 'KeyS',
			[Control.LIGHT_PUNCH]: 'KeyQ',
			[Control.MEDIUM_PUNCH]: 'KeyE',
			[Control.HEAVY_PUNCH]: 'KeyR',
			[Control.LIGHT_KICK]: 'KeyF',
			[Control.MEDIUM_KICK]: 'KeyV',
			[Control.HEAVY_KICK]: 'KeyG',
		},
	},
];

const CONTROLLER_DEADZONE = 0.4;

const __sf_config_controls_js = {
	"controls": controls,
	"CONTROLLER_DEADZONE": CONTROLLER_DEADZONE
};


// static/game/src/constants/game.js
// 1 = 100% 2 = 200% , 0.5 = 50% half
// ONLY SHOULD BE USED FOR DEBUGGING
let GAME_SPEED = 1;
const FPS = 60;
const FRAME_TIME = 1000 / FPS;

const __sf_constants_game_js = {
	"GAME_SPEED": GAME_SPEED,
	"FPS": FPS,
	"FRAME_TIME": FRAME_TIME
};


// static/game/src/constants/fighter.js
const FIGHTER_START_DISTANCE = 88;

const FIGHTER_DEFAULT_WIDTH = 40;

const FighterDirection = {
	LEFT: -1,
	RIGHT: 1,
};

// export const AllFighterStates = [
// 	IDLE,
// 	WALK_FORWARD,
// 	WALK_BACKWARD,
// 	JUMP_START,
// 	JUMP_UP,
// 	JUMP_FORWARD,
// 	JUMP_BACKWARD,
// 	JUMP_LAND,
// 	CROUCH,
// 	CROUCH_UP,
// 	CROUCH_DOWN,
// 	IDLE_TURN,
// 	CROUCH_TURN,
// 	LIGHT_PUNCH,
// 	MEDIUM_PUNCH,
// 	HEAVY_PUNCH,
// 	LIGHT_KICK,
// 	MEDIUM_KICK,
// 	HEAVY_KICK,
// 	HURT_HEAD_LIGHT,
// 	HURT_HEAD_MEDIUM,
// 	HURT_HEAD_HEAVY,
// 	HURT_BODY_LIGHT,
// 	HURT_BODY_MEDIUM,
// 	HURT_BODY_HEAVY,
// 	SPECIAL_1_LIGHT,
// 	SPECIAL_1_MEDIUM,
// 	SPECIAL_1_HEAVY,
// 	VICTORY,
// ];

const FighterState = {
	IDLE: 'idle',
	WALK_FORWARD: 'walkForwards',
	WALK_BACKWARD: 'walkBackwards',
	JUMP_START: 'jumpStart',
	JUMP_UP: 'jumpUp',
	JUMP_FORWARD: 'jumpForwards',
	JUMP_BACKWARD: 'jumpBackwards',
	JUMP_LAND: 'jumpLand',
	CROUCH: 'crouch',
	CROUCH_UP: 'crouchUp',
	CROUCH_DOWN: 'crouchDown',
	IDLE_TURN: 'idleTurn',
	CROUCH_TURN: 'crouchTurn',
	LIGHT_PUNCH: 'lightPunch',
	MEDIUM_PUNCH: 'mediumPunch',
	HEAVY_PUNCH: 'heavyPunch',
	LIGHT_KICK: 'lightKick',
	MEDIUM_KICK: 'mediumKick',
	HEAVY_KICK: 'heavyKick',
	HURT_HEAD_LIGHT: 'hurtHeadLight',
	HURT_HEAD_MEDIUM: 'hurtHeadMedium',
	HURT_HEAD_HEAVY: 'hurtHeadHeavy',
	HURT_BODY_LIGHT: 'hurtBodyLight',
	HURT_BODY_MEDIUM: 'hurtBodyMedium',
	HURT_BODY_HEAVY: 'hurtBodyHeavy',
	SPECIAL_1_LIGHT: 'special1Light',
	SPECIAL_1_MEDIUM: 'special1Medium',
	SPECIAL_1_HEAVY: 'special1Heavy',
	VICTORY: 'victory',
	KO: 'ko',
};

const FighterStruckDelay = 15;

const FrameDelay = {
	FREEZE: 0,
	TRANSITION: -1,
};

const FighterId = {
	KEN: 'Ken',
	RYU: 'Ryu',
};

const PushBox = {
	IDLE: [-16, -80, 32, 78],
	JUMP: [-16, -91, 32, 66],
	BEND: [-16, -58, 32, 58],
	CROUCH: [-16, -50, 32, 50],
};

const FighterHurtArea = {
	HEAD: 'head',
	BODY: 'body',
	LEGS: 'legs',
};

const HurtBox = {
	INVINCLIBLE: [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],

	IDLE: [
		[-8, -88, 24, 16],
		[-26, -74, 40, 42],
		[-26, -31, 40, 32],
	],
	BACKWARD: [
		[-19, -88, 24, 16],
		[-26, -74, 40, 42],
		[-26, -31, 40, 32],
	],
	FORWARD: [
		[-3, -88, 24, 16],
		[-26, -74, 40, 42],
		[-26, -31, 40, 32],
	],
	JUMP: [
		[-13, -106, 28, 18],
		[-26, -90, 40, 42],
		[-22, -66, 38, 18],
	],
	BEND: [
		[-2, -68, 24, 18],
		[-16, -53, 44, 24],
		[-16, -24, 44, 24],
	],
	CROUCH: [
		[6, -61, 24, 18],
		[-16, -46, 44, 24],
		[-16, -24, 44, 24],
	],
	PUNCH: [
		[11, -94, 24, 18],
		[-7, -77, 40, 43],
		[-7, -33, 40, 33],
	],
};

const FIGHTER_PUSH_FRICTION = 66;

const FighterAttackType = {
	PUNCH: 'punch',
	KICK: 'kick',
};

const FighterAttackStrength = {
	LIGHT: 'light',
	MEDIUM: 'medium',
	HEAVY: 'heavy',
};

const FighterAttackBaseData = {
	[FighterAttackStrength.LIGHT]: {
		score: 100,
		damage: 12,
		slide: {
			velocity: 12 * FRAME_TIME,
			friction: 600,
		},
	},
	[FighterAttackStrength.MEDIUM]: {
		score: 300,
		damage: 20,
		slide: {
			velocity: 16 * FRAME_TIME,
			friction: 600,
		},
	},
	[FighterAttackStrength.HEAVY]: {
		score: 100,
		damage: 28,
		slide: {
			velocity: 22 * FRAME_TIME,
			friction: 800,
		},
	},
};

const FighterHurtStates = [
	FighterState.IDLE,
	FighterState.IDLE_TURN,
	FighterState.WALK_FORWARD,
	FighterState.WALK_BACKWARD,
	FighterState.JUMP_START,
	FighterState.JUMP_LAND,
	FighterState.LIGHT_PUNCH,
	FighterState.MEDIUM_PUNCH,
	FighterState.HEAVY_PUNCH,
	FighterState.LIGHT_KICK,
	FighterState.MEDIUM_KICK,
	FighterState.HEAVY_KICK,
	FighterState.HURT_HEAD_LIGHT,
	FighterState.HURT_HEAD_MEDIUM,
	FighterState.HURT_HEAD_HEAVY,
	FighterState.HURT_BODY_LIGHT,
	FighterState.HURT_BODY_MEDIUM,
	FighterState.HURT_BODY_HEAVY,
	FighterState.SPECIAL_1_LIGHT,
	FighterState.SPECIAL_1_MEDIUM,
	FighterState.SPECIAL_1_HEAVY,
	FighterState.CROUCH,
	FighterState.CROUCH_UP,
	FighterState.CROUCH_DOWN,
];

const __sf_constants_fighter_js = {
	"FIGHTER_START_DISTANCE": FIGHTER_START_DISTANCE,
	"FIGHTER_DEFAULT_WIDTH": FIGHTER_DEFAULT_WIDTH,
	"FighterDirection": FighterDirection,
	"FighterState": FighterState,
	"FighterStruckDelay": FighterStruckDelay,
	"FrameDelay": FrameDelay,
	"FighterId": FighterId,
	"PushBox": PushBox,
	"FighterHurtArea": FighterHurtArea,
	"HurtBox": HurtBox,
	"FIGHTER_PUSH_FRICTION": FIGHTER_PUSH_FRICTION,
	"FighterAttackType": FighterAttackType,
	"FighterAttackStrength": FighterAttackStrength,
	"FighterAttackBaseData": FighterAttackBaseData,
	"FighterHurtStates": FighterHurtStates
};


// static/game/src/engine/InputHandler.js
const mappedButtons = new Set(
	controls.map(({ gamepad }) => Object.values(gamepad)).flat()
);
const heldGamepadButtons = [new Set(), new Set()];
const pressedGamepadButtons = [new Set(), new Set()];

const gamepadThumbstickAxes = [
	{
		x: 0,
		y: 0,
	},
	{
		x: 0,
		y: 0,
	},
];

const heldKeys = new Set();
const pressedKeys = new Set();
const pressedKeysControlHistory = [new Set(), new Set()];
const remoteInputs = [null, null];
const remoteInputSequences = [0, 0];
const remoteInputTimes = [0, 0];
const remotePressedControls = [new Set(), new Set()];
const mappedKeys = controls
	.map(({ keyboard }) => Object.values(keyboard))
	.flat();

const remoteControlNames = {
	[Control.LEFT]: 'left',
	[Control.RIGHT]: 'right',
	[Control.UP]: 'up',
	[Control.DOWN]: 'down',
	[Control.LIGHT_PUNCH]: 'lightPunch',
	[Control.MEDIUM_PUNCH]: 'mediumPunch',
	[Control.HEAVY_PUNCH]: 'heavyPunch',
	[Control.LIGHT_KICK]: 'lightKick',
	[Control.MEDIUM_KICK]: 'mediumKick',
	[Control.HEAVY_KICK]: 'heavyKick',
};

const REMOTE_INPUT_STALE_MS = 500;

const getLocalPlayerId = () => {
	if (!window.STREETFIGHTER_CAN_PLAY) return undefined;
	const id = Number(window.STREETFIGHTER_LOCAL_PLAYER_INDEX);
	return Number.isInteger(id) && id >= 0 && id < controls.length ? id : undefined;
};

const getControlProfileId = (id) => {
	const localPlayerId = getLocalPlayerId();
	return localPlayerId === id ? 0 : undefined;
};

const getRemoteInput = (id) => {
	if (getControlProfileId(id) !== undefined) return null;
	if (!remoteInputs[id]) return null;
	if (Date.now() - Number(remoteInputTimes[id] || 0) > REMOTE_INPUT_STALE_MS) {
		remoteInputs[id] = null;
		remotePressedControls[id].clear();
		return null;
	}
	return remoteInputs[id];
};

const clearPressedControlHistory = (code) => {
	pressedKeysControlHistory.forEach((history) => history.delete(code));
};

const isEditableTarget = (target) => {
	if (!(target instanceof HTMLElement)) return false;
	const tagName = target.tagName.toLowerCase();
	return (
		target.isContentEditable ||
		tagName === 'input' ||
		tagName === 'textarea' ||
		tagName === 'select'
	);
};

const isButtonPressed = (id, code) => {
	if (
		heldGamepadButtons[id].has(code) &&
		!pressedGamepadButtons[id].has(code)
	) {
		pressedGamepadButtons[id].add(code);
		return true;
	}
	return false;
};

const isPressed = (code) => {
	if (heldKeys.has(code) && !pressedKeys.has(code)) {
		pressedKeys.add(code);
		return true;
	}
	return false;
};

const isPressedControlHistory = (id, code) => {
	const remoteInput = getRemoteInput(id);
	if (remoteInput) return isRemoteControlPressed(id, code);

	const controlProfileId = getControlProfileId(id);
	if (controlProfileId === undefined) return false;
	const controlKeyId = controls[controlProfileId].keyboard[code];
	const controlButtonId = controls[controlProfileId].gamepad[code];
	if (
		heldKeys.has(controlKeyId) &&
		!pressedKeysControlHistory[id].has(controlKeyId)
	) {
		pressedKeysControlHistory[id].add(controlKeyId);
		return true;
	} else if (
		heldGamepadButtons[controlProfileId].has(controlButtonId) &&
		!pressedKeysControlHistory[id].has(controlButtonId)
	) {
		pressedKeysControlHistory[id].add(controlButtonId);
		return true;
	}
	return false;
};

const isRemoteControlPressed = (id, code) => {
	const input = remoteInputs[id];
	const controlName = remoteControlNames[code];
	if (!input || !controlName) return false;
	if (input[controlName] && !remotePressedControls[id].has(controlName)) {
		remotePressedControls[id].add(controlName);
		return true;
	}
	if (!input[controlName]) {
		remotePressedControls[id].delete(controlName);
	}
	return false;
};

const handleKeyDown = (event) => {
	if (isEditableTarget(event.target)) return;
	if (!mappedKeys.includes(event.code)) return;
	event.preventDefault();
	if (!window.STREETFIGHTER_CAN_PLAY) return;
	if (!heldKeys.has(event.code)) {
		heldKeys.add(event.code);
	}
};

const handleKeyUp = (event) => {
	if (isEditableTarget(event.target)) return;
	if (!mappedKeys.includes(event.code)) return;
	event.preventDefault();
	if (heldKeys.has(event.code)) {
		heldKeys.delete(event.code);
		pressedKeys.delete(event.code);
		clearPressedControlHistory(event.code);
	}
};

const registerKeyboardEvents = () => {
	window.addEventListener('keydown', handleKeyDown);
	window.addEventListener('keyup', handleKeyUp);
};

const handleGamepadConnected = (event) => {
	const gamepad = event.gamepad;
	console.log(
		`gamepad named ${gamepad.id} connected for player ${gamepad.index + 1}`
	);
};

const handleGamepadDisconnected = (event) => {
	const gamepad = event.gamepad;
	console.log(
		`gamepad named ${gamepad.id} disconnected for player ${gamepad.index + 1}`
	);
};

const updateGamepadButtons = (gamePadIndex, gamePad) => {
	if (!gamePad || !heldGamepadButtons[gamePadIndex]) return;
	gamePad.buttons.forEach((button, index) => {
		if (!mappedButtons.has(index)) return;
		if (button.pressed) {
			heldGamepadButtons[gamePadIndex].add(index);
		} else {
			heldGamepadButtons[gamePadIndex].delete(index);
			pressedGamepadButtons[gamePadIndex].delete(index);
			pressedKeysControlHistory[gamePadIndex].delete(index);
		}
	});
};

const updateGamepadAxes = (gamePadIndex, gamePad) => {
	if (!gamePad || !gamepadThumbstickAxes[gamePadIndex]) return;
	gamepadThumbstickAxes[gamePadIndex].x = gamePad.axes[0];
	gamepadThumbstickAxes[gamePadIndex].y = gamePad.axes[1];
};

const updateGamePads = () => {
	const gamepadList = navigator.getGamepads();

	for (const [gamePadIndex, gamePad] of gamepadList.entries()) {
		updateGamepadButtons(gamePadIndex, gamePad);
		updateGamepadAxes(gamePadIndex, gamePad);
	}
};

const registerGamepadEvents = () => {
	window.addEventListener('gamepadconnected', handleGamepadConnected);
	window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);
};

const isLeft = (id) => {
	const remoteInput = getRemoteInput(id);
	if (remoteInput) return remoteInput.left === true;

	const controlProfileId = getControlProfileId(id);
	if (controlProfileId === undefined) return false;
	if (gamepadThumbstickAxes[controlProfileId].x < -1 * CONTROLLER_DEADZONE) return true;
	return (
		heldKeys.has(controls[controlProfileId].keyboard[Control.LEFT]) ||
		heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.LEFT])
	);
};

const isUp = (id) => {
	const remoteInput = getRemoteInput(id);
	if (remoteInput) return remoteInput.up === true;

	const controlProfileId = getControlProfileId(id);
	if (controlProfileId === undefined) return false;
	if (gamepadThumbstickAxes[controlProfileId].y < -1 * CONTROLLER_DEADZONE) return true;

	return (
		heldKeys.has(controls[controlProfileId].keyboard[Control.UP]) ||
		heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.UP])
	);
};

const isRight = (id) => {
	const remoteInput = getRemoteInput(id);
	if (remoteInput) return remoteInput.right === true;

	const controlProfileId = getControlProfileId(id);
	if (controlProfileId === undefined) return false;
	if (gamepadThumbstickAxes[controlProfileId].x > CONTROLLER_DEADZONE) return true;

	return (
		heldKeys.has(controls[controlProfileId].keyboard[Control.RIGHT]) ||
		heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.RIGHT])
	);
};

const isDown = (id) => {
	const remoteInput = getRemoteInput(id);
	if (remoteInput) return remoteInput.down === true;

	const controlProfileId = getControlProfileId(id);
	if (controlProfileId === undefined) return false;
	if (gamepadThumbstickAxes[controlProfileId].y > CONTROLLER_DEADZONE) return true;

	return (
		heldKeys.has(controls[controlProfileId].keyboard[Control.DOWN]) ||
		heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.DOWN])
	);
};

const isForward = (id, direction) => {
	return direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id);
};

const isBackward = (id, direction) => {
	return direction === FighterDirection.RIGHT ? isLeft(id) : isRight(id);
};

const isIdle = (id) =>
	isUp(id) || isDown(id) || isLeft(id) || isRight(id);

const isKeyPressed = (id, code, forControlHistory) => {
	if (forControlHistory) return isPressedControlHistory(id, code);
	const remoteInput = getRemoteInput(id);
	if (remoteInput) return isRemoteControlPressed(id, code);

	const controlProfileId = getControlProfileId(id);
	if (controlProfileId === undefined) return false;

	return (
		isButtonPressed(controlProfileId, controls[controlProfileId].gamepad[code]) ||
		isPressed(controls[controlProfileId].keyboard[code])
	);
};

const isLightPunch = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.LIGHT_PUNCH, forControlHistory);
};
const isMediumPunch = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.MEDIUM_PUNCH, forControlHistory);
};
const isHeavyPunch = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.HEAVY_PUNCH, forControlHistory);
};

const isLightKick = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.LIGHT_KICK, forControlHistory);
};
const isMediumKick = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.MEDIUM_KICK, forControlHistory);
};
const isHeavyKick = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.HEAVY_KICK, forControlHistory);
};

const setRemoteInput = (id, input = {}, meta = {}) => {
	if (!Number.isInteger(id) || id < 0 || id >= controls.length) return;
	if (window.STREETFIGHTER_MATCH_ENDED) return;
	const sequence = Number(meta.sequence || input.sequence || 0);
	if (sequence && sequence <= remoteInputSequences[id]) return;
	if (sequence) remoteInputSequences[id] = sequence;
	remoteInputTimes[id] = Date.now();
	remoteInputs[id] = {
		left: input.left === true,
		right: input.right === true,
		up: input.up === true,
		down: input.down === true,
		lightPunch: input.lightPunch === true,
		mediumPunch: input.mediumPunch === true,
		heavyPunch: input.heavyPunch === true,
		lightKick: input.lightKick === true,
		mediumKick: input.mediumKick === true,
		heavyKick: input.heavyKick === true,
	};
};

const clearRemoteInputs = () => {
	remoteInputs[0] = null;
	remoteInputs[1] = null;
	remoteInputSequences[0] = 0;
	remoteInputSequences[1] = 0;
	remoteInputTimes[0] = 0;
	remoteInputTimes[1] = 0;
	remotePressedControls[0].clear();
	remotePressedControls[1].clear();
};

const getLocalInputSnapshot = () => {
	const localPlayerId = getLocalPlayerId();
	if (localPlayerId === undefined) return null;
	const controlProfileId = getControlProfileId(localPlayerId);
	if (controlProfileId === undefined) return null;
	return {
		left:
			gamepadThumbstickAxes[controlProfileId].x < -1 * CONTROLLER_DEADZONE ||
			heldKeys.has(controls[controlProfileId].keyboard[Control.LEFT]) ||
			heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.LEFT]),
		right:
			gamepadThumbstickAxes[controlProfileId].x > CONTROLLER_DEADZONE ||
			heldKeys.has(controls[controlProfileId].keyboard[Control.RIGHT]) ||
			heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.RIGHT]),
		up:
			gamepadThumbstickAxes[controlProfileId].y < -1 * CONTROLLER_DEADZONE ||
			heldKeys.has(controls[controlProfileId].keyboard[Control.UP]) ||
			heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.UP]),
		down:
			gamepadThumbstickAxes[controlProfileId].y > CONTROLLER_DEADZONE ||
			heldKeys.has(controls[controlProfileId].keyboard[Control.DOWN]) ||
			heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.DOWN]),
		lightPunch:
			heldKeys.has(controls[controlProfileId].keyboard[Control.LIGHT_PUNCH]) ||
			heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.LIGHT_PUNCH]),
		mediumPunch:
			heldKeys.has(controls[controlProfileId].keyboard[Control.MEDIUM_PUNCH]) ||
			heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.MEDIUM_PUNCH]),
		heavyPunch:
			heldKeys.has(controls[controlProfileId].keyboard[Control.HEAVY_PUNCH]) ||
			heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.HEAVY_PUNCH]),
		lightKick:
			heldKeys.has(controls[controlProfileId].keyboard[Control.LIGHT_KICK]) ||
			heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.LIGHT_KICK]),
		mediumKick:
			heldKeys.has(controls[controlProfileId].keyboard[Control.MEDIUM_KICK]) ||
			heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.MEDIUM_KICK]),
		heavyKick:
			heldKeys.has(controls[controlProfileId].keyboard[Control.HEAVY_KICK]) ||
			heldGamepadButtons[controlProfileId].has(controls[controlProfileId].gamepad[Control.HEAVY_KICK]),
	};
};

window.STREETFIGHTER_INPUT = {
	setRemoteInput,
	clearRemoteInputs,
	getLocalInputSnapshot,
};

const __sf_engine_InputHandler_js = {
	"registerKeyboardEvents": registerKeyboardEvents,
	"updateGamePads": updateGamePads,
	"registerGamepadEvents": registerGamepadEvents,
	"isLeft": isLeft,
	"isUp": isUp,
	"isRight": isRight,
	"isDown": isDown,
	"isForward": isForward,
	"isBackward": isBackward,
	"isIdle": isIdle,
	"isKeyPressed": isKeyPressed,
	"isLightPunch": isLightPunch,
	"isMediumPunch": isMediumPunch,
	"isHeavyPunch": isHeavyPunch,
	"isLightKick": isLightKick,
	"isMediumKick": isMediumKick,
	"isHeavyKick": isHeavyKick,
	"setRemoteInput": setRemoteInput,
	"clearRemoteInputs": clearRemoteInputs,
	"getLocalInputSnapshot": getLocalInputSnapshot
};


// static/game/src/utils/context.js
const drawFrame = (context, image, dimensions, x, y, direction = 1) => {
	const [sourceX, sourceY, sourceWidth, sourceHeight] = dimensions;

	context.scale(direction, 1);
	context.drawImage(
		image,
		sourceX,
		sourceY,
		sourceWidth,
		sourceHeight,
		x * direction,
		y,
		sourceWidth,
		sourceHeight
	);

	context.setTransform(1, 0, 0, 1, 0, 0);
};

const getContext = () => {
	const canvasEL = document.querySelector('canvas');
	const context = canvasEL.getContext('2d');
	context.imageSmoothingEnabled = false;
	return context;
};

const __sf_utils_context_js = {
	"drawFrame": drawFrame,
	"getContext": getContext
};


// static/game/src/constants/stage.js
const STAGE_FLOOR = 218;

const STAGE_WIDTH = 768;
const STAGE_HEIGHT = 256;
const STAGE_MID_POINT = STAGE_WIDTH / 2;
const STAGE_PADDING = 256;
const SCENE_WIDTH = 382;
const SCENE_HEIGHT = 224;

const SCROLL_BOUNDARY = 100;

const __sf_constants_stage_js = {
	"STAGE_FLOOR": STAGE_FLOOR,
	"STAGE_WIDTH": STAGE_WIDTH,
	"STAGE_HEIGHT": STAGE_HEIGHT,
	"STAGE_MID_POINT": STAGE_MID_POINT,
	"STAGE_PADDING": STAGE_PADDING,
	"SCENE_WIDTH": SCENE_WIDTH,
	"SCENE_HEIGHT": SCENE_HEIGHT,
	"SCROLL_BOUNDARY": SCROLL_BOUNDARY
};


// static/game/src/engine/Camera.js
class Camera {
	constructor(x, y, fighters) {
		this.position = { x: x, y: y };
		this.fighters = fighters;
		this.speed = 100;
	}

	updateY = () => {
		this.position.y =
			-4 +
			Math.floor(
				Math.min(this.fighters[1].position.y, this.fighters[0].position.y) / 10
			);

		if (this.position.y < 0) this.position.y = 0;
		if (this.position.y > STAGE_HEIGHT - SCENE_HEIGHT)
			this.position.y = STAGE_HEIGHT - SCENE_HEIGHT;
	};

	updateX = (time) => {
		const lowX = Math.min(
			...this.fighters.map((fighter) => fighter.position.x)
		);
		const highX = Math.max(
			...this.fighters.map((fighter) => fighter.position.x)
		);

		if (highX - lowX > SCENE_WIDTH - SCROLL_BOUNDARY * 2) {
			const midPoint = (highX - lowX) / 2;
			this.position.x = lowX + midPoint - SCENE_WIDTH / 2;
		} else {
			for (const fighter of this.fighters) {
				if (fighter.position.x < this.position.x + SCROLL_BOUNDARY) {
					this.position.x = fighter.position.x - SCROLL_BOUNDARY;
				} else if (
					fighter.position.x >
					this.position.x + SCENE_WIDTH - SCROLL_BOUNDARY
				) {
					this.position.x = fighter.position.x + SCROLL_BOUNDARY - SCENE_WIDTH;
				}
			}
		}

		if (this.position.x <= STAGE_PADDING) this.position.x = STAGE_PADDING;

		if (this.position.x > STAGE_WIDTH + STAGE_PADDING - SCENE_WIDTH)
			this.position.x = STAGE_WIDTH + STAGE_PADDING - SCENE_WIDTH;
	};

	update = (time, context) => {
		this.updateY(time);
		this.updateX(time);
	};
}

const __sf_engine_Camera_js = {
	"Camera": Camera
};


// static/game/src/engine/EntityList.js
class EntityList {
	entitiesList = [];

	add = (EntityClass, ...args) => {
		this.entitiesList.push(new EntityClass(...args, this));
	};

	// Either use arrow function as i keeps the 'this' reference of parent always and doesnt have own 'this'
	// Or use normal function and use this.removeEntity.bind(this)

	remove = (entity) => {
		this.entitiesList = this.entitiesList.filter(
			(thisEntity) => thisEntity !== entity
		);
	};

	update = (time, camera) => {
		for (const entity of this.entitiesList) {
			entity.update(time, camera);
		}
	};

	draw = (context, camera) => {
		this.entitiesList.map((entity) => entity.draw(context, camera));
	};
}

const __sf_engine_EntityList_js = {
	"EntityList": EntityList
};


// static/game/src/constants/sounds.js
const soundAttackIds = {
	LIGHT: 'sound-fighter-light-attack',
	MEDIUM: 'sound-fighter-medium-attack',
	HEAVY: 'sound-fighter-heavy-attack',
};

const soundHadoukenId = {
	[FighterId.KEN]: 'sound-ken-hadouken',
	[FighterId.RYU]: 'sound-ryu-hadouken',
};

const soundLandId = 'sound-fighter-land';

const soundHitIds = {
	LIGHT: {
		PUNCH: 'sound-fighter-light-punch-hit',
		KICK: 'sound-fighter-light-kick-hit',
	},
	MEDIUM: {
		PUNCH: 'sound-fighter-medium-punch-hit',
		KICK: 'sound-fighter-medium-kick-hit',
	},
	HEAVY: {
		PUNCH: 'sound-fighter-heavy-punch-hit',
		KICK: 'sound-fighter-heavy-kick-hit',
	},
};

const GLOBAL_VOLUME = 0.7;

const __sf_constants_sounds_js = {
	"soundAttackIds": soundAttackIds,
	"soundHadoukenId": soundHadoukenId,
	"soundLandId": soundLandId,
	"soundHitIds": soundHitIds,
	"GLOBAL_VOLUME": GLOBAL_VOLUME
};


// static/game/src/engine/ControlHistory.js
class ControlHistory {
	historyTimerCap = 2000;
	history = [];
	historyTimer = 0;

	controlToButton = [
		[__sf_engine_InputHandler_js.isLightPunch, SpecialMovesControls.LIGHT_PUNCH],
		[__sf_engine_InputHandler_js.isMediumPunch, SpecialMovesControls.MEDIUM_PUNCH],
		[__sf_engine_InputHandler_js.isHeavyPunch, SpecialMovesControls.HEAVY_PUNCH],
		[__sf_engine_InputHandler_js.isLightKick, SpecialMovesControls.LIGHT_KICK],
		[__sf_engine_InputHandler_js.isMediumKick, SpecialMovesControls.MEDIUM_KICK],
		[__sf_engine_InputHandler_js.isHeavyKick, SpecialMovesControls.HEAVY_KICK],
	];

	constructor(fighter) {
		this.fighter = fighter;
		this.playerId = fighter.playerId;
	}

	getMove = () => {
		if (__sf_engine_InputHandler_js.isForward(this.playerId, this.fighter.direction)) {
			if (__sf_engine_InputHandler_js.isUp(this.playerId, this.fighter.direction))
				return SpecialMovesControls.FORWARD_UP;
			else if (__sf_engine_InputHandler_js.isDown(this.playerId, this.fighter.direction))
				return SpecialMovesControls.FORWARD_DOWN;
			return SpecialMovesControls.FORWARD;
		} else if (__sf_engine_InputHandler_js.isBackward(this.playerId, this.fighter.direction)) {
			if (__sf_engine_InputHandler_js.isUp(this.playerId, this.fighter.direction))
				return SpecialMovesControls.BACKWARD_UP;
			else if (__sf_engine_InputHandler_js.isDown(this.playerId, this.fighter.direction))
				return SpecialMovesControls.BACKWARD_DOWN;
			return SpecialMovesControls.BACKWARD;
		} else if (__sf_engine_InputHandler_js.isUp(this.playerId, this.fighter.direction))
			return SpecialMovesControls.UP;
		else if (__sf_engine_InputHandler_js.isDown(this.playerId, this.fighter.direction))
			return SpecialMovesControls.DOWN;
		else if (__sf_engine_InputHandler_js.isLightPunch(this.playerId, this.fighter.direction))
			return SpecialMovesControls.LIGHT_PUNCH;
		else if (__sf_engine_InputHandler_js.isMediumPunch(this.playerId, this.fighter.direction))
			return SpecialMovesControls.MEDIUM_PUNCH;
		else return null;
	};

	getButton = () => {
		for (const [isButton, buttonName] of this.controlToButton) {
			if (isButton(this.playerId, true)) {
				return buttonName;
			}
		}
		return false;
	};

	isValidAddition = (control, time) => {
		if (this.history.length === 0 || this.history[0][0] !== control)
			return true;
		if (time.previous - this.history[0][1] > MINIMUM_REPOLL_TIME) return true;
		return false;
	};

	handleAdd = (time) => {
		if (this.historyTimer > time.previous) return;
		this.historyTimer = time.previous + POLLING_DELAY;

		const button = this.getButton();
		const move = this.getMove();

		if (button && this.isValidAddition(button, time)) {
			this.history.unshift([button, time.previous]);
			this.updateSpecialMoveSequences(time);
		}

		if (move && this.isValidAddition(move, time)) {
			this.history.unshift([move, time.previous]);
			this.updateSpecialMoveSequences(time);
		}
	};

	handleRemove = (time) => {
		for (let i = this.history.length - 1; i >= 0; i--) {
			if (this.history[i][1] <= time.previous - this.historyTimerCap) {
				this.history.splice(i, 1);
			} else {
				return;
			}
		}
		if (this.history.length === 0) this.resetCursors();
	};

	print() {
		let historyWithNamesOnly = [];
		for (const [name] of this.history) historyWithNamesOnly.push(name);
		console.log(historyWithNamesOnly);
	}

	// older version which work with 	specialMoveSequence = {
	// 	[FighterState.SPECIAL_1_LIGHT]: [
	// 		SpecialMovesControls.DOWN,
	// 		SpecialMovesControls.FORWARD_DOWN,
	// 		SpecialMovesControls.FORWARD,
	// 		SpecialMovesControls.LIGHT_PUNCH,
	// 	],
	// 	[FighterState.SPECIAL_1_MEDIUM]: [
	// 		SpecialMovesControls.DOWN,
	// 		SpecialMovesControls.FORWARD_DOWN,
	// 		SpecialMovesControls.FORWARD,
	// 		SpecialMovesControls.MEDIUM_PUNCH,
	// 	],
	// 	[FighterState.SPECIAL_1_HEAVY]: [
	// 		SpecialMovesControls.DOWN,
	// 		SpecialMovesControls.FORWARD_DOWN,
	// 		SpecialMovesControls.FORWARD,
	// 		SpecialMovesControls.HEAVY_PUNCH,
	// 	],
	// };

	// NOT Used
	OLD_VERSION_TO_CHECK_SEQUENCE = () => {
		checkSequences = (time) => {
			for (const [state, sequence] of Object.entries(
				this.fighter.specialMoveSequence
			)) {
				if (this.isMoveSequenceMade(state)) {
					this.fighter.changeState(state, time);
				}
			}
		};
		matchMovesinArrays = (sequence, history) => {
			if (history.length < sequence.length) return false;
			for (let i = 0; i < sequence.length; i++) {
				if (history[i][0] !== sequence[i]) return false;
			}
			this.history = [];
			return true;
		};
		isMoveSequenceMade = (fighterState) => {
			const sequence = this.fighter.specialMoveSequence[fighterState]
				.slice()
				.reverse();

			return (
				this.matchMovesinArrays(sequence, this.history) ||
				this.matchMovesinArrays(sequence, this.history.slice(1)) ||
				this.matchMovesinArrays(sequence, this.history.slice(2)) ||
				this.matchMovesinArrays(sequence, this.history.slice(3))
			);
		};
	};

	resetCursors = () => {
		this.fighter.specialMoves.forEach((move) => {
			move.cursor = 0;
		});
	};

	checkSequence = (time, move) => {
		if (move.cursor === move.sequence.length) {
			this.fighter.changeState(move.state, time);
			move.cursor = 0;
		}
	};

	updateSpecialMoveSequences = (time) => {
		// this.print();
		this.fighter.specialMoves.forEach((move) => {
			if (this.history[0][0] === move.sequence[move.cursor]) {
				move.cursor++;
				this.checkSequence(time, move);
			} else move.cursor = 0;
		});
	};

	update = (time) => {
		this.handleAdd(time);
		this.handleRemove(time);
	};
}

const __sf_engine_ControlHistory_js = {
	"ControlHistory": ControlHistory
};


// static/game/src/engine/SoundHandler.js
const pendingSounds = new Map();
let audioUnlocked = false;
let muted = window.STREETFIGHTER_MUTED === true;

const rememberPendingSound = (sound, volume) => {
	if (!sound) return;
	pendingSounds.set(sound, volume);
};

const forgetPendingSound = (sound) => {
	pendingSounds.delete(sound);
};

const playSound = (sound, volume = GLOBAL_VOLUME) => {
	if (!sound) return;
	if (muted) {
		sound.pause();
		return;
	}
	sound.volume = volume;
	const play = () => {
		const promise = sound.play();
		if (promise?.catch) {
			promise
				.then(() => forgetPendingSound(sound))
				.catch(() => rememberPendingSound(sound, volume));
		}
	};
	if (
		!sound.paused &&
		sound.currentTime > 0 &&
		!sound.ended &&
		sound.readyState > sound.HAVE_CURRENT_DATA
	) {
		sound.currentTime = 0;
		play();
	} else {
		play();
	}
};

const stopSound = (sound) => {
	if (!sound) return;
	forgetPendingSound(sound);
	sound.pause();
	sound.currentTime = 0;
};

const setMuted = (value) => {
	muted = value === true;
	window.STREETFIGHTER_MUTED = muted;
	document.querySelectorAll('audio').forEach((sound) => {
		sound.muted = muted;
		if (muted) sound.pause();
		if (!muted && sound.loop) playSound(sound, 0.2);
	});
};

const isMuted = () => muted;

const unlockAudio = () => {
	audioUnlocked = true;
	if (muted) return;
	for (const [sound, volume] of pendingSounds) {
		playSound(sound, volume);
	}
};

const registerAudioUnlockEvents = () => {
	const unlock = () => {
		if (audioUnlocked) return;
		unlockAudio();
		window.removeEventListener('pointerdown', unlock);
		window.removeEventListener('touchstart', unlock);
		window.removeEventListener('keydown', unlock);
	};
	window.addEventListener('pointerdown', unlock, { once: true });
	window.addEventListener('touchstart', unlock, { once: true });
	window.addEventListener('keydown', unlock, { once: true });
};

const __sf_engine_SoundHandler_js = {
	"playSound": playSound,
	"stopSound": stopSound,
	"setMuted": setMuted,
	"isMuted": isMuted,
	"unlockAudio": unlockAudio,
	"registerAudioUnlockEvents": registerAudioUnlockEvents
};


// static/game/src/utils/collisions.js
const rectsOverlap = (
	x1,
	y1,
	width1,
	height1,
	x2,
	y2,
	width2,
	height2
) => {
	return (
		x1 < x2 + width2 &&
		x1 + width1 > x2 &&
		y1 < y2 + height2 &&
		y1 + height1 > y2
	);
};

const boxOverlap = (box1, box2) => {
	return rectsOverlap(
		box1.x,
		box1.y,
		box1.width,
		box1.height,
		box2.x,
		box2.y,
		box2.width,
		box2.height
	);
};

const getActualBoxDimensions = (position, direction, box) => {
	const x1 = position.x + box.x * direction;
	const x2 = x1 + box.width * direction;
	return {
		x: Math.min(x1, x2),
		y: position.y + box.y,
		width: box.width,
		height: box.height,
	};
};

const __sf_utils_collisions_js = {
	"rectsOverlap": rectsOverlap,
	"boxOverlap": boxOverlap,
	"getActualBoxDimensions": getActualBoxDimensions
};


// static/game/src/constants/battle.js
const BATTLE_TIME = 99;

const TIME_DELAY = 40 * FRAME_TIME;
const TIME_FLASH_DELAY = 3 * FRAME_TIME;
const TIME_FRAME_KEYS = ['time', 'time-flash'];

const KO_FLASH_DELAY = [4 * FRAME_TIME, 7 * FRAME_TIME];
const KO_FLASH_KEYS = ['ko-white', 'ko-black'];

const LOGO_FLASH_DELAY = [100 * FRAME_TIME, 20 * FRAME_TIME];

const HEALTH_MAX_HIT_POINTS = 200;

const HEALTH_CRITICAL_HIT_POINTS_PERCENTAGE = 0.4;

const HEALTH_CRITICAL_HIT_POINTS =
	HEALTH_CRITICAL_HIT_POINTS_PERCENTAGE * HEALTH_MAX_HIT_POINTS;

const HEALTH_COLOR = '#f3f300'; //Not being used
const HEALTH_DAMAGE_COLOR = '#f30000';

const HIT_SPLASH_RANDOMNESS = 10;

const DRAW_DEBUG = false;

const __sf_constants_battle_js = {
	"BATTLE_TIME": BATTLE_TIME,
	"TIME_DELAY": TIME_DELAY,
	"TIME_FLASH_DELAY": TIME_FLASH_DELAY,
	"TIME_FRAME_KEYS": TIME_FRAME_KEYS,
	"KO_FLASH_DELAY": KO_FLASH_DELAY,
	"KO_FLASH_KEYS": KO_FLASH_KEYS,
	"LOGO_FLASH_DELAY": LOGO_FLASH_DELAY,
	"HEALTH_MAX_HIT_POINTS": HEALTH_MAX_HIT_POINTS,
	"HEALTH_CRITICAL_HIT_POINTS": HEALTH_CRITICAL_HIT_POINTS,
	"HEALTH_COLOR": HEALTH_COLOR,
	"HEALTH_DAMAGE_COLOR": HEALTH_DAMAGE_COLOR,
	"HIT_SPLASH_RANDOMNESS": HIT_SPLASH_RANDOMNESS,
	"DRAW_DEBUG": DRAW_DEBUG
};


// static/game/src/utils/fighterDebug.js
const drawOriginCross = (context, camera, position) => {
	context.beginPath();
	context.strokeStyle = 'white';
	context.moveTo(
		Math.floor(position.x - camera.position.x) + 5,
		Math.floor(position.y - camera.position.y) - 0.5
	);
	context.lineTo(
		Math.floor(position.x - camera.position.x) - 4,
		Math.floor(position.y - camera.position.y) - 0.5
	);
	context.moveTo(
		Math.floor(position.x - camera.position.x) + 0.5,
		Math.floor(position.y - camera.position.y) - 5
	);
	context.lineTo(
		Math.floor(position.x - camera.position.x) + 0.5,
		Math.floor(position.y - camera.position.y) + 4
	);
	context.stroke();
};

const drawDebugBox = (
	context,
	camera,
	position,
	direction,
	dimensions,
	color
) => {
	if (!Array.isArray(dimensions)) return;
	const [x, y, width, height] = dimensions;
	context.lineWidth = 1;
	context.beginPath();
	context.strokeStyle = color;
	context.fillStyle = color + '33';
	context.fillRect(
		Math.floor(position.x - camera.position.x + x * direction) + 0.5,
		Math.floor(position.y + y - camera.position.y) + 0.5,
		width * direction,
		height
	);
	context.rect(
		Math.floor(position.x - camera.position.x + x * direction) + 0.5,
		Math.floor(position.y + y - camera.position.y) + 0.5,
		width * direction,
		height
	);
	context.stroke();
};

function DEBUG_drawCollisionInfo(fighter, context, camera) {
	const { position, direction, boxes } = fighter;

	// Push Box
	drawDebugBox(
		context,
		camera,
		position,
		direction,
		Object.values(boxes.push),
		'#55ff55'
	);

	//Hurt Boxes
	Object.values(boxes.hurt).map((box) => {
		drawDebugBox(context, camera, position, direction, box, '#5555ff');
	});

	// Hit Box
	drawDebugBox(
		context,
		camera,
		position,
		direction,
		Object.values(boxes.hit),
		'#ff0000'
	);

	// Origin
	drawOriginCross(context, camera, position);
}

const __sf_utils_fighterDebug_js = {
	"drawDebugBox": drawDebugBox,
	"DEBUG_drawCollisionInfo": DEBUG_drawCollisionInfo
};


// static/game/src/entitites/fighters/Fighter.js
// [Done] TODO Convert hurt: [[], [], []] to {head:[], body:[], legs:[],}
// [FIXED]: handleHadoukenInit was being called in Fighter Idle.init TODO BUG: find what makes the hadouken sound call out of noWhere - happens when hitting and after atleast once the Hadouken is thrown

// [Found not fixed] !!TODO One of the fighters randomly stops registering hits - Happens because illegal hurtState - from jumping to hurtHeadBody- jugaad by changing attackStruck in handleIdle

//[FIXED] this.opponent.attackStruck = false was missing in handleHeadBodyHit TODO: if fighters move into each other for some time they wont take hits.

class Fighter {
	velocity = {
		x: 0,
		y: 0,
	};
	initialVelocity = {};
	gravity = 0;
	image = new Image();
	frames = new Map();
	animationFrame = 0;
	animationTimer = 0;
	animations = {};

	slideVelocity = 0;
	slideFriction = 0;

	attackStruckDelay = 0;

	hurtShakeTimer = 0;
	hurtShake = 0;

	victory = false;

	opponent = undefined;
	boxes = {
		push: { pushX: 0, pushY: 0, pushWidth: 0, pushHeight: 0 },
		hurt: {
			[FighterHurtArea.HEAD]: [0, 0, 0, 0],
			[FighterHurtArea.BODY]: [0, 0, 0, 0],
			[FighterHurtArea.LEGS]: [0, 0, 0, 0],
		},
		hit: { x: 0, y: 0, width: 0, height: 0 },
	};

	currentState = FighterState.IDLE;

	attackStruck = false;
	soundAttacks = {
		[FighterAttackStrength.LIGHT]: document.getElementById(
			soundAttackIds.LIGHT
		),
		[FighterAttackStrength.MEDIUM]: document.getElementById(
			soundAttackIds.MEDIUM
		),
		[FighterAttackStrength.HEAVY]: document.getElementById(
			soundAttackIds.HEAVY
		),
	};

	specialMoves = null;

	soundHits = {
		[FighterAttackStrength.LIGHT]: {
			[FighterAttackType.PUNCH]: document.getElementById(
				soundHitIds.LIGHT.PUNCH
			),
			[FighterAttackType.KICK]: document.getElementById(soundHitIds.LIGHT.KICK),
		},
		[FighterAttackStrength.MEDIUM]: {
			[FighterAttackType.PUNCH]: document.getElementById(
				soundHitIds.MEDIUM.PUNCH
			),
			[FighterAttackType.KICK]: document.getElementById(
				soundHitIds.MEDIUM.KICK
			),
		},
		[FighterAttackStrength.HEAVY]: {
			[FighterAttackType.PUNCH]: document.getElementById(
				soundHitIds.HEAVY.PUNCH
			),
			[FighterAttackType.KICK]: document.getElementById(soundHitIds.HEAVY.KICK),
		},
	};

	soundLand = document.getElementById(soundLandId);

	constructor(playerId, onAttackHit, entityList) {
		this.playerId = playerId;
		this.onAttackHit = onAttackHit;
		this.entityList = entityList;
		this.position = {
			x:
				STAGE_MID_POINT +
				STAGE_PADDING +
				(playerId === 0 ? -1 : 1) * FIGHTER_START_DISTANCE,
			STAGE_FLOOR,
			y: STAGE_FLOOR,
		};
		this.direction =
			playerId === 0 ? FighterDirection.RIGHT : FighterDirection.LEFT;

		this.states = {
			[FighterState.IDLE]: {
				init: this.handleIdleInit,
				update: this.handleIdle,
				validFrom: [
					undefined,
					FighterState.IDLE,
					FighterState.WALK_FORWARD,
					FighterState.WALK_BACKWARD,
					FighterState.JUMP_UP,
					FighterState.JUMP_FORWARD,
					FighterState.JUMP_BACKWARD,
					FighterState.CROUCH_UP,
					FighterState.JUMP_LAND,
					FighterState.IDLE_TURN,
					FighterState.LIGHT_PUNCH,
					FighterState.MEDIUM_PUNCH,
					FighterState.HEAVY_PUNCH,
					FighterState.LIGHT_KICK,
					FighterState.MEDIUM_KICK,
					FighterState.HEAVY_KICK,
					FighterState.HURT_HEAD_LIGHT,
					FighterState.HURT_HEAD_HEAVY,
					FighterState.HURT_HEAD_MEDIUM,
					FighterState.HURT_BODY_LIGHT,
					FighterState.HURT_BODY_MEDIUM,
					FighterState.HURT_BODY_HEAVY,
				],
			},
			[FighterState.WALK_FORWARD]: {
				init: this.handleMoveInit,
				update: this.handleWalkForward,
				validFrom: [
					FighterState.IDLE,
					FighterState.JUMP_FORWARD,
					FighterState.WALK_BACKWARD,
					FighterState.JUMP_LAND,
				],
			},
			[FighterState.WALK_BACKWARD]: {
				init: this.handleMoveInit,
				update: this.handleWalkBackward,
				validFrom: [
					FighterState.IDLE,
					FighterState.WALK_FORWARD,
					FighterState.JUMP_BACKWARD,
					FighterState.JUMP_LAND,
				],
			},
			[FighterState.JUMP_START]: {
				init: this.resetVelocities,
				update: this.handleJumpStartState,
				validFrom: [
					FighterState.IDLE,
					FighterState.WALK_FORWARD,
					FighterState.WALK_BACKWARD,
					FighterState.JUMP_LAND,
				],
			},
			[FighterState.JUMP_LAND]: {
				init: this.resetVelocities,
				update: this.handleJumpLandState,
				validFrom: [
					FighterState.JUMP_UP,
					FighterState.JUMP_FORWARD,
					FighterState.JUMP_BACKWARD,
				],
			},
			[FighterState.JUMP_UP]: {
				init: this.handleJumpInit,
				update: this.handleJump,
				validFrom: [FighterState.IDLE, FighterState.JUMP_START],
			},
			[FighterState.JUMP_FORWARD]: {
				init: this.handleJumpInit,
				update: this.handleJump,
				validFrom: [FighterState.JUMP_START, FighterState.WALK_FORWARD],
			},
			[FighterState.JUMP_BACKWARD]: {
				init: this.handleJumpInit,
				update: this.handleJump,
				validFrom: [FighterState.JUMP_START, FighterState.WALK_BACKWARD],
			},
			[FighterState.CROUCH_DOWN]: {
				init: this.resetVelocities,
				update: this.handleCrouchDownUpdate,
				validFrom: [
					FighterState.IDLE,
					FighterState.WALK_FORWARD,
					FighterState.WALK_BACKWARD,
					FighterState.JUMP_LAND,
				],
			},
			[FighterState.CROUCH]: {
				init: () => {},
				update: this.handleCrouch,
				validFrom: [FighterState.CROUCH_DOWN, FighterState.CROUCH_TURN],
			},
			[FighterState.CROUCH_UP]: {
				init: () => {},
				update: this.handleCrouchUpUpdate,
				validFrom: [FighterState.CROUCH],
			},
			[FighterState.IDLE_TURN]: {
				init: () => {},
				update: this.handleIdleTurnState,
				validFrom: [
					FighterState.IDLE,
					FighterState.JUMP_LAND,
					FighterState.WALK_FORWARD,
					FighterState.WALK_BACKWARD,
				],
			},
			[FighterState.CROUCH_TURN]: {
				init: () => {},
				update: this.handleCrouchTurn,
				validFrom: [FighterState.CROUCH],
			},
			[FighterState.LIGHT_PUNCH]: {
				attackType: FighterAttackType.PUNCH,
				attackStrength: FighterAttackStrength.LIGHT,
				init: this.handleAttackInit,
				update: this.handleLightKick,
				validFrom: [
					FighterState.IDLE,
					FighterState.WALK_FORWARD,
					FighterState.WALK_BACKWARD,
				],
			},
			[FighterState.MEDIUM_PUNCH]: {
				attackType: FighterAttackType.PUNCH,
				attackStrength: FighterAttackStrength.MEDIUM,
				init: this.handleAttackInit,
				update: this.handleMedKick,
				validFrom: [
					FighterState.IDLE,
					FighterState.WALK_FORWARD,
					FighterState.WALK_BACKWARD,
				],
			},
			[FighterState.HEAVY_PUNCH]: {
				attackType: FighterAttackType.PUNCH,
				attackStrength: FighterAttackStrength.HEAVY,
				init: this.handleAttackInit,
				update: this.handleHeavyKick,
				validFrom: [
					FighterState.IDLE,
					FighterState.WALK_FORWARD,
					FighterState.WALK_BACKWARD,
				],
			},
			[FighterState.LIGHT_KICK]: {
				attackType: FighterAttackType.KICK,
				attackStrength: FighterAttackStrength.LIGHT,
				init: this.handleAttackInit,
				update: this.handleLightPunch,
				validFrom: [
					FighterState.IDLE,
					FighterState.WALK_FORWARD,
					FighterState.WALK_BACKWARD,
				],
			},
			[FighterState.MEDIUM_KICK]: {
				attackType: FighterAttackType.KICK,
				attackStrength: FighterAttackStrength.MEDIUM,
				init: this.handleAttackInit,
				update: this.handleMedPunch,
				validFrom: [
					FighterState.IDLE,
					FighterState.WALK_FORWARD,
					FighterState.WALK_BACKWARD,
				],
			},
			[FighterState.HEAVY_KICK]: {
				attackType: FighterAttackType.KICK,
				attackStrength: FighterAttackStrength.HEAVY,
				init: this.handleAttackInit,
				update: this.handleHeavyPunch,
				validFrom: [
					FighterState.IDLE,
					FighterState.WALK_FORWARD,
					FighterState.WALK_BACKWARD,
				],
			},
			[FighterState.HURT_HEAD_LIGHT]: {
				init: this.handleAttackHitInit,
				update: this.handleHeadBodyHit,
				validFrom: FighterHurtStates,
			},
			[FighterState.HURT_HEAD_MEDIUM]: {
				init: this.handleAttackHitInit,
				update: this.handleHeadBodyHit,
				validFrom: FighterHurtStates,
			},
			[FighterState.HURT_HEAD_HEAVY]: {
				init: this.handleAttackHitInit,
				update: this.handleHeadBodyHit,
				validFrom: FighterHurtStates,
			},
			[FighterState.HURT_BODY_LIGHT]: {
				init: this.handleAttackHitInit,
				update: this.handleHeadBodyHit,
				validFrom: FighterHurtStates,
			},
			[FighterState.HURT_BODY_MEDIUM]: {
				init: this.handleAttackHitInit,
				update: this.handleHeadBodyHit,
				validFrom: FighterHurtStates,
			},
			[FighterState.HURT_BODY_HEAVY]: {
				init: this.handleAttackHitInit,
				update: this.handleHeadBodyHit,
				validFrom: FighterHurtStates,
			},
			[FighterState.VICTORY]: {
				init: this.resetVelocities,
				update: () => {},
				validFrom: Object.values(FighterState),
			},
			[FighterState.KO]: {
				init: this.resetVelocities,
				update: this.handleFallBack,
				shadow: [2.4, 1, 0, 0],
				validFrom: Object.values(FighterState),
			},
		};
		this.controlHistory = new ControlHistory(this);
	}

	hasCollidedWithOpponent = () =>
		rectsOverlap(
			this.position.x + this.boxes.push.pushX,
			this.position.y + this.boxes.push.pushY,
			this.boxes.push.pushWidth,
			this.boxes.push.pushHeight,
			this.opponent.position.x + this.opponent.boxes.push.pushX,
			this.opponent.position.y + this.opponent.boxes.push.pushY,
			this.opponent.boxes.push.pushWidth,
			this.opponent.boxes.push.pushHeight
		);

	getDirection = () => {
		if (
			this.position.x + this.boxes.push.pushX + this.boxes.push.pushWidth >=
			this.opponent.position.x +
				this.opponent.boxes.push.pushX +
				this.opponent.boxes.push.pushWidth
		) {
			return FighterDirection.LEFT;
		} else if (
			this.position.x + this.boxes.push.pushX <=
			this.opponent.position.x +
				this.opponent.boxes.push.pushX +
				this.opponent.boxes.push.pushWidth
		) {
			return FighterDirection.RIGHT;
		}

		return this.direction;
	};

	getBoxes = (frameKey) => {
		const [
			,
			[pushX, pushY, pushWidth, pushHeight] = [0, 0, 0, 0],
			[head, body, legs] = [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
			],
			[hitX, hitY, hitWidth, hitHeight] = [0, 0, 0, 0],
		] = this.frames.get(frameKey);

		return {
			push: { pushX, pushY, pushWidth, pushHeight },
			hurt: {
				[FighterHurtArea.HEAD]: head,
				[FighterHurtArea.BODY]: body,
				[FighterHurtArea.LEGS]: legs,
			},
			hit: { x: hitX, y: hitY, width: hitWidth, height: hitHeight },
		};
	};
	isAnimationCompleted = () => {
		return (
			this.animations[this.currentState][this.animationFrame][1] ===
			FrameDelay.TRANSITION
		);
	};

	changeState = (newState, time) => {
		if (!this.states[newState].validFrom.includes(this.currentState)) {
			console.log(`Illegal move from ${this.currentState} to ${newState}`);
			return;
		}
		this.currentState = newState;
		this.setAnimationFrame(0, time);
		this.states[this.currentState].init(time);
	};

	updateStageConstraints = (time, camera) => {
		const fightersDistance = Math.abs(
			this.position.x - this.opponent.position.x
		);

		// Right Boundary
		if (
			this.position.x - camera.position.x + FIGHTER_DEFAULT_WIDTH >
			SCENE_WIDTH
		) {
			this.position.x = camera.position.x + SCENE_WIDTH - FIGHTER_DEFAULT_WIDTH;
			fightersDistance < 150 && this.resetSlide(true);
		}
		// Left Boundary
		else if (this.position.x - camera.position.x - FIGHTER_DEFAULT_WIDTH < 0) {
			this.position.x = camera.position.x + FIGHTER_DEFAULT_WIDTH;
			fightersDistance < 150 && this.resetSlide(true);
		}

		if (this.hasCollidedWithOpponent()) {
			if (this.position.x < this.opponent.position.x) {
				this.position.x = Math.max(
					this.opponent.position.x +
						this.opponent.boxes.push.pushX -
						(this.boxes.push.pushX + this.boxes.push.pushWidth),
					this.boxes.push.pushWidth - 1
				);

				if (
					[
						FighterState.IDLE,
						FighterState.CROUCH,
						FighterState.JUMP_UP,
						FighterState.JUMP_BACKWARD,
						FighterState.JUMP_FORWARD,
					].includes(this.opponent.currentState)
				) {
					this.opponent.position.x +=
						FIGHTER_PUSH_FRICTION * time.secondsPassed;
				}
			} else if (this.position.x >= this.opponent.position.x) {
				this.position.x = Math.min(
					camera.position.x + SCENE_WIDTH - this.boxes.push.pushWidth,
					this.opponent.position.x + this.opponent.boxes.push.pushWidth
				);
				if (
					[
						FighterState.IDLE,
						FighterState.CROUCH,
						FighterState.JUMP_UP,
						FighterState.JUMP_BACKWARD,
						FighterState.JUMP_FORWARD,
					].includes(this.opponent.currentState)
				) {
					this.opponent.position.x -=
						FIGHTER_PUSH_FRICTION * time.secondsPassed;
				}
			}
		}
	};

	resetVelocities = () => {
		this.velocity = { x: 0, y: 0 };
	};

	handleIdleInit = () => {
		this.resetVelocities();
		this.opponent.attackStruck = false;
	};

	handleIdle = (time) => {
		if (this.victory) {
			this.changeState(FighterState.VICTORY, time);
			return;
		}
		if (__sf_engine_InputHandler_js.isUp(this.playerId, this.direction))
			this.changeState(FighterState.JUMP_START, time);
		else if (__sf_engine_InputHandler_js.isDown(this.playerId))
			this.changeState(FighterState.CROUCH_DOWN, time);
		else if (__sf_engine_InputHandler_js.isForward(this.playerId, this.direction))
			this.changeState(FighterState.WALK_FORWARD, time);
		else if (__sf_engine_InputHandler_js.isBackward(this.playerId, this.direction))
			this.changeState(FighterState.WALK_BACKWARD, time);
		else if (__sf_engine_InputHandler_js.isLightPunch(this.playerId))
			this.changeState(FighterState.LIGHT_PUNCH, time);
		else if (__sf_engine_InputHandler_js.isMediumPunch(this.playerId))
			this.changeState(FighterState.MEDIUM_PUNCH, time);
		else if (__sf_engine_InputHandler_js.isHeavyPunch(this.playerId))
			this.changeState(FighterState.HEAVY_PUNCH, time);
		else if (__sf_engine_InputHandler_js.isLightKick(this.playerId))
			this.changeState(FighterState.LIGHT_KICK, time);
		else if (__sf_engine_InputHandler_js.isMediumKick(this.playerId))
			this.changeState(FighterState.MEDIUM_KICK, time);
		else if (__sf_engine_InputHandler_js.isHeavyKick(this.playerId))
			this.changeState(FighterState.HEAVY_KICK, time);

		const newDirection = this.getDirection();

		if (newDirection !== this.direction) {
			this.direction = newDirection;
			this.changeState(FighterState.IDLE_TURN, time);
		}
	};

	handleWalkForward = (time) => {
		if (!__sf_engine_InputHandler_js.isForward(this.playerId, this.direction))
			this.changeState(FighterState.IDLE, time);
		else if (__sf_engine_InputHandler_js.isUp(this.playerId))
			this.changeState(FighterState.JUMP_FORWARD, time);
		else if (__sf_engine_InputHandler_js.isDown(this.playerId))
			this.changeState(FighterState.CROUCH_DOWN, time);
		else if (__sf_engine_InputHandler_js.isLightPunch(this.playerId))
			this.changeState(FighterState.LIGHT_PUNCH, time);
		else if (__sf_engine_InputHandler_js.isMediumPunch(this.playerId))
			this.changeState(FighterState.MEDIUM_PUNCH, time);
		else if (__sf_engine_InputHandler_js.isHeavyPunch(this.playerId))
			this.changeState(FighterState.HEAVY_PUNCH, time);
		else if (__sf_engine_InputHandler_js.isLightKick(this.playerId))
			this.changeState(FighterState.LIGHT_KICK, time);
		else if (__sf_engine_InputHandler_js.isMediumKick(this.playerId))
			this.changeState(FighterState.MEDIUM_KICK, time);
		else if (__sf_engine_InputHandler_js.isHeavyKick(this.playerId))
			this.changeState(FighterState.HEAVY_KICK, time);
	};

	handleWalkBackward = (time) => {
		if (!__sf_engine_InputHandler_js.isBackward(this.playerId, this.direction))
			this.changeState(FighterState.IDLE, time);
		else if (__sf_engine_InputHandler_js.isUp(this.playerId))
			this.changeState(FighterState.JUMP_BACKWARD, time);
		else if (__sf_engine_InputHandler_js.isDown(this.playerId))
			this.changeState(FighterState.CROUCH_DOWN, time);
		else if (__sf_engine_InputHandler_js.isLightPunch(this.playerId))
			this.changeState(FighterState.LIGHT_PUNCH, time);
		else if (__sf_engine_InputHandler_js.isMediumPunch(this.playerId))
			this.changeState(FighterState.MEDIUM_PUNCH, time);
		else if (__sf_engine_InputHandler_js.isHeavyPunch(this.playerId))
			this.changeState(FighterState.HEAVY_PUNCH, time);
		else if (__sf_engine_InputHandler_js.isLightKick(this.playerId))
			this.changeState(FighterState.LIGHT_KICK, time);
		else if (__sf_engine_InputHandler_js.isMediumKick(this.playerId))
			this.changeState(FighterState.MEDIUM_KICK, time);
		else if (__sf_engine_InputHandler_js.isHeavyKick(this.playerId))
			this.changeState(FighterState.HEAVY_KICK, time);
	};

	handleCrouchDownUpdate = (time) => {
		if (this.isAnimationCompleted()) {
			this.changeState(FighterState.CROUCH, time);
		}
		if (!__sf_engine_InputHandler_js.isDown(this.playerId)) {
			this.currentState = FighterState.CROUCH_UP;
			this.setAnimationFrame(
				Math.max(
					0,
					this.animations[FighterState.CROUCH_UP][this.animationFrame].length -
						this.animationFrame
				),
				time
			);
		}
	};

	handleCrouch = (time) => {
		!__sf_engine_InputHandler_js.isDown(this.playerId) &&
			this.changeState(FighterState.CROUCH_UP, time);

		const newDirection = this.getDirection();
		if (newDirection !== this.direction) {
			this.direction = newDirection;
			this.changeState(FighterState.CROUCH_TURN, time);
		}
	};

	handleCrouchUpUpdate = (time) => {
		if (this.isAnimationCompleted()) {
			this.changeState(FighterState.IDLE, time);
		}
	};

	handleCrouchTurn = (time) => {
		if (this.isAnimationCompleted()) {
			this.changeState(FighterState.CROUCH, time);
		}
	};

	handleMoveInit = () => {
		this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
	};

	handleJumpStartState = (time) => {
		if (this.isAnimationCompleted()) {
			if (__sf_engine_InputHandler_js.isBackward(this.playerId, this.direction))
				this.changeState(FighterState.JUMP_BACKWARD, time);
			else if (__sf_engine_InputHandler_js.isForward(this.playerId, this.direction))
				this.changeState(FighterState.JUMP_FORWARD, time);
			else this.changeState(FighterState.JUMP_UP, time);
		}
	};

	handleJumpLandState = (time) => {
		if (this.animationFrame == 0) {
			playSound(this.soundLand);
			return;
		}
		this.handleIdle(time);
		if (this.isAnimationCompleted()) this.changeState(FighterState.IDLE, time);
	};

	handleJumpInit = () => {
		this.velocity.y = this.initialVelocity.jump;
		this.handleMoveInit();
	};
	handleJump = (time) => {
		this.velocity.y += time.secondsPassed * this.gravity;
		if (this.position.y > STAGE_FLOOR) {
			this.position.y = STAGE_FLOOR;
			this.changeState(FighterState.JUMP_LAND, time);
		}
	};

	handleIdleTurnState = (time) => {
		if (this.isAnimationCompleted()) {
			this.changeState(FighterState.IDLE, time);
		}
	};

	handleAttackInit = (time) => {
		this.resetVelocities();
		playSound(this.soundAttacks[this.states[this.currentState].attackStrength]);
	};

	handleLightAttackReset = (time) => {
		this.setAnimationFrame(0, time);
		this.attackStruck = false;
		this.handleAttackInit();
	};

	handleLightPunch = (time) => {
		if (this.animationFrame < 2) return;
		if (__sf_engine_InputHandler_js.isLightPunch(this.playerId)) this.handleLightAttackReset(time);
		if (!this.isAnimationCompleted()) return;
		this.changeState(FighterState.IDLE, time);
	};
	handleAttackHitInit = (time) => {
		this.resetVelocities();
		this.hurtShake = 2;
		this.hurtShakeTimer = time.previous;
	};

	getAttackHurtState = (attackStrength, hurtArea) => {
		switch (hurtArea) {
			case FighterHurtArea.HEAD:
				switch (attackStrength) {
					case FighterAttackStrength.LIGHT:
						return FighterState.HURT_HEAD_LIGHT;
					case FighterAttackStrength.MEDIUM:
						return FighterState.HURT_HEAD_MEDIUM;
					case FighterAttackStrength.HEAVY:
						return FighterState.HURT_HEAD_HEAVY;
					default:
						break;
				}
				break;
			case FighterHurtArea.BODY:
				switch (attackStrength) {
					case FighterAttackStrength.LIGHT:
						return FighterState.HURT_BODY_LIGHT;
					case FighterAttackStrength.MEDIUM:
						return FighterState.HURT_BODY_MEDIUM;
					case FighterAttackStrength.HEAVY:
						return FighterState.HURT_BODY_HEAVY;
					default:
						break;
				}
				break;
			default:
				switch (attackStrength) {
					case FighterAttackStrength.LIGHT:
						return FighterState.HURT_HEAD_LIGHT;
					case FighterAttackStrength.MEDIUM:
						return FighterState.HURT_HEAD_MEDIUM;
					case FighterAttackStrength.HEAVY:
						return FighterState.HURT_HEAD_HEAVY;
					default:
						break;
				}
				break;
		}
	};

	handleAttackHit = (
		time,
		attackStrength,
		hurtArea,
		attackType,
		hitPosition
	) => {
		const newState = this.getAttackHurtState(attackStrength, hurtArea);
		this.slideVelocity = FighterAttackBaseData[attackStrength].slide.velocity;
		this.slideFriction = FighterAttackBaseData[attackStrength].slide.friction;

		playSound(this.soundHits[attackStrength][attackType]);
		this.opponent.attackStruck = true;
		this.onAttackHit(
			time,
			this.opponent.playerId,
			this.playerId,
			hitPosition,
			attackStrength
		);

		this.changeState(newState, time);
	};

	handleHeadBodyHit = (time) => {
		if (!this.isAnimationCompleted()) return;
		this.hurtShake = 0;
		this.hurtShakeTimer = 0;
		this.opponent.attackStruck = false;
		this.changeState(FighterState.IDLE, time);
	};

	handleFallBack = (time) => {
		if (this.animationFrame === 2 && this.position.y >= STAGE_FLOOR) {
			this.animationFrame++;
			this.velocity.y = 0;
			this.position.y = STAGE_FLOOR;
		} else if (this.animationFrame === 2) this.velocity.y = 120;
		if (!this.isAnimationCompleted()) return;
		this.hurtShake = 0;
		this.hurtShakeTimer = 0;
		this.opponent.attackStruck = false;
		this.changeState(FighterState.IDLE, time);
	};

	handleMedPunch = (time) => {
		if (this.isAnimationCompleted()) {
			this.changeState(FighterState.IDLE, time);
		}
	};

	handleHeavyPunch = (time) => {
		if (this.isAnimationCompleted()) {
			this.changeState(FighterState.IDLE, time);
		}
	};

	handleLightKick = (time) => {
		if (this.animationFrame < 2) return;
		if (__sf_engine_InputHandler_js.isLightKick(this.playerId)) this.handleLightAttackReset(time);
		if (!this.isAnimationCompleted()) return;
		this.changeState(FighterState.IDLE, time);
	};

	handleMedKick = (time) => {
		if (this.isAnimationCompleted()) {
			this.changeState(FighterState.IDLE, time);
		}
	};

	handleHeavyKick = (time) => {
		if (this.isAnimationCompleted()) {
			this.changeState(FighterState.IDLE, time);
		}
	};

	setAnimationFrame = (animationFrame, time) => {
		const animation = this.animations[this.currentState];
		this.animationFrame = animationFrame;
		if (this.animationFrame >= animation.length) this.animationFrame = 0;

		const [frameKey, frameDelay] = animation[this.animationFrame];
		this.boxes = this.getBoxes(frameKey);
		this.animationTimer = time.previous + frameDelay * FRAME_TIME;
	};

	updateAnimation = (time) => {
		const animation = this.animations[this.currentState];
		if (!animation?.[this.animationFrame]) {
			this.setAnimationFrame(0, time);
			return;
		}
		if (
			animation[this.animationFrame][1] <= FrameDelay.FREEZE ||
			time.previous <= this.animationTimer
		)
			return;
		this.setAnimationFrame(this.animationFrame + 1, time);
	};

	updateAttackBoxCollided = (time) => {
		if (!this.states[this.currentState].attackType || this.attackStruck) return;

		const actualHitBox = getActualBoxDimensions(
			this.position,
			this.direction,
			this.boxes.hit
		);

		for (const [hurtArea, hurtBox] of Object.entries(
			this.opponent.boxes.hurt
		)) {
			if (this.attackStruck) return;
			const [x, y, width, height] = hurtBox;
			const actualOpponentHurtBox = getActualBoxDimensions(
				this.opponent.position,
				this.opponent.direction,
				{ x, y, width, height }
			);

			if (!boxOverlap(actualHitBox, actualOpponentHurtBox)) return;

			const { attackStrength, attackType } = this.states[this.currentState];

			stopSound(this.soundAttacks[attackStrength]);

			const hitPosition = {
				x:
					(actualHitBox.x +
						actualHitBox.width / 2 +
						actualOpponentHurtBox.x +
						actualOpponentHurtBox.width / 2) /
					2,
				y:
					(actualHitBox.y +
						actualOpponentHurtBox.y +
						actualHitBox.height / 2 +
						actualOpponentHurtBox.width / 2) /
					2,
			};

			hitPosition.x += 4 - Math.random() * HIT_SPLASH_RANDOMNESS;
			hitPosition.y += 4 - Math.random() * HIT_SPLASH_RANDOMNESS;

			this.opponent.handleAttackHit(
				time,
				attackStrength,
				hurtArea,
				attackType,
				hitPosition
			);
		}
	};

	updatePositions = (time) => {
		this.position.x +=
			(this.velocity.x - this.slideVelocity) *
			this.direction *
			time.secondsPassed;
		this.position.y += this.velocity.y * time.secondsPassed;
	};

	resetSlide = (transfer = false) => {
		if (transfer) {
			this.opponent.slideVelocity = this.slideVelocity;
			this.opponent.slideFriction = this.slideFriction;
		}
		this.slideVelocity = 0;
		this.slideFriction = 0;
	};

	updateSlide = (time) => {
		if (this.slideVelocity <= 0) {
			this.resetSlide();
			return;
		}
		this.slideVelocity =
			this.slideVelocity - this.slideFriction * time.secondsPassed;
	};

	updateHurtShake = (time, delay) => {
		if (
			this.hurtShakeTimer + FRAME_TIME < time.previous &&
			!this.attackStruck
		) {
			const shakeAmount =
				delay - time.previous >= (FighterStruckDelay * FRAME_TIME) / 2 ? 2 : 1;
			this.hurtShake = shakeAmount - this.hurtShake;
			this.hurtShakeTimer = time.previous;
		}
	};

	update = (time, camera) => {
		this.states[this.currentState].update(time);
		this.updatePositions(time);
		this.updateSlide(time);
		this.updateAnimation(time);
		this.updateStageConstraints(time, camera);
		this.updateAttackBoxCollided(time);
		this.controlHistory.update(time);
	};

	draw = (context, camera) => {
		const animation = this.animations[this.currentState];
		if (!animation?.[this.animationFrame]) {
			this.setAnimationFrame(0, { previous: 0 });
		}
		const frameKey = this.animations[this.currentState][this.animationFrame][0];
		const [[[x, y, width, height], [originX, originY]]] =
			this.frames.get(frameKey);

		context.scale(this.direction, 1);

		context.drawImage(
			this.image,
			x - this.hurtShake,
			y,
			width,
			height,
			Math.floor((this.position.x - camera.position.x) * this.direction) -
				originX,
			Math.floor(this.position.y - camera.position.y) - originY,
			width,
			height
		);

		context.setTransform(1, 0, 0, 1, 0, 0);
		DRAW_DEBUG && DEBUG_drawCollisionInfo(this, context, camera);
	};
}

const __sf_entitites_fighters_Fighter_js = {
	"Fighter": Fighter
};


// static/game/src/constants/fireball.js
const fireballVelocity = {
	[FighterAttackStrength.LIGHT]: 150,
	[FighterAttackStrength.MEDIUM]: 220,
	[FighterAttackStrength.HEAVY]: 300,
};

const FireballCollisionType = {
	OPPONENT: 'opponent',
	FIREBALL: 'fireball',
};

const FireballState = {
	ACTIVE: 'active',
	COLLIDED: 'collided',
};

const __sf_constants_fireball_js = {
	"fireballVelocity": fireballVelocity,
	"FireballCollisionType": FireballCollisionType,
	"FireballState": FireballState
};


// static/game/src/entitites/fighters/special/Fireball.js
class Fireball {
	image = document.getElementById('KenImage');

	animationFrame = 0;
	animationTimer = 0;

	frames = new Map([
		[
			'hadouken-fireball-1',
			[
				[
					[400, 2756, 43, 32],
					[25, 16],
				],
				[-15, -13, 30, 24],
				[-28, -20, 56, 38],
			],
		],
		[
			'hadouken-fireball-2',
			[
				[
					[460, 2761, 56, 28],
					[37, 14],
				],
				[-15, -13, 30, 24],
				[-28, -20, 56, 38],
			],
		],
		[
			'hadouken-fireball-3',
			[
				[
					[0, 0, 0, 0],
					[0, 0],
				],
				[-15, -13, 30, 24],
				[-28, -20, 56, 38],
			],
		],
		[
			'hadouken-collide-1',
			[
				[
					[543, 2767, 26, 20],
					[13, 10],
				],
				[0, 0, 0, 0],
			],
		],
		[
			'hadouken-collide-2',
			[
				[
					[590, 2766, 15, 25],
					[9, 13],
				],
				[0, 0, 0, 0],
			],
		],
		[
			'hadouken-collide-3',
			[
				[
					[625, 2764, 28, 28],
					[26, 14],
				],
				[0, 0, 0, 0],
			],
		],
	]);

	animations = {
		[FireballState.ACTIVE]: [
			['hadouken-fireball-1', 5],
			['hadouken-fireball-3', 2],
			['hadouken-fireball-2', 5],
			['hadouken-fireball-3', 1],
		],
		[FireballState.COLLIDED]: [
			['hadouken-collide-1', 13],
			['hadouken-collide-2', 3],
			['hadouken-collide-3', 7],
		],
	};

	currentState = FireballState.ACTIVE;
	networkControlled = false;

	constructor(fighter, strength, time, entities) {
		this.fighter = fighter;
		this.direction = this.fighter.direction;
		this.strength = strength;
		this.velocity = fireballVelocity[strength];
		this.entities = entities;
		this.position = {
			x: this.fighter.position.x + 76 * this.direction,
			y: this.fighter.position.y - 57,
		};
		this.animationTimer = time.previous;
	}

	endFireball = () => {
		this.entities.remove(this);
		this.fighter.fireballInstance = undefined;
	};

	handleCollidedInit = (time, speed = 0.333) => {
		this.velocity *= speed;
		this.currentState = FireballState.COLLIDED;
		this.animationFrame = 0;
		this.animationTimer =
			time.previous +
			this.animations[this.currentState][this.animationFrame][1] * FRAME_TIME;
	};

	updateAnimation = (time) => {
		if (this.animationTimer > time.previous) return;

		this.animationFrame++;

		if (this.animationFrame >= this.animations[this.currentState].length) {
			this.animationFrame = 0;
			if (
				this.currentState === FireballState.COLLIDED &&
				!this.networkControlled
			)
				this.endFireball();
		}
		this.animationTimer =
			time.previous +
			this.animations[this.currentState][this.animationFrame][1] * FRAME_TIME;
	};

	updateMovement = (time, camera) => {
		this.position.x += this.velocity * this.direction * time.secondsPassed;
		if (
			this.position.x - camera.position.x >= SCENE_WIDTH + 56 ||
			this.position.x - camera.position.x <= -56
		) {
			this.endFireball();
		}

		if (this.currentState === FireballState.COLLIDED) return;
		const collided = this.hasFireballCollided(time);
		if (!collided) return;
		if (collided.collisionType === FireballCollisionType.OPPONENT)
			this.handleCollisionWithOpponent(time, collided.hurtArea);
		else this.handleCollisionWithFireball(time, collided.otherFireball);
	};

	handleCollisionWithFireball = (time, otherFireball) => {
		this.handleCollidedInit(time, 0.1);
		otherFireball.handleCollidedInit(time, 0.1);
		this.currentState = FireballState.COLLIDED;
		otherFireball.currentState = FireballState.COLLIDED;
	};

	handleCollisionWithOpponent = (time, hurtArea) => {
		this.handleCollidedInit(time, 0.33);
		this.fighter.opponent.handleAttackHit(
			time,
			this.strength,
			hurtArea,
			FighterAttackType.PUNCH,
			undefined
		);
	};

	hasCollidedWithOtherFireball = (actualFireballDimensions, otherFireball) => {
		const [x, y, width, height] = otherFireball.frames.get(
			otherFireball.animations[otherFireball.currentState][
				otherFireball.animationFrame
			][0]
		)[1];

		const actualOtherFireballDimensions = getActualBoxDimensions(
			otherFireball.position,
			otherFireball.direction,
			{ x, y, width, height }
		);

		if (!boxOverlap(actualFireballDimensions, actualOtherFireballDimensions))
			return false;
		return {
			collisionType: FireballCollisionType.FIREBALL,
			otherFireball,
		};
	};

	hasFireballCollidedWithOpponent = (actualFireballDimensions, opponent) => {
		for (const [hurtArea, dimensions] of Object.entries(opponent.boxes.hurt)) {
			const [x, y, width, height] = dimensions;
			const actualHurtDimensions = getActualBoxDimensions(
				this.fighter.opponent.position,
				this.fighter.opponent.direction,
				{ x, y, width, height }
			);
			if (boxOverlap(actualFireballDimensions, actualHurtDimensions)) {
				return {
					collisionType: FireballCollisionType.OPPONENT,
					hurtArea,
				};
			}
		}
		return false;
	};

	hasFireballCollided = () => {
		var [x, y, width, height] = this.frames.get(
			this.animations[this.currentState][this.animationFrame][0]
		)[1];

		const actualFireballDimensions = getActualBoxDimensions(
			this.position,
			this.direction,
			{ x, y, width, height }
		);
		//Other Fireballs
		for (const entity of this.entities.entitiesList) {
			if (entity instanceof Fireball && entity !== this) {
				const hasCollidedWithOtherFireball = this.hasCollidedWithOtherFireball(
					actualFireballDimensions,
					entity
				);
				if (hasCollidedWithOtherFireball) return hasCollidedWithOtherFireball;
			}
		}

		const hasCollidedWithOpponent = this.hasFireballCollidedWithOpponent(
			actualFireballDimensions,
			this.fighter.opponent
		);
		if (hasCollidedWithOpponent) return hasCollidedWithOpponent;
	};

	update = (time, camera) => {
		this.updateAnimation(time);
		if (this.networkControlled) return;
		this.updateMovement(time, camera);
	};

	applyNetworkState = (state = {}) => {
		this.position.x = Number(state.position?.x ?? this.position.x);
		this.position.y = Number(state.position?.y ?? this.position.y);
		this.direction = Number(state.direction) < 0 ? -1 : 1;
		this.strength = Number(state.strength ?? this.strength);
		if (this.animations[state.currentState]) {
			this.currentState = state.currentState;
		}
		const animation = this.animations[this.currentState];
		const frame = Math.trunc(Number(state.animationFrame) || 0);
		this.animationFrame = Math.max(0, Math.min(frame, animation.length - 1));
		this.networkControlled = true;
	};

	drawFireball = (context, camera) => {
		const frameKey = this.animations[this.currentState][this.animationFrame][0];

		const [[[x, y, width, height], [originX, originY]]] =
			this.frames.get(frameKey);

		context.scale(this.direction, 1);
		context.drawImage(
			this.image,
			x,
			y,
			width,
			height,
			Math.floor(this.position.x - camera.position.x) * this.direction -
				originX,
			Math.floor(this.position.y - camera.position.y) - originY,
			width,
			height
		);

		context.setTransform(1, 0, 0, 1, 0, 0);
	};

	draw = (context, camera) => {
		this.drawFireball(context, camera);

		DRAW_DEBUG &&
			drawDebugBox(
				context,
				camera,
				this.position,
				this.direction,
				this.frames.get(
					this.animations[this.currentState][this.animationFrame][0]
				)[1],
				'#ff0000'
			);
	};
}

const __sf_entitites_fighters_special_Fireball_js = {
	"Fireball": Fireball
};


// static/game/src/entitites/fighters/Ken.js
class Ken extends Fighter {
	image = document.getElementById('KenImage');

	soundHadouken = document.getElementById(soundHadoukenId[FighterId.KEN]);

	fireballFired = false;

	frames = new Map([
		// Idle
		// [
		// 	[Frames, origin],
		// 	pushbox = [originX from Origin, originY from Origin, Width, Height],
		// 	[
		// 		HurtHead = [originX from Origin, originY from Origin, Width, Height], HurtTorso,
		// 		HurtFeet
		// 	],
		// 	Hitbox = [originX from Origin, originY from Origin, Width, Height
		// 	]
		// ]
		[
			'idle-1',
			[
				[
					[346, 688, 60, 89],
					[34, 86],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'idle-2',
			[
				[
					[2, 687, 59, 90],
					[33, 87],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'idle-3',
			[
				[
					[72, 685, 58, 92],
					[32, 89],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'idle-4',
			[
				[
					[142, 684, 55, 93],
					[31, 90],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],

		// Forward
		[
			'forwards-1',
			[
				[
					[8, 872, 53, 83],
					[27, 82],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],
		[
			'forwards-2',
			[
				[
					[70, 867, 60, 88],
					[35, 86],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],
		[
			'forwards-3',
			[
				[
					[140, 866, 64, 90],
					[35, 87],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],
		[
			'forwards-4',
			[
				[
					[215, 865, 63, 89],
					[29, 88],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],
		[
			'forwards-5',
			[
				[
					[288, 866, 54, 89],
					[25, 87],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],
		[
			'forwards-6',
			[
				[
					[357, 867, 50, 89],
					[25, 86],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],

		// Backward
		[
			'backwards-1',
			[
				[
					[417, 868, 61, 87],
					[35, 85],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],
		[
			'backwards-2',
			[
				[
					[487, 866, 59, 90],
					[36, 87],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],
		[
			'backwards-3',
			[
				[
					[558, 865, 57, 90],
					[36, 88],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],
		[
			'backwards-4',
			[
				[
					[629, 864, 58, 90],
					[38, 89],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],
		[
			'backwards-5',
			[
				[
					[702, 865, 58, 91],
					[36, 88],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],
		[
			'backwards-6',
			[
				[
					[773, 866, 57, 89],
					[36, 87],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],

		[
			'jump-start/land',
			[
				[
					[660, 1060, 55, 85],
					[29, 83],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'jump-up-1',
			[
				[
					[724, 1036, 56, 104],
					[32, 107],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],
		[
			'jump-up-2',
			[
				[
					[792, 995, 50, 89],
					[25, 103],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],
		[
			'jump-up-3',
			[
				[
					[853, 967, 54, 77],
					[25, 103],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],
		[
			'jump-up-4',
			[
				[
					[911, 966, 48, 70],
					[28, 101],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],
		[
			'jump-up-5',
			[
				[
					[975, 977, 48, 86],
					[25, 103],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],
		[
			'jump-up-6',
			[
				[
					[1031, 1008, 55, 103],
					[32, 107],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],

		// Jump Forward
		[
			'jump-roll-1',
			[
				[
					[1237, 1037, 55, 103],
					[25, 106],
				],
				PushBox.JUMP,
				[
					[-11, -106, 24, 16],
					[-26, -90, 40, 42],
					[-26, -31, 40, 32],
				],
			],
		],
		[
			'jump-roll-2',
			[
				[
					[1301, 990, 61, 78],
					[22, 90],
				],
				PushBox.JUMP,
				[
					[17, -90, 24, 16],
					[-14, -91, 40, 42],
					[-22, -66, 38, 18],
				],
			],
		],
		[
			'jump-roll-3',
			[
				[
					[1363, 994, 104, 42],
					[61, 76],
				],
				PushBox.JUMP,
				[
					[22, -51, 24, 16],
					[-14, -81, 40, 42],
					[-22, -66, 38, 18],
				],
			],
		],
		[
			'jump-roll-4',
			[
				[
					[1468, 957, 53, 82],
					[42, 111],
				],
				PushBox.JUMP,
				[
					[-39, -46, 24, 16],
					[-30, -88, 40, 42],
					[-34, -118, 44, 48],
				],
			],
		],
		[
			'jump-roll-5',
			[
				[
					[1541, 988, 122, 44],
					[71, 81],
				],
				PushBox.JUMP,
				[
					[-72, -56, 24, 16],
					[-54, -77, 52, 40],
					[-14, -82, 48, 34],
				],
			],
		],
		[
			'jump-roll-6',
			[
				[
					[1664, 976, 71, 87],
					[53, 98],
				],
				PushBox.JUMP,
				[
					[-55, -100, 24, 16],
					[-48, -87, 44, 38],
					[-22, -66, 38, 18],
				],
			],
		],
		[
			'jump-roll-7',
			[
				[
					[1748, 977, 55, 103],
					[32, 107],
				],
				PushBox.JUMP,
				[
					[-11, -106, 24, 16],
					[-26, -90, 40, 42],
					[-26, -31, 40, 32],
				],
			],
		],

		// Crouch

		[
			'crouch-1',
			[
				[
					[8, 779, 53, 83],
					[27, 81],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'crouch-2',
			[
				[
					[79, 794, 57, 69],
					[25, 66],
				],
				PushBox.BEND,
				HurtBox.BEND,
			],
		],
		[
			'crouch-3',
			[
				[
					[148, 802, 61, 61],
					[25, 58],
				],
				PushBox.CROUCH,
				HurtBox.CROUCH,
			],
		],

		// Stand Turn
		[
			'idle-turn-1',

			[
				[
					[420, 682, 54, 95],
					[29, 92],
				],
				PushBox.IDLE,
				[
					[-10, -89, 28, 18],
					[-14, -74, 40, 42],
					[-14, -31, 40, 32],
				],
			],
		],
		[
			'idle-turn-2',
			[
				[
					[488, 678, 58, 98],
					[30, 95],
				],
				PushBox.IDLE,
				[
					[-16, -96, 28, 18],
					[-14, -74, 40, 42],
					[-14, -31, 40, 32],
				],
			],
		],
		[
			'idle-turn-3',
			[
				[
					[560, 683, 54, 94],
					[27, 90],
				],
				PushBox.IDLE,
				[
					[-16, -96, 28, 18],
					[-14, -74, 40, 42],
					[-14, -31, 40, 32],
				],
			],
		],
		// Crouch Turn
		[
			'crouch-turn-1',
			[
				[
					[356, 802, 53, 61],
					[26, 58],
				],
				PushBox.CROUCH,
				[
					[-7, -60, 24, 18],
					[-28, -46, 44, 24],
					[-28, -24, 44, 24],
				],
			],
		],
		[
			'crouch-turn-2',
			[
				[
					[424, 802, 52, 61],
					[27, 58],
				],
				PushBox.CROUCH,
				[
					[-7, -60, 24, 18],
					[-28, -46, 44, 24],
					[-28, -24, 44, 24],
				],
			],
		],
		[
			'crouch-turn-3',
			[
				[
					[486, 802, 53, 61],
					[29, 58],
				],
				PushBox.CROUCH,
				[
					[-26, -61, 24, 18],
					[-28, -46, 44, 24],
					[-28, -24, 44, 24],
				],
			],
		],

		// Light Punch
		[
			'light-punch-1',
			[
				[
					[3, 1152, 64, 91],
					[32, 88],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'light-punch-2',
			[
				[
					[72, 1152, 92, 91],
					[32, 88],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
				[11, -85, 50, 18],
			],
		],

		// Medium/Heavy Punch
		[
			'med-punch-1',
			[
				[
					[517, 1149, 60, 94],
					[28, 91],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'med-punch-2',
			[
				[
					[650, 1148, 74, 95],
					[29, 92],
				],
				PushBox.IDLE,
				HurtBox.PUNCH,
			],
		],
		[
			'med-punch-3',
			[
				[
					[736, 1148, 108, 94],
					[24, 92],
				],
				PushBox.IDLE,
				HurtBox.PUNCH,
				[17, -85, 68, 14],
			],
		],
		// Heavy Punch
		[
			'heavy-punch-1',
			[
				[
					[736, 1148, 108, 94],
					[24, 92],
				],
				PushBox.IDLE,
				HurtBox.PUNCH,
				[17, -85, 76, 14],
			],
		],

		// Light Kick
		[
			'light-kick-1',
			[
				[
					[62, 1565, 66, 92],
					[46, 93],
				],
				PushBox.IDLE,
				[
					[-33, -96, 30, 18],
					[-41, -79, 42, 38],
					[-32, -52, 44, 50],
				],
			],
		],
		[
			'light-kick-2',
			[
				[
					[143, 1565, 114, 92],
					[68, 93],
				],
				PushBox.IDLE,
				[
					[-65, -96, 30, 18],
					[-57, -79, 42, 38],
					[-32, -52, 44, 50],
				],
				[-17, -98, 66, 28],
			],
		],
		// Medium Kick
		[
			'med-kick-1',
			[
				[
					[143, 1565, 114, 92],
					[68, 93],
				],
				PushBox.IDLE,
				[
					[-65, -96, 30, 18],
					[-57, -79, 42, 38],
					[-32, -52, 44, 50],
				],
				[-18, -98, 80, 28],
			],
		],
		// Heavy Kick
		[
			'heavy-kick-1',
			[
				[
					[683, 1571, 61, 90],
					[37, 87],
				],
				PushBox.IDLE,
				[
					[-41, -78, 20, 20],
					[-25, -78, 42, 42],
					[-11, -50, 42, 50],
				],
			],
		],
		[
			'heavy-kick-2',
			[
				[
					[763, 1567, 95, 94],
					[45, 91],
				],
				PushBox.IDLE,
				[
					[12, -90, 34, 34],
					[-25, -78, 42, 42],
					[-11, -50, 42, 50],
				],
				[15, -99, 40, 32],
			],
		],
		[
			'heavy-kick-3',
			[
				[
					[870, 1567, 120, 94],
					[42, 91],
				],
				PushBox.IDLE,
				[
					[13, -91, 62, 34],
					[-25, -78, 42, 42],
					[-11, -50, 42, 50],
				],
				[21, -97, 62, 24],
			],
		],
		[
			'heavy-kick-4',
			[
				[
					[1005, 1584, 101, 77],
					[39, 74],
				],
				PushBox.IDLE,
				[
					[-41, -78, 20, 20],
					[-25, -78, 42, 42],
					[-11, -50, 42, 50],
				],
			],
		],
		[
			'heavy-kick-5',
			[
				[
					[1147, 1580, 64, 81],
					[38, 78],
				],
				PushBox.IDLE,
				[
					[-41, -78, 20, 20],
					[-25, -78, 42, 42],
					[-11, -50, 42, 50],
				],
			],
		],

		// Hit Face
		[
			'hit-face-1',
			[
				[
					[325, 3275, 62, 91],
					[41, 88],
				],
				PushBox.IDLE,
				[
					[-25, -89, 20, 20],
					[-33, -74, 40, 46],
					[-30, -37, 40, 38],
				],
			],
		],
		[
			'hit-face-2',
			[
				[
					[400, 3279, 68, 88],
					[47, 85],
				],
				PushBox.IDLE,
				[
					[-42, -88, 20, 20],
					[-46, -74, 40, 46],
					[-33, -37, 40, 38],
				],
			],
		],
		[
			'hit-face-3',
			[
				[
					[484, 3279, 73, 88],
					[54, 85],
				],
				PushBox.IDLE,
				[
					[-52, -87, 20, 20],
					[-53, -71, 40, 46],
					[-33, -37, 40, 38],
				],
			],
		],
		[
			'hit-face-4',
			[
				[
					[575, 3274, 83, 93],
					[58, 90],
				],
				PushBox.IDLE,
				[
					[-57, -88, 20, 20],
					[-53, -71, 40, 46],
					[-33, -37, 40, 38],
				],
			],
		],
		// Hit Stomach
		[
			'hit-stomach-1',
			[
				[
					[1, 3279, 58, 85],
					[37, 83],
				],
				PushBox.IDLE,
				[
					[-15, -85, 28, 18],
					[-31, -69, 42, 42],
					[-30, -34, 42, 34],
				],
			],
		],
		[
			'hit-stomach-2',
			[
				[
					[74, 3282, 66, 82],
					[39, 80],
				],
				PushBox.IDLE,
				[
					[-17, 82, 28, 18],
					[-33, -65, 38, 36],
					[-34, -34, 42, 34],
				],
			],
		],
		[
			'hit-stomach-3',
			[
				[
					[149, 3287, 71, 78],
					[47, 75],
				],
				PushBox.IDLE,
				[
					[-17, 82, 28, 18],
					[-41, -59, 38, 30],
					[-34, -34, 42, 34],
				],
			],
		],
		[
			'hit-stomach-4',
			[
				[
					[231, 3293, 75, 72],
					[50, 69],
				],
				PushBox.IDLE,
				[
					[-28, -67, 28, 18],
					[-41, -59, 38, 30],
					[-40, -34, 42, 34],
				],
			],
		],
		[
			// Stunned
			'stun-1',
			[
				[
					[149, 3370, 77, 87],
					[28, 85],
				],
				PushBox.IDLE,
				[
					[8, -87, 28, 18],
					[-16, -75, 40, 46],
					[-26, -31, 40, 32],
				],
			],
		],
		[
			'stun-2',
			[
				[
					[77, 3368, 65, 89],
					[28, 87],
				],
				PushBox.IDLE,
				[
					[-9, -89, 28, 18],
					[-23, -75, 40, 46],
					[-26, -31, 40, 32],
				],
			],
		],
		[
			'stun-3',
			[
				[
					[1, 3367, 67, 90],
					[35, 88],
				],
				PushBox.IDLE,
				[
					[-22, -91, 28, 18],
					[-30, -72, 42, 40],
					[-26, -31, 40, 32],
				],
			],
		],

		// Ha doo ken
		[
			'special-1',
			[
				[
					[3, 2741, 74, 90],
					[28, 89],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'special-2',
			[
				[
					[91, 2747, 85, 83],
					[25, 83],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'special-3',
			[
				[
					[188, 2750, 90, 81],
					[25, 80],
				],
				PushBox.IDLE,
				HurtBox.PUNCH,
			],
		],
		[
			'special-4',
			[
				[
					[293, 2754, 106, 77],
					[23, 76],
				],
				PushBox.IDLE,
				[
					[38, -79, 26, 18],
					[21, -65, 40, 38],
					[-12, -30, 78, 30],
				],
			],
		],

		// Victor
		[
			'victory-1',
			[
				[
					[71, 3625, 60, 89],
					[30, 88],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'victory-2',
			[
				[
					[140, 3617, 60, 97],
					[30, 96],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'victory-3',
			[
				[
					[207, 3601, 57, 113],
					[33, 112],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'victory-4',
			[
				[
					[272, 3616, 56, 99],
					[34, 98],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'victory-5',
			[
				[
					[344, 3622, 61, 94],
					[32, 92],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],

		// Falling

		[
			'fall-1',
			[
				[
					[1, 3504, 82, 68],
					[50, 80],
				],
				PushBox.IDLE,
				HurtBox.INVINCLIBLE,
			],
		],
		[
			'fall-2',
			[
				[
					[84, 3460, 102, 45],
					[50, 80],
				],
				PushBox.IDLE,
				HurtBox.INVINCLIBLE,
			],
		],
		[
			'fall-3',
			[
				[
					[188, 3465, 77, 80],
					[40, 80],
				],
				PushBox.IDLE,
				HurtBox.INVINCLIBLE,
			],
		],
		[
			'fall-4',
			[
				[
					[340, 3477, 124, 48],
					[60, 45],
				],
				PushBox.IDLE,
				HurtBox.INVINCLIBLE,
			],
		],
		[
			'fall-5',
			[
				[
					[709, 3568, 128, 31],
					[60, 30],
				],
				PushBox.IDLE,
				HurtBox.INVINCLIBLE,
			],
		],
	]);

	animations = {
		[FighterState.JUMP_START]: [
			['jump-start/land', 3],
			['jump-start/land', FrameDelay.TRANSITION],
		],

		[FighterState.JUMP_LAND]: [
			['jump-start/land', 2],
			['jump-start/land', 5],
			['jump-start/land', FrameDelay.TRANSITION],
		],
		[FighterState.JUMP_FORWARD]: [
			['jump-roll-1', 13],
			['jump-roll-2', 5],
			['jump-roll-3', 3],
			['jump-roll-4', 3],
			['jump-roll-5', 3],
			['jump-roll-6', 5],
			['jump-roll-7', FrameDelay.FREEZE],
		],
		[FighterState.JUMP_BACKWARD]: [
			['jump-roll-7', 15],
			['jump-roll-6', 3],
			['jump-roll-5', 3],
			['jump-roll-4', 3],
			['jump-roll-3', 3],
			['jump-roll-2', 3],
			['jump-roll-1', FrameDelay.FREEZE],
		],
		[FighterState.IDLE]: [
			['idle-1', 4],
			['idle-2', 4],
			['idle-3', 4],
			['idle-4', 4],
			['idle-3', 4],
			['idle-2', 4],
		],

		[FighterState.WALK_FORWARD]: [
			['forwards-1', 3],
			['forwards-2', 6],
			['forwards-3', 4],
			['forwards-4', 4],
			['forwards-5', 4],
			['forwards-6', 6],
		],

		[FighterState.WALK_BACKWARD]: [
			['backwards-1', 3],
			['backwards-2', 6],
			['backwards-3', 4],
			['backwards-4', 4],
			['backwards-5', 4],
			['backwards-6', 6],
		],
		[FighterState.JUMP_UP]: [
			['jump-up-1', 8],
			['jump-up-2', 8],
			['jump-up-3', 8],
			['jump-up-4', 8],
			['jump-up-5', 8],
			['jump-up-6', FrameDelay.FREEZE],
		],
		[FighterState.CROUCH_DOWN]: [
			['crouch-1', 2],
			['crouch-2', 2],
			['crouch-3', 2],
			['crouch-3', FrameDelay.TRANSITION],
		],
		[FighterState.CROUCH]: [['crouch-3', FrameDelay.TRANSITION]],
		[FighterState.CROUCH_UP]: [
			['crouch-3', 2],
			['crouch-2', 2],
			['crouch-1', 2],
			['crouch-1', FrameDelay.TRANSITION],
		],
		[FighterState.IDLE_TURN]: [
			['idle-turn-3', 2],
			['idle-turn-2', 2],
			['idle-turn-1', 2],
			['idle-turn-1', FrameDelay.TRANSITION],
		],
		[FighterState.CROUCH_TURN]: [
			['crouch-turn-3', 2],
			['crouch-turn-2', 2],
			['crouch-turn-1', 2],
			['crouch-turn-1', FrameDelay.TRANSITION],
		],
		[FighterState.LIGHT_PUNCH]: [
			['light-punch-1', 2],
			['light-punch-2', 4],
			['light-punch-1', 4],
			['light-punch-1', FrameDelay.TRANSITION],
		],

		[FighterState.MEDIUM_PUNCH]: [
			['med-punch-1', 1],
			['med-punch-2', 2],
			['med-punch-3', 4],
			['med-punch-2', 3],
			['med-punch-1', 3],
			['med-punch-1', FrameDelay.TRANSITION],
		],
		[FighterState.HEAVY_PUNCH]: [
			['med-punch-1', 3],
			['med-punch-2', 2],
			['heavy-punch-1', 6],
			['med-punch-2', 10],
			['med-punch-1', 12],
			['med-punch-1', FrameDelay.TRANSITION],
		],

		[FighterState.LIGHT_KICK]: [
			['med-punch-1', 3],
			['light-kick-1', 3],
			['light-kick-2', 8],
			['light-kick-1', 4],
			['med-punch-1', 1],
			['med-punch-1', FrameDelay.TRANSITION],
		],
		[FighterState.MEDIUM_KICK]: [
			['med-punch-1', 5],
			['light-kick-1', 6],
			['med-kick-1', 12],
			['light-kick-1', 7],
			['light-kick-1', FrameDelay.TRANSITION],
		],
		[FighterState.HEAVY_KICK]: [
			['heavy-kick-1', 2],
			['heavy-kick-2', 4],
			['heavy-kick-3', 8],
			['heavy-kick-4', 10],
			['heavy-kick-5', 7],
			['heavy-kick-5', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_HEAD_LIGHT]: [
			['hit-face-1', FighterStruckDelay],
			['hit-face-1', 3],
			['hit-face-2', 8],
			['hit-face-2', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_HEAD_MEDIUM]: [
			['hit-face-1', FighterStruckDelay],
			['hit-face-1', 3],
			['hit-face-2', 4],
			['hit-face-3', 9],
			['hit-face-3', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_HEAD_HEAVY]: [
			['hit-face-3', FighterStruckDelay],
			['hit-face-3', 7],
			['hit-face-4', 4],
			['stun-3', 9],
			['stun-3', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_BODY_LIGHT]: [
			['hit-stomach-1', FighterStruckDelay],
			['hit-stomach-1', 11],
			['hit-stomach-1', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_BODY_MEDIUM]: [
			['hit-stomach-1', FighterStruckDelay],
			['hit-stomach-1', 7],
			['hit-stomach-2', 9],
			['hit-stomach-2', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_BODY_HEAVY]: [
			['hit-stomach-2', FighterStruckDelay],
			['hit-stomach-2', 3],
			['hit-stomach-3', 4],
			['hit-stomach-4', 4],
			['stun-3', 9],
			['stun-3', FrameDelay.TRANSITION],
		],
		[FighterState.SPECIAL_1_LIGHT]: [
			['special-1', 2],
			['special-2', 8],
			['special-3', 2],
			['special-4', 40],
			['special-4', FrameDelay.TRANSITION],
		],
		[FighterState.SPECIAL_1_MEDIUM]: [
			['special-1', 4],
			['special-2', 10],
			['special-3', 4],
			['special-4', 46],
			['special-4', FrameDelay.TRANSITION],
		],
		[FighterState.SPECIAL_1_HEAVY]: [
			['special-1', 5],
			['special-2', 10],
			['special-3', 5],
			['special-4', 60],
			['special-4', FrameDelay.TRANSITION],
		],

		[FighterState.VICTORY]: [
			['idle-1', 60],
			['victory-1', 20],
			['victory-2', 10],
			['victory-3', 15],
			['victory-4', 15],
			['victory-5', FrameDelay.FREEZE],
		],

		[FighterState.KO]: [
			['hit-stomach-2', 9],
			['fall-1', 15],
			['fall-2', FrameDelay.FREEZE],
			['fall-3', 12],
			['fall-4', 15],
			['fall-5', FrameDelay.FREEZE],
		],
	};

	specialMoves = [
		{
			state: FighterState.SPECIAL_1_LIGHT,
			sequence: [
				SpecialMovesControls.DOWN,
				SpecialMovesControls.FORWARD_DOWN,
				SpecialMovesControls.FORWARD,
				SpecialMovesControls.LIGHT_PUNCH,
			],
			cursor: 0,
		},
		{
			state: FighterState.SPECIAL_1_MEDIUM,
			sequence: [
				SpecialMovesControls.DOWN,
				SpecialMovesControls.FORWARD_DOWN,
				SpecialMovesControls.FORWARD,
				SpecialMovesControls.MEDIUM_PUNCH,
			],
			cursor: 0,
		},
		{
			state: FighterState.SPECIAL_1_HEAVY,
			sequence: [
				SpecialMovesControls.DOWN,
				SpecialMovesControls.FORWARD_DOWN,
				SpecialMovesControls.FORWARD,
				SpecialMovesControls.HEAVY_PUNCH,
			],
			cursor: 0,
		},
	];

	initialVelocity = {
		x: {
			[FighterState.WALK_FORWARD]: 3 * 60,
			[FighterState.WALK_BACKWARD]: -(2 * 60),
			[FighterState.JUMP_FORWARD]: 168,
			[FighterState.JUMP_BACKWARD]: -180,
			[FighterState.JUMP_UP]: 0,
		},
		jump: -420,
	};

	gravity = 1000;

	constructor(playerId, onAttackHit, entityList) {
		super(playerId, onAttackHit, entityList);

		this.states[FighterState.SPECIAL_1_LIGHT] = {
			attackStrength: FighterAttackStrength.LIGHT,
			init: this.handleHadoukenInit,
			update: this.handleHadouken,
			shadow: [1.6, 1, 22, 0],
			validFrom: [
				FighterState.IDLE,
				FighterState.IDLE_TURN,
				FighterState.WALK_FORWARD,
				FighterState.CROUCH_UP,
				FighterState.CROUCH_DOWN,
				FighterState.CROUCH,
				FighterState.CROUCH_TURN,
				FighterState.LIGHT_PUNCH,
				FighterState.MEDIUM_PUNCH,
				FighterState.HEAVY_PUNCH,
			],
		};
		this.states[FighterState.SPECIAL_1_MEDIUM] = {
			attackStrength: FighterAttackStrength.MEDIUM,
			init: this.handleHadoukenInit,
			update: this.handleHadouken,
			shadow: [1.6, 1, 22, 0],
			validFrom: [
				FighterState.IDLE,
				FighterState.IDLE_TURN,
				FighterState.WALK_FORWARD,
				FighterState.CROUCH_UP,
				FighterState.CROUCH_DOWN,
				FighterState.CROUCH,
				FighterState.CROUCH_TURN,
				FighterState.LIGHT_PUNCH,
				FighterState.MEDIUM_PUNCH,
				FighterState.HEAVY_PUNCH,
			],
		};
		this.states[FighterState.SPECIAL_1_HEAVY] = {
			attackStrength: FighterAttackStrength.HEAVY,
			init: this.handleHadoukenInit,
			update: this.handleHadouken,
			shadow: [1.6, 1, 22, 0],
			validFrom: [
				FighterState.IDLE,
				FighterState.IDLE_TURN,
				FighterState.WALK_FORWARD,
				FighterState.CROUCH_UP,
				FighterState.CROUCH_DOWN,
				FighterState.CROUCH,
				FighterState.CROUCH_TURN,
				FighterState.LIGHT_PUNCH,
				FighterState.MEDIUM_PUNCH,
				FighterState.HEAVY_PUNCH,
			],
		};

		this.states[FighterState.IDLE].validFrom = [
			...this.states[FighterState.IDLE].validFrom,
			FighterState.SPECIAL_1_LIGHT,
			FighterState.SPECIAL_1_MEDIUM,
			FighterState.SPECIAL_1_HEAVY,
		];
	}

	handleHadoukenInit = () => {
		this.resetVelocities();
		this.fireballFired = false;
		playSound(this.soundHadouken);
	};

	handleHadouken = (time) => {
		if (this.animationFrame === 3 && !this.fireballFired) {
			this.entityList.add(
				Fireball,
				this,
				this.states[this.currentState].attackStrength,
				time
			);
			this.fireballFired = true;
		}

		if (!this.isAnimationCompleted()) return;
		this.fireballFired = false;
		this.changeState(FighterState.IDLE, time);
	};
}

const __sf_entitites_fighters_Ken_js = {
	"Ken": Ken
};


// static/game/src/entitites/fighters/Ryu.js
class Ryu extends Fighter {
	image = document.getElementById('RyuImage');

	soundHadouken = document.getElementById(soundHadoukenId[FighterId.RYU]);

	fireballFired = false;

	fireballInstance = undefined;

	frames = new Map([
		// IDLE
		[
			'idle-1',
			[
				[
					[75, 14, 60, 89],
					[34, 86],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'idle-2',
			[
				[
					[7, 14, 59, 90],
					[33, 87],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],

		[
			'idle-3',
			[
				[
					[142, 13, 59, 90],
					[33, 88],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],

		[
			'idle-4',
			[
				[
					[211, 10, 55, 93],
					[31, 90],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],

		[
			// Forward
			'forwards-1',
			[
				[
					[9, 136, 53, 83],
					[27, 81],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],
		[
			'forwards-2',
			[
				[
					[78, 131, 60, 88],
					[35, 86],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],
		[
			'forwards-3',
			[
				[
					[152, 128, 64, 92],
					[35, 89],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],
		[
			'forwards-4',
			[
				[
					[229, 130, 63, 90],
					[29, 89],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],
		[
			'forwards-5',
			[
				[
					[307, 128, 54, 91],
					[25, 89],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],
		[
			'forwards-6',
			[
				[
					[371, 128, 50, 89],
					[25, 86],
				],
				PushBox.IDLE,
				HurtBox.FORWARD,
			],
		],

		// Backward
		[
			'backwards-1',
			[
				[
					[777, 128, 61, 87],
					[35, 85],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],
		[
			'backwards-2',
			[
				[
					[430, 124, 59, 90],
					[36, 87],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],
		[
			'backwards-3',
			[
				[
					[495, 124, 57, 90],
					[36, 88],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],
		[
			'backwards-4',
			[
				[
					[559, 124, 58, 90],
					[38, 89],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],
		[
			'backwards-5',
			[
				[
					[631, 125, 58, 91],
					[36, 88],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],
		[
			'backwards-6',
			[
				[
					[707, 126, 57, 89],
					[36, 87],
				],
				PushBox.IDLE,
				HurtBox.BACKWARD,
			],
		],

		[
			'jump-start/land',
			[
				[
					[7, 268, 55, 85],
					[29, 83],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],

		[
			'jump-up-1',
			[
				[
					[67, 244, 56, 104],
					[32, 107],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],
		[
			'jump-up-2',
			[
				[
					[138, 233, 50, 89],
					[24, 103],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],
		[
			'jump-up-3',
			[
				[
					[197, 233, 54, 77],
					[25, 103],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],
		[
			'jump-up-4',
			[
				[
					[259, 240, 48, 70],
					[28, 101],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],
		[
			'jump-up-5',
			[
				[
					[319, 234, 48, 89],
					[25, 106],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],
		[
			'jump-up-6',
			[
				[
					[375, 244, 55, 109],
					[31, 113],
				],
				PushBox.JUMP,
				HurtBox.JUMP,
			],
		],

		// Jump Roll

		[
			'jump-roll-1',
			[
				[
					[375, 244, 55, 109],
					[25, 106],
				],
				PushBox.JUMP,
				[
					[-11, -106, 24, 16],
					[-26, -90, 40, 42],
					[-26, -31, 40, 32],
				],
			],
		],
		[
			'jump-roll-2',
			[
				[
					[442, 261, 61, 78],
					[22, 90],
				],
				PushBox.JUMP,
				[
					[17, -90, 24, 16],
					[-14, -91, 40, 42],
					[-22, -66, 38, 18],
				],
			],
		],
		[
			'jump-roll-3',
			[
				[
					[507, 259, 104, 42],
					[61, 76],
				],
				PushBox.JUMP,
				[
					[22, -51, 24, 16],
					[-14, -81, 40, 42],
					[-22, -66, 38, 18],
				],
			],
		],
		[
			'jump-roll-4',
			[
				[
					[617, 240, 53, 82],
					[42, 111],
				],
				PushBox.JUMP,
				[
					[-39, -46, 24, 16],
					[-30, -88, 40, 42],
					[-34, -118, 44, 48],
				],
			],
		],
		[
			'jump-roll-5',
			[
				[
					[676, 257, 122, 44],
					[71, 81],
				],
				PushBox.JUMP,
				[
					[-72, -56, 24, 16],
					[-54, -77, 52, 40],
					[-14, -82, 48, 34],
				],
			],
		],
		[
			'jump-roll-6',
			[
				[
					[804, 258, 71, 87],
					[53, 98],
				],
				PushBox.JUMP,
				[
					[-55, -100, 24, 16],
					[-48, -87, 44, 38],
					[-22, -66, 38, 18],
				],
			],
		],
		[
			'jump-roll-7',
			[
				[
					[883, 261, 54, 109],
					[31, 113],
				],
				PushBox.JUMP,
				[
					[-11, -106, 24, 16],
					[-26, -90, 40, 42],
					[-26, -31, 40, 32],
				],
			],
		],

		// Crouch
		[
			'crouch-1',
			[
				[
					[551, 21, 53, 83],
					[27, 81],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'crouch-2',
			[
				[
					[611, 36, 57, 69],
					[25, 66],
				],
				PushBox.BEND,
				HurtBox.BEND,
			],
		],
		[
			'crouch-3',
			[
				[
					[679, 44, 61, 61],
					[25, 58],
				],
				PushBox.CROUCH,
				HurtBox.CROUCH,
			],
		],

		// Stand Turn
		[
			'idle-turn-1',
			[
				[
					[348, 8, 54, 95],
					[29, 92],
				],
				PushBox.IDLE,
				[
					[-10, -89, 28, 18],
					[-14, -74, 40, 42],
					[-14, -31, 40, 32],
				],
			],
		],
		[
			'idle-turn-2',
			[
				[
					[414, 6, 58, 97],
					[30, 94],
				],
				PushBox.IDLE,
				[
					[-16, -96, 28, 18],
					[-14, -74, 40, 42],
					[-14, -31, 40, 32],
				],
			],
		],
		[
			'idle-turn-3',
			[
				[
					[486, 10, 54, 94],
					[27, 90],
				],
				PushBox.IDLE,
				[
					[-16, -96, 28, 18],
					[-14, -74, 40, 42],
					[-14, -31, 40, 32],
				],
			],
		],
		// Crouch Turn

		[
			'crouch-turn-1',
			[
				[
					[751, 46, 53, 61],
					[26, 58],
				],
				PushBox.CROUCH,
				[
					[-7, -60, 24, 18],
					[-28, -46, 44, 24],
					[-28, -24, 44, 24],
				],
			],
		],
		[
			'crouch-turn-2',
			[
				[
					[816, 46, 52, 61],
					[27, 58],
				],
				PushBox.CROUCH,
				[
					[-7, -60, 24, 18],
					[-28, -46, 44, 24],
					[-28, -24, 44, 24],
				],
			],
		],
		[
			'crouch-turn-3',
			[
				[
					[878, 46, 53, 61],
					[29, 58],
				],
				PushBox.CROUCH,
				[
					[-26, -61, 24, 18],
					[-28, -46, 44, 24],
					[-28, -24, 44, 24],
				],
			],
		],

		// Light Punch
		[
			'light-punch-1',
			[
				[
					[9, 365, 64, 91],
					[32, 88],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'light-punch-2',
			[
				[
					[98, 365, 92, 91],
					[32, 88],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
				[11, -85, 50, 18],
			],
		],

		// Medium/Heavy Punch
		[
			'med-punch-1',
			[
				[
					[6, 466, 60, 94],
					[29, 92],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'med-punch-2',
			[
				[
					[86, 465, 74, 95],
					[29, 92],
				],
				PushBox.IDLE,
				HurtBox.PUNCH,
			],
		],
		[
			'med-punch-3',
			[
				[
					[175, 465, 108, 94],
					[24, 92],
				],
				PushBox.IDLE,
				HurtBox.PUNCH,
				[17, -85, 68, 14],
			],
		],
		// Heavy Punch
		[
			'heavy-punch-1',
			[
				[
					[175, 465, 108, 94],
					[24, 92],
				],
				PushBox.IDLE,
				HurtBox.PUNCH,
				[17, -85, 76, 14],
			],
		],

		// Light/Medium Kick
		[
			'light-kick-1',
			[
				[
					[87, 923, 66, 92],
					[46, 93],
				],
				PushBox.IDLE,
				[
					[-33, -96, 30, 18],
					[-41, -79, 42, 38],
					[-32, -52, 44, 50],
				],
			],
		],
		[
			'light-kick-2',
			[
				[
					[162, 922, 114, 94],
					[68, 95],
				],
				PushBox.IDLE,
				[
					[-65, -96, 30, 18],
					[-57, -79, 42, 38],
					[-32, -52, 44, 50],
				],
				[-17, -98, 66, 28],
			],
		],
		// Medium Kick
		[
			'med-kick-1',
			[
				[
					[162, 922, 114, 94],
					[68, 95],
				],
				PushBox.IDLE,
				[
					[-65, -96, 30, 18],
					[-57, -79, 42, 38],
					[-32, -52, 44, 50],
				],
				[-18, -98, 80, 28],
			],
		],
		// Heavy Kick
		[
			'heavy-kick-1',
			[
				[
					[5, 1196, 61, 90],
					[37, 87],
				],
				PushBox.IDLE,
				[
					[-41, -78, 20, 20],
					[-25, -78, 42, 42],
					[-11, -50, 42, 50],
				],
			],
		],
		[
			'heavy-kick-2',
			[
				[
					[72, 1192, 94, 94],
					[44, 91],
				],
				PushBox.IDLE,
				[
					[12, -90, 34, 34],
					[-25, -78, 42, 42],
					[-11, -50, 42, 50],
				],
				[15, -99, 40, 32],
			],
		],
		[
			'heavy-kick-3',
			[
				[
					[176, 1191, 120, 94],
					[42, 91],
				],
				PushBox.IDLE,
				[
					[13, -91, 62, 34],
					[-25, -78, 42, 42],
					[-11, -50, 42, 50],
				],
				[21, -97, 62, 24],
			],
		],
		[
			'heavy-kick-4',
			[
				[
					[306, 1208, 101, 77],
					[39, 74],
				],
				PushBox.IDLE,
				[
					[-41, -78, 20, 20],
					[-25, -78, 42, 42],
					[-11, -50, 42, 50],
				],
			],
		],
		[
			'heavy-kick-5',
			[
				[
					[418, 1204, 64, 81],
					[38, 78],
				],
				PushBox.IDLE,
				[
					[-41, -78, 20, 20],
					[-25, -78, 42, 42],
					[-11, -50, 42, 50],
				],
			],
		],

		// Hit Face
		[
			'hit-face-1',
			[
				[
					[169, 2152, 62, 90],
					[41, 87],
				],
				PushBox.IDLE,
				[
					[-25, -89, 20, 20],
					[-33, -74, 40, 46],
					[-30, -37, 40, 38],
				],
			],
		],
		[
			'hit-face-2',
			[
				[
					[238, 2153, 68, 89],
					[47, 86],
				],
				PushBox.IDLE,
				[
					[-42, -88, 20, 20],
					[-46, -74, 40, 46],
					[-33, -37, 40, 38],
				],
			],
		],
		[
			'hit-face-3',
			[
				[
					[314, 2153, 72, 88],
					[53, 85],
				],
				PushBox.IDLE,
				[
					[-52, -87, 20, 20],
					[-53, -71, 40, 46],
					[-33, -37, 40, 38],
				],
			],
		],
		[
			'hit-face-4',
			[
				[
					[314, 2153, 72, 88],
					[53, 85],
				],
				PushBox.IDLE,
				[
					[-52, -87, 20, 20],
					[-53, -71, 40, 46],
					[-33, -37, 40, 38],
				],
			],
		],
		// Hit Stomach
		[
			'hit-stomach-1',
			[
				[
					[398, 2156, 58, 85],
					[37, 83],
				],
				PushBox.IDLE,
				[
					[-15, -85, 28, 18],
					[-31, -69, 42, 42],
					[-30, -34, 42, 34],
				],
			],
		],
		[
			'hit-stomach-2',
			[
				[
					[470, 2160, 66, 82],
					[41, 80],
				],
				PushBox.IDLE,
				[
					[-17, 82, 28, 18],
					[-33, -65, 38, 36],
					[-34, -34, 42, 34],
				],
			],
		],
		[
			'hit-stomach-3',
			[
				[
					[544, 2167, 68, 84],
					[40, 81],
				],
				PushBox.IDLE,
				[
					[-17, 82, 28, 18],
					[-41, -59, 38, 30],
					[-34, -34, 42, 34],
				],
			],
		],
		[
			'hit-stomach-4',
			[
				[
					[544, 2167, 68, 84],
					[40, 81],
				],
				PushBox.IDLE,
				[
					[-17, 82, 28, 18],
					[-41, -59, 38, 30],
					[-34, -34, 42, 34],
				],
			],
		],
		// Stunned
		[
			'stun-1',
			[
				[
					[7, 2047, 77, 87],
					[28, 85],
				],
				PushBox.IDLE,
				[
					[8, -87, 28, 18],
					[-16, -75, 40, 46],
					[-26, -31, 40, 32],
				],
			],
		],
		[
			'stun-2',
			[
				[
					[93, 2045, 65, 89],
					[28, 87],
				],
				PushBox.IDLE,
				[
					[-9, -89, 28, 18],
					[-23, -75, 40, 46],
					[-26, -31, 40, 32],
				],
			],
		],
		[
			'stun-3',
			[
				[
					[170, 2044, 67, 90],
					[35, 88],
				],
				PushBox.IDLE,
				[
					[-22, -91, 28, 18],
					[-30, -72, 42, 40],
					[-26, -31, 40, 32],
				],
			],
		],

		// Ha dooo ken
		[
			'special-1',
			[
				[
					[16, 1790, 74, 90],
					[28, 89],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'special-2',
			[
				[
					[111, 1796, 85, 84],
					[25, 83],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'special-3',
			[
				[
					[209, 1798, 90, 83],
					[25, 82],
				],
				PushBox.IDLE,
				HurtBox.PUNCH,
			],
		],
		[
			'special-4',
			[
				[
					[314, 1804, 106, 77],
					[23, 76],
				],
				PushBox.IDLE,
				[
					[38, -79, 26, 18],
					[21, -65, 40, 38],
					[-12, -30, 78, 30],
				],
			],
		],

		// VICTORY
		[
			'victory-1',
			[
				[
					[431, 1929, 60, 88],
					[30, 87],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'victory-2',
			[
				[
					[503, 1920, 60, 97],
					[30, 95],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'victory-3',
			[
				[
					[576, 1894, 55, 122],
					[34, 120],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],
		[
			'victory-4',
			[
				[
					[637, 1903, 57, 113],
					[32, 111],
				],
				PushBox.IDLE,
				HurtBox.IDLE,
			],
		],

		// Falling

		[
			'fall-1',
			[
				[
					[636, 2164, 82, 77],
					[50, 80],
				],
				PushBox.IDLE,
				HurtBox.INVINCLIBLE,
			],
		],
		[
			'fall-2',
			[
				[
					[726, 2197, 102, 45],
					[50, 80],
				],
				PushBox.IDLE,
				HurtBox.INVINCLIBLE,
			],
		],
		[
			'fall-3',
			[
				[
					[828, 2164, 78, 80],
					[40, 80],
				],
				PushBox.IDLE,
				HurtBox.INVINCLIBLE,
			],
		],
		[
			'fall-4',
			[
				[
					[911, 2193, 120, 53],
					[60, 45],
				],
				PushBox.IDLE,
				HurtBox.INVINCLIBLE,
			],
		],
		[
			'fall-5',
			[
				[
					[1040, 2217, 128, 31],
					[60, 30],
				],
				PushBox.IDLE,
				HurtBox.INVINCLIBLE,
			],
		],
	]);

	animations = {
		[FighterState.JUMP_START]: [
			['jump-start/land', 3],
			['jump-start/land', FrameDelay.TRANSITION],
		],

		[FighterState.JUMP_LAND]: [
			['jump-start/land', 2],
			['jump-start/land', 5],
			['jump-start/land', FrameDelay.TRANSITION],
		],
		[FighterState.JUMP_FORWARD]: [
			['jump-roll-1', 13],
			['jump-roll-2', 5],
			['jump-roll-3', 3],
			['jump-roll-4', 3],
			['jump-roll-5', 3],
			['jump-roll-6', 5],
			['jump-roll-7', FrameDelay.FREEZE],
		],
		[FighterState.JUMP_BACKWARD]: [
			['jump-roll-7', 15],
			['jump-roll-6', 3],
			['jump-roll-5', 3],
			['jump-roll-4', 3],
			['jump-roll-3', 3],
			['jump-roll-2', 3],
			['jump-roll-1', FrameDelay.FREEZE],
		],
		[FighterState.IDLE]: [
			['idle-1', 4],
			['idle-2', 4],
			['idle-3', 4],
			['idle-4', 4],
			['idle-3', 4],
			['idle-2', 4],
		],

		[FighterState.WALK_FORWARD]: [
			['forwards-1', 3],
			['forwards-2', 6],
			['forwards-3', 4],
			['forwards-4', 4],
			['forwards-5', 4],
			['forwards-6', 6],
		],

		[FighterState.WALK_BACKWARD]: [
			['backwards-1', 3],
			['backwards-2', 6],
			['backwards-3', 4],
			['backwards-4', 4],
			['backwards-5', 4],
			['backwards-6', 6],
		],
		[FighterState.JUMP_UP]: [
			['jump-up-1', 8],
			['jump-up-2', 8],
			['jump-up-3', 8],
			['jump-up-4', 8],
			['jump-up-5', 8],
			['jump-up-6', FrameDelay.FREEZE],
		],
		[FighterState.CROUCH_DOWN]: [
			['crouch-1', 2],
			['crouch-2', 2],
			['crouch-3', 2],
			['crouch-3', FrameDelay.TRANSITION],
		],
		[FighterState.CROUCH]: [['crouch-3', FrameDelay.TRANSITION]],
		[FighterState.CROUCH_UP]: [
			['crouch-3', 2],
			['crouch-2', 2],
			['crouch-1', 2],
			['crouch-1', FrameDelay.TRANSITION],
		],
		[FighterState.IDLE_TURN]: [
			['idle-turn-3', 2],
			['idle-turn-2', 2],
			['idle-turn-1', 2],
			['idle-turn-1', FrameDelay.TRANSITION],
		],
		[FighterState.CROUCH_TURN]: [
			['crouch-turn-3', 2],
			['crouch-turn-2', 2],
			['crouch-turn-1', 2],
			['crouch-turn-1', FrameDelay.TRANSITION],
		],
		[FighterState.LIGHT_PUNCH]: [
			['light-punch-1', 2],
			['light-punch-2', 4],
			['light-punch-1', 4],
			['light-punch-1', FrameDelay.TRANSITION],
		],

		[FighterState.MEDIUM_PUNCH]: [
			['med-punch-1', 1],
			['med-punch-2', 2],
			['med-punch-3', 4],
			['med-punch-2', 3],
			['med-punch-1', 3],
			['med-punch-1', FrameDelay.TRANSITION],
		],
		[FighterState.HEAVY_PUNCH]: [
			['med-punch-1', 3],
			['med-punch-2', 2],
			['heavy-punch-1', 6],
			['med-punch-2', 10],
			['med-punch-1', 12],
			['med-punch-1', FrameDelay.TRANSITION],
		],

		[FighterState.LIGHT_KICK]: [
			['med-punch-1', 3],
			['light-kick-1', 3],
			['light-kick-2', 8],
			['light-kick-1', 4],
			['med-punch-1', 1],
			['med-punch-1', FrameDelay.TRANSITION],
		],
		[FighterState.MEDIUM_KICK]: [
			['med-punch-1', 5],
			['light-kick-1', 6],
			['med-kick-1', 12],
			['light-kick-1', 7],
			['light-kick-1', FrameDelay.TRANSITION],
		],
		[FighterState.HEAVY_KICK]: [
			['heavy-kick-1', 2],
			['heavy-kick-2', 4],
			['heavy-kick-3', 8],
			['heavy-kick-4', 10],
			['heavy-kick-5', 7],
			['heavy-kick-5', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_HEAD_LIGHT]: [
			['hit-face-1', FighterStruckDelay],
			['hit-face-1', 3],
			['hit-face-2', 8],
			['hit-face-2', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_HEAD_MEDIUM]: [
			['hit-face-1', FighterStruckDelay],
			['hit-face-1', 3],
			['hit-face-2', 4],
			['hit-face-3', 9],
			['hit-face-3', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_HEAD_HEAVY]: [
			['hit-face-3', FighterStruckDelay],
			['hit-face-3', 7],
			['hit-face-4', 4],
			['stun-3', 9],
			['stun-3', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_BODY_LIGHT]: [
			['hit-stomach-1', FighterStruckDelay],
			['hit-stomach-1', 11],
			['hit-stomach-1', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_BODY_MEDIUM]: [
			['hit-stomach-1', FighterStruckDelay],
			['hit-stomach-1', 7],
			['hit-stomach-2', 9],
			['hit-stomach-2', FrameDelay.TRANSITION],
		],
		[FighterState.HURT_BODY_HEAVY]: [
			['hit-stomach-2', FighterStruckDelay],
			['hit-stomach-2', 3],
			['hit-stomach-3', 4],
			['hit-stomach-4', 4],
			['stun-3', 9],
			['stun-3', FrameDelay.TRANSITION],
		],
		[FighterState.SPECIAL_1_LIGHT]: [
			['special-1', 2],
			['special-2', 8],
			['special-3', 2],
			['special-4', 40],
			['special-4', FrameDelay.TRANSITION],
		],
		[FighterState.SPECIAL_1_MEDIUM]: [
			['special-1', 4],
			['special-2', 10],
			['special-3', 4],
			['special-4', 46],
			['special-4', FrameDelay.TRANSITION],
		],
		[FighterState.SPECIAL_1_HEAVY]: [
			['special-1', 5],
			['special-2', 10],
			['special-3', 5],
			['special-4', 60],
			['special-4', FrameDelay.TRANSITION],
		],

		[FighterState.VICTORY]: [
			['idle-1', 60],
			['victory-1', 20],
			['victory-2', 10],
			['victory-3', 15],
			['victory-4', 15],
			['victory-3', FrameDelay.FREEZE],
		],
		[FighterState.KO]: [
			['hit-stomach-2', 9],
			['fall-1', 15],
			['fall-2', FrameDelay.FREEZE],
			['fall-3', 12],
			['fall-4', 15],
			['fall-5', FrameDelay.FREEZE],
		],
	};

	initialVelocity = {
		x: {
			[FighterState.WALK_FORWARD]: 3 * 60,
			[FighterState.WALK_BACKWARD]: -(2 * 60),
			[FighterState.JUMP_FORWARD]: 168,
			[FighterState.JUMP_BACKWARD]: -180,
			[FighterState.JUMP_UP]: 0,
		},
		jump: -420,
	};
	specialMoves = [
		{
			state: FighterState.SPECIAL_1_LIGHT,
			sequence: [
				SpecialMovesControls.DOWN,
				SpecialMovesControls.FORWARD_DOWN,
				SpecialMovesControls.FORWARD,
				SpecialMovesControls.LIGHT_PUNCH,
			],
			cursor: 0,
		},
		{
			state: FighterState.SPECIAL_1_MEDIUM,
			sequence: [
				SpecialMovesControls.DOWN,
				SpecialMovesControls.FORWARD_DOWN,
				SpecialMovesControls.FORWARD,
				SpecialMovesControls.MEDIUM_PUNCH,
			],
			cursor: 0,
		},
		{
			state: FighterState.SPECIAL_1_HEAVY,
			sequence: [
				SpecialMovesControls.DOWN,
				SpecialMovesControls.FORWARD_DOWN,
				SpecialMovesControls.FORWARD,
				SpecialMovesControls.HEAVY_PUNCH,
			],
			cursor: 0,
		},
	];

	gravity = 1000;

	constructor(playerId, onAttackHit, entityList) {
		super(playerId, onAttackHit, entityList);

		this.states[FighterState.SPECIAL_1_LIGHT] = {
			attackStrength: FighterAttackStrength.LIGHT,
			init: this.handleHadoukenInit,
			update: this.handleHadouken,
			shadow: [1.6, 1, 22, 0],
			validFrom: [
				FighterState.IDLE,
				FighterState.IDLE_TURN,
				FighterState.WALK_FORWARD,
				FighterState.CROUCH_UP,
				FighterState.CROUCH_DOWN,
				FighterState.CROUCH,
				FighterState.CROUCH_TURN,
				FighterState.LIGHT_PUNCH,
				FighterState.MEDIUM_PUNCH,
				FighterState.HEAVY_PUNCH,
			],
		};
		this.states[FighterState.SPECIAL_1_MEDIUM] = {
			attackStrength: FighterAttackStrength.MEDIUM,
			init: this.handleHadoukenInit,
			update: this.handleHadouken,
			shadow: [1.6, 1, 22, 0],
			validFrom: [
				FighterState.IDLE,
				FighterState.IDLE_TURN,
				FighterState.WALK_FORWARD,
				FighterState.CROUCH_UP,
				FighterState.CROUCH_DOWN,
				FighterState.CROUCH,
				FighterState.CROUCH_TURN,
				FighterState.LIGHT_PUNCH,
				FighterState.MEDIUM_PUNCH,
				FighterState.HEAVY_PUNCH,
			],
		};
		this.states[FighterState.SPECIAL_1_HEAVY] = {
			attackStrength: FighterAttackStrength.HEAVY,
			init: this.handleHadoukenInit,
			update: this.handleHadouken,
			shadow: [1.6, 1, 22, 0],
			validFrom: [
				FighterState.IDLE,
				FighterState.IDLE_TURN,
				FighterState.WALK_FORWARD,
				FighterState.CROUCH_UP,
				FighterState.CROUCH_DOWN,
				FighterState.CROUCH,
				FighterState.CROUCH_TURN,
				FighterState.LIGHT_PUNCH,
				FighterState.MEDIUM_PUNCH,
				FighterState.HEAVY_PUNCH,
			],
		};
		this.states[FighterState.IDLE].validFrom = [
			...this.states[FighterState.IDLE].validFrom,
			FighterState.SPECIAL_1_LIGHT,
			FighterState.SPECIAL_1_MEDIUM,
			FighterState.SPECIAL_1_HEAVY,
		];
	}

	handleHadoukenInit = () => {
		this.resetVelocities();
		this.fireballFired = false;
		playSound(this.soundHadouken);
	};

	handleHadouken = (time) => {
		if (this.animationFrame === 3 && !this.fireballFired) {
			this.entityList.add(
				Fireball,
				this,
				this.states[this.currentState].attackStrength,
				time
			);
			this.fireballFired = true;
		}

		if (!this.isAnimationCompleted()) return;
		this.fireballFired = false;
		this.changeState(FighterState.IDLE, time);
	};
}

const __sf_entitites_fighters_Ryu_js = {
	"Ryu": Ryu
};


// static/game/src/entitites/fighters/index.js


const __sf_entitites_fighters_index_js = {
	"Ken": Ken,
	"Ryu": Ryu
};


// static/game/src/entitites/fighters/shared/Shadow.js
class Shadow {
	constructor(fighter) {
		this.fighter = fighter;
		this.image = document.getElementById('ShadowImage');
		this.frame = [
			[0, 0, 43, 9],
			[21, 7],
		];
	}

	getScale = () => {
		if (this.fighter.position.y < STAGE_FLOOR) {
			const scale = 1.2 - (200 - this.fighter.position.y) / 300;
			return [scale, scale, 0, 0];
		} else if (this.fighter.states[this.fighter.currentState].shadow) {
			const [scaleX, scaleY, offsetX, offsetY] =
				this.fighter.states[this.fighter.currentState].shadow;
			return [scaleX, scaleY, offsetX * this.fighter.direction * -1, offsetY];
		}
		return [1.2, 1.2, 0, 0];
	};

	update = () => {};

	draw = (context, camera) => {
		const [[x, y, width, height], [originX, originY]] = this.frame;

		const [scaleX, scaleY, offsetX, offsetY] = this.getScale() || [
			1.2, 1.2, 0, 0,
		];

		context.globalAlpha = 0.5;
		context.drawImage(
			this.image,
			x,
			y,
			width,
			height,
			Math.floor(
				this.fighter.position.x - camera.position.x - originX * scaleX - offsetX
			),
			Math.floor(STAGE_FLOOR - camera.position.y - originY * scaleY - offsetY),
			Math.floor(width * scaleX),
			Math.floor(height * scaleY)
		);
		context.globalAlpha = 1;
		context.setTransform(1, 0, 0, 1, 0, 0);
	};
}

const __sf_entitites_fighters_shared_Shadow_js = {
	"Shadow": Shadow
};


// static/game/src/entitites/fighters/shared/HitSplash.js
class HitSplash {
	constructor(x, y, playerId, entities) {
		this.entities = entities;
		this.position = { x, y };
		this.playerId = playerId;
		this.image = document.getElementById('Decals');

		this.frames = new Map();
		this.animationFrame = 0;
		this.animationTimer = 0;
		this.hasSplashEnded = false;
	}

	update = (time) => {
		if (this.animationTimer + FRAME_TIME * 4 > time.previous) return;
		this.animationTimer = time.previous;
		this.animationFrame++;
		if (this.animationFrame >= this.frames[this.playerId].length)
			this.entities.remove(this);
	};

	draw = (context, camera) => {
		const [[sourceX, sourceY, sourceWidth, sourceHeight], [originX, originY]] =
			this.frames[this.playerId][this.animationFrame];

		context.drawImage(
			this.image,
			sourceX,
			sourceY,
			sourceWidth,
			sourceHeight,
			Math.floor(this.position.x - camera.position.x - originX),
			Math.floor(this.position.y - camera.position.y - originY),
			sourceWidth,
			sourceHeight
		);
	};
}

const __sf_entitites_fighters_shared_HitSplash_js = {
	"HitSplash": HitSplash
};


// static/game/src/entitites/fighters/shared/HeavyHitSplash.js
class HeavyHitSplash extends HitSplash {
	constructor(x, y, playerId, removeSplash) {
		super(x, y, playerId, removeSplash);

		this.frames = [
			//Plauer id =  1
			[
				[
					[14, 68, 15, 21],
					[7, 10],
				],
				[
					[38, 70, 27, 23],
					[13, 11],
				],
				[
					[73, 70, 27, 23],
					[13, 11],
				],
				[
					[106, 66, 32, 31],
					[16, 15],
				],
			],
			// Player 2
			[
				[
					[160, 68, 15, 21],
					[7, 10],
				],
				[
					[185, 70, 27, 23],
					[13, 11],
				],
				[
					[222, 70, 27, 23],
					[13, 11],
				],
				[
					[255, 66, 32, 31],
					[16, 15],
				],
			],
		];
	}
	update() {
		super.update();
	}

	draw() {
		super.draw();
	}
}

const __sf_entitites_fighters_shared_HeavyHitSplash_js = {
	"HeavyHitSplash": HeavyHitSplash
};


// static/game/src/entitites/fighters/shared/MediumHitSplash.js
class MediumHitSplash extends HitSplash {
	constructor(x, y, playerId, removeSplash) {
		super(x, y, playerId, removeSplash);

		this.frames = [
			//Plauer id =  1
			[
				[
					[13, 41, 14, 15],
					[7, 7],
				],
				[
					[34, 39, 21, 19],
					[10, 9],
				],
				[
					[64, 39, 21, 19],
					[10, 9],
				],
				[
					[90, 35, 27, 25],
					[13, 12],
				],
			],
			// Player 2
			[
				[
					[159, 41, 14, 15],
					[7, 7],
				],
				[
					[182, 39, 21, 19],
					[10, 9],
				],
				[
					[211, 39, 21, 19],
					[10, 9],
				],
				[
					[239, 35, 27, 25],
					[13, 12],
				],
			],
		];
	}

	update() {
		super.update();
	}

	draw() {
		super.draw();
	}
}

const __sf_entitites_fighters_shared_MediumHitSplash_js = {
	"MediumHitSplash": MediumHitSplash
};


// static/game/src/entitites/fighters/shared/LightHitSplash.js
class LightHitSplash extends HitSplash {
	constructor(x, y, playerId, removeSplash) {
		super(x, y, playerId, removeSplash);

		this.frames = [
			//Plauer id =  1
			[
				[
					[14, 16, 9, 10],
					[6, 7],
				],
				[
					[34, 15, 13, 11],
					[7, 7],
				],
				[
					[55, 15, 13, 11],
					[7, 7],
				],
				[
					[75, 10, 20, 19],
					[11, 11],
				],
			],
			// Player id = 2
			[
				[
					[160, 16, 9, 10],
					[6, 7],
				],
				[
					[178, 15, 13, 11],
					[7, 7],
				],
				[
					[199, 15, 13, 11],
					[7, 7],
				],
				[
					[219, 10, 20, 19],
					[11, 11],
				],
			],
		];
	}

	update() {
		super.update();
	}

	draw() {
		super.draw();
	}
}

const __sf_entitites_fighters_shared_LightHitSplash_js = {
	"LightHitSplash": LightHitSplash
};


// static/game/src/entitites/fighters/shared/index.js


const __sf_entitites_fighters_shared_index_js = {
	"Shadow": Shadow,
	"HeavyHitSplash": HeavyHitSplash,
	"MediumHitSplash": MediumHitSplash,
	"LightHitSplash": LightHitSplash
};


// static/game/src/entitites/overlays/FpsCounter.js
class FpsCounter {
	constructor() {
		this.fps = 0;
	}
	update(time) {
		this.fps = Math.trunc(1 / time.secondsPassed);
	}

  draw(context){
    context.font = "10px Arial";
    context.fillStyle = "yellow";
    context.fillText(`FPS: ${this.fps}`, 10, 222);
  }
}

const __sf_entitites_overlays_FpsCounter_js = {
	"FpsCounter": FpsCounter
};


// static/game/src/states/fighterState.js
const createDefaultFighterState = (id) => {
	return {
		instance: undefined,
		id,
		score: 1,
		battles: 0,
		hitPoints: HEALTH_MAX_HIT_POINTS,
	};
};

const __sf_states_fighterState_js = {
	"createDefaultFighterState": createDefaultFighterState
};


// static/game/src/states/gameState.js
var gameState = {
	fighters: [
		createDefaultFighterState(FighterId.RYU),
		createDefaultFighterState(FighterId.KEN),
	],
};

const resetGameState = () => {
	gameState = {
		fighters: [
			createDefaultFighterState(FighterId.RYU),
			createDefaultFighterState(FighterId.KEN),
		],
	};
};

const __sf_states_gameState_js = {
	"gameState": gameState,
	"resetGameState": resetGameState
};


// static/game/src/entitites/overlays/StatusBar.js
// [FIXED] Was not /100 in Critical Health Constant TODO : KO flashing even at full HP

class StatusBar {
	time = BATTLE_TIME;
	timeTimer = 0;

	timeFlashTimer = 0;
	useFlashFrames = false;

	koFlashTimer = 0;
	koFrame = 0;

	healthBars = [
		{
			timer: 0,
			hitPoints: 0, //HEALTH_MAX_HIT_POINTS,
		},
		{
			timer: 0,
			hitPoints: 0, //HEALTH_MAX_HIT_POINTS,
		},
	];
	startingHealthRollUpDone = false;
	frames = new Map([
		['health-bar', [16, 18, 145, 11]],
		['ko-white', [161, 16, 32, 14]],
		['ko-black', [161, 1, 32, 14]],
		//Time
		[`${TIME_FRAME_KEYS[0]}-0`, [16, 32, 14, 16]],
		[`${TIME_FRAME_KEYS[0]}-1`, [32, 32, 14, 16]],
		[`${TIME_FRAME_KEYS[0]}-2`, [48, 32, 14, 16]],
		[`${TIME_FRAME_KEYS[0]}-3`, [64, 32, 14, 16]],
		[`${TIME_FRAME_KEYS[0]}-4`, [80, 32, 14, 16]],
		[`${TIME_FRAME_KEYS[0]}-5`, [96, 32, 14, 16]],
		[`${TIME_FRAME_KEYS[0]}-6`, [112, 32, 14, 16]],
		[`${TIME_FRAME_KEYS[0]}-7`, [128, 32, 14, 16]],
		[`${TIME_FRAME_KEYS[0]}-8`, [144, 32, 14, 16]],
		[`${TIME_FRAME_KEYS[0]}-9`, [160, 32, 14, 16]],

		// Time Flash
		[`${TIME_FRAME_KEYS[1]}-0`, [16, 192, 14, 16]],
		[`${TIME_FRAME_KEYS[1]}-1`, [32, 192, 14, 16]],
		[`${TIME_FRAME_KEYS[1]}-2`, [48, 192, 14, 16]],
		[`${TIME_FRAME_KEYS[1]}-3`, [64, 192, 14, 16]],
		[`${TIME_FRAME_KEYS[1]}-4`, [80, 192, 14, 16]],
		[`${TIME_FRAME_KEYS[1]}-5`, [96, 192, 14, 16]],
		[`${TIME_FRAME_KEYS[1]}-6`, [112, 192, 14, 16]],
		[`${TIME_FRAME_KEYS[1]}-7`, [128, 192, 14, 16]],
		[`${TIME_FRAME_KEYS[1]}-8`, [144, 192, 14, 16]],
		[`${TIME_FRAME_KEYS[1]}-9`, [160, 192, 14, 16]],

		// NUmbers
		['score-0', [17, 101, 10, 10]],
		['score-1', [29, 101, 10, 10]],
		['score-2', [41, 101, 10, 10]],
		['score-3', [53, 101, 10, 10]],
		['score-4', [65, 101, 11, 10]],
		['score-5', [77, 101, 10, 10]],
		['score-6', [89, 101, 10, 10]],
		['score-7', [101, 101, 10, 10]],
		['score-8', [113, 101, 10, 10]],
		['score-9', [125, 101, 10, 10]],

		// Alphabets
		['score-@', [17, 113, 10, 10]],
		['score-A', [29, 113, 11, 10]],
		['score-B', [41, 113, 10, 10]],
		['score-C', [53, 113, 10, 10]],
		['score-D', [65, 113, 10, 10]],
		['score-E', [77, 113, 10, 10]],
		['score-F', [89, 113, 10, 10]],
		['score-G', [101, 113, 10, 10]],
		['score-H', [113, 113, 10, 10]],
		['score-I', [125, 113, 9, 10]],
		['score-J', [136, 113, 10, 10]],
		['score-K', [149, 113, 10, 10]],
		['score-L', [161, 113, 10, 10]],
		['score-M', [173, 113, 10, 10]],
		['score-N', [185, 113, 11, 10]],
		['score-0', [197, 113, 10, 10]],
		['score-P', [17, 125, 10, 10]],
		['score-Q', [29, 125, 10, 10]],
		['score-R', [41, 125, 10, 10]],
		['score-S', [53, 125, 10, 10]],
		['score-T', [65, 125, 10, 10]],
		['score-U', [77, 125, 10, 10]],
		['score-V', [89, 125, 10, 10]],
		['score-W', [101, 125, 10, 10]],
		['score-X', [113, 125, 10, 10]],
		['score-Y', [125, 125, 10, 10]],
		['score-Z', [136, 125, 10, 10]],

		// Name tags
		['tag-ken', [128, 56, 30, 9]],
		['tag-ryu', [16, 56, 28, 9]],
	]);

	constructor(fighters, onTimeEnd) {
		this.onTimeEnd = onTimeEnd;
		this.image = document.getElementById('hud');
		this.nameTags = gameState.fighters.map(
			({ id }) => `tag-${id.toLowerCase()}`
		);
	}

	drawFrame(context, frameKey, x, y, direction = 1) {
		drawFrame(context, this.image, this.frames.get(frameKey), x, y, direction);
	}

	updateHealthBarRollUp = (time, hitPoints, index) => {
		if (hitPoints >= gameState.fighters[index].hitPoints) {
			this.startingHealthRollUpDone = true;
		}

		this.healthBars[index].hitPoints = Math.min(
			gameState.fighters[index].hitPoints,
			this.healthBars[index].hitPoints + 2 * FPS * time.secondsPassed
		);
	};

	updateHealthBars = (time) => {
		this.healthBars.map(({ hitPoints }, index) => {
			if (!this.startingHealthRollUpDone) {
				this.updateHealthBarRollUp(time, hitPoints, index);
				return;
			}
			if (hitPoints <= gameState.fighters[index].hitPoints) {
				this.updateHealthBarRollUp(time, hitPoints, index);
			} else {
				this.healthBars[index].hitPoints = Math.max(
					0,
					this.healthBars[index].hitPoints - FPS * time.secondsPassed
				);
			}
		});
	};

	updateKo = (time) => {
		if (
			!this.startingHealthRollUpDone ||
			this.healthBars.every(
				({ hitPoints }) => hitPoints > HEALTH_CRITICAL_HIT_POINTS
			)
		)
			return;

		if (this.koFlashTimer + KO_FLASH_DELAY[this.koFrame] > time.previous)
			return;

		this.koFlashTimer = time.previous;
		this.koFrame = 1 - this.koFrame;
	};

	drawKo = (context) => {
		const frameKey = KO_FLASH_KEYS[this.koFrame];
		this.drawFrame(context, frameKey, 176, 18 - this.koFrame);
	};

	drawHealthBar(context) {
		this.drawFrame(context, 'health-bar', 31, 20);
		this.drawFrame(context, 'health-bar', 353, 20, -1);

		context.fillStyle = HEALTH_DAMAGE_COLOR;
		context.fillRect(
			32,
			21,
			Math.floor(
				(144 * (HEALTH_MAX_HIT_POINTS - this.healthBars[0].hitPoints)) /
					HEALTH_MAX_HIT_POINTS
			),
			9
		);
		context.fillRect(
			208 +
				Math.ceil((144 * this.healthBars[1].hitPoints) / HEALTH_MAX_HIT_POINTS),
			21,
			Math.floor(
				(144 * (HEALTH_MAX_HIT_POINTS - this.healthBars[1].hitPoints)) /
					HEALTH_MAX_HIT_POINTS
			),
			9
		);
	}

	drawTime(context) {
		const timeString = String(Math.max(this.time, 0)).padStart(2, '0');

		const timeFrame = TIME_FRAME_KEYS[Number(this.useFlashFrames)];

		this.drawFrame(context, `${timeFrame}-${timeString.charAt(0)}`, 178, 33);
		this.drawFrame(context, `${timeFrame}-${timeString.charAt(1)}`, 194, 33);
	}

	drawNames(context) {
		this.drawFrame(context, this.nameTags[0], 32, 33);
		this.drawFrame(context, this.nameTags[1], 322, 33);
	}

	updateTime(time) {
		if (time.previous > this.timeTimer + TIME_DELAY) {
			this.time -= 1;
			this.timeTimer = time.previous;
		}

		if (
			this.time < 15 &&
			this.time > -1 &&
			time.previous > this.timeFlashTimer + TIME_FLASH_DELAY
		) {
			this.timeFlashTimer = time.previous;
			this.useFlashFrames = !this.useFlashFrames;
		}
		if (this.time === -2) this.onTimeEnd(time);
	}

	update(time) {
		this.updateTime(time);
		this.updateKo(time);
		this.updateHealthBars(time);
	}

	drawScoreLabel(context, label, x) {
		for (const index in label) {
			this.drawFrame(
				context,
				`score-${label.charAt(index).toUpperCase()}`,
				x + 12 * index,
				1
			);
		}
	}

	drawScore(context, score, x) {
		const scoreStr = new String(score);
		const padding = 6 * 12 - scoreStr.length * 12;
		this.drawScoreLabel(context, scoreStr, x + padding);
	}

	drawScores(context) {
		this.drawScoreLabel(context, 'P1', 4);
		this.drawScore(context, gameState.fighters[0].score, 45);

		this.drawScoreLabel(context, 'May', 133);
		this.drawScore(context, 50000, 177);

		this.drawScoreLabel(context, 'P2', 269);
		this.drawScore(context, gameState.fighters[1].score, 309);
	}

	draw(context) {
		this.drawScores(context);
		this.drawKo(context);
		this.drawHealthBar(context);
		this.drawTime(context);
		this.drawNames(context);
	}
}

const __sf_entitites_overlays_StatusBar_js = {
	"StatusBar": StatusBar
};


// static/game/src/entitites/stage/shared/BackgroundAnimation.js
class BackgroundAnimation {
	constructor(name, image, frames, animation, startFrame = 0) {
		this.name = name;
		this.image = image;
		this.frames = new Map(frames);
		this.animation = animation;
		this.animationTimer = 0;
		this.animationFrame = startFrame;
		this.frameDelay = animation[this.animationFrame][1];
	}

	update = (time) => {
		if (time.previous > this.animationTimer + this.frameDelay) {
			this.animationFrame++;
			if (this.animationFrame >= this.animation.length) {
				this.animationFrame = 0;
			}
			this.frameDelay = this.animation[this.animationFrame][1];
			this.animationTimer = time.previous;
		}
	};

	draw = (context, camera, x = 0, y = 0) => {
		const dimensions = this.frames.get(this.animation[this.animationFrame][0]);
		const height = dimensions[3];
		drawFrame(
			context,
			this.image,
			dimensions,
			x,
			-height + y - camera.position.y
		);
	};
}

const __sf_entitites_stage_shared_BackgroundAnimation_js = {
	"BackgroundAnimation": BackgroundAnimation
};


// static/game/src/entitites/stage/shared/SkewedFloor.js
class SkewedFloor {
	constructor(image, dimensions) {
		this.image = image;
		this.dimensions = dimensions;
	}

	draw = (context, camera, y) => {
		const [sourceX, sourceY, width, height] = this.dimensions;

		context.save();
		context.setTransform(
			1,
			0,
			-5.15 - (camera.position.x - (STAGE_WIDTH + STAGE_PADDING)) / 112,
			1,
			32 - camera.position.x / 1.55,
			y - camera.position.y
		);

		context.drawImage(
			this.image,
			sourceX,
			sourceY,
			width,
			height,
			0,
			0,
			width,
			height
		);

		context.restore();
	};
}

const __sf_entitites_stage_shared_SkewedFloor_js = {
	"SkewedFloor": SkewedFloor
};


// static/game/src/entitites/stage/KenStage.js
class KenStage {
	image = document.getElementById('KenStage');
	backgroundMusic = document.getElementById('kensTheme');
	frames = new Map([
		['stage-background', [72, 208, 768, 176]],
		['stage-boat', [8, 16, 521, 180]],
		['stage-floor-bottom', [8, 448, 896, 16]],

		// Ballard type
		['ballard-small', [800, 184, 21, 16]],
		['ballard-large', [760, 176, 31, 24]],

		// Barrels

		['side-barrels', [560, 472, 151, 96]],
	]);

	floor = new SkewedFloor(this.image, [8, 392, 896, 56]);

	boat = {
		position: {
			x: 0,
			y: 0,
		},
		animationFrame: 0,
		animationDelay: 22,
		animationTimer: 0,
		animation: [0, -1, -2, -3, -4, -3, -2, -1],
	};

	flag = new BackgroundAnimation(
		'Flag',
		this.image,
		[
			['flag-1', [848, 208, 40, 40]],
			['flag-2', [848, 256, 40, 40]],
			['flag-3', [848, 304, 40, 40]],
		],
		[
			['flag-1', 133],
			['flag-2', 133],
			['flag-3', 133],
		],
		0
	);

	backgroundPeople = {
		shineGuy: [
			new BackgroundAnimation(
				'shineGuy',
				this.image,
				[
					['shiny-guy-1', [552, 8, 40, 64]],
					['shiny-guy-2', [552, 80, 40, 56]],
					['shiny-guy-3', [552, 144, 40, 56]],
				],
				[
					['shiny-guy-1', 100],
					['shiny-guy-2', 133],
					['shiny-guy-3', 664],
					['shiny-guy-2', 133],
				],
				0
			),
			[278, 157],
		],
		hatGuy: [
			new BackgroundAnimation(
				'HatGuy',
				this.image,
				[
					['hat-guy-1', [600, 24, 16, 48]],
					['hat-guy-2', [600, 88, 16, 48]],
				],
				[
					['hat-guy-1', 1000],
					['hat-guy-2', 1000],
				],
				0
			),
			[318, 157],
		],
		girl: [
			new BackgroundAnimation(
				'girl',
				this.image,
				[
					['girl-1', [624, 16, 32, 56]],
					['girl-2', [624, 80, 32, 56]],
					['girl-3', [624, 144, 32, 56]],
				],
				[
					['girl-1', 216],
					['girl-2', 216],
					['girl-3', 216],
					['girl-2', 216],
				],
				0
			),
			[342, 157],
		],
		greenGuy: [
			new BackgroundAnimation(
				'greenGuy',
				this.image,
				[
					['green-guy-1', [664, 16, 32, 56]],
					['green-guy-2', [664, 80, 32, 56]],
				],
				[
					['green-guy-1', 664],
					['green-guy-2', 498],
					['green-guy-1', 133],
					['green-guy-2', 133],
				],
				0
			),
			[374, 157],
		],
		blueCoatGuy: [
			new BackgroundAnimation(
				'blueCoatGuy',
				this.image,
				[
					['blue-coat-1', [704, 16, 48, 56]],
					['blue-coat-2', [704, 80, 48, 56]],
					['blue-coat-3', [704, 144, 48, 56]],
				],
				[
					['blue-coat-1', 996],
					['blue-coat-2', 133],
					['blue-coat-3', 100],
					['blue-coat-2', 133],
					['blue-coat-1', 249],
					['blue-coat-2', 133],
					['blue-coat-3', 100],
					['blue-coat-2', 133],
				],
				0
			),
			[438, 149],
		],
		brownCoatGuy: [
			new BackgroundAnimation(
				'brownCoatGuy',
				this.image,
				[
					['brown-coat-1', [760, 16, 40, 40]],
					['brown-coat-2', [760, 64, 40, 40]],
					['brown-coat-3', [760, 112, 40, 40]],
				],
				[
					['brown-coat-1', 133],
					['brown-coat-2', 133],
					['brown-coat-3', 133],
					['brown-coat-2', 133],
				],
				0
			),
			[238, 61],
		],
		pinkCoatGuy: [
			new BackgroundAnimation(
				'pinkCoatGuy',
				this.image,
				[
					['pink-coat-1', [808, 24, 48, 32]],
					['pink-coat-2', [808, 72, 48, 32]],
					['pink-coat-3', [808, 120, 48, 32]],
				],
				[
					['pink-coat-1', 1992],
					['pink-coat-2', 166],
					['pink-coat-3', 166],
					['pink-coat-2', 166],
					['pink-coat-1', 664],
					['pink-coat-2', 166],
					['pink-coat-3', 166],
					['pink-coat-2', 166],
					['pink-coat-3', 166],
					['pink-coat-2', 166],
				],
				0
			),
			[278, 53],
		],
	};

	constructor() {
		playSound(this.backgroundMusic, 0.2);
	}

	drawFrame = (context, frameKey, x, y, direction = 1) => {
		drawFrame(context, this.image, this.frames.get(frameKey), x, y, direction);
	};

	drawBoat = (context, camera) => {
		this.boat.position = {
			x: Math.floor(150 - camera.position.x / 1.613445),
			y: -3 - camera.position.y - this.boat.animation[this.boat.animationFrame],
		};
		this.drawFrame(
			context,
			'stage-boat',
			this.boat.position.x,
			this.boat.position.y
		);
	};

	updateBoat = (time, context) => {
		if (
			time.previous >
			this.boat.animationTimer + this.boat.animationDelay * FRAME_TIME
		) {
			this.boat.animationTimer = time.previous;
			this.boat.animationFrame++;
			this.boat.animationDelay = 22 + (Math.random() * 16 - 8);

			if (this.boat.animationFrame >= this.boat.animation.length) {
				this.boat.animationFrame = 0;
			}
		}
	};

	drawSkyOcean = (context, camera) => {
		this.drawFrame(
			context,
			'stage-background',
			Math.floor(16 - camera.position.x / 2.157303),
			-camera.position.y
		);
		this.flag.draw(
			context,
			camera,
			Math.floor(576 - camera.position.x / 2.157303),
			48
		);
	};

	updateBoatPersons(time, context, camera) {
		Object.keys(this.backgroundPeople).forEach((name) => {
			this.backgroundPeople[name][0].update(time);
		});
	}

	drawPeople = (context, camera) => {
		Object.keys(this.backgroundPeople).forEach((name) => {
			this.backgroundPeople[name][0].draw(
				context,
				camera,
				Math.floor(
					this.backgroundPeople[name][1][0] - camera.position.x / 1.613445
				),
				this.backgroundPeople[name][1][1] -
					this.boat.animation[this.boat.animationFrame]
			);
		});
	};

	drawFloor = (context, camera) => {
		this.floor.draw(context, camera, 176);

		this.drawFrame(
			context,
			'stage-floor-bottom',
			STAGE_PADDING - camera.position.x * 1.1,
			232 - camera.position.y
		);
	};

	drawSmallBallards = (context, camera) => {
		const cameraXOffset = camera.position.x / 1.54;
		this.drawFrame(
			context,
			'ballard-small',
			468 - 92 - cameraXOffset,
			166 - camera.position.y
		);
		this.drawFrame(
			context,
			'ballard-small',
			468 + 92 - cameraXOffset,
			166 - camera.position.y
		);
	};

	drawBarrels = (context, camera) => {
		this.drawFrame(
			context,
			'side-barrels',
			STAGE_PADDING + STAGE_WIDTH - 152 - camera.position.x,
			120 - camera.position.y
		);
	};

	drawLargeBallard = (context, camera) => {
		const cameraXOffset = camera.position.x / 0.958;
		this.drawFrame(
			context,
			'ballard-large',
			STAGE_MID_POINT + STAGE_PADDING - 147 - cameraXOffset,
			200 - camera.position.y
		);
		this.drawFrame(
			context,
			'ballard-large',
			STAGE_MID_POINT + STAGE_PADDING + 147 - cameraXOffset,
			200 - camera.position.y
		);
	};

	update = (time, context, camera) => {
		this.updateBoat(time, context);
		this.updateBoatPersons(time, context);
		this.flag.update(time);
	};

	drawBackground = (context, camera) => {
		this.drawSkyOcean(context, camera);
		this.drawBoat(context, camera);
		this.drawPeople(context, camera);
		this.drawFloor(context, camera);
		this.drawSmallBallards(context, camera);
		this.drawBarrels(context, camera);
	};

	drawForeground = (context, camera) => {
		this.drawLargeBallard(context, camera);
	};

	draw = (context, camera) => {
		this.drawBackground(context, camera);
		this.drawForeground(context, camera);
	};
}

const __sf_entitites_stage_KenStage_js = {
	"KenStage": KenStage
};


// static/game/src/scenes/StartScene.js
class StartScene {
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

const __sf_scenes_StartScene_js = {
	"StartScene": StartScene
};


// static/game/src/scenes/BattleScene.js
const AIRBORNE_FIGHTER_STATES = new Set([
	FighterState.JUMP_START,
	FighterState.JUMP_UP,
	FighterState.JUMP_FORWARD,
	FighterState.JUMP_BACKWARD,
]);
const PEER_RENDER_DELAY_MS = 80;
const PEER_BUFFER_LIMIT = 8;

class BattleScene {
	image = document.getElementById('Winner');
	fighters = [];
	camera = undefined;
	shadows = [];
	FighterDrawOrder = [0, 1];
	hurtTimer = 0;
	battleEnded = false;
	winnerId = undefined;
	networkFinishHandled = false;
	peerFighterSnapshots = [[], []];

	constructor(changeScene) {
		this.changeScene = changeScene;
		this.stage = new KenStage();
		this.entities = new EntityList();
		this.overlays = [
			new StatusBar(this.fighters, this.onTimeEnd),
			new FpsCounter(),
		];
		resetGameState();
		this.startRound();
		window.STREETFIGHTER_BATTLE = {
			getNetworkSnapshot: this.getNetworkSnapshot,
			getLocalFighterSnapshot: this.getLocalFighterSnapshot,
			receivePeerFighterSnapshot: this.receivePeerFighterSnapshot,
			applyNetworkSnapshot: this.applyNetworkSnapshot,
		};
	}

	getFighterClass = (id) => {
		switch (id) {
			case FighterId.KEN:
				return Ken;
			case FighterId.RYU:
				return Ryu;
			default:
				return new Error('Invalid Fighter Id');
		}
	};

	getFighterEntitiy = (id, index) => {
		const FighterClass = this.getFighterClass(id);
		return new FighterClass(index, this.handleAttackHit, this.entities);
	};

	getFighterEntities = () => {
		const fighterEntities = gameState.fighters.map(({ id }, index) => {
			const fighterEntity = this.getFighterEntitiy(id, index);
			gameState.fighters[index].instance = fighterEntity;
			return fighterEntity;
		});

		fighterEntities[0].opponent = fighterEntities[1];
		fighterEntities[1].opponent = fighterEntities[0];

		return fighterEntities;
	};

	updateFighters = (time, context) => {
		this.fighters.map((fighter) => {
			if (this.hurtTimer > time.previous) {
				fighter.updateHurtShake(time, this.hurtTimer);
			} else fighter.update(time, this.camera);
		});
	};

	getHitSplashClass = (strength) => {
		switch (strength) {
			case FighterAttackStrength.LIGHT:
				return LightHitSplash;
			case FighterAttackStrength.MEDIUM:
				return MediumHitSplash;
			case FighterAttackStrength.HEAVY:
				return HeavyHitSplash;
			default:
				return new Error('Invalid Strength Splash requested');
		}
	};

	handleAttackHit = (time, playerId, opponentId, position, strength) => {
		this.FighterDrawOrder = [opponentId, playerId];
		gameState.fighters[playerId].score += FighterAttackBaseData[strength].score;

		gameState.fighters[opponentId].hitPoints -=
			FighterAttackBaseData[strength].damage;

		const HitSplashClass = this.getHitSplashClass(strength);

		if (gameState.fighters[opponentId].hitPoints <= 0) {
			this.fighters[opponentId].changeState(FighterState.KO, time);
		}

		this.fighters[opponentId].direction =
			this.fighters[playerId].direction * -1;

		position &&
			this.entities.add(HitSplashClass, position.x, position.y, playerId);

		this.hurtTimer = time.previous + FighterStruckDelay * FRAME_TIME;
	};

	updateShadows = (time) => {
		this.shadows.map((shadow) => shadow.update(time));
	};

	startRound = () => {
		this.networkFinishHandled = false;
		this.fighters = this.getFighterEntities();
		this.camera = new Camera(
			STAGE_PADDING + STAGE_MID_POINT - SCENE_WIDTH / 2,
			16,
			this.fighters
		);

		this.shadows = this.fighters.map((fighter) => new Shadow(fighter));
	};

	goToStartScene = () => {
		setTimeout(() => {
			this.changeScene(StartScene);
		}, 6000);
	};

	drawWinnerText = (context, id) => {
		context.drawImage(this.image, 0, 11 * id, 70, 9, 120, 60, 140, 30);
	};

	onTimeEnd = (time) => {
		if (gameState.fighters[0].hitPoints >= gameState.fighters[1].hitPoints) {
			this.fighters[0].victory = true;
			this.fighters[1].changeState(FighterState.KO, time);
			this.winnerId = 0;
		} else {
			this.fighters[1].victory = true;
			this.fighters[0].changeState(FighterState.KO, time);
			this.winnerId = 1;
		}
		window.dispatchEvent(
			new CustomEvent('streetfighter:winner', {
				detail: { winnerIndex: this.winnerId },
			})
		);
		this.goToStartScene();
	};

	updateOverlays = (time) => {
		this.overlays.map((overlay) => overlay.update(time));
	};

	updateFighterHP = (time) => {
		gameState.fighters.map((fighter, index) => {
			if (fighter.hitPoints <= 0 && !this.battleEnded) {
				this.fighters[index].opponent.victory = true;
				this.winnerId = 1 - index;
				this.battleEnded = true;
				window.dispatchEvent(
					new CustomEvent('streetfighter:winner', {
						detail: { winnerIndex: this.winnerId },
					})
				);
				this.goToStartScene();
			}
		});
	};

	getStatusBar = () => this.overlays.find((overlay) => 'time' in overlay);

	getNetworkSnapshot = () => ({
		time: this.getStatusBar()?.time ?? 99,
		battleEnded: this.battleEnded,
		winnerId: this.winnerId ?? null,
		camera: {
			x: this.camera.position.x,
			y: this.camera.position.y,
		},
		fighters: this.fighters.map((fighter, index) => ({
			position: {
				x: fighter.position.x,
				y: fighter.position.y,
			},
			velocity: {
				x: fighter.velocity.x,
				y: fighter.velocity.y,
			},
			direction: fighter.direction,
			currentState: fighter.currentState,
			animationFrame: fighter.animationFrame,
			hitPoints: gameState.fighters[index].hitPoints,
			score: gameState.fighters[index].score,
			victory: fighter.victory,
		})),
		fireballs: this.entities.entitiesList
			.filter((entity) => entity instanceof Fireball)
			.map((fireball) => ({
				ownerId: fireball.fighter.playerId,
				strength: fireball.strength,
				position: {
					x: fireball.position.x,
					y: fireball.position.y,
				},
				direction: fireball.direction,
				currentState: fireball.currentState,
				animationFrame: fireball.animationFrame,
		})),
	});

	getFighterSnapshot = (index) => {
		const fighter = this.fighters[index];
		if (!fighter) return null;
		return {
			position: {
				x: fighter.position.x,
				y: fighter.position.y,
			},
			velocity: {
				x: fighter.velocity.x,
				y: fighter.velocity.y,
			},
			direction: fighter.direction,
			currentState: fighter.currentState,
			animationFrame: fighter.animationFrame,
			grounded:
				fighter.position.y >= STAGE_FLOOR - 1 &&
				!AIRBORNE_FIGHTER_STATES.has(fighter.currentState),
			hitPoints: gameState.fighters[index].hitPoints,
			score: gameState.fighters[index].score,
			victory: fighter.victory,
		};
	};

	getLocalFighterSnapshot = (index) => {
		const fighter = this.getFighterSnapshot(index);
		if (!fighter) return null;
		return {
			fighter,
			fireballs: this.entities.entitiesList
				.filter(
					(entity) =>
						entity instanceof Fireball && entity.fighter.playerId === index
				)
				.map((fireball) => ({
					ownerId: fireball.fighter.playerId,
					strength: fireball.strength,
					position: {
						x: fireball.position.x,
						y: fireball.position.y,
					},
					direction: fireball.direction,
					currentState: fireball.currentState,
					animationFrame: fireball.animationFrame,
				})),
		};
	};

	receivePeerFighterSnapshot = (snapshot = {}, { remotePlayerIndex = null } = {}) => {
		if (!Number.isInteger(remotePlayerIndex) || !this.fighters[remotePlayerIndex]) return;
		if (!snapshot?.fighter) return;
		const buffer = this.peerFighterSnapshots[remotePlayerIndex];
		buffer.push({ ...snapshot, receivedAtMs: performance.now() });
		if (buffer.length > PEER_BUFFER_LIMIT) {
			buffer.splice(0, buffer.length - PEER_BUFFER_LIMIT);
		}
	};

	applyBufferedPeerFighterSnapshots = () => {
		for (const [index, buffer] of this.peerFighterSnapshots.entries()) {
			if (!buffer.length) continue;
			const snapshot = this.interpolatedPeerSnapshot(buffer);
			this.applyPeerFighterSnapshot(index, snapshot);
		}
	};

	interpolatedPeerSnapshot = (buffer) => {
		if (buffer.length === 1) return buffer[0];
		const targetTime = performance.now() - PEER_RENDER_DELAY_MS;
		while (buffer.length > 2 && buffer[1].receivedAtMs <= targetTime) {
			buffer.shift();
		}
		const older = buffer[0];
		const newer = buffer[1] || older;
		const span = Math.max(1, newer.receivedAtMs - older.receivedAtMs);
		const alpha = Math.min(1, Math.max(0, (targetTime - older.receivedAtMs) / span));
		return {
			...newer,
			fighter: {
				...newer.fighter,
				position: this.interpolatePoint(
					older.fighter?.position,
					newer.fighter?.position,
					alpha
				),
			},
		};
	};

	interpolatePoint = (older = {}, newer = {}, alpha) => {
		const oldX = Number(older?.x);
		const oldY = Number(older?.y);
		const newX = Number(newer?.x);
		const newY = Number(newer?.y);
		if (
			!Number.isFinite(oldX) ||
			!Number.isFinite(oldY) ||
			!Number.isFinite(newX) ||
			!Number.isFinite(newY)
		) {
			return newer;
		}
		return {
			x: oldX + (newX - oldX) * alpha,
			y: oldY + (newY - oldY) * alpha,
		};
	};

	applyPeerFighterSnapshot = (index, snapshot = {}) => {
		const fighter = this.fighters[index];
		const fighterState = snapshot.fighter;
		if (!fighter || !fighterState) return;
		this.applyRemoteFighterState(fighter, fighterState, true);
		fighter.velocity.x = Number(fighterState.velocity?.x ?? fighter.velocity.x);
		fighter.velocity.y = Number(fighterState.velocity?.y ?? fighter.velocity.y);
		fighter.direction = Number(fighterState.direction) < 0 ? -1 : 1;
		fighter.victory = fighterState.victory === true;
		gameState.fighters[index].hitPoints = Number(
			fighterState.hitPoints ?? gameState.fighters[index].hitPoints
		);
		gameState.fighters[index].score = Number(
			fighterState.score ?? gameState.fighters[index].score
		);
		this.applyNetworkFireballs(snapshot.fireballs, 1 - index);
	};

	applyNetworkSnapshot = (
		snapshot = {},
		{ preserveAnimations = false, localPlayerIndex = null } = {}
	) => {
		if (!snapshot || !Array.isArray(snapshot.fighters)) return;
		const statusBar = this.getStatusBar();
		if (statusBar && Number.isFinite(Number(snapshot.time))) {
			statusBar.time = Number(snapshot.time);
			statusBar.startingHealthRollUpDone = true;
		}
		if (snapshot.camera) {
			this.camera.position.x = Number(snapshot.camera.x ?? this.camera.position.x);
			this.camera.position.y = Number(snapshot.camera.y ?? this.camera.position.y);
		}
		if (preserveAnimations) {
			this.applyNetworkFireballs(snapshot.fireballs, localPlayerIndex);
		}
		this.battleEnded = snapshot.battleEnded === true;
		this.winnerId =
			snapshot.winnerId === null || snapshot.winnerId === undefined
				? undefined
				: Number(snapshot.winnerId);

		snapshot.fighters.slice(0, 2).forEach((fighterState, index) => {
			const fighter = this.fighters[index];
			if (!fighter || !fighterState) return;
			const preserveLocalFighter = index === localPlayerIndex && !this.battleEnded;
			if (!preserveLocalFighter) {
				this.applyRemoteFighterState(fighter, fighterState, preserveAnimations);
				fighter.velocity.x = Number(fighterState.velocity?.x ?? fighter.velocity.x);
				fighter.velocity.y = Number(fighterState.velocity?.y ?? fighter.velocity.y);
				fighter.direction = Number(fighterState.direction) < 0 ? -1 : 1;
				fighter.victory = fighterState.victory === true;
			} else {
				this.correctLocalFighterDrift(fighter, fighterState);
			}
			gameState.fighters[index].hitPoints = Number(
				fighterState.hitPoints ?? gameState.fighters[index].hitPoints
			);
			gameState.fighters[index].score = Number(
				fighterState.score ?? gameState.fighters[index].score
			);
			if (statusBar?.healthBars?.[index]) {
				statusBar.healthBars[index].hitPoints = gameState.fighters[index].hitPoints;
			}
		});
		if (this.battleEnded && !this.networkFinishHandled) {
			this.networkFinishHandled = true;
			this.applyNetworkFinish();
		}
	};

	applyRemoteFighterState = (fighter, fighterState = {}, preserveAnimations) => {
		fighter.position.x = Number(fighterState.position?.x ?? fighter.position.x);
		fighter.position.y = Number(fighterState.position?.y ?? fighter.position.y);
		if (fighter.animations[fighterState.currentState]) {
			const stateChanged = fighter.currentState !== fighterState.currentState;
			fighter.currentState = fighterState.currentState;
			if (!preserveAnimations || stateChanged) {
				fighter.setAnimationFrame(
					Number(fighterState.animationFrame || 0),
					{ previous: 0 }
				);
			} else if (!fighter.animations[fighter.currentState]?.[fighter.animationFrame]) {
				fighter.setAnimationFrame(0, { previous: 0 });
			}
		}
	};

	correctLocalFighterDrift = (fighter, fighterState = {}) => {
		const authoritativeX = Number(fighterState.position?.x);
		const authoritativeY = Number(fighterState.position?.y);
		if (!Number.isFinite(authoritativeX) || !Number.isFinite(authoritativeY)) return;
		const dx = authoritativeX - fighter.position.x;
		const dy = authoritativeY - fighter.position.y;
		const distance = Math.hypot(dx, dy);
		if (distance < 70) return;
		fighter.position.x += dx * 0.35;
		fighter.position.y += dy * 0.35;
	};

	applyNetworkFinish = () => {
		if (this.winnerId !== 0 && this.winnerId !== 1) return;
		const loserId = 1 - this.winnerId;
		const winner = this.fighters[this.winnerId];
		const loser = this.fighters[loserId];
		if (winner) winner.victory = true;
		if (loser) loser.changeState(FighterState.KO, { previous: 0 });
		this.goToStartScene();
	};

	applyNetworkFireballs = (states = [], localPlayerIndex = null) => {
		const fireballs = Array.isArray(states)
			? states.filter((state) => {
				const ownerId = Number(state?.ownerId);
				return this.battleEnded || ownerId !== localPlayerIndex;
			})
			: [];
		const ownerIds = new Set(
			fireballs
				.map((state) => Number(state?.ownerId))
				.filter((ownerId) => Number.isInteger(ownerId) && this.fighters[ownerId])
		);
		this.entities.entitiesList = this.entities.entitiesList.filter(
			(entity) =>
				!(
					entity instanceof Fireball &&
					entity.networkControlled &&
					!ownerIds.has(entity.fighter.playerId)
				)
		);

		for (const state of fireballs) {
			const ownerId = Number(state?.ownerId);
			if (!Number.isInteger(ownerId) || !this.fighters[ownerId]) continue;
			let fireball = this.entities.entitiesList.find(
				(entity) =>
					entity instanceof Fireball && entity.fighter.playerId === ownerId
			);
			if (!fireball) {
				fireball = new Fireball(
					this.fighters[ownerId],
					Number(state.strength) || 1,
					{ previous: 0 },
					this.entities
				);
				this.entities.entitiesList.push(fireball);
			}
			fireball.applyNetworkState(state);
		}
	};

	update = (time) => {
		this.updateFighters(time);
		this.applyBufferedPeerFighterSnapshots();
		this.updateShadows(time);
		this.stage.update(time);
		this.entities.update(time, this.camera);
		this.camera.update(time);
		this.updateOverlays(time);
		this.updateFighterHP(time);
	};

	drawFighters(context) {
		this.FighterDrawOrder.map((id) =>
			this.fighters[id].draw(context, this.camera)
		);
	}

	drawShadows(context) {
		this.shadows.map((shadow) => shadow.draw(context, this.camera));
	}

	drawOverlays(context) {
		this.overlays.map((overlay) => overlay.draw(context, this.camera));
		if (this.winnerId !== undefined) {
			this.drawWinnerText(context, this.winnerId);
		}
	}

	draw = (context) => {
		this.stage.drawBackground(context, this.camera);
		this.drawShadows(context);
		this.drawFighters(context);
		this.entities.draw(context, this.camera);
		this.stage.drawForeground(context, this.camera);
		this.drawOverlays(context);
	};
}

const __sf_scenes_BattleScene_js = {
	"BattleScene": BattleScene
};


// static/game/src/engine/ContextHandler.js
class ContextHandler {
	brightness = 1;
	contrast = 1;

	minBrightness = 0;
	maxContrast = 2;

	dimDown = false;
	glowUp = false;

	constructor(context) {
		this.context = context;
	}

	startGlowUp = () => {
		this.glowUp = true;
		this.brightness = this.minBrightness;
		this.contrast = this.maxContrast;
	};

	startDimDown = () => {
		this.dimDown = true;
	};

	updateGlowUp = (time) => {
		if (this.brightness === 1 && this.contrast === 1) return true;
		this.brightness = Math.min(1, this.brightness + 1 * time.secondsPassed);
		this.contrast = Math.max(1, this.contrast - 2 * time.secondsPassed);
		return false;
	};

	updateDimDown = (time) => {
		if (
			this.brightness === this.minBrightness &&
			this.contrast === this.maxContrast
		) {
			this.dimDown = false;
			return;
		}
		this.brightness = Math.max(
			this.minBrightness,
			this.brightness - 1 * time.secondsPassed
		);
		this.contrast = Math.min(
			this.contrast + 2 * time.secondsPassed,
			this.maxContrast
		);
	};

	update = (time) => {
		if (this.dimDown) this.updateDimDown(time);
		else if (this.glowUp) this.updateGlowUp(time);
	};
	draw = () => {};
}

const __sf_engine_ContextHandler_js = {
	"ContextHandler": ContextHandler
};


// static/game/src/StreetFighterGame.js
class StreetFighterGame {
	context = getContext();

	frameTime = {
		secondsPassed: 0,
		previous: 0,
	};

	timeStarted = 0;
	sceneStarted = false;
	nextScene = undefined;

	contextHandler = new ContextHandler(this.context);

	changeScene = (SceneClass) => {
		this.contextHandler.startDimDown();
		this.sceneStarted = false;
		this.nextScene = SceneClass;
	};

	startScene = (SceneClass) => {
		this.contextHandler.startGlowUp();
		this.scene = new SceneClass(this.changeScene);
		this.sceneStarted = true;
	};

	constructor() {
		this.startScene(StartScene);
	}

	updateScenes = () => {
		this.scene.draw(this.context);
		if (this.contextHandler.dimDown) return;
		if (!this.sceneStarted) this.startScene(this.nextScene);
		this.scene.update(this.frameTime);
	};

	frame = (time) => {
		window.requestAnimationFrame(this.frame.bind(this));
		try {
			this.runFrame(time);
		} catch (error) {
			console.error('[streetfighter] frame failed', error);
			window.dispatchEvent(
				new CustomEvent('streetfighter:game-error', {
					detail: { message: error instanceof Error ? error.message : String(error) },
				})
			);
		}
	};

	runFrame = (time) => {
		if (this.timeStarted === 0) {
			this.timeStarted = time;
		}
		time -= this.timeStarted;
		time = time * GAME_SPEED;

		this.frameTime = {
			secondsPassed: (time - this.frameTime.previous) / 1000,
			previous: time,
		};
		updateGamePads();
		this.contextHandler.update(this.frameTime);
		this.context.filter = `brightness(${this.contextHandler.brightness}) contrast(${this.contextHandler.contrast})`;
		this.updateScenes();
	};

	start() {
		window.STREETFIGHTER_AUDIO = {
			isMuted,
			setMuted,
			unlockAudio,
		};
		setMuted(window.STREETFIGHTER_MUTED === true);
		registerAudioUnlockEvents();
		registerKeyboardEvents();
		registerGamepadEvents();
		window.requestAnimationFrame(this.frame.bind(this));
	}
}

const __sf_StreetFighterGame_js = {
	"StreetFighterGame": StreetFighterGame
};


// static/game/src/index.js
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

