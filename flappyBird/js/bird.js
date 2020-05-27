var startBtn = document.querySelector(".startBtn");
var startPage = document.querySelector(".startPage");
var flybird = document.querySelector(".flybird");
var gamewrap = document.querySelector(".gamewrap");
var colwrap = document.querySelector(".colwrap");
var col = document.getElementsByClassName("colcon");
var over = document.querySelector('.over');
var score = document.querySelectorAll('.scorewrap img');
var s = {
    speed: 0, //鸟的速度
    bl: 50, //鸟的left值
    bw: 40, //鸟的宽
    bh: 29, //鸟的高
    y: 0, //鸟的top值
    arrl: [], //记录li的left值，以及上下柱子上下沿的top值,柱子是否已经飞过
    cw: 62, //柱子宽度
    scores: 0 //分数
}
//开始游戏
startBtn.onclick = function() {
    startPage.style.display = "none";
    game();
}

function game() {
    gamewrap.style.display = "block";
    birdMove();
    createCol();
    colMove();
}

function birdMove() {
    s.birdTimer = setInterval(function() {
        s.speed += 0.4;
        s.y += s.speed;
        if (s.speed > 0) {
            flybird.className = "flybird downBird";
        } else {
            flybird.className = "flybird upBird";
        }
        flybird.style.top = s.y + "px";
        if (s.y < 0 || s.y + s.bh > 422) {
            gameOver();
        }
        crash();
    }, 24)
}

gamewrap.onclick = function() {
    s.speed = -8;
}

function createCol() {
    s.createTimer = setInterval(function() {
        clearInterval(s.createTimer);
        createCol();
        var newli = document.createElement("li");
        newli.className = "colcon";
        newli.style.left = "343px";
        var topcol = document.createElement("div");
        topcol.innerHTML = '<span class="tophead"></span>';
        topcol.className = "coltop";
        var topH = getRand(50, 200);
        topcol.style.height = topH + "px";
        var sumH = getRand(250, 300);
        var botcol = document.createElement("div");
        botcol.innerHTML = '<span class="bothead"></span>';
        botcol.className = "colbot";
        botcol.style.height = sumH - topH + "px";
        newli.appendChild(topcol);
        newli.appendChild(botcol);
        colwrap.appendChild(newli);
        s.arrl.push([343, topH, 422 - (sumH - topH), false]);
    }, 2000)
}

function colMove() {
    s.colTimer = setInterval(function() {
        for (var i = 0; i < col.length; i++) {
            s.arrl[i][0] -= 3;
            col[i].style.left = s.arrl[i][0] + "px";
            //柱子右侧已经移动到鸟的左侧了
            //柱子还没有被记过分
            if (s.arrl[i][0] + s.bw <= 50 && s.arrl[i][3] == false) {
                s.scores++;
                //记分过后修改柱子的状态为已经记过分
                s.arrl[i][3] = true;
                console.log(s.scores);
                if (s.scores % 10 == s.scores) {
                    score[1].src = '../images/' + s.scores % 10 + '.jpg';
                } else {
                    score[0].src = '../images/' + (s.scores - s.scores % 10) / 10 + '.jpg';
                    score[1].src = '../images/' + s.scores % 10 + '.jpg';
                }
            }
            if (s.arrl[i][0] < -80) {
                colwrap.removeChild(col[i]);
                s.arrl.shift();
            }
        }
    }, 24)
}

function crash() {
    for (var i = 0; i < col.length; i++) {
        //碰到柱子的左侧
        if (s.bl + s.bw >= s.arrl[i][0] && s.bl <= s.arrl[i][0] + s.cw) {
            //上柱子的上侧，上柱子的下侧，下柱子的上侧，下柱子的下侧
            if ((s.y > 0 && s.y < s.arrl[i][1]) || (s.y + s.bh > s.arrl[i][2] && s.y + s.bh < 422)) {
                gameOver();
            }
        }
        if (s.y < 0 || s.y + s.bh > 422) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(s.birdTimer);
    clearInterval(s.colTimer);
    clearInterval(s.createTimer);
    flybird.className = "flybird downBird";
    s.speed = 0;
    s.overTimer = setInterval(function() {
        s.speed += 2;
        s.y += s.speed;
        if (s.y > 422) {
            s.y = 422;
            clearInterval(s.overTimer)
            flybird.className = "flybird";
        }
        flybird.style.top = s.y + "px";
    }, 24)
    over.style.display = 'block';
}




function getRand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}