/* ==========================================================
   إعدادات Subut Host — عدّل الأسعار والباقات من هنا فقط
   ========================================================== */
window.SUBUT = {
  discord: "https://discord.gg/crpASjyTfP",
  currency: "$",          // رمز العملة
  period: "/ شهر",

  // باقات ماينكرافت
  plans: [
    { id: "coal",      name: "Coal",      color: "#5b6b7d", ram: 2,  disk: 10,  players: 15,  price: 2  },
    { id: "iron",      name: "Iron",      color: "#c7d3df", ram: 4,  disk: 20,  players: 30,  price: 4  },
    { id: "gold",      name: "Gold",      color: "#ffd166", ram: 8,  disk: 40,  players: 60,  price: 8, featured: true },
    { id: "diamond",   name: "Diamond",   color: "#6fe8ff", ram: 16, disk: 80,  players: 120, price: 16 },
    { id: "netherite", name: "Netherite", color: "#8b7a90", ram: 32, disk: 160, players: 250, price: 32 }
  ],

  // الحاسبة (باقة مخصصة): السعر = الرام × 1$
  custom: { min: 1, max: 32, base: 0, perGB: 1, diskPerGB: 5 },

  // الألعاب — status: "on" متوفر | "soon" قريباً
  games: [
    { name: "Minecraft", glyph: "M", status: "on",   desc: "Java و Bedrock مع Paper و Purpur و Fabric و Forge وغيرها." },
    { name: "Rust",      glyph: "R", status: "soon", desc: "سيرفرات Vanilla و Modded بأداء عالي." },
    { name: "FiveM",     glyph: "F", status: "soon", desc: "سيرفرات رول بلاي مع دعم الريسورسات." },
    { name: "CS2",       glyph: "C", status: "soon", desc: "سيرفرات تنافسية وكاجوال بتيك ريت عالي." },
    { name: "Palworld",  glyph: "P", status: "soon", desc: "سيرفر مخصص لك ولأصحابك." },
    { name: "ARK",       glyph: "A", status: "soon", desc: "عوالم كبيرة تحتاج معالج قوي وتخزين سريع." }
  ]
};
