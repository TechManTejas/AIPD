const videoElement = document.getElementsByClassName('input_video')[0];
videoElement.style.display = "none";
const canvasElement1 = document.getElementsByClassName('output_canvas2')[0];
const canvasCtx1 = canvasElement1.getContext('2d');
const canvasElement2 = document.getElementsByClassName('output_canvas1')[0];
const canvasCtx2 = canvasElement2.getContext('2d');
const image = new Image(300, 500);
const e_right = document.getElementById('vol1');
const eInner_right = document.getElementById('vol11');
const e_left = document.getElementById('vol2');
const eInner_left = document.getElementById('vol22');
const speed_box = document.getElementById('speed')
const stop_button_element=document.getElementById('stop_button')
//const restart_button_element=document.getElementById('restart_button')
const exercise_name=document.getElementById('exercise')
exercise_name.innerHTML=sessionStorage.getItem("Exercise")
const exercise_category=document.getElementById('exercise_category')
exercise_category.innerHTML="Category : "+sessionStorage.getItem("Exercise_category")
const Exercise_difficulty=document.getElementById('Exercise_difficulty')
Exercise_difficulty.innerHTML=sessionStorage.getItem("Exercise_difficulty")
const hold=document.getElementById("Hold");
// setting buffer 
var buffer=0
if(sessionStorage.getItem("Exercise_category")==1)
{
  buffer=45;
}
else if (sessionStorage.getItem("Exercise_category")==2)
{
  buffer=30;
}
else{
buffer=20;
}



// setting buffer
var start_timer=(new Date()).getTime() / 1000
var end_timer=""
var setCounter=1;

var camera_check=1
var pi = Math.PI;
var BICEP = [[16, 14], [14, 12], [12, 11], [11, 13], [13, 15],[26,28],[27,25],[26,24],[25,23],[24,23]]
var lstage = "";
var lcounter = 0;
var rstage = "";
var rcounter = 0;
var status = 0;
var skeleton_count = 0
var hcolor_code = "#FF0000"
var lcolor_code = "#FF0000"
var color_code = "#000000"
var speed_avg=[]
var time_avg=[]

import {coordinates} from './coord.mjs'



// GLobal Functions 
var speed_check = 0
var max_time1 = 0
var min_time1 = 0
var current = 0
var current_after = 0
var current_time_check_value = 0
var diff1 = 0
var diff2 = 0
var percent_vol_left = 0
var percent_vol_right = 0
var Distance_left = 0
var frame_check = 0
var initialTime=0
var initialDistance=0
var changeInTime=0
var changeInDistance=0
var speed=0

function translate(OldValue) {
  var OldMax = 180
  var OldMin = 0
  var NewMax = 100
  var NewMin = 0
  var OldRange = (OldMax - OldMin)
  var NewRange = (NewMax - NewMin)
  var NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin
  return NewValue

}
function speedFinder(coveredDistance, timeTaken) {
  var speed = coveredDistance / timeTaken
  //console.log(coveredDistance,timeTaken)
  return speed
}


function find_distance(x, y) {
  return (Math.sqrt((x[1] - y[1]) ** 2 + (x[0] - y[0]) ** 2)) * 100;
}


/function to calculate angle */
function calculate_angle(x, y, z) {
  var a = x;
  var b = y;
  var c = z;

  var radians =
    Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
  var angle = radians * (180 / pi)
  if (angle > 180) {
    angle = 360 - angle;
  }

  return angle;
}

function refine(angle) {
  if (angle > 180) {
    angle = 360 - angle
  }
  return angle
}

function sum(arr)
{
  var sum = 0;
  
    // Running the for loop
    for (let i = 0; i < arr.length; i++) {
        sum += Math.round(arr[i]);
    }
    return sum;
}


function onResults(results) {

  canvasCtx1.save();
  canvasCtx1.clearRect(0, 0, canvasElement1.width, canvasElement1.height);
  canvasCtx1.drawImage(
    results.image, 0, 0, canvasElement1.width, canvasElement1.height);
  canvasCtx2.save();
  canvasCtx2.clearRect(0, 0, canvasElement2.width, canvasElement2.height);
  canvasCtx2.drawImage(
    image, 0, 0, canvasElement2.width, canvasElement2.height);

  canvasCtx1.font = "15px serif"
  canvasCtx1.fillStyle = "#FFFFFF";



  var landmarks = results.poseLandmarks;
  if (landmarks == null) {

    document.getElementById("error").innerHTML = "Make yourself visible in front of the Camera";
    //console.log("Make yourself visible in front of the Camera");
    status = 1;

  }

  if (status == 0) {
    document.getElementById("error").innerHTML = "";

  }






  /**BICEP CURL COUNTER */
  if (landmarks != null) {


    //console.log(landmarks)

    // drawing landmarks only if landmarks are detected
    drawConnectors(canvasCtx1, results.poseLandmarks, BICEP,
      { color: '#FFFFFF', lineWidth: 4 });
    var custom_landmarks = [results.poseLandmarks[11], results.poseLandmarks[12], results.poseLandmarks[13], results.poseLandmarks[14], results.poseLandmarks[15], results.poseLandmarks[16],results.poseLandmarks[24],results.poseLandmarks[23],results.poseLandmarks[26],results.poseLandmarks[25],results.poseLandmarks[28],results.poseLandmarks[27]]
    drawLandmarks(canvasCtx1, custom_landmarks,
      { color: '#000000', lineWidth: 2 });
    // drawing landmarks only if landmarks are detected
    status = 0;


    /**LEFT SIDE OF THE BODY */
    var lshoulder = [landmarks[POSE_LANDMARKS.LEFT_SHOULDER].x, landmarks[POSE_LANDMARKS.LEFT_SHOULDER].y]
    var lelbow = [landmarks[POSE_LANDMARKS.LEFT_ELBOW].x, landmarks[POSE_LANDMARKS.LEFT_ELBOW].y]
    var lwrist = [landmarks[POSE_LANDMARKS.LEFT_WRIST].x, landmarks[POSE_LANDMARKS.LEFT_WRIST].y]
    var lhip = [landmarks[POSE_LANDMARKS.LEFT_HIP].x, landmarks[POSE_LANDMARKS.LEFT_HIP].y]
    var lknee = [landmarks[POSE_LANDMARKS.LEFT_KNEE].x, landmarks[POSE_LANDMARKS.LEFT_KNEE].y]
    var lankle = [landmarks[POSE_LANDMARKS.LEFT_ANKLE].x, landmarks[POSE_LANDMARKS.LEFT_ANKLE].y]

    /**RIGHT SIDE OF THE BODY */
    var rshoulder = [landmarks[POSE_LANDMARKS.RIGHT_SHOULDER].x, landmarks[POSE_LANDMARKS.RIGHT_SHOULDER].y]
    var relbow = [landmarks[POSE_LANDMARKS.RIGHT_ELBOW].x, landmarks[POSE_LANDMARKS.RIGHT_ELBOW].y]
    var rwrist = [landmarks[POSE_LANDMARKS.RIGHT_WRIST].x, landmarks[POSE_LANDMARKS.RIGHT_WRIST].y]
    var rhip = [landmarks[POSE_LANDMARKS.RIGHT_HIP].x, landmarks[POSE_LANDMARKS.RIGHT_HIP].y]
    var rknee = [landmarks[POSE_LANDMARKS.RIGHT_KNEE].x, landmarks[POSE_LANDMARKS.RIGHT_KNEE].y]
    var rankle = [landmarks[POSE_LANDMARKS.RIGHT_ANKLE].x, landmarks[POSE_LANDMARKS.RIGHT_ANKLE].y]


    // / NOSE */
    var nose = [landmarks[POSE_LANDMARKS.NOSE].x, landmarks[POSE_LANDMARKS.NOSE].y]
    // /CUSTOM KEYPOINTS  HIP CENETER AND SHOULDER CENTER*/
    var hc = [(rhip[0] + lhip[0]) / 2, (rhip[1] + lhip[1]) / 2]
    var sc = [(rshoulder[0] + lshoulder[0]) / 2, (rshoulder[1] + lshoulder[1]) / 2]



    // / ANGLES CALCULATION */
    var lSEW = refine(Math.abs(Math.round(calculate_angle(lshoulder, lelbow, lwrist))))
    var lESH = refine(Math.abs(Math.round(calculate_angle(lelbow, lshoulder, lhip))))
    var lSHK = refine(Math.abs(Math.round(calculate_angle(lshoulder, lhip, lknee))))
    var lHKA = refine(Math.abs(Math.round(calculate_angle(lhip, lknee, lankle))))
    var rSEW = refine(Math.abs(Math.round(calculate_angle(rwrist, relbow, rshoulder))))
    var rESH = refine(Math.abs(Math.round(calculate_angle(relbow, rshoulder, rhip))))
    var rSHK = refine(Math.abs(Math.round(calculate_angle(rshoulder, rhip, rknee))))
    var rHKA = refine(Math.abs(Math.round(calculate_angle(rhip, rknee, rankle))))

    // /CUSTOM KEYPOINTS ANGLE */
    var rNNS = Math.abs(Math.round(calculate_angle(nose, sc, rshoulder))) //NOSE NECK SHOULDER RIGHT
    var lNNS = Math.abs(Math.round(calculate_angle(nose, sc, lshoulder))) //NOSE NECK SHOULDER LEFT


    var rNPH = Math.abs(Math.round(calculate_angle(sc, hc, rhip))) //NECK PELVIC HIP RIGHT
    var lNPH = Math.abs(Math.round(calculate_angle(sc, hc, lhip))) //NECK PELVIC HIP LEFT

    var NNP = Math.abs(Math.round(calculate_angle(nose, sc, hc))) //NOSE NECK PELVIC

    // canvasCtx1.fillText(lSEW, lelbow[0] * 651, lelbow[1] * 501)
    // canvasCtx1.fillText(rSEW, relbow[0] * 651, relbow[1] * 501)
    // canvasCtx1.fillText(lESH, lshoulder[0] * 651, lshoulder[1] * 501)
    // canvasCtx1.fillText(rESH, rshoulder[0] * 651, rshoulder[1] * 501)
    // canvasCtx1.fillText(lSHK, lhip[0]*651, lhip[1]*501)
    // canvasCtx1.fillText(rSHK, rhip[0]*651, rhip[1]*501)
    // canvasCtx1.fillText(lHKA, lknee[0]*651,lknee[1]*501)
    // canvasCtx1.fillText(rHKA, rknee[0]*651,rknee[1]*501)
    // canvasCtx1.fillText("NNP"+NNP,10,110)
    // canvasCtx1.fillText("rNNS"+rNNS,10,130)
    // canvasCtx1.fillText("lNPH"+lNPH, 10, 150)
    // canvasCtx1.fillText("rNPH"+rNPH, 10, 170)
    // canvasCtx1.fillText("NNP"+NNP, 10, 190)




  /** sc and hc */
  canvasCtx1.beginPath();
  canvasCtx1.moveTo(hc[0] * 650, hc[1] * 500);
  canvasCtx1.lineTo(sc[0] * 650, sc[1] * 500);
  canvasCtx1.strokeStyle = '#ffffff';
  canvasCtx1.lineWidth = 5;
  canvasCtx1.stroke();

    // //console.log(POSE_CONNECTIONS)
    canvasCtx1.restore();
    var distance = find_distance(rshoulder, lshoulder)
    console.log('Distance',distance);


if(distance>0 && distance<20){   //distance

    if (distance > 0 && distance < 10) {    // sideways

      if (rSHK < 115 && rSHK>85 && lSHK < 115 && lSHK>85 && lHKA < 85 && lHKA>55 && lHKA < 85 && lHKA>55) {    // bend hips and knees


        document.getElementById("backbone").innerHTML = "";
        lcolor_code = "#000000"
        if (rSEW>160 && lSEW>160 && rESH>60 && rESH<90 && lESH>60 && lESH<90) {

          if (NNP < 80) {
            lstage = "down";
            // timer code
            if (speed_check == 0) {
              speed_check = 1
              max_time1 = (new Date()).getTime() / 1000;
              //current=min_time1
              if (min_time1 == 0) {
                diff1 = max_time1 - (new Date()).getTime() / 1000;
              }
              else {
                diff1 = max_time1 - min_time1
              }
              min_time1 = 0
            }
            document.getElementById("timer").innerHTML = ""

          }
          if (NNP > 150 && lstage == "down") {
            lstage = "up";
            lcounter += 1;
            // timer code
            if (speed_check == 1) {
              speed_check = 0
              min_time1 = (new Date()).getTime() / 1000;
              //current_after=max_time1
              if (max_time1 == 0) {
                diff2 = min_time1 - (new Date()).getTime() / 1000;
              }
              else {
                diff2 = min_time1 - max_time1
              }
              max_time1 = 0
            }
            document.getElementById("timer").innerHTML = Math.round((diff1 + diff2), 0)+"s";
            time_avg.push((diff1+diff2));
          }


          percent_vol_right = Math.round(translate(NNP), 0);
          eInner_right.style.width = percent_vol_right + '%';
          percent_vol_left = Math.round(translate(NNP), 0)
          eInner_left.style.width = percent_vol_left + '%';


          //speed calculation 
          Distance_left = percent_vol_left*0.26
          if (Distance_left != 0) {
            if (initialDistance != 0) {
              changeInDistance = initialDistance - Distance_left
              if (changeInDistance < 0) {
                changeInDistance = changeInDistance * -1
              }
              changeInTime = (new Date()).getTime() / 1000 - initialTime
              speed = speedFinder(changeInDistance,changeInTime)
              speed = Math.round(speed, 1)
              if (frame_check % 3 == 0) {
                speed_avg.push(speed)
                var speed_print = speed;
                speed_box.innerHTML=speed_print+" mm/s";
                


              }
            }
          }

          initialDistance = Distance_left
          initialTime = (new Date()).getTime() / 1000;
          frame_check += 1




          document.getElementById("counter1").innerHTML ="Reps "+ lcounter;
          
          hcolor_code = "#000000"
          hold.innerHTML="HOLD POSITION";
          

        }
        else {
          document.getElementById("backbone").innerHTML = "Please keep your shoulders aligned";
          hcolor_code = "#FF0000"
          hold.innerHTML="";

        }

      }
      else {
        document.getElementById("backbone").innerHTML = "Please bend your hips and knees";
        lcolor_code = "#FF0000"
        hold.innerHTML="";

      }
    }
    else {
      document.getElementById("backbone").innerHTML = "Do the exercise sideways";
      hold.innerHTML="";
    }
  }
  else
  {
    document.getElementById("backbone").innerHTML = "Please make your whole body visible";
    hold.innerHTML="";
  }



  }
  if (skeleton_count == coordinates.length) {
    skeleton_count = 0;
  }
  var skele_lshoulder = coordinates[skeleton_count][0]
  var skele_lelbow = coordinates[skeleton_count][2]
  var skele_lwrist = coordinates[skeleton_count][4]
  var skele_rshoulder = coordinates[skeleton_count][1]
  var skele_relbow = coordinates[skeleton_count][3]
  var skele_rwrist = coordinates[skeleton_count][5]
  var skele_lhip = coordinates[skeleton_count][6]
  var skele_rhip = coordinates[skeleton_count][7]
  var skele_lknee = coordinates[skeleton_count][8]
  var skele_rknee = coordinates[skeleton_count][9]
  var skele_lankle = coordinates[skeleton_count][10]
  var skele_rankle = coordinates[skeleton_count][11]
  var skele_nose = coordinates[skeleton_count][12]
  var skele_sc = coordinates[skeleton_count][13]
  var skele_hc = coordinates[skeleton_count][14]

  var skele_points = [skele_lshoulder, skele_lelbow, skele_lwrist, skele_rshoulder, skele_relbow, skele_rwrist, skele_lhip, skele_rhip, skele_lknee, skele_rknee, skele_lankle, skele_rankle]
  // Skeletal figure
  for (var i = 0; i < skele_points.length; i++) {
    canvasCtx2.beginPath()
    canvasCtx2.arc(skele_points[i][0] * 300, skele_points[i][1] * 500, 3, 0, 2 * Math.PI);
    canvasCtx2.stroke()

  }

  // head 
  canvasCtx2.beginPath()
  canvasCtx2.arc(skele_nose[0] * 300, skele_nose[1] * 500, 2, 0, 2 * Math.PI);
  canvasCtx2.stroke()
  canvasCtx2.beginPath()
  canvasCtx2.arc(skele_nose[0] * 300, skele_nose[1] * 500 - 5, 26, 0, 2 * Math.PI);
  canvasCtx2.stroke()


  // shoulder to elbow left
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_lshoulder[0] * 300, skele_lshoulder[1] * 500);
  canvasCtx2.lineTo(skele_lelbow[0] * 300, skele_lelbow[1] * 500);
  canvasCtx2.strokeStyle = hcolor_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();

  // elbow to wrist left
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_lwrist[0] * 300, skele_lwrist[1] * 500);
  canvasCtx2.lineTo(skele_lelbow[0] * 300, skele_lelbow[1] * 500);
  canvasCtx2.strokeStyle = hcolor_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();

  // shoulder to elbow right
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_rshoulder[0] * 300, skele_rshoulder[1] * 500);
  canvasCtx2.lineTo(skele_relbow[0] * 300, skele_relbow[1] * 500);
  canvasCtx2.strokeStyle = hcolor_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();

  // elbow to wrist right
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_rwrist[0] * 300, skele_rwrist[1] * 500);
  canvasCtx2.lineTo(skele_relbow[0] * 300, skele_relbow[1] * 500);
  canvasCtx2.strokeStyle = hcolor_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();

  // hip to knee right
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_rhip[0] * 300, skele_rhip[1] * 500);
  canvasCtx2.lineTo(skele_rknee[0] * 300, skele_rknee[1] * 500);
  canvasCtx2.strokeStyle = lcolor_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();

  // knee to ankle right
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_rknee[0] * 300, skele_rknee[1] * 500);
  canvasCtx2.lineTo(skele_rankle[0] * 300, skele_rankle[1] * 500);
  canvasCtx2.strokeStyle = lcolor_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();

  // hip to knee left
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_lhip[0] * 300, skele_lhip[1] * 500);
  canvasCtx2.lineTo(skele_lknee[0] * 300, skele_lknee[1] * 500);
  canvasCtx2.strokeStyle = lcolor_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();

  // knee to ankle left
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_lknee[0] * 300, skele_lknee[1] * 500);
  canvasCtx2.lineTo(skele_lankle[0] * 300, skele_lankle[1] * 500);
  canvasCtx2.strokeStyle = lcolor_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();

  // shoulder to shoulder 
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_lshoulder[0] * 300, skele_lshoulder[1] * 500);
  canvasCtx2.lineTo(skele_rshoulder[0] * 300, skele_rshoulder[1] * 500);
  canvasCtx2.strokeStyle = color_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();
  // hip to hip 
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_lhip[0] * 300, skele_lhip[1] * 500);
  canvasCtx2.lineTo(skele_rhip[0] * 300, skele_rhip[1] * 500);
  canvasCtx2.strokeStyle = color_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();
  // backbone
  canvasCtx2.beginPath();
  canvasCtx2.moveTo(skele_hc[0] * 300, skele_hc[1] * 500);
  canvasCtx2.lineTo(skele_sc[0] * 300, skele_sc[1] * 500);
  canvasCtx2.strokeStyle = color_code;
  canvasCtx2.lineWidth = 5;
  canvasCtx2.stroke();


  skeleton_count++;
  document.getElementById("sets").innerHTML="Set "+setCounter;
  if(lcounter==parseInt(sessionStorage.getItem("Steps")) || (lcounter==0 && lstage=="down"))
  {
    canvasCtx2.fillText("SET"+(setCounter-1)+"DONE!", 300, 300);

  }
  if(lcounter==parseInt(sessionStorage.getItem("Steps")))
  {
    lcounter=0;
    setCounter++;
    if(setCounter>parseInt(sessionStorage.getItem("Sets")))
    {
      camera.stop();
      document.getElementById("backbone").innerHTML = "";
      document.getElementById("error").innerHTML = "";
      //canvasCtx2.fillText("Click on the end Button!", 200, 200);
      alert("please click the end button")

    }
  }





}

stop_button_element.onclick =function() {
  camera.stop();
  console.log("camera close")
  camera_check=0;
  //sessionStorage.clear()
  sessionStorage.setItem("counter_value", (setCounter-1)*parseInt(sessionStorage.getItem("Steps"))+ lcounter);
  sessionStorage.setItem("speed_avg", Math.round(sum(speed_avg)/speed_avg.length));
  sessionStorage.setItem("time_avg", Math.round(sum(time_avg)/time_avg.length));
  sessionStorage.setItem("time",  time_avg);
  sessionStorage.setItem("speed", speed_avg);
  end_timer=(new Date()).getTime() / 1000
  var totm=Math.floor(Math.round(end_timer-start_timer)/60);
  var tots=Math.round(end_timer-start_timer)-totm*60
  sessionStorage.setItem("total_time",totm+"m"+" "+tots+"s")
  sessionStorage.setItem("total_e",parseInt(sessionStorage.getItem("Steps"))*parseInt(sessionStorage.getItem("Sets")))
  document.getElementById("backbone").innerHTML = "";
  document.getElementById("error").innerHTML = "";


  



};




const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  }
});
pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
  selfieMode: true
});
pose.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({ image: videoElement });
  },
  width: 650,
  height: 500
});

camera.start();



