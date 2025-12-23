"use server";

import { TIMEOUTS } from "@/constants";
import { logger } from "@/lib/logger";

/**
 * Server Actions للتحقق من رقم الهاتف
 * يمكن استدعاؤها مباشرة من Client Components
 */

interface VerificationResult {
  success: boolean;
  error?: string;
}

/**
 * إرسال رمز التحقق إلى رقم الهاتف
 * @param phone رقم الهاتف
 */
export async function sendVerificationCode(phone: string): Promise<VerificationResult> {
  try {
    // التحقق من صحة رقم الهاتف
    if (!phone || phone.length < 10) {
      return {
        success: false,
        error: "رقم الهاتف غير صالح",
      };
    }

    // TODO: ربط مع خدمة إرسال الرسائل النصية (SMS)
    // مثل: Twilio, SNS, أو خدمة محلية
    // Example:
    // const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    // await smsService.send(phone, `رمز التحقق الخاص بك: ${verificationCode}`);
    // await db.saveVerificationCode(phone, verificationCode, expiresAt);

    logger.debug(`[Server Action] إرسال رمز التحقق إلى: ${phone}`);

    // محاكاة delay للشبكة
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.VERIFICATION_CODE_SEND_DELAY));

    return {
      success: true,
    };
  } catch (error) {
    logger.error("خطأ في إرسال رمز التحقق", error);
    return {
      success: false,
      error: "فشل إرسال رمز التحقق. يرجى المحاولة مرة أخرى.",
    };
  }
}

/**
 * التحقق من رمز التحقق المدخل
 * @param phone رقم الهاتف
 * @param code رمز التحقق (4 أرقام)
 */
export async function verifyPhoneCode(phone: string, code: string): Promise<VerificationResult> {
  try {
    // التحقق من المدخلات
    if (!phone || !code || !/^\d{4}$/.test(code)) {
      return {
        success: false,
        error: "بيانات غير صالحة",
      };
    }

    // TODO: ربط مع قاعدة البيانات للتحقق من الكود
    // Example:
    // const storedCode = await db.getVerificationCode(phone);
    // if (!storedCode) {
    //   return { success: false, error: "انتهت صلاحية الرمز" };
    // }
    // if (storedCode.code !== code) {
    //   return { success: false, error: "رمز التحقق غير صحيح" };
    // }
    // await db.markPhoneAsVerified(phone);
    // await db.deleteVerificationCode(phone);

    logger.debug(`[Server Action] التحقق من الكود ${code} للهاتف: ${phone}`);

    // محاكاة delay للشبكة
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.VERIFICATION_CODE_VERIFY_DELAY));

    // في الوقت الحالي، نقبل أي كود من 4 أرقام
    return {
      success: true,
    };
  } catch (error) {
    logger.error("خطأ في التحقق من الكود", error);
    return {
      success: false,
      error: "فشل التحقق من الكود. يرجى المحاولة مرة أخرى.",
    };
  }
}

/**
 * التحقق من حالة التحقق لرقم الهاتف
 * @param phone رقم الهاتف
 */
export async function checkVerificationStatus(phone: string): Promise<boolean> {
  try {
    // TODO: ربط مع قاعدة البيانات
    // const isVerified = await db.isPhoneVerified(phone);
    // return isVerified;

    logger.debug(`[Server Action] التحقق من حالة الهاتف: ${phone}`);

    // في الوقت الحالي، نعتبر جميع الأرقام غير مُحققة
    return false;
  } catch (error) {
    logger.error("خطأ في التحقق من حالة الهاتف", error);
    return false;
  }
}
