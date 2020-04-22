
var currentel = null;


$('input').focus(function(event) {
    currentel = this;
    setTimeout(function(){currentel.setSelectionRange(0, 9999);},30);

});

var messiStats = new Array(0,0,0,0,0,0,0,0,0,0,0);
var playerStats = messiStats.slice(0);

function StatInfo(statName,statMin,statMax) {
    this.statName = statName;
    this.statMin = statMin;
    this.statMax = statMax;
}


var statLabels = new Array();
statLabels[0] = new StatInfo("Non-Penalty Goals",0.12,0.60);
statLabels[1] = new StatInfo("Shots",1.7,4.5);
statLabels[2] = new StatInfo("Shooting%",27,55);
statLabels[3] = new StatInfo("Passing%",65,85);
statLabels[4] = new StatInfo("Assists",0.08,0.40);
statLabels[5] = new StatInfo("Key Passes",1.12,3.0);
statLabels[6] = new StatInfo("Throughballs",0.13,0.65);
statLabels[7] = new StatInfo("Int+Tackles",1.3,4.5);
statLabels[8] = new StatInfo("Dispossessed",3.0,1.0);
statLabels[9] = new StatInfo("Successful Dribbles",0.7,2.5);
statLabels[10] = new StatInfo("Goal Conversion%",4.5,22.5);

var cmdmLabels = new Array();
cmdmLabels[0] = new StatInfo("Passing%",74,90);
cmdmLabels[1] = new StatInfo("Key Passes",.70,2.5);
cmdmLabels[2] = new StatInfo("Throughballs",.10,0.50);
cmdmLabels[3] = new StatInfo("Scoring Contribution",.1,.5);
cmdmLabels[4] = new StatInfo("Successful Dribbles",0.5,2.1);
cmdmLabels[5] = new StatInfo("Dispossessed",2.47,.5);
cmdmLabels[6] = new StatInfo("Fouls",2.36,.6);
cmdmLabels[7] = new StatInfo("Dribbled Past",1.55,.35);
cmdmLabels[8] = new StatInfo("PAdj Tackles",1.65,4.25);
cmdmLabels[9] = new StatInfo("PAdj Int",1.31,3.55);
cmdmLabels[10] = new StatInfo("Long Balls",2,8);

var fbLabels = new Array();
fbLabels[0] = new StatInfo("PAdj Tackles",1.73,4.11);
fbLabels[1] = new StatInfo("PAdj Int",1.5,3.7);
fbLabels[2] = new StatInfo("Passing%",69.84,86.8);
fbLabels[3] = new StatInfo("Key Passes",0.47,1.46);
fbLabels[4] = new StatInfo("Comp. Crosses",0.32,1.21);
fbLabels[5] = new StatInfo("Crossing %",14.84,33);
fbLabels[6] = new StatInfo("Successful Dribbles",0.4,1.62);
fbLabels[7] = new StatInfo("Dispossessed",1.17,0.23);
fbLabels[8] = new StatInfo("Aerial Wins",0.72,2.38);
fbLabels[9] = new StatInfo("Dribbled Past",1.23,0.3);
fbLabels[10] = new StatInfo("Fouls",1.76,0.54);

var cbLabels = new Array();
cbLabels[0] = new StatInfo("Passing%",72.72,90);
cbLabels[1] = new StatInfo("PAdj Dribbled Past",0.96,0.16);
cbLabels[2] = new StatInfo("PAdj Tackles",1.4,3.43);
cbLabels[3] = new StatInfo("PAdj Interceptions",1.6,4);
cbLabels[4] = new StatInfo("Blocks",0.47,1.17);
cbLabels[5] = new StatInfo("PAdj Clearances",4.62,10.4);
cbLabels[6] = new StatInfo("Fouls",1.7,0.5);
cbLabels[7] = new StatInfo("Aerial Wins %",53.6,76);
cbLabels[8] = new StatInfo("Aeriel Wins",1.3,3.93);
cbLabels[9] = new StatInfo("Long Ball %",48.68,77.2);
cbLabels[10] = new StatInfo("Long Balls",2.74,7.05);


var curStats = statLabels;

var canvasHeight = 650;
var canvasWidth = 650;
var labelFontSize = 10;
var valueFontSize = 10;
var numrings = 5;
var rotOffset = -Math.PI/2;//(statLabels.length)/2;

function reassign() {

    //canvasHeight = parseInt(document.getElementById("cheight").value); 
    //canvasWidth = parseInt(document.getElementById("cwidth").value); 
    curStats = new Array();
    var count = 0;
    for(var j = 0; j < 11; j++) {
        if(document.getElementById("name"+j).value != "") {
            
            curStats[count] = new StatInfo(document.getElementById("name"+j).value,parseFloat(document.		getElementById	("min"+j).value),parseFloat(document.getElementById("max"+j).value));
            playerStats[count] = parseFloat(document.getElementById("stat"+j).value)
            count++;
        }
    
    }

}

function drawPlot() {

reassign();

var playerColor = "rgba(225, 0, 0, 0.6)"

cx = 0; // x offset
cy = 0; // y offset
r = Math.min(canvasWidth,canvasHeight)/2 - 50;

// set canvas size
var c = document.getElementById("myCanvas");
c.width = canvasWidth;
c.height = canvasHeight;

// get context and set it up
var ctx = c.getContext("2d");
ctx.translate(canvasWidth/2, canvasHeight/2);
ctx.imageSmoothingEnabled = true;

// draw rings
lw = r/(numrings*2);
ctx.save();
ctx.strokeStyle="#cdcdcd";
ctx.lineWidth = lw;
for(var i = 0; i < numrings; i++) {

    ctx.beginPath();
    ctx.arc(cx,cy,r/numrings*(i+1)-lw/2,0,2*Math.PI);
    ctx.closePath();
    ctx.stroke();

}
ctx.restore();

var gdots = new Array();
var rdots = new Array();

// draw player stats
ctx.save();
ctx.fillStyle = playerColor;
ctx.beginPath();
for (var i = 0; i < curStats.length; i++) { 
    
    statg = 0;
    statr = 0;
    
    rad = (2*Math.PI/curStats.length)*i + rotOffset;
    newr = 2*lw + 8*lw*(playerStats[i]-curStats[i].statMin)/(curStats[i].statMax-curStats[i].statMin);//Math.		random()	*r;
    if(newr > r) {
        newr = r;
        statg = 1;
    }
    if(newr < 0) {
        newr = 0;
        statr = 1;
    }
    
    newy = newr*Math.sin(rad);
    newx = newr*Math.cos(rad);
    
    if(statg == 1)
        gdots[gdots.length] = new Array(newx,newy);
    if(statr == 1)
        rdots[rdots.length] = new Array(newx,newy);
        
    
    if(i == 0)
        ctx.moveTo(cx+newx, cy+newy);
    else
        ctx.lineTo(cx+newx, cy+newy);

}

ctx.closePath();
ctx.fill();
ctx.restore();


// draw labels
ctx.save();
ctx.fillStyle = "black";
ctx.font = "bold " + labelFontSize + "px Arial";
ctx.textAlign = "center";
for (var i = 0; i < curStats.length; i++) { 

    rad = (2*Math.PI/curStats.length)*i + rotOffset;

    ctx.save();
    
    if((rad < Math.PI)&&(rad > 0)) {
        ctx.rotate(rad-Math.PI/2);
        ctx.fillText(curStats[i].statName, 0, r+20);
        for(var j = 0; j < 9; j++) {
            ctx.font = "bold " + valueFontSize + "px Arial";
            ctx.fillText(Math.round((curStats[i].statMin+j*(curStats[i].statMax-curStats[i].statMin)/8)*1000)	/	1000, 0	, (r/(numrings*2))*(j+1)+lw+3);
        }
    } else {
        ctx.rotate(rad+Math.PI/2);
        ctx.fillText(curStats[i].statName, 0, -r-15);
        for(var j = 0; j < 9; j++) {
            ctx.font = "bold " + valueFontSize + "px Arial";
            ctx.fillText(Math.round((curStats[i].statMin+j*(curStats[i].statMax-curStats[i].statMin)/8)*1000)	/	1000, 0	, -(r/(numrings*2))*(j+1)-lw+valueFontSize/2);
        }
    }
    
    
    ctx.restore();

}

ctx.restore();

var dataURL = c.toDataURL();

      // set canvasImg image src to dataURL
      // so it can be saved as an image
document.getElementById('canvasImg').src = dataURL;

$('.console').remove();
}

function fillFWAM() {
    for(var i = 0; i < statLabels.length; i++) {
        document.getElementById('name'+i).value = statLabels[i].statName;
        document.getElementById('min'+i).value = statLabels[i].statMin;
        document.getElementById('max'+i).value = statLabels[i].statMax;
    }
}

function fillCMDM() {
    for(var i = 0; i < cmdmLabels.length; i++) {
        document.getElementById('name'+i).value = cmdmLabels[i].statName;
        document.getElementById('min'+i).value = cmdmLabels[i].statMin;
        document.getElementById('max'+i).value = cmdmLabels[i].statMax;
    }
}

function fillFB() {
    for(var i = 0; i < cmdmLabels.length; i++) {
        document.getElementById('name'+i).value = fbLabels[i].statName;
        document.getElementById('min'+i).value = fbLabels[i].statMin;
        document.getElementById('max'+i).value = fbLabels[i].statMax;
    }
}

function fillCB() {
    for(var i = 0; i < cmdmLabels.length; i++) {
        document.getElementById('name'+i).value = cbLabels[i].statName;
        document.getElementById('min'+i).value = cbLabels[i].statMin;
        document.getElementById('max'+i).value = cbLabels[i].statMax;
    }
}


