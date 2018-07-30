module.exports = `<!DOCTYPE html> 
<html> 
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		<style>
			body{background: #000;}
			video{position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index:1;}
			#progress{position: absolute; left: 10px; right: 10px; bottom:60px; width:100%; z-index:2;}
			.console{position:absolute; top:10px; left:10px;}
			.console>*{color:#fff;}
		</style>
	</head>
	<body onload="app.init();">
		<video poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mNkYGAAAAAIAAIFFRIrAAAAAElFTkSuQmCC" id="video" audtoplay></video>
		<input id="progress" type="range" value="0" max="100" onchange="app.onMove()">

		<script>
			var app = {
				video : document.getElementById("video"),
				progress : document.getElementById("progress"),
				postMessage : window.parent.postMessage,
				onStream : function(data){
					if(typeof app.video.src == "undefined"){
						app.video.src = "data:video/mp4;base64,"+data;
					}

					var el = document.createElement("video");
						el.controls = false;
						el.muted = true;
						el.controlsList = "nodownload";
						el.ontimeupdate = app.onUpdate;
						el.style['z-index'] = "-1";
						el.autoplay = true;
						el.poster = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mNkYGAAAAAIAAIFFRIrAAAAAElFTkSuQmCC";
						el.src = "data:video/mp4;base64,"+data;

						document.body.appendChild(el);

					setTimeout(function(){
						el.muted = false;
						el.removeAttribute("style");

						app.onTimeupdate();

						app.video.outerHTML = "";
						app.video = el;
					}, 600);
				},
				onMove : function(){
					window.parent.postMessage(app.progress.value , "*");
				},
				onTimeupdate : function(){
					app.timeupdate = setInterval(function(){
						if(app.timeupdate){
							var progress
							if(typeof app.duration != "undefined"){
								progress = app.duration > app.video.duration ? (app.video.duration/2 - (app.duration - app.video.duration))*1.5 : app.video.duration/2 + (app.video.duration - app.duration) * 0.5;
							}else{
								progress = app.video.duration/2;
							}

							if(app.video.currentTime >= progress){
								clearInterval(app.timeupdate);
								app.timeupdate = null
								app.duration = app.video.duration;
								app.progress.stepUp(1);
								window.parent.postMessage(app.progress.value, "*");
							}
						}
					}, 1);
				},
				init : function(){
					window.onmessage = function(event) {
						if(event){
							var data = event.data;
							app.onStream(data);
						}
					}
				}
			}
		</script>
	</body> 
</html>`;