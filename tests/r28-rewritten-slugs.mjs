// R27 pending-rewrite list (29 articles) and the R28c owner-approved slug renames (2026-11-20), shared by the Blog
// audits so historical phases keep their own contract after the articles were approved and renamed.
export const R27_PENDING = [
 "10-cong-dung-bat-ngo-cua-ba-ca-phe-trong-lam-dep-va-doi-song",
 "5-dau-hieu-nhan-biet-mot-don-vi-gia-cong-my-pham-uy-tin",
 "7-ly-do-ban-nen-lua-chon-gia-cong-my-pham-tron-goi-tai-bio-a-group",
 "an-gi-de-chong-lao-hoa-da",
 "ban-co-biet-da-minh-thuoc-loai-da-nao-khong",
 "bao-bi-tang-hieu-qua-ban-hang-khong-doanh-nghiep-kinh-doanh-my-pham-can-luu-y-gi",
 "boi-nghe-tuoi-truc-tiep-len-mat-co-that-su-hieu-qua",
 "cach-de-xit-body-mist-thom-lau",
 "cong-dung-cua-bo-hat-mo-trong-cham-soc-suc-khoe-da",
 "dia-chi-gia-cong-san-xuat-my-pham-uy-tin-chat-luong-tai-tphcm-1",
 "gia-cong-kem-body-tron-goi-tai-nha-may-bio-a-group",
 "gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau",
 "gia-cong-son-moi-tron-goi-doc-quyen-bio-a-group",
 "huong-dan-cach-dung-tinh-dau-tram-tra-tri-mun-va-cham-soc-toc",
 "kinh-nghiem-cho-nguoi-moi-gia-cong-my-pham",
 "mun-trung-ca-la-gi-nguyen-nhan-va-phuong-phap-dieu-tri-hieu-qua",
 "mun-viem-la-gi-cham-soc-da-co-mun-viem-nhu-the-nao",
 "nguyen-lieu-san-xuat-my-pham-thien-nhien",
 "nhung-cach-lam-gel-lot-mun-handmade-de-dang",
 "nuoc-hoa-o-to-la-gi-vi-sao-hien-nay-rat-duoc-ua-chuong",
 "san-pham-kem-chong-nang-bi-thu-hoi",
 "tips-lua-chon-chat-lieu-bao-bi-my-pham-phu-hop-bio-a-group",
 "tong-hop-15-cach-lam-sua-tam-trang-tai-nha-don-gian",
 "top-10-kem-tay-te-bao-chet-cho-da-kho-duoc-ua-chuong-nhat-hien-nay",
 "top-10-xuong-gia-cong-tai-ha-noi-uy-tin",
 "top-20-cong-ty-gia-cong-my-pham-tp-hcm-uy-tin",
 "top-20-cong-ty-gia-cong-my-pham-uy-tin-tai-tphcm",
 "vi-sao-can-kiem-nghiem-spf-kem-chong-nang-truoc-khi-dua-ra-thi-truong",
 "xu-huong-thi-truong-tay-te-bao-chet-2026-co-hoi-cho-thuong-hieu-my-pham-moi"
];
export const R28C_RENAMES = {
 "gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau": "gia-cong-kem-duong-vung-nhay-cam",
 "7-ly-do-ban-nen-lua-chon-gia-cong-my-pham-tron-goi-tai-bio-a-group": "gia-cong-my-pham-tron-goi-7-tieu-chi-danh-gia",
 "xu-huong-thi-truong-tay-te-bao-chet-2026-co-hoi-cho-thuong-hieu-my-pham-moi": "phat-trien-san-pham-tay-te-bao-chet-cho-thuong-hieu-moi",
 "tong-hop-15-cach-lam-sua-tam-trang-tai-nha-don-gian": "sua-tam-trang-tu-lam-tai-nha-rui-ro-can-biet",
 "huong-dan-cach-dung-tinh-dau-tram-tra-tri-mun-va-cham-soc-toc": "tinh-dau-tram-tra-cho-da-mun-va-da-dau",
 "top-20-cong-ty-gia-cong-my-pham-uy-tin-tai-tphcm": "kiem-chung-cong-ty-gia-cong-my-pham-tai-tphcm",
 "gia-cong-son-moi-tron-goi-doc-quyen-bio-a-group": "gia-cong-son-moi-tron-goi",
 "top-10-kem-tay-te-bao-chet-cho-da-kho-duoc-ua-chuong-nhat-hien-nay": "chon-kem-tay-te-bao-chet-cho-da-kho",
 "mun-trung-ca-la-gi-nguyen-nhan-va-phuong-phap-dieu-tri-hieu-qua": "mun-trung-ca-la-gi-nguyen-nhan-va-cham-soc-da",
 "top-20-cong-ty-gia-cong-my-pham-tp-hcm-uy-tin": "so-sanh-bao-gia-gia-cong-my-pham-tai-tphcm",
 "nhung-cach-lam-gel-lot-mun-handmade-de-dang": "gel-lot-mun-tu-lam-rui-ro-va-cach-an-toan",
 "10-cong-dung-bat-ngo-cua-ba-ca-phe-trong-lam-dep-va-doi-song": "ba-ca-phe-trong-lam-dep-va-doi-song",
 "top-10-xuong-gia-cong-tai-ha-noi-uy-tin": "thuong-hieu-ha-noi-chon-xuong-gia-cong-my-pham"
};
export const R28_REWRITTEN = R27_PENDING.map((s) => R28C_RENAMES[s] || s);
