import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// دالة cn — تجمع clsx وtailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalizedText(
    ar:string,
    en:string,
    locale:string,
):string{
    return locale === 'ar' ? ar : en
}