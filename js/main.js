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
        { text: "服务超棒！", author: "一颗小星星", avatarSeed: "a1", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1211754968965_.pic.jpg" },
        { text: "我家主子很满意。", author: "今天星期几", avatarSeed: "a2", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/3.png" },
        { text: "专业、细心，推荐！", author: "爱吃的小熊", avatarSeed: "a3", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/20250812-112525.jpeg" },
        { text: "解放双手，太棒了。", author: "夏天的风", avatarSeed: "a4", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1201754968960_.pic.jpg" },
        { text: "下次还找你们。", author: "月亮不睡我不睡", avatarSeed: "a5", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/u%3D3541819761%2C3828442254%26fm%3D253%26app%3D138%26f%3DJPEG.jpeg" },
        { text: "非常可靠的服务。", author: "早睡早起", avatarSeed: "a6", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1151754968875_.pic.jpg" },
        { text: "价格公道，服务到位。", author: "泡泡鱼", avatarSeed: "a7", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1131754968757_.pic.jpg" },
        { text: "再也不用担心出差了。", author: "风继续吹", avatarSeed: "a8", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1171754968927_.pic.jpg" },
        { text: "我的狗狗很喜欢那个小哥。", author: "river", avatarSeed: "a9", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/u%3D3344398029%2C802056103%26fm%3D253%26app%3D138%26f%3DJPEG.jpeg" },
        { text: "满分好评！", author: "kkkk", avatarSeed: "a10", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1241754968996_.pic.jpg" },
        { text: "服务人员很专业。", author: "蓝色星球", avatarSeed: "a11", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1221754968976_.pic.jpg" },
        { text: "App很好用，预约方便。", author: "一只小蜜蜂", avatarSeed: "a12", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1251754969008_.pic.jpg" },
        { text: "解决了我的大麻烦。", author: "快乐崇拜", avatarSeed: "a13", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/3vdlXnpsmf8D9ktI3tN4eWH1tCr8WaHmXZH_K2SLCH-9ijqymj50mf1q0YCUXJ_W.jpg" },
        { text: "值得信赖的品牌。", author: "柠檬树", avatarSeed: "a14", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1261754969020_.pic.jpg" },
        { text: "会推荐给朋友的。", author: "飞鸟和蝉", avatarSeed: "a15", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1191754968947_.pic.jpg" },
        { text: "非常满意的一次体验。", author: "AAA建材老王", avatarSeed: "a16", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1161754968912_.pic.jpg" },
        { text: "细节做得很好。", author: "白日梦想家", avatarSeed: "a17", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1231754968987_.pic.jpg" },
        { text: "宠物状态很好。", author: "奔向未来", avatarSeed: "a18", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/08rNkV8sEgvei1KzpnoDjoe7MkrQQs6-s1G6DGjBz6CM4vXvPU2M4-O9fulXavWg.jpg" },
        { text: "客服回应很及时。", author: "简单爱", avatarSeed: "a19", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1141754968765_.pic.jpg" },
        { text: "五星好评！", author: "下一站幸福", avatarSeed: "a20", imgUrl: "https://hk-cdn-static.oss-cn-hangzhou.aliyuncs.com/kalamini/images/tinified/1211754968965_.pic.jpg" }
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
                    <img src="${review.imgUrl}" alt="Review image">
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