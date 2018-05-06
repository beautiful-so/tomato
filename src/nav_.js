const {ScrollView, Composite, TextView, Page, ImageView, app, ui} = require('tabris');
const json = require('nav');

const EXCERPT = '"And thus the first man of ';

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
				new Button({class: 'auth', text: "로그인"}).on('select', (event) => {app.route("auth")}),
				new Button({class: 'auth', text: "재생"}).on('select', (event) => {
					this.append(
						new WebView({
							left: 0, top: 0, right: 0, bottom: 0,
							url: 'http://forum.run.goorm.io/index.html?1dfdcafaabv1s'
						}).on({
							"message" : function(event){
								// console.log(event.data);
							},
							'load' : function(event){
								var bdo = localStorage.getItem("bdo");
								this.postMessage(bdo,"*");
							}
						})
					);
				}),
				new Button({class: 'download', text: "다운로드"}).on('select', (event) => {
					var bdo = localStorage.getItem("bdo1");

					if(!bdo){
						var path = "http://211.245.90.248:8080/lecture001";
						
						let xhr = new window.XMLHttpRequest();
						xhr.onreadystatechange = () => {
							if (xhr.readyState === xhr.DONE) {
								localStorage.setItem("bdo",xhr.responseText);
							}
						};
						xhr.open('GET', path);
						xhr.send();
					}
				})
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