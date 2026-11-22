# Hướng Dẫn Kích Hoạt Cloud $0 Trong 2–3 Phút (Tắt Máy Tính AI Vẫn Chạy 20h/Ngày)

Hệ thống chạy **100% miễn phí ($0)** bằng **GitHub Actions (chạy tự động 00:00–19:59 VN, tự khóa 20:00–24:00 VN)** + **Gemini API Free Tier** + **GitHub Pages (xem Dashboard trên điện thoại/máy khác bất cứ lúc nào)**.

---

## Bước 1 — Lấy Gemini API Key Miễn Phí $0 (45 giây)
1. Mở https://aistudio.google.com/apikey bằng tài khoản Google (`anh.origin@gmail.com`).
2. Bấm **Create API key** → Copy chuỗi key (không cần gắn thẻ tín dụng — Free Tier hoàn toàn miễn phí).

## Bước 2 — Tạo Repo GitHub & Tải Thư Mục Này Lên (1 phút)
> *Lưu ý $0:* Chọn repo **Public** để được **MIỄN PHÍ KHÔNG GIỚI HẠN** cả GitHub Actions lẫn GitHub Pages (không lưu mật khẩu hay email khách riêng tư trong repo; `GEMINI_API_KEY` được mã hóa an toàn trong GitHub Secrets).

1. Vào https://github.com/new (tài khoản `duconghoanganhit`) → Đặt tên `ai-ops-global-week1` → Chọn **Public** → Bấm **Create repository**.
2. Bấm **uploading an existing file** → Kéo thả toàn bộ các file & thư mục bên trong `ai-ops-global-week1/` (bao gồm cả thư mục `.github/`, `scripts/`, `outputs/`, `state.json`, `state.js`, `dashboard.html`, `index.html`) → Bấm **Commit changes**.

## Bước 3 — Gắn API Key & Bật Dashboard Online (1 phút)
1. Trong repo vừa tạo → vào **Settings → Secrets and variables → Actions → New repository secret**:
   - Name: `GEMINI_API_KEY`
   - Secret: dán key vừa lấy ở Bước 1 → **Add secret**.
2. Vào **Settings → Pages → Build and deployment → Source** → chọn **GitHub Actions**.
3. Vào tab **Actions** → chọn **AI Ops Global 20h Runner ($0 Cloud)** → bấm **Run workflow** để kiểm tra ngay!

**Xong!** Từ lúc này:
- Kể cả khi bạn **tắt máy tính**, mỗi 30 phút trong khung `00:00–19:59` GMT+7, Cloud tự chạy task tiếp theo trong `cloudQueue`, xuất sản phẩm thật vào `outputs/`, cập nhật `state.json` & đẩy lên Dashboard online tại:
  `https://duconghoanganhit.github.io/ai-ops-global-week1/`
- Đúng `20:00–24:00` GMT+7 mỗi ngày, workflow **tự nghỉ hoàn toàn** (0 chạy, 0 tốn token).
- Khi bạn mở máy dùng Antigravity, chỉ cần sync `state.json` là nối tiếp mượt mà 100%!
