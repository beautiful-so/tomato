const {WebView, Slider, ScrollView, Composite, TextView, Page, app, ui} = require('tabris');
const json = require('./json');
const video = require('../video');

module.exports = class Nav extends Composite {
	constructor(prop) {
		super(prop);
		this._createUI(prop.sesstion);
		this._applyLayout();
		this._applyStyles();
	}

	_createUI(sesstion) {
		this.append(
			new TextView({id: 'my', text: sesstion ? "내 강의실" : "로그인"}).on('select', (event) => {
				if(sesstion){
					app.route("class");
				}else{
					app.route("auth");
				}
			}),
			new TextView({id: 'download', text: "download", width:100, height: 100, background: '#000000', highlightOnTouch: true}).on('tap', (event) => {
				let progress = new Slider({
					left: 50, top: 30, right: 50,
					selection: 0,
					maximum: 120,
				}).appendTo(ui.contentView);

				var bdo = localStorage.getItem("bdo0");

				if(!bdo){
					var i = 1;
					var fn = function(i){
						let path = "http://172.16.103.14:3000/tdb_700_b_16_001_01_01_1200k_"+i;
						let xhr = new window.XMLHttpRequest();
						xhr.onreadystatechange = () => {
							if (xhr.readyState === xhr.DONE && i < 120) {
								progress.set('selection', i+1);
								
								var str = xhr.responseText.replace(/\s/g, "AAA");
								localStorage.setItem("bdo"+i,str);
								fn(i+1);
							}
						};
						xhr.open('GET', path);
						xhr.send();
					};
					fn(i);
				}
			}),
			new TextView({id: 'play', text: "강의 재생", top:250, width:100, height: 100, background: '#333333', highlightOnTouch: true}).on('tap', (event) => {
				app.video = new WebView({left: 0, top: 0, right: 0, bottom: 0}).on({
					"message" : function(event){
						var num = event.data;
						var bdo = localStorage.getItem("bdo"+num);

						this.postMessage(bdo,"*");
					}
				}).appendTo(ui.contentView);

				app.video.html = video;
				var data = localStorage.getItem("bdo1");
				setTimeout(function(){
					app.video.postMessage(data ,"*");
				}, 500);
			})
		);
	}

	_applyLayout() {
		this.apply({
			'#my' : {right: 10, top:10},
			'.nav': {left: 72, top: 'prev() 20'},
			'.excerptLabel1': {left: 72, top: 'prev() 20'},
			'.excerptLabel2': {left: 72,  top: 'prev() 20'},
		});
	}

	_applyStyles() {
		// this.apply({
		// 	'.titleLabel': {
		// 		font: device.platform === 'iOS' ? '17px .HelveticaNeueInterface-Regular' : 'medium 14px',
		// 		textColor: device.platform === 'iOS' ? 'rgb(22, 126, 251)' : '#212121'
		// 	}
		// });
	}
};