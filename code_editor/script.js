// كود JavaScript للمشروع
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة بنجاح!');

    // تهيئة الأرقام المتحركة
    initializeCounterAnimation();

    // إعداد الأحداث
    setupEventListeners();

    // إظهار رسالة ترحيب
    setTimeout(() => {
        alert('مرحباً! تم تحميل المشروع بنجاح.');
    }, 1000);
});

function initializeCounterAnimation() {
    const counters = [
        { id: 'stat1', target: 150, duration: 2000 },
        { id: 'stat2', target: 95, duration: 2500 },
        { id: 'stat3', target: 2500, duration: 3000 }
    ];

    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            animateCounter(element, 0, counter.target, counter.duration);
        }
    });
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function setupEventListeners() {
    // زر العمل الرئيسي
    const actionBtn = document.getElementById('action-btn');
    if (actionBtn) {
        actionBtn.addEventListener('click', function() {
            console.log('تم النقر على زر العمل الرئيسي');

            // تغيير نص الزر
            const originalText = actionBtn.innerHTML;
            actionBtn.innerHTML = '<i class="fas fa-check"></i> تم التنفيذ!';
            actionBtn.style.backgroundColor = '#10b981';

            // إضافة تأثير
            this.classList.add('animated');

            // عرض رسالة
            alert('تم تنفيذ الإجراء بنجاح!');

            // العودة إلى الحالة الأصلية بعد 3 ثوان
            setTimeout(() => {
                actionBtn.innerHTML = originalText;
                actionBtn.style.backgroundColor = '';
                this.classList.remove('animated');
            }, 3000);
        });
    }

    // زر تبديل القائمة (للأجهزة المحمولة)
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            this.innerHTML = nav.style.display === 'flex' ?
                '<i class="fas fa-times"></i>' :
                '<i class="fas fa-bars"></i>';

            console.log(`تم ${nav.style.display === 'flex' ? 'فتح' : 'إغلاق'} القائمة`);
        });
    }

    // روابط التنقل
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`تم النقر على: ${this.textContent}`);

            // تحديث الروابط النشطة
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // تمرير سلس إلى القسم المناسب
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // بطاقات الميزات
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            console.log(`تم النقر على ميزة: ${title}`);

            // تأثير النقر
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}
