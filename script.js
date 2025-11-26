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


    
    // モーダルの開閉
    const modal = document.querySelector('.modal');

    if (modal) {
        const titleEl = modal.querySelector('.modal-title');
        const startEl = modal.querySelector('.modal-start');
        const textEl = modal.querySelector('.modal-text');

        // 表示する内容を管理
        const contents = {
            'HTML / CSS': {
                title: 'HTML / CSS',
                start: '学習開始： 2025/06 ～',
                text: 'Web制作の入り口として触り始めて、気づいたら一番落ち着く言語になりました。まだ作れるものは少ないですが、レイアウトが形になっていく瞬間が好きで気づくと時間を忘れて触ってしまいます。これからもっと幅を広げていきたいです。'
            },
            'JavaScript': {
                title: 'JavaScript',
                start: '学習開始： 2025/07 ～',
                text: 'すぐに使いこなせたわけではないですが、とにかく試しながら覚えることを意識しています。まだ複雑なことはできませんが、基本的な動きを作れるようになってきました。コツがつかめる瞬間が増えていて、学ぶのが少し楽しくなってきています。'
            },
            'React': {
                title: 'React',
                start: '学習開始： 2025/09 ～',
                text: '入門を終えたばかり。コンポーネントを組み立てていく感じがレゴみたいでワクワクしてます。「あ、こういうふうに考えるのか」という理解が増えてきて、ちょっとずつ全体像が見えてきた感じです。'
            }
        };

        const setContent = (key) => {
            const data = contents[key] || { title: key, start: '', text: '' };
            if (titleEl) titleEl.textContent = data.title;
            if (startEl) startEl.textContent = data.start;
            if (textEl) textEl.textContent = data.text;
        };

        const skillButtons = document.querySelectorAll('#skill .skill-items .items-list button');
        const modalClose = modal.querySelector('#close1');

        skillButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const label = btn.querySelector('.grid-text');
                const key = (label ? label.textContent : btn.textContent).trim();
                setContent(key);
                modal.classList.add('show');
            });
        });

        if (modalClose) modalClose.addEventListener('click', () => modal.classList.remove('show'));

        // 背景クリックで閉じる
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('show');
        });
    }

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
