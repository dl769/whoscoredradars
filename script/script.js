//on resolver page//
let v;
let playerInfo;

$(document).ready(function() {


window.setTimeout(() => getDataLoc(),300);
window.setTimeout(() => checkTeamsGoals(),760)
window.setTimeout(() => drawPlot(),1500)
//window.setTimeout(() => additional(),2000);
window.setTimeout(()=> {
    console.log(teamBadge)
$('body').append(`<img src="${teamBadge}">`)
},3500)
});


let teamsGoalTotal,teamBadge;
let leagues=[];
leagues[0] = "Liverpool FCManchester City FCLeicester City FCChelsea FCManchester United FCWolverhampton Wanderers FCSheffield United FCTottenham Hotspur FCArsenal FCBurnley FCCrystal Palace FCEverton FCNewcastle United FCSouthampton FCBrighton & Hove Albion FCWest Ham United FCWatford FCAFC BournemouthAston Villa FCNorwich City FC"
leagues[1] = "Juventus FCSS LazioFC Internazionale MilanoAtalanta BCAS RomaSSC NapoliAC MilanHellas Verona FCParma Calcio 1913Bologna FC 1909US Sassuolo CalcioCagliari CalcioACF FiorentinaUdinese CalcioTorino FCUC SampdoriaGenoa CFCUS LecceSPAL 2013Brescia Calcio"
leagues[2] = "FC Bayern MünchenBV Borussia 09 DortmundRB LeipzigBorussia MönchengladbachBayer 04 LeverkusenFC Schalke 04VfL WolfsburgSC FreiburgTSG 1899 Hoffenheim1. FC Köln1. FC Union BerlinEintracht FrankfurtHertha BSCFC Augsburg1. FSV Mainz 05TSV Fortuna 95 DüsseldorfSV Werder BremenSC Paderborn 07"
leagues[3] = "FC BarcelonaReal Madrid CFSevilla FCReal Sociedad de FútbolGetafe CFClub Atlético de MadridValencia CFVillarreal CFGranada CFAthletic ClubCA OsasunaReal Betis BalompiéLevante UDDeportivo AlavésReal Valladolid CFSD EibarRC Celta de VigoRCD MallorcaCD LeganésRCD Espanyol de Barcelona"
leagues[4] = "Paris Saint-Germain FCOlympique de MarseilleStade Rennais FC 1901Lille OSCStade de ReimsOGC NiceOlympique LyonnaisMontpellier HSCAS Monaco FCAngers SCORC Strasbourg AlsaceFC Girondins de BordeauxFC NantesStade Brestois 29FC MetzDijon Football Côte d'OrAS Saint-ÉtienneNîmes OlympiqueAmiens SCToulouse FC"

let possession;
let teamsPossession;
function checkTeamsGoals(){
    let playersTeam = playerInfo[46];
    let q,_iter=0;
    let league,teamIDinArr;

    for (let i=0; i<5; i++){
        if(leagues[i].search(playersTeam)>=0){
            league = i;
        }
    }
    if (league == 0) league = "PL";
    if (league == 1) league = "SA";
    if (league == 2) league = "BL1";
    if (league == 3) league = "PD";
    if (league == 4) league = "FL1";
    console.log(league);

    //get team Possession

    $.ajax({
        dataType: "json",
        url: "https://raw.githubusercontent.com/dl769/whoscoredradars/master/possession/"+league+".json",
        success: function(data){
        possession = data
        possession = JSON.parse(possession);
            for (e=0; e <20; e++){
                if (possession[e][0].search(playersTeam)>=0){
                teamsPossession = [e][1];
                }
            }
        }
    });
    console.log(possession)
    console.log(teamsPossession)
    
    

    $.ajax({
        headers: { 'X-Auth-Token': '225eda1009364efd8e388742b3c2a802' },
        url: 'https://api.football-data.org/v2/competitions/'+league+'/standings',
        dataType: 'json',
        type: 'GET',
    }).done(function(response) {

        console.log(response);
        q = response.standings[0].table;
     
        q.forEach((el)=>{
            console.log(_iter,el);
            if(el.team.name.search(playersTeam)>=0){     
                teamIDinArr = _iter;
                teamsGoalTotal = el.goalsFor;
            }
            _iter += 1;
        })
        console.log(teamIDinArr + ' ' + teamsGoalTotal);
        teamBadge = q[teamIDinArr].team.crestUrl
    });

}

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
            playerInfo[44] = playerInfo[44]+playerInfo[45];//position might be in one of those
            console.log(playerInfo)
            if(playerInfo[44].search("Midfielder")>0 && playerInfo[44].search("Forward")<0){
                posistion = 'midfield'
            }
            if(playerInfo[44].search("Defensive Midfielder")>0){
                posistion = 'midfield'
            }
            if(playerInfo[44].search("Attacking Midfielder")>0 || playerInfo[44].search("Forward")>0){
                posistion = 'attack'
            }
            if(playerInfo[44].search("Defender \\(Left\\)")>0 || playerInfo[44].search("Defender \\(Right\\)")>0){
                posistion = 'fullback'
            }
            if(playerInfo[44].search("Defender \\(Centre\\)")>0){
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

            const tempLg = playerInfo[41].lastIndexOf('>');
            playerInfo[41].slice(tempLg)
            
            $('h1').html('<div id="wrapimg"><img src="'+playerInfo[42]+'"></div><div id="wraptxt">'+playerInfo[43]+' <br>'+positionText+' Template'+'<br><a id="leagueandseason">'+playerInfo[41]+' 19/20</a></div>')
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
        $('#stat0').val(playerInfo[37])                   //NPG OK
        $('#stat1').val(playerInfo[3])                    //SPG OK
        $('#stat2').val(playerInfo[34]/playerInfo[3]*100) //SHOOTING% OK
        $('#stat3').val(playerInfo[4])                    //PASSING% OK
        $('#stat4').val(playerInfo[2] / tempGames)        //ASSISTS OK
        $('#stat5').val(playerInfo[11])                   //KEYP OK
        $('#stat6').val(playerInfo[20])                   //THROUGHBALLS OK
        $('#stat7').val(playerInfo[6] + playerInfo [7])   //INT+TACKLES OK
        $('#stat8').val(playerInfo[15])                   //DISPOSS OK
        $('#stat9').val(playerInfo[12])                   //SUCCDRBL OK
        $('#stat10').val(tempConversion)                  //GOALCNVRS OK
    }
    if(posistion == 'midfield'){
        let goalsandassists = playerInfo[1]+playerInfo[2]

        let temp2 = 1 + (Math.pow(Math.E, (-0.1*teamsPossession- 50)));
        let adjustTackle = playerInfo[6]/temp2;
        let adjustInt = playerInfo[7]/temp2;
        let adjustDrbPast = playerInfo[10]/temp2;

        $('#stat0').val(playerInfo[4])                    //PASSING% OK
        $('#stat1').val(playerInfo[11])                   //KEYP OK
        $('#stat2').val(playerInfo[20])                   //THROUGHBALLS OK
        $('#stat3').val(goalsandassists/teamsGoalTotal)   //Goalcontr OK
        $('#stat4').val(playerInfo[12])                   //SUCCDRBL OK
        $('#stat5').val(playerInfo[15])                   //DISPOSS OK
        $('#stat6').val(playerInfo[25])                   //FOULS OK
        $('#stat7').val(playerInfo[10])                   //DRBLPAST OK
        $('#stat8').val(adjustTackle*2)                   //TACKL OK_TOBEADJ
        $('#stat9').val(adjustInt*2)                      //INT OK_TOBEADJ
        $('#stat10').val(playerInfo[4])                   //LONGBALLS OK
    }
    if(posistion == 'centreback'){
        let blocks = playerInfo[27] + playerInfo[28] + playerInfo[29];
        let lb = playerInfo[19] + playerInfo[39];
        lb = playerInfo[19]/lb;

        let temp2 = 1 + (Math.pow(Math.E, (-0.1*teamsPossession- 50)));
        let adjustTackle = playerInfo[6]/temp2;
        let adjustInt = playerInfo[7]/temp2;
        let adjustDrbPast = playerInfo[10]/temp2;

        $('#stat0').val(playerInfo[4])                    //PASSING% OK
        $('#stat1').val(adjustDrbPast*2)                  //DRBLPAST OK_TOBEADJ
        $('#stat2').val(adjustTackle*2)                   //TACKL OK_TOBEADJ
        $('#stat3').val(adjustInt*2)                      //INT OK_TOBEADJ
        $('#stat4').val(blocks)                           //BLOCKS OK
        $('#stat5').val(playerInfo[26])                   //CLEARANCES OK
        $('#stat6').val(playerInfo[8])                    //FOULS OK
        $('#stat7').val(playerInfo[5]/playerInfo[38]*100) //AERIALW% ??
        $('#stat8').val(playerInfo[5])                    //AERIALW OK
        $('#stat9').val(lb*100)                           //LONGBALL%
        $('#stat10').val(playerInfo[4])                   //LONGBALLS OK
    }
    if(posistion == 'fullback'){
        let blocks = playerInfo[27] + playerInfo[28] + playerInfo[29];
        let cross = playerInfo[18] + playerInfo[40];
        cross = playerInfo[18]/cross;

        let temp2 = 1 + (Math.pow(Math.E, (-0.1*teamsPossession- 50)));
        let adjustTackle = playerInfo[6]/temp2;
        let adjustInt = playerInfo[7]/temp2;

        $('#stat0').val(adjustTackle*2)                   //TACKL OK_TOBEADJ
        $('#stat1').val(adjustInt*2)                      //INT OK_TOBEADJ
        $('#stat2').val(playerInfo[4])                    //PASSING% OK
        $('#stat3').val(playerInfo[11])                   //KEYP OK
        $('#stat4').val(playerInfo[18])                   //compcrosses OK
        $('#stat5').val(cross*100)                        //CROSS% OK
        $('#stat6').val(playerInfo[12])                   //SUCCDRBL OK
        $('#stat7').val(playerInfo[15])                   //DISPOSS OK
        $('#stat8').val(playerInfo[5])                    //AERIALW OK
        $('#stat9').val(playerInfo[10])                   //DRBLPAST OK
        $('#stat10').val(playerInfo[8])                   //FOULS OK
    }

}

