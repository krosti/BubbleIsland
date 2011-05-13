function FBConnect(elementId){
	//init FBConnect
	//alert('initializing');
	this.self = this;
	this.element = document.getElementById(elementId);
	//var browserDiv = this.element;
	this.element.style.position = 'absolute';
	this.element.style.top = '0px';
	this.element.style.left = '0px';
	this.element.style.width = '320px';
	this.element.style.height = '480px'
	//document.body.appendChild(this.element);
	
	this.tokenUrl = 'access_token=';
	this.isConnected = false;
	this.token = '';
	this.url;
	this.user;
	this.friendsArray = [
      {
         "name": "Rezki Abdelali",
         "id": "523718585"
      },
      {
         "name": "Romina Botta",
         "id": "525977622"
      },
      {
         "name": "Eliana Hernandez",
         "id": "527565712"
      },
      {
         "name": "Andrea Blanco",
         "id": "558706381"
      },
      {
         "name": "Lore Kenig",
         "id": "562304219"
      },
      {
         "name": "Matias Coronel",
         "id": "567816085"
      },
      {
         "name": "May Petasny",
         "id": "579487878"
      },
      {
         "name": "Benja Eliosoff",
         "id": "583148647"
      },
      {
         "name": "Alejandro Vargas",
         "id": "615538155"
      },
      {
         "name": "Arkana Comics",
         "id": "628204882"
      },
      {
         "name": "Alcira Beatriz Bustos",
         "id": "631323902"
      },
      {
         "name": "Luz\u00eda Luc\u00eda",
         "id": "658748331"
      },
      {
         "name": "Andres Gonzalo",
         "id": "660224221"
      },
      {
         "name": "Milla Fernando Daniel",
         "id": "686323496"
      },
      {
         "name": "Cintia Millao",
         "id": "687093909"
      },
      {
         "name": "Nacho Mazzara",
         "id": "705712793"
      },
      {
         "name": "Jessica Morales",
         "id": "723448563"
      },
      {
         "name": "Emmanuel Facundo Orioli",
         "id": "736074076"
      },
      {
         "name": "Luu Porcellatti",
         "id": "748848143"
      },
      {
         "name": "Bruno Ignacio Vilacha",
         "id": "792124263"
      },
      {
         "name": "Franco Andres Ugarte",
         "id": "803169906"
      },
      {
         "name": "Damian Freinkel",
         "id": "803710452"
      },
      {
         "name": "J\u00e9sica Mercuri",
         "id": "816528878"
      },
      {
         "name": "Facundo Borelli",
         "id": "845294181"
      },
      {
         "name": "Leo Molas",
         "id": "870185380"
      },
      {
         "name": "Gonzalo Barboza",
         "id": "1021281570"
      },
      {
         "name": "Christian Vera",
         "id": "1027591470"
      },
      {
         "name": "Ariel Yessito Cerqueiras",
         "id": "1028259460"
      },
      {
         "name": "Pablin Flores",
         "id": "1032194706"
      },
      {
         "name": "Flor Alonso",
         "id": "1037821052"
      },
      {
         "name": "Nicolas Zaffrani Dean",
         "id": "1047920966"
      },
      {
         "name": "Tomas Touceda",
         "id": "1056986963"
      },
      {
         "name": "Guillermina Cazaub\u00f3n Mart\u00ednez",
         "id": "1059577207"
      },
      {
         "name": "Diego Reguera",
         "id": "1075112822"
      },
      {
         "name": "Agus Romaniello",
         "id": "1078652304"
      },
      {
         "name": "Javier Ahumada",
         "id": "1078972261"
      },
      {
         "name": "Sabri Panozzo",
         "id": "1081909297"
      },
      {
         "name": "Laly Morales",
         "id": "1098426100"
      },
      {
         "name": "Alejandro Sanchez",
         "id": "1102243623"
      },
      {
         "name": "Manuela Lopez",
         "id": "1110410123"
      },
      {
         "name": "Vanesa Cangelosi",
         "id": "1131682526"
      },
      {
         "name": "Celeste Haag",
         "id": "1132138023"
      },
      {
         "name": "Romina Buamscha",
         "id": "1138840734"
      },
      {
         "name": "Mario Boldrini",
         "id": "1146406123"
      },
      {
         "name": "Pablo Odorico",
         "id": "1151136893"
      },
      {
         "name": "Marianela Bezich",
         "id": "1160410043"
      },
      {
         "name": "Marcelo Di Meglio",
         "id": "1166538364"
      },
      {
         "name": "Romina Millao",
         "id": "1167043336"
      },
      {
         "name": "Melisa Mares Levis",
         "id": "1170536006"
      },
      {
         "name": "Day Seitz",
         "id": "1179256276"
      },
      {
         "name": "Lucas Gazta\u00f1aga",
         "id": "1196983442"
      },
      {
         "name": "Lea Giammaria",
         "id": "1201671291"
      },
      {
         "name": "Clara M\u00e9rida",
         "id": "1209938322"
      },
      {
         "name": "Chechu Asame",
         "id": "1225969792"
      },
      {
         "name": "Nacho Mendizabal",
         "id": "1258069203"
      },
      {
         "name": "Martin Marchegiani",
         "id": "1261394557"
      },
      {
         "name": "Daiana Vazquez",
         "id": "1262217528"
      },
      {
         "name": "Carolina Laurenz",
         "id": "1262306634"
      },
      {
         "name": "Fernando Cea",
         "id": "1276932361"
      },
      {
         "name": "Juan Ledesma",
         "id": "1297464843"
      },
      {
         "name": "Asado Violento",
         "id": "1324896452"
      },
      {
         "name": "Mariela Bola\u00f1o",
         "id": "1334892776"
      },
      {
         "name": "Massimo Resto",
         "id": "1340891969"
      },
      {
         "name": "Lujan Lindon",
         "id": "1343945916"
      },
      {
         "name": "Mauro Sequeiros",
         "id": "1344315165"
      },
      {
         "name": "Shoi Pozzer",
         "id": "1344844478"
      },
      {
         "name": "Caar Dicundo",
         "id": "1345927495"
      },
      {
         "name": "Melisa Hirsch",
         "id": "1349703010"
      },
      {
         "name": "Jose Cede\u00f1o",
         "id": "1360717138"
      },
      {
         "name": "Mariana Boub\u00e9e",
         "id": "1367108901"
      },
      {
         "name": "Sheila Roberson",
         "id": "1375448767"
      },
      {
         "name": "Hosting Bahia",
         "id": "1391851646"
      },
      {
         "name": "Mica Bartolome",
         "id": "1395567550"
      },
      {
         "name": "Carito Prieto",
         "id": "1400165911"
      },
      {
         "name": "Edgardo Ranellucci",
         "id": "1419616562"
      },
      {
         "name": "Dario de los Santos",
         "id": "1421684949"
      },
      {
         "name": "Mat\u00edas Moyo",
         "id": "1427686642"
      },
      {
         "name": "Lucas Manuel Rodriguez",
         "id": "1428736711"
      },
      {
         "name": "LuLa Quintana",
         "id": "1430865075"
      },
      {
         "name": "Karina Laurenz",
         "id": "1432365549"
      },
      {
         "name": "Ines Abal Prieto",
         "id": "1434133811"
      },
      {
         "name": "Sol Lopez",
         "id": "1436753541"
      },
      {
         "name": "Federico Bohn",
         "id": "1437063175"
      },
      {
         "name": "Melisa Mariana Borrego",
         "id": "1440579320"
      },
      {
         "name": "Benjamin Pollo del Castillo",
         "id": "1442853178"
      },
      {
         "name": "Axel del Viso",
         "id": "1446477974"
      },
      {
         "name": "Shamuna Bar",
         "id": "1447393835"
      },
      {
         "name": "Mar\u00eda Jos\u00e9 Morelli",
         "id": "1451695042"
      },
      {
         "name": "Federico Mesa Stortini",
         "id": "1452347473"
      },
      {
         "name": "BlackAnt La Hormiga Negra",
         "id": "1463842303"
      },
      {
         "name": "Javi Siebert",
         "id": "1471622095"
      },
      {
         "name": "Gast\u00f3n Schwab",
         "id": "1478160626"
      },
      {
         "name": "Damian Gomez",
         "id": "1481532882"
      },
      {
         "name": "Dami\u00e1n Banfi",
         "id": "1486014991"
      },
      {
         "name": "Maca Urrutia",
         "id": "1486125809"
      },
      {
         "name": "Gonzalo Emanuel Angueira",
         "id": "1488067285"
      },
      {
         "name": "Tomas Andrews",
         "id": "1488091992"
      },
      {
         "name": "Carla Agustina",
         "id": "1496971314"
      },
      {
         "name": "Federico Suarez",
         "id": "1500077829"
      },
      {
         "name": "Guillermo Miguel Blanco",
         "id": "1500704166"
      },
      {
         "name": "Guille Gomez",
         "id": "1510454057"
      },
      {
         "name": "Emi Wacky",
         "id": "1526572615"
      },
      {
         "name": "Cintia Canale",
         "id": "1526945277"
      },
      {
         "name": "Ariel Anabitarte",
         "id": "1537094360"
      },
      {
         "name": "Simon Nogueira",
         "id": "1541148907"
      },
      {
         "name": "Daniel Capoduri",
         "id": "1542092209"
      },
      {
         "name": "Dario del Castillo",
         "id": "1543368131"
      },
      {
         "name": "Victor Cangelosi",
         "id": "1562177689"
      },
      {
         "name": "Emmanuel Panesci",
         "id": "1562678772"
      },
      {
         "name": "Cristian Branciforte",
         "id": "1567298257"
      },
      {
         "name": "Mamet Veronica",
         "id": "1567742245"
      },
      {
         "name": "Anabela Rabitti",
         "id": "1576645259"
      },
      {
         "name": "Marcos Andes",
         "id": "1577846820"
      },
      {
         "name": "Taylor R Crowell",
         "id": "1595786940"
      },
      {
         "name": "Veronica Morales",
         "id": "1610296232"
      },
      {
         "name": "Luciana Maldonado",
         "id": "1613139945"
      },
      {
         "name": "Agustina Gomez",
         "id": "1622611440"
      },
      {
         "name": "Cristian Salgado",
         "id": "1633417685"
      },
      {
         "name": "Juan Manuel Lobos",
         "id": "1654166570"
      },
      {
         "name": "Melisa Rodriguez",
         "id": "1659706932"
      },
      {
         "name": "Matias Porcellatti",
         "id": "1786264890"
      },
      {
         "name": "Grupo De Teatro Clowntudos",
         "id": "1834766370"
      },
      {
         "name": "Jorge Alberto Capoduri",
         "id": "1836046159"
      },
      {
         "name": "Planeta Empanada",
         "id": "100000022859286"
      },
      {
         "name": "Day Gil",
         "id": "100000055607449"
      },
      {
         "name": "Florencia Bertoldi",
         "id": "100000087123518"
      },
      {
         "name": "Nico Chiapparo",
         "id": "100000158623480"
      },
      {
         "name": "Maxx Martinez Cassano",
         "id": "100000190597463"
      },
      {
         "name": "Betiana Bueno",
         "id": "100000228297692"
      },
      {
         "name": "Emiliano Andrada",
         "id": "100000266483999"
      },
      {
         "name": "Luciano Saade",
         "id": "100000390493856"
      },
      {
         "name": "Gabriel Damiani",
         "id": "100000401503366"
      },
      {
         "name": "Ricardo Jose Lamas",
         "id": "100000431497117"
      },
      {
         "name": "Nico Paletta",
         "id": "100000481790176"
      },
      {
         "name": "Eliana Seijas",
         "id": "100000525661441"
      },
      {
         "name": "Kaboom Estudio",
         "id": "100000536243561"
      },
      {
         "name": "Andres GonzaloFotografo",
         "id": "100000733299158"
      },
      {
         "name": "Libertino Farias",
         "id": "100000735764977"
      },
      {
         "name": "Sonia Schechtel",
         "id": "100000806763006"
      },
      {
         "name": "Mauro Alejandro",
         "id": "100000869344671"
      },
      {
         "name": "Mingo Sili",
         "id": "100000898224107"
      },
      {
         "name": "Beeluu Jara",
         "id": "100000977042910"
      },
      {
         "name": "Rugir Sport",
         "id": "100000978892814"
      },
      {
         "name": "Ivan Sili",
         "id": "100001085211321"
      },
      {
         "name": "Ale Jacinto",
         "id": "100001265679136"
      },
      {
         "name": "Feria Del Libro BBca",
         "id": "100001292821043"
      },
      {
         "name": "Moshi Love Deco",
         "id": "100001301073998"
      },
      {
         "name": "Shuchuan Wang",
         "id": "100001349143368"
      },
      {
         "name": "Emilio Sili",
         "id": "100001562632497"
      },
      {
         "name": "Stella Maris Morante",
         "id": "100001569146901"
      },
      {
         "name": "Carolina Gisele Zudaire",
         "id": "100001596064763"
      },
      {
         "name": "M\u00f3nica Trecaman",
         "id": "100001781100320"
      },
      {
         "name": "Erika Cartes",
         "id": "100001828008751"
      },
      {
         "name": "La Pa\u00f1oleta",
         "id": "100001981639832"
      },
      {
         "name": "Omar Coria",
         "id": "100002172732299"
      }
   ];
	this.ajaxReply;
	
	this.connectResponse = function(data){
		//response of GET 
		alert('response face: ' + data);
		if(data.indexOf(this.tokenUrl) != -1){ //existe token
			this.isConnected = true;
			this.token = data.slice(data.indexOf(this.tokenUrl) + this.tokenUrl.length, data.indexOf("&"));
			this.token = '"' + this.token + '"';
			//alert(this.token);
			this.token = eval(this.token);
			/*this.token = this.token.replace("\\u", "|");
			this.token = this.token.replace("\\u", "|");*/
			//alert('connected!: ' + this.token);
			this.element.style.display = 'none';
			this.onConnect();
		}else{
			//alert('no connected');
		};
		this.element.innerHTML = data;
	};
	
	this.error = function(data, error){
		//handle error
		alert('FB.error');
	};
	
	this.setUrl = function(app_id, display){
		this.url = 'https://www.facebook.com/dialog/oauth?client_id=' + app_id + '&scope=publish_stream&redirect_uri=http://www.facebook.com/connect/login_success.html&display=' + display +'&response_type=token';
		//this.url = 'https://graph.facebook.com/oauth/authorize?client_id=' + app_id + '&scope=publish_stream&redirect_uri=http://www.facebook.com/connect/login_success.html&display=' + display +'&response_type=token';
		
		//alert('connecting: ' +uri);
		/*jq = $.ajax({
			type: 'GET',
			url: uri,
			success: function(data){
				alert(data);
				//alert(jq.getAllResponseHeaders());
				alert(this.url);
				var browserDiv = document.createElement('nav');
				browserDiv.style.position = 'absolute';
				browserDiv.style.top = '0px';
				browserDiv.style.left = '0px';
				browserDiv.style.width = '320px';
				browserDiv.style.height = '480px'
				browserDiv.innerHTML = data;
				document.body.appendChild(browserDiv);			
			},
			error: function(data, error){
				alert(error + ' : ' + data.toString());
			}
		});

		//https://www.facebook.com/dialog/oauth?client_id=213255638692367&scope=publish_stream&redirect_uri=http://www.facebook.com/connect/login_success.html&display=touch&response_type=token

		jq = $.ajax({
			type: 'GET',
			url: uri,
			success: FBConnect.connectResponse,
			error: FBConnect.error
		});
		
		jq.success(FBConnect.connectResponse);
		jq.error(function(){ alert('peligro!'); })*/
	}

	this.post = function(msg)
	{	
		//alert('post: ' + msg);
		var uri = "https://graph.facebook.com/me/feed";
		postdata = {
			access_token: this.token,
			message: msg
		};
		//$.post(url, {message: msg, access_token: FB.token}, function(data){ alert(data); });
		this.ajaxReply = $.ajax({
			url: uri,
			type: 'POST',
			contentType: 'multipart/form-data',
			data: postdata, 
			success: function(data){ alert('success: ' + data); },
			//error: function(data, error, r){ alert('error: ' + data.responseText + error + r); }
		});
		//alert('termine el post');
	};
	
	this.retrieveUserData = function(){
		postdata = {
			access_token: this.token		
		};
		self = this;
		this.ajaxReply = $.ajax({
			url: 'https://graph.facebook.com/me',
			type: 'GET',
			data: postdata,
			//success: function(data){ alert('success: ' + data); self.setUserData(data); },
			success: this.setUserData,
			//error: function(data, er, r){ alert(data.responseText + ':' + er + ':' +r); }
		});
	};

	this.retrieveFriendsData = function(){
		postdata = {
			access_token: this.token		
		};
		self = this;
		this.ajaxReply = $.ajax({
			url: 'https://graph.facebook.com/me/friends',
			type: 'GET',
			data: postdata,
			//success: function(data){ alert('success: ' + data); self.setUserData(data); },
			success: this.setFriendsArray,
			//error: function(data, er, r){ alert(data.responseText + ':' + er + ':' +r); }
		});
	};
	
	/*this.setUserData = function(data){
		this.user = eval('(' + data + ')');
	};*/

	this.onConnect; 
}

FBConnect.prototype.setUserData = function(data){
	//alert(data);
	this.user = eval('(' + data + ')');
};

FBConnect.prototype.setFriendsArray = function(data) {
	alert(data);
	var arr = eval('(' + data + ')');
	for(i = 0; i < arr.data.length; ++i){
		this.friendsArray.push(arr.data[i].id);
	};
};