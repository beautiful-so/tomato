const {ImageView, fs, ui} = require('tabris');

let file = fs.cacheDir + '/test.png';

let imageView = new ImageView({
  centerX: 0, centerY: 0, width: 400, height: 200,
  background: '#aaaaaa'
}).appendTo(ui.contentView);

fetch('https://s3.amazonaws.com/ceblog/wp-content/uploads/2012/04/dummyimage.jpg')
  .then(res => res.arrayBuffer())
  .then(data => fs.writeFile(file, data))
  .then(() => imageView.image = file)
  .then(() => {
	console.log('image:', fs.readDir(fs.cacheDir) );
  })
  .catch(err => console.error(err));