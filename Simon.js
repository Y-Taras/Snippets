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
    function getRandArray() {
        var array = [];
        for (var i = 0; i < 22; i++) {
            array[i] = Math.floor(Math.random() * 4);
        }
        return array;
    }

    function checkSound(randIndexArr) {
        var result = true;
        var counter = 0;
        for (var i = 0; i < 4; i++) {
            buttonArray[i].addEventListener("click", function (e) {
                changeColor(this.dataset.sound);
                if (+(this.dataset.sound) !== randIndexArr[counter]) {
                    result = false;
                    return;
                }
                counter++;
            })
        }
        return result;
    }

    function changeColor(index) {
        var oldColor = buttonArray[index].style.backgroundColor;

        function setOldColor() {
            buttonArray[index].style.backgroundColor = oldColor;
        }

        buttonArray[index].style.backgroundColor = oldColor.replace("36", "72");
        setTimeout(setOldColor, 1500);
    }

    function playGame() {
        var randIndexArr = getRandArray();
        for (var i = 0; i <= 22; i++) {
            for (var j = 0; j <= i; j++) {
                gameCount.innerHTML = i + 1;
                soundArray[randIndexArr[j]].play();
                changeColor(randIndexArr[j]);
                if (j === i) {
                    if (!(checkSound(randIndexArr))) {
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
