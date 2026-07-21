import {
	SCENE_WIDTH,
	STAGE_FLOOR,
	STAGE_MID_POINT,
	STAGE_PADDING,
} from '../constants/stage.js';
import {
	FighterAttackBaseData,
	FighterAttackStrength,
	FighterId,
	FighterState,
	FighterStruckDelay,
} from '../constants/fighter.js';
import { FRAME_TIME, GAME_SPEED } from '../constants/game.js';
import { Camera } from '../engine/Camera.js';
import { EntityList } from '../engine/EntityList.js';
import { Ken, Ryu } from '../entitites/fighters/index.js';
import {
	HeavyHitSplash,
	LightHitSplash,
	MediumHitSplash,
	Shadow,
} from '../entitites/fighters/shared/index.js';
import { Fireball } from '../entitites/fighters/special/Fireball.js';
import { FpsCounter } from '../entitites/overlays/FpsCounter.js';
import { StatusBar } from '../entitites/overlays/StatusBar.js';
import { KenStage } from '../entitites/stage/KenStage.js';
import { gameState, resetGameState } from '../states/gameState.js';
import { StartScene } from './StartScene.js';

const AIRBORNE_FIGHTER_STATES = new Set([
	FighterState.JUMP_START,
	FighterState.JUMP_UP,
	FighterState.JUMP_FORWARD,
	FighterState.JUMP_BACKWARD,
]);
const PEER_RENDER_DELAY_MS = 80;
const PEER_BUFFER_LIMIT = 8;

export class BattleScene {
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
