

var ctx=gameCanvas.getContext("2d");

// flag arrays
//const flags=['russia','albania','belgium','bosnia_and_herzegovina','bulgaria','czechia','estonia','france','germany','ireland','italy','lithuania','malta','san-marino','serbia','spain','sweden','switzerland','ukraine','vatican_city']
//const flags=['afghanistan','albania','algeria','andorra','angola','atigua_and_barbuda','arab_league','argentina','armenia','aruba','australia','austria','azerbaijan','bahamas','bahrain','bangladesh','barbados','belarus','belgium','belize','benin','bhutan','bolivia','bonaire','bosnia_and_herzegovina','botswana','brazil','bruinei','bulgaria','burkina_faso','burundi','cambodia','cameroon','canada','cape_verde','central_african_republic','chad','chile','china','colombia','comoros','costa_rica',"cote_d'ivoire",'croatia','cuba','curacao','cuprus','czechia','democratic_republic_of_congo','denmark','djibouti','dominica','dominican_republic','east_timor','ecuador','egypt','el_salvador','england','equatorial_guinea','eritrea','estonia','ethiopia','europe','faroe_islands','fiji','finland','france','gabon','gambia','georgia','germany','ghana','greece','greenland','grenada','guadeloupe','guam','guatemala','guinea','bissau ']
const flags=['afghanistan','albania','algeria','andorra','angola','antigua_and_barbuda','arab_league','argentina','armenia','aruba','australia','austria','azerbaijan','bahamas','bahrain','bangladesh','barbados','belarus','belgium','belize','benin','bhutan','bolivia','bonaire','bosnia_and_herzegovina','botswana','brazil','brunei','bulgaria','burkina_faso','burundi','cambodia','cameroon','Canada','cape_verde','central_african_republic','chad','chile','China','colombia','comoros','costa_rica',"cote_d'ivoire",'croatia','cuba','curacao','cyprus','czechia','democratic_republic_of_congo','denmark','djibouti','dominica','dominican_republic','east_timor','ecuador','egypt','el_salvador','england','equatorial_guinea','eritrea','estonia','ethiopia','europe','faroe_islands','fiji','finland','france','gabon','gambia','georgia','germany','ghana','greece','greenland','grenada','guadeloupe','guam','guatemala','guinea','guinea-bissau','guyana','haiti','honduras','hong_kong','hungary','iceland','india','indonesia','iran','iraq','ireland','israel','italy','jamaica','japan','jordan','kazakhstan','kenya','kiribati','kosovo','kuwait','kyrgyzstan','laos','latvia','lebanon','leichtenstein','lesotho','liberia','libya','lithuania','luxembourg','macao','madagascar','malawi','malaysia','maldives','mali','malta','marshall_islands','mauritania','mauritius','mexico','micronesia','moldova','monaco','mongolia','montenegro','morocco','mozambique','myanmar','namibia','nauru','nepal','netherlands','new_caledonia','new_zealand','nicaragua','niger','nigeria','niue','north_korea','north_macedonia','northern_ireland','northern_mariana_islands','norway','oman','pakistan','palau','palestine','panama','papua_new_guinea','paraguay','peru','philippines','poland','portugal','puerto_rico','qatar','republic_of_congo','romania','russia','rwanda','saba','saint_kitts_and_nevis','saint_lucia','saint_martin','saint_vincent_and_the_grenadines','samoa','san-marino','sao_tome_and_principe','saudi_arabia','scotland','senegal','serbia','seychelles','sierra_leone','singapore','slovakia','slovenia','solomon_islands','somalia','south_africa','south_korea','south_sudan','spain','sri_lanka','st_eustatius','st_patrick','sudan','suriname','swaziland','sweden','switzerland','syria','taiwan','tajikistan','tanzania','thailand','togo','tonga','trinidad_and_tobago','tunasia','turkey','turkmenistan','tuvalu','uganda','Uk','ukraine','united_arab_emirates','united_states','uruguay','uzbekistan','vanuatu','vatican_city','venezuela','vietnam','wales','yemen','zambia','zimbabwe']
console.log(flags)
//const flags = ['uk','france','brazil','canada','china']

const shuffledFlags=shuffleArray(flags)
const shuffledFlagImgs=idArrayToImgArray(shuffledFlags);
console.log(shuffledFlagImgs)

// bucket position
var rectWidth = 60
var centreX = gameCanvas.width / 2
var rectX = centreX - rectWidth / 2
var changeX=0;

// target
var targetCountryName='UK';
var nTarget=0;

// score
var score=0;

// game over
var isGameOver='false';
var endOfGame='no';

// next level
var isNextLevel='false';
var nextLevel='no';
var level=0;
// var newflag=level*5;
// const flagsOnScreen=[shuffledFlagImgs[newflag],shuffledFlagImgs[newflag+1],shuffledFlagImgs[newflag+2],shuffledFlagImgs[newflag+3],shuffledFlagImgs[newflag+4]]

// you win
var isYouWin='false';
var YouWinGame='no'





// next level button
const nextLevelButton = document.createElement('button')
nextLevelButton.innerText = 'Next Level'
nextLevelButton.id = 'nextLevelButton'

nextLevelButton.addEventListener('click', () => {
    level+=5;
    playGameLevel();
    nextLevelButton.hidden=true;
})
nextLevelButton.hidden=true;






// movement button
// const moveRightButton = document.createElement('button')
// moveRightButton.innerHTML = '<img src="right_arrow.png" />';
// moveRightButton.id = 'moveRightButton';

// moveRightButton.addEventListener('click', () => {
//     changeX=4;
// })
const div_canvas=document.getElementById('div-canvas-background');
const canvas=document.getElementById('gameCanvas');
div_canvas.insertBefore(nextLevelButton, canvas);

// div_canvas.insert(moveRightButton, canvas);


function ifMoveRightButtonClicked(){
changeX=4;
}

function ifMoveLeftButtonClicked(){
    changeX=-4;
}



if (level==0) {
    playGameLevel();
}




function playGameLevel() {
    isNextLevel='false';
    

    var x=[100, 200,300,400,500];
    var y=[0,0,0,0,0];
    // var speed=[2,1,1.5,3,2.5];
    var speed=[1,0.5,0.75,1.5,1.25];

    var dogX=rectX;

    var flagImgs=[shuffledFlagImgs[level],shuffledFlagImgs[level+1],shuffledFlagImgs[level+2],shuffledFlagImgs[level+3],shuffledFlagImgs[level+4]]
    



    // game timer
    var gameTimer=setInterval(mainLoop,20);
console.log(level);

    // mainloop
    function mainLoop() {
        clearScreenAndShowScore();
        rectOffScreen();
        drawTargetFlagTextAndRect();
        changeTargetFlag();
        updateCoordinatesAndDrawFlags();
        // gameOver();
    }



    // const y = document.getElementById("")

    // event listeners
    document.onkeydown=keyPressed;


    // functions in mainloop

    function clearScreenAndShowScore(){
        ctx.clearRect(0, 0, 640, 480);
        ctx.beginPath()
        ctx.font = '30px Arial'
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 10, 100);
    }


    function updateCoordinatesAndDrawFlags(){
        for (var n=0; n<5; n++){ 
            console.log(flagImgs)
            ctx.drawImage(flagImgs[n],x[n],y[n],100,80);
            y[n]=y[n]+speed[n];
            checkForHits(n);
            flagOffScreen(n);
        }
        if (isGameOver=='true'){
            ctx.clearRect(0,0,640,480);
            gameOver();
        }
        if (isNextLevel=='true'){
            ctx.clearRect(0,0,640,480);
            NextLevel();
        }
        if (isYouWin=='true'){
            ctx.clearRect(0,0,640,480);
            youWin();
        }
    }


    function rectOffScreen(){
        if (dogX > 640) {
            dogX = -80;
        }
        if (dogX < -80) {
            dogX = 640
        }
    }
    

    function drawTargetFlagTextAndRect(){
        ctx.fillStyle = "gold";
        ctx.fillRect(dogX, 380, 60, 40);
        var blobImage=document.getElementById('imageOfBlob');
        //console.log(imageOfBlob);
        ctx.drawImage(blobImage,dogX+15,380,30,40);
        //ctx.fillStyle = "black";
        //ctx.font="30ps Arial";
        //ctx.fillText("UK", dogX, 400);
        console.log('targetcountryname',targetCountryName);
        ctx.font = '40px Arial'
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        ctx.strokeText(targetCountryName, 20, 50);
        ctx.fillStyle = 'black';
        ctx.fillText(targetCountryName, 20, 50);

        dogX += changeX;
    }


    function changeTargetFlag(){ 
        //shuffleArray(flags);
        console.log('ntarget',nTarget);
        targetCountryName=shuffledFlags[nTarget];
        console.log('ntarget',nTarget);
    }

    

    function checkForHits(n){
        // this is first checking if the first flag and the bucket are touching then putting the flag back at the top.
        // if((Math.abs(300-y[0] )<1)&&
        if((300<y[n]) && (y[n]<420) &&      
        (Math.abs(dogX-x[n])<60)){
            // score+=2;
            y[n]=-80; x[n]=Math.random()*600;
            if (nTarget-level==n){
                nTarget+=1;
                changeTargetFlag(nTarget);
                score=nTarget;
                if (nTarget==220){
                    isYouWin='true';
                }
                if (nTarget==level+5){
                    isNextLevel='true';
                }
            } else {
                isGameOver='true';
            }
        }
    }


    function flagOffScreen(n){
        if(y[n]>480){
            y[n]=-80; x[n]=Math.random()*600;
            //newarray+=1;
        }
    }
        
        

        
    function gameOver(){
        clearInterval(gameTimer);
        ctx.font="80ps Arial";
        ctx.clearRect(0,0,640,480);
        ctx.fillText("Game Over!",225,50);
        ctx.fillText("Score: " + score, 255, 100);
        ctx.fillText(targetCountryName,20,180);
        //var blobImage=document.getElementById(imageOfBlob);
        var targetCountryImg=document.getElementById(targetCountryName);
        ctx.drawImage(targetCountryImg,20,220,200,160);
        
    }



    function youWin(){
        clearInterval(gameTimer);
        ctx.font="80ps Arial";
        ctx.clearRect(0,0,640,480);
        ctx.fillText("You Beat The Game!",180,50);
        ctx.fillText("Score: " + score, 255, 100);
    }




    function NextLevel(){
        clearInterval(gameTimer);
            ctx.font="80ps Arial";
            ctx.clearRect(0,0,640,480);
            ctx.fillText("Next Level!",230,230);
            ctx.fillText("Score: " + score, 255, 280);
            nextLevelButton.hidden=false;
    }

}
// utility functions



  function keyPressed(e){
    //console.log('e',e)
    var k=e.keyCode;
    if(k==37){changeX=-4;}
    if(k==39){changeX=4 ;}
  }

  function idArrayToImgArray(arrayOfIds){
    var arrayOfImgs=[];
    for (var a=0; a<arrayOfIds.length; a++){
        arrayOfImgs[a]=document.getElementById(arrayOfIds[a])
    }
    console.log(arrayOfImgs);
    return arrayOfImgs
}



function shuffleArray(array){
    let newarray = [...array]
    for (let i = newarray.length - 1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [newarray[i], newarray[j]]=[newarray[j], newarray[i]];
    }
    return newarray;
  }