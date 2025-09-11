'use strict';

{
    // ローディングアニメーション
    window.addEventListener("load", function() {
        document.querySelector("#loading").style.display = "none";
    });

    //ハンバーガーメニュー
    const open = document.getElementById('open');
    const overlay = document.querySelector('.overlay');
    const close = document.getElementById('close');

    open.addEventListener('click', () => {
        overlay.classList.add('show');
        open.classList.add('hide');
    });
    
    close.addEventListener('click', () => {
        overlay.classList.remove('show');
        open.classList.remove('hide');
    }); 
    
    // リンククリック時にオーバーレイを閉じる
    const overlayLinks = document.querySelectorAll('.overlay a[href^="#"]');
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('show');
            open.classList.remove('hide');
        });
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


    // アニメーション設定
    const targets = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target); // 一度だけ動作する
        }
    });
    }, { threshold: 0.2 }); // 20%見えたら発動

    targets.forEach(target => observer.observe(target));
}
