import LoginForm from "@/components/sections/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "تسجيل الدخول",
  description: "تسجيل دخول مدراء مجلس مدينة حمص",
  // لا نضع openGraph لصفحة Login
  robots: {
    index: false,   // لا تظهر في Google
    follow: false,
  },
}

export default function LoginPage(){
  return <LoginForm/>
}