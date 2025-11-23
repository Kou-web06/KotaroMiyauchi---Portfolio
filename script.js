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

    class TxtRotate {
        constructor(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = "";
            this.isDeleting = false;
            this.tick();
        }

        tick() {
            const i = this.loopNum % this.toRotate.length;
            const fullTxt = this.toRotate[i];

            // タイピング / 削除
            this.txt = this.isDeleting
            ? fullTxt.substring(0, this.txt.length - 1)
            : fullTxt.substring(0, this.txt.length + 1);

            this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

            // 打ち込み速度
            let delta = 80 - Math.random() * 100;
            if (this.isDeleting) delta /= 1.2;

            // 全部打ち終わったら止める
            if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
            }
            // 消し終わったら次へ
            else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
            }

            setTimeout(() => this.tick(), delta);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        const elements = document.querySelectorAll(".txt-rotate");

        elements.forEach((el) => {
            const toRotate = el.getAttribute("data-rotate");
            const period = el.getAttribute("data-period");

            if (toRotate) {
            new TxtRotate(el, JSON.parse(toRotate), period);
            }
        });

        // inject CSS（元コードと互換）
        const style = document.createElement("style");
        style.textContent = `
            .txt-rotate > .wrap {
            border-right: 0.08em solid #666;
            padding-right: 4px;
            }
        `;
        document.body.appendChild(style);
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
