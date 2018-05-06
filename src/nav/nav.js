const {ScrollView, Composite, TextView, Page, Button, app, ui} = require('tabris');
const json = require('nav.js');

module.exports = class Nav extends Composite {
	constructor(prop) {
		super(prop);
		this._createUI();
		this._applyLayout();
		this._applyStyles();
	}

	_createUI() {
		this.append(
			new ScrollView().append(
				new Button({class: 'auth', text: "로그인"}).on('select', (event) => {
					app.route("auth");
				})
			)
		);
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