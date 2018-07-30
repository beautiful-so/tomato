module.exports = `<!DOCTYPE html> 
<html> 
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		<style>
			body{background: #000;}
			video{position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index:1; opacity:1; transition-duration:0.1;}
			#progress{position: absolute; left: 10px; right: 10px; bottom:60px; width:100%; z-index:2;}
			.console{position:absolute; top:10px; left:10px;}
			.console>*{color:#fff;}
		</style>
	</head>
	<body onload="app.init();">
		<video poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mNkYGAAAAAIAAIFFRIrAAAAAElFTkSuQmCC" id="video" audtoplay></video>
		<input id="progress" type="range" value="1" max="100" onchange="app.onMove()">

		<script>
			var app = {
				video : document.getElementById("video"),
				progress : document.getElementById("progress"),
				postMessage : window.parent.postMessage,
				onMove : function(){
					window.parent.postMessage(app.progress.value , "*");
				},
				onTimeupdate : function(){
					app.timeupdate = setInterval(function(){
						if(app.timeupdate){
							if(app.video.currentTime >= app.limit){
								clearInterval(app.timeupdate);
								delete app.timeupdate;
								
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

							if(!app.video.src){
								app.video.src = "data:video/mp4;base64,"+data;
							}

							var el = document.createElement("video");
								el.controls = false;
								el.muted = true;
								el.controlsList = "nodownload";
								// el.ontimeupdate = app.onTimeupdate;
								el.style['opacity'] = "0";
								el.autoplay = true;
								el.poster = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mNkYGAAAAAIAAIFFRIrAAAAAElFTkSuQmCC";
								el.src = "data:video/mp4;base64,"+data;

								document.body.appendChild(el);
							el.muted = false;

							setTimeout(function(){
								el.removeAttribute("style");

								setTimeout(function(){
									app.video = el;
									app.duration = app.video.duration;
									app.limit = app.duration - 0.825;
									app.onTimeupdate();
								},600);
							}, 600);
						}
					}
				}
			}
		</script>
	</body> 
</html>`;