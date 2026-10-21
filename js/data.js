/* ==========================================================
   DBFLIX - YOUR CONTENT LIVES HERE
   This is the only file you need to edit to add shows/videos.
   (Descriptions of each page's intro text are in js/app.js, CATS list.)

   HOW TO ADD SOMETHING
   Copy one { ... } block inside "items", paste it, and change it.

   category must be one of:
     "movies" | "series" | "music-videos" | "events" |
     "guestings" | "vlogs" | "behind-the-scenes" | "fanmade"

   Fields (all optional except id, title, category):
     id           unique, no spaces            e.g. "movie-3"
     title        name shown on the card
     category     see list above
     date         YYYY-MM-DD (newest shows first)
     year         e.g. 2026
     duration     e.g. "1h 45m"
     description  text shown in the pop-up and on the Home banner
     poster       tall image   (movies & series)  e.g. "images/posters/movie-3.jpg"
     banner       wide image   (everything else + Home banner) e.g. "images/banners/movie-3.jpg"
                  -> For YouTube videos you can leave poster/banner empty:
                     the YouTube thumbnail is used automatically.
     previewVideo path to a hosted video file (e.g. "images/previews/movie-3-trailer.mp4").
                  Plays in the movie/series preview. If youtube is also set, visitors can switch
                  between the uploaded preview and the embedded YouTube video.
     bannerVideo  path to a hosted wide video file. Plays muted, automatically and on loop
                  in the Home banner when this item is featured.
     youtube      a YouTube link OR the 11-character video ID.
                  The video plays inside the site AND has a
                  "Watch on YouTube" button (so views still count there).
     streamUrl    link to where it streams (Netflix, Prime Video, Max, Viu, iWantTFC, etc.).
     platform     name shown on the button, e.g. "Netflix"
     watchOptions optional list of { platform, url } objects for multiple streaming services.
     whereToWatch text for items NOT on streaming yet, e.g. "In cinemas Dec 25"
     details      extra info as pairs, e.g. { "Date": "Dec 25, 2026", "Venue": "SM Arena" }
     tags         e.g. ["comedy", "drama"]
     episodes     (series) [ { title: "Episode 1", youtube: "VIDEO_ID_OR_LINK" }, ... ]
     featured     true = shows in the big rotating banner on Home

   NOTE: the youtube ID below ("jNQXAC9IVRw") is just a SAMPLE video
   so you can see the player working. Replace it with your own.
   ========================================================== */

window.DBFLIX = {

  site: {
    name: "DBFLIX",
    tagline: "The fan-made home of everything we love.",
    logoImage: "",   // optional: e.g. "images/logo.png" (leave "" to use the text logo)
    footer: "DBFLIX is an unofficial, fan-made website made by fans, for fans. It is not affiliated with Netflix or with the people featured here. All videos, images and names belong to their respective owners."
  },

  about: {
    title: "About DBFLIX",
    image: "images/about.jpg",   // tall photo, optional
    text: [
      "Welcome to DBFLIX - a fan-made, streaming-style home for every movie, series, music video, event, interview, vlog and behind-the-scenes moment worth rewatching.",
      "Everything here is collected and shared out of love by fans. Replace this text with your own story: who runs the page, why it started, and how fans can join in."
    ],
    links: [
      { label: "YouTube",   url: "https://youtube.com" },
      { label: "Instagram", url: "https://instagram.com" },
      { label: "X / Twitter", url: "https://x.com" },
      { label: "Facebook",  url: "https://facebook.com" }
    ]
  },

  items: [

    /* ---------------- MOVIES ---------------- */
    {
      id: "movie-1", category: "movies", title: "Love You So Bad",
      date: "2025-12-25", year: 2025, duration: "1h 52m",
      poster: "images/posters/lysb.jpeg", banner: "images/banners/movie-1.jpg",
      description: "Sassy, confident, and unapologetically herself, college senior Savannah is determined to live life on her own terms. She finds herself torn between two different men: bad boy and chich magnet L.A. who fuels her wild side, and principled and ambitious Vic who challenges her to grow. As old wounds resurface and difficult choices confront her, she must devide who she really wants to be and who she dares to love.",
      streamUrl: "https://www.netflix.com/search?q=love%20you%20so%20bad&jbv=82735088", platform: "Netflix",
      tags: ["romantic comedy", "coming-of-age drama"], featured: true
    },
    {
      id: "movie-2", category: "movies", title: "Guilty Pleasure",
      date: "2024-10-16", year: 2024, duration: "1h 59",
      poster: "images/posters/guiltypleasure.jpeg", banner: "images/banners/movie-1.jpg",
      description: "Explores the complex relationships and personal struggles of three ambitious lawyers as they navigate their way through love, betrayal, and ambition.",
      streamUrl: "https://www.netflix.com/search?q=guilty%20pleasure&jbv=81997707", platform: "Netflix",
      tags: ["drama", "romance"], featured: true
    },

    /* ---------------- SERIES ---------------- */
    {
      id: "series-1", category: "series", title: "Teen Clash",
      date: "2023-03-17", year: 2023,
      poster: "images/posters/teenclash.jpeg", banner: "images/banners/teenclashprev.mp4,
      description: "An aspiring musician who is bent on joining her school's music jam in hopes of redeeming herself from a past embarrassment meets a charming songwriter who will help her overcome the struggles in her journey. Bianca De Vera as Yannie",
      episodes: [
        { title: "Episode 1", youtube: "https://www.youtube.com/watch?v=QaOsrFFQYe8" },
        { title: "FULL EPISODES", iWant: "https://www.iwanttfc.com/details/4610efa9-069d-42e5-a838-f12a1881414e" },
      ],
      tags: ["teen drama"], featured: true
    },
    {
      id: "series-2", category: "series", title: "The Secrets of Hotel 88",
      date: "2026-02-26", year: 2026,
      poster: "images/posters/h88.jpeg", banner: "images/banners/hotel88preview.mp4",
      description: "Two estranged families reunite when Hotel 88 reopens, but the former best friends who own it are found dead. Their children must share the inheritance while uncovering buried secrets and the truth about their fathers' deaths. Bianca De Vera as Jade Almazan and Dustin Yu as Edward Arellano",
      streamUrl: "https://www.iwanttfc.com/details/843dd7ea-8324-411f-9853-4e499544523e", platform: "iWant"
    },
    {
      id: "series-3", category: "series", title: "Mano Po Legacy: The Family Fortune",
      date: "2026-02-26", year: 2026,
      poster: "images/posters/manopo.jpeg", banner: "images/banners/series-2.jpg",
      description: "A young woman lands her dream job at a real estate empire - but her new boss's family is embroiled in a bitter feud for control of the company. Dustin Yu as Kenneth Chan",
      streamUrl: "https://www.netflix.com/search?q=mano%20po&jbv=83036429", platform: "Netflix"
    },
    {
      id: "series-4", category: "series", title: "Black Rider",
      date: "2023-11-06", year: 2025,
      poster: "images/posters/blackrider.jpeg", banner: "images/banners/blackriderprev.mp4",
      description: "A delivery driver becomes a vigilante on his motorcycle and faces a crime syndicate that threatens his city. Dustin Yu as Timothy Geronimo",
      streamUrl: "https://www.youtube.com/watch?v=CIQIE0H379E&list=PL41jCByLB53RYVya8vPeXvf2aIFs1gV7o", platform: "Youtube"
    },

    /* ---------------- MUSIC VIDEOS ---------------- */
    {
      id: "mv-1", category: "music-videos", title: "Ngiti",
      date: "2026-04-25", youtube: "https://www.youtube.com/watch?v=f4Q7PTQ56Ck&list=RDf4Q7PTQ56Ck&start_radio=1",
      description: "Sa kabila ng hirap at sakit, may pag-asang darating ang dahilan para ngumiti.",
      featured: true
    },
    {
      id: "mv-2", category: "music-videos", title: "Kinakabahan",
      date: "2025-09-11", youtube: "https://www.youtube.com/watch?v=j8mlMYOLlD8&list=RDj8mlMYOLlD8&start_radio=1",
      description: "Kapag lumalalim na ang nararamdaman, kaya mo bang panindigan? Feel REAL KILIG VIBES in KINAKABAHAN Official Music Video starring Bianca De Vera and Dustin Yu #DustBia in their first ever official project together."
    },

    /* ---------------- EVENTS ---------------- */
    {
      id: "event-1", category: "events", title: "Sample Concert Livestream",
      date: "2026-11-15", youtube: "jNQXAC9IVRw",
      description: "A sample event that has a video or livestream you can watch here.",
      details: { "Date": "Nov 15, 2026", "Venue": "Your Arena, City" }
    },
    {
      id: "event-2", category: "events", title: "Sample Fan Meeting",
      date: "2026-12-05",
      description: "A sample event with no video - it just shows the details of when and where it happens.",
      whereToWatch: "Attend in person. Tickets available through the official ticketing page.",
      details: { "Date": "Dec 5, 2026", "Time": "6:00 PM", "Venue": "Your Hall, City" }
    },

    /* ---------------- GUESTINGS / INTERVIEWS ---------------- */
    {
      id: "guest-1", category: "guestings", title: "Kapamilya Chat",
      date: "2025-07-01", youtube: "https://www.youtube.com/watch?v=Rpm-2qLsnoA&list=PL2YB7ervGvwm8B-wtxvjZFqNSSpFbDWdD",
      description: "Kapamilya Chat Dustin Yu and Bianca De Vera"
    },
    {
      id: "guest-2", category: "guestings", title: "24 Oras: DusBi",
      date: "2025-07-01", youtube: "https://www.youtube.com/watch?v=88mbSLeCMDw&list=PL2YB7ervGvwm8B-wtxvjZFqNSSpFbDWdD&index=2",
      description: "Aminadong overwhelmed pa rin ngayon sa love and support sina Dustin Yu at Bianca De Vera sa pagbabalik nila sa outside world. But the question remains para sa duo: Ano na kaya ang relationship status nila sa paglabas ng Bahay ni Kuya?"
    },
    {
      id: "guest-3", category: "guestings", title: "DUSBI, maagang nagpakilig sa Unang Hirit",
      date: "2025-07-02", youtube: "https://www.youtube.com/watch?v=Xp9RttbK2pk&list=PL2YB7ervGvwm8B-wtxvjZFqNSSpFbDWdD&index=3",
      description: "From housemates to soulmates?! Ang first live interview ng DUSBI na sina Dustin Yu at Bianca De Vera"
    },
    {
      id: "guest-4", category: "guestings", title: "Unang Hirit: Welcome back to the outside world, Dustin Yu and Bianca De Vera!",
      date: "2025-07-02", youtube: "https://www.youtube.com/watch?v=vOUsDVaWMJY&list=PL2YB7ervGvwm8B-wtxvjZFqNSSpFbDWdD&index=4",
      description: "Mula sa loob ng Bahay ni Kuya hanggang sa morning TV, live na makakasama sa studio ang PBB duo na sina Dustin Yu at Bianca De Vera! Kasama ang kanilang fans at isang espesyal na coffee truck setup, welcome home ang feels sa kanilang unang morning show guesting together sa Unang Hirit!"
    },
    {
      id: "guest-4", category: "guestings", title: "TiktoClock",
      date: "2025-07-02", youtube: "https://www.youtube.com/watch?v=Bw8ke9gKjJs&list=PL2YB7ervGvwm8B-wtxvjZFqNSSpFbDWdD&index=5",
      description: "Dinala ng 'Pinoy Big Brother' ex-housemates Bianca De Vera at Dustin Yu ang pagiging competitive nila sa outside world! Tutukan ang pakikipagkulitan nila sa Tiktropa!"
    },
    {
      id: "guest-5", category: "guestings", title: "Fast Talk with Boy Abunda: Dustin Yu at Bianca De Vera, may bwelta sa bashers!",
      date: "2025-07-02", youtube: "https://www.youtube.com/watch?v=IB2wPyNt44M&list=PL2YB7ervGvwm8B-wtxvjZFqNSSpFbDWdD&index=6",
      description: "Sa kabila ng maraming fans at supporters, hindi pa rin nakaligtas ang ‘PBB’ duo nina Dustin Yu at Bianca De Vera sa mga bashers. Ngayon, haharapin na nila ang mga matitinding komento at opinyon ng taumbayan!"
    },
    {
      id: "guest-6", category: "guestings", title: "Alam Na Dis! | DZMM Teleradyo",
      date: "2025-07-02", youtube: "https://www.youtube.com/watch?v=7GHFc5LywFc&list=PL2YB7ervGvwm8B-wtxvjZFqNSSpFbDWdD&index=7",
      description: "Dustin Yu and Bianca De Vera in DZMM Teleradyo"
    },
    {
      id: "guest-7", category: "guestings", title: "DusBia, ano'ng mensahe sa bashers?",
      date: "2025-07-02", youtube: "https://www.youtube.com/watch?v=ODKx8bw0tfQ&list=PL2YB7ervGvwm8B-wtxvjZFqNSSpFbDWdD&index=8",
      description: "Dustin Yu and Bianca De Vera in DZMM Teleradyo"
    },
    {
      id: "guest-8", category: "guestings", title: "#KPRGAsks #DusBi | Dustin Yu and Bianca de Vera",
      date: "2025-07-03", youtube: "https://www.youtube.com/watch?v=tUwxCFGvF6s&list=PL2YB7ervGvwm8B-wtxvjZFqNSSpFbDWdD&index=9",
      description: "Dustin Yu at Bianca De Vera sumabak sa KPRG Asks with a twist, panoorin ang masayang kwentuhan nila dito. Ano nga kaya ang mga favorite tasks nila sa loob ng Bahay ni Kuya? At ngayong nasa labas na, ano nga kaya ang mga gusto nilang gawin together? 😍💛"
    },
    /* ---------------- VLOGS ---------------- */
    {
      id: "vlog-1", category: "vlogs", title: "what I would wear STYLE CHALLENGE! | Xoxo, Bianca",
      date: "2022-10-05", youtube: "https://www.youtube.com/watch?v=C_xzGQFuWdk",
      description: "First episode of xoxo, Bianca"
    },
    {
      id: "vlog-2", category: "vlogs", title: "SHOOTING RANGE WITH TOX | Xoxo, Bianca",
      date: "2022-10-12", youtube: "https://www.youtube.com/watch?v=wfsh25hfuhY",
      description: ""
    },
    {
      id: "vlog-3", category: "vlogs", title: "ANSWERING YOUR ASSUMPTIONS ABOUT ME + MAKEUP Q&A | Xoxo, Bianca",
      date: "2022-10-19", youtube: "https://www.youtube.com/watch?v=NLWP-pKCjQM",
      description: ""
    },
    {
      id: "vlog-4", category: "vlogs", title: "2 Good 2 Be True Lock-In Taping Vlog | Xoxo, Bianca",
      date: "2022-10-29", youtube: "https://www.youtube.com/watch?v=NLWP-pKCjQM",
      description: ""
    },
    {
      id: "vlog-5", category: "vlogs", title: "Rise & Go BTS (North Adventures!)",
      date: "2023-07-15", youtube: "https://www.youtube.com/watch?v=JSlVofTd9yA&t=50s",
      description: ""
    },
    {
      id: "vlog-6", category: "vlogs", title: "BIRTHDAY SHOOT BTS",
      date: "2024-02-07", youtube: "https://www.youtube.com/watch?v=ph-mhQwCiSI&t=24s",
      description: ""
    },

    /* ---------------- BEHIND THE SCENES ---------------- */
    {
      id: "bts-1", category: "behind-the-scenes", title: "Sample Behind the Scenes: Movie One",
      date: "2026-09-14", youtube: "jNQXAC9IVRw",
      description: "A sample behind-the-scenes video."
    },
    {
      id: "bts-2", category: "behind-the-scenes", title: "Sample Photoshoot BTS",
      date: "2026-07-01", youtube: "jNQXAC9IVRw",
      description: "A sample photoshoot behind-the-scenes."
    },

    /* ---------------- FANMADE ---------------- */
    {
      id: "fan-1", category: "fanmade", title: "Sample Fan Edit One",
      date: "2026-10-12", youtube: "jNQXAC9IVRw",
      description: "A sample fan-made edit. Add credit to the fan who made it!",
      details: { "Made by": "@fan_username" }
    },
    {
      id: "fan-2", category: "fanmade", title: "Sample Fan Tribute",
      date: "2026-08-30", youtube: "jNQXAC9IVRw",
      description: "A sample fan tribute video.",
      details: { "Made by": "@another_fan" }
    }
  ]
};
