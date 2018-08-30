const {WebView, TextView, app, ui} = require('tabris');
app.events = [];

app.route = function(url){
	app.events.push(url);
	app.webView.url = url;
};

app.off = (len) => {
	let obj = app.events[len-1];
	app.webView.url = obj;
	
	app.events.pop();
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

app.webView = new WebView({
  left: 0, top: 0, right: 0, bottom: 0, url : "http://mtomato.neclass.com"
}).on("navigate",function(e){
	
	var len = app.events.length - 1;
	if(app.events[len] != e.url){
		app.route(e.url);
		
	}
}).appendTo(ui.contentView);