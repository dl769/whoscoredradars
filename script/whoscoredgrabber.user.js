// ==UserScript==
// @name         Stats grabber for Football Radars
// @namespace    footballradarsdl769script
// @version      1.0
// @description  Simple attempt to test the skills
// @author       @dl769 => github.com/dl769
// @match        https://www.whoscored.com/Players/*
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @run-at       document-start
// @grant        none
// ==/UserScript==


console.log('running');
window.setTimeout(()=>{
$('#player-tournament-stats h2').append(`<button class="dlscript">Get Players radar</button>`)
$('.dlscript').click (run);
$('.dlscript').css('border','solid grey 1px');
$('.dlscript').css('margin-bottom','5px')
$('.dlscript').css('font-size','12px')
$('.dlscript').css('font-weight','700')
$('.dlscript').css('border-radius','4%')
$('.dlscript').css('margin-left','10px');
$('.dlscript').css('background-color','#8dc63f');
},500)
function run(){

$(window).scrollTop(0);

$('#user-bar-wrapper').html("<center><h1>Loading resources, do not leave this page</h1></center>");
$('#tournament-nav-popup').css("visibility","hidden");
$('#layout-content-wrapper').css("visibility","hidden");
$('#footer-wrapper').css("visibility","hidden");

$('#header-wrapper').html('<div id="progressbar"></div>');

$('#progressbar').css('width','1px');
$('#progressbar').css('height','3em');
$('#progressbar').css('background','red');
$('#progressbar').css('transition','width 41s');

window.setTimeout(function ws(){
$('#progressbar').css('width','100%');
},200);


let playerStats = [];
$(".minsPlayed").click();

window.setTimeout(function() {
    playerStats.push($(".sorted").html()); /*MINS PLAYED*/
    playerStats.push($('td.goal').html());
    playerStats.push($('td.assistTotal').html());
    playerStats.push($('td.shotsPerGame').html());
    playerStats.push($('td.passSuccess').html());
    playerStats.push($('td.aerialWonPerGame').html());
},1500);

window.setTimeout(function(){
    let s = $('a[href="#player-tournament-stats-defensive"]');
    s.click();
},3000)
window.setTimeout(()=> $(".minsPlayed").click(), 4000)
window.setTimeout(function() {
    playerStats.push($('td.tacklePerGame').html());
    playerStats.push($('td.interceptionPerGame').html());
    playerStats.push($('td.foulsPerGame').html());
    playerStats.push($('td.clearancePerGame ').html());
    playerStats.push($('td.wasDribbledPerGame').html());
},5000);


window.setTimeout(function(){
    let s = $('a[href="#player-tournament-stats-offensive"]');
    s.click();
},6500)
window.setTimeout(()=> $(".minsPlayed").click(), 7500)
window.setTimeout(function() {
    playerStats.push($('td.keyPassPerGame').html());
    playerStats.push($('td.dribbleWonPerGame').html());
    playerStats.push($('td.foulGivenPerGame').html());
    playerStats.push($('td.offsideGivenPerGame').html());
    playerStats.push($('td.dispossessedPerGame').html());
},8500);


window.setTimeout(function(){
    let s = $('a[href="#player-tournament-stats-passing"]');
    s.click();
},10000)
window.setTimeout(()=> $(".minsPlayed").click(), 11000)
window.setTimeout(function() {
    playerStats.push($('td.totalPassesPerGame').html()); /*p90 */
    playerStats.push($('td.passSuccess').html());
    playerStats.push($('td.accurateCrossesPerGame').html());
    playerStats.push($('td.accurateLongPassPerGame').html());
    playerStats.push($('td.accurateThroughBallPerGame').html());
},12000);

/*DETAILED*/
window.setTimeout(function(){
    let s = $('a[href="#player-tournament-stats-detailed"]');
    s.click();
},13500)
window.setTimeout(()=>  $("#category").val('tackles').change(), 14500)
window.setTimeout(()=> $(".minsPlayed").click(), 15500)
window.setTimeout(function() {
    playerStats.push($('td.tackleWonTotal').html());
    playerStats.push($('td.challengeLost').html());
    playerStats.push($('td.tackleTotalAttempted').html());
},16500);


    window.setTimeout(() => $("#category").val('fouls').change(),18500);
window.setTimeout(function() {
    playerStats.push($('td.foulGiven').html());
    playerStats.push($('td.foulCommitted').html());
},20000);

window.setTimeout(() => $("#category").val('clearances').change(),21000);
window.setTimeout(function() {
    playerStats.push($('td.clearanceTotal').html());
},23000);

window.setTimeout(() => $("#category").val('blocks').change(),24000);
window.setTimeout(function() {
    playerStats.push($('td.outfielderBlock').html());
    playerStats.push($('td.passCrossBlockedDefensive').html());
    playerStats.push($('td.outfielderBlockedPass').html());
},26000);


window.setTimeout(() => $("#category").val('shots').change(),27500);
window.setTimeout(() => $("#subcategory").val('situations').change(),28500);
window.setTimeout(function() {
    playerStats.push($('td.shotOpenPlay').html());
    playerStats.push($('td.shotCounter').html());
    playerStats.push($('td.shotSetPiece').html());
},29500);


window.setTimeout(() => $("#subcategory").val('accuracy').change(),30500);
window.setTimeout(function() {
    playerStats.push($('td.shotOffTarget').html());
    playerStats.push($('td.shotOnTarget').html());
    playerStats.push($('td.shotBlocked').html());
},31500);


window.setTimeout(() => $("#category").val('goals').change(),32500);
window.setTimeout(() => $("#subcategory").val('situations').change(),33500);
window.setTimeout(function() {
    playerStats.push($('td.goalOpenPlay').html());
    playerStats.push($('td.goalTotal').html()); //NPG

},34500);

window.setTimeout(() => $("#category").val('aerial').change(),35500);
window.setTimeout(function() {
    playerStats.push($('td.duelAerialTotal').html());
},36500);

window.setTimeout(() => $("#category").val('passes').change(),37000);
window.setTimeout(function() {
    playerStats.push($('td.passLongBallInaccurate').html());
},38000);

window.setTimeout(() => $("#subcategory").val('type').change(),38500);
window.setTimeout(function() {
    playerStats.push($('td.passCrossInaccurate').html());
},39500);
//41


window.setTimeout(function(){
    playerStats = playerStats.map(el=>el.slice(0,-1));
    playerStats = playerStats.map(el=>el=parseFloat(el));

    playerStats.push($('.tournament-link').html());            //42 - league
    playerStats.push($('.player-picture').attr('src'));        //43 - player's pic
    playerStats.push($('h2').html());                          //44- player's name
    playerStats.push($('.player-info-block:eq(4)').html())     //45 position
    playerStats.push($('.player-info-block:eq(3)').html())     //46 might be position as well if he has not got full name
    playerStats.push($('.team-link').html())                   //47 TEAM;

    window.setTimeout(()=> goBackWithData(),750)
},40500);

function goBackWithData(){
    playerStats = JSON.stringify(playerStats);
    playerStats = btoa(playerStats);
    window.location.href = "http://dl769.github.io/whoscoredradars/?"+playerStats;
}
}