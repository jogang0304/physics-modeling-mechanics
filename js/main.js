const C = 0.4;
const g = 9.81;
const offset_x = 20;
const offset_y = 10;
let canvas = document.getElementById("main_canvas");
let info = document.getElementById("info");
let count_button = document.getElementById("count");
let ctx = canvas.getContext("2d");
set_resolution();
draw_coordinates(2, offset_x, offset_y);
function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return [
        Math.round(((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width),
        Math.round(((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height),
    ];
}
canvas.addEventListener("mousemove", function (e) {
    let cords = getCursorPosition(canvas, e);
    write(cords);
});
function write(data) {
    let text = "";
    if (typeof data == "object") {
        data.forEach((element) => {
            text += element.toString() + " ";
        });
    }
    else {
        text += data.toString();
    }
    info.innerHTML = text;
}
function draw_point(x, y, offset_x, offset_y, scale) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect((offset_x + x) * scale, canvas.height - (offset_y + y) * scale, scale, scale);
    ctx.fillStyle = "#000000";
}
function draw_coordinates(scale, offset_x, offset_y) {
    ctx.fillStyle = "#000000";
    ctx.lineWidth = scale;
    ctx.beginPath();
    ctx.moveTo(offset_x * scale, canvas.height - offset_y * scale);
    ctx.lineTo(canvas.width - offset_x * scale, canvas.height - offset_y * scale);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(offset_x * scale, canvas.height - offset_y * scale);
    ctx.lineTo(offset_x * scale, offset_y * scale);
    ctx.stroke();
    ctx.closePath();
    ctx.font = ((offset_y - 2) * scale).toString() + "px sans";
    for (let x = offset_x; x < canvas.width; x += offset_x * 2) {
        ctx.fillText(x.toString(), (offset_x + x) * scale, canvas.height - 1);
    }
    for (let y = offset_x; y < canvas.width; y += offset_x * 2) {
        ctx.fillText(y.toString(), 1, canvas.height - (offset_y + y) * scale);
    }
}
function set_resolution() {
    canvas.style.width = 1000 + "px";
    canvas.style.height = 900 + "px";
    canvas.width = parseInt(canvas.style.width);
    canvas.height = parseInt(canvas.style.height);
}
function calculate_new_ball(ball, delta) {
    let S = Math.PI * ball.r * ball.r;
    let k = (ball.ro * C * S) / 2;
    let y = ball.Y0, x = ball.X0, v_y = ball.V0_y, v_x = ball.V0_x;
    let F_y = -k * Math.abs(v_y) * v_y;
    let F_x = -k * Math.abs(v_x) * v_x;
    let a_y = -g + F_y / ball.m;
    let a_x = F_x / ball.m;
    y += v_y * delta + (a_y * delta * delta) / 2;
    x += v_x * delta + (a_x * delta * delta) / 2;
    v_y += a_y * delta;
    v_x += a_x * delta;
    let new_ball = {
        ro: ball.ro,
        r: ball.r,
        m: ball.m,
        V0_x: v_x,
        V0_y: v_y,
        Y0: y,
        X0: x,
    };
    return new_ball;
}
function process(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let Y0 = parseFloat(document.getElementById("Y0").value);
    let X0 = parseFloat(document.getElementById("X0").value);
    let V0_y = parseFloat(document.getElementById("V0_y").value);
    let V0_x = parseFloat(document.getElementById("V0_x").value);
    let m = parseFloat(document.getElementById("m").value);
    let r = parseFloat(document.getElementById("r").value);
    let ro = parseFloat(document.getElementById("ro").value);
    let delta = parseFloat(document.getElementById("delta").value);
    let scale = parseFloat(document.getElementById("scale").value);
    ctx.fillStyle = "#FFFFFF";
    draw_coordinates(scale, offset_x, offset_y);
    ctx.fillStyle = "#000000";
    let ball = {
        Y0: Y0,
        X0: X0,
        V0_y: V0_y,
        V0_x: V0_x,
        m: m,
        r: r,
        ro: ro,
    };
    let time = 0;
    while (ball.Y0 >= 0) {
        draw_point(ball.X0, ball.Y0, offset_x, offset_y, scale);
        ball = calculate_new_ball(ball, delta);
        time += delta;
        console.log(ball.Y0);
        console.log(ball.X0);
    }
}
count_button.addEventListener("click", function (e) {
    info.innerHTML = "Идёт подсчёт...";
    process(ctx);
    info.innerHTML = "0 0";
});
