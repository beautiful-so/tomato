const {Video, ImageView, fs, ui} = require('tabris');

let file = fs.filesDir + '/test.mp4';

let video = new Video({
  left: 0, top: 0, right: 0, bottom: 0,controlsVisible: true
}).appendTo(ui.contentView);

fetch("http://211.245.90.248:3000/449997485_001.mp4")
  .then(res => res.arrayBuffer())
  .then(data => fs.writeFile(file, data))
  .then(() => video.url = file)
  .then(() => {
	console.log('image:', file );
  })
  .catch(err => console.error(err));