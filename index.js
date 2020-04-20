//on resolver page//
let v
$(document).ready(function() {


window.setTimeout(() => getData(),500);
window.setTimeout(() => draw(),1500);

});
function getData(){
        v = window.location.href
        v = v.replace('https://dl769.github.io/whoscoredradars/?','')
        v = atob(v);
        v = JSON.parse(v)
        
        let playerStats = [...v]
}

function draw(){
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

}