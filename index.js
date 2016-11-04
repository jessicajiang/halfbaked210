//This is the header title rainbow effect
var speed=100; // speed colours change, 1 second = 1000
var glow=3; // can be set from '0' for no glow, to 10
var raincol=new Array("#ff0000", "#ff5500", "#ffaa00", "#ffff00", "#aaff00", "#55ff00", "#00ff00", "#00ff55", "#00ffaa", "#00ffff", "#00aaff", "#0055ff", "#0000ff", "#5500ff", "#aa00ff", "#ff00ff", "#ff00aa", "#ff0055"); // change the colours if you want to
var alink="asdfjaksldf;adjksfl"; // page to link text to 

var rainbow, raintxt, raincnt=0;

function addLoadEvent(funky) {
	console.log("it me");
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addLoadEvent(regenbogen);

function regenbogen() { if (document.getElementById) {
	console.log("it me");
  var i, rainbeau;
  rainbow=document.getElementById("rainbow");
  raintxt=rainbow.firstChild.nodeValue;
  while (rainbow.childNodes.length) rainbow.removeChild(rainbow.childNodes[0]);
  for (i=0; i<raintxt.length; i++) {
    rainbeau=document.createElement("span");
    rainbeau.setAttribute("id", "rain"+i);
    rainbeau.appendChild(document.createTextNode(raintxt.charAt(i)));
    if (alink) {
      rainbeau.style.cursor="pointer";
      rainbeau.onclick=function() { top.location.href=alink; }
    }
    rainbow.appendChild(rainbeau);
  }
  rainbow=setInterval ("raining()", speed);
}}

function raining() {
  var i, c;
  for (i=0; i<raintxt.length; i++) {
    c=raincol[(i+raincnt)%raincol.length];
    document.getElementById("rain"+i).style.color=c;
	if (glow) document.getElementById("rain"+i).style.textShadow=c+" 0px 0px "+glow+"px";
  }
  raincnt++;
}



//This is all the mouse cursor thing
var second_hand_colour="#c9f"; // colour of second hand
var minute_hand_colour="#96c"; // colour of minute hand
var hour_hand_colour="#639"; // colour of hour hand
var facia_colour="#639"; // colour of facia (i.e. numbers)
var face_colour="#ccc"; // colour of face (can be set to "transparent");
var xoffset=60; // horizontal distance from centre of clock to cursor
var yoffset=60; // vertical distance from centre of clock to cursor
var size=60; // pixels high/wide
var facia=String.fromCharCode(9660)+" 1 2 "+String.fromCharCode(9668)+" 4 5 "+String.fromCharCode(9650)+" 7 8 "+String.fromCharCode(9658)+" 10 11"; // characters to use for face, starting at '12' position
var clok;
var newx=xmo=400;
var newy=ymo=300;
window.onload=function() { if (document.getElementById) {
  var i, j, k;
  clok=document.createElement("div");
  clok.style.position="absolute";
  if (face_colour!="transparent") for (i=0; i<size; i++) {
      j=createDiv(false, face_colour);
      if (document.all) j.style.filter="Alpha(Opacity=50)";
      else j.style.opacity=0.5;
      k=size*Math.sqrt(i/size-Math.pow(i/size, 2));
      j.style.left=size/2-k+"px";
      j.style.top=i+"px";
      j.style.height="1px";
      j.style.width=k*2+"px";
      clok.appendChild(j);
  }
  for (i=1; i<size/4; i++) {
      j=createDiv("sec"+i, second_hand_colour);
      j.style.height="2px";
      j.style.width="2px";
      clok.appendChild(j);
  }
  for (i=1; i<size/4; i++) {
      j=createDiv("min"+i, minute_hand_colour);
      j.style.height="3px";
      j.style.width="3px";
      clok.appendChild(j);
  }
  for (i=0; i<size/6; i++) {
      j=createDiv("hour"+i, hour_hand_colour);
      j.style.height="4px";
      j.style.width="4px";
      if (!i) j.style.top=j.style.left=size/2-2+"px";
      clok.appendChild(j);
  }
  facia=facia.split(" ");
  for (i=0; i<12; i++) {
      j=createDiv(false, "transparent");
      j.style.color=facia_colour;
      j.style.font="bold 10pt monospace";
      j.style.overflow="visible";
      j.appendChild(document.createTextNode(facia[i]));
      j.style.top=size/2-7-size/2*Math.cos(i*Math.PI/6)+"px";
      j.style.left=size/2-5+size/2*Math.sin(i*Math.PI/6)+"px";
      clok.appendChild(j);
  }
  document.body.appendChild(clok);
  tick();
  tock();
}}


function tick() {
  var i, j;
  var now=new Date();
  var sec=(now.getSeconds()+(now.getMilliseconds()%1000)/1000)*Math.PI/30;
  for (i=1; i<size/4; i++) {
      j=document.getElementById("sec"+i).style;
      j.left=size/2+2*i*Math.sin(sec)-1+"px";
      j.top=size/2-2*i*Math.cos(sec)-1+"px";
  }
  xmo+=Math.floor((newx-xmo)/4);
  clok.style.left=xmo+"px";
  ymo+=Math.floor((newy-ymo)/4);
  clok.style.top=ymo+"px";
  setTimeout("tick()", 40);
}

function tock() {
  var i, j;
  var now=new Date();
  var min=(now.getMinutes()+now.getSeconds()/60)*Math.PI/30;
  var hrs=(now.getHours()+now.getMinutes()/60)*Math.PI/6
  for (i=1; i<size/4; i++) {
      j=document.getElementById("min"+i).style;
      j.left=size/2+2*i*Math.sin(min)-1.5+"px";
      j.top=size/2-2*i*Math.cos(min)-1.5+"px";
  }
  for (i=1; i<size/6; i++) {
      j=document.getElementById("hour"+i).style;
      j.left=size/2+2*i*Math.sin(hrs)-2+"px";
      j.top=size/2-2*i*Math.cos(hrs)-2+"px";
  }
  setTimeout("tock()", 999);
}
document.onmousemove=mouse;

function mouse(e) {
  newy=yoffset-size/2+((e)?e.pageY:event.y+scro());
  newx=xoffset-size/2+((e)?e.pageX:event.x);
}

function scro() {
  var scro=0;
  if (document.body.scrollTop) scro=document.body.scrollTop;
  else if (document.documentElement && document.documentElement.scrollTop) scro=document.documentElement.scrollTop;
  return (scro);
}

function createDiv(id, bg) {
  var div=document.createElement("div");
  div.style.position="absolute";
  div.style.overflow="hidden";
  div.style.backgroundColor=bg;
  if (id) div.setAttribute("id", id);
  return (div);
}
