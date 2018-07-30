const {TabFolder, ImageView, ScrollView, Composite, TextView, Page, Button, app, ui} = require('tabris');

module.exports = class Home extends Composite {
	constructor(prop) {
		super(prop);
		this._createUI();
		this._applyLayout();
		this._applyStyles();
	}

	_createUI(data) {
		this.append(
			new tabris.TabFolder({
				left: 0, top: 0, right: 0, bottom: 0,
				paging: true,
				id : 'main_banner',
				tabBarLocation: 'hidden'
			}).appendTo(page),
			new ScrollView().append(
				new Button({class: 'auth', text: "로그인"}).on('select', (event) => {
					app.route("auth");
				})
			)
		);

		if(data.main_banner){
			for(var i = 0, len = data.main_banner.length; i <= len; i++){
				new tabris.ImageView({
					centerX: 0, centerY: 0,
					image: data.main_banner[i].url,
				}).appendTo(this.find('#main_banner'));
			}
		}
	}

	_applyLayout() {
		this.apply({
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