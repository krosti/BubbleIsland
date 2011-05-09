/*
ToDo

RC:
[ ] animaciones
[ ] sonido (html5 o por flash)

beta:
[x] un disparo por tiempo
[x] optimizar draw
[-] dibujar cañon
[x] facebook con hack
[x] poner cartel que diga "posiblemente se cierre la aplicación para validar su cuenta de facebook"
[-] mejorar parte de facebook
[-] leaderboard
[ ] agregar api de pago
[-] pelotitas
[-] animaciónes, oso y cosas...	

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
	

var bubbleSilverImage;
var bubbleRedImage; 
var bubbleOrangeImage;
var bubblePurpleImage;
var bubbleYellowImage;
var bubbleSilverFreezeImage;
var bubbleRedFreezeImage; 
var bubbleOrangeFreezeImage;
var bubblePurpleFreezeImage;
var bubbleYellowFreezeImage;
var bubbleSilverHalfImage;
var bubbleRedHalfImage; 
var bubbleOrangeHalfImage;
var bubblePurpleHalfImage;
var bubbleYellowHalfImage;
var lvlFrame;
var backgroundImage;
var logoImage;
var pandaBearAnim;

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
		var value = rnd(10);
		switch(value){
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				this.flavor = this.randomFlavor();
				this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;
				break;
			case 7:
				var second = rnd(1);
				if(second == 0){
					this.pointsMultiplier = 2;
				}else{
					this.pointsMultiplier = 3;
				};
				var mult = document.createElement('p');
				this.flavor = this.randomFlavor();
				this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;
				this.element.appendChild(mult);								
				mult.innerHTML = 'X ' +  this.pointsMultiplier;
				//mult.style.font = 'Verdana 15px';
				//mult.style.position = 'relative';
				//mult.style.top = '15px'; mult.style.left = '30px';
				alert('Multiplier ball: ' + this.pointsMultiplier);
				
				break;
			case 8:
				this.flavor = this.randomFreezeFlavor();
				this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;
				this.freezeBall = true;
				break;
			case 9:
				this.flavor = this.randomFlavor();
				this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;
				do{
					this.secondFlavor = this.randomFlavor();
				}while(this.flavor == this.secondFlavor);
				var zweithBild = document.createElement('img');				
				switch(this.secondFlavor){
					case 'silver':
						zweithBild.src = bubbleSilverHalfImage.src;
						break;
					case 'orange':
						zweithBild.src = bubbleOrangeHalfImage.src;
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
				/*zweithBild.style.position = 'relative';
				zweithBild.style.top = '0px';
				zweithBild.style.left = '0px';*
				zweithBild.style.zIndex = 30*/ //this.object.baseElement.style.zIndex + 1;
				
				alert(this.flavor + ' : ' + this.secondFlavor);
				break;
			case 10:
				this.flavor = this.randomFlavor();
				this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;
				this.bombBall = true;
				//alert('bombBall!!');
				break;
		};	
		this.object.fitNormalImage();
	};
	
	this.randomFlavor = function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "silver"; 
				this.meinBild = bubbleSilverImage;
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
				flavor = "orange";
				this.meinBild = bubbleOrangeImage;
				break;
		};
		return flavor;
	};	
	
	this.randomFreezeFlavor = function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "silver"; 
				this.meinBild = bubbleSilverFreezeImage;
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
				flavor = "orange";
				this.meinBild = bubbleOrangeFreezeImage;
				break;
		};
		//this.element.style.backgroundImage = 'url(' + this.meinBild.src+')';
		//this.element.src = this.meinBild.src;
		return flavor;
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
};

function bubbleCannon(lvl){
	this.lvl = lvl;
	this.currentBubble;/* = new bubble(this.lvl);
	this.currentBubble.makeItRandom();*/
	this.readyShoot = false;
	this.object = new standAnimation(130, 94, cannonImage.src);
	this.element = this.object.element;
	this.object.setXY(((this.lvl.width - cannonImage.width) / 2) + this.lvl.leftBound, (this.lvl.height - cannonImage.height) + this.lvl.topBound);
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
		var radius = this.lvl.bubbleRadius / 2;
		var halfradius = radius / 2;
		/*bubble.x -= bubble.dx / 2;
		bubble.y -= bubble.dy / 2;*/
		bubble.x -= bubble.dx;
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
		};

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
	
	
	this.mutex = false;
	this.freeze = false;
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

	this.character = new standAnimation(71, 110, pandaBearAnim.src, game.clock);
	this.character.setXY(50, 350);
	this.character.addState('load', this.character.normalImage, 32);
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
				this.mutex=true;			
				this.shootedBubble.stopMove();
				this.addBubble(this.shootedBubble);
				this.shootedBubble.dy = this.bubbleVelocity;
				//alert(currentBubble + ' before shoot');
				this.grilla.addBubble(this.shootedBubble, currentBubble);				
				this.shootedBubble = null;
				this.mutex = false;
				//alert(this.points);
				if(this.points >= this.pointsToReach) this.win();
				break;
			};
		};

		//performance.check('colisiones');
		
		var masBaja = this.grilla.returnLowest();
		/*alert(this.looseLine);
		alert(masBaja.x + this.bubbleRadius);*/
		if(masBaja.y + this.bubbleRadius > this.looseLine){
			alert('perdiste');
			/*alert(this.looseLine);
			alert(masBaja.x + this.bubbleRadius);*/
			this.loose();
		};

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
		$(b.element).remove();
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
		$(this.character.element).remove();
		if(this.cannon.currentBubble != null) $(this.cannon.currentBubble.element).remove();
	};
	
	this.freezeMovement = function(){
		this.freeze = true;
		this.freezeTimeout = fps * freezeTime;
	};
	
	this.detonateBomb = function(detonated, neighbour){
		//alert(detonated.i + ' : ' + detonated.j + '  neighbour: ' + neighbour);
		if(neighbour == 0) return;
		if(detonated == "nada" || detonated == "vacio") return;
		if(detonated.flavor == "nula" || detonated.flavor == "techo") return;
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
	
	this.element = document.createElement('div');
	this.element.style.width = '50px';
	this.element.style.position = 'fixed';
	this.element.style.top = '10px';
	this.element.style.left = (w - 50) + 'px';
	
	this.savePoints = function(){ this.acumuledPoints = this.points;};
	this.restorePoints = function(){ this.points = this.acumuledPoints;}
	
	//$('#' + animNav).append(this.element);
	document.body.appendChild(this.element);
	
	this.draw = function(painter){
		//performance.check('draw ui');
		/*painter.save();
		painter.fillStyle = '#fff';
		painter.fillRect(0, 0, 100, 25);
		painter.font = "bold 12px sans-serif";
		painter.fillStyle = '#000';*/
		if(this.pointsCounter < this.points) this.pointsCounter += 5;
		$(this.element).html(this.pointsCounter);
		/*painter.fillText(this.pointsCounter , 10, 10);
		painter.restore();*/
		//performance.check('draw ui');
	};
	
	this.addPoints = function(p){ this.points += p; };
};

function appEnviroment(canvasObj, menuObj, navObj, size){
	this.level;
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
	this.clock.connect(tick, 'tick');
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
		game.cannon.shoot(event.clientX, event.clientY);
	}
	
	this.startNewGame = function(){
		
		this.createLvl(1);
		this.clock.start();

		//hide menu
		this.menu.style.zIndex = this.menu.style.zIndex - 1;
		this.menu.style.display = 'none';
		//alert('hola');
	};
	
	this.continueGame = function(){
	
	};
	
	this.nextLevel = function(){
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
				this.level = new bubbleLevel(240, 400, 10, 20, levelnumber);
				break;
			case "360x480":
				this.canvas.width = 360;
				this.canvas.height = 480;
				this.level = new bubbleLevel(360, 480, 12, 20, levelnumber);
				break;
			case "640x960":
				this.canvas.width = 640;
				this.canvas.height = 960;
				this.level = new bubbleLevel(640, 960, 15, 30, levelnumber);
				break;
			case "480x800":
				this.canvas.width = 480;
				this.canvas.height = 800;
				this.level = new bubbleLevel(480, 800, 13, 25, levelnumber);
				break;
			case "854x480":
				this.canvas.height = 480; 
				this.canvas.width = 854;
				this.level = new bubbleLevel(800, 400, 25, 20, levelnumber);
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
		alert('loose');
		this.clearBoard();
		game.redoLevel();
	};
	
	this.playerWin = function(){
		alert('win');
		game.level.clearBoard();
		game.nextLevel();
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
		animNav[0].style.display = 'block';
		this.draw();
		//var animTimer = setInterval(this.draw, 42);
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
