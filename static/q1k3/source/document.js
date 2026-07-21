let ui_is_lnq1 = () => window.LNQ1_MULTIPLAYER ||
	location.href.indexOf('/lnq1/') >= 0 ||
	[...document.scripts].some(s => s.src.indexOf('/ext-assets/lnq1/') >= 0);

document.body.innerHTML +=
	(ui_is_lnq1() ? '' : '<style>'+
		'*{font-family:sans-serif;}'+
		'a,body{color:#fff;background:#111;text-align:center;margin:0;}'+
		'#c{display:block;width:100%;image-rendering:optimizeSpeed;image-rendering:pixelated;max-height:100vh;object-fit:contain;}'+
		'#g{position:relative;margin:0 0 32px 0;font-weight:bold;}'+
		'#ts{position:absolute;inset:0;font-size:1.2vw;pointer-events:none;}'+
		'#msg{position:absolute;top:8vw;left:0;right:0;font-size:1.2vw;display:none;}'+
		'#a,#h{position:absolute;bottom:3%;left:20%;right:0;font-size:3.2vw;}'+
		'#h{left:-20%;}'+
		'#feed{position:absolute;right:12px;bottom:12px;max-width:46%;padding:6px 8px;background:#0008;border:2px solid #ffffff33;font-size:14px;text-align:right;color:#eee;text-shadow:2px 2px #000;line-height:1.35;}'+
		'#earn{position:absolute;right:12px;top:12px;padding:5px 8px;background:#0008;border:2px solid #ffffff33;font-size:18px;color:#fff;text-shadow:2px 2px #000;}'+
		'h1{position:absolute;bottom:11%;left:0;right:0;font-size:9vw;margin:0;}'+
		'#st{position:absolute;bottom:6%;left:0;right:0;}'+
		'#join,#cf{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#0008;z-index:3;}'+
		'#join form{width:min(420px,80vw);padding:24px;background:#666;border:4px solid #999;box-shadow:0 0 0 4px #333;color:#fff;text-align:left;}'+
		'#join h2{margin:0 0 16px;text-align:center;letter-spacing:2px;}'+
		'#join label{display:block;margin:12px 0 6px;font-size:12px;font-weight:bold;color:#ddd;letter-spacing:1px;}'+
		'#join input,#join button{box-sizing:border-box;width:100%;padding:12px;border:3px solid #999;background:#333;color:#fff;font-weight:bold;font-size:18px;}'+
		'#join button{margin-top:14px;background:#777;cursor:pointer;}'+
		'#join button:disabled{opacity:.55;cursor:wait;}'+
		'#join small{display:block;margin-top:10px;line-height:1.35;color:#eee;text-align:center;}'+
		'#join .qr{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:12px;}'+
		'#join .copy-invoice{width:100%;margin-top:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;text-align:left;}'+
		'#join .qr img{width:255px;height:255px;background:#fff;padding:8px;image-rendering:auto;}'+
		'#cf{pointer-events:none;background:transparent;overflow:hidden;}'+
		'#cf i{position:absolute;top:-12px;width:10px;height:18px;animation:fall 1.8s linear forwards;}'+
		'@keyframes fall{to{transform:translateY(110vh) rotate(520deg);opacity:.2;}}'+
	'</style>')+
	'<div id="g">'+
		'<canvas id=c width=320 height=180></canvas>'+
		'<div id="ts"><h1>LNQ1 ARENA</h1><div id="st">CLICK TO START</div></div>'+
		'<div id="h"></div><div id="a"></div>'+
		'<div id="msg"></div>'+
		'<div id="feed"></div><div id="earn"></div>'+
	'</div>';

let ui_player_name = '',
	ui_lnq1_mode = ui_is_lnq1,
	m = {value: 10},
	mi = {checked: false};

ui_show_join = (done) => {
	let join = document.createElement('div');
	join.id = 'join';
	join.innerHTML = window.LNQ1_MULTIPLAYER ? window.LNQ1_MULTIPLAYER.joinMarkup() : ui_lnq1_mode() ?
		'<form>'+
			'<h2>ENTER LN ADDRESS</h2>'+
			'<input id=jn name=lnAddress maxlength=320 autocomplete=off placeholder="you@nostr.com" required>'+
			'<button>SUBMIT</button>'+
			'<small id=js>Loading payment system...</small>'+
			'<div class=qr id=jqr></div>'+
		'</form>' :
		'<form>'+
			'<h2>ENTER CALLSIGN</h2>'+
			'<input id=jn maxlength=18 autocomplete=off placeholder="PLAYER" required>'+
			'<button>OKAY</button>'+
		'</form>';
	g.appendChild(join);
	let form = join.querySelector('form'),
		nameInput = join.querySelector('#jn'),
		status = join.querySelector('#js'),
		button = join.querySelector('button');
	nameInput.focus();
	join.onclick = (ev) => ev.stopPropagation();
	let submit = (ev) => {
		if (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		}
		if (button.disabled) return;
		ui_player_name = nameInput.value.trim();
		if (!ui_player_name) {
			nameInput.focus();
			return;
		}
		let finish = () => {
			join.remove();
			ui_confetti();
			done(ui_player_name);
		};
		if (status) status.textContent = 'Submitting...';
		if (window.LNQ1_MULTIPLAYER) {
			window.LNQ1_MULTIPLAYER.join(join, ui_player_name, finish);
		}
		else if (ui_lnq1_mode()) {
			if (status) status.textContent = 'Payment system is still loading. Refresh if this stays here.';
			nameInput.focus();
		}
		else {
			finish();
		}
	};
	form.addEventListener('submit', submit);
	button.addEventListener('click', submit);
	button.addEventListener('pointerup', submit);
	nameInput.addEventListener('keydown', (ev) => {
		if (ev.key == 'Enter') submit(ev);
	});
};

ui_confetti = () => {
	let cf = document.createElement('div'),
		colors = ['#f44','#4f6','#49f','#ff4','#f6f','#fff'];
	cf.id = 'cf';
	for (let i = 0; i < 70; i++) {
		let p = document.createElement('i');
		p.style.left = (Math.random() * 100) + '%';
		p.style.background = colors[i % colors.length];
		p.style.animationDelay = (Math.random() * 0.5) + 's';
		p.style.animationDuration = (1.2 + Math.random()) + 's';
		cf.appendChild(p);
	}
	g.appendChild(cf);
	setTimeout(() => cf.remove(), 2600);
};
