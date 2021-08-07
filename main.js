song = "";

score_R = 0
score_L = 0

right_X = 0
right_Y = 0

left_X = 0
left_Y = 0


function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.position(480, 180)

    //camera starts here
    video = createCapture(VIDEO)
    video.hide()
    //posenet modle starts
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotResults)

}

function modelLoaded() {

    console.log("mode loaded successfully")

}

function gotResults(results) {

    if (results.length > 0) {

        console.log(results)
        score_L = results[0].pose.keypoints[9].score
        score_R = results[0].pose.keypoints[10].score

        left_X = results[0].pose.leftWrist.x
        left_Y = results[0].pose.leftWrist.y

        right_X = results[0].pose.rightWrist.x
        right_Y = results[0].pose.rightWrist.y
    }

}


function draw() {
    image(video, 0, 0, 600, 500)
    fill("red")
    stroke("red")
    if (score_R > 0.2) {
        circle(right_X, right_Y, red)
        if (right_Y > 0 && right_Y < 100) {

            song.rate(0.5)
            document.getElementById("speed").innerHTML = "speed : 0.5x "

        }
        if (right_Y > 100 && right_Y < 200) {

            song.rate(1)
            document.getElementById("speed").innerHTML = "speed : 1x "

        }
        if (right_Y > 200 && right_Y < 300) {

            song.rate(1.5)
            document.getElementById("speed").innerHTML = "speed : 1.5x "

        }
        if (right_Y > 300 && right_Y < 400) {

            song.rate(2)
            document.getElementById("speed").innerHTML = "speed : 2x "

        }
        if (right_Y > 400 && right_Y < 500) {

            song.rate(2.5)
            document.getElementById("speed").innerHTML = "speed : 2.5x "

        }
    }
    if (score_L>0.2){
    circle(left_X,left_Y,20)
    position_YInNumber=Number(left_Y)
    removedecimal=floor(position_YInNumber)
    volume=removedecimal/500
    document.getElementById("volume").innerHTML="volume : "+volume
    song.setVolume(volume)
    }
}

function playSong() {
    song.play()
    song.setVolume(1) //1 is the maximum volume 0 is the minimum volume
    song.rate(1)

}