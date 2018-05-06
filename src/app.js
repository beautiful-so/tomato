const {TextView, ImageView, app, ui} = require('tabris');

const icon = require('./img/icon');
const Nav = require('./nav/index');
const Class = require('./class');
const Board = require('./board');
const Auth = require('./auth');

app.events = [];

app.route = (path, cache) => {
	var el;
	path = typeof path == "string" ? path.split("/") : 0;

	if(path[0] == "auth"){
		el = new Auth({left: 0, top: 0, right: 0, bottom: 0}).appendTo(ui.contentView);
	}else if(path[0] == "class"){
		// el = new Nav({left: 0, top: 0, right: 0, bottom: 0, background: '#f00'}).appendTo(ui.contentView);
	}else if(path[0] == "board"){
		el = new Nav({left: 0, top: 0, right: 0, bottom: 0, background: '#ff0'}).appendTo(ui.contentView);
	}else if(path[0] == "nav"){
		el = new Nav({left: 0, top: 0, right: 0, bottom: 0, background: '#fff'}).appendTo(ui.contentView);
	}

	if(!cache) app.events.push({path : path, element : el});
};

app.off = (len) => {
	let obj = app.events[len];
	obj.path = typeof obj.path == "string" ? obj.path.split("/") : [0];
	obj.element.dispose();
	app.events.pop();
};

app.request = (path) => {
	switch(path){
		case "" :
			break;
		default : 
			break;
	}
};

app.on('backNavigation', (event) => {
	var typeof_back = typeof app.backNavigation == "undefined";
	var len = app.events.length - 1;
	
	if(len > 0){
		event.preventDefault();
		app.off(len);
	}else if(typeof_back){
		app.backNavigation = typeof_back ? 0 : app.backNavigation + 1;

		if(app.backNavigation == 0){
			event.preventDefault();
			var toest = new TextView({
				id : 'toest',
				left: 10, bottom: 10, right: 10,
				opacity : 0,
				alignment : "center",
				cornerRadius : 20,
				text : "한번 더 누르시면 앱이 종료됩니다."
			}).appendTo(ui.contentView);
			toest.animate({opacity : 1},900);

			setInterval(function(toest){
				toest.animate({opacity : 0},900);
				delete app.backNavigation;
				setInterval(function(toest){
					toest.dispose();
				},1000, toest);
			},1000, toest);
		}
	}
});

new ImageView({
	left: 10, top: 10, width: 50, height: 50,
	image: {
		src : icon.menu
	},
	background : "#000000",
	highlightOnTouch: true,
}).on('tap', () => {
  app.route("nav");
}).appendTo(ui.contentView);

app.route();