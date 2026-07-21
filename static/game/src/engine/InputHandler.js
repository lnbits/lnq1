import { CONTROLLER_DEADZONE, controls } from '../config/controls.js';
import { Control } from '../constants/controls.js';
import { FighterDirection } from '../constants/fighter.js';

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

export const registerKeyboardEvents = () => {
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

export const updateGamePads = () => {
	const gamepadList = navigator.getGamepads();

	for (const [gamePadIndex, gamePad] of gamepadList.entries()) {
		updateGamepadButtons(gamePadIndex, gamePad);
		updateGamepadAxes(gamePadIndex, gamePad);
	}
};

export const registerGamepadEvents = () => {
	window.addEventListener('gamepadconnected', handleGamepadConnected);
	window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);
};

export const isLeft = (id) => {
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

export const isUp = (id) => {
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

export const isRight = (id) => {
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

export const isDown = (id) => {
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

export const isForward = (id, direction) => {
	return direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id);
};

export const isBackward = (id, direction) => {
	return direction === FighterDirection.RIGHT ? isLeft(id) : isRight(id);
};

export const isIdle = (id) =>
	isUp(id) || isDown(id) || isLeft(id) || isRight(id);

export const isKeyPressed = (id, code, forControlHistory) => {
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

export const isLightPunch = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.LIGHT_PUNCH, forControlHistory);
};
export const isMediumPunch = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.MEDIUM_PUNCH, forControlHistory);
};
export const isHeavyPunch = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.HEAVY_PUNCH, forControlHistory);
};

export const isLightKick = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.LIGHT_KICK, forControlHistory);
};
export const isMediumKick = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.MEDIUM_KICK, forControlHistory);
};
export const isHeavyKick = (id, forControlHistory = false) => {
	return isKeyPressed(id, Control.HEAVY_KICK, forControlHistory);
};

export const setRemoteInput = (id, input = {}, meta = {}) => {
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

export const clearRemoteInputs = () => {
	remoteInputs[0] = null;
	remoteInputs[1] = null;
	remoteInputSequences[0] = 0;
	remoteInputSequences[1] = 0;
	remoteInputTimes[0] = 0;
	remoteInputTimes[1] = 0;
	remotePressedControls[0].clear();
	remotePressedControls[1].clear();
};

export const getLocalInputSnapshot = () => {
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
