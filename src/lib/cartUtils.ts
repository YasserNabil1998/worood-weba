/**
 * إنشاء معرف فريد للمنتج بناءً على خصائصه
 */
export function generateProductKey(product: any): string {
    // إنشاء كائن يحتوي على جميع الخصائص المهمة
    const productProps = {
        id: product.id,
        size: product.size || 'default',
        addCard: product.addCard || false,
        cardMessage: product.cardMessage || '',
        addChocolate: product.addChocolate || false,
        giftWrap: product.giftWrap || false,
        style: product.style || 'default',
        color: product.color || 'default',
        // إضافة أي خصائص أخرى قد تكون مهمة
        customData: product.customData ? JSON.stringify(product.customData) : null,
    };

    // تحويل الكائن إلى JSON وإزالة المسافات
    const jsonString = JSON.stringify(productProps, Object.keys(productProps).sort());
    
    // إنشاء hash بسيط من النص
    let hash = 0;
    for (let i = 0; i < jsonString.length; i++) {
        const char = jsonString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // تحويل إلى عدد صحيح 32 بت
    }
    
    return `${product.id}_${Math.abs(hash)}`;
}

/**
 * البحث عن منتج في السلة بناءً على المعرف الفريد
 */
export function findProductInCart(cart: any[], product: any): number {
    const productKey = generateProductKey(product);
    return cart.findIndex((item: any) => {
        const itemKey = generateProductKey(item);
        return itemKey === productKey;
    });
}

/**
 * إضافة منتج للسلة مع التحقق من الخصائص
 */
export function addProductToCart(cart: any[], product: any): { cart: any[], isNew: boolean } {
    const existingIndex = findProductInCart(cart, product);
    
    if (existingIndex >= 0) {
        // المنتج موجود بنفس الخصائص، زيادة الكمية
        cart[existingIndex].quantity += (product.quantity || 1);
        return { cart, isNew: false };
    } else {
        // منتج جديد أو بخصائص مختلفة، إضافته كمنتج منفصل
        const newProduct = {
            ...product,
            uniqueKey: generateProductKey(product), // حفظ المعرف الفريد للاستخدام المستقبلي
            quantity: product.quantity || 1
        };
        cart.push(newProduct);
        return { cart, isNew: true };
    }
}
