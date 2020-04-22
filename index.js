//on resolver page//
let v;
let playerStats;

$(document).ready(function() {


window.setTimeout(() => getDataLoc(),500);
//window.setTimeout(() => drawFWAM(),1500);
//window.setTimeout(() => additional(),2000);
window.setTimeout(() => recalculateData(),1000);

});
let tempNPG,tempShots,tempShooting;

function recalculateData(){
    //NPG =37+36
    tempNPG = playerStats[36] + playerStats [37];
    console.log(tempNPG);

    if(tempNPG<0.02 || tempNPG == undefined){
        tempNPG = 10;
    }
    if(tempNPG<0.07 && tempNPG>0.02){
        tempNPG = 20;
    }
    if(tempNPG >= 0.07 && tempNPG < 0.136){
        tempNPG = 30;
    }
    if(tempNPG >= 0.136 && tempNPG < 0.203){
        tempNPG = 40;
    }
    if(tempNPG >= 0.203 && tempNPG < 0.269){
        tempNPG = 50;
    }
    if(tempNPG >= 0.269 && tempNPG < 0.335){
        tempNPG = 60;
    }
    if(tempNPG >= 0.335 && tempNPG < 0.401){
        tempNPG = 70;
    }
    if(tempNPG >= 0.468 && tempNPG < 0.534){
        tempNPG = 80;
    }
    if(tempNPG >= 0.534 && tempNPG < 0.6){
        tempNPG = 90;
    }
    if(tempNPG >= 0.6 && tempNPG<1){
        tempNPG = 100;
    }

    //SHOTS
    if(playerStats[3]<0.05 || playerStats[3]==undefined){
        tempShots = 10;
    }
    if(playerStats[3]<1.4 && playerStats[3]>1.787){
        tempShots = 20;
    }
    if(playerStats[3] >= 1.787 && playerStats[3] < 2.175){
        tempShots = 30;
    }
    if(playerStats[3] >= 2.175 && playerStats[3] < 2.563){
        tempShots = 40;
    }
    if(playerStats[3] >= 2.563 && playerStats[3] < 2.95){
        tempShots = 50;
    }
    if(playerStats[3] >= 2.95 && playerStats[3] < 3.338){
        tempShots = 60;
    }
    if(playerStats[3] >= 3.338 && playerStats[3] < 3.725){
        tempShots = 70;
    }
    if(playerStats[3] >= 3.725 && playerStats[3] < 4.113){
        tempShots = 80;
    }
    if(playerStats[3] >= 4.113 && playerStats[3] < 4.5){
        tempShots = 90;
    }
    if(playerStats[3] >= 4.5 && playerStats[3]<5){
        tempShots = 100;
    }
    
    //SHOOTING%
    if(playerStats[3]<0.05 || playerStats[3]==undefined){
        tempShooting = 10;
    }
    if(playerStats[3]<1.4 && playerStats[3]>1.787){
        tempShooting = 20;
    }
    if(playerStats[3] >= 1.787 && playerStats[3] < 2.175){
        tempShooting = 30;
    }
    if(playerStats[3] >= 2.175 && playerStats[3] < 2.563){
        tempShooting = 40;
    }
    if(playerStats[3] >= 2.563 && playerStats[3] < 2.95){
        tempShooting = 50;
    }
    if(playerStats[3] >= 2.95 && playerStats[3] < 3.338){
        tempShooting = 60;
    }
    if(playerStats[3] >= 3.338 && playerStats[3] < 3.725){
        tempShooting = 70;
    }
    if(playerStats[3] >= 3.725 && playerStats[3] < 4.113){
        tempShooting = 80;
    }
    if(playerStats[3] >= 4.113 && playerStats[3] < 4.5){
        tempShooting = 90;
    }
    if(playerStats[3] >= 4.5 && playerStats[3]<5){
        tempShooting = 100;
    }
    
console.log(tempNPG);


drawFWAM();
}
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
    $('.additional').html('<center><img src="'+playerStats[39]+'"></center>')
}

function drawFWAM(){
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['NPG','Shots','Shooting %','Passing %','Assists','Key Passes', 'Throughballs', 'Int+Tackles', 'Lost Possesion', 'Dribbles'],
            datasets: [
                {
                    backgroundColor: 'rgba(255, 0, 0, 0.4)',
                    label: playerStats[40] + ' ' + playerStats[38] +'19/20' , 
                    data: [tempNPG,tempShots,tempShooting,playerStats[11]*0.1,playerStats[19],playerStats[1],playerStats[12],playerStats[13]+playerStats[14],playerStats[9],playerStats[7]]
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scale: {
                angleLines: {
                    display: false
                },
                ticks: {
                    suggestedMin: 5,
                    suggestedMax: 100
                }
            }
        }
    });

}