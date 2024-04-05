import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

  // Seconds in 12 hours
  const twelveHoursInSeconds = 12 * 60 * 60;

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    // Less than an hour
    return `${Math.floor(diffInSeconds / 60)} min ago`;
  } else if (diffInSeconds < twelveHoursInSeconds) {
    // Less than 12 hours
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else {
    // Manually format the date to "YYYY-MM-DD HH:MM AM/PM"
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strHours = hours < 10 ? `0${hours}` : `${hours}`;
    const strMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${strHours}:${strMinutes} ${ampm}`;
  }
}

export function extractNameInitials(firstName: string, lastName: string) {
  if (!firstName && !lastName) return "U";
  return `${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`;
}

export function generateOrderSn() {
  const timestamp = Date.now(); // 获取当前时间戳
  const randomPart = Math.floor(Math.random() * 10000); // 生成一个随机数，增加唯一性
  return `${timestamp}${randomPart}`;
}
