window.addEventListener("load", function() {
    document.querySelector("#loading").style.display = "none";
});

// ページTOPに戻るボタン
document.addEventListener("DOMContentLoaded", function() {
    var pagetop = document.getElementById('page-top');
    if (!pagetop) return;

    var threshold = 300; // 下端からの距離(px)

    var updateVisibility = function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;
        var documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight > documentHeight - threshold) {
            pagetop.classList.add('is-visible');
        } else {
            pagetop.classList.remove('is-visible');
        }
    };

    // 初期状態
    pagetop.classList.remove('is-visible');
    updateVisibility();

    window.addEventListener('scroll', updateVisibility);

    pagetop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

//スキルバー
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

