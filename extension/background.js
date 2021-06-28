chrome.runtime.sendMessage({
	message: 'sending url',
	url: "please work"
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.url) {
		chrome.tabs.sendMessage(tabId, {
			message: 'sending url',
			url: changeInfo.url
		});
	}
});