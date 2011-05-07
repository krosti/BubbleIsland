function FBConnect(elementId){
	//init FBConnect
	alert('initializing');
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
	
	this.connectResponse = function(data){
		//response of GET 
		alert('response: ' + data);
		if(data.indexOf(this.tokenUrl) != -1){ //existe token
			this.isConnected = true;
			this.token = data.slice(data.indexOf(this.tokenUrl), data.indexOf("&"));
			alert('connected!: ' + this.token);
			this.onConnect();
		}else{
			alert('no connected');
		};
		this.element.innerHTML = data;
	};
	
	this.error = function(data, error){
		//handle error
		alert('error');
	};
	
	this.setUrl = function(app_id, display){
		this.url = 'https://www.facebook.com/dialog/oauth?client_id=' + app_id + '&scope=publish_stream&redirect_uri=http://www.facebook.com/connect/login_success.html&display=' + display +'&response_type=token';
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
		var url = "https://graph.facebook.com/me/feed";
		//$.post(url, {message: msg}, function(data){ alert(data); });
	}

	this.onConnect; 
}


/*
FBConnect.prototype.post = function(msg)
{
	var url = "https://graph.facebook.com/me/feed";
	//$.post(url, {message: msg}, function(data){ alert(data); });
}
*/