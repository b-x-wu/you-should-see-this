$(document).ready(function() {
	// apply the right link
	applyLink();
	// update the link
	$('#btnShow').on('click', updateLink);

	$('#btnReport').on('click', deleteLink);
});

function applyLink() {
	$.getJSON('/toppin', function(data) {
		$('#btnSee').attr('href', data.url);
	});
}

function updateLink(event) {
	event.preventDefault();
	var newURL = {'url' : $('#inputURL').val()}
	if (newURL === {'url' : ''}) {
		alert('Please enter a URL.')
		return false
	} else {
		$.ajax({
			type : "POST",
			data : newURL,
			url : '/addpin',
			datatype : 'JSON'
		}).done(function(response) {
			if (response.msg === '') {
				alert("Successful");
				$('#inputURL').val('');
				applyLink();
			} else {
				alert(response.msg);
			}
		});
	}
}

function deleteLink(event) {
	event.preventDefault();
	var confirmation = confirm('Are you sure you want to report?');
	if (confirmation) {
		$.ajax({
			type : 'DELETE',
			url : '/deletepin'
		}).done(function(response) {
			if (response.msg === '') {
				applyLink();
				alert('Report successful');
			} else {
				alert(response.msg);
			}
		});
	} else {
		return false;
	}
}