//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function checkbox() {
    var arr = [];
    var checked = false;

    if (document.querySelector('#US:checked')) {
        arr[0] = 2;
    }else{
        arr[0] = 1;
    }

    arr[1] = document.getElementById("age").value;

    arr[2] = document.getElementById("BMI").value;

    if (document.querySelector('#symptom1:checked')) {
        arr[3] = 100;
    }else{
        arr[3] = 0;
    }

    if (document.querySelector('#symptom2:checked')) {
        arr[4] = 100;
    }else{
        arr[4] = 0;
    }

    if (document.querySelector('#symptom3:checked')) {
        arr[5] = 100;
    }else{
        arr[5] = 0;
    }

    if (document.querySelector('#symptom4:checked')) {
        arr[6] = 100;
    }else{
        arr[6] = 0;
    }

    if (document.querySelector('#symptom5:checked')) {
        arr[7] = 100;
    }else{
        arr[7] = 0;
    }

    if (document.querySelector('#symptom6:checked')) {
        arr[8] = 100;
    }else{
        arr[8] = 0;
    }

    if (document.querySelector('#symptom7:checked')) {
        arr[9] = 100;
    }else{
        arr[9] = 0;
    }

    if (document.querySelector('#symptom8:checked')) {
        arr[10] = 100;
    }else{
        arr[10] = 0;
    }

    if (document.querySelector('#symptom9:checked')) {
        arr[11] = 100;
    }else{
        arr[11] = 0;
    }

    if (document.querySelector('#symptom10:checked')) {
        arr[12] = 100;
    }else{
        arr[12] = 0;
    }

    if (document.querySelector('#symptom11:checked')) {
        arr[13] = 100;
    }else{
        arr[13] = 0;
    }

    return arr;
}



const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// NOTE: you must manually enter your API_KEY below using information retrieved from your IBM Cloud
const API_KEY = yDMAU4speEBuRlte-E1ZdtpLCdM74VBkQjS1R0ZNQ2NJ;

function getToken(errorCallback, loadCallback) {
	const req = new XMLHttpRequest();
	req.addEventListener("load", loadCallback);
	req.addEventListener("error", errorCallback);
	req.open("POST", "https://iam.cloud.ibm.com/identity/token");
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Accept", "application/json");
	req.send("grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + API_KEY);
}

function apiPost(scoring_url, token, payload, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", "Bearer " + token);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

getToken((err) => console.log(err), function () {
	let tokenResponse;
	try {
		tokenResponse = JSON.parse(this.responseText);
	} catch(ex) {
		// TODO: handle parsing exception
	}
    // NOTE: manually define and pass the array(s) of values to be scored in the next line
	const payload = '{"input_data": [{"fields": ["region", "Age (years)", "BMI (kg m-2)", "Loss of smell and taste (%)", "Fatigue (%)", "Shortness of Breath (%)", "Fever (%)", "Persistent cough (%)", "Diarrhea (%)", "Delirium (%)", "Skipped Meals (%)", "Abdominal Pain (%)", "Chest Pain (%)", "Hoarse voice (%)"], "values": [arr]}]}';
	const scoring_url = "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/f6b90387-5ad6-418f-a2c7-86c973cb268d/predictions?version=2020-11-07";
	apiPost(scoring_url, tokenResponse.token, payload, function (resp) {
		let parsedPostResponse;
		try {
			parsedPostResponse = JSON.parse(this.responseText);
		} catch (ex) {
			// TODO: handle parsing exception
        }
		console.log("Scoring response");
		console.log(parsedPostResponse);
	}, function (error) {
		console.log(error);
	});
});
