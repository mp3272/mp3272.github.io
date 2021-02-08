"use strict";
{   
    const   SHADE = document.getElementById('shade');
    const   X = document.getElementById('x');
    const   BACK_MUSIC = document.getElementById('backgroundMusic');
    const   BACK_MUSIC_RESTING_VOLUME = 30;
            
    var     isMuted = true;
    var     openLeaderCard = '';
   
    //Changes layout of title section from fixed to static after opening sequence so the rest of the interface is laid out correctly
    setTimeout(function(){
        document.getElementsByClassName('center')[0].style.left = '0';
        var titleStyle = document.getElementById('title').style;
        titleStyle.position = 'static';
        titleStyle.margin = '5vh 0 30px 0;';
        titleStyle.left = '0';
    }, 10000);

    //Controls the volume lowering of the music during the intro sequence. Music starts at a higher volume, then will sit at a lower volume.
    setTimeout(function(){musicController(BACK_MUSIC)}, 8000);
    BACK_MUSIC.load();
    function musicController(musicVar){
        if (BACK_MUSIC.paused) return;
        var i = 100;
        setInterval(function(){
            if (i > BACK_MUSIC_RESTING_VOLUME){
                i--;
                musicVar.volume = i / 100;
            }
        }, 40);
        return musicVar.volume;
    }

    //Fades background music in again after a card is closed
    function fadeInMusic(musicVar){
        var i = 0;
        setInterval(function(){
            if (i < BACK_MUSIC_RESTING_VOLUME){
                i++;
                musicVar.volume = i / 100;
            }
        }, 10);
        return musicVar.volume;
    }

    //Fades background music out when a card is opened, so the card's audio doesn't overlap with the background sound
    function fadeOutMusic(musicVar){
        var i = BACK_MUSIC_RESTING_VOLUME;
        setInterval(function(){
            if (i > 0) {
                i--;
                musicVar.volume = i / 100;
            }
        }, 10);
        return musicVar.volume;
    }

    //This will build the interface of the leader's heads
    var     zodiacSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    var     zodiacSignsLength = zodiacSigns.length;
    var     leaderNames = ['taj', 'mosque', 'twin', 'wall', 'burj', 'itza', 'liberty', 'london', 'leaning-tower', 'opera', 'eiffel', 'christ'];

    (function buildBlocks(){
        var leadersContainer = document.createElement('section');
        document.querySelector('body').appendChild(leadersContainer);
        leadersContainer.id = "leadersContainer";
        
        for (let i = 0; i < zodiacSignsLength; i++){
            var newLeader = document.createElement('div');
            leadersContainer.appendChild(newLeader);
            newLeader.classList.add('leader');
            newLeader.id = zodiacSigns[i];
            
            var leaderPic = document.createElement('img');
            newLeader.appendChild(leaderPic);
            leaderPic.classList.add('leaderPic');
            leaderPic.src = `img/${leaderNames[i]}.png`;
            leaderPic.alt = `Picture of ${leaderNames[i]}`;
        }
        return;
    })();

    //Attaching a click event to each leader so you can view each leader's card
    var leader = document.getElementsByClassName('leader');
    for (let i = 0; i < leader.length; i++){
        leader[i].addEventListener("click", function(){showLeaderCard(this.id)}, false);
    }

    //This will display the leaders card
    function showLeaderCard(zodiacId){
        var leaderCard = zodiacId + "Card";
        openLeaderCard = leaderCard;

        if (isMuted == false){
            fadeOutMusic(BACK_MUSIC);
            document.getElementById(zodiacId + 'Sound').play();
        }

        document.getElementById(leaderCard).style.display = "block";
        SHADE.style.display = "block";
        X.style.display = "block";

        return;
    }

    //This will hide the card, make the shade go away and stop/reload audio
    SHADE.addEventListener("click", function(){hideLeaderCard()});
    function hideLeaderCard(){
        document.getElementById(openLeaderCard).style.display = "none";
        SHADE.style.display = "none";
        X.style.display = "none";

        if (isMuted == false){
            document.getElementById(openLeaderCard.slice(0, -4) + 'Sound').pause();
            document.getElementById(openLeaderCard.slice(0, -4) + 'Sound').load();
            fadeInMusic(BACK_MUSIC);
        }
        return;
    }

    //This will work the input section and figure out which card to show
    document.getElementById('submitButton').addEventListener("click", function(){inputFactory()});
    var zodiacSign = '';
    function inputFactory(){
        var month = parseInt(document.getElementById('month').value);
        var day = parseInt(document.getElementById('day').value);

        if (month > 0 && month < 13 && day > 0){
            switch(month){
                default:
                    zodiacSign = 'noMatch';
                case 1:
                    zodiacSign = (day < 18) ? 'capricorn' : (day > 31) ? 'noMatch' : 'aquarius';
                    break;
                case 2:
                    zodiacSign = (day < 21) ? 'aquarius' : (day > 29) ? 'noMatch' : 'pisces';
                    break;
                case 3:
                    zodiacSign = (day < 21) ? 'pisces' : (day > 31) ? 'noMatch' : 'aries';
                    break;
                case 4:
                    zodiacSign = (day < 20) ? 'aries' : (day > 30) ? 'noMatch' : 'taurus';
                    break;
                case 5:
                    zodiacSign = (day < 21) ? 'taurus' : (day > 31) ? 'noMatch' : 'gemini';
                    break;
                case 6:
                    zodiacSign = (day < 22) ? 'gemini' : (day > 30) ? 'noMatch' : 'cancer';
                    break;
                case 7:
                    zodiacSign = (day < 24) ? 'cancer' : (day > 31) ? 'noMatch' : 'leo';
                    break;
                case 8:
                    zodiacSign = (day < 24) ? 'leo' : (day > 31) ? 'noMatch' : 'virgo';
                    break;
                case 9:
                    zodiacSign = (day < 24) ? 'virgo' : (day > 30) ? 'noMatch' : 'libra';
                    break;
                case 10:
                    zodiacSign = (day < 24) ? 'libra' : (day > 31) ? 'noMatch' : 'scorpio';
                    break;
                case 11:
                    zodiacSign = (day < 21) ? 'scorpio' : (day > 30) ? 'noMatch' : 'sagittarius';
                    break;
                case 12:
                    zodiacSign = (day < 22) ? 'sagittarius' : (day > 31) ? 'noMatch' : 'capricorn';
                    break;
            }
        }
        else{
            zodiacSign = 'noMatch';
        }
        showLeaderCard(zodiacSign);
        month = '';
        day = '';

        return zodiacSign;
    }

    //If the user clicks enter, it will trigger the submit button
    document.addEventListener("keypress", function(event){
        if (event.keyCode == 13) {
            inputFactory();
        }
    });

    //Adding the controls to the sound icons. This allows the user to mute/unmute all audio on the page if they want
    var volUp = document.getElementById('volUp');
    var volDown = document.getElementById('volDown');

    volUp.addEventListener("click", function(){volumeButtonControls(BACK_MUSIC)}, false);
    volDown.addEventListener("click", function(){volumeButtonControls(BACK_MUSIC)}, false);
    
    function volumeButtonControls(sound){
        if (sound.paused) {
            sound.play();
            volUp.style.display = 'block';
            volDown.style.display = 'none';
            isMuted = false;
        }
        else{
            sound.pause();
            volUp.style.display = 'none';
            volDown.style.display = 'block';
            isMuted = true;
        }
        return isMuted;
    }
}