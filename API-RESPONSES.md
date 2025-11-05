# توثيق API Responses - مشروع ورد الشمس 🌹

## 📋 مقدمة

هذا الملف يحتوي على توثيق شامل لهيكل API Responses المتوقع من **Laravel Backend** لتطبيق ورد الشمس.

### كيفية استخدام هذا التوثيق

1. **للمطورين في Backend (Laravel)**: استخدم هذا الملف كدليل لبناء الـ API endpoints وإرجاع البيانات بالهيكل المحدد
2. **للمطورين في Frontend (Next.js)**: استخدم هذا الملف لفهم البيانات المتوقعة من الـ API وكيفية ربطها مع المكونات

### ملاحظات مهمة

- جميع الـ endpoints تستخدم **JSON** كصيغة للبيانات
- جميع الـ responses تحتوي على حقل `success` للإشارة إلى نجاح العملية
- في حالة الخطأ، يتم إرجاع `message` يحتوي على وصف الخطأ
- جميع التواريخ في صيغة **ISO 8601** (مثال: `2024-12-25T10:30:00Z`)
- جميع الأرقام المالية بوحدة **SAR** (ريال سعودي)
- جميع الـ endpoints تحتاج إلى **Bearer Token** في Header للـ Authorization (ماعدا Login و Register)

### Base URL

```
https://api.worood-shams.com/api
```

أو في بيئة التطوير:

```
http://localhost:8000/api
```

---

## 1. 🔐 Authentication APIs

### 1.1 تسجيل الدخول (Login)

**Endpoint:** `POST /api/auth/login`

**Request Headers:**

```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

**Request Body:**

```json
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "user": {
      "id": 1,
      "name": "أحمد محمد",
      "email": "ahmed@example.com",
      "phone": "0501234567",
      "profileImage": "https://api.worood-shams.com/storage/profiles/user-1.jpg",
      "gender": "ذكر",
      "emailVerifiedAt": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-01T08:00:00Z"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
    "tokenType": "Bearer",
    "expiresIn": 3600
  }
}
```

**Response (Error - 401):**

```json
{
  "success": false,
  "message": "بيانات الدخول غير صحيحة",
  "errors": {
    "email": ["البريد الإلكتروني أو كلمة المرور غير صحيحة"]
  }
}
```

**Response (Validation Error - 422):**

```json
{
  "success": false,
  "message": "خطأ في التحقق من البيانات",
  "errors": {
    "email": ["حقل البريد الإلكتروني مطلوب"],
    "password": ["حقل كلمة المرور مطلوب"]
  }
}
```

---

### 1.2 التسجيل (Register)

**Endpoint:** `POST /api/auth/register`

**Request Body:**

```json
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "0501234567",
  "password": "password123",
  "password_confirmation": "password123",
  "gender": "ذكر"
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "تم إنشاء الحساب بنجاح. يرجى التحقق من بريدك الإلكتروني",
  "data": {
    "user": {
      "id": 1,
      "name": "أحمد محمد",
      "email": "ahmed@example.com",
      "phone": "0501234567",
      "profileImage": null,
      "gender": "ذكر",
      "emailVerifiedAt": null,
      "createdAt": "2024-12-25T10:30:00Z"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
    "tokenType": "Bearer",
    "expiresIn": 3600
  }
}
```

**Response (Error - 422):**

```json
{
  "success": false,
  "message": "خطأ في التحقق من البيانات",
  "errors": {
    "email": ["البريد الإلكتروني مستخدم بالفعل"],
    "phone": ["رقم الهاتف مستخدم بالفعل"],
    "password": ["كلمة المرور يجب أن تكون على الأقل 8 أحرف"]
  }
}
```

---

### 1.3 نسيان كلمة المرور (Forgot Password)

**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**

```json
{
  "email": "ahmed@example.com"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
}
```

**Response (Error - 404):**

```json
{
  "success": false,
  "message": "البريد الإلكتروني غير موجود في النظام"
}
```

---

### 1.4 إعادة تعيين كلمة المرور (Reset Password)

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**

```json
{
  "email": "ahmed@example.com",
  "token": "reset-token-here",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم إعادة تعيين كلمة المرور بنجاح"
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "message": "رمز إعادة التعيين غير صحيح أو منتهي الصلاحية"
}
```

---

### 1.5 التحقق من البريد الإلكتروني (Verify Email)

**Endpoint:** `POST /api/auth/verify`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "code": "123456"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم التحقق من البريد الإلكتروني بنجاح",
  "data": {
    "user": {
      "id": 1,
      "emailVerifiedAt": "2024-12-25T10:30:00Z"
    }
  }
}
```

---

### 1.6 تسجيل الخروج (Logout)

**Endpoint:** `POST /api/auth/logout`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم تسجيل الخروج بنجاح"
}
```

---

### 1.7 الحصول على المستخدم الحالي (Get Current User)

**Endpoint:** `GET /api/auth/user`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Accept": "application/json"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "أحمد محمد",
      "email": "ahmed@example.com",
      "phone": "0501234567",
      "profileImage": "https://api.worood-shams.com/storage/profiles/user-1.jpg",
      "gender": "ذكر",
      "address": "الرياض، حي النخيل، شارع الملك فهد",
      "emailVerifiedAt": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-01T08:00:00Z",
      "totalOrders": 12,
      "totalSpent": 2450.0
    }
  }
}
```

---

## 2. 🛍️ Products & Bouquets APIs

### 2.1 الحصول على جميع المنتجات (Get All Products)

**Endpoint:** `GET /api/products`

**Query Parameters:**

- `page` (optional): رقم الصفحة (default: 1)
- `perPage` (optional): عدد المنتجات في الصفحة (default: 20)
- `category` (optional): تصنيف المنتج
- `minPrice` (optional): الحد الأدنى للسعر
- `maxPrice` (optional): الحد الأقصى للسعر
- `sortBy` (optional): ترتيب حسب (price_asc, price_desc, name_asc, name_desc, newest)
- `search` (optional): البحث في اسم المنتج

**Example:** `GET /api/products?page=1&perPage=20&sortBy=newest`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 1,
        "title": "باقة الورود الحمراء الكلاسيكية",
        "price": 250.0,
        "oldPrice": null,
        "image": "https://api.worood-shams.com/storage/products/product-1.jpg",
        "images": [
          "https://api.worood-shams.com/storage/products/product-1.jpg",
          "https://api.worood-shams.com/storage/products/product-1-2.jpg",
          "https://api.worood-shams.com/storage/products/product-1-3.jpg"
        ],
        "description": "باقة رائعة من الورود الحمراء الكلاسيكية مع تنسيق أنيق",
        "currency": "SAR",
        "rating": 4.9,
        "reviewsCount": 156,
        "flowersCount": 25,
        "isAvailable": true,
        "isBestseller": true,
        "isPopular": false,
        "badge": null,
        "category": "bouquets",
        "occasion": null,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-12-20T15:45:00Z"
      },
      {
        "id": 2,
        "title": "باقة الورود البيضاء الأنيقة",
        "price": 480.0,
        "oldPrice": 550.0,
        "image": "https://api.worood-shams.com/storage/products/product-2.jpg",
        "images": ["https://api.worood-shams.com/storage/products/product-2.jpg"],
        "description": "باقة أنيقة من الورود البيضاء الطبيعية مع لمسات خضراء",
        "currency": "SAR",
        "rating": 4.8,
        "reviewsCount": 142,
        "flowersCount": 20,
        "isAvailable": true,
        "isBestseller": false,
        "isPopular": true,
        "badge": "الأكثر شعبية",
        "category": "bouquets",
        "occasion": "wedding",
        "createdAt": "2024-01-20T11:00:00Z",
        "updatedAt": "2024-12-18T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "perPage": 20,
      "total": 150,
      "lastPage": 8,
      "from": 1,
      "to": 20
    }
  }
}
```

---

### 2.2 الحصول على منتج محدد (Get Product by ID)

**Endpoint:** `GET /api/products/{id}`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "product": {
      "id": 1,
      "title": "باقة الورود الحمراء الكلاسيكية",
      "price": 250.0,
      "oldPrice": null,
      "image": "https://api.worood-shams.com/storage/products/product-1.jpg",
      "images": [
        "https://api.worood-shams.com/storage/products/product-1.jpg",
        "https://api.worood-shams.com/storage/products/product-1-2.jpg",
        "https://api.worood-shams.com/storage/products/product-1-3.jpg",
        "https://api.worood-shams.com/storage/products/product-1-4.jpg"
      ],
      "description": "باقة رائعة من الورود الحمراء الكلاسيكية مع تنسيق أنيق. هذه الباقة مثالية للتعبير عن مشاعر الحب والتقدير. كل وردة تم اختيارها بعناية فائقة لضمان الجودة والجمال.",
      "currency": "SAR",
      "rating": 4.9,
      "reviewsCount": 156,
      "flowersCount": 25,
      "isAvailable": true,
      "isBestseller": true,
      "isPopular": false,
      "badge": null,
      "category": "bouquets",
      "occasion": null,
      "sizes": [
        {
          "value": "small",
          "label": "صغيرة",
          "price": 0,
          "stems": "15-20 وردة"
        },
        {
          "value": "medium",
          "label": "متوسطة",
          "price": 50.0,
          "stems": "25-30 وردة"
        },
        {
          "value": "large",
          "label": "كبيرة",
          "price": 100.0,
          "stems": "35-40 وردة"
        }
      ],
      "addons": {
        "card": {
          "price": 15.0,
          "label": "بطاقة تهنئة"
        },
        "chocolate": {
          "price": 25.0,
          "label": "شوكولاتة"
        },
        "giftWrap": {
          "price": 10.0,
          "label": "تغليف هدايا"
        }
      },
      "priceMultiplier": 3.75,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-12-20T15:45:00Z"
    }
  }
}
```

**Response (Error - 404):**

```json
{
  "success": false,
  "message": "المنتج غير موجود"
}
```

---

### 2.3 الحصول على جميع الباقات (Get All Bouquets)

**Endpoint:** `GET /api/bouquets`

**Query Parameters:** نفس معاملات `/api/products`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "bouquets": [
      {
        "id": 1,
        "title": "باقة الورود الحمراء الكلاسيكية",
        "price": 250.0,
        "image": "https://api.worood-shams.com/storage/products/product-1.jpg",
        "badge": null,
        "isPopular": false,
        "color": "red",
        "occasion": null,
        "currency": "SAR"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "perPage": 20,
      "total": 80,
      "lastPage": 4
    }
  }
}
```

---

### 2.4 الحصول على باقة محددة (Get Bouquet by ID)

**Endpoint:** `GET /api/bouquets/{id}`

**Response:** نفس هيكل `GET /api/products/{id}`

---

### 2.5 البحث في المنتجات (Search Products)

**Endpoint:** `GET /api/products/search`

**Query Parameters:**

- `q` (required): كلمة البحث
- `page` (optional): رقم الصفحة
- `perPage` (optional): عدد النتائج

**Example:** `GET /api/products/search?q=ورد&page=1`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 1,
        "title": "باقة الورود الحمراء الكلاسيكية",
        "price": 250.0,
        "image": "https://api.worood-shams.com/storage/products/product-1.jpg",
        "rating": 4.9,
        "reviewsCount": 156
      }
    ],
    "pagination": {
      "currentPage": 1,
      "perPage": 20,
      "total": 25,
      "lastPage": 2
    },
    "searchQuery": "ورد"
  }
}
```

---

## 3. 🎉 Occasions APIs

### 3.1 الحصول على جميع المناسبات (Get All Occasions)

**Endpoint:** `GET /api/occasions`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "occasions": [
      {
        "id": 1,
        "title": "باقات الزفاف",
        "category": "wedding",
        "description": "اجعل يوم زفافك أكثر جمالاً وروعة مع تشكيلتنا المميزة من باقات الزفاف الفاخرة",
        "image": "https://api.worood-shams.com/storage/occasions/wedding.jpg",
        "icon": "Heart",
        "productsCount": 12
      },
      {
        "id": 2,
        "title": "خطوبة",
        "category": "engagement",
        "description": "احتفل بلحظات الخطوبة المميزة مع باقاتنا الرومانسية الساحرة",
        "image": "https://api.worood-shams.com/storage/occasions/engagement.jpg",
        "icon": "Heart",
        "productsCount": 10
      },
      {
        "id": 3,
        "title": "نجاح وتخرج",
        "category": "graduation",
        "description": "احتفل بإنجازات أحبائك مع مجموعة مميزة من الهدايا المخصصة للتخرج والنجاح",
        "image": "https://api.worood-shams.com/storage/occasions/graduation.jpg",
        "icon": "GraduationCap",
        "productsCount": 8
      },
      {
        "id": 4,
        "title": "مولود جديد",
        "category": "newborn",
        "description": "رحب بالمولود الجديد مع مجموعة مميزة من الهدايا الرقيقة واللطيفة",
        "image": "https://api.worood-shams.com/storage/occasions/newborn.jpg",
        "icon": "Baby",
        "productsCount": 9
      },
      {
        "id": 5,
        "title": "ذكرى سنوية",
        "category": "anniversary",
        "description": "احتفل بذكرياتك السنوية مع باقات الورود الفاخرة والهدايا الرومانسية المميزة",
        "image": "https://api.worood-shams.com/storage/occasions/anniversary.jpg",
        "icon": "Calendar",
        "productsCount": 10
      },
      {
        "id": 6,
        "title": "شفاء عاجل",
        "category": "getwell",
        "description": "أرسل أطيب التمنيات بالشفاء العاجل مع باقاتنا الجميلة والهدايا المريحة",
        "image": "https://api.worood-shams.com/storage/occasions/getwell.jpg",
        "icon": "Sparkles",
        "productsCount": 6
      },
      {
        "id": 7,
        "title": "شكر وتقدير",
        "category": "thanks",
        "description": "عبر عن شكرك وتقديرك بأجمل الطرق مع باقاتنا المميزة",
        "image": "https://api.worood-shams.com/storage/occasions/thanks.jpg",
        "icon": "Gift",
        "productsCount": 8
      }
    ]
  }
}
```

---

### 3.2 الحصول على مناسبة حسب التصنيف (Get Occasion by Category)

**Endpoint:** `GET /api/occasions/{category}`

**Example:** `GET /api/occasions/wedding`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "occasion": {
      "id": 1,
      "title": "باقات الزفاف",
      "category": "wedding",
      "description": "اجعل يوم زفافك أكثر جمالاً وروعة مع تشكيلتنا المميزة من باقات الزفاف الفاخرة. باقات الورود البيضاء والناعمة، الترتيبات الرومانسية، والديكورات الأنيقة التي تحول حفل زفافك إلى حلم جميل. كل باقة مصممة بعناية فائقة لتكون جزءاً لا يُنسى من أجمل أيام حياتك.",
      "productsCount": 12,
      "image": "https://api.worood-shams.com/storage/occasions/wedding.jpg",
      "icon": "Heart"
    }
  }
}
```

---

### 3.3 الحصول على منتجات مناسبة محددة (Get Products by Occasion)

**Endpoint:** `GET /api/occasions/{category}/products`

**Query Parameters:**

- `page` (optional): رقم الصفحة
- `perPage` (optional): عدد المنتجات

**Example:** `GET /api/occasions/wedding/products?page=1&perPage=12`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "occasion": {
      "id": 1,
      "title": "باقات الزفاف",
      "category": "wedding"
    },
    "products": [
      {
        "id": 1001,
        "title": "باقة الفرح الملكية",
        "price": 599.0,
        "oldPrice": 699.0,
        "image": "https://api.worood-shams.com/storage/products/product-1001.jpg",
        "rating": 4.9,
        "reviewsCount": 156,
        "description": "باقة فاخرة من الورود البيضاء والكريمية مع لمسات من الخضرة الطبيعية",
        "flowersCount": 25,
        "isAvailable": true,
        "isBestseller": true,
        "isPopular": false,
        "badge": null
      },
      {
        "id": 1002,
        "title": "باقة الحب الأبيض",
        "price": 499.0,
        "oldPrice": null,
        "image": "https://api.worood-shams.com/storage/products/product-1002.jpg",
        "rating": 4.8,
        "reviewsCount": 142,
        "description": "باقة أنيقة من الورود البيضاء الطبيعية مع لمسات خضراء",
        "flowersCount": 20,
        "isAvailable": true,
        "isBestseller": false,
        "isPopular": false,
        "badge": null
      }
    ],
    "pagination": {
      "currentPage": 1,
      "perPage": 12,
      "total": 12,
      "lastPage": 1
    }
  }
}
```

---

## 4. 🛒 Cart APIs

### 4.1 الحصول على السلة (Get Cart)

**Endpoint:** `GET /api/cart`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Accept": "application/json"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "productId": 1001,
        "title": "باقة الورود الحمراء الكلاسيكية",
        "price": 250.0,
        "subtotal": 250.0,
        "vat": 37.5,
        "quantity": 1,
        "image": "https://api.worood-shams.com/storage/products/product-1001.jpg",
        "isCustom": false,
        "size": "medium",
        "style": null,
        "color": "red",
        "total": 250.0,
        "addCard": false,
        "cardMessage": null,
        "addChocolate": false,
        "giftWrap": false,
        "uniqueKey": "product-1001-medium-red",
        "createdAt": "2024-12-25T10:30:00Z"
      },
      {
        "id": 2,
        "productId": null,
        "title": "باقة مخصصة",
        "price": 350.0,
        "subtotal": 350.0,
        "vat": 52.5,
        "quantity": 1,
        "image": "https://api.worood-shams.com/storage/custom/custom-1.jpg",
        "isCustom": true,
        "customData": {
          "flowers": [
            {
              "id": 1,
              "name": "ورد جوري",
              "quantity": 10,
              "price": 25.0,
              "total": 250.0
            },
            {
              "id": 2,
              "name": "توليب",
              "quantity": 5,
              "price": 30.0,
              "total": 150.0
            }
          ],
          "colors": ["#FF0000", "#FFC0CB"],
          "size": {
            "key": "medium",
            "label": "متوسطة",
            "price": 50.0
          },
          "style": {
            "key": "classic",
            "label": "كلاسيكي",
            "price": 0
          },
          "packaging": {
            "type": "vase",
            "vase": {
              "id": 1,
              "name": "مزهرية زجاجية",
              "price": 30.0
            }
          },
          "occasion": {
            "name": "عيد ميلاد",
            "icon": "Gift"
          },
          "cardMessage": "كل عام وأنت بخير",
          "includeCard": true,
          "cardPrice": 15.0,
          "notes": "يرجى التسليم في الصباح",
          "flowersCount": 15,
          "basePrice": 400.0,
          "totalPrice": 450.0
        },
        "size": null,
        "style": null,
        "color": null,
        "total": 350.0,
        "addCard": true,
        "cardMessage": "كل عام وأنت بخير",
        "addChocolate": false,
        "giftWrap": false,
        "uniqueKey": "custom-bouquet-2",
        "createdAt": "2024-12-25T11:00:00Z"
      }
    ],
    "totals": {
      "subtotal": 600.0,
      "vat": 90.0,
      "total": 690.0,
      "itemsCount": 2,
      "totalItemsCount": 2
    }
  }
}
```

---

### 4.2 إضافة منتج إلى السلة (Add to Cart)

**Endpoint:** `POST /api/cart`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Request Body (Product):**

```json
{
  "productId": 1001,
  "quantity": 1,
  "size": "medium",
  "style": null,
  "color": "red",
  "addCard": false,
  "cardMessage": null,
  "addChocolate": false,
  "giftWrap": false
}
```

**Request Body (Custom Bouquet):**

```json
{
  "isCustom": true,
  "customData": {
    "flowers": [
      {
        "id": 1,
        "quantity": 10
      },
      {
        "id": 2,
        "quantity": 5
      }
    ],
    "colors": ["#FF0000", "#FFC0CB"],
    "size": {
      "key": "medium",
      "label": "متوسطة",
      "price": 50.0
    },
    "style": {
      "key": "classic",
      "label": "كلاسيكي",
      "price": 0
    },
    "packaging": {
      "type": "vase",
      "vase": {
        "id": 1,
        "name": "مزهرية زجاجية",
        "price": 30.0
      }
    },
    "occasion": {
      "name": "عيد ميلاد",
      "icon": "Gift"
    },
    "cardMessage": "كل عام وأنت بخير",
    "includeCard": true,
    "cardPrice": 15.0,
    "notes": "يرجى التسليم في الصباح"
  },
  "quantity": 1
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "تم إضافة المنتج إلى السلة بنجاح",
  "data": {
    "cartItem": {
      "id": 1,
      "productId": 1001,
      "title": "باقة الورود الحمراء الكلاسيكية",
      "price": 250.0,
      "quantity": 1,
      "image": "https://api.worood-shams.com/storage/products/product-1001.jpg",
      "isCustom": false,
      "size": "medium",
      "total": 250.0
    },
    "cartTotals": {
      "subtotal": 250.0,
      "vat": 37.5,
      "total": 287.5,
      "itemsCount": 1,
      "totalItemsCount": 1
    }
  }
}
```

---

### 4.3 تحديث عنصر في السلة (Update Cart Item)

**Endpoint:** `PUT /api/cart/{id}`

**Request Body:**

```json
{
  "quantity": 2
}
```

أو تحديث كامل:

```json
{
  "quantity": 2,
  "size": "large",
  "addCard": true,
  "cardMessage": "تهنئة خاصة"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم تحديث العنصر في السلة بنجاح",
  "data": {
    "cartItem": {
      "id": 1,
      "productId": 1001,
      "title": "باقة الورود الحمراء الكلاسيكية",
      "price": 250.0,
      "quantity": 2,
      "total": 500.0
    },
    "cartTotals": {
      "subtotal": 500.0,
      "vat": 75.0,
      "total": 575.0,
      "itemsCount": 2,
      "totalItemsCount": 2
    }
  }
}
```

---

### 4.4 حذف عنصر من السلة (Remove from Cart)

**Endpoint:** `DELETE /api/cart/{id}`

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم حذف العنصر من السلة بنجاح",
  "data": {
    "cartTotals": {
      "subtotal": 0.0,
      "vat": 0.0,
      "total": 0.0,
      "itemsCount": 0,
      "totalItemsCount": 0
    }
  }
}
```

---

### 4.5 مسح السلة (Clear Cart)

**Endpoint:** `DELETE /api/cart`

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم مسح السلة بنجاح",
  "data": {
    "items": [],
    "totals": {
      "subtotal": 0.0,
      "vat": 0.0,
      "total": 0.0,
      "itemsCount": 0,
      "totalItemsCount": 0
    }
  }
}
```

---

## 5. 📦 Orders APIs

### 5.1 الحصول على جميع الطلبات (Get All Orders)

**Endpoint:** `GET /api/orders`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Accept": "application/json"
}
```

**Query Parameters:**

- `page` (optional): رقم الصفحة
- `perPage` (optional): عدد الطلبات
- `status` (optional): حالة الطلب (قيد التجهيز، تم التجهيز، في الطريق، تم التسليم، ملغي)

**Example:** `GET /api/orders?page=1&status=قيد التجهيز`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "1",
        "orderNumber": "ORD-2024-001",
        "status": "تم التسليم",
        "statusColor": "bg-green-100 text-green-800",
        "date": "2024-12-15T10:30:00Z",
        "totalAmount": 350.0,
        "items": [
          {
            "id": "item-1",
            "name": "باقة الورود الحمراء الكلاسيكية",
            "image": "https://api.worood-shams.com/storage/products/product-1.jpg",
            "price": 250.0,
            "quantity": 1,
            "bouquetType": "باقة كلاسيكية"
          },
          {
            "id": "item-2",
            "name": "ورود إضافية",
            "image": "https://api.worood-shams.com/storage/products/product-2.jpg",
            "price": 100.0,
            "quantity": 1
          }
        ],
        "deliveryAddress": "الرياض، حي النخيل، شارع الملك فهد، مبنى رقم 123",
        "phoneNumber": "0501234567",
        "paymentMethod": "فيزا",
        "paymentMethodLabel": "فيزا",
        "notes": "يرجى التسليم بعد الساعة 6 مساءً",
        "trackingNumber": "TRK-789456123",
        "createdAt": "2024-12-15T08:00:00Z",
        "deliveredAt": "2024-12-15T18:30:00Z"
      },
      {
        "id": "2",
        "orderNumber": "ORD-2024-002",
        "status": "في الطريق",
        "statusColor": "bg-blue-100 text-blue-800",
        "date": "2024-12-18T14:20:00Z",
        "totalAmount": 480.0,
        "items": [
          {
            "id": "item-3",
            "name": "باقة الورود البيضاء الأنيقة",
            "image": "https://api.worood-shams.com/storage/products/product-3.jpg",
            "price": 480.0,
            "quantity": 1,
            "bouquetType": "باقة أنيقة"
          }
        ],
        "deliveryAddress": "جدة، حي الروضة، شارع الأمير سلطان",
        "phoneNumber": "0509876543",
        "paymentMethod": "mada",
        "paymentMethodLabel": "مدى",
        "trackingNumber": "TRK-456789123",
        "createdAt": "2024-12-18T10:00:00Z"
      },
      {
        "id": "3",
        "orderNumber": "ORD-2024-003",
        "status": "قيد التجهيز",
        "statusColor": "bg-orange-100 text-orange-800",
        "date": "2024-12-22T09:15:00Z",
        "totalAmount": 180.0,
        "items": [
          {
            "id": "item-4",
            "name": "باقة الورود الصفراء المشرقة",
            "image": "https://api.worood-shams.com/storage/products/product-4.jpg",
            "price": 180.0,
            "quantity": 1,
            "bouquetType": "باقة صغيرة"
          }
        ],
        "deliveryAddress": "الرياض، حي العليا، شارع التحلية",
        "phoneNumber": "0501112233",
        "paymentMethod": "cod",
        "paymentMethodLabel": "الدفع عند الاستلام",
        "notes": "طلب عاجل - يرجى التسليم في نفس اليوم",
        "createdAt": "2024-12-22T08:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "perPage": 20,
      "total": 12,
      "lastPage": 1
    }
  }
}
```

---

### 5.2 الحصول على طلب محدد (Get Order by ID)

**Endpoint:** `GET /api/orders/{id}`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "order": {
      "id": "1",
      "orderNumber": "ORD-2024-001",
      "status": "تم التسليم",
      "statusColor": "bg-green-100 text-green-800",
      "date": "2024-12-15T10:30:00Z",
      "totalAmount": 350.0,
      "subtotal": 350.0,
      "vat": 52.5,
      "grandTotal": 402.5,
      "items": [
        {
          "id": "item-1",
          "productId": 1001,
          "name": "باقة الورود الحمراء الكلاسيكية",
          "image": "https://api.worood-shams.com/storage/products/product-1.jpg",
          "price": 250.0,
          "quantity": 1,
          "bouquetType": "باقة كلاسيكية",
          "isCustom": false
        },
        {
          "id": "item-2",
          "productId": 1002,
          "name": "ورود إضافية",
          "image": "https://api.worood-shams.com/storage/products/product-2.jpg",
          "price": 100.0,
          "quantity": 1,
          "isCustom": false
        }
      ],
      "deliveryAddress": {
        "city": "الرياض",
        "district": "حي النخيل",
        "street": "شارع الملك فهد",
        "landmark": "مبنى رقم 123",
        "fullAddress": "الرياض، حي النخيل، شارع الملك فهد، مبنى رقم 123"
      },
      "phoneNumber": "0501234567",
      "paymentMethod": "visa",
      "paymentMethodLabel": "فيزا",
      "notes": "يرجى التسليم بعد الساعة 6 مساءً",
      "trackingNumber": "TRK-789456123",
      "deliveryDate": "2024-12-15",
      "deliveryTime": "18:00",
      "deliveryTimeLabel": "6:00 مساءً",
      "createdAt": "2024-12-15T08:00:00Z",
      "updatedAt": "2024-12-15T18:30:00Z",
      "deliveredAt": "2024-12-15T18:30:00Z"
    }
  }
}
```

---

### 5.3 إنشاء طلب جديد (Create Order)

**Endpoint:** `POST /api/orders`

**Note:** هذا الـ endpoint يتم استدعاؤه من صفحة Checkout. راجع قسم Checkout APIs.

---

### 5.4 تحديث حالة الطلب (Update Order Status)

**Endpoint:** `PUT /api/orders/{id}/status`

**Request Body:**

```json
{
  "status": "تم التجهيز"
}
```

**القيم المتاحة للحالة:**

- `قيد التجهيز`
- `تم التجهيز`
- `في الطريق`
- `تم التسليم`
- `ملغي`

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم تحديث حالة الطلب بنجاح",
  "data": {
    "order": {
      "id": "1",
      "orderNumber": "ORD-2024-001",
      "status": "تم التجهيز",
      "statusColor": "bg-yellow-100 text-yellow-800",
      "updatedAt": "2024-12-25T10:30:00Z"
    }
  }
}
```

---

### 5.5 إلغاء الطلب (Cancel Order)

**Endpoint:** `DELETE /api/orders/{id}`

**Request Body (Optional):**

```json
{
  "reason": "تم الإلغاء بناءً على طلب العميل"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم إلغاء الطلب بنجاح",
  "data": {
    "order": {
      "id": "1",
      "orderNumber": "ORD-2024-001",
      "status": "ملغي",
      "statusColor": "bg-red-100 text-red-800",
      "cancelledAt": "2024-12-25T10:30:00Z"
    }
  }
}
```

---

## 6. 💳 Checkout APIs

### 6.1 التحقق من بيانات الدفع (Validate Checkout)

**Endpoint:** `POST /api/checkout/validate`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "items": [
    {
      "id": 1,
      "productId": 1001,
      "quantity": 1
    }
  ],
  "address": {
    "city": "الرياض",
    "district": "حي النخيل",
    "street": "شارع الملك فهد",
    "landmark": "مبنى رقم 123",
    "phone": "0501234567"
  },
  "paymentMethod": "mada"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "البيانات صحيحة",
  "data": {
    "isValid": true,
    "totals": {
      "subtotal": 250.0,
      "vat": 37.5,
      "grand": 287.5
    }
  }
}
```

**Response (Validation Error - 422):**

```json
{
  "success": false,
  "message": "خطأ في التحقق من البيانات",
  "errors": {
    "address.city": ["حقل المدينة مطلوب"],
    "address.district": ["حقل الحي مطلوب"],
    "address.street": ["حقل الشارع مطلوب"],
    "address.phone": ["رقم الهاتف غير صحيح"]
  }
}
```

---

### 6.2 إنشاء طلب من صفحة الدفع (Create Order from Checkout)

**Endpoint:** `POST /api/checkout`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "items": [
    {
      "id": 1,
      "productId": 1001,
      "title": "باقة الورود الحمراء الكلاسيكية",
      "price": 250.0,
      "quantity": 1,
      "image": "https://api.worood-shams.com/storage/products/product-1.jpg",
      "isCustom": false,
      "size": "medium",
      "addCard": false,
      "addChocolate": false,
      "giftWrap": false
    }
  ],
  "address": {
    "city": "الرياض",
    "district": "حي النخيل",
    "street": "شارع الملك فهد",
    "landmark": "مبنى رقم 123",
    "phone": "0501234567"
  },
  "notes": "يرجى التسليم بعد الساعة 6 مساءً",
  "paymentMethod": "mada",
  "deliveryDate": "2024-12-26",
  "deliveryTime": "18:00",
  "deliveryTimeLabel": "6:00 مساءً"
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "تم تأكيد الطلب بنجاح! شكراً لثقتكم بنا",
  "data": {
    "order": {
      "id": "1",
      "orderNumber": "ORD-2024-001",
      "status": "قيد التجهيز",
      "statusColor": "bg-orange-100 text-orange-800",
      "date": "2024-12-25T10:30:00Z",
      "totalAmount": 287.5,
      "subtotal": 250.0,
      "vat": 37.5,
      "grandTotal": 287.5,
      "items": [
        {
          "id": "item-1",
          "name": "باقة الورود الحمراء الكلاسيكية",
          "image": "https://api.worood-shams.com/storage/products/product-1.jpg",
          "price": 250.0,
          "quantity": 1
        }
      ],
      "deliveryAddress": "الرياض، حي النخيل، شارع الملك فهد، مبنى رقم 123",
      "phoneNumber": "0501234567",
      "paymentMethod": "mada",
      "paymentMethodLabel": "مدى",
      "notes": "يرجى التسليم بعد الساعة 6 مساءً",
      "trackingNumber": "TRK-789456123",
      "deliveryDate": "2024-12-26",
      "deliveryTime": "18:00",
      "deliveryTimeLabel": "6:00 مساءً",
      "createdAt": "2024-12-25T10:30:00Z"
    },
    "payment": {
      "status": "pending",
      "transactionId": "TXN-123456789",
      "paymentUrl": null
    }
  }
}
```

**Response (Payment Required - 402):**

```json
{
  "success": false,
  "message": "يرجى إتمام عملية الدفع",
  "data": {
    "payment": {
      "status": "required",
      "transactionId": "TXN-123456789",
      "paymentUrl": "https://payment.gateway.com/checkout/TXN-123456789"
    }
  }
}
```

---

## 7. 👤 Profile APIs

### 7.1 الحصول على الملف الشخصي (Get User Profile)

**Endpoint:** `GET /api/profile`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Accept": "application/json"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "أحمد محمد",
      "email": "ahmed@example.com",
      "phone": "0501234567",
      "profileImage": "https://api.worood-shams.com/storage/profiles/user-1.jpg",
      "gender": "ذكر",
      "address": "الرياض، حي النخيل، شارع الملك فهد",
      "joinDate": "2024-01-01T08:00:00Z",
      "totalOrders": 12,
      "totalSpent": 2450.0,
      "emailVerifiedAt": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-01T08:00:00Z",
      "updatedAt": "2024-12-20T15:45:00Z"
    }
  }
}
```

---

### 7.2 تحديث الملف الشخصي (Update User Profile)

**Endpoint:** `PUT /api/profile`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "name": "أحمد محمد علي",
  "phone": "0501234567",
  "gender": "ذكر",
  "address": "الرياض، حي النخيل، شارع الملك فهد، مبنى رقم 123"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم حفظ البيانات بنجاح!",
  "data": {
    "user": {
      "id": 1,
      "name": "أحمد محمد علي",
      "email": "ahmed@example.com",
      "phone": "0501234567",
      "profileImage": "https://api.worood-shams.com/storage/profiles/user-1.jpg",
      "gender": "ذكر",
      "address": "الرياض، حي النخيل، شارع الملك فهد، مبنى رقم 123",
      "updatedAt": "2024-12-25T10:30:00Z"
    }
  }
}
```

**Response (Validation Error - 422):**

```json
{
  "success": false,
  "message": "خطأ في التحقق من البيانات",
  "errors": {
    "name": ["حقل الاسم مطلوب"],
    "phone": ["رقم الهاتف غير صحيح"]
  }
}
```

---

### 7.3 رفع صورة الملف الشخصي (Upload Profile Image)

**Endpoint:** `POST /api/profile/avatar`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}"
}
```

**Request Body (Form Data):**

```
avatar: [file]
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم رفع الصورة بنجاح",
  "data": {
    "user": {
      "id": 1,
      "profileImage": "https://api.worood-shams.com/storage/profiles/user-1.jpg",
      "updatedAt": "2024-12-25T10:30:00Z"
    }
  }
}
```

**Response (Error - 422):**

```json
{
  "success": false,
  "message": "خطأ في رفع الصورة",
  "errors": {
    "avatar": [
      "حجم الصورة يجب أن يكون أقل من 5 ميجابايت",
      "الصورة يجب أن تكون من نوع: jpg, jpeg, png"
    ]
  }
}
```

---

## 8. ❤️ Favorites APIs

### 8.1 الحصول على المفضلة (Get Favorites)

**Endpoint:** `GET /api/favorites`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Accept": "application/json"
}
```

**Query Parameters:**

- `page` (optional): رقم الصفحة
- `perPage` (optional): عدد العناصر

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "favorites": [
      {
        "id": 1,
        "productId": 1001,
        "product": {
          "id": 1001,
          "title": "باقة الورود الحمراء الكلاسيكية",
          "price": 250.0,
          "image": "https://api.worood-shams.com/storage/products/product-1001.jpg",
          "rating": 4.9,
          "reviewsCount": 156,
          "isAvailable": true
        },
        "createdAt": "2024-12-20T10:30:00Z"
      },
      {
        "id": 2,
        "customBouquetId": 5,
        "customBouquet": {
          "id": 5,
          "flowers": [
            {
              "flower": {
                "id": 1,
                "name": "ورد جوري",
                "price": 25.0,
                "image": "https://api.worood-shams.com/storage/flowers/rose.jpg"
              },
              "quantity": 10
            }
          ],
          "total": 350.0,
          "image": "https://api.worood-shams.com/storage/custom/custom-5.jpg",
          "createdAt": "2024-12-15T10:30:00Z"
        },
        "createdAt": "2024-12-18T15:45:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "perPage": 20,
      "total": 8,
      "lastPage": 1
    }
  }
}
```

---

### 8.2 إضافة إلى المفضلة (Add to Favorites)

**Endpoint:** `POST /api/favorites`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Request Body (Product):**

```json
{
  "productId": 1001
}
```

**Request Body (Custom Bouquet):**

```json
{
  "customBouquetId": 5
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "تم إضافة المنتج إلى المفضلة بنجاح",
  "data": {
    "favorite": {
      "id": 1,
      "productId": 1001,
      "createdAt": "2024-12-25T10:30:00Z"
    }
  }
}
```

**Response (Already Exists - 409):**

```json
{
  "success": false,
  "message": "المنتج موجود بالفعل في المفضلة"
}
```

---

### 8.3 حذف من المفضلة (Remove from Favorites)

**Endpoint:** `DELETE /api/favorites/{id}`

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم حذف المنتج من المفضلة بنجاح"
}
```

---

## 9. ⭐ Reviews APIs

### 9.1 الحصول على تقييمات منتج (Get Product Reviews)

**Endpoint:** `GET /api/products/{id}/reviews`

**Query Parameters:**

- `page` (optional): رقم الصفحة
- `perPage` (optional): عدد التقييمات
- `rating` (optional): تصفية حسب التقييم (1-5)

**Example:** `GET /api/products/1001/reviews?page=1&perPage=10`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "product": {
      "id": 1001,
      "title": "باقة الورود الحمراء الكلاسيكية",
      "averageRating": 4.9,
      "totalReviews": 156,
      "ratingDistribution": {
        "5": 120,
        "4": 30,
        "3": 5,
        "2": 1,
        "1": 0
      }
    },
    "reviews": [
      {
        "id": 1,
        "orderId": "ORD-2024-001",
        "customerName": "أحمد محمد",
        "customerImage": "https://api.worood-shams.com/storage/profiles/user-1.jpg",
        "rating": 5,
        "comment": "باقة رائعة وخدمة ممتازة وصلت الباقة في الوقت المحدد وكانت أجمل مما توقعت. جودة الورود ممتازة والتغليف راقي جداً.",
        "date": "2024-12-16T10:30:00Z",
        "productName": "باقة الورود الحمراء الكلاسيكية",
        "verified": true,
        "helpful": 12,
        "createdAt": "2024-12-16T10:30:00Z"
      },
      {
        "id": 2,
        "orderId": "ORD-2024-002",
        "customerName": "سارة أحمد",
        "customerImage": null,
        "rating": 5,
        "comment": "أهديت زوجتي باقة من تنسيقي الخاص وكانت سعيدة جداً بها. سأكرر التجربة مرة أخرى بالتأكيد.",
        "date": "2024-12-19T14:20:00Z",
        "productName": "باقة الورود البيضاء الأنيقة",
        "verified": true,
        "helpful": 8,
        "createdAt": "2024-12-19T14:20:00Z"
      },
      {
        "id": 3,
        "orderId": "ORD-2024-003",
        "customerName": "محمد علي",
        "customerImage": null,
        "rating": 4,
        "comment": "جودة الورود ممتازة والتغليف راقي جداً. أنصح الجميع بالتعامل معهم. خدمة العملاء ممتازة أيضاً.",
        "date": "2024-12-21T09:15:00Z",
        "productName": "باقة الورود المختلطة",
        "verified": true,
        "helpful": 5,
        "createdAt": "2024-12-21T09:15:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "perPage": 10,
      "total": 156,
      "lastPage": 16
    }
  }
}
```

---

### 9.2 إنشاء تقييم (Create Review)

**Endpoint:** `POST /api/reviews`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "productId": 1001,
  "orderId": "ORD-2024-001",
  "rating": 5,
  "comment": "باقة رائعة وخدمة ممتازة. أنصح الجميع!"
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "تم إضافة التقييم بنجاح",
  "data": {
    "review": {
      "id": 157,
      "productId": 1001,
      "orderId": "ORD-2024-001",
      "customerName": "أحمد محمد",
      "customerImage": "https://api.worood-shams.com/storage/profiles/user-1.jpg",
      "rating": 5,
      "comment": "باقة رائعة وخدمة ممتازة. أنصح الجميع!",
      "date": "2024-12-25T10:30:00Z",
      "productName": "باقة الورود الحمراء الكلاسيكية",
      "verified": true,
      "helpful": 0,
      "createdAt": "2024-12-25T10:30:00Z"
    }
  }
}
```

**Response (Already Reviewed - 409):**

```json
{
  "success": false,
  "message": "لقد قمت بتقييم هذا المنتج من قبل"
}
```

---

### 9.3 تحديث التقييم (Update Review)

**Endpoint:** `PUT /api/reviews/{id}`

**Request Body:**

```json
{
  "rating": 4,
  "comment": "باقة جميلة ولكن يمكن تحسين التغليف"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم تحديث التقييم بنجاح",
  "data": {
    "review": {
      "id": 1,
      "rating": 4,
      "comment": "باقة جميلة ولكن يمكن تحسين التغليف",
      "updatedAt": "2024-12-25T10:30:00Z"
    }
  }
}
```

---

### 9.4 حذف التقييم (Delete Review)

**Endpoint:** `DELETE /api/reviews/{id}`

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم حذف التقييم بنجاح"
}
```

---

## 10. 🌸 Flowers APIs

### 10.1 الحصول على جميع أنواع الزهور (Get All Flowers)

**Endpoint:** `GET /api/flowers`

**ملاحظة مهمة:** هذا الـ endpoint يعيد جميع أنواع الزهور المتوفرة في المتجر. الزهور هي منتجات أساسية في المتجر وتستخدم في الباقات المخصصة.

**Query Parameters:**

- `page` (optional): رقم الصفحة (default: 1)
- `perPage` (optional): عدد الزهور في الصفحة (default: 20)
- `available` (optional): تصفية حسب التوفر (true/false)
- `search` (optional): البحث في اسم الزهرة

**Example:** `GET /api/flowers?page=1&perPage=20&available=true`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "flowers": [
      {
        "id": 1,
        "name": "ورد جوري",
        "price": 25.0,
        "image": "https://api.worood-shams.com/storage/flowers/rose.jpg",
        "availableColors": [1, 7, 8],
        "description": "ورد جوري فاخر من أجود الأنواع",
        "isAvailable": true,
        "stock": 150,
        "category": "roses",
        "season": "all",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-12-20T15:45:00Z"
      },
      {
        "id": 2,
        "name": "توليب",
        "price": 30.0,
        "image": "https://api.worood-shams.com/storage/flowers/tulip.jpg",
        "availableColors": [1, 2, 3, 7, 8],
        "description": "توليب طازج بألوان زاهية",
        "isAvailable": true,
        "stock": 200,
        "category": "tulips",
        "season": "spring",
        "createdAt": "2024-01-20T11:00:00Z",
        "updatedAt": "2024-12-18T10:30:00Z"
      },
      {
        "id": 3,
        "name": "زنبق",
        "price": 35.0,
        "image": "https://api.worood-shams.com/storage/flowers/lily.jpg",
        "availableColors": [3, 7, 8],
        "description": "زنبق أنيق برائحة عطرة",
        "isAvailable": true,
        "stock": 120,
        "category": "lilies",
        "season": "summer",
        "createdAt": "2024-02-01T09:00:00Z",
        "updatedAt": "2024-12-15T14:20:00Z"
      },
      {
        "id": 4,
        "name": "أوركيد",
        "price": 45.0,
        "image": "https://api.worood-shams.com/storage/flowers/orchid.jpg",
        "availableColors": [6, 7, 8],
        "description": "أوركيد فاخر وأنيق",
        "isAvailable": true,
        "stock": 80,
        "category": "orchids",
        "season": "all",
        "createdAt": "2024-02-10T10:00:00Z",
        "updatedAt": "2024-12-10T11:30:00Z"
      },
      {
        "id": 5,
        "name": "جربيرا",
        "price": 20.0,
        "image": "https://api.worood-shams.com/storage/flowers/gerbera.jpg",
        "availableColors": [1, 2, 3, 7, 8],
        "description": "جربيرا ملون ومبهج",
        "isAvailable": true,
        "stock": 300,
        "category": "gerbera",
        "season": "all",
        "createdAt": "2024-01-25T08:30:00Z",
        "updatedAt": "2024-12-22T09:15:00Z"
      },
      {
        "id": 6,
        "name": "فرازيا",
        "price": 25.0,
        "image": "https://api.worood-shams.com/storage/flowers/freesia.jpg",
        "availableColors": [7, 8],
        "description": "فرازيا برائحة جميلة",
        "isAvailable": true,
        "stock": 100,
        "category": "freesia",
        "season": "spring",
        "createdAt": "2024-03-01T10:00:00Z",
        "updatedAt": "2024-12-05T16:00:00Z"
      },
      {
        "id": 7,
        "name": "إسبيريشن",
        "price": 30.0,
        "image": "https://api.worood-shams.com/storage/flowers/eustoma.jpg",
        "availableColors": [1, 7, 8],
        "description": "إسبيريشن ناعم وجميل",
        "isAvailable": true,
        "stock": 180,
        "category": "eustoma",
        "season": "all",
        "createdAt": "2024-02-15T11:30:00Z",
        "updatedAt": "2024-12-12T10:45:00Z"
      },
      {
        "id": 8,
        "name": "الهيدرانجيا",
        "price": 40.0,
        "image": "https://api.worood-shams.com/storage/flowers/hydrangea.jpg",
        "availableColors": [4, 5, 6, 7, 8],
        "description": "هيدرانجيا كبيرة وجميلة",
        "isAvailable": true,
        "stock": 90,
        "category": "hydrangea",
        "season": "summer",
        "createdAt": "2024-03-10T09:00:00Z",
        "updatedAt": "2024-12-08T13:20:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "perPage": 20,
      "total": 8,
      "lastPage": 1,
      "from": 1,
      "to": 8
    }
  }
}
```

**ملاحظات مهمة:**

- كل زهرة تحتوي على حقل `availableColors` وهو مصفوفة من IDs للألوان المتوفرة لهذه الزهرة
- هذه الـ IDs تشير إلى الألوان في endpoint `/api/colors`
- على سبيل المثال: إذا كانت `availableColors: [1, 7, 8]` فهذا يعني أن هذه الزهرة متوفرة بالألوان التي لها IDs: 1, 7, 8 في قائمة الألوان

---

### 10.2 الحصول على نوع زهرة محدد (Get Flower by ID)

**Endpoint:** `GET /api/flowers/{id}`

**Example:** `GET /api/flowers/1`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "flower": {
      "id": 1,
      "name": "ورد جوري",
      "price": 25.0,
      "image": "https://api.worood-shams.com/storage/flowers/rose.jpg",
      "availableColors": [1, 7, 8],
      "colors": [
        {
          "id": 1,
          "color": "#FF0000",
          "name": "أحمر"
        },
        {
          "id": 7,
          "color": "#FFD700",
          "name": "ذهبي"
        },
        {
          "id": 8,
          "color": "#FFA500",
          "name": "برتقالي"
        }
      ],
      "description": "ورد جوري فاخر من أجود الأنواع. يتم استيراده من أفضل المزارع العالمية لضمان الجودة والجمال.",
      "isAvailable": true,
      "stock": 150,
      "category": "roses",
      "categoryName": "ورود",
      "season": "all",
      "seasonName": "طوال السنة",
      "careInstructions": "يُنصح بتغيير الماء كل يومين وقطع الساق بزاوية 45 درجة",
      "lifespan": "7-10 أيام",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-12-20T15:45:00Z"
    }
  }
}
```

**Response (Error - 404):**

```json
{
  "success": false,
  "message": "الزهرة غير موجودة"
}
```

**ملاحظة:** في هذا الـ endpoint، يتم إرجاع `colors` كاملة (objects) بدلاً من IDs فقط لتسهيل الاستخدام في Frontend.

---

## 11. 🎨 Colors APIs

### 11.1 الحصول على جميع الألوان المتاحة (Get All Colors)

**Endpoint:** `GET /api/colors`

**ملاحظة مهمة:** هذا الـ endpoint يعيد جميع الألوان المتاحة في النظام. هذه الألوان تُستخدم مع الزهور في الباقات المخصصة. كل زهرة لها `availableColors` الذي يحتوي على IDs الألوان المتوفرة لها.

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "colors": [
      {
        "id": 1,
        "color": "#FF0000",
        "name": "أحمر",
        "nameEn": "Red",
        "hexCode": "#FF0000",
        "rgbCode": "rgb(255, 0, 0)",
        "isAvailable": true,
        "createdAt": "2024-01-01T08:00:00Z"
      },
      {
        "id": 2,
        "color": "#FFC0CB",
        "name": "وردي",
        "nameEn": "Pink",
        "hexCode": "#FFC0CB",
        "rgbCode": "rgb(255, 192, 203)",
        "isAvailable": true,
        "createdAt": "2024-01-01T08:00:00Z"
      },
      {
        "id": 3,
        "color": "#FFFFFF",
        "name": "أبيض",
        "nameEn": "White",
        "hexCode": "#FFFFFF",
        "rgbCode": "rgb(255, 255, 255)",
        "isAvailable": true,
        "createdAt": "2024-01-01T08:00:00Z"
      },
      {
        "id": 4,
        "color": "#800080",
        "name": "بنفسجي",
        "nameEn": "Purple",
        "hexCode": "#800080",
        "rgbCode": "rgb(128, 0, 128)",
        "isAvailable": true,
        "createdAt": "2024-01-01T08:00:00Z"
      },
      {
        "id": 5,
        "color": "#0000FF",
        "name": "أزرق",
        "nameEn": "Blue",
        "hexCode": "#0000FF",
        "rgbCode": "rgb(0, 0, 255)",
        "isAvailable": true,
        "createdAt": "2024-01-01T08:00:00Z"
      },
      {
        "id": 6,
        "color": "#FF00FF",
        "name": "أرجواني",
        "nameEn": "Magenta",
        "hexCode": "#FF00FF",
        "rgbCode": "rgb(255, 0, 255)",
        "isAvailable": true,
        "createdAt": "2024-01-01T08:00:00Z"
      },
      {
        "id": 7,
        "color": "#FFD700",
        "name": "ذهبي",
        "nameEn": "Gold",
        "hexCode": "#FFD700",
        "rgbCode": "rgb(255, 215, 0)",
        "isAvailable": true,
        "createdAt": "2024-01-01T08:00:00Z"
      },
      {
        "id": 8,
        "color": "#FFA500",
        "name": "برتقالي",
        "nameEn": "Orange",
        "hexCode": "#FFA500",
        "rgbCode": "rgb(255, 165, 0)",
        "isAvailable": true,
        "createdAt": "2024-01-01T08:00:00Z"
      }
    ]
  }
}
```

**كيفية ربط الألوان مع الزهور:**

1. عند الحصول على زهرة من `/api/flowers` أو `/api/flowers/{id}`، ستحصل على `availableColors: [1, 7, 8]`
2. هذه الأرقام هي IDs للألوان في endpoint `/api/colors`
3. للعثور على تفاصيل هذه الألوان:
   - يمكنك استدعاء `/api/colors` للحصول على جميع الألوان ثم فلترة حسب IDs
   - أو يمكنك استخدام `/api/flowers/{id}` الذي يعيد `colors` كاملة (objects) بدلاً من IDs

**مثال على الاستخدام في Frontend:**

```typescript
// 1. الحصول على جميع الزهور
const flowersResponse = await apiClient("/flowers");
const flowers = flowersResponse.data.flowers;

// 2. الحصول على جميع الألوان
const colorsResponse = await apiClient("/colors");
const allColors = colorsResponse.data.colors;

// 3. ربط الألوان مع كل زهرة
const flowersWithColors = flowers.map((flower) => {
  const availableColorObjects = flower.availableColors
    .map((colorId) => allColors.find((color) => color.id === colorId))
    .filter(Boolean); // إزالة undefined

  return {
    ...flower,
    colors: availableColorObjects,
  };
});
```

---

### 11.2 الحصول على لون محدد (Get Color by ID)

**Endpoint:** `GET /api/colors/{id}`

**Example:** `GET /api/colors/1`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "color": {
      "id": 1,
      "color": "#FF0000",
      "name": "أحمر",
      "nameEn": "Red",
      "hexCode": "#FF0000",
      "rgbCode": "rgb(255, 0, 0)",
      "isAvailable": true,
      "flowers": [
        {
          "id": 1,
          "name": "ورد جوري",
          "price": 25.0
        },
        {
          "id": 2,
          "name": "توليب",
          "price": 30.0
        }
      ],
      "createdAt": "2024-01-01T08:00:00Z"
    }
  }
}
```

---

## 12. 🎨 Custom Bouquets APIs

**ملاحظة مهمة:** جميع بيانات الباقات المخصصة تأتي من API. هذا يشمل:

- **أنواع الزهور**: تأتي من `/api/flowers` (انظر القسم 10)
- **الألوان المتوفرة لكل نوع**: موجودة في `availableColors` في كل زهرة، ويمكن الحصول على تفاصيلها من `/api/colors` (انظر القسم 11)
- **الأحجام والأنماط والمزهرية**: تأتي من `/api/custom-bouquets/config`
- **المناسبات وأوقات التوصيل**: تأتي من `/api/custom-bouquets/config`

### 12.1 الحصول على إعدادات الباقات المخصصة (Get Custom Bouquet Config)

**Endpoint:** `GET /api/custom-bouquets/config`

**ملاحظة مهمة:** هذا الـ endpoint يعيد جميع البيانات اللازمة لصفحة الباقات المخصصة. **لكن يُنصح باستخدام endpoints منفصلة للحصول على بيانات محدثة:**

- استخدم `/api/flowers` للحصول على أحدث أنواع الزهور وأسعارها (بدلاً من `flowers` في config)
- استخدم `/api/colors` للحصول على أحدث الألوان المتاحة (بدلاً من `colors` في config)
- هذا الـ endpoint مفيد للحصول على الأحجام والأنماط والمزهرية والمناسبات وأوقات التوصيل

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "flowers": [
      {
        "id": 1,
        "name": "ورد جوري",
        "price": 25.0,
        "image": "https://api.worood-shams.com/storage/flowers/rose.jpg",
        "availableColors": [1, 7, 8]
      },
      {
        "id": 2,
        "name": "توليب",
        "price": 30.0,
        "image": "https://api.worood-shams.com/storage/flowers/tulip.jpg",
        "availableColors": [1, 2, 3, 7, 8]
      },
      {
        "id": 3,
        "name": "زنبق",
        "price": 35.0,
        "image": "https://api.worood-shams.com/storage/flowers/lily.jpg",
        "availableColors": [3, 7, 8]
      }
    ],
    "sizes": [
      {
        "key": "small",
        "label": "صغيرة",
        "price": 0,
        "stems": "15-20 وردة",
        "icon": "S"
      },
      {
        "key": "medium",
        "label": "متوسطة",
        "price": 50.0,
        "stems": "25-30 وردة",
        "icon": "M"
      },
      {
        "key": "large",
        "label": "كبيرة",
        "price": 100.0,
        "stems": "35-40 وردة",
        "icon": "L"
      }
    ],
    "styles": [
      {
        "key": "classic",
        "label": "كلاسيكي",
        "price": 0,
        "image": "https://api.worood-shams.com/storage/styles/classic.jpg"
      },
      {
        "key": "modern",
        "label": "عصري",
        "price": 20.0,
        "image": "https://api.worood-shams.com/storage/styles/modern.jpg"
      },
      {
        "key": "romantic",
        "label": "رومانسي",
        "price": 15.0,
        "image": "https://api.worood-shams.com/storage/styles/romantic.jpg"
      }
    ],
    "colors": [
      {
        "id": 1,
        "color": "#FF0000",
        "name": "أحمر"
      },
      {
        "id": 2,
        "color": "#FFC0CB",
        "name": "وردي"
      },
      {
        "id": 3,
        "color": "#FFFFFF",
        "name": "أبيض"
      },
      {
        "id": 7,
        "color": "#FFD700",
        "name": "ذهبي"
      },
      {
        "id": 8,
        "color": "#FFA500",
        "name": "برتقالي"
      }
    ],
    "vases": [
      {
        "id": 1,
        "name": "مزهرية زجاجية",
        "price": 30.0,
        "image": "https://api.worood-shams.com/storage/vases/vase-1.jpg"
      },
      {
        "id": 2,
        "name": "مزهرية خزفية",
        "price": 45.0,
        "image": "https://api.worood-shams.com/storage/vases/vase-2.jpg"
      }
    ],
    "occasions": [
      {
        "id": 1,
        "name": "عيد ميلاد",
        "message": "كل عام وأنت بخير"
      },
      {
        "id": 2,
        "name": "زواج",
        "message": "مبروك عقد القران"
      },
      {
        "id": 3,
        "name": "خطوبة",
        "message": "مبروك الخطوبة"
      }
    ],
    "deliveryTimes": [
      {
        "id": 1,
        "label": "9:00 صباحاً",
        "value": "09:00"
      },
      {
        "id": 2,
        "label": "12:00 ظهراً",
        "value": "12:00"
      },
      {
        "id": 3,
        "label": "6:00 مساءً",
        "value": "18:00"
      }
    ],
    "paymentMethods": [
      {
        "key": "mada",
        "label": "مدى",
        "icon": "https://api.worood-shams.com/storage/payment/mada.svg"
      },
      {
        "key": "visa",
        "label": "فيزا",
        "icon": "https://api.worood-shams.com/storage/payment/visa.svg"
      },
      {
        "key": "apple",
        "label": "Apple Pay",
        "icon": "https://api.worood-shams.com/storage/payment/applePay.svg"
      },
      {
        "key": "cod",
        "label": "الدفع عند الاستلام",
        "icon": null
      }
    ],
    "config": {
      "vatRate": 0.15,
      "cardPrice": 15.0
    }
  }
}
```

---

### 12.2 حفظ باقة مخصصة (Save Custom Bouquet)

**Endpoint:** `POST /api/custom-bouquets`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "flowers": [
    {
      "id": 1,
      "quantity": 10
    },
    {
      "id": 2,
      "quantity": 5
    }
  ],
  "colors": ["#FF0000", "#FFC0CB"],
  "size": {
    "key": "medium",
    "label": "متوسطة",
    "price": 50.0
  },
  "style": {
    "key": "classic",
    "label": "كلاسيكي",
    "price": 0
  },
  "packaging": {
    "type": "vase",
    "vase": {
      "id": 1,
      "name": "مزهرية زجاجية",
      "price": 30.0
    }
  },
  "occasion": {
    "name": "عيد ميلاد",
    "icon": "Gift"
  },
  "cardMessage": "كل عام وأنت بخير",
  "includeCard": true,
  "cardPrice": 15.0,
  "notes": "يرجى التسليم في الصباح",
  "deliveryInfo": {
    "date": "2024-12-26",
    "time": "18:00",
    "timeLabel": "6:00 مساءً",
    "address": {
      "city": "الرياض",
      "district": "حي النخيل",
      "street": "شارع الملك فهد",
      "landmark": "مبنى رقم 123"
    },
    "phone": "0501234567",
    "paymentMethod": "mada",
    "paymentMethodLabel": "مدى"
  }
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "تم حفظ الباقة المخصصة بنجاح",
  "data": {
    "customBouquet": {
      "id": 5,
      "flowers": [
        {
          "flower": {
            "id": 1,
            "name": "ورد جوري",
            "price": 25.0,
            "image": "https://api.worood-shams.com/storage/flowers/rose.jpg"
          },
          "quantity": 10
        },
        {
          "flower": {
            "id": 2,
            "name": "توليب",
            "price": 30.0,
            "image": "https://api.worood-shams.com/storage/flowers/tulip.jpg"
          },
          "quantity": 5
        }
      ],
      "colors": ["#FF0000", "#FFC0CB"],
      "size": "medium",
      "style": "classic",
      "occasion": "عيد ميلاد",
      "cardMessage": "كل عام وأنت بخير",
      "notes": "يرجى التسليم في الصباح",
      "total": 450.0,
      "image": "https://api.worood-shams.com/storage/custom/custom-5.jpg",
      "createdAt": "2024-12-25T10:30:00Z"
    }
  }
}
```

---

### 12.3 الحصول على باقة مخصصة محددة (Get Custom Bouquet by ID)

**Endpoint:** `GET /api/custom-bouquets/{id}`

**Request Headers:**

```json
{
  "Authorization": "Bearer {token}",
  "Accept": "application/json"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "customBouquet": {
      "id": 5,
      "flowers": [
        {
          "flower": {
            "id": 1,
            "name": "ورد جوري",
            "price": 25.0,
            "image": "https://api.worood-shams.com/storage/flowers/rose.jpg",
            "availableColors": [1, 7, 8]
          },
          "quantity": 10
        },
        {
          "flower": {
            "id": 2,
            "name": "توليب",
            "price": 30.0,
            "image": "https://api.worood-shams.com/storage/flowers/tulip.jpg",
            "availableColors": [1, 2, 3, 7, 8]
          },
          "quantity": 5
        }
      ],
      "colors": ["#FF0000", "#FFC0CB"],
      "size": "medium",
      "style": "classic",
      "packaging": {
        "type": "vase",
        "vase": {
          "id": 1,
          "name": "مزهرية زجاجية",
          "price": 30.0,
          "image": "https://api.worood-shams.com/storage/vases/vase-1.jpg"
        }
      },
      "occasion": {
        "name": "عيد ميلاد",
        "icon": "Gift",
        "message": "كل عام وأنت بخير"
      },
      "cardMessage": "كل عام وأنت بخير",
      "includeCard": true,
      "cardPrice": 15.0,
      "notes": "يرجى التسليم في الصباح",
      "flowersCount": 15,
      "basePrice": 400.0,
      "totalPrice": 450.0,
      "image": "https://api.worood-shams.com/storage/custom/custom-5.jpg",
      "createdAt": "2024-12-25T10:30:00Z",
      "updatedAt": "2024-12-25T10:30:00Z"
    }
  }
}
```

---

**كيفية ربط availableColors مع قائمة الألوان - شرح مفصل:**

عند العمل مع الباقات المخصصة، تحتاج إلى ربط الألوان المتوفرة لكل زهرة مع قائمة الألوان الكاملة. إليك شرح مفصل:

**1. فهم البنية:**

- كل زهرة في `/api/flowers` تحتوي على `availableColors: [1, 7, 8]`
- هذه الأرقام هي IDs للألوان في `/api/colors`
- كل لون في `/api/colors` له `id` و `color` (hex code) و `name`

**2. مثال عملي شامل:**

```typescript
// ملف: src/hooks/useCustomBouquetData.ts

interface Flower {
  id: number;
  name: string;
  price: number;
  image: string;
  availableColors: number[]; // IDs للألوان المتوفرة
}

interface Color {
  id: number;
  color: string; // hex code مثل "#FF0000"
  name: string;
}

// دالة لربط الزهور مع الألوان
async function loadCustomBouquetData() {
  // 1. الحصول على جميع الزهور من API
  const flowersResponse = await apiClient('/flowers');
  const flowers: Flower[] = flowersResponse.data.flowers;

  // 2. الحصول على جميع الألوان من API
  const colorsResponse = await apiClient('/colors');
  const allColors: Color[] = colorsResponse.data.colors;

  // 3. ربط الألوان مع كل زهرة
  const flowersWithColors = flowers.map(flower => {
    // العثور على الألوان المتوفرة لهذه الزهرة
    const availableColorObjects = flower.availableColors
      .map(colorId => allColors.find(color => color.id === colorId))
      .filter(Boolean) as Color[]; // إزالة undefined

    return {
      ...flower,
      // إضافة الألوان كاملة (objects) إلى الزهرة
      colors: availableColorObjects
    };
  });

  return flowersWithColors;
}

// مثال على الاستخدام في مكون React
function FlowerSelector() {
  const [flowers, setFlowers] = useState([]);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);

  useEffect(() => {
    loadCustomBouquetData().then(data => {
      setFlowers(data);
    });
  }, []);

  const handleFlowerSelect = (flower) => {
    setSelectedFlower(flower);
    // الألوان المتوفرة لهذه الزهرة
    setAvailableColors(flower.colors);
  };

  return (
    <div>
      {/* اختيار الزهرة */}
      {flowers.map(flower => (
        <button key={flower.id} onClick={() => handleFlowerSelect(flower)}>
          {flower.name}
        </button>
      ))}

      {/* عرض الألوان المتوفرة للزهرة المختارة */}
      {selectedFlower && (
        <div>
          <h3>اختر لون {selectedFlower.name}:</h3>
          {availableColors.map(color => (
            <div
              key={color.id}
              style={{ backgroundColor: color.color }}
            >
              {color.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

**3. مثال على التحقق من صحة اختيار اللون:**

```typescript
// دالة للتحقق من أن اللون المختار متوفر للزهرة المختارة
function isColorAvailableForFlower(flowerId: number, colorId: number, flowers: Flower[]): boolean {
  const flower = flowers.find((f) => f.id === flowerId);
  if (!flower) return false;

  return flower.availableColors.includes(colorId);
}

// استخدام
const flowerId = 1; // ورد جوري
const colorId = 1; // أحمر

if (isColorAvailableForFlower(flowerId, colorId, flowers)) {
  console.log("اللون متوفر لهذه الزهرة");
} else {
  console.log("اللون غير متوفر لهذه الزهرة");
}
```

**4. مثال على حساب السعر بناءً على الزهور والألوان المختارة:**

```typescript
interface SelectedFlower {
  flowerId: number;
  colorId: number;
  quantity: number;
}

function calculateCustomBouquetPrice(
  selectedFlowers: SelectedFlower[],
  flowers: Flower[],
  sizes: any[],
  selectedSize: string
): number {
  let totalPrice = 0;

  // حساب سعر الزهور
  selectedFlowers.forEach((selected) => {
    const flower = flowers.find((f) => f.id === selected.flowerId);
    if (flower && isColorAvailableForFlower(selected.flowerId, selected.colorId, flowers)) {
      totalPrice += flower.price * selected.quantity;
    }
  });

  // إضافة سعر الحجم
  const size = sizes.find((s) => s.key === selectedSize);
  if (size) {
    totalPrice += size.price;
  }

  return totalPrice;
}
```

**5. ملاحظات مهمة للمطورين:**

- ✅ **استخدم `/api/flowers` للحصول على أحدث أنواع الزهور** - الأسعار والكميات تتغير
- ✅ **استخدم `/api/colors` للحصول على أحدث الألوان** - قد يتم إضافة ألوان جديدة
- ✅ **تحقق دائماً من `availableColors` قبل السماح باختيار لون** - ليس كل لون متوفر لكل زهرة
- ✅ **احفظ `colorId` (وليس `color` hex code) في قاعدة البيانات** - IDs أكثر ثباتاً
- ✅ **استخدم `availableColors` من API مباشرة** - لا تعتمد على بيانات ثابتة في Frontend

**ملاحظة إضافية:** عند استخدام `/api/custom-bouquets/config`، يمكنك أيضاً استخدام endpoints منفصلة للحصول على بيانات محدثة:

- استخدم `/api/flowers` للحصول على أحدث أنواع الزهور وأسعارها
- استخدم `/api/colors` للحصول على أحدث الألوان المتاحة
- استخدم `/api/custom-bouquets/config` للحصول على الأحجام والأنماط والمزهرية والمناسبات

---

## 13. 📧 Contact APIs

### 13.1 إرسال نموذج التواصل (Submit Contact Form)

**Endpoint:** `POST /api/contact`

**Request Headers:**

```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

**Request Body:**

```json
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "0501234567",
  "subject": "استفسار عام",
  "message": "أريد الاستفسار عن باقات الزفاف المتاحة"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً"
}
```

**Response (Validation Error - 422):**

```json
{
  "success": false,
  "message": "خطأ في التحقق من البيانات",
  "errors": {
    "name": ["حقل الاسم مطلوب"],
    "email": ["البريد الإلكتروني غير صحيح"],
    "phone": ["رقم الهاتف غير صحيح"],
    "subject": ["حقل الموضوع مطلوب"],
    "message": ["حقل الرسالة مطلوب"]
  }
}
```

---

## 📚 ملاحظات مهمة للربط بين Backend و Frontend

### 1. كيفية استخدام الـ API في Frontend

#### أ. إعداد Base URL

في ملف `src/lib/api/api.ts` أو ملف مشابه، قم بإعداد Base URL:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
```

#### ب. إعداد Axios أو Fetch

**مثال باستخدام Fetch:**

```typescript
// src/lib/api/client.ts
const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("auth_token");

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "حدث خطأ");
  }

  return response.json();
};
```

#### ج. مثال على استخدام API في Hook

```typescript
// src/hooks/useProducts.ts
import { apiClient } from "@/src/lib/api/client";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await apiClient("/products");
        if (response.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading };
}
```

### 2. معالجة الأخطاء

جميع الـ endpoints تعيد هيكل موحد للأخطاء:

```typescript
interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
```

**مثال على معالجة الأخطاء:**

```typescript
try {
  const response = await apiClient("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });

  if (response.success) {
    // نجحت العملية
    showNotification(response.message, "success");
  }
} catch (error) {
  // معالجة الخطأ
  if (error.response?.data?.errors) {
    // أخطاء التحقق
    const errors = error.response.data.errors;
    Object.keys(errors).forEach((key) => {
      showNotification(errors[key][0], "error");
    });
  } else {
    // خطأ عام
    showNotification(error.message || "حدث خطأ", "error");
  }
}
```

### 3. إدارة الحالة (State Management)

يمكنك استخدام Context API أو Zustand أو Redux لإدارة حالة المستخدم والبيانات:

```typescript
// src/contexts/AuthContext.tsx
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const response = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success) {
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem('auth_token', response.data.token);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 4. Pagination

جميع الـ endpoints التي تعيد قوائم تدعم Pagination:

```typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    perPage: number;
    total: number;
    lastPage: number;
    from: number;
    to: number;
  };
}
```

**مثال على استخدام Pagination:**

```typescript
const [page, setPage] = useState(1);
const [products, setProducts] = useState([]);
const [pagination, setPagination] = useState(null);

const fetchProducts = async (pageNum: number) => {
  const response = await apiClient(`/products?page=${pageNum}&perPage=20`);
  if (response.success) {
    setProducts(response.data.products);
    setPagination(response.data.pagination);
  }
};
```

### 5. File Uploads

لرفع الملفات (مثل صورة الملف الشخصي):

```typescript
const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
};
```

### 6. Real-time Updates

للتحديثات الفورية (مثل تحديث حالة الطلب)، يمكنك استخدام WebSockets أو Polling:

```typescript
// Polling example
useEffect(() => {
  const interval = setInterval(async () => {
    const response = await apiClient(`/orders/${orderId}`);
    if (response.success && response.data.order.status !== currentStatus) {
      // تحديث الحالة
      setCurrentStatus(response.data.order.status);
    }
  }, 5000); // كل 5 ثواني

  return () => clearInterval(interval);
}, [orderId]);
```

### 7. Environment Variables

في ملف `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🔗 روابط مهمة

- **Laravel Documentation**: https://laravel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **TypeScript Documentation**: https://www.typescriptlang.org/docs

---

## 📝 ملاحظات إضافية

1. **Security**: تأكد من استخدام HTTPS في الإنتاج
2. **Rate Limiting**: Laravel يدعم Rate Limiting تلقائياً
3. **CORS**: تأكد من إعداد CORS في Laravel للسماح بالطلبات من Frontend
4. **Validation**: جميع البيانات يجب أن يتم التحقق منها في Backend قبل المعالجة
5. **Sanitization**: تأكد من تنظيف جميع البيانات المدخلة من المستخدم

---

**آخر تحديث:** 25 ديسمبر 2024

**الإصدار:** 1.0.0

---

_تم إنشاء هذا التوثيق لمساعدة فريق التطوير في ربط Frontend (Next.js) مع Backend (Laravel) بشكل صحيح وفعال._
