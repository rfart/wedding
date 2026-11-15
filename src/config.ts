export const config = {
  couple: {
    initials: "R & S",
    groomNickname: "Radifan",
    brideNickname: "Syifa",
    groom: {
      fullName: "Radifan Aji Karami, S.Kom.",
      fatherName: "Dr(c). Slamet Aji Pamungkas, M.Eng.",
      motherName: "Martini",
      instagram: "https://www.instagram.com/radifanaji",
      photo: "/images/radifan.jpeg",
    },
    bride: {
      fullName: "Syifa Rahmatika, S.M.",
      fatherName: "Alm. Sarwo Utomo",
      motherName: "Rodiah",
      instagram: "https://www.instagram.com/syifarahmatika_",
      photo: "/images/syifa.jpeg",
    },
  },
  event: {
    dateLabel: "Minggu, 6 Desember 2026",
    dateISO: "2026-12-06T09:00:00",
    akad: {
      time: "09.00 WIB – selesai",
      label: "Akad Nikah",
    },
    resepsi: {
      time: "11.00 – 13.00 WIB",
      label: "Resepsi Pernikahan",
    },
    venue: {
      name: "Hotel Lemo Serpong",
      address: "Jl. Raya Legok Karawaci, Kelapa Dua, Tangerang 15810",
      mapsUrl: "https://maps.google.com/?q=Hotel+Lemo+Serpong,+Jl.+Raya+Legok+Karawaci,+Kelapa+Dua,+Tangerang+15810",
      calendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Radifan+%26+Syifa&dates=20261206T020000Z%2F20261206T060000Z&details=Akad+Nikah+pukul+09.00+WIB+%7C+Resepsi+11.00%E2%80%9313.00+WIB&location=Hotel+Lemo+Serpong,+Jl.+Raya+Legok+Karawaci,+Kelapa+Dua,+Tangerang+15810",
    },
  },
  heroPhoto: "/images/placeholder.jpg",
  loveStory: [
    {
      year: "2023",
      title: "Pertemuan Pertama",
      description:
        "Semua berawal di tahun 2023. Siapa sangka, perjumpaan yang sederhana justru menjadi titik balik yang mempertemukan langkah kami dalam satu cerita yang sama.",
      photo: "/images/love-story-1.jpeg",
    },
    {
      year: "2024",
      title: "Sefrekuensi",
      description:
        "Dari luar mungkin kita terlihat beda, tapi aslinya kita itu sefrekuensi dan sama-sama punya sisi konyol yang kadang bikin ketawa sendiri. Uniknya, kekonyolan itu justru nggak bikin ilfil, malah bikin hari-hari makin berwarna buat ngelewatin berbagai rintangan hidup.",
      photo: "/images/love-story-2.jpeg",
    },
    {
      year: "2025",
      title: "Tumbuh Bersama",
      description:
        "Dulu Syifa lidahnya lokak banget nggak suka makanan elit hahahah, contohnya spaghetti, matcha dan beberapa makanan lainnya. Tapi berkat Ifan yang selalu maksa buat cobain hal baru dan terus mengajak mencoba, siapa sangka sekarang matcha justru jadi minuman favorit Syifa 🥰 Begitu juga sebaliknya, banyak hal dalam hidup Ifan yang perlahan-lahan terbangun dan tertata berkat kehadiran serta dukungan Syifa 🫶🏻",
      photo: "/images/love-story-3.jpeg",
    },
    {
      year: "2026",
      title: "Menuju Pelaminan",
      description:
        "Melewati berbagai fase kehidupan bersama, dari jatuh bangunnya perjuangan hingga kebiasaan-kebiasaan kecil yang menyatukan, membuat kami yakin. Kini kami siap melangkah ke babak hidup yang baru, merangkai masa depan dan cerita-cerita konyol lainnya dalam ikatan pernikahan.",
      photo: "/images/love-story-4.jpeg",
    },
  ],
  gallery: [
    { src: "/images/gallery-1.jpg", alt: "Foto Pre-Wedding 1" },
    { src: "/images/gallery-2.jpg", alt: "Foto Pre-Wedding 2" },
    { src: "/images/gallery-3.jpg", alt: "Foto Pre-Wedding 3" },
    { src: "/images/gallery-4.jpg", alt: "Foto Pre-Wedding 4" },
    { src: "/images/gallery-5.jpg", alt: "Foto Pre-Wedding 5" },
    { src: "/images/gallery-6.jpg", alt: "Foto Pre-Wedding 6" },
  ],
  gift: {
    message:
      "Doa restu Anda merupakan karunia yang paling berarti bagi kami. Namun jika Anda ingin memberikan hadiah, Anda dapat mengirimkannya melalui:",
    accounts: [
      {
        type: "Bank",
        bankName: "BRI",
        accountNumber: "005101163523502",
        accountName: "RADIFAN AJI KARAMI",
      },
      {
        type: "Bank",
        bankName: "BCA",
        accountNumber: "7610762781",
        accountName: "SYIFA RAHMATIKA",
      },
    ],
  },
  rsvp: {
    googleFormsUrl: process.env.NEXT_PUBLIC_RSVP_FORM_URL ?? "",
    nameEntryId: process.env.NEXT_PUBLIC_RSVP_NAME_ENTRY_ID ?? "",
    attendanceEntryId: process.env.NEXT_PUBLIC_RSVP_ATTENDANCE_ENTRY_ID ?? "",
    messageEntryId: process.env.NEXT_PUBLIC_RSVP_MESSAGE_ENTRY_ID ?? "",
  },
  closing: {
    photo: "https://placehold.co/390x500/060707/B7A8A1?text=Radifan+%26+Syifa",
    message:
      "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.",
  },
};
