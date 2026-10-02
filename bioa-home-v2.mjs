const C={
  email:"contact@bioagroup.vn",
  phone:"0779 399 379",
  whatsapp:"https://wa.me/84779399379",
  zalo:"https://zalo.me/84779399379",
  facebook:"https://www.facebook.com/nhamaysanxuatduocmypham.BioA"
};
const lp=(p,lang)=>lang==="en"?(p==="/"?"/en/":"/en"+p):p;
const css=`
:root{--bioa:#116F47;--bioa-dark:#073D29;--bioa-deep:#052F21;--bioa-sage:#A8C8AE;--bioa-mint:#E7F0E8;--bioa-cream:#F3F0E4;--bioa-ivory:#FCFEF1}
.header{background:rgba(252,254,241,.84)!important;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 1px 0 rgba(5,47,33,.08)!important}
.header__logo{display:flex!important;align-items:center!important;justify-content:center!important;flex:0 0 82px!important;width:82px!important;overflow:visible!important}
.header__logo img{width:70px!important;max-width:70px!important;height:66px!important;max-height:66px!important;object-fit:contain!important;object-position:center!important}
.menu__logo img{width:82px!important;height:96px!important;object-fit:contain!important}
.footer-top__logo img,.footer__logo img{width:112px!important;max-width:112px!important;height:132px!important;object-fit:contain!important}
.whatsapp__logo{background:var(--bioa)!important;opacity:.075!important;-webkit-mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important;mask:url("/assets/bioa-monogram.svg") no-repeat center/contain!important}
.formats__logo{--formats-logo:url("/assets/bioa-monogram.svg")!important;opacity:.055!important}
.footer-top{background:var(--bioa-deep)!important}.footer-bottom{background:#03271B!important}
.footer-top__email a{color:var(--bioa-cream)!important;background:rgba(243,240,228,.10)!important;border:1px solid rgba(243,240,228,.13)!important}
.footer-top__nav li:first-child>a{font-weight:600!important;color:var(--bioa-cream)!important}
.footer-top__nav li:not(:first-child)>a{font-weight:400!important;color:rgba(243,240,228,.88)!important}
.footer-top__nav a:hover{color:#fff!important}
.footer-bottom,.footer-bottom a{color:rgba(243,240,228,.72)!important}
.footer-top__socials svg{width:21px!important;height:21px!important}
.bioa-chat{position:fixed;right:22px;bottom:22px;z-index:99995;font-family:inherit}
.bioa-chat__launcher{position:relative;width:72px;height:72px;border:0;border-radius:50%;background:var(--bioa-ivory);box-shadow:0 10px 34px rgba(5,47,33,.30);cursor:pointer;padding:8px}
.bioa-chat__launcher img{width:100%;height:100%;object-fit:contain}.bioa-chat__badge{position:absolute;top:-2px;right:-2px;min-width:24px;height:24px;padding:0 6px;border-radius:99px;background:#ff3b30;color:#fff;border:2px solid var(--bioa-ivory);font:700 12px/20px Arial}
.bioa-chat__panel{display:none;position:absolute;right:0;bottom:86px;width:370px;height:560px;border-radius:28px;background:#fff;box-shadow:0 18px 70px rgba(5,47,33,.28);overflow:hidden;border:1px solid rgba(17,111,71,.10)}
.bioa-chat.is-open .bioa-chat__panel{display:flex;flex-direction:column}
.bioa-chat__head{padding:22px 22px 18px;background:linear-gradient(180deg,#EDF5EE,#F8FAF5);text-align:center;border-bottom:1px solid rgba(17,111,71,.08)}
.bioa-chat__avatars{display:flex;justify-content:center;margin-bottom:8px}.bioa-chat__avatar{width:52px;height:52px;margin-left:-8px;border-radius:50%;background:#fff;border:2px solid #fff;box-shadow:0 2px 9px rgba(0,0,0,.08);display:flex;align-items:center;justify-content:center;overflow:hidden}.bioa-chat__avatar:first-child{margin-left:0}.bioa-chat__avatar img{width:82%;height:82%;object-fit:contain}.bioa-chat__avatar--text{background:var(--bioa-mint);color:var(--bioa-dark);font-size:11px;font-weight:700}
.bioa-chat__title{font-size:22px;font-weight:650;color:var(--bioa-deep)}.bioa-chat__status{font-size:14px;color:#6b756d;margin-top:3px}
.bioa-chat__quick{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px 18px;border-bottom:1px solid #edf0ed}.bioa-chat__quick button,.bioa-chat__quick a{height:48px;border:0;border-radius:14px;background:#F5F7F4;color:var(--bioa-deep);display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;font-weight:600;cursor:pointer}.bioa-chat__quick svg{width:20px;height:20px;fill:currentColor}
.bioa-chat__messages{flex:1;overflow:auto;padding:16px;background:#fff}.bioa-msg{display:flex;gap:9px;margin-bottom:12px;align-items:flex-end}.bioa-msg--user{justify-content:flex-end}.bioa-msg__avatar{width:30px;height:30px;border-radius:50%;background:var(--bioa-mint);padding:5px;flex:0 0 auto}.bioa-msg__avatar img{width:100%;height:100%;object-fit:contain}.bioa-msg__bubble{max-width:78%;padding:11px 13px;border-radius:16px;background:#F1F3F0;color:#303832;font-size:14px;line-height:1.4}.bioa-msg--user .bioa-msg__bubble{background:var(--bioa);color:#fff}
.bioa-chat__input{display:flex;gap:8px;padding:12px;border-top:1px solid #edf0ed;background:#fff}.bioa-chat__input input{flex:1;height:44px;border:1px solid #dce4dd;border-radius:999px;padding:0 16px;outline:none}.bioa-chat__input button{width:44px;height:44px;border:0;border-radius:50%;background:var(--bioa);color:#fff;cursor:pointer;font-size:18px}
.bioa-hub{padding-top:70px!important}.bioa-hub__intro{max-width:900px;margin-bottom:34px}.bioa-hub__intro h2{margin:0 0 12px;font-size:clamp(36px,4vw,64px);line-height:1.04;font-weight:400}.bioa-hub__intro p{max-width:760px;font-size:18px;line-height:1.55;color:#59645d}
.bioa-hub__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.bioa-hub__card{position:relative;min-height:270px;padding:34px;border-radius:38px;overflow:hidden;background:linear-gradient(135deg,#F8FAF5 0%,#E7F0E8 100%);border:1px solid rgba(17,111,71,.08);text-decoration:none;color:var(--bioa-deep)}.bioa-hub__card:nth-child(even){background:linear-gradient(135deg,#FCFEF1,#F3F0E4)}.bioa-hub__card:after{content:"";position:absolute;right:-44px;bottom:-54px;width:230px;height:280px;background:var(--bioa);opacity:.055;-webkit-mask:url("/assets/bioa-monogram.svg") center/contain no-repeat;mask:url("/assets/bioa-monogram.svg") center/contain no-repeat}.bioa-hub__kicker{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--bioa);margin-bottom:12px}.bioa-hub__card h3{position:relative;z-index:1;margin:0 0 12px;font-size:30px;font-weight:450}.bioa-hub__card p{position:relative;z-index:1;max-width:75%;margin:0;color:#59645d;line-height:1.5}.bioa-hub__services{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:50px}.bioa-hub__service{padding:28px;border-radius:28px;background:#fff;border:1px solid rgba(17,111,71,.08)}.bioa-hubW×ÜÙ\šXÙHŞÙ›Û\Ú^™NŒŒœÙ›Û]ÙZYÚLÛX\™Ú[ŒK˜š[ØKZX—×ÜÙ\šXÙHØÛÛÜˆÍÌÎÛX\™Ú[ŒMœÛ[™KZZYÚŒK_K˜š[ØKZX—×ÜÙ\šXÙH^ØÛÛÜ˜\ŠKXš[ØJNÙ›Û]ÙZYÚŒİ^YXÛÜ˜][Û››Û™_BYYXJX^]ÚYŒLŒ
^ËšXY\—×ÛÙÛŞÙ›^X˜\Ú\ÎÌœZ[\Ü[İÚYÌœZ[\Ü[KšXY\—×ÛÙÛÈ[YŞİÚYŒœZ[\Ü[ÚZYÚNZ[\Ü[_BYYXJX^]ÚYÍ
^Ë˜š[ØKXÚ]ÜšYÚŒLœØ›İÛNŒLœK˜š[ØKXÚ]×Ü[™[ÜÜÚ][Û™š^YÛYŒLœÜšYÚŒLœØ›İÛNLİÚY˜]]ÎÚZYÚ›Z[ŠNLØ[ÊLšHLM\
J_K˜š[ØKXÚ]×Û][˜Ú\İÚYŒœÚZYÚŒœK˜š[ØKZX—×ÙÜšY˜š[ØKZX—×ÜÙ\šXÙ\ŞÙÜšY][\]KXÛÛ[[œÎŒYœŸK˜š[ØKZX—×ØØ\™ÛZ[‹ZZYÚŒŒÌÜY[™ÎŒØ›Ü™\‹\˜Y]\ÎŒK˜š[ØKZX—×ØØ\™ÛX^]ÚY	__B˜Â˜ÛÛœİXÛÛ•Ú]Ø\IÏİ™ÈšY]Ğ›ŞHŒ]H“LMËÌˆMŒÎ˜ËKŒMËKŒMKLKÍNKËL‹ŒËKMËKŒÌËKŒNKKÌKKŒMKËŒMKKŒNMËŒMËKÍËM‹KMKŒMKŒMÌËŒNNKKŒÍËŒŒŒËKŒÍKKŒMËKŒMKLKŒMKKŒËL‹ŒÎKLKÍKKËKÎLKLKÍŒKLKLËL‹ŒNKKŒMÌËKŒMËKŒNKNŒLËKŒ‹ŒLÍKŒLÌËŒNKŒÍË‹KL‹ŒMKKŒMÍŒNNKŒNŒNKMËŒNKKŒNNŒKKŒÍÌKKŒKKL‹KŒÍKKŒMKKKLKŒL‹KLM‹L‹ŒŒËKŒ‹KMÎKKËKKKKKLKKŒMÌËKŒKŒÍÌKKŒKKMËKŒKKŒNNKL‹ŒÍKÎL‹ŒÍÌ‹KŒÌ‹ŒMËLKŒKŒM‹LKŒ‹ÎHKŒˆKŒH‹ÍHKŒŒLÈËŒÍŒMKŒNN‹ŒMˆËŒˆKŒÍÈËÌKŒÌˆKŒŒ‹HKMŒKÌL‹ŒŒÈKŒÍ‹ŒNMHKÌKŒLNMÌKKŒHKÍNKÌNH‹Œ‹LKLËŒKMŒLKŒKŒMÌËLKLËKŒÍKŒLKŒÌ‹KŒNNKMËKŒÍÛKMKŒHËÚKŒNKÈKÈKMKŒÌKLKŒÍÎKŒÍŒKKŒŒMLËÍKN‹NNLËKŒŒÍKKŒÍÍNKˆKˆKLKLKMKŒ˜ËŒKMKHÍ‹NKKNK‹KŒLŒˆKŒÈ‹N‹NNKHKHL‹LÈ‹NMËKŒÈKKMÍÈKNKHK‹ÏÜİ™Ï‰ÎÂ™[˜İ[Ûˆ™\XÙPœ˜[™\ÜÙ]Ê	
^Âˆ	
šXYŠK˜\[™
	Ïİ[HYH˜š[ØK]‰ÊØÜÜÊÉÏÜİ[O[šÈ™[HšXÛÛˆˆ™YH‹Ø\ÜÙ]ËØš[ØK[[Û›ÙÜ˜[Kœİ™È‰ÊNÂˆ	
œİ[HŠK™XXÚ

Ë[
OOÛ]ÏI
[
Kš[

_ˆÜÏ\Ëœ™\XÙJÚÎ—×ÛY\]ÛÛÙ˜ÛÛWÜXÛÛ[İ[Y\×ÛY\K]ÛÛÙØ\ÜÙ]×Ú[Y×ÛÙÛËX™×œİ™ËÙÚK‹Ø\ÜÙ]ËØš[ØK[[Û›ÙÜ˜[Kœİ™ÈŠNÉ
[
Kš[
Ê_JNÂˆ	
–Üİ[WHŠK™XXÚ

Ë[
OOÛ]I
[
K˜]Šœİ[HŠ_ˆÚYŠÛÙÛËX™×œİ™ßY\œ]ÛÛÙËÚK\İ
ÊJI
[
K˜]Šœİ[H‹Ëœ™\XÙJÚÎ—×ÛY\]ÛÛÙ˜ÛÛWİÜXÛÛ[İ[Y\×ÛY\K]ÛÛÙØ\ÜÙ]×Ú[Y×ÛÙÛËX™×œİ™ËÙÚK‹Ø\ÜÙ]ËØš[ØK[[Û›ÙÜ˜[Kœİ™ÈŠKœ™\XÙJÛY\œ]ÛÛÙÖ×‰×ŠWJ×œİ™ËÙÚK˜š[ØK[[Û›ÙÜ˜[Kœİ™ÈŠJ_JNÂˆ	
š[YÈŠK™XXÚ

Ë[
OOØÛÛœİI
[
KÜ˜Ï^˜]ŠœÜ˜ÈŠ_ˆ‹[^˜]Š˜[Š_ˆÚYŠÊÎ›Y\œ]ÛÛÙY\]ÛÛÙÙÛÊÎ—İÚ]JO×œİ™ÊKÚK\İ
Ü˜Ê_ÛY\]ÛÛÙÚK\İ
[
J^ØÛÛœİ\šÏ^˜ÛÜÙ\İ
‹™›Ûİ\‹]Ü™›Ûİ\ˆŠK›[™İŒŞ˜]ŠœÜ˜È‹\šÏÈ‹Ø\ÜÙ]ËØš[ØKY[[YÚœİ™Èˆ‹Ø\ÜÙ]ËØš[ØKY[œİ™ÈŠK˜]Š˜[‹’SËPHÜ›İ\ŠKœ™[[İ™P]ŠœÜ˜ÜÙ]ŠKœ™[[İ™P]ŠœÚ^™\ÈŠ__JNÂˆ	
‹šXY\—×ÛÙÛÈ[YË
Ë›Y[W×ÛÙÛÈ[YÈŠK˜]ŠœÜ˜È‹‹Ø\ÜÙ]ËØš[ØKY[œİ™ÈŠNÂˆ	
‹™›Ûİ\‹]Ü×ÛÙÛÈ[YË™›Ûİ\—×ÛÙÛÈ[YÈŠK˜]ŠœÜ˜È‹‹Ø\ÜÙ]ËØš[ØKY[[YÚœİ™ÈŠNÂˆ	
‹™›Ü›X]××ÛÙÛÈŠK˜]Šœİ[H‹‹KY›Ü›X]Ë[ÙÛÎˆ\›
	ËØ\ÜÙ]ËØš[ØK[[Û›ÙÜ˜[Kœİ™ÉÊNÈŠNÂŸB™[˜İ[Ûˆ›Ûİ\Š	[™Ê^ÂˆÛÛœİšO[[™ÏOOHšHÂˆÛÛœİÜ›İ\Ï]šOÖÂˆÈ‘ÚXHğí™ÈxnîH8nª[H‹ÖÈ‘ÚXHğí™È¸nã[ˆğìÚH‹‹ØÛÛ˜Xİ[X[Y˜Xİ\š[™ËXÛÜÛY]XÜËÈ—KÈğí™È8nêXÈğìÈøn­[ˆ‹‹İÚ]K[X™[XÛÜÛY]XÜËÈ—KÈğí™È8nêXÈ1$xnæXÈ]^xnà[ˆ‹‹Üš]˜]K[X™[XÛÜÛY]XÜËÈ—KÈ”ÜH	ˆÚ0èXÚğè™È‹