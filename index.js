//on resolver page//
let v;
let playerStats;

$(document).ready(function() {


window.setTimeout(() => getDataLoc(),500);
window.setTimeout(() => drawFWAM(),1500);
window.setTimeout(() => additional(),2000);

});

function getData(){
        v = window.location.href
        v = v.replace('https://dl769.github.io/whoscoredradars/?','')
        v = atob(v);
        v = JSON.parse(v)
        
        playerStats = [...v]
}
function getDataLoc(){
    v = window.location.href
    console.log(v)
    let s = v.search('\\?');
    console.log(s)
    s=s+1;
    console.log(s)
    v = v.slice(s);
        v = atob(v);
        v = JSON.parse(v)
        
        playerStats = [...v]
}
function additional(){
    $('.additional').html('<center><img src="'+playerStats[0]+'"></center>')
}

function drawFWAM(){
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Goals','Shots','Shooting %','Passing %','Assists','Key Passes', 'Throughballs', 'Int+Tackles', 'Lost Possesion', 'Dribbles'],
            datasets: [
                {
                    backgroundColor: 'rgba(255, 0, 0, 0.4)',
                    label: playerStats[22] + ' ' + playerStats[18] +'19/20' , 
                    data: [playerStats[20],playerStats[5],playerStats[21],playerStats[11]*0.1,playerStats[19],playerStats[1],playerStats[12],playerStats[13]+playerStats[14],playerStats[9],playerStats[7]]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });

}