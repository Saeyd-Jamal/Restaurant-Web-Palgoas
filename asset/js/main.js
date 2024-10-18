$(document).ready(function() {

    let currentIndex = 0;
    const slides = $('.slide');
    const slideCount = slides.length;
    const intervalTime = 3000; // الوقت بين كل تغيير شريحة (بالميلي ثانية)

    // دالة لتحديث الشرائح
    function showSlide(index) {
        slides.removeClass('active'); // إزالة الكلاس active من كل الشرائح
        slides.eq(index).addClass('active'); // إضافة الكلاس active للشريحة الحالية
    }

    // دالة للانتقال إلى الشريحة التالية
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount; // التبديل إلى الشريحة التالية
        showSlide(currentIndex);
    }

    // دالة للانتقال إلى الشريحة السابقة
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount; // التبديل إلى الشريحة السابقة
        showSlide(currentIndex);
    }

    // تغيير الشريحة تلقائياً كل intervalTime
    let slideInterval = setInterval(nextSlide, intervalTime);

    // إيقاف التغيير التلقائي عند الضغط على الأزرار
    $('#next').click(function() {
        clearInterval(slideInterval); // إيقاف التغيير التلقائي
        nextSlide(); // الانتقال إلى الشريحة التالية
        slideInterval = setInterval(nextSlide, intervalTime); // إعادة التغيير التلقائي
    });

    $('#prev').click(function() {
        clearInterval(slideInterval); // إيقاف التغيير التلقائي
        prevSlide(); // الانتقال إلى الشريحة السابقة
        slideInterval = setInterval(nextSlide, intervalTime); // إعادة التغيير التلقائي
    });





    $('i.favorite').click(function() {
        $(this).toggleClass('text-rose-700');
    });

    // تمهيد لتخزين التقييم لكل مجموعة من النجوم
    const ratings = {};
    $('.rating i').hover(function() {
        // عند تمرير الفأرة
        $(this).prevAll().addBack().addClass('text-amber-400').removeClass('text-neutral-400');
    }, function() {
        // عند الابتعاد عن الفأرة، يجب عدم تغيير الألوان
        const parent = $(this).parent();
        const index = ratings[parent.data('id')] || 0; // الحصول على القيمة الحالية
        parent.find('i').removeClass('text-amber-400').addClass('text-neutral-400'); // إعادة تعيين كل النجوم
        parent.find('i').slice(0, index).addClass('text-amber-400').removeClass('text-neutral-400'); // تلوين النجوم حسب التقييم
    });
    $('.rating i').click(function() {
        const parent = $(this).parent();
        const stars = parent.find('i');
        const index = $(this).index() + 1; // نجمة واحدة بالزيادة لتثبيت الحالي

        // تخزين التقييم في المصفوفة
        ratings[parent.data('id')] = index;

        // تغيير الألوان بناءً على النجمة التي تم النقر عليها
        stars.removeClass('text-amber-400').addClass('text-neutral-400'); // إعادة تعيين كل النجوم
        stars.slice(0, index).addClass('text-amber-400').removeClass('text-neutral-400'); // تلوين النجوم حتى النجمة المحددة
    });
});
