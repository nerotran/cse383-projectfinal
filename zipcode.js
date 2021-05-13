var URL="https://api.clearllc.com/api/v2/miamidb/_table/zipcode?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids=";

function getZipcodeInfo() {
	a=$.ajax({
		url: URL + document.getElementById("zip").value,
		method: "GET"

	}).done(function(data) {
		//clear out old data
		$("#errorLog").html("");
		document.getElementById("zip").value = "";
		$("#zipcodeTable").append("<tr>" + "<td>" + data.resource[0].zip +"</td><td>" + data.resource[0].city + "<td>" + data.resource[0].state +"</td><td>" + data.resource[0].latitude +
								  "<td>" + data.resource[0].longitude +"</td><td>" + data.resource[0].timezone + "<td>" + (data.resource[0].daylightSavingsFlag == 1) +"</td><td>" +
								   data.resource[0].geopoint + "</td></tr>");

	}).fail(function(xhr, status, error) {
		document.getElementById("zip").value = "";
		$("#errorLog").html("Error - " + xhr.status + ": " + xhr.Message);
		
	});
}

