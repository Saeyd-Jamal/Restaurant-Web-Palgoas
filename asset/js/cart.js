$(document).ready(function() {
    let cart = [];

    // عند الضغط على زر اضافة لفتح البوب للمنتج
    $('.add-to-cart-btn').on('click', function() {
        let productId = $(this).data('product-id');
        
        // هنا يفضل استخدام نفس المودل لكن مع تغير المحتوى باستخدام ajax 
        // $(`#popup-${productId}`).show(); 
        updatePopupPrice(productId); // تحديث السعر
    });

    // تحديث السعر في الـ popup بناءً على الحجم المختار
    $('input[type=radio]').on('change', function() {
        let productId = $(this).attr('name').split('-')[1]; // الوصول لأول سعر
        updatePopupPrice(productId); // تحديث السعر
    });
    
    $('.calc-quantity').on('click', function() {
        let productId = $(this).data('product-id');
        let quantity = parseInt($(`#quantity-${productId}`).text());
        let calc_type = $(this).data('type');
        if (calc_type === 'plus') {
            quantity += 1;
            $(`#quantity-${productId}`).text(quantity);
        }
        if (calc_type === 'minus') {
            if (quantity > 1) {
                quantity -= 1;
                $(`#quantity-${productId}`).text(quantity);
            }
        }
        updatePopupPrice(productId); // تحديث السعر
    });

    // تأكيد الإضافة إلى السلة
    $('.confirm-add').on('click', function() {
        let productId = $(this).data('product-id'); 
        let name = $(`#name-product-${productId}`).text();
        let size = $(`input[name=size-${productId}]:checked`).val(); // الحصول على الحجم المختار
        let quantity = parseInt($(`#quantity-${productId}`).text());   // الحصول على الكمية المختارة
        let price = parseFloat($(`input[name=size-${productId}]:checked`).data('price')); // الحصول على السعر

        $('#cartAlart').slideDown();

        // إضافة العنصر إلى السلة
        addToCart(productId, name, size, quantity, price);

        // $(`#popup-${productId}`).hide();
        $(`#addToCartModal`).hide();
        updateCartDisplay();
    });

    // تحديث السعر في الـ popup
    function updatePopupPrice(productId) {
        let selectedPrice = parseFloat($(`input[name=size-${productId}]:checked`).data('price'));
        let quantity = parseInt($(`#quantity-${productId}`).text());
        let total = selectedPrice *= quantity;
        $(`.popup-price[data-product-id=${productId}]`).text(total);
    }

    // إضافة عنصر إلى السلة
    function addToCart(productId, name, size, quantity, price) {
        const existingItemIndex = cart.findIndex(item => item.productId === productId && item.size === size);
        
        // التحصص من الوجود فقط فنرفع القيم
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                productId : productId,
                name : name,
                size : size,
                quantity : quantity,
                price : price
            });
        }
    }

    // تحديث عرض السلة
    function updateCartDisplay() {
        if (cart.length === 0) {
            $('.emptyCart').show();
            $('.fullCart').hide();
            $('#cartAlart').slideUp();

            
        } else {
            $('.emptyCart').hide();
            $('.fullCart').show();
            $('.cart-items').empty().show();

            let total = 0;
            let totalQuantity = 0;

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                totalQuantity += item.quantity;

                $('.cart-items').append(`
                    <div class="cart-item flex items-baseline justify-between my-2 p-2 border-2 border-neutral-300 shadow-4 rounded-lg" data-index="${index}">
                        <div class="flex item-center justify-start">
                            <img src="asset/img/cart-02.png" alt="cart-01" class="rounded-lg	">
                            <div class="flex flex-col justify-between items-start ms-3">
                                <h4 class="text-xl font-bold text-black">${item.name} - <span>${item.size}</span></h4> 
                                <span class="text-red-500">السعر: ${itemTotal}$</span>
                                <div class="flex flex-row items-center justify-between">
                                    <button class="bg-amber-400 hover:bg-amber-700 text-white font-bold w-5 h-5 p-4 rounded-full flex items-center justify-center transition ease-in duration-200 calc-quantity-cart" data-type="minus" data-product-id="${item.productId}"  data-index="${index}">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                    <span class="text-black font-bold text-base mx-2" id="quantity-cart-${index}">${item.quantity}</span>
                                    <button class="bg-amber-400 hover:bg-amber-700 text-white font-bold w-5 h-5 p-4 rounded-full flex items-center justify-center transition ease-in duration-200 calc-quantity-cart" data-type="plus" data-product-id="${item.productId}"  data-index="${index}">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-end h-full m-2">
                            <button class="text-neutral-500 hover:text-red-700 remove-item">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `);
            });
            

            $('.total-price').text(total);
            $('.total-quantity').text(totalQuantity);
        }
    }

    
    $(document).on('click', '.calc-quantity-cart', function() {
        console.log('calc-quantity-cart');
        let index = $(this).data('index');
        let productId = $(this).data('product-id');
        let quantity = parseInt($(`#quantity-cart-${index}`).text());
        let calc_type = $(this).data('type');


        if (calc_type === 'plus') {
            quantity += 1;
            $(`#quantity-cart-${index}`).text(quantity);
        }
        if (calc_type === 'minus') {
            if (quantity > 1) {
                quantity -= 1;
                $(`#quantity-cart-${index}`).text(quantity);
            }
        }

        cart[index].quantity = quantity;

        updateCartDisplay();
    });

    // حدث حذف عنصر
    $(document).on('click', '.remove-item', function() {
        const index = $(this).closest('.cart-item').data('index');
        cart.splice(index, 1);
        updateCartDisplay();
    });


    // الطلبات الداخلية
    $("#confirmNumberOfTable").on('click', function() {
        let numberOfTable = $('#numberOfTableInput').val();
        $("#numberOfTableForInside").text(numberOfTable);
        updateCartInsideDisplay();
    })

    function updateCartInsideDisplay() {
        $('#cartInsideItems').empty().show();

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            $('#cartInsideItems').append(`
                <div class="w-full flex items-center justify-center mt-3 p-3 shadow-md text-black rounded-full">
                    ${item.name} - ${item.size} - ${item.quantity}
                </div>
            `);
        });
    }

    $('#doneOursideOrder').on('click', function() {
        let address = $('.address-order-input').val();
        $('.address-order').text(address);
    })
    function orderOutSide(){
        // .address-order 

    }

});
