export function initTelemetry() {
    const speedEl = document.getElementById("speedVal");
    const rpmEl = document.getElementById("rpmVal");
    const gearEl = document.getElementById("gearVal");
    const throttle = document.getElementById("throttleInput");

    let speed = 0;
    let rpm = 0;
    let gear = "N";
    let running = false;

    const MAX = 400;

    function loop() {
        if (!running) return;

        const t = throttle.value / 100;
        speed += (t * MAX - speed) * 0.05;
        rpm = Math.floor(speed * 30);
        gear = speed < 10 ? "N" : Math.ceil(speed / 50);

        speedEl.textContent = Math.floor(speed);
        rpmEl.textContent = rpm;
        gearEl.textContent = gear;

        const arc = document.getElementById("arcFill");
        const percent = speed / MAX;
        arc.style.strokeDashoffset = 260 - 260 * percent;

        requestAnimationFrame(loop);
    }

    document.getElementById("startBtn").onclick = () => {
        running = true;
        loop();
    };

    document.getElementById("stopBtn").onclick = () => {
        running = false;
    };

    document.getElementById("resetBtn").onclick = () => {
        running = false;
        speed = 0;
        rpm = 0;
        gear = "N";
    };
}