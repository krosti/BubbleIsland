// -------------------------------------------------------------------------
// CONFIG
// -------------------------------------------------------------------------
var Playtomic = {};
Playtomic.Temp = {};
Playtomic.SWFID = 0;
Playtomic.GUID = "";
Playtomic.Enabled = true;
Playtomic.SourceURL = "";
Playtomic.APIUrl = "";
Playtomic.Pings = 0;
Playtomic.FailCount = 0;
Playtomic.ScriptHolder = null;
Playtomic.Beacon = new Image();

// -------------------------------------------------------------------------
// LOGGING
// -------------------------------------------------------------------------
Playtomic.Log = {};
Playtomic.Log.Request = new PlaytomicRequest();
Playtomic.Log.Plays = 0;
Playtomic.Log.Pings = 0;
Playtomic.Log.FirstPing = true;

// unique, logged metrics
Playtomic.Log.Customs = new Array();
Playtomic.Log.LevelCounters = new Array();
Playtomic.Log.LevelAverages = new Array();
Playtomic.Log.LevelRangeds = new Array();

Playtomic.Log.View = function(swfid, guid, defaulturl)
{
	if(Playtomic.SWFID > 0)
		return;

	Playtomic.SWFID = swfid;
	Playtomic.GUID = guid;
	PLAYTOMIC_ENABLED = true;

	if((Playtomic.SWFID == 0 || Playtomic.GUID == ""))
	{
		Playtomic.Enabled = false;
		return;
	}
	
	Playtomic.SourceURL = escape(defaulturl ? defaulturl : document.location);

	if(Playtomic.SourceURL == null || Playtomic.SourceURL == "")
	{
		Playtomic.Enabled = false;
		return;
	}

	Playtomic.APIUrl = "http://g" + Playtomic.GUID + ".api.playtomic.com/";

	// Create our script holder
	Playtomic.ScriptHolder = document.createElement("div");
	Playtomic.ScriptHolder.style.position = "absolute";
	document.getElementsByTagName("body")[0].appendChild(Playtomic.ScriptHolder);

	// Log the view (first or repeat visitor)
	var views = Playtomic.GetCookie("views");
	views++;
	Playtomic.SetCookie("views", views);
	Playtomic.Log.Send("v/" + views, true);

	// Start the play timer
	setTimeout(Playtomic.Log.Ping, 60000);
}

Playtomic.Log.Play = function()
{	
	if(!Playtomic.Enabled)
		return;

	Playtomic.Log.LevelCounters = new Array();
	Playtomic.Log.LevelAverages = new Array();
	Playtomic.Log.LevelRangeds = new Array();
	Playtomic.Log.Plays++;
	Playtomic.Log.Send("p/" + Playtomic.Plays);
}

Playtomic.Log.Ping = function()
{
	if(!Playtomic.Enabled)
		return;
		
	Playtomic.Log.Pings++;
	Playtomic.Log.Send("t/" + (Playtomic.FirstPing ? "y" : "n") + "/" + Playtomic.Pings, true);
		
	if(Playtomic.Log.FirstPing)
	{
		setInterval(Playtomic.Log.Ping, 30000);
		Playtomic.Log.FirstPing = false;
	}
}
		
Playtomic.Log.CustomMetric = function(name, group, unique)
{
	if(!Playtomic.Enabled)
		return;

	if(group == null || group == undefined)
		group = "";

	if(unique)
	{
		if(Playtomic.Log.Customs.indexOf(name) > -1)
			return;

		Playtomic.Log.Customs.push(name);
	}
		
	Playtomic.Log.Send("c/" + Playtomic.Clean(name) + "/" + Playtomic.Clean(group));
}

Playtomic.Log.LevelCounterMetric = function(name, level, unique)
{		
	if(!Playtomic.Enabled)
		return;

	if(unique)
	{
		if(Playtomic.Log.LevelCounters.indexOf(name) > -1)
			return;

		Playtomic.Log.LevelCounters.push(name);
	}
	
	Playtomic.Log.Send("lc/" + Playtomic.Clean(name) + "/" + Playtomic.Clean(level));
}

Playtomic.Log.LevelRangedMetric = function(name, level, valu, uniquee)
{			
	if(!Playtomic.Enabled)
		return;

	if(unique)
	{
		if(Playtomic.Log.LevelRangeds.indexOf(name) > -1)
			return;

		Playtomic.Log.LevelRangeds.push(name);
	}
	
	Playtomic.Log.Send("lr/" + Playtomic.Clean(name) + "/" + Playtomic.Clean(level) + "/" + value);
}

Playtomic.Log.LevelAverageMetric = function(name, level, value, unique)
{
	if(!Playtomic.Enabled)
		return;

	if(unique)
	{
		if(Playtomic.Log.LevelAverages.indexOf(name) > -1)
			return;

		Playtomic.Log.LevelAverages.push(name);
	}
	
	Playtomic.Log.Send("la/" + Playtomic.Clean(name) + "/" + Playtomic.Clean(level) + "/" + value);
}

Playtomic.Log.Send = function(data, forcesend)
{
	Playtomic.Log.Request.Queue(data);

	if(Playtomic.Log.Request.Ready || forcesend)
	{
		Playtomic.Log.Request.Send();
		Playtomic.Log.Request = new PlaytomicRequest();
	}
}

Playtomic.Log.ForceSend = function()
{
	Playtomic.Log.Request.Send();
	Playtomic.Log.Request = new PlaytomicRequest();
}

function PlaytomicRequest()
{
	this.Data = "";
	this.Pieces = 0;
	this.Ready = false;

	this.Queue = function(data)
	{
		if(Playtomic.FailCount > 3)
			return;

		this.Pieces++;
		this.Data += (this.Data == "" ? "" : "~") + data;

		if(this.Pieces == 8 || this.Data.length > 300)
		{
			this.Ready = true;
		}
	}

	this.Send = function()
	{
		var s = document.createElement("script");
		s.async = true;
		s.src = Playtomic.APIUrl + "tracker/q.aspx?swfid=" + Playtomic.SWFID + "&q=" + this.Data + "&url=" + Playtomic.SourceURL + "&" + Math.random() + "z";
		Playtomic.ScriptHolder.innerHTML = "";
		Playtomic.ScriptHolder.appendChild(s);
	}
}

// -------------------------------------------------------------------------
// LEVEL SHARING
// -------------------------------------------------------------------------
Playtomic.PlayerLevels = {};

Playtomic.PlayerLevels.Save = function(level, callback)
{
	var postdata = "nothumb=true" +
					"&playerid=" + level.PlayerId + 
					"&playersource=" + escape(level.PlayerSource) +
					"&playername=" + escape(level.PlayerName) + 
					"&name=" + escape(level.Name);
	
	var c = 0;

	for(var key in level.CustomData)
	{
		postdata += "&ckey" + c + "=" + key;
		postdata += "&cdata" + c + "=" + escape(level.CustomData[key]);
		c++;
	}

	postdata += "&customfields=" + c;
	postdata += "&data=" + escape(level.Data);

	var bridge = function(response)
	{
		if(callback == null)
			return;

		callback(response.Data.LevelId, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: {LevelId: ""}};

	Playtomic.PostData(postdata, Playtomic.APIUrl + "playerlevels/save.aspx?swfid=" + Playtomic.SWFID + "&js=true", bridge, failvalue);
}

Playtomic.PlayerLevels.Load = function(levelid, callback)
{
	var bridge = function(response)
	{
		if(callback == null)
			return;

		callback(response.Data, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: {LevelId: "", PlayerName: "", PlayerId: "", Name: "", Score: 0, Votes: 0, Plays: 0, Rating: 0, Data: "", Thumbnail: "", CustomData: {}}};

	Playtomic.PostData("", Playtomic.APIUrl + "playerlevels/load.aspx?swfid=" + Playtomic.SWFID + "&levelid=" + levelid + "&js=true", bridge, failvalue);
}

Playtomic.PlayerLevels.List = function(callback, options)
{
	if(options == null)
		options = new Object();

	var mode = options.mode ? options.mode : "popular";
	var page = options.page ? options.page : 1;
	var perpage = options.perpage ? options.perpage : 20;
	var data = options.data || options.highest == false ? (options.data ? "y" : "n") : "n";
	var datemin = options.datemin ? options.datemin : "";
	var datemax = options.datemax ? options.datemax : "";

	var bridge = function(response)
	{
		if(callback == null)
			return;

		callback(response.Data.Levels, response.Data.NumLevels, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: { NumLevels: 0, Levels: []}};

	Playtomic.PostData("", Playtomic.APIUrl + "playerlevels/list.aspx?swfid=" + Playtomic.SWFID + "&js=true&mode=" + mode + "&page=" + page + "&perpage=" + perpage + "&data=" + data + "&datemin=" + datemin + "&datemax=" + datemax, bridge, failvalue);
}

Playtomic.PlayerLevels.Rate = function(levelid, rating, callback)
{
	var bridge = function(response)
	{
		if(callback == null)
			return;

		callback({Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1};

	Playtomic.PostData("", Playtomic.APIUrl + "playerlevels/rate.aspx?swfid=" + Playtomic.SWFID + "&levelid=" + levelid + "&rating=" + rating + "&js=true", bridge, failvalue);
}

// -------------------------------------------------------------------------
// LEADERBOARDS
// -------------------------------------------------------------------------
Playtomic.Leaderboards = {};

Playtomic.Leaderboards.List = function(table, callback, options)
{
	if(options == null)
		options = new Object();

	var global = options.global || options.global == false ? options.global : true;
	var highest = options.highest || options.highest == false ? options.highest : true;
	var mode = options.mode ? options.mode : "alltime";
	var customfilters = options.customfilters ? options.customfilters : {};
	var page = options.page ? options.page : 1;
	var perpage = options.perpage ? options.perpage : 20;

	var bridge = function(response)
	{
		if(callback == null)
			return;

		Playtomic.Leaderboards.ListComplete(response, callback);
	}

	var postdata = "";
	var numcustomfilters = 0;

	for(var x in customfilters)
	{
		postdata += "&ckey" + numcustomfilters + "=" + x;
		postdata += "&cdata" + numcustomfilters + "=" + customfilters[x];
		numcustomfilters++;
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: {Scores: [], NumScores: 0}};

	Playtomic.PostData(postdata, Playtomic.APIUrl + "leaderboards/list.aspx?swfid=" + Playtomic.SWFID + "&js=true&url=" + (global ? "global" : Playtomic.SourceURL) + "&table=" + escape(table) + "&mode=" + mode + "&filters=" + numcustomfilters + "&page=" + page + "&perpage=" + perpage, bridge, failvalue);
}

Playtomic.Leaderboards.ListFB = function(table, callback, options)
{
	if(options == null)
		options = new Object();
	
	var global = options.global || options.global == false ? options.global : true;
	var highest = options.highest || options.highest == false ? options.highest : true;
	var friendslist = options.friendslist ? options.friendslist : new Array();
	var mode = options.mode ? options.mode : "alltime";
	var customfilters = options.customfilters ? options.customfilters : {};
	var page = options.page ? options.page : 1;
	var perpage = options.perpage ? options.perpage : 20;

	var bridge = function(response)
	{
		if(callback == null)
			return;

		Playtomic.Leaderboards.ListComplete(response, callback);
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: {Scores: [], NumScores: 0}};

	var postdata = "friendslist=" + friendslist.join(",");
	var numcustomfilters = 0;

	for(var x in customfilters)
	{
		postdata += "&ckey" + numcustomfilters + "=" + x;
		postdata += "&cdata" + numcustomfilters + "=" + customfilters[x];
		numcustomfilters++;
	}

	Playtomic.PostData(postdata, Playtomic.APIUrl + "leaderboards/listfb.aspx?swfid=" + Playtomic.SWFID + "&js=true&url=" + (global ? "global" : Playtomic.SourceURL) + "&mode=" + mode + "&filters=" + numcustomfilters + "&table=" + escape(table) + "&page=" + page + "&perpage=" + perpage, bridge, failvalue);
}

Playtomic.Leaderboards.ListComplete = function(response, callback)
{
	if(callback == null)
		return;

	var scores = [];
	var arr = response.Data.Scores;

	for(var i=0; i<arr.length; i++)
	{
		var score = {};
		score.Name = Playtomic.Unescape(arr[i].Name);
		score.FBUserId = arr[i].FBUserId;
		score.Points = arr[i].Points;
		score.Website = arr[i].Website;
		score.SDate = arr[i].SDate;
		score.RDate = arr[i].RDate;
		score.CustomData = {};

		for(x in arr[i].CustomData)
			score.CustomData[x] = Playtomic.Unescape(arr[i].CustomData[x]);

		scores[i] = score;
	}

	callback(scores, response.Data.NumScores, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
}

Playtomic.Leaderboards.Submit = function(score, table, callback, options)
{
	if(options == null)
		options = new Object();
		
	var allowduplicates = options.allowduplicates || options.allowduplicates == false ? options.allowduplicates : false;
	var highest = options.highest || options.highest == false ? options.highest : true;

	var postdata = "table=" + escape(table) + 
					"&name=" + escape(score.Name) + 
					"&points=" + score.Points + 
					"&allowduplicates=" + (allowduplicates ? "y" : "n") + 
					"&highest=" + (highest ? "y" : "n") + 
					"&auth=" + Playtomic.MD5(Playtomic.SourceURL + score.Points.toString());
	
	var c = 0;

	if(score.CustomData)
	{
		for(var key in score.CustomData)
		{
			postdata += "&ckey" + c + "=" + key;
			postdata += "&cdata" + c + "=" + escape(level.CustomData[key]);
			c++;
		}
	}

	postdata += "&customfields=" + c;

	var bridge = function(response)
	{
		if(callback == null)
			return;

		callback({Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: {}};

	Playtomic.PostData(postdata, Playtomic.APIUrl + "leaderboards/save.aspx?swfid=" + Playtomic.SWFID + "&js=true&url=" + Playtomic.SourceURL, bridge, failvalue);
}

Playtomic.Leaderboards.SubmitFB = function(score, table, callback, options)
{
	if(options == null)
		options = new Object();
		
	var allowduplicates = options.allowduplicates || options.allowduplicates == false ? options.allowduplicates : false;
	var highest = options.highest || options.highest == false ? options.highest : true;

	var postdata = "table=" + escape(table) + 
					"&name=" + escape(score.Name) + 
					"&points=" + score.Points + 
					"&allowduplicates=" + (allowduplicates ? "y" : "n") + 
					"&auth=" + Playtomic.MD5(Playtomic.SourceURL + score.Points.toString()) +
					"&fbuserid=" + score.FBUserId + 
					"&highest=" + (highest ? "y" : "n") + 
					"&fb=y";
	
	var c = 0;

	if(score.CustomData)
	{
		for(var key in score.CustomData)
		{
			postdata += "&ckey" + c + "=" + key;
			postdata += "&cdata" + c + "=" + escape(score.CustomData[key]);
			c++;
		}
	}

	postdata += "&customfields=" + c;

	var bridge = function(response)
	{
		if(callback == null)
			return;

		callback({Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: {}};

	Playtomic.PostData(postdata, Playtomic.APIUrl + "leaderboards/save.aspx?swfid=" + Playtomic.SWFID + "&js=true&url=" + Playtomic.SourceURL, bridge, failvalue);
}

// -------------------------------------------------------------------------
// DATA API
// -------------------------------------------------------------------------
Playtomic.Data = {};

Playtomic.Data.Views = function(callback, options)
{
	if(options == null)
		options = {};

	var day = options.day ? options.day : 0;
	var month = options.month ? options.month : 0;
	var year = options.year ? options.year : 0;

	Playtomic.Data.General("Views", callback, day, month, year);
}

Playtomic.Data.Plays = function(callback, options)
{
	if(options == null)
		options = {};

	var day = options.day ? options.day : 0;
	var month = options.month ? options.month : 0;
	var year = options.year ? options.year : 0;

	Playtomic.Data.General("Plays", callback, day, month, year);
}

Playtomic.Data.PlayTime = function(callback, options)
{
	if(options == null)
		options = {};

	var day = options.day ? options.day : 0;
	var month = options.month ? options.month : 0;
	var year = options.year ? options.year : 0;

	Playtomic.Data.General("PlayTime", callback, day, month, year);
}

Playtomic.Data.General = function(type, callback, day, month, year)
{
	var bridge = function(response)
	{
		if(callback == null)
			return;

		var data = {Name: type, Day: day, Month: month, Year: year, Value: response.Data.Value};
		callback(data, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCore: 1, Data: {Value: 0}};

	Playtomic.PostData("", Playtomic.APIUrl + "data/" + type + ".aspx?swfid=" + Playtomic.SWFID + "&js=true&day=" + day + "&month=" + month + "&year=" + year, bridge, failvalue);
}

Playtomic.Data.CustomMetric = function(metric, callback, options)
{
	if(options == null)
		options = {};

	var day = options.day ? options.day : 0;
	var month = options.month ? options.month : 0;
	var year = options.year ? options.year : 0;

	var bridge = function(response)
	{
		if(callback == null)
			return;

		var data = {Name: "CustomMetric", Metric: metric, Day: day, Month: month, Year: year, Value: response.Data.Value};
		callback(data, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCore: 1, Data: {Value: 0}};

	Playtomic.PostData("", Playtomic.APIUrl + "data/custommetric.aspx?swfid=" + Playtomic.SWFID + "&metric=" + escape(metric) + "&js=true&day=" + day + "&month=" + month + "&year=" + year, bridge, failvalue);
}

Playtomic.Data.LevelCounterMetric = function(metric, level, callback, options)
{
	if(options == null)
		options = {};

	var day = options.day ? options.day : 0;
	var month = options.month ? options.month : 0;
	var year = options.year ? options.year : 0;

	var bridge = function(response)
	{
		if(callback == null)
			return;

		var data = {Name: "LevelCounterMetric", Metric: metric, Level: level, Day: day, Month: month, Year: year, Value: response.Data.Value};
		callback(data, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: {Value: 0}};

	Playtomic.Data.LevelMetric("counter", metric, level, bridge, day, month, year, failvalue);
}

Playtomic.Data.LevelRangedMetric = function(metric, level, callback, options)
{
	if(options == null)
		options = {};

	var day = options.day ? options.day : 0;
	var month = options.month ? options.month : 0;
	var year = options.year ? options.year : 0;

	var bridge = function(response)
	{
		if(callback == null)
			return;

		var data = {Name: "LevelRangedMetric", Metric: metric, Level: level, Day: day, Month: month, Year: year, Data: response.Data.Values};
		callback(data, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: {Values: []}};

	Playtomic.Data.LevelMetric("ranged", metric, level, bridge, day, month, year, failvalue);
}

Playtomic.Data.LevelAverageMetric = function(metric, level, callback, options)
{
	if(options == null)
		options = {};

	var day = options.day ? options.day : 0;
	var month = options.month ? options.month : 0;
	var year = options.year ? options.year : 0;

	var bridge = function(response)
	{
		if(callback == null)
			return;

		var data = {Name: "LevelAverageMetric", Metric: metric, Level: level, Day: day, Month: month, Year: year, Min: response.Data.Min, Max: response.Data.Max, Average: response.Data.Average};
		callback(data, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: {Min: 0, Max: 0, Average: 0}};

	Playtomic.Data.LevelMetric("average", metric, level, bridge, day, month, year, failvalue);
}

Playtomic.Data.LevelMetric = function(mode, metric, level, callback, day, month, year, failvalue)
{
	Playtomic.PostData("", Playtomic.APIUrl + "data/levelmetric" + mode + ".aspx?swfid=" + Playtomic.SWFID + "&metric=" + escape(metric) + "&level=" + escape(level) + "&js=true&day=" + day + "&month=" + month + "&year=" + year, callback, failvalue);
}

// -------------------------------------------------------------------------
// GEOIP
// -------------------------------------------------------------------------
Playtomic.GeoIP = {};
Playtomic.GeoIP.Lookup = function(callback)
{
	var bridge = function(response)
	{
		if(callback == null)
			return;

		callback(response.Data, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: {Code: "N/A", Country: "UNKNOWN"}};

	Playtomic.PostData("", Playtomic.APIUrl + "geoip/lookup.aspx?swfid=" + Playtomic.SWFID + "&js=true", bridge, failvalue);
}

// -------------------------------------------------------------------------
// GAME VARS
// -------------------------------------------------------------------------
Playtomic.GameVars = {};
Playtomic.GameVars.ERROR = 0;
Playtomic.GameVars.SUCCESS = 1;
Playtomic.GameVars.Load = function(callback)
{
	var bridge = function(response)
	{
		if(callback == null)
			return;

		var obj = {};
		var vars = response.Data;

		for(var i=0; i< vars.length; i++)
			obj[vars[i].Name] =  vars[i].Value;

		callback(obj, {Success: response.Status == 1, ErrorCode: response.ErrorCode});
	}

	var failvalue = {Status: 0, ErrorCode: 1, Data: []};

	Playtomic.PostData("", Playtomic.APIUrl + "gamevars/load.aspx?swfid=" + Playtomic.SWFID + "&js=true", bridge, failvalue);
}


// -------------------------------------------------------------------------
// MISCELLANEOUS
// -------------------------------------------------------------------------
Playtomic.PostData = function(postdata, script, callback, failvalue)
{
	var request;

	if(window.XDomainRequest)
	{
		request = new XDomainRequest(); 
		request.timeout = 4000;
		request.onerror = function()
		{
			callback(failvalue);
		}

		request.onload = function()
		{
			var data = request.responseText;
			callback(JSON.parse(data));
		}

		if(postdata != "")
		{
			request.open("POST", script);
			request.send(postdata);
		}
		else
		{
			request.open("GET", script);
			request.send();
		}
	}
	else
	{
		request = new XMLHttpRequest();

		request.onerror = function()
		{
			callback(failvalue);
		}

		request.onload = function()
		{
			var data = request.responseText;
			callback(JSON.parse(data));
		}

		if(postdata != "")
		{
			request.open("POST", script, true);
			request.send(postdata);
		}
		else
		{
			request.open("GET", script, true);
			request.send();
		}

	}
}

Playtomic.SetCookie = function(key, value)
{
	var expires = new Date();
	expires.setDate(expires.getDate() + 30);

	document.cookie = key + "=" + escape(value) + ";expires=" + expires.toUTCString();
}

Playtomic.GetCookie = function(key)
{
	if(document.cookie.length > 0)
	{
		var start = document.cookie.indexOf(key + "=");

		if (start != -1)
		{
			start = start + key.length + 1;
			var end = document.cookie.indexOf(";", start);
			
			if (end == -1) 
			{
				end = document.cookie.length;
			}

			return unescape(document.cookie.substring(start, end));
		}
	}

	return 0;
}

Playtomic.Clean = function(s)
{
	return escape(s.replace("/", "\\").replace("~", "-"));
}

Playtomic.Unescape = function(s)
{
	return unescape(s).replace(/\+/g, ' ');
}

/*
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009 See http://pajhome.org.uk/crypt/md5 for more info.
 */
Playtomic.MD5 = function(str)
{
	var bitOR = function(a, b)
	{
		var lsb = (a & 0x1) | (b & 0x1);
		var msb31 = (a >>> 1) | (b >>> 1);

		return (msb31 << 1) | lsb;
	}

	var bitXOR = function(a, b)
	{			
		var lsb = (a & 0x1) ^ (b & 0x1);
		var msb31 = (a >>> 1) ^ (b >>> 1);

		return (msb31 << 1) | lsb;
	}

	var bitAND = function(a, b)
	{ 
		var lsb = (a & 0x1) & (b & 0x1);
		var msb31 = (a >>> 1) & (b >>> 1);

		return (msb31 << 1) | lsb;
	}

	var addme = function(x, y)
	{
		var lsw = (x & 0xFFFF)+(y & 0xFFFF);
		var msw = (x >> 16)+(y >> 16)+(lsw >> 16);

		return (msw << 16) | (lsw & 0xFFFF);
	}

	var rhex = function(num)
	{
		var str = "";
		var j;

		for(j=0; j<=3; j++)
			str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((num >> (j * 8)) & 0x0F);

		return str;
	}

	var str2blks_MD5 = function(str)
	{
		var nblk = ((str.length + 8) >> 6) + 1;
		var blks = new Array(nblk * 16);
		var i;

		for(i=0; i<nblk * 16; i++) 
			blks[i] = 0;
															
		for(i=0; i<str.length; i++)
			blks[i >> 2] |= str.charCodeAt(i) << (((str.length * 8 + i) % 4) * 8);

		blks[i >> 2] |= 0x80 << (((str.length * 8 + i) % 4) * 8);

		var l = str.length * 8;
		blks[nblk * 16 - 2] = (l & 0xFF);
		blks[nblk * 16 - 2] |= ((l >>> 8) & 0xFF) << 8;
		blks[nblk * 16 - 2] |= ((l >>> 16) & 0xFF) << 16;
		blks[nblk * 16 - 2] |= ((l >>> 24) & 0xFF) << 24;

		return blks;
	}

	var rol = function(num, cnt)
	{
		return (num << cnt) | (num >>> (32 - cnt));
	}

	var cmn = function(q, a, b, x, s, t)
	{
		return addme(rol((addme(addme(a, q), addme(x, t))), s), b);
	}

	var ff = function(a, b, c, d, x, s, t)
	{
		return cmn(bitOR(bitAND(b, c), bitAND((~b), d)), a, b, x, s, t);
	}

	var gg = function(a, b, c, d, x, s, t)
	{
		return cmn(bitOR(bitAND(b, d), bitAND(c, (~d))), a, b, x, s, t);
	}

	var hh = function(a, b, c, d, x, s, t)
	{
		return cmn(bitXOR(bitXOR(b, c), d), a, b, x, s, t);
	}

	var ii = function(a, b, c, d, x, s, t)
	{
		return cmn(bitXOR(c, bitOR(b, (~d))), a, b, x, s, t);
	}

	var x = str2blks_MD5(str);
	var a =  1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d =  271733878;
	var i = 0;
	var hex_chr = "0123456789abcdef";

	for(i=0; i<x.length; i += 16)
	{
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;

		a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
		d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
		c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
		b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
		a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
		d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
		c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
		b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
		a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
		d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
		c = ff(c, d, a, b, x[i+10], 17, -42063);
		b = ff(b, c, d, a, x[i+11], 22, -1990404162);
		a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
		d = ff(d, a, b, c, x[i+13], 12, -40341101);
		c = ff(c, d, a, b, x[i+14], 17, -1502002290);
		b = ff(b, c, d, a, x[i+15], 22,  1236535329);    
		a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
		d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
		c = gg(c, d, a, b, x[i+11], 14,  643717713);
		b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
		a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
		d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
		c = gg(c, d, a, b, x[i+15], 14, -660478335);
		b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
		a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
		d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
		c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
		b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
		a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
		d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
		c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
		b = gg(b, c, d, a, x[i+12], 20, -1926607734);
		a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
		d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
		c = hh(c, d, a, b, x[i+11], 16,  1839030562);
		b = hh(b, c, d, a, x[i+14], 23, -35309556);
		a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
		d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
		c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
		b = hh(b, c, d, a, x[i+10], 23, -1094730640);
		a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
		d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
		c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
		b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
		a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
		d = hh(d, a, b, c, x[i+12], 11, -421815835);
		c = hh(c, d, a, b, x[i+15], 16,  530742520);
		b = hh(b, c, d, a, x[i+ 2], 23, -995338651);
		a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
		d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
		c = ii(c, d, a, b, x[i+14], 15, -1416354905);
		b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
		a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
		d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
		c = ii(c, d, a, b, x[i+10], 15, -1051523);
		b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
		a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
		d = ii(d, a, b, c, x[i+15], 10, -30611744);
		c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
		b = ii(b, c, d, a, x[i+13], 21,  1309151649);
		a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
		d = ii(d, a, b, c, x[i+11], 10, -1120210379);
		c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
		b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

		a = addme(a, olda);
		b = addme(b, oldb);
		c = addme(c, oldc);
		d = addme(d, oldd);
	}

	return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

// json parsing from http://www.json.org
/*
    http://www.JSON.org/json2.js
    2010-08-25

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());