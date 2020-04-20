
// function t(){
//     //https://stackoverflow.com/questions/15005500/loading-cross-domain-endpoint-with-jquery-ajax
//     console.log('runnging CORS')
    
//         $.get("https://images"+~~(Math.random()*33)+"-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURI('https://fbref.com/en/players/e342ad68/Mohamed-Salah'), function(data) {
            
//             console.log(data)
//         $('body').append(data);
//         });
//     }

    
// let s = $('a[href="#player-tournament-stats-offensive"]');

// s.click();

// let playerStats = [];

// window.setTimeout(function(){
// offensive()
// },500)

// function offensive(){
//     s = $('a[href="#player-tournament-stats-passing"]');
//     s.click();
    
//     playerStats.push($('.player-picture').attr('src'));
//     playerStats.push($('td.keyPassPerGame').html());
//     playerStats.push($('td.minsPlayed').html());
//     playerStats.push($('td.goal').html());
//     playerStats.push($('td.assistTotal').html());
//     playerStats.push($('td.shotsPerGame').html());
//     playerStats.push($('td.keyPassPerGame').html());
//     playerStats.push($('td.dribbleWonPerGame').html());
//     playerStats.push($('td.foulGivenPerGame').html());
//     playerStats.push($('td.dispossessedPerGame').html());

//     window.setTimeout(function(){
//         s = $('a[href="#player-tournament-stats-passing"]');
//         s.click();

//         window.setTimeout(() => passings(),500);
//         },1000)
// }


// function passings(){


// playerStats.push($('td.totalPassesPerGame').html());
// playerStats.push($('td.passSuccess').html());
// playerStats.push($('td.accurateThroughBallPerGame').html());

// window.setTimeout(function(){
//     s = $('a[href="#player-tournament-stats-defensive"]');
//     s.click();

//     window.setTimeout(() => defensive(),500);
//     },1000)


// }

// function defensive(){

// playerStats.push($('td.interceptionPerGame').html());
// playerStats.push($('td.tacklePerGame').html());
// playerStats.push($('td.wasDribbledPerGame').html());
// playerStats.push($('td.tournament a').html());

// window.setTimeout(function() {
  
//  convertVal();
// },1000);
// }

// function convertVal(){
//     playerStats = playerStats.map(el=>el.slice(0,-1));
//     playerStats = playerStats.map(el=>el=parseFloat(el));
// }






let s = $('a[href="#player-tournament-stats-offensive"]');

s.click();

let playerStats = [];

window.setTimeout(function(){
offensive()
},500)

function offensive(){
    s = $('a[href="#player-tournament-stats-passing"]');
    s.click();
    
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

    window.setTimeout(function(){
        s = $('a[href="#player-tournament-stats-passing"]');
        s.click();

        window.setTimeout(() => passings(),500);
        },1000)
}


function passings(){


playerStats.push($('td.totalPassesPerGame').html());
playerStats.push($('td.passSuccess').html());
playerStats.push($('td.accurateThroughBallPerGame').html());

window.setTimeout(function(){
    s = $('a[href="#player-tournament-stats-defensive"]');
    s.click();

    window.setTimeout(() => defensive(),500);
    },1000)


}

function defensive(){

playerStats.push($('td.interceptionPerGame').html());
playerStats.push($('td.tacklePerGame').html());
playerStats.push($('td.wasDribbledPerGame').html());
playerStats.push($('td.tournament a').html());

window.setTimeout(function() {
  
 convertVal();
},1000);
}

function convertVal(){
    playerStats = playerStats.map(el=>el.slice(0,-1));
    playerStats = playerStats.map(el=>el=parseFloat(el));

    let p90 = playerStats[2]/90;
    let assistsp90 = playerStats[4]/p90;
    let goalsp90 = playerStats[3]/p90;
    playerStats.push(assistsp90);
    playerStats.push(goalsp90);


}


$.getScript( "https://cdn.jsdelivr.net/npm/chart.js@2.8.0", function( data, textStatus, jqxhr ) {
    console.log( data ); // Data returned
    console.log( textStatus ); // Success
    console.log( jqxhr.status ); // 200
    console.log( "Load was performed." );
  });

  window.setTimeout(()=> draw(),1000);
  $('body').append('<canvas id="myChart" width="800" height="600"></canvas>')
function draw(){
    $.getScript( "https://cdn.jsdelivr.net/npm/chart.js@2.8.0", function( data, textStatus, jqxhr ) {
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Successfull Dribbles','Lost possesion','Shots per game','Passing %','Key pass per game','Throughballs', 'Assists/90min', 'Goals/90min'],
                datasets: [
                    {
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        label: "Player",
                        data: [playerStats[1],playerStats[2],playerStats[3],playerStats[4],playerStats[5],playerStats[6],playerStats[7],playerStats[8],playerStats[9]]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
      });

}
