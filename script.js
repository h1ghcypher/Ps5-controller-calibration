let deadzone = 0.05;

const leftCanvas = document.getElementById('leftCanvas');
const rightCanvas = document.getElementById('rightCanvas');
const leftCtx = leftCanvas.getContext('2d');
const rightCtx = rightCanvas.getContext('2d');

document.getElementById("deadzone").addEventListener("input", (e) => {
  deadzone = parseFloat(e.target.value) / 100;
  document.getElementById("deadzoneValue").textContent = e.target.value;
});

function applyDeadzone(x, y, dz) {
  return {
    x: Math.abs(x) < dz ? 0 : x,
    y: Math.abs(y) < dz ? 0 : y
  };
}

function drawStick(ctx, x, y) {
  ctx.clearRect(0, 0, 200, 200);
  ctx.beginPath();
  ctx.arc(100 + x * 80, 100 + y * 80, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#2196f3";
  ctx.fill();
}

function update() {
  const gamepads = navigator.getGamepads();
  const gp = gamepads[0];
  
  if (gp) {
    // Left Stick
    let lx = gp.axes[0], ly = gp.axes[1];
    let left = applyDeadzone(lx, ly, deadzone);
    drawStick(leftCtx, left.x, left.y);
    
    // Right Stick
    let rx = gp.axes[2], ry = gp.axes[3];
    let right = applyDeadzone(rx, ry, deadzone);
    drawStick(rightCtx, right.x, right.y);
  }

  requestAnimationFrame(update);
}

window.addEventListener("gamepadconnected", () => {
  console.log("Gamepad connected!");
  update();
});
