class entity_jump_pad_t extends entity_t {
	_init(texture) {
		this._model = model_jump_pad;
		this._texture = texture;
		this._launch_at = 0;
	}

	_update() {
		this._draw_model();

		let p = game_entity_player.p;
		if (
			game_time > this._launch_at &&
			Math.abs(p.x - this.p.x) < 48 &&
			Math.abs(p.z - this.p.z) < 48 &&
			Math.abs((p.y - game_entity_player.s.y) - this.p.y) < 32
		) {
			game_entity_player.v.y = 1000;
			game_entity_player._on_ground = 0;
			this._launch_at = game_time + 0.25;
			game_spawn(entity_light_t, vec3_add(this.p, vec3(0, 32, 0)), 20, 0xff)._die_at = game_time + 0.15;
		}
	}
}
