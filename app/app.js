//データセット
const lapSet =[
    {
        name:48,
        lapName:[
            'マリカス',
            'ウォタパ',
            'スイキャニ'
        ]
    },
    {
        name:1,
        lapName:[
            'test clear!'
        ]
    },
    {
        name:50,
        lapName:[
            'success!'
        ]
    }
]


const $time = document.getElementById('time');
const $startButton = document.getElementById('startButton');
const $clearButton = document.getElementById('clearButton');
const $stopButton = document.getElementById('stopButton');
const $lapButton = document.getElementById('lapButton');
const $targetTime =document.getElementById('targetTime');
//const $span3 =document.getElementById("span3");

//course
//lap setter
let numOfLaps =0;
const setNumfLaps =()=>{
    const $num_of_laps = document.getElementById('numOfLaps');
    numOfLaps=$num_of_laps.value;
    document.getElementById("span2").textContent = numOfLaps;
};

//course name setter
const setLapName =()=>{
    document.getElementById("span-name").innerHTML=null;
    let numCounter=0;
    
    while(numCounter<numOfLaps){
        document.getElementById("span-name").innerHTML +='<input type="text" name="name" id=course'+numCounter+'><input type="number" id=lap'+numCounter+'></p>';
        numCounter++;
    }
};

//目標タイム設定
let targetTime=0;
let eachTime=0;

const setTargetTime =()=>{
    targetTime=$targetTime.value;
    eachTime=targetTime/numOfLaps;
    document.getElementById("span-time").textContent = targetTime;
    //console.log(targetTime+"秒でゴールするぞ"+numOfLaps+"周するぞ"+eachTime+"秒が１コースあたりの目標！");
};

// 開始時間
let startTime;
// 停止時間
let stopTime = 0;
// タイムアウトID
let timeoutID;
//lap count
let lapCount=0;


//timer
function displayTime() {
    const currentTime = new Date(Date.now() - startTime + stopTime);
    const h = String(currentTime.getHours()-9).padStart(2, '0');
    const m = String(currentTime.getMinutes()).padStart(2, '0');
    const s = String(currentTime.getSeconds()).padStart(2, '0');
    const ms = String(currentTime.getMilliseconds()).padStart(3, '0');
  
    $time.textContent = `${h}:${m}:${s}.${ms}`;
    timeoutID = setTimeout(displayTime, 10);
  }

$startButton.addEventListener('click',()=>{
    console.log('start clicked!');
    $startButton.disabled = true;
    $clearButton.disabled = true;
    $stopButton.disabled =false;
    startTime = Date.now();
    displayTime();
});

const lapButton=()=>{
        console.log('lap clicked!');
        $startButton.disabled = true;
        $clearButton.disabled = true;
        $stopButton.disabled = false;
        clearTimeout(timeoutID);
        stopTime += (Date.now() - startTime);
        console.log(stopTime/1000);

        let timePer10=0;
        let timePer5=0;
        let timePerMi10=0;
        let timePerMi5=0;

       
        let lapTime=0;
        
        if(lapCount<numOfLaps){
            //console.log(document.getElementById("lap"+(lapCount+1)));
            /*if(lapCount>0){
                beforeTime=document.getElementById("lap"+(lapCount-1)).value;
                //console.log(beforeTime+"が前ラップのタイムです");
            }*/
            let num=0;
            let compareTime =eachTime;

            while(num<lapCount){
                compareTime+=eachTime;
                num++;
            }
            console.log(compareTime+"です");
            timePer10=compareTime*1.1;
            timePer5=compareTime*1.05;
            timePerMi10=compareTime*0.9;
            timePerMi5=compareTime*0.95;

            lapTime=stopTime/1000;
           
            let Time=$time.textContent;
            console.log(Time);
            //document.getElementById("lap"+lapCount).textContent=Time;
            
            document.getElementById("lap"+lapCount).value=lapTime;

            if(timePer10<lapTime){
                document.getElementById("lap"+lapCount).style.color="red";
                console.log("めっちゃおしてる");
            }else if(timePer5<lapTime && lapTime<=timePer10){
                document.getElementById("lap"+lapCount).style.color="#ffaa00";
                console.log("おしてる");
            }else if(timePerMi5<=lapTime && lapTime<=timePer5){
                document.getElementById("lap"+lapCount).style.color="green";
                console.log("まあまあ");
            }else if(timePerMi10<=lapTime && lapTime<timePerMi5){
                document.getElementById("lap"+lapCount).style.color="blue";
                console.log("巻いてる");
            }else if(lapTime<timePerMi10){
                document.getElementById("lap"+lapCount).style.color="black";
                console.log("めっちゃ巻いてる");
            }
            
            //$span3.innerHTML += (lapCount+1) +"lap "+stopTime/1000+"<br>";
        }

        lapCount++;
        if(lapCount<numOfLaps){
            startTime = Date.now();
            displayTime();
        }else{
            clearTimeout(timeoutID);
            $startButton.disabled = true;
            $clearButton.disabled = false;
            $stopButton.disabled = false;
        }
}

window.document.onkeydown = (event)=>{
    if (event.key === 'Enter') {
        lapButton();
    }
   
}

$lapButton.addEventListener('click', ()=>{
    lapButton();
});
   
$stopButton.addEventListener('click', function() {
    $startButton.disabled = false;
    $stopButton.disabled = true;
    $clearButton.disabled = false;
    clearTimeout(timeoutID);
    stopTime += (Date.now() - startTime);
});

$clearButton.addEventListener('click',()=>{
    console.log('clear clicked!');
    $startButton.disabled = false;
    $clearButton.disabled = true;
    $stopButton.disabled = false;
    $time.textContent = '00:00:00.000';
    stopTime = 0;
    lapCount=0;

    let n=0;
    while(n<numOfLaps){
        document.getElementById("lap"+n).value=null;
        n++;
    }

    //numOfLaps=null;
    document.getElementById("span2").textContent = numOfLaps;
    //document.getElementById("span3").textContent = null;
   
});