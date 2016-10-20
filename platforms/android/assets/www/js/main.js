
Storage.prototype.setObj = function(key, obj) {
	return this.setItem(key, JSON.stringify(obj))
};

Storage.prototype.getUser = function() {
	return JSON.parse(this.getItem("user"))
};

Storage.prototype.getObj = function(key) {
	return JSON.parse(this.getItem(key))
};

Storage.prototype.setValueInJSONObject = function (key, attribute, value) {
	var obj = this.getObj(key);
	var split = attribute.split(",");

	if (split.length == 1) {
		obj[split[0]] = value;
	} else if (split.length == 2) {
		obj[split[0]][split[1]] = value;
	} else if (split.length == 3) {
		obj[split[0]][split[1]][split[2]] = value;
	} else if (split.length == 4) {
		obj[split[0]][split[1]][split[2]][split[3]] = value;
	}

	this.setObj(key, obj);
};

Storage.prototype.setValueInJSONArray = function (key, attribute, array_object) {
	var obj = this.getObj(key);
	obj[attribute].push(array_object);

	this.setObj(key, obj);
};

Storage.prototype.removeObjectInJSONArray = function (key, attribute_array, attribute_to_search, object_id) {
	var obj = this.getObj(key);
	var found_index;
	$.each(obj[attribute_array], function (index, value) {

		if (value[attribute_to_search] == object_id) {
			found_index = index;
			return;
		}
	});

	obj[attribute_array].splice(found_index, 1);
	this.setObj(key, obj);
};

Storage.prototype.removeObjectInJSONArrayWithoutKey = function (attribute_array, attribute_to_search, object_id) {
	var obj = this.getObj(attribute_array);
	var found_index;

	$.each(obj, function (index, value) {
		if (value[attribute_to_search] == object_id) {
			found_index = index;
			return;
		}
	});

	obj.splice(found_index, 1);
	this.setObj(attribute_array, obj);
};

Storage.prototype.removeValueInJSONArray = function (key, attribute, array_object) {
	var obj = this.getObj(key);
	obj[attribute].pop(array_object);

	this.setObj(key, obj);
};

Storage.prototype.changeValueInJSONArray = function (key, attr_array, where, who, what, value) {

	var obj = this.getObj(key);
	var the_array = obj[attr_array];

	$(the_array).each(function(index, val) {
		if (val[where] == who) {
			val[what] = value;
		}
	});

	this.setObj(key, obj);
};

Storage.prototype.searchItem = function (key, attribute, keyword) {
	var obj = this.getObj(key);
	var found = false;

	$.each(obj, function (index, value) {
		fount = value[attribute].filter(
			function(data) {
				return data == keyword;
			}
		);
	});

	return ((found != '' && found != undefined && found != null) ? true : false);
};

Storage.prototype.searchItemInList = function (key, attribute, keyword, contains) {
	var obj = this.getObj(key);
	var found = obj.filter(
		function(data) {
			return (contains) ? (data[attribute].indexOf(keyword) != -1) : (data[attribute] == keyword);
		}
	);

	return ((found != '' && found != undefined && found != null) ? true : false);
};

Storage.prototype.searchAndReturnItemInList = function (key, attribute, keyword, contains) {
	var obj = this.getObj(key);

	var found = obj.filter(
		function(data) {
			return (contains) ? ((data[attribute].indexOf(keyword) != -1) ? data : null) : ((data[attribute] == keyword) ? data : null);
		}
	);

	return ((found != '' && found != undefined && found != null) ? found : null);
};


Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

$(document).ready(function () {
	$('#left-panel').panel();
});

var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackButtonPress, false);
        document.addEventListener("resume", this.onDeviceResume, false);
        document.addEventListener("pause", this.onDevicePause, false);
        document.addEventListener("offline", this.offlineDevice, false);
		document.addEventListener("online", this.onlineDevice, false);
    },

    onDeviceReady: function() {
        
    },

    onDeviceResume : function () {
        
    },

    onDevicePause : function () {
        
    },
    
    offlineDevice: function () {
    	
    },
    
    onlineDevice: function () {
    	
    },
    
    onBackButtonPress: function() {
        var activePage = $.mobile.pageContainer.pagecontainer( 'getActivePage' ).attr( 'id' );

        if(activePage == 'page-main') {
                navigator.notification.confirm(
        			'hit once again to close',
        			function (button) { if (button == 0) { navigator.app.exitApp(); } },
        			'nosleep',
        			['Ok']
        		);
        } else{
            window.history.back();
        }

    }
};

app.initialize();