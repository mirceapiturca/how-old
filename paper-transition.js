window.paper = window.paper || (window.paper = {});

(function(scope) {
	
	var capabilities = scope.capabilities
	
	function aliased(propriety) {
		
		if (propriety === 'transform') {
			return capabilities.transform;
		}
		
		var i	= 0,
            str	= '',
			character;
        
		while (i <= propriety.length){
			
			character = propriety.charAt(i);
				
			if (!!/[A-Z]/.exec(character)) {
				str += '-' + character.toLowerCase();
			} else {
				str += character.toLowerCase();
			}
				
			i++;
		}
	
		return str;
	};
	
	
	function normalizeKeyFrames(options) {
		
		if (!options.easing) {
			options.easing = 'ease';
		}
		
		if (!options.delay) {
			options.delay = 0;
		}
	};
	
	function setKey(element, keyFrame) {
		
		for (var propriety in keyFrame) {
		//	console.log(999,aliased(propriety))
			element.style[aliased(propriety)] = keyFrame[propriety];
		}
	}
	
	function step(element, lastKey) {
		console.log(element, lastKey)
		element.style[capabilities.transition] = transition.join(',');
		setKey(element, lastKey);
	}
	
	function Animate(element, keyFrames, options) {
				
		if (capabilities.transition) {
			
			//	Set up a CSS transition
			normalizeKeyFrames(options);
			
			var transition	= [],
				lastKey		= keyFrames[1],
				propriety;
			
			for (propriety in lastKey) {
						
				var arr = [];
				arr.push(aliased(propriety));
				arr.push(options.duration + 'ms');
				arr.push(options.easing);
				arr.push(options.delay + 'ms');
				transition.push(arr.join(' '));
			}
			
			//	Set first key
			setKey(element, keyFrames[0]);
			
			requestAnimationFrame(function() {
				element.style[capabilities.transition] = transition.join(',');
				setKey(element, lastKey);
			});
		}
	};

	scope.transition = function(element, keyFrames, options) {

		var player = new Player();
		var anim = Animate(element, keyFrames, options);
		
		player.element = element;
		player._end = player.end.bind(player);

		element.addEventListener(capabilities.transitionEnd, player._end, false);
		
		return player;
	}
	
	var Player = function() {};
	
	Player.prototype = {
		
		end: function(e){
			
			e.stopPropagation()
			this.element.removeEventListener(capabilities.transitionEnd, this._end, false);
			
			//	Android 4.1 Stock Browser bug
			this.element.style[capabilities.transition] = 'none';
			this.element.style[capabilities.transition] = '';
			
			if (this._onfinish) {
				this._onfinish();
			}
		}
	}
	
	if (capabilities.transition) {

		Object.defineProperty(Player.prototype, 'onfinish', {
			get: function() {
				return this._onfinish;
			},
			set: function(v) {
				this._onfinish = v;
			}
		});
	}


})(paper);
