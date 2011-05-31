LeaderBoard = {
	divGen: '',
	divFB: ''
};

function SubmitScore()
{
    var simple_score = {};
    simple_score.Name = api.facebook.user.name;
    simple_score.Points = game.ui.acumuledPoints;

    // submit to the highest-is-best table "highscores"
	var score_data = {
		facebook : true,
		highest: true,
		allowduplicates: false
	};

    //Playtomic.Leaderboards.Submit(simple_score, "highscores", SubmitComplete, score_data);
}

function SubmitComplete(score, response)
{
    if(response.Success)
    {
        //alert("Score saved!");		
    }
    else
    {
        // submission failed because of response.ErrorCode
    }
}

function retrieveLeaderboard(divGen, divFB){
	LeaderBoard.divGen = document.getElementById(divGen);
	LeaderBoard.divFB = document.getElementById(divFB);
	Playtomic.Leaderboards.ListFB("highscores", retrieveFacebookLeaderboard, { friendslist: api.facebook.friends });
	Playtomic.Leaderboards.List("highscores", retrieveGeneralLeaderboard);
};

function retrieveGeneralLeaderboard(scores, numscores, response){
	//alert(response);
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
            text += '<tr><td><img src="'+uiLeaderboardStar.src+'" alt="star">' + score.Name + '</td><td style="text-align: right">' +score.Points+ '</td></tr>';
            // including custom data?  score.CustomPlaytomic.Data.Property
            if(i == 6) break;
        };
        text += '</table>';
        LeaderBoard.divGen.innerHTML(text);
    }
    else
    {
        // score listing failed because of response.ErrorCode
        api.ui.alert('Sorry, now we have a little problem with the leaderboards, please check it later', 'Ok');
    }
};

function retrieveFacebookLeaderboard(scores, numscores, response){
	//alert(response);
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
            if(i == 6) break;
        };
        text += '</table>';
        LeaderBoard.divFB.innerHTML(text);
    }
    else
    {
        // score listing failed because of response.ErrorCode
        api.ui.alert('Sorry, now we have a little problem with the leaderboards, please check it later', 'Ok');
    }
};