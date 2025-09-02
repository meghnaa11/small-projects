const video = document.getElementById('video');

// Load models from "/models" folder
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
  ]).then(startVideo);
  

function startVideo() {
    // navigator is a built-in global object in the browser that gives you information about the environment & device
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    // this function returns a promise and stream data 
    .then((stream) => {
        // srcObject is a special property of <video> that allows you to attach a MediaStream instead of a file (.mp4) since in live webcam we have live data stream coming from the camera
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error('Camera access denied:', err);
    });
}
/*
event listener: so it only runs when the webcam is turned on otherwise it would try to process frames before the stream exists
createCanvasFromMedia: a cfanvas is like a transparent drawing layer in HTML - this function creates the canvas with same height and width as the video element so now you can draw it on top (add css position: abosulute)
matchDimensions: to make sure the canvas is the same size as the video so the rectangles are drawn correctly
apend canvas: dynamically adding if video is there (not in html bc you wouldn't want to set up furniture before the room is built)
setInterval: to run the function repeatedly every 100ms bc its a video == moving stream - you need to keep checking for new frames for faces, without it it would be detected only once.
detectAllFaces: to detect all faces in the video and return an array of detections, withFaceLandmarks: to get the landmarks of the face, withFaceExpressions: to get the expressions of the face.
resizeResults: to resize the detections to the size of the canvas (analogy: draw a map of room, - paper (cm) and in real life (m)). without it, the boxes and landmarks would float in wrong positions
clearRect: to clear the canvas before drawing the new detections else you will stack the drawing leading to multiple rectangles, etc
drawDetections: to draw the detections on the canvas

*/
video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height }; // for resizing and defining actual display dimensions of the video
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        //console.log(detections);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);

    
})

