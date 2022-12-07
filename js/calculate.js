"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const C = 0.4;
const g = 9.81;
function calculate(ball, delta) {
    let S = Math.PI * ball.r * ball.r;
    let k = (ball.ro * C * S) / 2;
    let y = ball.Y0, x = ball.X0, v_y = ball.V0_y, v_x = ball.V0_x;
    let F_y = -k * Math.abs(v_y) * v_y;
    let F_x = -k * Math.abs(v_x) * v_x;
    let a_y = -g + F_y / ball.m;
    let a_x = -g + F_x / ball.m;
    y += v_y * delta + (a_y * delta * delta) / 2;
    x += v_x * delta + (a_x * delta * delta) / 2;
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
exports.default = calculate;
