window.addEventListener("load", function() {
    document.querySelector("#loading").style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
    const progresses = document.querySelectorAll("#progressBar");

    progresses.forEach(progressBar => {
        let current = 0;
        const target = progressBar.value;
        const speed = 40;

        const interval = setInterval(() => {
            if (current < target) {
            current++;
            progressBar.value = current;
            } else {
            clearInterval(interval); 
            }
        }, speed);
    });
});
