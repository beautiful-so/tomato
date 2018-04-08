const { CollectionView, TextView, ImageView, CheckBox } = require('tabris');

module.exports = class Class extends CollectionView { 
	constructor(obj){
		this.$CollectionView = null;
		if(obj){
			
		}
	}

	init(){
		
	}

	// create(){
	// 	this.$CollectionView = new CollectionView({
	// 		left: 0, top: 0, right: 0, bottom: 0,
	// 		itemCount: people.length,
	// 		cellHeight: 256,
	// 		createCell: (index) => {
	// 			let cell = new Composite();
	// 			new TextView({
	// 				id : `class_teacher_${index}`,
	// 				left: 'prev() 16', top: 0, right: 30,
	// 				alignment: 'center'
	// 			}).appendTo(cell);
	// 			new TextView({
	// 				id : `class_desc_${index}`,
	// 				left: 0, top: 'prev() 16', right: 30,
	// 				alignment: 'center'
	// 			}).appendTo(cell);
	// 			new TextView({
	// 				id : `class_desc_${index}`,
	// 				left: 0, top: 'prev() 16', right: 30,
	// 				alignment: 'center'
	// 			}).appendTo(cell);
	// 			new TextView({
	// 				id : `class_book_${index}`,
	// 				left: 0, top: 'prev() 16', right: 30,
	// 				alignment: 'center'
	// 			}).appendTo(cell);
				
				
	// 			new CheckBox({
	// 				id : `class_check_${index}`,
	// 				left: 0, top: 'prev() 16', right: 30,
	// 				alignment: 'center'
	// 			}).appendTo(cell);
	// 			new TextView({
	// 				id : `class_title_${index}`,
	// 				left: 0, top: 'prev() 16', right: 30,
	// 				alignment: 'center'
	// 			}).appendTo(cell);
				
				
	// 			return cell;
	// 		}
	// 	}).on('select', function(index){
			
	// 	});
	// 	return this.$CollectionView;
	// }

	click(){
		
	}
};