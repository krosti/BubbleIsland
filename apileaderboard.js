api.leaderboard = {};
api.leaderboard.url = 'http://betatester.borealdev.com.ar/api/leaderboard/index.php';
//api.leaderboard.url = 'http://www.nestororiolo.com.ar/bb/index.php';

//api.leaderboard.url = 'http://puzzlebubble.eudaimonia.com.ar/api/leaderboard/index.php';
api.leaderboard.xhr = null;

api.leaderboard.save = function(id, name, points){
	var uid = (id ? id : 0);
	var uname = (name ? name : " ");
	var postdata = {
		to: 'store',
		id: uid,
		name: uname,
		points: points
	};	

	$.ajax({
		url: api.leaderboard.url,
		type: 'POST',
		data: postdata,		
		dataType: "text",
		//contentType: 'application/x-www-form-urlencoded',
		success: api.leaderboard.savecallback,
		error: api.leaderboard.saveerror //function(a, b, c){ /*alert(a+b+c);*/}//api.leaderboard.saveerror
		/*complete: function(response){
			alert(response);
			if(response.status == 200){
				//api.leaderboard.savecallback(response.responseText);
			};
		}*/
	});
};

api.leaderboard.savecallback = function(data){
	var response = api.string2JSON(data);
	//alert(response.status);
	if(response.status == 1){
		api.leaderboard.saveok(response);
	}else{
		api.leaderboard.saveerror();
	};
};

api.leaderboard.saveok = function(){};
api.leaderboard.saveerror = function(){};

api.leaderboard.list = function(id, callback, friends, init, count, type_span){
	var initpage = (init ? init : 0);
	var perpage = (count ? count : 5);
	var friendsarray  = (friends != undefined) ? friends : [];
	var span = (type_span ? type_span : "");

	var postdata = {
		to: 'list',
		id: id,
		friends: friendsarray,
		init: initpage,
		count: perpage,
		type_span: span
	};	

	api.leaderboard.listcomplete = callback;

	$.ajax({
		url: api.leaderboard.url,
		type: 'POST',
		data: postdata,
		dataType: "text",
		success: callback,//api.leaderboard.listcallback,
		error: api.leaderboard.listerror
	});	
};

api.leaderboard.listcallback = function(data){
	var response = api.string2JSON(data);
	//alert(data);
	if(status == 1){
		api.leaderboard.listok(response);
	}else{
		api.leaderboard.listerror();
	};	
};

api.leaderboard.listok = function(){};
api.leaderboard.listerror = function(){};

api.leaderboard.rank = function(type_span){
	var span = (type_span ? type_span : "");

	var postdata = {
		to: 'rank',
		id: id,
		name: name,
		points: points,
		type_span: span
	};	

	$.ajax({
		url: api.leaderboard.url,
		type: 'POST',
		data: postdata,
		dataType: "text",
		success: api.leaderboard.rankcallback,
		error: api.leaderboard.rankerror
	});	
};

api.leaderboard.rankme = function(id, callback, type_span){
	var span = (type_span ? type_span : "");
	var postdata = {
		id: id,
		to: 'rank',
		type_span: span
	};	
	
	api.leaderboard.rankcallback = callback;

	$.ajax({
		url: api.leaderboard.url,
		type: 'POST',
		data: postdata,
		dataType: "text",
		success: callback,
		error: api.leaderboard.rankerror,
		complete: function(response){
			//alert(api.JSON2String(response));
			/*if(response.status == 200){
				api.leaderboard.rankcallback(response.responseText);
			}else{
				api.levels.responseError();
			};*/
		}
	});	
};

api.leaderboard.rankcallback = function(data){
	var result = api.string2JSON(data);
	if(result.status == 1){
		api.leaderboard.rankok(result.response);
	}else{
		api.leaderboard.rankerror();
	};
};

api.leaderboard.rankok = function(){};
api.leaderboard.rankerror = function(){};