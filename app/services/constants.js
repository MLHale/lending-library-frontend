/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2017-08-16T15:36:57-05:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: constants.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-05-17T17:06:01-05:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import config from '../config/environment';
import Service from '@ember/service';

var month_names = [];
month_names[month_names.length] = "Jan";
month_names[month_names.length] = "Feb";
month_names[month_names.length] = "Mar";
month_names[month_names.length] = "Apr";
month_names[month_names.length] = "May";
month_names[month_names.length] = "Jun";
month_names[month_names.length] = "Jul";
month_names[month_names.length] = "Aug";
month_names[month_names.length] = "Sep";
month_names[month_names.length] = "Oct";
month_names[month_names.length] = "Nov";
month_names[month_names.length] = "Dec";

export default Service.extend({
	debug: true,
	genders: ['Male', 'Female', 'Other'],
	educationLevels: ['some highschool','highschool', 'some college(2 years or less)', 'bachelor\'s degree', 'graduate degree'],
	states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],

	serverName: config.serverName,
	rootURL: config.rootURL,

	month_names: month_names,
	secsToStr: function(seconds){
		//Helper function for creating Gmail/FB/Twitter style time strings of the form tt <unit>(s) ago, where unit = <year||day||hour||minutes||seconds>.
		var numberEnding = function (number){
			return (number > 1) ? 's ' : ' ';
		};
		var years = Math.floor(seconds / 31536000);
		var days = Math.floor((seconds % 31536000) / 86400);
		var hours = Math.floor(((seconds % 31536000) % 86400) / 3600);
		var mins = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
		var secs = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
		if (years > 0){
			return years + " year" + numberEnding(years) + " ago";
		}
		else if (days > 0){
			return days + " day" + numberEnding(days) + " ago";
		}
		else if (hours > 0){
			return hours + " hour" + numberEnding(hours) + " ago";
		}
		else if (mins > 0){
			return mins + " minute" + numberEnding(mins) + " ago";
		}
		else if (secs > 0){
			return secs + " second" + numberEnding(secs) + " ago";
		}
		else if (secs === 0){
			return "Just Now";
		}

	},
	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
});
