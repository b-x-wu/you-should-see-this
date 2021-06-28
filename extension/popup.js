const url = 'https://ysst.herokuapp.com' // add deployment url
var btnShow = document.getElementById('btnShow');
var aSee = document.getElementById('see');
var btnReport = document.getElementById('btnReport');
var debug = document.getElementById('debug')

// var page_url = 'no url';
// chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
// 	page_url = 'passed into listener'
// 	if (request.message === 'sending url') {
// 		page_url = req.url;
// 	}
// });

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
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs.length == 0){ 
            debug.innerHTML = "could not send mesage to current tab";
        } else {
        	newURL = tabs[0].url;
            debug.innerHTML = newURL;
        }
    });
	

	// send the new url to the database
	let oReq = new XMLHttpRequest();
	oReq.open("POST", url + "/addpin", true);
	oReq.setRequestHeader("Content-Type", "application/json");
	// oReq.responseType = "json";
	oReq.onreadystatechange = function() {
    	if (oReq.readyState === 4 && oReq.status === 200) {
    		updateLink();
    		debug.innerHTML = "done + " + oReq.responseText;
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