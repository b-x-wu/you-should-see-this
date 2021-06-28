const url = 'https://ysst.herokuapp.com' // add deployment url
var btnShow = document.getElementById('btnShow');
var aSee = document.getElementById('see');
var btnReport = document.getElementById('btnReport');
var debug = document.getElementById('debug')



async function updateLink() {
	debug.innerHTML = ("Starting to update");
	let oReq = new XMLHttpRequest();
	oReq.open("GET", url + "/toppin", true);
	// oReq.responseType = "json";
	oReq.onreadystatechange = function() {
		if (oReq.readyState === 4 && oReq.status === 200) {
			// debug.innerHTML = (JSON.parse(oReq.response)["url"]);
			aSee.href = JSON.parse(oReq.response)["url"];
		} else if (oReq.readyState === 4 && oReq.status !== 200) {
			debug.innerHTML = ("Get request error.");
		}
	}
	oReq.send();
}

btnShow.addEventListener("click", async () => {

	// get the new url from the active tab
	let newURL;
	chrome.tabs.query({ active : true, currentWindow : true }, function(tabs) {
		newURL = tabs[0].id;
	});

	// send the new url to the database
	let oReq = new XMLHttpRequest();
	oReq.open("POST", url + "/addpin", true);
	oReq.setRequestHeader("Content-Type", "application/json");
	oReq.responseType = "json";
	oReq.onreadystatechange = function() {
    	if (oReq.readyState === 4 && oReq.status === 200) {
    		updateLink();
    	} else if (oReq.readyState === 4 && oReq.status !== 200) {
			debug.innerHTML = ("Add request error.");
		}
	}
	oReq.send(JSON.stringify({ "url" : newURL }));

});

btnReport.addEventListener("click", async () => {

	let oReq = new XMLHttpRequest();

	oReq.open("DELETE", url + "/deletepin", true);
	oReq.onreadystatechange = function() {
		if (oReq.readyState === 4 && oReq.status === 200) {
    		updateLink();
    	} else if (oReq.readyState === 4 && oReq.status !== 200) {
			console.log("Delete request error.")
		}
	}
	oReq.send();

});

updateLink();