const {Video, ImageView, fs, ui} = require('tabris');

let file = fs.cacheDir + '/12943877.mp4';

let video = new Video({
  left: 0, top: 0, right: 0, bottom: 0,controlsVisible: true
}).appendTo(ui.contentView);

fetch("https://gcs-vimeo.akamaized.net/exp=1525672660~acl=%2A%2F12943877.mp4%2A~hmac=8bb93f1cbf417a542e279980f57bdff0f63335c1fba48ad037c09cccaca89332/vimeo-prod-skyfire-std-us/01/216/0/1084537/12943877.mp4")
  .then(res => res.arrayBuffer())
  .then(data => fs.writeFile(file, data))
  .then(() => video.url = file)
  .then(() => {
	console.log('image:', file );
  })
  .catch(err => console.error(err));