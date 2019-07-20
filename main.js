window.onload = Canvas;

function Canvas() {
    let canvas = document.querySelector('canvas');
    if (!canvas.getContext) {
        alert('Canvas not supported!');
        return;
    }

    canvas.width = 500;
    canvas.height = 500;
    Clock();
}

function Clock() {
    let canvas, context, date, hour, minute, second, msecond, hourAngle, minAngle, secAngle;

    date = new Date();
    hour = date.getHours();
    minute = date.getMinutes() + hour * 60;
    second = date.getSeconds() + minute * 60;
    msecond = date.getMilliseconds();

    secAngle = -90 + second * 6 + msecond * 0.006;

    minAngle = -90 + second * 0.1;

    hourAngle = -90 + (second / 120);
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    context.clearRect(0, 0, 500, 500);

    drawFace(context);

    context.translate(250, 250);
    drawTicks(context);
    drawHourHand(context, hourAngle);
    drawMinHand(context, minAngle);
    drawSecHand(context, secAngle);
    context.translate(-250, -250);

    setTimeout(Clock, 31);
}

function drawFace(context) {
    let grad;

    grad = context.createRadialGradient(20, 30, 200, 100, 100, 450);
    grad.addColorStop(0, 'black');
    grad.addColorStop(0.5, '#CCC');
    grad.addColorStop(1, 'black');

    context.beginPath();
    context.arc(250, 250, 250, 0, 2 * Math.PI);
    context.fillStyle = grad;
    context.fill();
    context.closePath();

    context.beginPath();
    context.arc(250, 250, 212, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

function drawTicks(context) {
    drawPath(context, 'M -108,-1 L 108,-1 108,1 -108,1 Z', 'gray', 0);
    drawPath(context, 'M -108,-1 L 108,-1 108,1 -108,1 Z', 'gray', 30);
    drawPath(context, 'M -108,-1 L 108,-1 108,1 -108,1 Z', 'gray', 60);
    drawPath(context, 'M -108,-1 L 108,-1 108,1 -108,1 Z', 'gray', 90);
    drawPath(context, 'M -108,-1 L 108,-1 108,1 -108,1 Z', 'gray', 120);
    drawPath(context, 'M -108,-1 L 108,-1 108,1 -108,1 Z', 'gray', 150);

    drawPath(context, 'M 154,0 L 178,-6 178,6 Z', 'black', 0);
    drawPath(context, 'M 154,0 L 178,-6 178,6 Z', 'black', 90);
    drawPath(context, 'M 154,0 L 178,-6 178,6 Z', 'black', 180);
    drawPath(context, 'M 154,0 L 178,-6 178,6 Z', 'black', -90);

    drawPath(context, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#222', 30);
    drawPath(context, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#222', 60);
    drawPath(context, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#222', 120);
    drawPath(context, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#222', 150);
    drawPath(context, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#222', -30);
    drawPath(context, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#222', -60);
    drawPath(context, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#222', -120);
    drawPath(context, 'M 156,-2 L 180,-2 180,2 156,2 Z', '#222', -150);

    context.font = '24pt Georgia';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#222';
    context.fillText('3', 140, -4);
    context.fillText('6', 0, 138);
    context.fillText('9', -140, -4);
    context.fillText('12', 0, -140);

    context.beginPath();
    context.arc(0, -195, 4, 0, 2 * Math.PI);
    context.fillStyle = '#444';
    context.fill();
    context.closePath();

    for (let i = 0; i < 360; i += 30) {
        drawPath(context, 'M 180,-3 L 184,-3 184,3 180,3 Z', '#222', i);

        drawPath(context, 'M 110,-3 L 120,-3 120,3 110,3 Z', '#333', i);

        let lbl = '' + Math.round(i / 6 + 15);
        if (lbl === '60') lbl = '';
        if (lbl === '65') lbl = '5';
        if (lbl === '70') lbl = '10';
        let x = 195 * Math.cos(i * Math.PI / 180.0);
        let y = 195 * Math.sin(i * Math.PI / 180.0);
        context.save();
        context.translate(x, y);
        context.rotate((i + 90 - (i > 0 && i < 180 ? 180 : 0)) * Math.PI / 180.0);
        context.font = '9pt Georgia';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'rgba(68,68,68,0.8)';
        context.fillText(lbl, 0, 0);
        context.restore();

        context.beginPath();
        x = 195 * Math.cos((i + 15) * Math.PI / 180);
        y = 195 * Math.sin((i + 15) * Math.PI / 180);
        context.arc(x, y, 1.5, 0, 2 * Math.PI);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();

        for (let j = 0; j < 25; j += 6) {
            if (j !== 0) {
                drawPath(context, 'M 174,-0.5 L 184,-0.5 184,0.5 174,0.5 Z', 'black', i + j);

                drawPath(context, 'M 114,-0.5 L 120,-0.5 120,0.5 114,0.5 Z', 'rgba(68,68,68,0.8)', i + j);
            }

            for (let k = 1.5; k < 5; k += 1.5) {
                drawPath(context, 'M 180,-0.3 L 184,-0.3 184,0.3 180,0.3 Z', 'rgba(68,68,68,0.5)', i + j + k);
            }
        }
    }
}

function drawSecHand(context, ang) {
    drawPath(context, 'M -50,0 L -45,-5 -25,-5 -22,-2 22,-2 25,-5 180,0 25,5 22,2 -22,2 -25,5 -45,5 Z', '#333', ang);
    context.beginPath();
    context.arc(0, 0, 8, 0, 2 * Math.PI);
    context.fillStyle = '#333';
    context.fill();
    context.closePath();
}

function drawMinHand(context, ang) {
    drawPath(context, 'M 0,0 L 1,-2 20,-2 22,-5 122,-5 124,-2 146,-2 168,0 146,2 124,2 122,5 22,5 20,2 1,2 0,0 24,0 24,2 120,2 122,0 120,-2 24,-2 24,0 Z', '#111', ang);
}

function drawHourHand(context, ang) {
    drawPath(context, 'M 0,0 L 1,-3 14,-3 17,-7 97,-7 100,-3 112,-2 134,0 112,2 100,3 97,7 17,7 14,3 1,3 0,0 18,0 21,3 94,3 96,0 94,-3 21,-3 18,0 Z', '#000', ang);
}

function drawPath(context, path, fill, ang) {
    context.save();
    context.rotate(ang === undefined ? 0 : ang * Math.PI / 180.0);
    context.beginPath();

    let parts = path.split(' ');
    while (parts.length > 0) {
        let part = parts.shift();
        if (part === 'M') {
            let coords = parts.shift().split(',');
            context.moveTo(coords[0], coords[1]);
        } else if (part === 'L') {
            continue;
        } else if (part === 'Z') {
            break;
        } else if (part.indexOf(',') >= 0) {
            let coords = part.split(',');

            context.lineTo(coords[0], coords[1]);
        }
    }

    context.closePath();
    context.fillStyle = (fill === undefined ? '#000' : fill);
    context.fill();
    context.restore();
}
