/*
ToDo

RC:
[ ] animaciones
[ ] sonido (html5 o por flash)

To make a Mileston Monday
Rebuild:
[X] mover todo el proyecto
[X] agregar bubbles a el side
[X] agregar bubbles al bubbleIsland.js
[X] agregar las imagenes dinamicamente dependiendo del tamaño
[x] agregar ui al juego
[x] probar css3 o cufon para las fuentes
[x] agregar explosion
[ ] empaquetar para celular
[ ] check explosion masiva
[x] arreglar animacion en freeze
[ ] check de posicionamiento
api:
[ ] finish softgameApi
[ ] integrate softgameApi with facebook, all functional
[ ] check api softgame
[ ] recheck facebook
[ ] check leaderboard

beta:
[b] un disparo por tiempo
[x] optimizar draw
[x] dibujar cañon
[x] facebook con hack
[x] poner cartel que diga "posiblemente se cierre la aplicación para validar su cuenta de facebook"
[-] mejorar parte de facebook
[-] leaderboard
[ ] agregar api de pago
[x] pelotitas
[x] animaciónes, oso y cosas...	
[-] agregar ui

alpha:
[-] ui
[x] interfaz de menu
[-] multiples resoluciones 
[x] puntuacion
[x] velocidad de caida variable
[x] diferentes niveles
[x] generar level random
[x] lvl que aumente linea de bubbles
[x] bubbles bajen lentamente
[x] linea de perdida variable
[x] bolas mas escurridisa (tener cierto margen de error para dejar pasar mas facil las pelotas entre otras)

pre-alpha:
[b] ubicar bola en grilla
[x] mostrar correctamente la grilla
[x] test de grilla por explosion de iguales
[x] test de grilla por huerfanos
[x] detectar colisiones
[x] disparar "derecho"
[x] bubbles de diferente color

referencia: 
[ ] por hacerse
[-] parcialmente resulto
[b] resuleto pero con errores
[x] resuelto, listo para probar
[X] resulto y testeado
[r] resuelto pero no anda como esperaba

*/


function rnd(top){ return Math.floor(Math.random()*(top + 1))};

touchMove = function(event) {
	// Prevent scrolling on this element
	event.preventDefault();
}

Array.prototype.remove = function(data) {
	//debug('called remover');
	i = 0; 
	found = false;
	while((i < this.length) && !found){
		if(this[i] == data){
			this.splice(i, 1);
			found = true;
		}else{
			i++;
		};
	};
};

/*Object.prototype.toString = function(){
	str = "";
	for(prop in this){
		if(typeof this[prop] == 'object'){
			str += prop + ':' + this[prop].toString();
		}else{
			str += prop + ':' + this[prop];
		};
		
	};
	return str;
}*/

//debug
var console;
function setDebugEnv(elem){
	console = '#' + elem;
};
function debug(txt){
	$(console).html("" + $(console).text() + txt + "<br>");
};
	

bubbleBlueImage = new Image();
bubbleRedImage = new Image();
bubbleGreenImage = new Image();
bubblePurpleImage = new Image();
bubbleYellowImage = new Image();

bubbleBlueBombImage = new Image();
bubbleRedBombImage = new Image();
bubbleGreenBombImage = new Image();
bubblePurpleBombImage = new Image();
bubbleYellowBombImage = new Image();

bubbleBlueHalfImage = new Image();
bubbleRedHalfImage = new Image();
bubbleGreenHalfImage = new Image();
bubblePurpleHalfImage = new Image();
bubbleYellowHalfImage = new Image();

bubbleBlueFreezeImage = new Image();
bubbleRedFreezeImage = new Image();
bubbleGreenFreezeImage = new Image();
bubblePurpleFreezeImage = new Image();
bubbleYellowFreezeImage = new Image();

bubbleBlueImageX2 = new Image();
bubbleRedImageX2 = new Image();
bubbleGreenImageX2 = new Image();
bubblePurpleImageX2 = new Image();
bubbleYellowImageX2 = new Image();

bubbleBlueImageX3 = new Image();
bubbleRedImageX3 = new Image();
bubbleGreenImageX3 = new Image();
bubblePurpleImageX3 = new Image();
bubbleYellowImageX3 = new Image();

bubbleExplode = new Image();
bubbleEstela = new Image();

lvlFrame = new Image();
backgroundImage = new Image();
initImage = new Image();
logoImage = new Image();
pandaBearAnim = new Image();
uiPanda = new Image();
uiLevelFrame = new Image();
uiLifeFrame = new Image();
uiPointsFrame = new Image();
uiLooseFrame = new Image();
uiWinFrame = new Image();
uiCannon = new Image();
uiOptionButton = new Image();
uiNewButton = new Image();
uiContinueButton = new Image();
uiBackButton = new Image();

	/*var bubbleBlueImage;
var bubbleRedImage; 
var bubbleGreenImage;
var bubblePurpleImage;
var bubbleYellowImage;

var bubbleBlueBombImage;
var bubbleRedBombImage; 
var bubbleGreenBombImage;
var bubblePurpleBombImage;
var bubbleYellowBombImage;

var bubbleBlueFreezeImage;
var bubbleRedFreezeImage; 
var bubbleGreenFreezeImage;
var bubblePurpleFreezeImage;
var bubbleYellowFreezeImage;

var bubbleBlueHalfImage;
var bubbleRedHalfImage; 
var bubbleGreenHalfImage;
var bubblePurpleHalfImage;
var bubbleYellowHalfImage;

var bubbleBlueImageX2;
var bubbleRedImageX2; 
var bubbleGreenImageX2;
var bubblePurpleImageX2;
var bubbleYellowImageX2;

var bubbleBlueImageX3;
var bubbleRedImageX3; 
var bubbleGreenImageX3;
var bubblePurpleImageX3;
var bubbleYellowImageX3;

var lvlFrame;
var initImage;
var backgroundImage;
var logoImage;
var pandaBearAnim;
var uiPanda;
var uiLevelFrame
var uiLifeFrame
var uiPointsFrame;
var uiLooseFrame;
var uiWinFrame;
var uiCannon;
var uiOptionButton
var uiNewButton
var uiContinueButton;
var uiBackButton;*/


var game;
var frameBuffer;
var animNav;
var fps = 24;
var pointExplode = 10;
var pointDrop = 5;
var min_vel = .1;
var freezeTime = 10 //en segundos


APPID = '213255638692367';
APPKEY = '230bd48e2d38a991fe41e284887db3d8';

//var performance;

function bubble(l){
	// flavors = blue, red, purple, yellow
	/*this.element = document.createElement('img');
	this.element.style.minHeight = l.bubbleRadius + 'px';
	this.element.style.minWidth = l.bubbleRadius + 'px';
	this.element.style.position = 'absolute';*/
	this.lvl = l;
	this.flavor = "nula";
	this.marked = false;
	this.i = -1; //position in the array
	this.j = -1;//position in the array
	this.x = -1; //position in the canvas
	this.y = -1; //position in the canvas
	this.dx = 0; //incremental in the x direction
	this.dy = 0; //incremental in the x direction
	this.meinBild = new Image();
	this.object;
	//this.meinBild.src = 'bubble.png';
	
	this.secondFlavor = '';
	this.freezeBall = false;
	this.bombBall = false;
	this.pointsMultiplier = 1;
	
	this.makeItRandomNormal = function(){
		this.flavor = this.randomFlavor();
		this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
		this.element = this.object.element;
		this.object.fitNormalImage();
	};
	
	this.makeItRandom = function(){
		var value = rnd(30);
		switch(value){
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
				this.flavor = this.randomFlavor();
				this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;
				break;
			case 27:
				var second = rnd(1);
				if(second == 0){
					this.pointsMultiplier = 2;
					this.flavor = this.randomX2Flavor();
				}else{
					this.pointsMultiplier = 3;
					this.flavor = this.randomX3Flavor();
				};				
				this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;				
				break;
			case 28:
				this.flavor = this.randomFreezeFlavor();
				this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;
				this.freezeBall = true;
				break;
			case 29:
				this.flavor = this.randomFlavor();
				this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;
				do{
					this.secondFlavor = this.randomFlavor();
				}while(this.flavor == this.secondFlavor);
				var zweithBild = document.createElement('img');				
				switch(this.secondFlavor){
					case 'blue':
						zweithBild.src = bubbleBlueHalfImage.src;
						break;
					case 'green':
						zweithBild.src = bubbleGreenHalfImage.src;
						break;
					case 'red':
						zweithBild.src = bubbleRedHalfImage.src;
						break;
					case 'purple':
						zweithBild.src = bubblePurpleHalfImage.src;
						break;
					case 'yellow':
						zweithBild.src = bubbleYellowHalfImage.src;
						break;
				};
				this.object.element.appendChild(zweithBild);
				zweithBild.style.width = this.lvl.bubbleRadius + 'px';
				zweithBild.style.heigth = (this.lvl.bubbleRadius / 2) + 'px';
				zweithBild.style.position = 'absolute';
				zweithBild.style.top = '0px';
				zweithBild.style.left = '0px';
				break;
			case 30:
				this.flavor = this.randomBombFlavor();
				this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;
				this.bombBall = true;
				//alert('bombBall!!');
				break;
		};	
		this.object.fitNormalImage();
		this.object.addState('estela', bubbleEstela.src, 5);
		this.object.addState('explode', bubbleExplode.src, 7);
		this.element.style.overflow = 'show';

	};
	
	this.randomFlavor = function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "blue"; 
				this.meinBild = bubbleBlueImage;
				break;
			case 1:
				flavor = "yellow"; 
				this.meinBild = bubbleYellowImage;
				break;
			case 2:
				flavor = "purple"; 
				this.meinBild = bubblePurpleImage;
				break;
			case 3:
				flavor = "red"; 
				this.meinBild = bubbleRedImage;
				break;
			case 4:
				flavor = "green";
				this.meinBild = bubbleGreenImage;
				break;
		};
		return flavor;
	};	
	
	this.randomFreezeFlavor = function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "blue"; 
				this.meinBild = bubbleBlueFreezeImage;
				break;
			case 1:
				flavor = "yellow"; 
				this.meinBild = bubbleYellowFreezeImage;
				break;
			case 2:
				flavor = "purple"; 
				this.meinBild = bubblePurpleFreezeImage;
				break;
			case 3:
				flavor = "red"; 
				this.meinBild = bubbleRedFreezeImage;
				break;
			case 4:
				flavor = "green";
				this.meinBild = bubbleGreenFreezeImage;
				break;
		};
		return flavor;
	};

	this.randomBombFlavor = function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "blue"; 
				this.meinBild = bubbleBlueBombImage;
				break;
			case 1:
				flavor = "yellow"; 
				this.meinBild = bubbleYellowBombImage;
				break;
			case 2:
				flavor = "purple"; 
				this.meinBild = bubblePurpleBombImage;
				break;
			case 3:
				flavor = "red"; 
				this.meinBild = bubbleRedBombImage;
				break;
			case 4:
				flavor = "green";
				this.meinBild = bubbleGreenBombImage;
				break;
		};
		return flavor;
	};

	this.randomX2Flavor = function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "blue"; 
				this.meinBild = bubbleBlueImageX2;
				break;
			case 1:
				flavor = "yellow"; 
				this.meinBild = bubbleYellowImageX2;
				break;
			case 2:
				flavor = "purple"; 
				this.meinBild = bubblePurpleImageX2;
				break;
			case 3:
				flavor = "red"; 
				this.meinBild = bubbleRedImageX2;
				break;
			case 4:
				flavor = "green";
				this.meinBild = bubbleGreenImageX2;
				break;
		};
		return flavor;
	};

	this.randomX3Flavor= function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "blue"; 
				this.meinBild = bubbleBlueImageX3;
				break;
			case 1:
				flavor = "yellow"; 
				this.meinBild = bubbleYellowImageX3;
				break;
			case 2:
				flavor = "purple"; 
				this.meinBild = bubblePurpleImageX3;
				break;
			case 3:
				flavor = "red"; 
				this.meinBild = bubbleRedImageX3;
				break;
			case 4:
				flavor = "green";
				this.meinBild = bubbleGreenImageX3;
				break;
		};
		return flavor;
	};
	
	this.move = function(){
		if((this.dx == 0) && (this.dy == 0)) return;
		this.x += this.dx;
		this.y += this.dy;
		if(this.x <= this.lvl.leftBound) this.x = this.lvl.leftBound;
		//if(this.x > this.lvl.width) this.x = this.lvl.width;
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';
		/*$(this.element).animate({
			top: this.y + 'px',
			left: this.x + 'px'
		}, 42);*/
		if((this.x == this.lvl.leftBound) || (this.x >= this.lvl.width)) this.dx = -this.dx;
		if(this.y <= this.lvl.topBound) this.stopMove();
	};
	
	this.moveShooted = function(){
		if((this.dx == 0) && (this.dy == 0)) return;
		this.x += this.dx;
		this.y += this.dy;
		if(this.x <= this.lvl.leftBound) this.x = this.lvl.leftBound;
		if(this.x > this.lvl.width) this.x = this.lvl.width;
		/*$(this.element).animate({
			top: this.y + 'px',
			left: this.x + 'px'
		}, 10)*/
		var ddx = this.dx;
		var ddy = this.dy;
		var s = this.element.style;
		/*
		while((ddx != 0) || (ddy != 0)){
			s.top = (this.y - ddy) + 'px';
			s.left = (this.x - ddx) + 'px';

			ddx -= 1;
			ddy -= 1;
			if(ddx < 0) ddx = 0;
			if(ddy < 0) ddy = 0;
		};
		
		while(ddx > 0){ while(ddy > 0){ this.element.style.top = (this.y - (ddy--)) + 'px'}; this.element.style.left = (this.x - (ddx--)) + 'px'};

		while(ddy > 0){ while(ddx > 0){ this.element.style.left = (this.x - (ddx--)) + 'px' }; this.element.style.top = (this.y - (ddy--)) + 'px'};
		*/
		if((this.x == this.lvl.leftBound) || (this.x == this.lvl.width)) this.dx = -this.dx;
		if(this.y <= this.lvl.topBound) this.stopMove();
	};
	
	this.draw = function(painter){
		//hacer calculos
		//painter.drawImage(this.meinBild, Math.floor(this.x), Math.floor(this.y), this.lvl.bubbleRadius, this.lvl.bubbleRadius);
		painter.drawImage(this.meinBild, this.x, this.y, this.lvl.bubbleRadius, this.lvl.bubbleRadius);
		//painter.drawImage(this.meinBild, this.x, this.y);
		//painter.drawImage(this.meinBild, this.x, this.y, 28, 28);
	};
	
	this.stopMove = function(){
		//back off
		//this.x = this.x - (this.dx / 2);
		//this.y = this.y - (this.dy / 2);
		//stop moving
		this.dx = 0;
		this.dy = 0;
		return; 
	};
	
	this.equalBubble = function(bubble){
		var equal = (bubble.flavor == this.flavor);
		if(bubble.secondFlavor != ''){
			equal = equal || (bubble.secondFlavor == this.flavor);		
		};
		if(this.secondFlavor != ''){
			equal = equal || (this.secondFlavor == bubble.flavor);		
		};
		if(this.secondFlavor != ''){
			equal = equal || (this.secondFlavor == bubble.secondFlavor);		
		};
		return equal;
	};
	
	this.recalcXY = function(){
		h = Math.sqrt((this.lvl.bubbleRadius*this.lvl.bubbleRadius) - ((this.lvl.bubbleRadius / 2) * (this.lvl.bubbleRadius / 2)));
		delta = this.lvl.grilla.isShortRow(this.i) * (this.lvl.bubbleRadius / 2);
		this.x = this.j * (this.lvl.bubbleRadius) + delta;
		//this.y = ((this.lvl.grilla.alto - this.i) * h);
		this.y = (this.i * h);
		this.x += this.lvl.leftBound;
		this.y += this.lvl.topBound;
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';
		//alert(this.x + ' : ' + this.y);*/
	};

	this.recalcXYfrom = function(thisBubble){
		this.recalcXY();
		h = Math.sqrt((this.lvl.bubbleRadius*this.lvl.bubbleRadius) - ((this.lvl.bubbleRadius / 2) * (this.lvl.bubbleRadius / 2)));
		y = (thisBubble.i * h) + this.lvl.topBound;
		this.y += thisBubble.y - y; 
		this.y = Math.floor(this.y);
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';
	};
	
	this.isMoving = function(){
		//debug(((this.dx == 0) && (this.dy == 0)));
		return ((this.dx != 0) || (this.dy) != 0);
	};

	this.explode = function(){
		//do explode animation and remove element
		//this.object.animationEnds = this.removeBubble;
		
		var anim = new Animation(7, bubbleExplode.width / 7, bubbleExplode.height, bubbleExplode.src);
		anim.element.style.position = 'absolute';
		anim.element.style.top = this.y + 'px';
		anim.element.style.left = this.x + 'px';
		anim.animationEnd = function(){};
		animNav.append(anim.element);
		$(this.element).remove();
		this.lvl.animations.push(anim);
	};
};

function bubbleCannon(lvl){
	this.lvl = lvl;
	this.currentBubble;/* = new bubble(this.lvl);
	this.currentBubble.makeItRandom();*/
	this.readyShoot = false;
	this.object = new standAnimation(uiCannon.width, uiCannon.height, uiCannon.src);
	this.element = this.object.element;
	this.object.setXY(((this.lvl.width - uiCannon.width) / 2) + this.lvl.leftBound, (this.lvl.height - uiCannon.height) + this.lvl.topBound + 4);
	/*style.top = this.lvl.height - cannonImage.height;
	style.left = (this.lvl.width - cannonImage.width) / 2;*/
	
	this.shoot = function(x, y){
	//function shoot(x, y){
		/*vecx = -((lvl.width / 2) - (x - this.lvl.left));
		vecy = lvl.height - (y - this.lvl.top);*/
		if(!this.readyShoot) return;
		vecx = (x - this.lvl.left) - (this.currentBubble.x  + (this.lvl.bubbleRadius / 2));
		vecy = (y - this.lvl.top) - (this.currentBubble.y + (this.lvl.bubbleRadius / 2));
		
		hip = Math.sqrt(vecx*vecx+vecy*vecy);
		//alert(vecx + ' : '+ vecy);
		//debug('versor: ' + vecx + ' : '+ vecy + ' h: ' + hip);
		//debug('offset: ' + this.lvl.top + ' : ' + this.lvl.left);
		//debug('offset: ' + x + ' : ' + y);
		//alert(this.lvl.left + ' : ' + this.lvl.top);
		//ang = Math.atan(Math.abs(vecy/vecx));
		//alert(ang);
		velocity = 27; //--------------------------------------------------------------------------------------------------------------------velocidad bola, const
		this.currentBubble.dx = velocity * (vecx/hip);//Math.cos(ang);
		this.currentBubble.dy = velocity * (vecy/hip);//;/Math.sin(ang);
		//this.lvl.addBubble(this.currentBubble);
		this.lvl.setShootedBubble(this.currentBubble);	
		this.currentBubble = null;
	};
	
	this.setReadyShoot = function(){
		this.currentBubble = new bubble(this.lvl);
		this.currentBubble.makeItRandom();
		this.currentBubble.x = ((lvl.width / 2) - (this.lvl.bubbleRadius / 2)) + this.lvl.leftBound;
		this.currentBubble.y = (lvl.height - lvl.bubbleRadius) + this.lvl.topBound;
		this.currentBubble.y -= 5;
		this.currentBubble.element.style.top = this.currentBubble.y + 'px';
		this.currentBubble.element.style.left = this.currentBubble.x + 'px';
		animNav.append(this.currentBubble.element);
		this.readyShoot = true;
	};

};

function bubbleTable(ancho, alto, lvl){
	// 15 x 10 pelotitas
	
	// Init
	this.lvl = lvl
	this.alto = alto;
	this.ancho = ancho;
	this.Table = new Array(this.alto);
	for(i = 0; i < this.alto; ++i){
		this.Table[i] = new Array(this.ancho);
	};
	for(i = 0; i < this.alto; ++i){
		for(j = 0; j < this.ancho; ++j){
			//alert('i:'+i+' j:'+j);
			this.Table[i][j] = "vacio";
		};
	};
	
	for(i = 0; i < this.alto; ++i){		
		if((i % 2) == 0){
			this.Table[i][this.ancho - 1] = "nada";
		};
	};
	
	this.touchedBubbles = new Array();

	this.exploded = 0;
	
	
	this.retrieveBubble = function(i, j){
		//debug('  retrieve Bubble i:' + i + ' j:' + j);
		if((i >= this.alto)) return new bubble(this.lvl);
		if((j >= this.ancho) || (j < 0)) return new bubble(this.lvl);
		if(i < 0){
			var b = new bubble(this.lvl);
			b.flavor = "techo";
			return b;
		};
		if(this.isShortRow(i) && j == this.ancho) return new bubble(this.lvl);
		return this.Table[i][j];
	};
	
	this.isShortRow = function(i){
		//debug(this.Table[i][this.ancho - 1]);
		if(this.Table[i][this.ancho - 1] == "nada"){
			return 1;
		}else{
			return 0;
		};
	};
	
	this.addBubble = function(bubble, collided){
		//debug(' addBubble i: ' + bubble.i + 'j: ' + bubble.j);
		//alert(collided);
		bubble.object.setCurrentState('');

		/*var radius = this.lvl.bubbleRadius / 2;
		var halfradius = radius / 2;
		bubble.x -= bubble.dx / 2;
		bubble.y -= bubble.dy / 2;
		/*bubble.x -= bubble.dx;
		bubble.y -= bubble.dy;
		var dx = 0;
		var dy = 0;
		var deltax = collided.x - bubble.x;
		var deltay = collided.y - bubble.y;
		var isShort = this.isShortRow(collided.i);
		if(isShort){
			if(deltax > halfradius) dx = 0;
			if(deltax < -halfradius) dx = 1;
		}else{
			if(deltax > halfradius) dx = -1;
			if(deltax < -halfradius) dx = 0;
		};

		if(deltay > -halfradius) dy = -1;
		if(deltay < halfradius) dy = 1;
		if((dx == 0)&&(dy == 0)){			
			dx = (isShort ? 1 : -1);
			alert('corrimiento nulo, nuevo dx: ' + dx)
		};*/


		var radius = this.lvl.bubbleRadius / 2;
		var halfradius = this.lvl.bubbleRadius / 3;


		disx = Math.abs((bubble.x + radius) - ( collided.x + radius));
		disy = Math.abs((bubble.y + radius) - ( collided.y + radius));
			
		distance = Math.sqrt(disx * disx + disy * disy);
		if(distance < radius){
			bubble.x -= bubble.dx;
			bubble.y -= bubble.dy;
		};

		var deltax = (collided.x + radius) - (bubble.x + radius);
		var deltay = (collided.y + radius) - (bubble.y + radius);

		var isShort = this.isShortRow(collided.i); 
		var dx = 0;
		var dy = 0;
		/*bubble.x -= (bubble.dx / bubble.dx) * (this.lvl.bubbleRadius / 2);
		bubble.y -= (bubble.dy/bubble.dy) * (this.lvl.bubbleRadius / 2);*/

		if(deltay > -(halfradius / 2)) dy = -1;
		if(deltay < (halfradius / 2)) dy = 1;
		if(dy == 0){
			if(deltax >= 0) dx = -1;
			if(deltax < 0) dx = 1;
		}else{
			if(isShort){
				if(deltax > 0) dx = 0;
				if(deltax < 0) dx = 1;
			}else{
				if(deltax > 0) dx = -1;
				if(deltax < 0) dx = 0;
			};
		};

		//debug(dx +':'+ dy + '; &nbsp;');

		bubble.i = collided.i + dy;
		bubble.j = collided.j + dx;

		this.Table[bubble.i][bubble.j] = bubble;
		bubble.recalcXYfrom(collided);

		c = this.checkForCompatibility(bubble, bubble);
		//debug('    c   :' + c + '   ');
		this.lvl.mutex = true;
		if(c >= 3){				
			//alert(c);
			var mult = bubble.pointsMultiplier;
			this.lvl.pointsMultiplier =  c * c * pointExplode * mult;
			//alert(this.lvl.pointsMultiplier);
			this.exploded = c;
			this.explodeMarked();			
			this.lvl.addPoints();
			this.lvl.pointsMultiplier = pointDrop * mult;
			this.checkForOrphans();
		}else{				
			this.clearMarks();
		};
		this.touchedBubbles = new Array();
		this.lvl.setReadyShoot();
		
	};
	
	
	this.checkForCompatibility = function(toCheck, flavor){
		//chequeo si donde cayo, puede explotar algunas
		//if(this.retrieveBubble(i-1, j).)
		//toCheck = bubble//this.retrieveBubble(i,j);
		if(toCheck == "nada" || toCheck == "vacio") return 0;
		if(toCheck.flavor == "nula" ||toCheck.flavor == "techo") return 0;
		if(toCheck.marked) return 0;
		this.touchedBubbles.push(toCheck);
		toCheck.marked = true;
		//debug('&nbsp;  tocheck: ' + toCheck.flavor + ' &nbsp; flavor:' + flavor + ' &nbsp; i: ' + toCheck.i+ ':'+toCheck.j+ '<br>');
		if(flavor.equalBubble(toCheck)){
			c = 1;
			//debug('toCheck')			
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i, toCheck.j + 1), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i, toCheck.j - 1), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j), flavor);
			if(!this.isShortRow(toCheck.i)){
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j - 1), flavor);
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j - 1), flavor);	
			}else{
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j + 1), flavor);
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j + 1), flavor);
			};
			return c;
		}else{
			toCheck.marked = false;
			return 0;
		};
		
	};
	
	/*this.checkForCompatibility = function(toCheck, flavor){
		//chequeo si donde cayo, puede explotar algunas
		//if(this.retrieveBubble(i-1, j).)
		//toCheck = bubble//this.retrieveBubble(i,j);
		if(toCheck == "nada" || toCheck == "vacio") return 0;
		if(toCheck.flavor == "nula") return 0;
		if(toCheck.marked) return 0;
		this.touchedBubbles.push(toCheck);
		toCheck.marked = true;
		//debug('&nbsp;  tocheck: ' + toCheck.flavor + ' &nbsp; flavor:' + flavor + ' &nbsp; i: ' + toCheck.i+ ':'+toCheck.j+ '<br>');
		if(toCheck.flavor == flavor){
			c = 1;
			//debug('toCheck')			
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i, toCheck.j + 1), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i, toCheck.j - 1), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j), flavor);
			if(!this.isShortRow(toCheck.i)){
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j - 1), flavor);
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j - 1), flavor);	
			}else{
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j + 1), flavor);
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j + 1), flavor);
			};
			return c;
		}else{
			toCheck.marked = false;
			return 0;
		};
		
	};*/
	
	this.checkNeighbours = function(bubble){
		//check de caidas
		//debug(bubble);
		if(bubble == "nada" || bubble == "vacio") return true;
		//if(bubble.flavor == "nula") return false;
		if(bubble.flavor == "nula") return true;
		if(bubble.flavor == "techo") return false;
		if(bubble.marked) return true;
		
		bubble.marked = true;
		c = true;
		c = c && this.checkNeighbours(this.retrieveBubble(bubble.i, bubble.j + 1));
		c = c && this.checkNeighbours(this.retrieveBubble(bubble.i, bubble.j - 1));
		c = c && this.checkNeighbours(this.retrieveBubble(bubble.i - 1, bubble.j));
		c = c && this.checkNeighbours(this.retrieveBubble(bubble.i + 1, bubble.j));
		if(!this.isShortRow(bubble.i)){
			c = c && this.checkNeighbours(this.retrieveBubble(bubble.i + 1, bubble.j - 1));
			c = c && this.checkNeighbours(this.retrieveBubble(bubble.i - 1, bubble.j - 1));
		}else{
			c = c && this.checkNeighbours(this.retrieveBubble(bubble.i + 1, bubble.j + 1));
			c = c && this.checkNeighbours(this.retrieveBubble(bubble.i - 1, bubble.j + 1));
		};
		bubble.marked = c;
		return c;
	};
	
	this.checkForOrphans = function(){
		//cheque si hay alguno que se cae
		//mientras tenga bubbles por chequear
		//debug(this.touchedBubbles);
		while(this.touchedBubbles.length > 0){
			toCheck = this.touchedBubbles.shift();
			if(this.checkNeighbours(toCheck)){				
				this.explodeMarked(); // <------------- por ahora, cambiar a drop de las bolitas
				this.lvl.pointsMultiplier = this.exploded * 10;
				this.lvl.addPoints();
			}else{
				this.clearMarks();
			};
		};
	}
	
	this.explodeMarked = function(){
		//bubbles marked as exploded, explode
		//debug( ' explode!!!  ' + this.alto + ':' + this.ancho );
		for(var i = 0; i < this.alto; ++i){
			for(var j = 0; j < this.ancho; ++j){
				b = this.Table[i][j];
				if((b != "nada") && (b != "vacio")){					
					if(b.marked){
						if(b.freezeBall) this.lvl.freezeMovement();
						if(b.bombBall){
							this.lvl.detonateBomb(b, 3);
							this.explodeMarked();
						};
						this.lvl.removeBubble(b);						
						this.Table[i][j] = "vacio";
						this.touchedBubbles.remove(b);
					};
				}; 
			};
		};
	};
	
	this.clearMarks  = function(){
		for(i = 0; i < this.alto; ++i){
			for(j = 0; j < this.ancho; ++j){
				//alert('i:'+i+' j:'+j);
				//alert(i + ':' + j);
				//if((this.Table[i][j] != "nada") || (this.Table[i][j] != "vacio")){					
				if((this.Table[i][j] != "nada") && (this.Table[i][j] != "vacio")){					
					b = this.Table[i][j];
					b.marked = false;
				}; 
			};
		};
	};
	
	this.returnLowest = function(){
			var i = this.alto - 1;
			var j = 0;
			var salir = false;
			var result;
			while(!salir && i > -1){
				result = this.Table[i][j];
				if(result != "nada" && result != "vacio"){
					salir = true;
				}else{
					j++;
					if(j == this.ancho){
						i--;
						j = 0;
					};
				};
			};
			
			return result;
		};
}

function bubbleLevel(w, h, bubblesWidth, bubblesHeight, lvlnbr){
	this.grilla = new bubbleTable(bubblesWidth, bubblesHeight, this);
	this.cannon;
	this.width = w;
	this.height = h;
	this.top;
	this.left;
	this.lvlnro = lvlnbr;
	this.topBound;
	this.leftBound;

	this.animations = new Array();
	
	
	this.mutex = false;
	this.freeze = false;
	this.finished = false;
	this.freezeTimeout = 0;
	this.bubbleRadius = this.width / bubblesWidth;
	this.shootedBubble = null;
	this.bubbles_array = new Array();
	this.points = 0;
	this.pointsToReach = 1000 * this.lvlnro * 2;
	this.pointsMultiplier = 0;
	this.looseLine = this.height - this.bubbleRadius;
	this.h = Math.sqrt((this.bubbleRadius*this.bubbleRadius) - ((this.bubbleRadius / 2) * (this.bubbleRadius / 2)));
	this.bonus = .2 * this.lvlnro;

	this.character = new standAnimation(uiPanda.height, uiPanda.width, uiPanda.src, game.clock);
	this.character.setXY((w / 2), (game.canvas.height - uiPanda.height) - 7 );
	this.character.addState('load', pandaBearAnim.src, 22);
	animNav.append(this.character.element);
	
	//alert(this.pointsToReach);
	//this.fallvelocity = 0.2; //balls per seccond
	//this.bubbleVelocity = (this.bubbleRadius) * (this.fallvelocity / fps);
	this.bubbleVelocity = min_vel * ( this.lvlnro / 500 + 1);
	//this.fallvelocity = Math.round(this.bubbleRadius / this.bubbleVelocity);
	this.fallvelocity = Math.round(this.h / this.bubbleVelocity);
	/*alert(this.bubbleRadius / this.bubbleVelocity);
	alert(this.fallvelocity);*/
	this.fpscount = 0;
	
	this.moveBalls = function(){
		//debug('length: ' + this.bubbles_array.length);
		if(this.finished) return;
		for(i = 0; i < this.animations.length; ++i){
			this.animations[i].render();
			if(this.animations[i].tick > this.animations[i].duration){
				$(this.animations[i].element).remove();
				this.animations.remove(this.animations[i]);
			};
		};
		this.checkColisions();
		//check for freeze;
		if(this.freezeTimeout == 0){
			this.freeze = false;
		}else{
			this.freezeTimeout--;
		};
		if(this.freeze) return;

		//performance.check('move balls');
		this.fpscount++;
		//this.fpscount = Math.round(this.fpscount % (fps / this.fallvelocity));
		this.fpscount = Math.round(this.fpscount %  this.fallvelocity);

		if(this.fpscount == 0) this.addRandomRow();

		for(i = 0; i < this.bubbles_array.length; ++i){
			this.bubbles_array[i].move();
		};

		//performance.check('move balls');
		var masBaja = this.grilla.returnLowest();
		/*alert(this.looseLine);*/
		//alert(masBaja.y + this.bubbleRadius);
		if(masBaja.y + this.bubbleRadius > this.looseLine){
			//alert('perdiste');
			/*alert(this.looseLine);
			alert(masBaja.x + this.bubbleRadius);*/
			this.freeze = true;
			this.finished = true;
			this.loose();
		};
		//si esta ocupado, evitar movimiento (normalmente no se mueve, solo evita check de mas)
		if(this.mutex == true){
			//debug("MUTED!");
			return;
		};

	};

	this.checkColisions = function(){
		//check colisions
		//performance.check('colisiones');
		if(this.shootedBubble == null){
			//performance.check('colisiones');
			return;	
		} 
		this.shootedBubble.move();
		var collisions = new Array();

		for(i = 0; i < this.bubbles_array.length; ++i){			
			currentBubble = this.bubbles_array[i];
			// check radius
			disx = Math.abs((currentBubble.x + this.bubbleRadius / 2) - (this.shootedBubble.x + this.bubbleRadius / 2));
			disy = Math.abs((currentBubble.y + this.bubbleRadius / 2) - (this.shootedBubble.y + this.bubbleRadius / 2));
			//debug(disx + ':' + disy);
			
			distance = Math.sqrt(disx * disx + disy * disy);
			if(distance < (this.bubbleRadius *.9)){
				//debug('COLLITION');				
				//this.bubbles_array.push(this.shootedBubble);	
				collisions.push({ bubble: currentBubble, dis: distance});
				
				//alert(this.points);
				//break;
			};
		};
		if(collisions.length > 0){
			//debug(' &nbsp; length: ' + collisions.length);
			this.mutex=true;			
			this.shootedBubble.stopMove();
			this.addBubble(this.shootedBubble);
			this.shootedBubble.dy = this.bubbleVelocity;
			//alert(currentBubble + ' before shoot');
			currentBubble = collisions[0];
			for(var i = 1; i < collisions.length; ++i){
				if(currentBubble.dis > collisions[i].dis) currentBubble = collisions[i];
			};
			//(bubble, collided)
			this.grilla.addBubble(this.shootedBubble, currentBubble.bubble);				
			this.shootedBubble = null;
			this.mutex = false;
		};
		if(this.points >= this.pointsToReach){
			this.freeze = true;
			this.finished = true;
			this.win();
		};
		//performance.check('colisiones');

		//si la pelota disparada llego al techo y freno sola
		//debug(this.shootedBubble.isMoving());
		if(this.shootedBubble == null) return;
		if(!this.shootedBubble.isMoving()){			
			//debug('stop moving');
			this.bubbles_array.push(this.shootedBubble);
			this.shootedBubble = null;
		};
	};
	
	this.setShootedBubble = function(bubble){
		this.shootedBubble = bubble;
		this.character.setCurrentState('load');
		this.shootedBubble.object.setCurrentState('estela', true);
		this.shootedBubble.object.baseElement.style.display = 'block';
		//this.shootedBubble.object.animationEnds = function(){ this.setCurrentState('estela'); }
	}
	
	this.drawBalls = function(painter){
		//alert(painter);
		//if((this.bubbles_array.length) != 0) alert(this.bubbles_array.length);
		//performance.check('draw balls');
		for(i = 0; i < this.bubbles_array.length; ++i){
			//draw each ball
			this.bubbles_array[i].draw(painter);
			//setTimeout('game.level.bubbles_array['+i+'].draw(frameBuffer)', 1);
		};

		//performance.check('draw balls');
		if(this.shootedBubble != null) this.shootedBubble.draw(painter);
	};
	
	this.drawLevel = function(){
		this.character.render();	
		if(this.shootedBubble != undefined) this.shootedBubble.object.render();
	};
	
	this.addBubble = function(b){
		this.bubbles_array.push(b);	
	};
	
	this.removeBubble = function(b){
		//debug('called remover');
		//debug(b.i + ':' + b.j);
		for(var i = 0; i < this.bubbles_array.length; ++i){
			//debug(' bubble : ' + this.bubbles_array[i].i +':'+this.bubbles_array[i].j);
			if((this.bubbles_array[i].i == b.i) && (this.bubbles_array[i].j == b.j)){
				this.bubbles_array.splice(i, 1);				
				//debug('removed ' + b.toString());
			};
		};
		//$(b.element).remove();
		if(b != 'nada' && b != 'vacio' && b != 'techo') b.explode();
	};
	
	this.setReadyShoot = function(){
		this.mutex = false;
		this.cannon.setReadyShoot();
	};

	this.addPoints = function(){
		//alert('add points: ' + this.pointsMultiplier);
		this.points += this.pointsMultiplier;	
		
	};

	this.makeMeRandom = function(alto){		
		//for(i = (this.grilla.alto - alto); i < this.grilla.alto; ++i){
		for(i = 0; i < alto; ++i){
			isShort = this.grilla.isShortRow(i);
			for(j = 0; j < this.grilla.ancho; ++j){
				if((j == this.grilla.ancho - 1) && isShort) continue;
				b = new bubble(this);
				//b.makeItRandom();
				//b.flavor = b.randomFlavor();
				b.makeItRandomNormal();
				b.i = i;
				b.j = j;
				b.dy = this.bubbleVelocity;
				this.grilla.Table[i][j] = b;
				b.recalcXY();				
				this.addBubble(b);
				animNav.append(b.element);
			};
		};
	};
	
	this.addRandomRow = function(){
		//re do
		//alert("newrow");
		ancho = this.grilla.ancho;
		newrow = new Array(ancho);
		if(!this.grilla.isShortRow(0)){ 
			ancho--;
			newrow[ancho] = "nada"; 
		};	
		this.grilla.alto = this.grilla.Table.unshift(newrow);

		for(var i = 0; i < this.bubbles_array.length; ++i){			
			this.bubbles_array[i].i += 1;
		};

		for(i = 0; i < ancho; ++i){
			//alert(i);
			b = new bubble(this);
			//b.makeItRandom();
			//b.flavor = b.randomFlavor();
			b.makeItRandomNormal();
			b.i = 0;
			b.j = i;
			b.dy = this.bubbleVelocity;
			b.recalcXY();
			newrow[i] = b;
			this.addBubble(b);
			animNav.append(b.element);
		};				
	};
	
	this.clearBoard = function(){
		for(var i = 0; i < this.bubbles_array.length; ++i){
			var b = this.bubbles_array[i];
			b.stopMove();
			$(b.element).remove();
		};
		for(var i = 0; i < this.animations.length; ++i){
			var b = this.animations[i];
			$(b.element).remove();
		};
		$(this.character.element).remove();
		$(this.cannon.element).remove();
		if(this.cannon.currentBubble != null) $(this.cannon.currentBubble.element).remove();
		if(this.shootedBubble != null) $(this.shootedBubble.element).remove();
	};
	
	this.freezeMovement = function(){
		this.freeze = true;
		this.freezeTimeout = fps * freezeTime;
	};
	
	this.detonateBomb = function(detonated, neighbour){
		//alert(detonated.i + ' : ' + detonated.j + '  neighbour: ' + neighbour);
		if(neighbour == 0) return;
		if(detonated == "nada" || detonated == "vacio") return;
		if(detonated.flavor == "nula" || detonated == "techo") return;
		//alert(detonated.i + ' : ' + detonated.j + '  neighbour: ' + neighbour);
		//if(detonated.marked) return;
		
		detonated.marked = true;
		detonated.bombBall = false;
		this.detonateBomb(this.grilla.retrieveBubble(detonated.i, detonated.j + 1), neighbour - 1);
		this.detonateBomb(this.grilla.retrieveBubble(detonated.i, detonated.j - 1), neighbour - 1);
		this.detonateBomb(this.grilla.retrieveBubble(detonated.i - 1, detonated.j), neighbour - 1);
		this.detonateBomb(this.grilla.retrieveBubble(detonated.i + 1, detonated.j), neighbour - 1);
		if(!this.grilla.isShortRow(detonated.i)){
			this.detonateBomb(this.grilla.retrieveBubble(detonated.i + 1, detonated.j - 1), neighbour - 1);
			this.detonateBomb(this.grilla.retrieveBubble(detonated.i - 1, detonated.j - 1), neighbour - 1);
		}else{
			this.detonateBomb(this.grilla.retrieveBubble(detonated.i + 1, detonated.j + 1), neighbour - 1);
			this.detonateBomb(this.grilla.retrieveBubble(detonated.i - 1, detonated.j + 1), neighbour - 1);
		};
	};
	
	// event handler
	
	this.loose;
	this.win;
}

function gameUI(w, h){
	this.width = w;
	this.height = h;
	this.points = 0;
	this.pointsCounter = 0;
	
	this.acumuledPoints = 0;
	
	this.lifes = 5;
	this.initialLifes = 5;
	
	//this.element = document.createElement('<div style=" @font-face: { font-family: \'The New Font\'; src: Bubblegum.ttf;}"></div>');
	this.element = document.createElement('div');
	this.element2 = document.createElement('div');
	this.element3 = document.createElement('div');
	this.backElement = document.createElement('div');

	$(this.element).addClass('pointsFrame');
	$(this.element2).addClass('lifesFrame');
	$(this.element3).addClass('levelsFrame');

	animNav.append(this.element);
	animNav.append(this.element2);
	animNav.append(this.element3);
	animNav.append(this.backElement);

	/*this.element.style.backgroundImage = 'url('+uiPointsFrame.src+')';
	//alert(uiPointsFrame.width + ':' + uiPointsFrame.height)
	this.element.style.width = uiPointsFrame.width + 'px';
	this.element.style.maxWidth = uiPointsFrame.width + 'px';
	this.element.style.height = uiPointsFrame.height + 'px';
	this.element.style.position = 'absolute';
	this.element.style.top = (h * .7) + 'px';
	this.element.style.left = (w - uiPointsFrame.width + 5) + 'px';
	
	
	this.element2.style.backgroundImage = 'url('+uiLifeFrame.src+')';
	this.element2.style.width = uiLifeFrame.width + 'px';
	this.element2.style.height = uiLifeFrame.height + 'px';
	this.element2.style.position = 'absolute';
	this.element2.style.top = '0px';
	this.element2.style.left = (w * (2/3)) + 'px';
	
	
	this.element3.style.backgroundImage = 'url('+uiLevelFrame.src+')';
	this.element3.style.width = uiLevelFrame.width + 'px';
	this.element3.style.height = uiLevelFrame.height + 'px';
	this.element3.style.position = 'absolute';
	this.element3.style.top = (h * .7) + uiLevelFrame.height + 'px';
	this.element3.style.left = (w - uiLevelFrame.width + 5) + 'px';*/
	$(this.element).addClass('pointsFrame'+ gameSize);
	$(this.element2).addClass('lifesFrame'+ gameSize);
	$(this.element3).addClass('levelsFrame'+ gameSize);
	$(this.backElement).addClass('gobackFrame' + gameSize);

	/*this.backElement.style.backgroundImage = 'url('+uiBackButton.src+')';
	//alert(uiBackButton.src + ':' + uiBackButton.width + ':' + uiBackButton.height);
	this.backElement.style.width = uiBackButton.width + 'px';
	this.backElement.style.height = uiBackButton.height + 'px';
	this.backElement.style.position = 'absolute';
	this.backElement.style.top = uiLifeFrame.height + 'px';
	this.backElement.style.left = (w * (2/3)) + 'px';*/
	//alert((uiLifeFrame.height + 5) + 'px' + (w * (2/3)) + 'px');
	$(this.backElement).click(function(){ game.showMenu(); });
	
	
	this.savePoints = function(){ this.acumuledPoints = this.points;};
	this.restorePoints = function(){ this.points = this.acumuledPoints;}
	
	//$('#' + animNav).append(this.element);
	
	this.draw = function(painter){
		//performance.check('draw ui');
		/*painter.save();
		painter.fillStyle = '#fff';
		painter.fillRect(0, 0, 100, 25);
		painter.font = "bold 12px sans-serif";
		painter.fillStyle = '#000';*/
		if(this.pointsCounter < this.points) this.pointsCounter += 10;
		$(this.element).html(this.pointsCounter);
		$(this.element2).html(this.lifes);
		$(this.element3).html(game.level.lvlnro);
		/*painter.fillText(this.pointsCounter , 10, 10);
		painter.restore();*/
		//performance.check('draw ui');
	};
	
	this.addPoints = function(p){ this.points += p; };
	
	//this.
};

function appEnviroment(canvasObj, menuObj, navObj, size){
	this.level = '';
	this.animTimer;
	this.cannon;

	this.canvas = document.getElementById(canvasObj);//$(canvasObj)
	this.painter = document.getElementById(canvasObj).getContext('2d');
	/*this.backgroundCanvas = document.getElementById(backgroundCanvasObj);
	this.backgroundPainter = document.getElementById(backgroundCanvasObj).getContext('2d');*/
	this.buffercanvas = document.createElement('canvas');
	this.frameBuffer = this.buffercanvas.getContext('2d');
	//frameBuffer = this.frameBuffer;
	frameBuffer = this.painter;
	this.menu = document.getElementById(menuObj);
	this.backgroundImage = backgroundImage;
	this.lvlFrame = lvlFrame;
	animNav = $('#' + navObj);

	this.size = size;

	switch(this.size){
		case "320x480":
			this.canvas.width = 320;
			this.canvas.height = 480;
			break;
		case "360x480":
			this.canvas.width = 360;
			this.canvas.height = 480;
			break;
		case "640x960":
			this.canvas.width = 640;
			this.canvas.height = 960;
			break;
		case "480x800":
			this.canvas.width = 480;
			this.canvas.height = 800;
			break;
		case "854x480":
			this.canvas.height = 480; 
			this.canvas.width = 854;
			break;
	};

	this.clock = new Timeline(fps);
	//this.clock = clock;
	//this.clock.connect(tick, 'tick');
	/*performance = new performanceStatus(5, this.painter);
	performance.addChecker('clear painter');
	performance.addChecker('move balls');
	performance.addChecker('colisiones');
	performance.addChecker('draw balls');
	performance.addChecker('draw ui');	*/

	/*this.backgroundCanvas.height = this.canvas.height;
	this.backgroundCanvas.width = this.canvas.width;*/
	this.buffercanvas.height = this.canvas.height;
	this.buffercanvas.width = this.canvas.width;
	
	this.ui = new gameUI(this.canvas.width, this.canvas.height);
	
	//init
	/*this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.top = this.canvas.top;
	this.left = this.canvas.left;
	this.level.top = this.top;
	this.level.left = this.left;
	this.level.topBound = this.canvas.height - lvlFrame.height;
	this.level.leftBound = (this.canvas.width - lvlFrame.width) / 2;*/
	
	//event listeners
	this.mouseMove = function(event){
		
	}
	
	
	this.mouseClick = function(event){
		//alert(event.screenX + ' ' + event.screenY);
		//this = game;
		//debug(event);
		if(event.clientY < (game.ui.backElement.height + game.level.height)) return;
		game.cannon.shoot(event.clientX, event.clientY);
	}
	
	this.startNewGame = function(){
		if(this.level != '') this.level.clearBoard();
		this.createLvl(1);
		this.clock.start();

		//hide menu
		//this.menu.style.zIndex = this.menu.style.zIndex - 1;
		this.menu.style.display = 'none';
		//alert('hola');
	};
	
	this.continueGame = function(){
		if(this.level == ''){
			this.startNewGame();
		}else{
			//this.menu.style.zIndex = this.menu.style.zIndex + 1;
			this.menu.style.display = 'none';
			this.clock.start();
		};
	};
	
	this.nextLevel = function(){
		//SubmitScore();
		this.createLvl(this.level.lvlnro + 1);
	};
	
	
	this.redoLevel = function(){
		this.createLvl(this.level.lvlnro);
	};
	
	this.createLvl = function(levelnumber){
		switch(this.size){
			case "320x480":
				this.canvas.width = 320;
				this.canvas.height = 480;
				this.level = new bubbleLevel(240, 380, 8, 20, levelnumber);
				break;
			case "360x480":
				this.canvas.width = 360;
				this.canvas.height = 480;
				this.level = new bubbleLevel(360, 480, 10, 20, levelnumber);
				break;
			case "640x960":
				this.canvas.width = 640;
				this.canvas.height = 960;
				this.level = new bubbleLevel(640, 960, 13, 30, levelnumber);
				break;
			case "480x800":
				this.canvas.width = 480;
				this.canvas.height = 800;
				this.level = new bubbleLevel(480, 800, 11, 25, levelnumber);
				break;
			case "854x480":
				this.canvas.height = 480; 
				this.canvas.width = 854;
				this.level = new bubbleLevel(800, 400, 23, 20, levelnumber);
				break;
		};
		this.level.top = this.top;
		this.level.left = this.left;	
		this.level.topBound = this.canvas.height - this.level.height;
		this.level.leftBound = (this.canvas.width - this.level.width) / 2;
		this.level.points = this.ui.points;
		this.level.loose = this.playerLoose;
		this.level.win = this.playerWin;
		this.level.makeMeRandom(5);
		this.cannon = new bubbleCannon(this.level);
		this.level.cannon = this.cannon;
		animNav.append(this.cannon.element);
		
		this.cannon.setReadyShoot();
	};
	
	this.playerLoose = function(){
		//alert('loose');
		game.level.clearBoard();
		cartel = document.createElement('div');
		var image = document.createElement('img');
		image.src = uiLooseFrame.src;
		image.style.top = '30%';
		image.style.left = ((game.canvas.width - uiLooseFrame.width) / 2) + 'px';
		image.style.position = 'absolute';
		cartel.appendChild(image);
		cartel.style.width = game.canvas.width + 'px';
		cartel.style.height = game.canvas.height + 'px';
		cartel.style.maxHeight = game.canvas.height + 'px';
		cartel.style.display = 'none';
		cartel.style.position = 'fixed';
		cartel.style.top = '0px';
		cartel.style.left = '0px';
		//cartel.style.zIndex = -99;
		cartel.style.backgroundImage = 'url(backgrounddiv.png)';
		cartel.style.backgroundRepeat = 'repeat';
		//cartel.style.backgroundImage = 'url('+uiLooseFrame.src+')';
		$(document.body).append(cartel);
		$(cartel).fadeIn(150);
		$(cartel).click(function(){
			$(cartel).fadeOut(300, function(){
				game.ui.lifes -= 1;
				if(game.ui.lifes == -1){
					game.level = '';
					game.ui.lifes = 5;
					game.ui.points = 0;
					game.ui.acumuledPoints = 0;
					game.ui.pointsCounter = 0;
					game.showMenu();
				}else{
					game.ui.points = game.ui.acumuledPoints;					 
					game.ui.pointsCounter = game.ui.acumuledPoints;
				};
				game.redoLevel();
				$(cartel).remove();
			});
		});
	};
	
	this.playerWin = function(){
		game.level.clearBoard();
		cartel = document.createElement('div');
		var image = document.createElement('img');
		image.src = uiWinFrame.src;
		image.style.top = '30%';
		image.style.left = ((game.canvas.width - uiWinFrame.width) / 2) + 'px';
		image.style.position = 'absolute';
		cartel.appendChild(image);
		cartel.style.width = game.canvas.width + 'px';
		cartel.style.height = game.canvas.height + 'px';
		cartel.style.maxHeight = game.canvas.height + 'px';
		cartel.style.display = 'none';
		cartel.style.position = 'fixed';
		cartel.style.top = '0px';
		cartel.style.left = '0px';
		//cartel.style.zIndex = -99;
		cartel.style.backgroundImage = 'url(backgrounddiv.png)';
		cartel.style.backgroundRepeat = 'repeat';
		//cartel.style.backgroundImage = 'url('+uiLooseFrame.src+')';
		$(document.body).append(cartel);
		$(cartel).fadeIn(150);
		$(cartel).click(function(){
			$(cartel).fadeOut(300, function(){
				game.level.clearBoard();
				game.ui.acumuledPoints = game.ui.points;
				game.nextLevel();
				$(cartel).remove();
			});
		});
	};
	
	this.showMenu = function(){
		this.clock.stop();
		this.menu.style.zIndex = 90//this.menu.style.zIndex + 2;
		this.menu.style.display = 'block';
	};
	
	//animation functions
	this.clearPainter = function(){
		//this.painter.save();
		//this.painter.fillStyle = '#fff';
		//this.painter.fillRect(0, 0, this.width, this.height);
		this.painter.clearRect(0, 0, this.width, this.height);
		//this.painter.restore();
	}
	
	this.drawCannon = function(painter){
		if(this.cannon.currentBubble == null) return;
		painter.save();
		painter.drawImage(this.cannon.currentBubble.meinBild, this.width / 2, (this.height - this.level.bubbleRadius));
		painter.restore();
	}
	
	this.drawBalls = function(painter){
		this.level.drawBalls(painter);
	}
	
	this.drawBackground = function(painter){
		//painter.save();
		painter.drawImage(this.backgroundImage, 0, 0);
		painter.drawImage(this.lvlFrame, 0, 0);
		//painter.drawImage(lvlFrame, (this.canvas.width - lvlFrame.width) / 2, this.canvas.height - lvlFrame.height);
		//painter.fillRect(this.level.leftBound, this.level.topBound, this.level.width, this.level.height);
		//painter.restore();
	}
	
	this.draw = function(){
		//this.canvas.style.display = 'none';
		//performance.check('clear painter');
		/*this.clearPainter(this.frameBuffer);
		//performance.check('clear painter');
		this.drawBackground(this.frameBuffer);
		this.drawCannon(this.frameBuffer);
		this.drawBalls(this.frameBuffer);
		this.ui.draw(this.frameBuffer);*/

		//this.clearPainter(this.painter);
		//performance.check('clear painter');
		//this.drawBackground(this.painter);
		//this.drawCannon(this.painter);
		//this.drawBalls(this.painter);
		this.ui.draw(this.painter);
		this.level.drawLevel();

		//this.clearPainter(this.painter);
		//this.painter.putImageData(this.frameBuffer.getImageData(0, 0, this.buffercanvas.width, this.buffercanvas.height), 0, 0);
		//this.canvas.style.display = 'block';
	}
	//$(canvasObj).
	this.startAnimation = function(){
		// call this every 1/24 seconds to make all work
		this.ui.points = this.level.points;
		//n = $('#'+animNav);
		animNav[0].style.display = 'none';
		this.level.moveBalls();
		this.draw();
		//var animTimer = setInterval(this.draw, 42);
		animNav[0].style.display = 'block';
	}
	
	//init
	this.width = $('#'+canvasObj).width();
	this.height = $('#'+canvasObj).height();
	this.top = $('#'+canvasObj).offset().top;
	this.left = $('#'+canvasObj).offset().left;
	animNav.width(this.width);
	animNav.height(this.height);
	//this.drawBackground(this.backgroundPainter);


	//$('#'+canvasObj).click(shoot);
	//$('#'+canvasObj).click(this.mouseClick);
	//$('#'+navObj).click(this.mouseClick);
	//animNav.tap(this.mouseClick);
	animNav.click(this.mouseClick);
}

function tick(){
	game.startAnimation();
	//performance.update();
	//setTimeout("tick()", 1);
}
