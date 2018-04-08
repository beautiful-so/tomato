const {ScrollView, Composite, TextView, Page, Button, app} = require('tabris');
const json = require('./json/nav');

const EXCERPT = '"And thus the first man of ';

module.exports = class Nav extends Composite {
	constructor(prop) {
		super(prop);
		console.log(prop);
		this._createUI();
		this._applyLayout();
		this._applyStyles();
	}

	_createUI() {
		this.append(
			new ScrollView().append(
				new Button({class: 'auth', text: "로그인"}).on('select', (event) => {app.route("auth");}),
				new Button({class: 'excerptLabel1', text: EXCERPT}).on('select', (event) => {app.route("board");}),
				new Button({class: 'excerptLabel2', text: EXCERPT}).on('select', (event) => {app.route("class");})
			)
		);
	}

	_applyLayout() {
		this.apply({
			'.pageEntry': {left: 0, top: 'prev()', right: 0, height: device.platform === 'iOS' ? 40 : 48},
			'.auth': {left: 72, top: 'prev() 20'},
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
	
	depth1(){
		
	}

	depth2(key){
		var obj = json[key].data;

		let picker = new Picker({
		left: 20, top: 20, right: 20,
		itemCount: AIRPORTS.length,
		itemText: (index) => AIRPORTS[index].name,
		selectionIndex: 1
		}).appendTo(ui.contentView);

		for(var i = 0, len = obj.length; i < len; i++){
			var data = obj[i];
			var item = new Composite({class: 'nav_item', highlightOnTouch: true}).append();

			if (typeof data.img != "undefined") new ImageView({class: 'image', image: data.img}).appendTo(item);
			new TextView({class: 'nav_item_title', text: data.title}).appendTo(item);
			
			item.on('tap', () => app.route(data.parameter));
			
		}
	}

};