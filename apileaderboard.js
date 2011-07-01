api.leaderboard = {};
//api.leaderboard.url = 'http://betatester.borealdev.com.ar/api/leaderboard/index.php';
api.leaderboard.url = 'http://puzzlebubble.eudaimonia.com.ar/api/leaderboard/index.php';
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

	api.leaderboard.xhr = $.ajax({
		type: 'POST',
		data: postdata,
		url: api.leaderboard.url,
		//contentType: 'application/x-www-form-urlencoded',
		success: api.leaderboard.savecallback,
		error: api.leaderboard.saveerror//function(a, b, c){ /*alert(a+b+c);*/}//api.leaderboard.saveerror
	});
};

api.leaderboard.savecallback = function(data){
	//alert(data);
	var response = api.string2JSON(data);
	if(response.status == 1){
		api.leaderboard.saveok(response);
	}else{
		//alert('error');
		api.leaderboard.saveerror();
	};
};

api.leaderboard.saveok = function(){};
api.leaderboard.saveerror = function(){};

api.leaderboard.list = function(id, callback, friends, init, count){
	var initpage = (init ? init : 0);
	var perpage = (count ? count : 5);
	var friendsarray  = (friends != undefined) ? friends : [];

	var postdata = {
		to: 'list',
		id: 0,
		friends: friendsarray,
		init: initpage,
		count: perpage
	};	

	$.ajax({
		url: api.leaderboard.url,
		type: 'POST',
		data: postdata,
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

api.leaderboard.rank = function(){
	var postdata = {
		to: 'rank',
		FBid: id,
		name: name,
		points: points
	};	

	$.ajax({
		url: api.leaderboard.url,
		type: 'POST',
		data: postdata,
		success: api.leaderboard.rankcallback,
		error: api.leaderboard.rankerror
	});	
};

api.leaderboard.rankcallback = function(data){
	
};

api.leaderboard.rankok = function(){};
api.leaderboard.rankerror = function(){};