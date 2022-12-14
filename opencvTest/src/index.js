alert("hubuebulabub");
// Adapted from https://docs.opencv.org/3.4/dd/d00/tutorial_js_video_display.html
let video = document.getElementById("videoInput"); // video is the id of video tag
video.width = 640;
video.height = 480;

// make button available here
function onOpenCvReady () {
    // alert("opencv is ready");
    document.getElementById("startCameraButton").disabled = false;
}

// fix this shit with async await
// make stuff toplevel
function startCamera () {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();

            let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
            let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
            let cap = new cv.VideoCapture(video);

            // const FPS = 30;
            const FPS = 0.5;
            function processVideo () {
                try {
                    alert("doing thing");
                    // if (!streaming) {
                    //   // clean and stop.
                    //   src.delete();
                    //   dst.delete();
                    //   return;
                    // }
                    let begin = Date.now();
                    // start processing.
                    cap.read(src);
                    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
                    cv.imshow("canvasOutput", dst);
                    // schedule the next one.
                    let delay = 1000 / FPS - (Date.now() - begin);
                    setTimeout(processVideo, delay);
                } catch (err) {
                    console.error(err);
                }
            }

            // schedule the first one.
            setTimeout(processVideo, 0);
        })
        .catch(function (err) {
            console.log("An error occurred! " + err);
        });
}
