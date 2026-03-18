# Expense Tracker

## Giới thiệu

Expense Tracker là một ứng dụng web giúp người dùng quản lý thu chi cá nhân.
Người dùng có thể thêm, xoá và theo dõi các giao dịch (income/expense), đồng thời xem tổng quan tài chính theo thời gian.

<img width="1336" height="736" alt="image" src="https://github.com/user-attachments/assets/26a3806b-b310-4ed8-99e7-b06374e6231a" />

---

## Mục tiêu

* Làm quen với GitHub Copilot Agent Mode
* Áp dụng Spec Driven Development (SDD)
* Xây dựng một ứng dụng fullstack hoàn chỉnh
* Deploy sản phẩm lên môi trường thực tế

---

## Demo

[👉 https://your-app.vercel.app](https://expense-tracker-xpj7.vercel.app/)

---

## ✨ Tính năng chính

* Thêm giao dịch (income / expense)
* Xoá giao dịch
* Dashboard:

  * Tổng thu
  * Tổng chi
  * Số dư
* Lọc theo tháng
* Lọc theo category
* Export csv
* Validate dữ liệu với Zod
* UI responsive

---

## Công nghệ sử dụng

* Next.js 14 (App Router)
* TypeScript
* TailwindCSS
* Supabase (PostgreSQL)
* Zod

---

## Kiến trúc hệ thống

* Frontend + Backend: Next.js (Server Components + Server Actions)
* Database: Supabase
* Validation: Zod
* Styling: TailwindCSS

---

## Flow phát triển (SDD)

Spec → Copilot generate → chỉnh sửa → test → deploy

---

## Cấu trúc project

```
expense-tracker/
├── app/
├── components/
├── lib/
├── types/
```

---

## Cài đặt & chạy

### 1. Clone repo

```bash
git clone <your-repo-url>
cd expense-tracker
```

### 2. Cài dependencies

```bash
npm install
```

### 3. Tạo file `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### 4. Run project

```bash
npm run dev
```

---

## Database

Sử dụng Supabase PostgreSQL với bảng:

* transactions

  * id
  * amount
  * type
  * category
  * note
  * date

---

##  Screenshots
<img width="909" height="778" alt="image" src="https://github.com/user-attachments/assets/8d9fdd54-0b42-45d6-a3cf-5d0c70b57219" />


---

## MCP sử dụng

* Context7 (hỗ trợ tra cứu tài liệu trong quá trình phát triển)

---

## Kết quả đạt được

* Xây dựng thành công ứng dụng fullstack
* Áp dụng được SDD vào thực tế
* Sử dụng Copilot để tăng tốc phát triển
* Deploy thành công lên Vercel
