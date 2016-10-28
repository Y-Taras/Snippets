document.addEventListener("DOMContentLoaded", function () {

    var checkOn = document.querySelector("input[type=checkbox]");
    var gameCount = document.getElementsByClassName("innerCount")[0];
    var startButton = document.getElementById("innerStart");
    var strictButton = document.getElementById("strictButton");
    var strictInd = document.getElementById("strictIndicator");
    var strictMode = false;

    var soundArray = document.getElementsByTagName("audio");
    var buttonArray = document.querySelectorAll(".bigButton");

    checkOn.addEventListener("change", function () {

        if (checkOn.checked) {
            gameCount.innerHTML = "--";
        } else {
            gameCount.innerHTML = "";
        }
    });
    startButton.addEventListener("click", function () {
        playGame();
    });
    strictButton.addEventListener("click", function () {
        strictMode = !strictMode;
        strictMode ? strictInd.style.backgroundColor = "#FF0000" :
            strictInd.style.backgroundColor = "#850000";
    });
    if (checkOn.checked) {
        var randIndexArr = getRandArray();
    }

    function getRandArray() {
        var array = [];
        for (var i = 0; i < 22; i++) {
            array[i] = Math.floor(Math.random() * 4 + 1);
        }
        return array;
    }

    function checkSound(level, randIndexArr) {
        var counter = 0;
        var checkArr = randIndexArr.slice(0, (level + 1));
        for (var i = 0; i < 4; i++) {
            buttonArray[i].addEventListener("click", function (e) {
                if (+(this.dataset.sound) !== checkArr[counter]) {
                    return false;
                }
                counter++;
            })
        }
        if (counter === level) {
            return true;
        }
    }

    function playGame() {
        var randIndexArr = getRandArray();
        for (var i = 0; i <= 22; i++) {
            for (var j = 0; j <= i; j++) {
                soundArray[randIndexArr[j]].play();
                if (j === i) {
                    if (!(checkSound(j, randIndexArr))) {
                        if (strictMode) {
                            i = j = 0;
                        }
                        j = 0;
                    }
                }
            }
        }
    }
});
