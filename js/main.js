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

    // 交互式滚轮动画
    const reviewsSection = document.querySelector('#reviews');
    const columns = document.querySelectorAll('.review-column');
    let scrollPositions = Array.from(columns).map(() => 0);
    const scrollSpeed = 0.5; // 调大滚动速度

    window.addEventListener('wheel', (e) => {
        // 检查瀑布流区域是否在视口内
        const rect = reviewsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            
            columns.forEach((column, index) => {
                // 根据列的奇偶性决定滚动方向
                if (index % 2 === 0) {
                    scrollPositions[index] -= e.deltaY * scrollSpeed;
                } else {
                    scrollPositions[index] += e.deltaY * scrollSpeed;
                }

                // 限制滚动的最大和最小距离，防止无限滚动
                const maxScroll = column.scrollHeight / 2;
                if (scrollPositions[index] > 0) scrollPositions[index] = 0;
                if (scrollPositions[index] < -maxScroll) scrollPositions[index] = -maxScroll;

                column.style.transform = `translateY(${scrollPositions[index]}px)`;
            });
        }
    });

    // 初始复制内容以提供滚动空间
    columns.forEach(column => {
        const content = column.innerHTML;
        column.innerHTML += content;
    });

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