

$('a[href="#player-tournament-stats-passing"]');

let s = $('a[href="#player-tournament-stats-offensive"]');

s.click();

let playerStats = [];

window.setTimeout(function(){

    window.setTimeout(function(){
        $(".minsPlayed").click()
        window.setTimeout(()=> offensive(), 750)
    },100)

    window.setTimeout(function(){
        s = $('a[href="#player-tournament-stats-passing"]');
        s.click();
        window.setTimeout(()=>  $(".minsPlayed").click(), 750)
        window.setTimeout(() => passings(),1500);
    },2500)

    window.setTimeout(function(){
        s = $('a[href="#player-tournament-stats-detailed"]');
        s.click();
        window.setTimeout(() => $(".minsPlayed").click(),750);
        window.setTimeout(() => $("#category").val('shots').change(),1500); 
        window.setTimeout(function(){$("#subcategory").val('accuracy').change()},2200);
        window.setTimeout(() => detailed(),3000);
    },7500)

    window.setTimeout(function(){
        s = $('a[href="#player-tournament-stats-defensive"]');
        s.click();
        window.setTimeout(()=>  $(".minsPlayed").click(), 750)
        window.setTimeout(() => defensive(),1500);
    },12500)

    window.setTimeout(function(){
        window.setTimeout(() => convertVal(),500);
    },15000)


},500)

function offensive(){

    playerStats.push($('.player-picture').attr('src'));
    playerStats.push($('td.keyPassPerGame').html());
    playerStats.push($('td.minsPlayed').html());
    playerStats.push($('td.goal').html());
    playerStats.push($('td.assistTotal').html());
    playerStats.push($('td.shotsPerGame').html());
    playerStats.push($('td.keyPassPerGame').html());
    playerStats.push($('td.dribbleWonPerGame').html());
    playerStats.push($('td.foulGivenPerGame').html());
    playerStats.push($('td.dispossessedPerGame').html());
}


function passings(){

    playerStats.push($('td.totalPassesPerGame').html());
    playerStats.push($('td.passSuccess').html());
    playerStats.push($('td.accurateThroughBallPerGame').html());

}



function detailed(){

    playerStats.push($('td.shotsTotal').html());
    playerStats.push($('td.shotOnTarget').html());
    
}



function defensive(){

    playerStats.push($('td.interceptionPerGame').html());
    playerStats.push($('td.tacklePerGame').html());
    playerStats.push($('td.wasDribbledPerGame').html());
    playerStats.push($('td.tournament a').html());

}

function convertVal(){
    playerStats = playerStats.map(el=>el.slice(0,-1));
    playerStats = playerStats.map(el=>el=parseFloat(el));

    let p90 = playerStats[2]/90;
    let assistsp90 = playerStats[4]/p90;
    let goalsp90 = playerStats[3]/p90;
    playerStats.push(assistsp90);
    playerStats.push(goalsp90);
    let shootingPr = playerStats[14]/playerStats[13];
    playerStats.push(shootingPr)

    playerStats[0] = $('.player-picture').attr('src');
    playerStats[18] = $('td.tournament a').html();
    playerStats[18] =  playerStats[18].replace(`<span class=\"ui-icon country flg-gb-eng\"></span>`,"")
    playerStats.push($('h2').html());
    playerStats[22] = playerStats[22].slice(0,-10)

    window.setTimeout(()=> goBackWithData(),750)
}

function goBackWithData(){
    playerStats = JSON.stringify(playerStats);
    playerStats = btoa(playerStats);
    window.location.href = "http://dl769.github.io/whoscoredradars/?"+playerStats; 
}
