var canvas = document.getElementById('canvas');
//let canvas2 = document.getElementById('canvas2');
var c = canvas.getContext('2d');
//let c2 = canvas2.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
//canvas2.width = width - (0.1 * window.innerWidth);
//canvas2.height = height - (0.1 * window.innerHeight);
let keyCode;
let keys = [];

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    console.log('resize');
    canvas.height = window.innerHeight;
    height = window.innerHeight;
    width = window.innerWidth;
});

document.addEventListener('keydown', function(){
    keycode = event.which || event.keyCode;
    keys[keycode] = true;
});

window.addEventListener('keyup', function(){
    keycode = event.which || event.keyCode;
    keys[keycode] = false;
});

// draw an unrotated reference rect
let drawrect = (x, y, w, h, d) => {
    c.save();
    c.beginPath();
    c.translate(x, y);
    c.rotate(d * Math.PI / 180);
    c.fillStyle = "red";
    c.fillRect(-w / 2, -h / 2 , w, h);
    //c.fill();
    c.restore();
}

let x = width / 2;
let y = height / 2;
let w = 50;
let h = 20;
let speed = 0;
let acc = 0.1;
let moving = false;
let anglemove = 1;
let angleacc = 0.2;
let degrees = 0;
let score = 0;
let text = "";
let dist = 0;
let textcolor = 'white';


/*************************************************************************








    TO DETECT THE COLLISIONS JUST USE THE FOUR CORNERS OF THE CAR AND
    USE GET IMAGE DATA TO SEE IF THERE WHITE IN FRONT AND THEN STOP
                           THE CAR FROM MOVING 








 *************************************************************************/

let play_game = () => {
    if(keys[87] || keys[38]){ //up
        speed += acc;
        speed > 8 ? speed = 8 : speed = speed;
        moving = true;
    }
    if(keys[83] || keys[40]){ //down
        speed -= acc;
        speed < -8 ? speed = -8 : speed = speed;
        moving = true;
    }
    if(keys[65] || keys[37]){ 
        anglemove > 7 ? anglemove = 7 : anglemove = anglemove;
        anglemove += angleacc;
        degrees -= anglemove;
        moving = true;
    }
    if(keys[68] || keys[39]){ //right
        anglemove > 7 ? anglemove = 7 : anglemove = anglemove;
        anglemove += angleacc;
        degrees += anglemove;
        moving = true;
    }
    if(!keys[87] && !keys[83] && !keys[40] && !keys[38]){
        speed > 0 ? speed -= 0.2 : speed += 0.2;
        moving = false;
    }
    if(!keys[65] && !keys[68] && !keys[37] && !keys[39]){
        anglemove = 0;
    }
    if(keys[16]){
        speed > 0 ? speed -= 0.5 : speed += 0.5;
    }
    /**************************************
     
            THIS GON BE DA COLLISION
     
    ***************************************/
    // distance formula -> d = Math.sqrt(Math.pow(somepointoncar - width / 2, 2) + same for y)
    dist = Math.sqrt(Math.pow(width / 2 - x, 2) + Math.pow(height / 2 - y, 2));
    console.log(dist);
    //inner circ = width * 0.325
    //outer circ = width * 0.4
    if(dist >= (width > height ? height * 0.25 : width * 0.25) && dist <= (width > height ? height * 0.4 : width * 0.4)){
        console.log('its working');
        textcolor = 'white';
    }
    else{
        score = 0;
        textcolor = 'red';
    }


    // end collision detection
    x += speed * Math.cos(degrees * Math.PI / 180);
    y += speed * Math.sin(degrees * Math.PI / 180);
    drawrect(x, y, w, h, degrees);
}

function animate(){
    requestAnimationFrame(animate)
    track();
    play_game();
    scoreboard();
}

function track(){
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    c.beginPath();
    c.strokeStyle = 'white';
    c.arc(width / 2, height / 2, width > height ? height * 0.4 : width * 0.4, 0, Math.PI * 2);
    c.stroke();
    c.beginPath();
    c.arc(width / 2, height / 2, width > height ? height * 0.25 : width * 0.25, 0, Math.PI * 2);
    c.stroke();
    c.beginPath();
    c.strokeStyle = 'yellow'
    c.arc(width / 2, height / 2, width > height ? height * 0.325 : width * 0.325, 0, Math.PI * 2);
    c.stroke();
}

function scoreboard(){
    if(moving){
        score += 0.1;
    }
    c.font = "30px Arial";
    c.fillStyle = textcolor;
    text = "Score: " + Math.round(score);
    c.fillText(text, width / 2 - (text.length * 7), 40);

}

animate();

// function drawRotatedRect(x,y,width,height,degrees){
//     c.clearRect(0, 0, 1000, 1000)

//     // first save the untranslated/unrotated context
//     c.save();

//     c.beginPath();
//     // move the rotation point to the center of the rect
//     c.translate( x+width/2, y+height/2 );
//     // rotate the rect
//     c.rotate(degrees*Math.PI/180);

//     // draw the rect on the transformed context
//     // Note: after transforming [0,0] is visually [x,y]
//     //       so the rect needs to be offset accordingly when drawn
//     c.rect( -width/2, -height/2, width,height);

//     c.fillStyle="rgba(100, 100, 100, 1)";
//     c.fill();

//     // restore the context to its untranslated/unrotated state
//     c.restore();
// }