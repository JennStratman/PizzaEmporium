var milisec=0;
var seconds=60;
var minutes=29;

/* ----------------------------------------------
function secondPassed(){
purpose:	Count down clock for delivery
---------------------------------------------- */ 
// 1800 seconds in 30 minutes

/* Removed days and hours, as only minutes and seconds required
var seconds = 30*24*3600;
// seconds set at 20 for testing
//var seconds = 20;

function secondPassed() {
// Calculate the number of days left
    var days=Math.floor(seconds / 86400); 
// After deducting the days calculate the number of hours left
    var hours = Math.floor((seconds - (days * 86400 ))/3600)
// After days and hours , how many minutes are left 

    var minutes = Math.floor((seconds - (days * 86400 ) - (hours *3600 ))/60)
// Finally how many seconds left after removing days, hours and minutes. 
   var secs = Math.floor((seconds - (days * 86400 ) - (hours *3600 ) - (minutes*60)))

//   Removed calculation for days /hours. Only minutes and seconds required.
var x = days + " Days " + hours + " Hours " + minutes + " Minutes and " + secs + " Seconds ";

	var x = minutes + " Minutes and " + secs + " Seconds ";
   document.getElementById('countdown').innerHTML = x;

   
	// create an alternate display if Pizza has not arrived
	if (seconds == 0) {
   	clearInterval(countdownTimer);
      document.getElementById('countdown').innerHTML = "Please call us, your pizza should have arrived!";
   }
	else {
   	seconds--;
   }
	
	return true;
	
}
*/

var seconds = 1800;
function secondPassed() {
// How many minutes are left
    var minutes = Math.floor((seconds)/60)
// Finally how many seconds left after removing minutes. 
   var secs = Math.floor((seconds - (minutes*60)))

/*   Removed calculation for days /hours. Only minutes and seconds required.
var x = days + " Days " + hours + " Hours " + minutes + " Minutes and " + secs + " Seconds ";
*/
	var x = minutes + " Minutes and " + secs + " Seconds ";
   document.getElementById('countdown').innerHTML = x;

var x = minutes + " Minutes and " + secs + " Seconds ";
   document.getElementById('countdown').innerHTML = x;

   
	// create an alternate display if Pizza has not arrived
	if (seconds == 0) {
   	clearInterval(countdownTimer);
      document.getElementById('countdown').innerHTML = "Please call us, your pizza should have arrived!";
   }
	else {
   	seconds--;
   }
	
	return true;
	
}
 
var countdownTimer = setInterval('secondPassed()', 1000);