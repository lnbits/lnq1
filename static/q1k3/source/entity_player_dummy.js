class entity_player_dummy_t extends entity_t {
	_init(id) {
		this._id = id || '';
		this._model = model_grunt;
		this._texture = 17;
		this.s = vec3(12,28,12);
		this._yaw = Math.PI;
		this._ANIMS = [
			[1, [0]],
			[0.40, [1,2,3,4]],
			[0.20, [1,2,3,4]],
			[0.25, [0,5,5,5]],
			[0.25, [5,0,0,0]]
		];
		this._anim = this._ANIMS[0];
		this._health = 100;
		this._check_against = ENTITY_GROUP_NONE;
		this._last_shot_at = 0;
		this._next_remote_shot_at = 0;
		this._was_shooting = 0;
		this._weapon = 0;
		this._weapon_type = 0;
		this._last_shot_sequence = 0;
		this._anim_index = 0;
		game_entities_enemies.push(this);
	}

	_update() {
		if (this._last_shot_at && game_time - this._last_shot_at < 0.08) {
			game_spawn(entity_light_t, vec3_add(this.p, vec3(0,30,0)), 8, 0xff)._die_at = game_time + 0.05;
		}
		this._draw_model();
	}

	_apply_snapshot(snapshot) {
		if (snapshot.dead) {
			this._remove_remote();
			return;
		}
		this.p.x = snapshot.x;
		this.p.y = snapshot.y;
		this.p.z = snapshot.z;
		this._yaw = snapshot.yaw;
		this._pitch = snapshot.pitch;
		this._health = snapshot.health == null ? this._health : snapshot.health;
		this._texture = 17;
		this._weapon = snapshot.weapon || 0;
		this._weapon_type = snapshot.weaponType == null ? this._weapon : snapshot.weaponType;
		let moving = Math.abs(snapshot.vx || 0) + Math.abs(snapshot.vz || 0) > 40,
			shot_sequence = Number(snapshot.shotSequence || 0),
			has_shot_sequence = shot_sequence > 0,
			shooting_now = !!snapshot.shooting;
		this._set_anim(shooting_now && game_time - this._last_shot_at < 0.25 ? 3 : moving ? 1 : 0);
		if (has_shot_sequence && shot_sequence > this._last_shot_sequence) {
			this._last_shot_sequence = shot_sequence;
			this._remote_shoot(snapshot.shotWeaponType == null ? this._weapon_type : snapshot.shotWeaponType);
		}
		else if (!has_shot_sequence && shooting_now && (!this._was_shooting || game_time >= this._next_remote_shot_at)) {
			this._remote_shoot();
		}
		this._was_shooting = shooting_now;
	}

	_set_anim(index) {
		if (this._anim_index == index) {
			return;
		}
		this._anim_index = index;
		this._anim = this._ANIMS[index];
		this._anim_time = 0;
	}

	_remote_shoot(weapon_index) {
		let weapon = weapon_index == null ? this._weapon_type : weapon_index;
		let reloads = [0.9, 0.09, 0.65],
			types = [entity_projectile_shell_t, entity_projectile_nail_t, entity_projectile_grenade_t],
			speeds = [10000, 1300, 900],
			count = weapon == 0 ? 8 : 1,
			projectile_type = types[weapon] || entity_projectile_shell_t,
			speed = speeds[weapon] || 10000;
		this._last_shot_at = game_time;
		this._set_anim(3);
		this._next_remote_shot_at = game_time + (reloads[weapon] || 0.9);
		for (let i = 0; i < count; i++) {
			let yaw = this._yaw + (weapon == 0 ? Math.random() * 0.08 - 0.04 : 0),
				pitch = this._pitch + (weapon == 0 ? Math.random() * 0.08 - 0.04 : 0),
				projectile = game_spawn(projectile_type, vec3_add(
					this.p,
					vec3_add(vec3(0, 12, 0), vec3_rotate_yaw_pitch(vec3(0, 0, 8), yaw, pitch))
				));
			projectile.v = vec3_rotate_yaw_pitch(vec3(0, 0, speed), yaw, pitch);
			projectile._yaw = yaw - Math.PI/2;
			projectile._pitch = -pitch;
			projectile._check_against = ENTITY_GROUP_PLAYER;
			if (weapon == 2) {
				projectile._damage = 40;
			}
		}
	}

	_remove_remote() {
		if (this._dead) {
			return;
		}
		super._kill();
		game_entities_enemies = game_entities_enemies.filter(e => e != this);
	}

	_kill() {
		if (this._dead) {
			return;
		}
		super._kill();
		for (let m of model_gib_pieces) {
			this._spawn_particles(1, 220, m, 18, 0.8);
		}
		game_entities_enemies = game_entities_enemies.filter(e => e != this);
	}

	_receive_damage(from, amount) {
		if (!this._dead) {
			this._health -= amount;
			if (this._health <= 0 && window.LNQ1_MULTIPLAYER) {
				window.LNQ1_MULTIPLAYER.reportKill(this._id);
			}
		}
	}
}
