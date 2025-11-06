"use client";

import React, { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary Component
 * يلتقط الأخطاء في المكونات الفرعية ويعرض واجهة بديلة
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // تحديث الحالة لعرض واجهة fallback في التصيير التالي
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // يمكنك هنا إرسال الخطأ إلى خدمة مراقبة مثل Sentry
    // معالجة صامتة للأخطاء

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // يمكنك استخدام fallback مخصص إذا تم توفيره
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // الواجهة الافتراضية للأخطاء
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            {/* أيقونة الخطأ */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-6">
                <AlertTriangle className="w-16 h-16 text-red-600" />
              </div>
            </div>

            {/* العنوان */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">عذراً، حدث خطأ ما</h1>

            {/* الوصف */}
            <p className="text-gray-600 text-lg mb-8">
              واجهنا مشكلة غير متوقعة. لا تقلق، بياناتك آمنة ويمكنك المحاولة مرة أخرى.
            </p>

            {/* تفاصيل الخطأ في وضع التطوير فقط */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="bg-gray-50 rounded-lg p-4 mb-8 text-right">
                <p className="text-sm font-semibold text-red-600 mb-2">
                  تفاصيل الخطأ (ظاهرة في وضع التطوير فقط):
                </p>
                <p className="text-xs text-gray-700 font-mono break-all">
                  {this.state.error.message}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-4 text-right">
                    <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">
                      عرض Stack Trace
                    </summary>
                    <pre className="text-xs text-gray-600 mt-2 overflow-auto max-h-40 text-left">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* زر إعادة المحاولة */}
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#5A5E4D] text-white rounded-lg hover:bg-[#4A4E3D] transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                <RefreshCcw className="w-5 h-5" />
                إعادة المحاولة
              </button>

              {/* زر العودة للرئيسية */}
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold"
              >
                <Home className="w-5 h-5" />
                العودة للرئيسية
              </Link>
            </div>

            {/* معلومات إضافية */}
            <p className="text-sm text-gray-500 mt-8">
              إذا استمرت المشكلة، يرجى{" "}
              <Link href="/contact" className="text-[#5A5E4D] hover:underline font-semibold">
                التواصل معنا
              </Link>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
