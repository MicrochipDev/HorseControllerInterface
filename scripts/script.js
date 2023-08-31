var _AutoManual = true, _AutoHand = true, PSW = false;
var In1Val, In2Val, In3Val, In4Val;
var text1 = document.getElementById("txt1");
var _FWD = document.getElementById("FWD");
var _REV = document.getElementById("REV");
var _Auto = document.getElementById("AUTO");
var _Hand = document.getElementById("HAND");
var _AutoSpeed = document.getElementById("_A");
var _ManualSpeed = document.getElementById("_M");
var _Speed1 = document.getElementById("S1");
var _Speed2 = document.getElementById("S2");
var _Speed3 = document.getElementById("S3");
var GotAnswer = true;

var x = setInterval(function() {
    if (GotAnswer) {
        GotAnswer = false;
        RequestData();
    }
},2000); 

function RequestData() {   
    var URL = "IndexRequest.Script";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText) {
                var str = new Array();
                str = this.responseText.split(",");

                In1Val = str[0];    // ON INDICATION 
                In2Val = str[1];    // FWD IN AUTOMODE
                In3Val = str[2];    // REV IN AUTOMODE 

                MyF_Inputs();
                GotAnswer = true;
            }
        }
    };
    xhttp.open("GET", URL, true);
    xhttp.send();
} 

let Start = () => MyF_Output("XStart");
let Stop = () => MyF_Output("XStop");

let power_switch = () => {
    if (!PSW) {
        document.getElementById("swl").style.background = "rgb(0, 255, 0)";
        document.getElementById("swl").style.transform = "translateY(-31px)";
        PSW = true;
    } 
    else {
        document.getElementById("swl").style.background = "rgb(255, 0, 0)";
        document.getElementById("swl").style.transform = "translateY(0px)";
        PSW = false;
    }

    MyF_Output("W"+PSW);
}

let A_M = () => {
    if (!_AutoManual){
        text1.innerHTML = "AUTO";
        _AutoManual = true;
        MyF_Output("XAuto");
    }
    else{
        text1.innerHTML = "MANUAL";
        _AutoManual = false;
        MyF_Output("XManual");
    }
}

let AutoSpeed = () => {
    _AutoSpeed.style.background = "blue";
    _ManualSpeed.style.background = "rgb(160, 160, 160)";
    _Speed1.style.background = "rgb(160, 160, 160)";
    _Speed2.style.background = "rgb(160, 160, 160)";
    _Speed3.style.background = "rgb(160, 160, 160)";
    MyF_Output("XAutoSpeed");
}
let ManualSpeed = () => {
    _AutoSpeed.style.background = "rgb(160, 160, 160)";
    _ManualSpeed.style.background = "blue";
    _Speed1.style.background = "rgb(160, 160, 160)";
    _Speed2.style.background = "rgb(160, 160, 160)";
    _Speed3.style.background = "rgb(160, 160, 160)";
    MyF_Output("XManualSpeed");
}
let Speed1 = () => {
    _AutoSpeed.style.background = "rgb(160, 160, 160)";
    _ManualSpeed.style.background = "rgb(160, 160, 160)";
    _Speed1.style.background = "green";
    _Speed2.style.background = "rgb(160, 160, 160)";
    _Speed3.style.background = "rgb(160, 160, 160)";
    MyF_Output("XSpeed1");
}
let Speed2 = () => {
    _AutoSpeed.style.background = "rgb(160, 160, 160)";
    _ManualSpeed.style.background = "rgb(160, 160, 160)";
    _Speed1.style.background = "rgb(160, 160, 160)";
    _Speed2.style.background = "green";
    _Speed3.style.background = "rgb(160, 160, 160)";
    MyF_Output("XSpeed2");
}
let Speed3 = () => {
    _AutoSpeed.style.background = "rgb(160, 160, 160)";
    _ManualSpeed.style.background = "rgb(160, 160, 160)";
    _Speed1.style.background = "rgb(160, 160, 160)";
    _Speed2.style.background = "rgb(160, 160, 160)";
    _Speed3.style.background = "green";
    MyF_Output("XSpeed3");
}

let Fwd = () => {
    if (!_AutoHand){
        _FWD.style.background = "green";
        _REV.style.background = "rgb(160, 160, 160)";
        MyF_Output("XForward");
    }
}
let Rev = () => {
    if (!_AutoHand){
        _REV.style.background = "green";
        _FWD.style.background = "rgb(160, 160, 160)";
        MyF_Output("XReverse");
    }
}

let Auto = () => {
    _Auto.style.background = "green";
    _Hand.style.background = "rgb(160, 160, 160)";
    _FWD.style.background = "green";
    _REV.style.background = "rgb(160, 160, 160)";
    _AutoHand = true;
    MyF_Output("XAutoMode");
}
let Time = () => {
    var Time = document.getElementById("Time").value;  
    document.getElementById("T_Val").innerHTML = Time;
    MyF_Output("T"+Time);   
}
let Hand = () => {
    _Hand.style.background = "green";
    _Auto.style.background = "rgb(160, 160, 160)";
    _AutoHand = false;
    MyF_Output("XHandMode");
}

let Freq = () => {
    var Frequency = document.getElementById("Frequency").value;  
    document.getElementById("f_val").innerHTML = Frequency;
    MyF_Output("F"+Frequency);   
}

function MyF_Inputs(){
    if (In1Val === "0") {
        document.getElementById("ON").style.background = "rgb(0, 128, 0)";
        document.getElementById("OFF").style.background = "rgb(255, 0, 0)";
    } 
    else {
        document.getElementById("ON").style.background = "rgb(0, 255, 0)";
        document.getElementById("OFF").style.background = "rgb(128, 0, 0)";
    }

    if (_AutoHand && In2Val === "1") {
        _FWD.style.background = "green";
        _REV.style.background = "rgb(160, 160, 160)";
    } 

    if (_AutoHand && In3Val === "1") {
        _REV.style.background = "green";
        _FWD.style.background = "rgb(160, 160, 160)";
    } 
}

function MyF_Output(val){
    var val;

    var URL = "Action.Script?Value=" + val;
    console.log (URL);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "Okay") { 
                alert("Success");
            }
        }
    };

    xhttp.open("GET", URL, true);
    xhttp.send();
}