status="";
objects=[];
video="";

function setup(){
    canvas=createCanvas(480,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(480,300);
}



function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
    input_text = document.getElementById("obj_name").value;
    }

    function modelLoaded(){
        console.log("Model Loaded");
        status=true;
        video.loop();
        video.speed(1);
        video.volume(0);
    }
    function gotResult(error,results){
        if(error){
            console.log(error);
        }
        console.log(results);
        objects=results;
    }

    function draw(){
        image(video,0,0,480,300);
        if(status !=""){
            objectDetector.detect(video,gotResult);
            for (i=0; i<objects.length; i++){
                document.getElementById("status").innerHTML="Status: Objects Detected";
                 
                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                    noFill();
                    stroke("#ff0000");
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                    if (objects[i].label == input_text) {
                        video.stop();
                        object_Detector.detect(gotResults);
                        document.getElementById("no_of_obj").innerHTML = input_text + " Found";
                        var synth = window.speechSynthesis;
                        var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                        synth.speak(utterThis);
                    }
                    else {
                        document.getElementById("no_of_obj").innerHTML = input_text + " Not Found";
                    }
                }
            }

        }
