"use strict";

/* ---------------------------------------------------
function: navFunction()
purpose:    Responsive navigation bar
parameters: none
-----------------------------------------------------*/

function navFunction() {
  var x = document.getElementById("navLink");
  if (x.className === "linkhead") {
    x.className += " responsive";
  } else {
    x.className = "linkhead";
  }
}

/* Pricing for pizza toppings, base rate, and tax rate*/
var OptionPrice = [
  0.50,
  0.25,
  0.75,
  0.10,
  1.00,
  0.25,
  0.50,
  0.25,
  1.00,
  0.10,
  0.10,
  0.10
];

var fltBase = 7.95;
var fltTaxRate = 0.095;

/* ---------------------------------------------------
function orderSummary()
purpose:  recalculate the current order information
parameters:  none
----------------------------------------------------*/
function orderSummary() {	
  var fltSub = fltBase;
  var intSize = 1;
  var intCrust = 0;
  var fltTax = 0;
  var fltTotal = 0;
  var intOptionCount = 0;
  var strPizza = "Order Summary:<br />";
  var strSummary = "";
  var strPriceSum = "";
  var intWhichSpec = 0;

  // check to see which size is selected
  for (var i = 0; i < document.forms[0].rdoSize.length; i++){
    if (document.forms[0].rdoSize[i].checked){
		intSize = i;
	}
  }
	
  // set the DHTML display to include the crust
  switch(intSize){
	case 0:
	  strPizza = strPizza + '<br />Personal (10") ';
	  fltSub = 7.00;
	  break;
	case 1:
	  strPizza = strPizza + '<br />Medium (12")';
	  fltSub = 13.25;
	  break;
	case 2:
	  strPizza = strPizza + '<br />Large (16") ';
	  fltSub = 16.75;
	  break;
	}
	
  // check to see which crust is chosen
  for (var i = 0; i < document.forms[0].rdoCrust.length; i++){
    if (document.forms[0].rdoCrust[i].checked){
      intCrust = i;
	}
  }
	
  // set the DHTML display to include the crust
  switch(intCrust){
	case 0:
	  strPizza = strPizza + " Hand Tossed";
	  break;
	case 1:
	  strPizza = strPizza + " Pan";
	  fltSub += 0.75;
	  break;
	case 2:
	  strPizza = strPizza + " Stuffed Crust";
	  fltSub += 2.00;
	  break;  
  }
  // check to see if they have clicked build your own and build the DHTML display
  if (document.forms[0].rdoType[0].checked){
	strPizza = strPizza + "<br />Build your own with: <br /> ";
  }
  else{
		
		for (var i = 1; i < document.forms[0].rdoType.length; i++){
			if (document.forms[0].rdoType[i].checked){
				intWhichSpec = i;				
			}
		}
		switch(intWhichSpec){
			case 1:
				strPizza = strPizza + "<br />Meat Lover's, which includes: <br />&nbsp;&nbsp;&nbsp;&nbsp;Chicken<br />&nbsp;&nbsp;&nbsp;&nbsp;Ham<br />&nbsp;&nbsp;&nbsp;&nbsp;Steak";
				fltSub += OptionPrice[0]+ OptionPrice[1] + OptionPrice[2];
				break;
			case 2:
				strPizza = strPizza + "<br />Under The Sea, which includes: <br />&nbsp;&nbsp;&nbsp;&nbsp;Anchovies<br />&nbsp;&nbsp;&nbsp;&nbsp;Salmon<br />&nbsp;&nbsp;&nbsp;&nbsp;Algae";
				fltSub += OptionPrice[3]+ OptionPrice[4] + OptionPrice[5];
				break;
			case 3:
				strPizza = strPizza + "<br />Vegetarian, which includes: <br />&nbsp;&nbsp;&nbsp;&nbsp;Algae<br />&nbsp;&nbsp;&nbsp;&nbsp;Pineapple<br />&nbsp;&nbsp;&nbsp;&nbsp;Banana<br />&nbsp;&nbsp;&nbsp;&nbsp;Avocado<br />&nbsp;&nbsp;&nbsp;&nbsp;Black Olives<br />&nbsp;&nbsp;&nbsp;&nbsp;Mushrooms<br />&nbsp;&nbsp;&nbsp;&nbsp;Green Olives";
				fltSub +=  OptionPrice[5]+ OptionPrice[6]+ OptionPrice[7] + OptionPrice[8]+OptionPrice[9]+ OptionPrice[10] + OptionPrice[11];
				break;
		}
	}
	
	// check the options that have been requested
//		var toppings = 0;
	for (var i = 0; i < document.forms[0].chkOption.length; i++){	

	if (document.forms[0].chkOption[i].checked){
			fltSub += OptionPrice[i];
			strPizza = strPizza + " &nbsp;&nbsp;&nbsp;&nbsp;" + document.forms[0].chkOption[i].value + "<br />";
//			toppings += 1;
		}
			/***************************************************************************************************
			Add an if statement that will make strPizza = "No toppings" if no toppings are selected.
			***************************************************************************************************/
//			if (toppings = 0) {
//			strPizza += " &nbsp;&nbsp;&nbsp;&nbsp;No Toppings" + toppings + "<br />";
//			}

		}
		
	fltSub = fltSub.toFixed(2);
	
	fltTax = fltSub * fltTaxRate;
	
	fltTax = fltTax.toFixed(2);
	fltTotal = parseFloat(fltSub) + parseFloat(fltTax);
	
	fltTotal = parseFloat(fltTotal);
	fltTotal = fltTotal.toFixed(2);
		
	SetCookie("strPizza", strPizza);
	SetCookie("fltSub", fltSub);
	SetCookie("fltTax", fltTax);
	SetCookie("fltTotal", fltTotal);
	
	strSummary = strPizza;
	
	strPriceSum = "<table> <tr><td>Subtotal:</td> <td align='right'>$" + fltSub + "</td></tr><tr><td>" + "Tax:</td> <td align='right' style='border-bottom-color: White; border-bottom-width: 1px; border-bottom-style: solid;'>" + fltTax + "</td></tr><tr> <td>Total:</td> <td align='right'>$" + fltTotal + "</td></tr></table>"
	
	document.getElementById("orderSum").innerHTML = strSummary;
	document.getElementById("priceSum").innerHTML = strPriceSum;
	
	return true;

}

/* -----------------------------------------------
function changeOption()
purpose:    Make the options visible to user
parameters: none
-------------------------------------------------*/

function changeOption(){
	document.getElementById("options").style.visibility = "visible";
	
	// uncheck and enable
	for (var i = 0; i < document.forms[0].chkOption.length; i++){
		document.forms[0].chkOption[i].checked = false;
		document.forms[0].chkOption[i].disabled = false;
	}
	
	orderSummary();
}

/* ---------------------------------------------
function hideOption()
purpose:    Make the options invisible to user
parameters: none
---------------------------------------------- */
function hideOption(){
	document.getElementById("options").style.visibility = "hidden";
	
	// uncheck and disable
	for (var i = 0; i < document.forms[0].chkOption.length; i++){
		document.forms[0].chkOption[i].checked = false;
		document.forms[0].chkOption[i].disabled = true;
	}
	
	orderSummary();
}

/* ------------------------------------------------------------------------------
function ckform(formIndex)
purpose:    verify that required fields are completed
parameters: formIndex as an integer, representing the form number within the page
				
------------------------------------------------------------------------------ */

function ckform(formIndex){

	// identifed txtFName as the field 15 of the form
	var intStartCheck = 15;	
	var intNumFields = document.forms[formIndex].elements.length;
	var strCustomer = "";
	
	for (var i = intStartCheck; i < intNumFields; i++){
		if (document.forms[formIndex].elements[i].name != "txtApartment"){
			if (document.forms[formIndex].elements[i].value == ""){
				document.getElementById(document.forms[formIndex].elements[i].name).innerHTML = "<span style='color:yellow'>Required Field</span>";
				document.forms[formIndex].elements[i].focus();
				return false;
			}
			strCustomer += document.forms[formIndex].elements[i].value + " ";
			if (document.forms[formIndex].elements[i].name != "txtFName"){
				strCustomer += "<br />";
			}
		}
	}
	
	orderSummary();
	// remove the value of the submit button from the string
	strCustomer = strCustomer.slice(0, (strCustomer.length - 23));
	
	SetCookie("Customer", strCustomer);
	
	
	SetCookie("custFName", document.forms[0].txtFName.value);
	SetCookie("custLName", document.forms[0].txtLName.value);
	SetCookie("custAddress", document.forms[0].txtAddress.value);
	if (document.forms[0].txtApartment.value != ""){
		SetCookie("custApartment", document.forms[0].txtApartment.value);
	}
	SetCookie("custCity", document.getElementById("txtCity").value);
	SetCookie("custState", document.getElementById("txtState").value);
	SetCookie("custZip", document.getElementById("txtZip").value);
	SetCookie("custPhone", document.forms[0].txtPhone.value);
	
	
	return true;
}

function clearThis(){
	
	var formIndex = 0;
	var intStartCheck = 0;
	var intNumFields = document.forms[formIndex].elements.length - 1;
	
	for (var i = intStartCheck; i < intNumFields; i++){
		if (document.forms[formIndex].elements[i].name != "txtApartment"){
			document.getElementById(document.forms[formIndex].elements[i].name).innerHTML = "";
		}
	}		
	
	return true;
}

/* ----------------------------------------------
function replaceString(stringValue)
purpose:		replaces special HTML characters in cookie values
parameters:		stringValue as string, the value to be encoded
notes:			can be used for more than cookies
---------------------------------------------- */
function replaceString(stringValue){

	newString = stringValue;
	return newString;
}

/* ----------------------------------------------
function writePizzaCookies(){
purpose:	writes the Pizza information cookies 
---------------------------------------------- */
function writePizzaCookies(){

	SetCookie("PizzaDesc", document.getElementById("orderSum").innerHTML);
	SetCookie("PriceSum", document.getElementById("priceSum").innerHTML);
	window.location.href = "custInfo.html";
	
	return true;
}

/* ----------------------------------------------
function chForm(){
purpose:	checks the customer information form for complete and correct information
---------------------------------------------- */
function chForm(){
	var intNumFields = document.forms[0].elements.length;
	var phoneExp = /\d\d\d-\d\d\d-\d\d\d\d/;
	var zipExp = /\d{5}/;
	var emailExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	var stateExp = /[a-zA-Z]{2}/;
	
	// check that values have been entered into required fields
	for (var i = 0; i < intNumFields; i++){
		if (document.forms[0].elements[i].name != "txtApartment"){
			if (document.forms[0].elements[i].value.length == 0){
				document.getElementById(document.forms[0].elements[i].name).innerHTML = "Required Field";
				document.forms[0].elements[i].focus();
				document.forms[0].elements[i].select();
				return false;
			}
		}
	}
	
	// check that phone number has been correctly formatted
	if (!phoneExp.test(document.forms[0].txtPhone.value)){
		document.getElementById("txtPhone").innerHTML = "Please enter a valid phone number";
		document.forms[0].txtPhone.focus();
		document.forms[0].txtPhone.select();
		return false;
	}
	
	// check that zip code is a 5 digit number
	if (!zipExp.test(document.forms[0].txtZip.value)){
		document.getElementById("txtZip").innerHTML = "Please enter a 5 digit zip code";
		document.forms[0].txtZip.focus();
		document.forms[0].txtZip.select();
		return false;
	}
	
	//check that state is two letters
	if (!stateExp.test(document.forms[0].txtState.value)){
		document.getElementById("txtState").innerHTML = "Please enter a two letter state code";
		document.forms[0].txtState.focus();
		document.forms[0].txtState.select();
		return false;
	}
	
	// check that email is in correct format
	if (!emailExp.test(document.forms[0].txtEmail.value)){
		document.getElementById("txtEmail").innerHTML = "Please enter a valid email address";
		document.forms[0].txtEmail.focus();
		document.forms[0].txtEmail.select();
		return false
	}
	
	// customer order information is correct write cookie for customer information
	writeCustCookie();
	
	return true;
	//return false;
}

/* ----------------------------------------------
function writeCustCookie(){
purpose:	Writes the customer informstion cookies
---------------------------------------------- */
function writeCustCookie(){
	var strCustName = document.forms[0].txtFName.value + " " + document.forms[0].txtLName.value;	
	
	SetCookie("custName", document.forms[0].txtFName.value + " " + document.forms[0].txtLName.value);
	SetCookie("custAddress", document.forms[0].txtAddress.value + " " + document.forms[0].txtApartment.value);
	SetCookie("custCity", document.forms[0].txtCity.value + ", " + document.forms[0].txtState.value + " " + document.forms[0].txtZip.value);
	SetCookie("custEmail", document.forms[0].txtEmail.value);
	SetCookie("custPhone", document.forms[0].txtPhone.value);
	return true;
}