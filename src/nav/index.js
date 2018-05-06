const {WebView, Slider, ScrollView, Composite, TextView, Page, app, ui} = require('tabris');
const json = require('./json');

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
					maximum: 100,
				}).appendTo(ui.contentView);

				var bdo = localStorage.getItem("bdo0");

				if(!bdo){
					var i = 0;
					var fn = function(i){
						let path = "http://211.245.90.248:8080/"+i;
						let xhr = new window.XMLHttpRequest();
						xhr.onreadystatechange = () => {
							if (xhr.readyState === xhr.DONE && i < 100) {
								progress.set('selection', i+1);
								localStorage.setItem("bdo"+i,xhr.responseText);
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
				new WebView({
					left: 0, top: 0, right: 0, bottom: 0,
					url: 'http://forum.run.goorm.io/index.html?223dbb'
				}).on({
					"message" : function(event){
						var  num = event.data;
						var bdo = localStorage.getItem("bdo"+num);
						console.log(bdo.length+",.. bdo"+num);
						this.postMessage(bdo,"*");
					},
					'load' : function(event){
						var bdo = localStorage.getItem("bdo0");
						this.postMessage(bdo,"*");
					}
				}).appendTo(ui.contentView);
			}),
			new ScrollView({class:"product"}).append(
				
			)
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