document.addEventListener('DOMContentLoaded', function() {
    console.log("小卡拉米官网脚本已加载！");

    // 平滑滚动功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 汉堡菜单功能
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });

    // 点击菜单链接后自动收起菜单
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
            }
        });
    });

    // 评论区动态渲染及交互
    const reviewsSection = document.querySelector('#reviews');
    const columns = document.querySelectorAll('.review-column');
    
    const reviewsData = [
        { text: "服务超棒！", author: "一颗小星星", imgSeed: "r1", avatarSeed: "a1", imgHeight: 400 },
        { text: "我家主子很满意。", author: "今天星期几", imgSeed: "r2", avatarSeed: "a2", imgHeight: 300 },
        { text: "专业、细心，推荐！", author: "爱吃的小熊", imgSeed: "r3", avatarSeed: "a3", imgHeight: 350 },
        { text: "解放双手，太棒了。", author: "夏天的风", imgSeed: "r4", avatarSeed: "a4", imgHeight: 450 },
        { text: "下次还找你们。", author: "月亮不睡我不睡", imgSeed: "r5", avatarSeed: "a5", imgHeight: 380 },
        { text: "非常可靠的服务。", author: "早睡早起", imgSeed: "r6", avatarSeed: "a6", imgHeight: 350 },
        { text: "价格公道，服务到位。", author: "泡泡鱼", imgSeed: "r7", avatarSeed: "a7", imgHeight: 420 },
        { text: "再也不用担心出差了。", author: "风继续吹", imgSeed: "r8", avatarSeed: "a8", imgHeight: 360 },
        { text: "我的狗狗很喜欢那个小哥。", author: "甜甜的梦", imgSeed: "r9", avatarSeed: "a9", imgHeight: 300 },
        { text: "满分好评！", author: "追光者", imgSeed: "r10", avatarSeed: "a10", imgHeight: 400 },
        { text: "服务人员很专业。", author: "蓝色星球", imgSeed: "r11", avatarSeed: "a11", imgHeight: 450 },
        { text: "App很好用，预约方便。", author: "一只小蜜蜂", imgSeed: "r12", avatarSeed: "a12", imgHeight: 320 },
        { text: "解决了我的大麻烦。", author: "快乐崇拜", imgSeed: "r13", avatarSeed: "a13", imgHeight: 380 },
        { text: "值得信赖的品牌。", author: "柠檬树", imgSeed: "r14", avatarSeed: "a14", imgHeight: 340 },
        { text: "会推荐给朋友的。", author: "飞鸟和蝉", imgSeed: "r15", avatarSeed: "a15", imgHeight: 410 },
        { text: "非常满意的一次体验。", author: "晴天娃娃", imgSeed: "r16", avatarSeed: "a16", imgHeight: 330 },
        { text: "细节做得很好。", author: "白日梦想家", imgSeed: "r17", avatarSeed: "a17", imgHeight: 400 },
        { text: "宠物状态很好。", author: "奔向未来", imgSeed: "r18", avatarSeed: "a18", imgHeight: 370 },
        { text: "客服回应很及时。", author: "简单爱", imgSeed: "r19", avatarSeed: "a19", imgHeight: 310 },
        { text: "五星好评！", author: "下一站幸福", imgSeed: "r20", avatarSeed: "a20", imgHeight: 430 }
    ];

    function renderReviews() {
        if (!columns.length) return;
        // 清空现有的列
        columns.forEach(column => column.innerHTML = '');

        // 分配评论到各列
        reviewsData.forEach((review, index) => {
            const columnIndex = index % columns.length;
            const reviewCard = `
                <div class="review-card">
                    <img src="https://picsum.photos/seed/${review.imgSeed}/300/${review.imgHeight}" alt="Review image">
                    <div class="review-content">
                        <p>"${review.text}"</p>
                        <div class="review-author">
                            <img src="https://picsum.photos/seed/${review.avatarSeed}/50/50" alt="Avatar">
                            <span>${review.author}</span>
                        </div>
                    </div>
                </div>
            `;
            columns[columnIndex].innerHTML += reviewCard;
        });
    }

    function initializeReviewAnimation() {
        if (!columns.length) return;
        // 初始复制内容以提供滚动空间
        columns.forEach(column => {
            const content = column.innerHTML;
            column.innerHTML += content;
        });

        let scrollPositions = Array.from(columns).map(() => 0);
        const scrollSpeed = 0.5;
        let lastTouchY = 0;
        let ticking = false;

        function handleScroll(deltaY) {
            const rect = reviewsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                columns.forEach((column, index) => {
                    if (index % 2 === 0) {
                        scrollPositions[index] -= deltaY * scrollSpeed;
                    } else {
                        scrollPositions[index] += deltaY * scrollSpeed;
                    }

                    const maxScroll = column.scrollHeight / 2;
                    if (scrollPositions[index] > 0) scrollPositions[index] = 0;
                    if (scrollPositions[index] < -maxScroll) scrollPositions[index] = -maxScroll;

                    column.style.transform = `translateY(${scrollPositions[index]}px)`;
                });
            }
        }

        window.addEventListener('wheel', (e) => {
            handleScroll(e.deltaY);
        });

        window.addEventListener('touchstart', (e) => {
            lastTouchY = e.touches[0].clientY;
        });

        window.addEventListener('touchmove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const touchY = e.touches[0].clientY;
                    const deltaY = lastTouchY - touchY;
                    lastTouchY = touchY;
                    handleScroll(deltaY);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    renderReviews();
    initializeReviewAnimation();

    // 滚动触发动画
    ScrollReveal({
        distance: '60px',
        duration: 2500,
        delay: 400
    });
    ScrollReveal().reveal('.reveal', {
        origin: 'bottom',
        interval: 200
    });
});