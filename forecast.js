var URL="https://api.clearllc.com/api/v2/miamidb/_table/zipcode?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids=";
var URL2="https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely&units=imperial&appid=af1cd69fc96aadd957673c16e25d2c5e";
var URL3="https://tranhuq.aws.csi.miamioh.edu/final.php?method=setTemp";

var weekday=new Array(7);
weekday[0]="Monday";
weekday[1]="Tuesday";
weekday[2]="Wednesday";
weekday[3]="Thursday";
weekday[4]="Friday";
weekday[5]="Saturday";
weekday[6]="Sunday";

var months=new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

function getZipcodeInfo() {
	a=$.ajax({
		url: URL + document.getElementById("zip").value,
		method: "GET"

	}).done(function(data) {
		//clear out old data
		var location = document.getElementById("zip").value;
		$("#errorLog").html("");
		document.getElementById("zip").value = "";
		a=$.ajax({
			url: URL2 + "&lon=" + data.resource[0].longitude + "&lat=" + data.resource[0].latitude,
			method: "GET"

		}).done(function(data2) {
			//clear out old data
			$("#forecastTable").html("");
			$("#forecastTable").append("<thead><tr><th>Zipcode</th><th>DateRequested</th><th>Date</th><th>Low</th><th>High</th><th>Forecast</th><th></th></tr></thead>");
			
			var date = new Date();
			var current = new Date();
			var date1 = current.getDate();
			var month = current.getMonth() + 1;
			if (date1 < 10) {
				date1 = "0" + date1;
			}
			if (month < 10) {
				month = "0" + month;
			}

			currentS = current.getFullYear() + "-" + month + "-" + date1;
			
			len = data2.daily.length;
			for (i=0;i<len;i++) {
				

    			var img = '<img src= "http://openweathermap.org/img/wn/' + data2.daily[i].weather[0].icon +'@2x.png">'; 

				var date2 = date.getDate();
				var month1 = date.getMonth() + 1;
				if (date2 < 10) {
					date2 = "0" + date2;
				}
				if (month1 < 10) {
					month1 = "0" + month1;
				}

				var fullDate = date.getFullYear() + "-" + month1 + "-" + date2;
				$("#forecastTable").append("<tr><td>" + location + "</td><td>" + currentS + "</td><td>" + weekday[date.getDay() - 1] + " " + months[date.getMonth()] + " " + date.getDate() +
				 "</td><td>" + data2.daily[i].temp.min + "</td><td>" + data2.daily[i].temp.max + "</td><td>" + data2.daily[i].weather[0].description + "</td><td>" + img + "</td></tr>");
				a=$.ajax({
					url: URL3 + "&Location=" + location + "&Low=" + data2.daily[i].temp.min + "&High=" + data2.daily[i].temp.max + "&Forecast=" + data2.daily[i].weather[0].description + 
					"&Date=" + fullDate
				}).done(function(data3) {

				}).fail(function(xhr, status, error) {
					$("#errorLog").html("Error - " + xhr.status + ": " + xhr.Message);
		
				});
				date.setDate(date.getDate() + 1);
				
			}

		}).fail(function(xhr, status, error) {
			document.getElementById("zip").value = "";
			$("#errorLog").html("Error - " + xhr.status + ": " + xhr.Message);
			
		});

	}).fail(function(xhr, status, error) {
		document.getElementById("zip").value = "";
		$("#errorLog").html("Error - " + xhr.status + ": " + xhr.Message);
		
	});
}

