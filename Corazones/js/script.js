var canvas = document.getElementById("heartCanvas");
var stage = new createjs.Stage(canvas);
var w, h;

window.addEventListener("resize", resize);
resize();

// Texto central
var text = new createjs.Text(
    "the longer I'm with you\nthe more I love you YASLY", 
    "bold 24px Arial", 
    "#FF69B4"
);
text.textAlign = "center";
text.textBaseline = "middle";
text.x = w / 2;
text.y = h / 2;
stage.addChild(text);

var container = new createjs.Container();
stage.addChild(container);

// Función corregida para dibujar corazones
function drawHeart(graphics) {
    graphics.beginFill("#FF69B4");
    graphics.moveTo(0, 5);
    graphics.bezierCurveTo(0, 0, -5, -5, -10, -5);
    graphics.bezierCurveTo(-15, -5, -15, 2, -15, 2);
    graphics.bezierCurveTo(-15, 8, -5, 12, 0, 15);
    graphics.bezierCurveTo(5, 12, 15, 8, 15, 2);
    graphics.bezierCurveTo(15, 2, 15, -5, 10, -5);
    graphics.bezierCurveTo(5, -5, 0, 0, 0, 5);
    graphics.endFill();
}

var hearts = [];
createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.on("tick", function() {
    if (Math.random() < 0.1) {
        var heart = new createjs.Shape();
        drawHeart(heart.graphics);
        heart.x = Math.random() * w;
        heart.y = h + 20;
        heart.scale = Math.random() * 1.5 + 0.5;
        heart.speed = Math.random() * 2 + 1;
        container.addChild(heart);
        hearts.push(heart);
    }
    
    for (var i = hearts.length - 1; i >= 0; i--) {
        var hrt = hearts[i];
        hrt.y -= hrt.speed;
        if (hrt.y < -50) {
            container.removeChild(hrt);
            hearts.splice(i, 1);
        }
    }
    stage.update();
});

function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
}