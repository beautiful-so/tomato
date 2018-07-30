const { WebView, CollectionView, TextView, ImageView, Composite, app } = require('tabris');

module.exports = class Auth extends Composite { 
	constructor(prop){
		super(prop);
		this._createUI();
		this._applyLayout();
		this._applyStyles();
	}
	

	_createUI() {
		this.append(
			new WebView({
				left: 0, top: 0, right: 0, bottom: 0,
				url: 'http://211.245.90.248:8080/index.html?1a2132a11'
			}).on({
				"message" : function(event) {
					console.log(event);
				},
				'load' : function(){
					this.postMessage(require('base64/lecture001'), "*");
					// if(e.url.indexOf("mloginkey") > 0){
					// 	this.apply({width: 0, height:0});
					// 	this.set({
					// 		layoutData :{
					// 			width:0,
					// 			height:0,	
					// 		},
					// 		url : 'http://m.tomatalk.co.kr/myclass/studyListAjax.do'

					// 	});
					// 	// var len = app.events.length - 1;
					// 	// app.off(len);


					// }
					// }else if(e.url.indexOf("login.do") < 0){
					// 	this.url = 'http://m.tomatalk.co.kr/login.do';
					// }
				}
			})
		);
	}

	_applyLayout() {
		this.apply({
			'.pageEntry': {left: 0, top: 'prev()', right: 0, height: device.platform === 'iOS' ? 40 : 48},
			'.titleLabel': {left: 72, top: 'prev() 20'},
			'.excerptLabel1': {left: 72, top: 'prev() 20'},
			'.excerptLabel2': {left: 72,  top: 'prev() 20'},
		});
	}

	_applyStyles() {
		this.apply({
			'.titleLabel': {
				font: device.platform === 'iOS' ? '17px .HelveticaNeueInterface-Regular' : 'medium 14px',
				textColor: device.platform === 'iOS' ? 'rgb(22, 126, 251)' : '#212121'
			}
		});
	}

	click(){
		
	}
};