
let
game_tick = 0,
game_time = 0.016,
game_real_time_last,
game_message_timeout = 0,

game_entities,
game_entities_enemies,
game_entities_friendly,
game_entity_player,
game_remote_players = {},
game_remote_sequences = {},
game_map_index,
game_jump_to_next_level,

game_init = (map_index) => {
	ts.style.display = 'none',

	game_entities = [];
	game_entities_enemies = [];
	game_entities_friendly = [];
	game_remote_players = {};
	game_remote_sequences = {};

	game_map_index = map_index;
	map_init(map_data[game_map_index]);
},

game_next_level = () => {
	game_jump_to_next_level = 1;
},

game_spawn = (type, pos, p1, p2) =>  {
	let entity = new (type)(pos, p1, p2)
	game_entities.push(entity);
	return entity;
},

game_local_snapshot = () => game_entity_player && !game_entity_player._dead ? {
	x: game_entity_player.p.x,
	y: game_entity_player.p.y,
	z: game_entity_player.p.z,
	yaw: game_entity_player._yaw,
	pitch: game_entity_player._pitch,
	health: game_entity_player._health,
	dead: !!game_entity_player._dead,
	shooting: !!keys[key_action],
	weapon: game_entity_player._weapon_index || 0,
	ammo: game_entity_player._weapons[game_entity_player._weapon_index]._ammo || 0,
	vx: game_entity_player.v.x,
	vy: game_entity_player.v.y,
	vz: game_entity_player.v.z,
	onGround: !!game_entity_player._on_ground,
	t: game_time
} : null,

game_apply_remote_snapshot = (id, snapshot) => {
	if (!id || !snapshot || !game_entity_player) {
		return;
	}
	let sequence = Number(snapshot.sequence || 0);
	if (sequence && sequence <= (game_remote_sequences[id] || 0)) {
		return;
	}
	if (sequence) {
		game_remote_sequences[id] = sequence;
	}
	let remote = game_remote_players[id];
	if (!remote) {
		remote = game_spawn(entity_player_dummy_t, vec3(snapshot.x, snapshot.y, snapshot.z), id);
		game_remote_players[id] = remote;
	}
	remote._apply_snapshot(snapshot);
},

game_remove_remote_player = (id) => {
	let remote = game_remote_players[id];
	if (remote) {
		remote._kill();
		delete game_remote_players[id];
		delete game_remote_sequences[id];
	}
},

game_set_local_spawn = (pos, yaw) => {
	if (!game_entity_player || !pos) {
		return;
	}
	if (window.map_find_open_spawn) {
		pos = window.map_find_open_spawn(pos);
	}
	game_entity_player.p = vec3_clone(pos);
	game_entity_player.v = vec3();
	game_entity_player.a = vec3();
	if (yaw != null) {
		game_entity_player._yaw = yaw;
	}
	r_camera.x = game_entity_player.p.x;
	r_camera.y = game_entity_player.p.y + 8;
	r_camera.z = game_entity_player.p.z;
	r_camera_yaw = game_entity_player._yaw;
},

game_revive_local_player = (pos, yaw) => {
	if (!game_entity_player) {
		return;
	}
	game_entity_player._dead = 0;
	game_entity_player._health = 100;
	game_entity_player._can_jump = 0;
	game_entity_player._can_shoot_at = 0;
	if (!game_entities.includes(game_entity_player)) {
		game_entities.push(game_entity_player);
	}
	if (!game_entities_friendly.includes(game_entity_player)) {
		game_entities_friendly.push(game_entity_player);
	}
	game_set_local_spawn(pos, yaw);
	ts.style.display = 'none';
	h.textContent = 100;
},

game_show_message = (text) => {
	msg.textContent = text;
	msg.style.display = 'block';
	clearTimeout(game_message_timeout);
	game_message_timeout = setTimeout(()=>msg.style.display = 'none', 2000);
},

title_show_message = (msg, sub = '') => {
	ts.innerHTML = '<h1>'+msg+'</h1>' + sub;
	ts.style.display = 'block';
},

game_run = (time_now) => {
	requestAnimationFrame(game_run);

	time_now *= 0.001;
	game_tick = Math.min((time_now - (game_real_time_last||time_now)),0.05);
	game_real_time_last = time_now;
	game_time += game_tick;

	r_prepare_frame(0.03, 0.05, 0.13);

	// Update and render entities
	let alive_entities = [];
	for (let entity of game_entities) {
		if (!entity._dead) {
			entity._update();
			alive_entities.push(entity);
		}
	}
	game_entities = alive_entities;

	map_draw();
	r_end_frame();

	// Reset mouse movement and buttons that should be pressed, not held.
	mouse_x = mouse_y = 0;
	keys[key_next] = keys[key_prev] = 0;

	if (game_jump_to_next_level) {
		game_jump_to_next_level = 0;
		game_map_index++;
		if (game_map_index == 2) {
			title_show_message('THE END', 'THANKS FOR PLAYING ❤');
			h.textContent = a.textContent = '';
			game_entity_player._dead = 1;

			// Set camera position for end screen
			r_camera = vec3(1856,784,2272);
			r_camera_yaw = 0;
			r_camera_pitch = 0.5;
		}
		else {
			game_init(game_map_index);
		}
	}
};

window.game_local_snapshot = game_local_snapshot;
window.game_apply_remote_snapshot = game_apply_remote_snapshot;
window.game_remove_remote_player = game_remove_remote_player;
window.game_set_local_spawn = game_set_local_spawn;
window.game_revive_local_player = game_revive_local_player;
