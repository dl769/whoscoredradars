
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


// .loadingT {
//     margin-left: -1em;
//     position: fixed;
//     border: 1px solid #000;
//     height: 120%;
//     width: 101%;
//     background: #FFF;
//     background-color: #541C41;
  
//   }
//   .loadingText {
//     text-align: center;
//     color: white;
//     padding-top: 20%;
//     font-size: xx-large;
//   }

/* <div class="loadingT">
<div class="loadingText">
    
    
    <div class="loader">Loading...</div>
    <a class="progressLOADING">LOADING...</a>

</div>
</div> */




$('head').append(`<div class="loadingT">
<div class="loadingText">
    
    
    <div class="loader">Loading...</div>
    <a class="progressLOADING">LOADING...</a>

</div>
</div> 
`)
$('loadingT').css("border","21px solid #000");

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
    s = $('a[href="#player-tournament-stats-detailed"]');
    s.click();
    $("#category").val('shots').change()
    window.setTimeout(function(){$("#subcategory").val('accuracy').change()},350);
    

    window.setTimeout(() => detailed(),500);
    },1000)


}



function detailed(){


    playerStats.push($('td.shotsTotal').html());
    playerStats.push($('td.shotOnTarget').html());

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
    let shootingPr = playerStats[14]/playerStats[13];
    playerStats.push(shootingPr)


    window.setTimeout(()=> goBackWithData(),750)
}

function goBackWithData(){
    playerStats = JSON.stringify(playerStats);
    playerStats = btoa(playerStats);
    window.location.href = "http://dl769.github.io/portfolipage/?"+playerStats; 
}

//on resolver page//
let v = window.location.href
v = v.replace('http://dl769.github.io/whoscoredradars/?',"")
v = atob(v);
v = JSON.parse(v)

//todofinish

$.getScript( "https://cdn.jsdelivr.net/npm/chart.js@2.8.0", function( data, textStatus, jqxhr ) {
    console.log( data ); // Data returned
    console.log( textStatus ); // Success
    console.log( jqxhr.status ); // 200
    console.log( "Load was performed." );
  });


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
