//on resolver page//
let v;
let playerInfo;

$(document).ready(function() {


window.setTimeout(() => getDataLoc(),300);
window.setTimeout(() => drawPlot(),1000)
//window.setTimeout(() => additional(),2000);

});

let posistion = '';
function getDataLoc(){
    v = window.location.href
    console.log(v)
    let s = v.search('\\?');
    if(s==-1){
        //error?notprovidedarrayinbase64
        window.location="https://dl769.github.io/whoscoredradars/help.html"
    }else{
        console.log(s)
        s=s+1;
        console.log(s)
        v = v.slice(s);
            v = atob(v);
            v = JSON.parse(v)
            
            playerInfo = [...v]
            playerInfo[41] = playerInfo[41]+playerInfo[42];//position might be in one of those
            console.log(playerInfo)
            if(playerInfo[41].search("Midfielder")>0 && playerInfo[41].search("Forward")<0){
                posistion = 'midfield'
            }
            if(playerInfo[41].search("Defensive Midfielder")>0){
                posistion = 'midfield'
            }
            if(playerInfo[41].search("Attacking Midfielder")>0 || playerInfo[41].search("Forward")>0){
                posistion = 'attack'
            }
            if(playerInfo[41].search("Defender (Left)")>0 || playerInfo[41].search("Defender (Right)")>0){
                posistion = 'fullback'
            }
            if(playerInfo[41].search("Defender (Centre)")>0){
                posistion = 'centreback'
            }

            let positionText;
            if(posistion == 'attack') {
                fillFWAM()
                positionText ="FW/AM"
            }
            if(posistion == 'midfield') {
                fillCMDM()
                positionText ="CM/DM"
            }
            if(posistion == 'fullback') {
                fillFB()
                positionText ="FB"
            }
            if(posistion == 'centreback') {
                fillCB()
                positionText ="CB"
            }
            
            
            console.log(posistion)
            putValues()

            const tempLg = playerInfo[38].lastIndexOf('>');
            playerInfo[38].slice(tempLg)
            
            $('h1').html('<div id="wrapimg"><img src="'+playerInfo[39]+'"></div><div id="wraptxt">'+playerInfo[40]+' <br>'+positionText+' Template'+'<br><a id="leagueandseason">'+playerInfo[38]+' 19/20</a></div>')
    }
}
function info(){
    window.alert('Template stats for radars and drawing from @drivelinebases, @cboutaud')
}

function putValues(){
    let tempGames = playerInfo[0]/90;
    let tempConversion = playerInfo[3] * tempGames;
    tempConversion = playerInfo[1] / tempConversion *100;

console.log(tempGames,tempConversion)
    if(posistion == 'attack'){
        $('#stat0').val(playerInfo[36] + playerInfo [37]) //NPG OK
        $('#stat1').val(playerInfo[3])                    //SPG OK
        $('#stat2').val(playerInfo[34]/playerInfo[3]*100) //SHOOTING% OK
        $('#stat3').val(playerInfo[4])                    //PASSING% OK
        $('#stat4').val(playerInfo[2] / tempGames)        //ASSISTS OK
        $('#stat5').val(playerInfo[11])                   //KEYP OK
        $('#stat6').val(playerInfo[20])                   //THROUGHBALLS OK
        $('#stat7').val(playerInfo[5] + playerInfo [6])   //INT+TACKLES OK
        $('#stat8').val(playerInfo[15])                   //DISPOSS OK
        $('#stat9').val(playerInfo[12])                   //SUCCDRBL OK
        $('#stat10').val(tempConversion)                  //GOALCNVRS OK
    }
    if(posistion == 'midfield'){
        let goalsandassists = playerInfo[1]+playerInfo[2]
        $('#stat0').val(playerInfo[4])                    //PASSING% OK
        $('#stat1').val(playerInfo[11])                   //KEYP OK
        $('#stat2').val(playerInfo[20])                   //THROUGHBALLS OK
        $('#stat3').val(0)      //???? goalcontr
        $('#stat4').val(playerInfo[12])                   //SUCCDRBL OK
        $('#stat5').val(playerInfo[15])                   //DISPOSS OK
        $('#stat6').val(playerInfo[25])                   //FOULS OK
        $('#stat7').val(playerInfo[10])                   //DRBLPAST OK
        $('#stat8').val(playerInfo[6])                    //TACKL OK_TOBEADJ
        $('#stat9').val(playerInfo[7])                    //INT OK_TOBEADJ
        $('#stat10').val(playerInfo[4])                   //LONGBALLS OK
    }
    if(posistion == 'centreback'){
        let blocks = playerInfo[27] + playerInfo[28] + playerInfo[29];
        $('#stat0').val(playerInfo[4])                    //PASSING% OK
        $('#stat1').val(playerInfo[10])                   //DRBLPAST OK_TOBEADJ
        $('#stat2').val(playerInfo[5])                    //TACKL OK_TOBEADJ
        $('#stat3').val(playerInfo[6])                    //INT OK_TOBEADJ
        $('#stat4').val(blocks)                           //BLOCKS OK
        $('#stat5').val(playerInfo[26])                   //CLEARANCES OK
        $('#stat6').val(playerInfo[8])                    //FOULS OK
        $('#stat7').val(0)                   //AERIALW% ??
        $('#stat8').val(playerInfo[5])                    //AERIALW OK
        $('#stat9').val(0)                    //LONGBALL% ??
        $('#stat10').val(playerInfo[4])                   //LONGBALLS OK
    }
    if(posistion == 'fullback'){
        let blocks = playerInfo[27] + playerInfo[28] + playerInfo[29];
        $('#stat0').val(playerInfo[5])                    //TACKL OK_TOBEADJ
        $('#stat1').val(playerInfo[6])                    //INT OK_TOBEADJ
        $('#stat2').val(playerInfo[4])                    //PASSING% OK
        $('#stat3').val(playerInfo[11])                   //KEYP OK
        $('#stat4').val(playerInfo[18])                   //compcrosses OK
        $('#stat5').val(0)          //CROSS% ???
        $('#stat6').val(playerInfo[12])                   //SUCCDRBL OK
        $('#stat7').val(playerInfo[15])                   //DISPOSS OK
        $('#stat8').val(playerInfo[5])                    //AERIALW OK
        $('#stat9').val(playerInfo[10])                   //DRBLPAST OK
        $('#stat10').val(playerInfo[8])                    //FOULS OK
    }


}

