LeaderBoard = {
	divGen: '',
	divFB: ''
};

function SubmitScore()
{
    var simple_score = {};
    simple_score.Name = FB.user.name;
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
        alert("Score saved!");		
    }
    else
    {
        // submission failed because of response.ErrorCode
    }
}

function retrieveLeaderboard(divGen, divFB){
	LeaderBoard.divGen = document.getElementById(divGen);
	LeaderBoard.divFB = document.getElementById(divFB);
	Playtomic.Leaderboards.ListFB("highscores", retrieveFacebookLeaderboard, { friendslist: FB.friendsArray });
	Playtomic.Leaderboards.List("highscores", retrieveGeneralLeaderboard);
};

function retrieveGeneralLeaderboard(scores, numscores, response){
	alert(response);
	if(response.Success)
    {
        alert(scores.length + " scores returned out of " + numscores);
				
        for(var i = 0; i<scores.length; i++)
        {
            var score = scores[i];
            alert(" - " + score.Name + " got " + score.Points + " on " + score.SDate);
            
            // including custom data?  score.CustomPlaytomic.Data.Property
        }
    }
    else
    {
        // score listing failed because of response.ErrorCode
    }
};

function retrieveFacebookLeaderboard(scores, numscores, response){
	alert(response);
	if(response.Success)
    {
        alert(scores.length + " scores returned out of " + numscores);
				
        for(var i=0; i<scores.length; i++)
        {
            var score = scores[i];
            alert(" - " + score.Name + " got " + score.Points + " on " + score.SDate);
            
            // including custom data?  score.CustomPlaytomic.Data.Property
        }
    }
    else
    {
        // score listing failed because of response.ErrorCode
    }
};