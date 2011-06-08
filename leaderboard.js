var LeaderBoard = {
	divGen: '',
	divFB: '',
    highscore: 10000000
};

function SubmitScore()
{
    var score = {};
    score.Name = 'Shaka';
    score.FBUserId = 1454082351;
    score.Points = 1234;

    var saveoptions = {
        facebook : true,
        highest: true,
        allowduplicates: false
    };

    var listoptions = {
        perpage: 5,
        friendslist: []
    };

    //Playtomic.Leaderboards.SaveAndList(score, "highscores", SubmitComplete, saveoptions, listoptions);
    Playtomic.Leaderboards.SaveAndList(score, "highscores", SubmitComplete, saveoptions, listoptions);
    /*var simple_score = {};
    simple_score.Name = 'Shaka';//api.facebook.user.name;
    simple_score.FBUserId = 123456789//api.facebook.user.id;
    simple_score.Points = 1234//game.ui.acumuledPoints;

    // submit to the highest-is-best table "highscores"
	var score_data = {
		facebook : true,
		highest: true,
		allowduplicates: false
	};

    Playtomic.Leaderboards.SaveAndList(simple_score, "highscores", SubmitComplete, score_data);*/
}

function SubmitComplete(score, num, response)
{
    alert(api.JSON2String(score));
    alert(api.JSON2String(num));
    alert(api.JSON2String(response));
    if(response.Success){
        
    }else{
        
    };

}

function retrieveLeaderboard(divFB, divGen){
	LeaderBoard.divGen = document.getElementById(divGen);
	LeaderBoard.divFB = document.getElementById(divFB);
	Playtomic.Leaderboards.List("highscores", retrieveGeneralLeaderboard, { perpage: 5});
	//Playtomic.Leaderboards.List("highscores", retrieveFacebookLeaderboard, { facebook: true, friendslist: api.facebook.friends, perpage: 5 });
};

function retrieveGeneralLeaderboard(scores, numscores, response){
	//alert(api.JSON2String(scores));
	if(response.Success)
    {
        //alert(scores.length + " scores returned out of " + numscores);
        if(numscores == 0){ LeaderBoard.divGen.innerHTML('There is no scores to show'); };
				
        var text = '';
        text = '<table style="width: 100%">';
        for(var i = 0; i<scores.length; i++)
        {
            var score = scores[i];
            //alert(" - " + score.Name + " got " + score.Points + " on " + score.SDate);
            text += '<tr><td><img src="'+uiLeaderboardStar.src+'" alt="star"></td><td>' + score.Name + '</td><td style="text-align: right">' +score.Points+ '</td></tr>';
            // including custom data?  score.CustomPlaytomic.Data.Property
            if(i == 5) break;
        };
        text += '</table>';
        LeaderBoard.divGen.innerHTML = text;
    }
    else
    {
        // score listing failed because of response.ErrorCode
        api.ui.alert('Sorry, now we have a little problem with the leaderboards, please check it later', 'Ok');
    }
};

function retrieveFacebookLeaderboard(scores, numscores, response){
	//alert(api.JSON2String(scores));
	if(response.Success)
    {
        //alert(scores.length + " scores returned out of " + numscores);
        if(numscores == 0){ LeaderBoard.divFB.innerHTML('There is no scores to show'); };
				
        var text = '<table style="width: 100%">';
        for(var i = 0; i<scores.length; i++)
        {
            var score = scores[i];
            //alert(" - " + score.Name + " got " + score.Points + " on " + score.SDate);
            text += '<tr><td><img src="'+uiLeaderboardStar.src+'" alt="star">' + score.Name + '</td><td style="text-align: right">' +score.Points+ '</td></tr>';
            // including custom data?  score.CustomPlaytomic.Data.Property
            if(i == 5) break;
        };
        text += '</table>';
        LeaderBoard.divFB.innerHTML = text;
    }
    else
    {
        // score listing failed because of response.ErrorCode
        api.ui.alert('Sorry, now we have a little problem with the leaderboards, please check it later', 'Ok');
    }
};

function retrieveHighScore(){
    Playtomic.Leaderboards.List("highscores", function(scores, numscores, response){
        if(response.Success){
            if(numscores == 0) return;
            LeaderBoard.highscore = scores[0].Points;
        }; 
    }, { perpage: 1});
};