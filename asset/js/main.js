$(document).ready(function() {

    $('.favorite').click(function() {
        $(this).toggleClass('text-rose-600');
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
