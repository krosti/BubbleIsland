api.bonus = {};
api.bonus.url = 'http://betatester.borealdev.com.ar/api/bonus/';

api.bonus.getBonus = function(id, callback, errorCallback){
	callback = callback ? callback : api.bonus.bonusResponse;
	
	var postdata = {
		to: 'get',
		id: id
	};
		
	api.bonus.callback = callback;
	
	$.ajax({
		url: api.bonus.url,
		type: 'POST',
		data: postdata,
		success: callback,
		error: errorCallback,
		complete: function(response){
			if(response.status == 200){
				api.bonus.callback(response.responseText);
			};
		}
	});
};

api.bonus.callback = null;

api.bonus.bonusResponse = function(data){
	var response = api.string2JSON(data);
	if(response.status == 1){
		api.bonus.currentBonus(response.response.bonus);
	}else{
		api.bonus.currentBonus(0);
	};
};

api.bonus.currentBonus = function(bonus){};