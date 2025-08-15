// lib/formatJalaliDate.ts

// Converts a number to Persian digits
function toPersianDigits(str: string | number): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.toString().replace(/\d/g, (d) => persianDigits[+d]);
}

// Month names in Persian
const persianMonths = [
  "فروردین", "اردیبهشت", "خرداد",
  "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر",
  "دی", "بهمن", "اسفند"
];

// Jalali conversion algorithm
function toJalali(gy: number, gm: number, gd: number): { jy: number; jm: number; jd: number } {
  const g_d_m = [0, 31, (gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gy2 = gy - 1600;
  let gm2 = gm - 1;
  let gd2 = gd - 1;

  let g_day_no = 365 * gy2 + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400);
  for (let i = 0; i < gm2; ++i) g_day_no += g_d_m[i];
  g_day_no += gd2;

  let j_day_no = g_day_no - 79;
  const j_np = Math.floor(j_day_no / 12053);
  j_day_no %= 12053;

  let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
  j_day_no %= 1461;

  if (j_day_no >= 366) {
    jy += Math.floor((j_day_no - 1) / 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  let jm = 0;
  for (; jm < 12 && j_day_no >= j_days_in_month[jm]; ++jm) {
    j_day_no -= j_days_in_month[jm];
  }

  const jd = j_day_no + 1;
  return { jy, jm: jm + 1, jd };
}

// Main formatter
export function formatJalaliDate(dateString: string, format: "short" | "long" = "short"): string {
  if (!dateString) return "نامشخص";

  const date = new Date(dateString);
  const { jy, jm, jd } = toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());

  const year = toPersianDigits(jy);
  const month = toPersianDigits(jm);
  const day = toPersianDigits(jd);

  if (format === "short") {
    return `${year}/${month.padStart(2, "۰")}/${day.padStart(2, "۰")}`;
  }

  const monthName = persianMonths[jm - 1];
  return `${day} ${monthName} ${year}`;
}
