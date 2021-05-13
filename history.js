var URL="https://api.clearllc.com/api/v2/miamidb/_table/zipcode?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids=";
var URL2="https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely&units=imperial&appid=af1cd69fc96aadd957673c16e25d2c5e";
var URL3="https://tranhuq.aws.csi.miamioh.edu/final.php?method=getTemp";

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

var icons = {
	"thunderstorm with light rain" : "11d",
	"thunderstorm with rain" : "11d",
	"thunderstorm with heavy rain" : "11d",
	"light thunderstorm" : "11d",
	"thunderstorm" : "11d",
	"heavy thunderstorm" : "11d",
	"ragged thunderstorm" : "11d",
	"thunderstorm with light drizzle" : "11d",
	"thunderstorm with drizzle" : "11d",
	"thunderstorm with heavy drizzle" : "11d",

	"light intensity drizzle" : "09d",
	"drizzle" : "09d",
	"heavy intensity drizzle" : "09d",
	"light intensity drizzle rain" : "09d",
	"drizzle rain" : "09d",
	"heavy intensity drizzle rain" : "09d",
	"shower rain and drizzle" : "09d",
	"thunderstorm with light drizzle" : "09d",
	"heavy shower rain and drizzle" : "09d",
	"shower drizzle" : "09d",

	"light rain" : "10d",
	"moderate rain" : "10d",
	"heavy intensity rain" : "10d",
	"very heavy rain" : "10d",
	"extreme rain" : "10d",
	"freezing rain" : "13d",
	"light intensity shower rain" : "09d",
	"shower rain" : "09d",
	"heavy intensity shower rain" : "09d",
	"ragged shower rain" : "09d",

	"light snow" : "13d",
	"Snow" : "13d",
	"Heavy snow" : "13d",
	"Sleet" : "13d",
	"Light shower sleet" : "13d",
	"Shower sleet" : "13d",
	"Light rain and snow" : "13d",
	"Rain and snow" : "13d",
	"Light shower snow" : "13d",
	"Shower snow" : "13d",
	"Heavy Shower snow" : "13d", 

	"mist" : "50d",
	"Smoke" : "50d",
	"Haze" : "50d",
	"sand/ dust whirls" : "50d",
	"fog" : "50d",
	"sand" : "50d",
	"dust" : "50d",
	"volcanic ash" : "50d",
	"squalls" : "50d",
	"tornado" : "50d",

	"clear sky" : "01d",

	"few clouds" : "02d",
	"scattered clouds" : "03d",
	"broken clouds" : "04d",
	"overcast clouds" : "04d"  
}

function getZipcodeInfo() {

	a=$.ajax({
		url: URL3 + "&date=" + document.getElementById("dateR").value + "&sort=" + document.getElementById("sort").value

	}).done(function(data) {
		document.getElementById("dateR").value = "";
		$("#historyTable").html("");
		$("#historyTable").append("<thead><tr><th>Zipcode</th><th>DateRequested</th><th>Date</th><th>Low</th><th>High</th><th>Forecast</th><th></th></tr></thead>");
		len = data.result.length;
		for (i=0;i<len;i++) {
			var img = '<img src= "http://openweathermap.org/img/wn/' + icons[data.result[i].Forecast] +'@2x.png">'; 
			var date = new Date(data.result[i].date);
			$("#historyTable").append("<tr><td>" + data.result[i].location + "</td><td>" + data.result[i].DateRequested + "</td><td>" + weekday[date.getDay()] + " " + months[date.getMonth()] + " " +
			date.getDate() + "</td><td>" + data.result[i].Low + "</td><td>" + data.result[i].High + "</td><td>" + data.result[i].Forecast + "</td><td>" + img + "</td></tr>");
				
		}

	}).fail(function(xhr, status, error) {
		document.getElementById("dateR").value = "";
		$("#errorLog").html("Error - " + xhr.status + ": " + xhr.Message);
		
	});
}

