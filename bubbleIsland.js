/*
ToDo

RC:
[ ] animaciones
[ ] sonido (html5 o por flash)

beta:
[x] un disparo por tiempo
[-] optimizar draw
[ ] dibujar cañon
[ ] api facebook

alpha:
[-] ui
[-] interfaz de menu
[ ] multiples resoluciones 
[x] puntuacion
[ ] diferentes niveles
[ ] carga de niveles por ajax desde archivo
[x] generar level random
[b] lvl que aumente linea de bubbles
[-] bubbles bajen lentamente
[ ] linea de perdida variable
[-] bolas mas escurridisa (tener cierto margen de error para dejar pasar mas facil las pelotas entre otras)

pre-alpha:
[b] ubicar bola en grilla
[b] mostrar correctamente la grilla
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

/*Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};*/

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
		str += prop + ':' + this[prop];
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
	

/*image_background=new Image();
image_background.src='colleen_back.png';
image_cannon=new Image();
image_cannon.src='colleen_cannon.png';
image_balls=new Image();
image_balls.src='colleen_balls.png';
image_zowie=new Image();
image_zowie.src='zowie.png';*/

/*var bubbleSilverImage = new Image();
bubbleSilverImage.src = 'silverbubble.png';

var bubbleOrangeImage = new Image();
bubbleOrangeImage.src = 'orangebubble.png';

var bubbleRedImage = new Image();
bubbleRedImage.src = 'redbubble.png';

var bubblePurpleImage = new Image();
bubblePurpleImage.src = 'purplebubble.png';

var bubbleYellowImage = new Image();
bubbleYellowImage.src = 'yellowbubble.png';

var lvlFrame = new Image();
lvlFrame.src = 'lvlboundering.png';*/

var bubbleSilverImage;
var bubbleRedImage; 
var bubbleOrangeImage;
var bubblePurpleImage;
var bubbleYellowImage;
var lvlFrame;
var backgroundImage;
var logoImage;

var game;
var frameBuffer;
var animNav;
var fps = 24;
var pointExplode = 3;
var pointDrop = 25;
//var performance;

function bubble(l){
	// flavors = blue, red, purple, yellow
	this.element = document.createElement('div');
	this.element.style.minHeight = l.bubbleRadius + 'px';
	this.element.style.minWidth = l.bubbleRadius + 'px';
	this.element.style.position = 'absolute';
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
	//this.meinBild.src = 'bubble.png';
	
	this.makeItRandom = function(){
		var value = rnd(4);
		switch (value){
			case 0:
				this.flavor = "silver"; 
				this.meinBild = bubbleSilverImage;
				break;
			case 1:
				this.flavor = "yellow"; 
				this.meinBild = bubbleYellowImage;
				break;
			case 2:
				this.flavor = "purple"; 
				this.meinBild = bubblePurpleImage;
				break;
			case 3:
				this.flavor = "red"; 
				this.meinBild = bubbleRedImage;
				break;
			case 4:
				this.flavor = "orange";
				this.meinBild = bubbleOrangeImage;
				break;
		};
		this.element.style.backgroundImage = 'url(' + this.meinBild.src+')';
	};
	
	this.move = function(){
		if((this.dx == 0) && (this.dy == 0)) return;
		this.x += this.dx;
		this.y += this.dy;
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';
		if((this.x <= this.lvl.leftBound) || (this.x > this.lvl.width)) this.dx = -this.dx;
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
		if(this.x < 0) this.x = 0;
		if(this.y < 0) this.y = 0;
		
		// altura de la grilla -> mover de obj
		//h = (this.lvl.bubbleRadius) / Math.sqrt(2);
		h = Math.sqrt((this.lvl.bubbleRadius*this.lvl.bubbleRadius) - ((this.lvl.bubbleRadius / 2) * (this.lvl.bubbleRadius / 2)));
		
		//set proximity and attach to table
		this.i = Math.round(((this.y - this.lvl.topBound) / h) );//+ .5);
		//calcula se corresponde corrimiento para la fila que tiene una bola menos
		//delta = (this.i % 2) * (this.lvl.bubbleRadius / 2);
		delta = this.lvl.grilla.isShortRow(this.i) * (this.lvl.bubbleRadius / 2);
		//calcular la posicion i de la bola
		this.j = Math.round(((this.x - this.lvl.leftBound) - delta) / this.lvl.bubbleRadius)
		
		//alert('i:' + this.i + ' j:' + this.j + ' h:' + h + ' delta:' + delta);
		//debug('i:' + this.i + ' j:' + this.j + ' x:' + this.x + ' y:' + this.y + ' h:' + h + ' delta:' + delta);
		//debug('radius: ' + this.lvl.bubbleRadius);
		this.x = this.j * (this.lvl.bubbleRadius) + delta;
		this.y = (this.i * h);
		
		this.x += this.lvl.leftBound;
		this.y += this.lvl.topBound;
		//if(this.y > 0) this.y = this.y  - (this.lvl.bubbleRadius / 2); 
		this.lvl.grilla.addBubble(this);
	};
	
	this.equalBubble = function(bubble){
		return (bubble.flavor = this.flavor);
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
		//alert(this.x + ' : ' + this.y);*/
	};

	this.recalcXYfrom = function(thisBubble){
		this.recalcXY();
		h = Math.sqrt((this.lvl.bubbleRadius*this.lvl.bubbleRadius) - ((this.lvl.bubbleRadius / 2) * (this.lvl.bubbleRadius / 2)));
		y = (thisBubble.i * h) + this.lvl.topBound;
		this.y += thisBubble.y - y; 
		this.y = Math.floor(this.y);
	};
	
	this.isMoving = function(){
		//debug(((this.dx == 0) && (this.dy == 0)));
		return ((this.dx != 0) || (this.dy) != 0);
	};
};

function bubbleCannon(lvl){
	this.lvl = lvl;
	this.currentBubble;/* = new bubble(this.lvl);
	this.currentBubble.makeItRandom();*/
	this.readyShoot = false;
	
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
		velocity = 17; //--------------------------------------------------------------------------------------------------------------------velocidad bola, const
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
		this.currentBubble.element.style.y = this.currentBubble.y;
		this.currentBubble.element.style.x = this.currentBubble.x;
		$('#'+animNav).append(this.currentBubble.element);
		this.readyShoot = true;
	}
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
	
	
	this.retrieveBubble = function(i, j){
		//debug('  retrieve Bubble i:' + i + ' j:' + j);
		if((i >= this.alto) || (i < 0)) return new bubble(this.lvl);
		if((j >= this.ancho) || (j < 0)) return new bubble(this.lvl);
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
		radius = this.lvl.bubbleRadius / 2;
		halfradius = radius / 2;
		dx = 0;
		dy = 0;
		deltax = collided.x - bubble.x;
		deltay = collided.y - bubble.y;
		if(this.isShortRow(collided.i)){
			if(deltax > halfradius) dx = 0;
			if(deltax < -halfradius) dx = 1;
		}else{
			if(deltax > halfradius) dx = -1;
			if(deltax < -halfradius) dx = 0;
		};

		if(deltay > -halfradius) dy = -1;
		if(deltay < halfradius) dy = 1;

		bubble.i = collided.i + dy;
		bubble.j = collided.j + dx;

		this.Table[bubble.i][bubble.j] = bubble;
		bubble.recalcXYfrom(collided);

		c = this.checkForCompatibility(bubble, bubble.flavor);
		//debug('    c   :' + c + '   ');
		this.lvl.mutex = true;
		if(c >= 3){				
			this.lvl.pointsMultiplier = pointExplode;
			this.explodeMarked();
			this.lvl.pointsMultiplier = pointDrop;
			this.checkForOrphans();
		}else{				
			this.clearMarks();
		};
		this.touchedBubbles = new Array();
		this.lvl.setReadyShoot();

		/*if(this.Table[bubble.i][bubble.j] == "vacio"){
			this.Table[bubble.i][bubble.j] = bubble;
			c = this.checkForCompatibility(bubble, bubble.flavor);
			//debug('    c   :' + c + '   ');
			this.lvl.mutex = true;
			if(c >= 3){				
				this.lvl.pointsMultiplier = pointExplode;
				this.explodeMarked();
				this.lvl.pointsMultiplier = pointDrop;
				this.checkForOrphans();
			}else{				
				this.clearMarks();
			};
			this.touchedBubbles = new Array();
			this.lvl.setReadyShoot();
		};*/
	};
	
	this.checkForCompatibility = function(toCheck, flavor){
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
		
	};
	
	this.checkNeighbours = function(bubble){
		//check de caidas
		//debug(bubble);
		if(bubble == "nada" || bubble == "vacio") return true;
		if(bubble.flavor == "nula") return false;
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
				if((this.Table[i][j] != "nada") ||(this.Table[i][j] != "vacio")){					
					b = this.Table[i][j];
					b.marked = false;
				}; 
			};
		};
	};
}

function bubbleLevel(w, h, bubblesWidth, bubblesHeight){
	this.grilla = new bubbleTable(bubblesWidth, bubblesHeight, this);
	this.cannon;
	this.width = w;
	this.height = h;
	this.top;
	this.left;
	this.topBound;
	this.leftBound;
	this.mutex = false;
	this.bubbleRadius = this.width / bubblesWidth;
	this.shootedBubble = null;
	this.bubbles_array = new Array();
	this.points = 0;
	this.pointsToReach = 1000;
	this.pointsMultiplier = 0;

	this.fallvelocity = 0.2; //balls per seccond
	this.bubbleVelocity = (this.bubbleRadius) * (this.fallvelocity / fps);
	this.fpscount = 0;
	
	this.moveBalls = function(){
		//debug('length: ' + this.bubbles_array.length);
		performance.check('move balls');
		this.fpscount++;
		this.fpscount = Math.round(this.fpscount % (fps / this.fallvelocity));

		if(this.fpscount == 0) this.addRandomRow();

		for(i = 0; i < this.bubbles_array.length; ++i){
			this.bubbles_array[i].move();
		};
		performance.check('move balls');
		//si esta ocupado, evitar movimiento (normalmente no se mueve, solo evita check de mas)
		if(this.mutex == true){
			//debug("MUTED!");
			return;
		};

		//check colisions
		performance.check('colisiones');
		if(this.shootedBubble == null){
			performance.check('colisiones');
			return;	
		} 
		this.shootedBubble.move();

		for(i = 0; i < this.bubbles_array.length; ++i){			
			currentBubble = this.bubbles_array[i];
			// check radius
			disx = Math.abs(currentBubble.x - this.shootedBubble.x);
			disy = Math.abs(currentBubble.y - this.shootedBubble.y);
			//debug(disx + ':' + disy);
			
			distance = Math.sqrt(disx * disx + disy * disy);
			if(distance < (this.bubbleRadius *.9)){
				//debug('COLLITION');				
				//this.bubbles_array.push(this.shootedBubble);	
				this.mutex=true;			
				this.shootedBubble.stopMove();
				this.addBubble(this.shootedBubble);
				//alert(currentBubble + ' before shoot');
				this.grilla.addBubble(this.shootedBubble, currentBubble);
				this.shootedBubble.dy = this.bubbleVelocity;
				this.shootedBubble = null;
				this.mutex = false;
				break;
			};
		};

		performance.check('colisiones');

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
	}
	
	this.drawBalls = function(painter){
		//alert(painter);
		//if((this.bubbles_array.length) != 0) alert(this.bubbles_array.length);
		performance.check('draw balls');
		for(i = 0; i < this.bubbles_array.length; ++i){
			//draw each ball
			this.bubbles_array[i].draw(painter);
			//setTimeout('game.level.bubbles_array['+i+'].draw(frameBuffer)', 1);
		};

		performance.check('draw balls');
		if(this.shootedBubble != null) this.shootedBubble.draw(painter);
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
				this.addPoints();
				//debug('removed ' + b.toString());
			};
		};
	};
	
	this.setReadyShoot = function(){
		this.mutex = false;
		this.cannon.setReadyShoot();
	};

	this.addPoints = function(){
		this.points += this.pointsMultiplier;
	}

	this.makeMeRandom = function(alto){		
		//for(i = (this.grilla.alto - alto); i < this.grilla.alto; ++i){
		for(i = 0; i < alto; ++i){
			isShort = this.grilla.isShortRow(i);
			for(j = 0; j < this.grilla.ancho; ++j){
				if((j == this.grilla.ancho - 1) && isShort) continue;
				b = new bubble(this);
				b.makeItRandom();
				b.i = i;
				b.j = j;
				b.dy = this.bubbleVelocity;
				this.grilla.Table[i][j] = b;
				b.recalcXY();				
				this.addBubble(b);
				$('#'+animNav).append(b.element);
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
			b.makeItRandom();
			b.i = 0;
			b.j = i;
			b.dy = this.bubbleVelocity;
			b.recalcXY();
			newrow[i] = b;
			this.addBubble(b);
			$('#'+animNav).append(b.element);
		};				
	};
}

function gameUI(w, h){
	this.width = w;
	this.height = h;
	this.points = 0;
	this.pointsCounter = 0;
	
	this.acumuledPoints = 0;
	
	this.savePoints = function(){ this.acumuledPoints = this.points;};
	this.restorePoints = function(){ this.points = this.acumuledPoints;}
	
	this.draw = function(painter){
		performance.check('draw ui');
		painter.save();
		painter.fillStyle = '#fff';
		painter.fillRect(0, 0, 100, 25);
		painter.font = "bold 12px sans-serif";
		painter.fillStyle = '#000';
		if(this.pointsCounter < this.points) this.pointsCounter++;
		painter.fillText(this.pointsCounter , 10, 10);
		painter.restore();
		performance.check('draw ui');
	};
	
	this.addPoints = function(p){ this.points += p; };
};

function appEnviroment(canvasObj, menuObj, navObj, size){
	this.level;
	this.animTimer;
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
	animNav = navObj;

	this.clock = new Timeline(fps);
	this.clock.connect(tick, 'tick');
	performance = new performanceStatus(5, this.painter);
	performance.addChecker('clear painter');
	performance.addChecker('move balls');
	performance.addChecker('colisiones');
	performance.addChecker('draw balls');
	performance.addChecker('draw ui');
	
	switch(size){
		case "320x480":
			this.canvas.width = 320;
			this.canvas.height = 480;
			this.level = new bubbleLevel(240, 400, 10, 20)
			break;
		case "360x480":
			this.canvas.width = 360;
			this.canvas.height = 480;
			this.level = new bubbleLevel(360, 480, 12, 20)
			break;
		case "640x960":
			this.canvas.width = 640;
			this.canvas.height = 960;
			this.level = new bubbleLevel(640, 960, 15, 30)
			break;
		case "480x800":
			this.canvas.width = 480;
			this.canvas.height = 800;
			this.level = new bubbleLevel(480, 800, 13, 25)
			break;
		case "854x480":
			//$('#'+canvasObj).width(854);
			//$('#'+canvasObj).height(480);
			this.canvas.height = 480; 
			this.canvas.width = 854;
			this.level = new bubbleLevel(854, 480, 25, 20)
			break;
	};

	/*this.backgroundCanvas.height = this.canvas.height;
	this.backgroundCanvas.width = this.canvas.width;*/
	this.buffercanvas.height = this.canvas.height;
	this.buffercanvas.width = this.canvas.width;
	
	this.cannon = new bubbleCannon(this.level);
	this.level.cannon = this.cannon;
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
		game.cannon.shoot(event.clientX, event.clientY);
	}
	
	this.startNewGame = function(){
		//hide menu
		this.clock.start();
		this.menu.style.zIndex = this.menu.style.zIndex - 1;
		this.menu.style.display = 'none';
		//alert('hola');
	};
	
	this.continueGame = function(){
	
	};
	
	this.showMenu = function(){
		clock.stop();
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

		this.clearPainter(this.painter);
		//performance.check('clear painter');
		this.drawBackground(this.painter);
		this.drawCannon(this.painter);
		//this.drawBalls(this.painter);
		this.ui.draw(this.painter);

		//this.clearPainter(this.painter);
		//this.painter.putImageData(this.frameBuffer.getImageData(0, 0, this.buffercanvas.width, this.buffercanvas.height), 0, 0);
		//this.canvas.style.display = 'block';
	}
	//$(canvasObj).
	this.startAnimation = function(){
		// call this every 1/24 seconds to make all work
		this.ui.points = this.level.points;
		this.level.moveBalls();
		this.draw();
		//var animTimer = setInterval(this.draw, 42);
	}
	
	//init
	this.width = $('#'+canvasObj).width();
	this.height = $('#'+canvasObj).height();
	this.top = $('#'+canvasObj).offset().top;
	this.left = $('#'+canvasObj).offset().left;
	this.level.top = this.top;
	this.level.left = this.left;	
	this.level.topBound = this.canvas.height - this.level.height;
	this.level.leftBound = (this.canvas.width - this.level.width) / 2;
	
	this.level.makeMeRandom(5);
	this.cannon.setReadyShoot();
	//this.drawBackground(this.backgroundPainter);


	//$('#'+canvasObj).click(shoot);
	//$('#'+canvasObj).click(this.mouseClick);
	$('#'+navObj).click(this.mouseClick);
}

function tick(){
	game.startAnimation();
	performance.update();
	//setTimeout("tick()", 1);
}
