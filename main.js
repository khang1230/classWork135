var objects = []
var objectDetector = ""

function preload() {
    video = createVideo("video.mp4")
}

function setup() {
    canvas = createCanvas(700, 500)
    canvas.center()
    //video.hide()
}

function startDetection() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
}

function modelLoaded() {
    console.log("Model Loaded!")
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
    status = true
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        //console.log(results[2].label, results[2].width, results[2].height, results[2].x, results[2].y)
        objects = results
    }
}

function draw() {
    image(video, 0, 0, 700, 500)
    if (status != "") {
        objectDetector.detect(video, gotResults)
        document.getElementById("numberOfOjects").innerHTML = "Number of Objects: " + objects.length
        r = random(255)
        g = random(255)
        b = random(255)

        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected"
            noFill()
            stroke(r, g, b)
            var confidence = Math.floor(objects[i].confidence * 100) + "%"
            text(objects[i].label + " " + confidence, objects[i].x + 20, objects[i].y + 20)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}