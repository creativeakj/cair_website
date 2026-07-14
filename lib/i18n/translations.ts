export const LOCALES = ["en", "fr", "sw"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  sw: "SW",
};

// Machine-translated (French, Swahili) — flagged for native-speaker review
// before being treated as final. Covers navigation, footer, and the
// highest-visibility copy on Home/About/Programs/Contact (headers, primary
// CTAs). Deeper body content (program descriptions, objective lists, etc.)
// stays English for now and can be added to this same dictionary later.
export const translations = {
  nav: {
    home: { en: "Home", fr: "Accueil", sw: "Nyumbani" },
    about: { en: "About", fr: "À propos", sw: "Kuhusu" },
    team: { en: "Team", fr: "Équipe", sw: "Timu" },
    programs: { en: "Programs", fr: "Programmes", sw: "Programu" },
    publications: { en: "Publications", fr: "Publications", sw: "Machapisho" },
    news: { en: "News", fr: "Actualités", sw: "Habari" },
    events: { en: "Events", fr: "Événements", sw: "Matukio" },
    contact: { en: "Contact", fr: "Contact", sw: "Wasiliana" },
    joinCair: { en: "Join CAIR", fr: "Rejoindre CAIR", sw: "Jiunge na CAIR" },
  },
  footer: {
    tagline: {
      en: "A non-governmental, non-profit, non-partisan center advancing dialogue, research, and partnership between Africa and America.",
      fr: "Un centre non gouvernemental, à but non lucratif et non partisan qui fait progresser le dialogue, la recherche et le partenariat entre l'Afrique et l'Amérique.",
      sw: "Kituo kisicho cha kiserikali, kisicho cha kibiashara, na kisicho na upendeleo wa kisiasa kinachoendeleza mazungumzo, utafiti, na ushirikiano kati ya Afrika na Amerika.",
    },
  },
  home: {
    heroEyebrow: { en: "Africa · America · Allied Nations", fr: "Afrique · Amérique · Nations alliées", sw: "Afrika · Amerika · Mataifa Washirika" },
    heroHeadingLine1: { en: "Building bridges", fr: "Construire des ponts", sw: "Kujenga madaraja" },
    heroHeadingLine2: { en: "between continents.", fr: "entre les continents.", sw: "kati ya mabara." },
    heroSubhead: {
      en: "The Center for African International Relations advances dialogue, research, and partnership for a future shaped by peace, prosperity, and shared global values.",
      fr: "Le Centre pour les Relations Internationales Africaines fait progresser le dialogue, la recherche et le partenariat pour un avenir façonné par la paix, la prospérité et des valeurs mondiales partagées.",
      sw: "Kituo cha Mahusiano ya Kimataifa cha Afrika kinaendeleza mazungumzo, utafiti, na ushirikiano kwa ajili ya mustakabali unaojengwa na amani, ustawi, na maadili ya pamoja ya kimataifa.",
    },
    ctaMission: { en: "Our Mission", fr: "Notre Mission", sw: "Dhamira Yetu" },
    ctaMember: { en: "Become a Member", fr: "Devenir Membre", sw: "Kuwa Mwanachama" },
    visionEyebrow: { en: "Vision", fr: "Vision", sw: "Dira" },
    visionHeading: {
      en: "A leading hub for African–American cooperation.",
      fr: "Un pôle de référence pour la coopération africano-américaine.",
      sw: "Kitovu kinachoongoza cha ushirikiano wa Afrika na Amerika.",
    },
    visionParagraph: {
      en: "Five thematic units translate that vision into research, convenings, and partnerships on the ground.",
      fr: "Cinq unités thématiques traduisent cette vision en recherche, en rencontres et en partenariats sur le terrain.",
      sw: "Vitengo vitano vya mada hubadilisha dira hiyo kuwa utafiti, mikutano, na ushirikiano ardhini.",
    },
    seeAllPrograms: { en: "See all programs →", fr: "Voir tous les programmes →", sw: "Ona programu zote →" },
    missionEyebrow: { en: "Mission", fr: "Mission", sw: "Dhamira" },
    missionHeading: {
      en: "Dialogue. Research. Advocacy. Partnership.",
      fr: "Dialogue. Recherche. Plaidoyer. Partenariat.",
      sw: "Mazungumzo. Utafiti. Utetezi. Ushirikiano.",
    },
    missionParagraph: {
      en: "We promote engagement that strengthens African–American relations, enhances cooperation with allied nations, and creates pathways for sustainable development, democratic governance, and international collaboration.",
      fr: "Nous favorisons un engagement qui renforce les relations africano-américaines, améliore la coopération avec les nations alliées et crée des voies vers un développement durable, une gouvernance démocratique et une collaboration internationale.",
      sw: "Tunakuza ushirikiano unaoimarisha mahusiano ya Afrika na Amerika, kuboresha ushirikiano na mataifa washirika, na kufungua njia za maendeleo endelevu, utawala wa kidemokrasia, na ushirikiano wa kimataifa.",
    },
    exploreProgramsLink: { en: "Explore our programs →", fr: "Découvrir nos programmes →", sw: "Angalia programu zetu →" },
    placesEyebrow: { en: "Beyond the Postcard", fr: "Au-delà de la carte postale", sw: "Zaidi ya Picha za Utalii" },
    placesHeading: {
      en: "The Africa our work is built around.",
      fr: "L'Afrique pour laquelle nous travaillons.",
      sw: "Afrika ambayo kazi yetu imejengwa juu yake.",
    },
    placesParagraph: {
      en: "Kilimanjaro's peaks, Victoria Falls' spray, Zanzibar's coast, Marrakech's medina — not backdrops, but the living geography of the institutions, economies, and communities CAIR exists to serve.",
      fr: "Les sommets du Kilimandjaro, les embruns des chutes Victoria, la côte de Zanzibar, la médina de Marrakech — non pas des décors, mais la géographie vivante des institutions, des économies et des communautés que le CAIR s'engage à servir.",
      sw: "Vilele vya Kilimanjaro, mvua ya maporomoko ya Victoria, pwani ya Zanzibar, mji wa kale wa Marrakech — si mandhari tu, bali jiografia hai ya taasisi, uchumi, na jamii ambazo CAIR ipo kuzitumikia.",
    },
  },
  about: {
    eyebrow: { en: "About the Center", fr: "À propos du Centre", sw: "Kuhusu Kituo" },
    titleStart: { en: "A non-partisan center for", fr: "Un centre non partisan pour la", sw: "Kituo kisicho na upendeleo kwa ajili ya" },
    titleEmphasis: { en: "African–American", fr: "coopération africano-américaine.", sw: "ushirikiano wa Afrika na Amerika." },
    titleEnd: { en: "cooperation.", fr: "", sw: "" },
    lede: {
      en: "CAIR is a non-governmental, non-profit, non-partisan organization registered in the United States and the Federal Republic of Nigeria, with the mandate to strengthen relations across Africa, America, and allied nations.",
      fr: "Le CAIR est une organisation non gouvernementale, à but non lucratif et non partisane, enregistrée aux États-Unis et en République fédérale du Nigeria, avec pour mandat de renforcer les relations entre l'Afrique, l'Amérique et les nations alliées.",
      sw: "CAIR ni shirika lisilo la kiserikali, lisilo la kibiashara, na lisilo na upendeleo wa kisiasa, lililosajiliwa Marekani na Jamhuri ya Shirikisho ya Nigeria, likiwa na dhamira ya kuimarisha mahusiano kati ya Afrika, Amerika, na mataifa washirika.",
    },
  },
  programs: {
    eyebrow: { en: "Programs", fr: "Programmes", sw: "Programu" },
    titleStart: { en: "Five thematic units.", fr: "Cinq unités thématiques.", sw: "Vitengo vitano vya mada." },
    titleEmphasis: { en: "One agenda.", fr: "Un seul agenda.", sw: "Ajenda moja." },
    lede: {
      en: "CAIR delivers its mission through specialized units that translate the Constitution's objectives into research, convenings, and partnerships.",
      fr: "Le CAIR réalise sa mission à travers des unités spécialisées qui traduisent les objectifs de la Constitution en recherche, en rencontres et en partenariats.",
      sw: "CAIR hutimiza dhamira yake kupitia vitengo maalum vinavyobadilisha malengo ya Katiba kuwa utafiti, mikutano, na ushirikiano.",
    },
    signatureWork: { en: "Signature Work", fr: "Travaux Phares", sw: "Kazi Kuu" },
  },
  contact: {
    eyebrow: { en: "Contact", fr: "Contact", sw: "Wasiliana" },
    titleStart: { en: "Engage with", fr: "Échangez avec", sw: "Wasiliana na" },
    titleEmphasis: { en: "CAIR.", fr: "le CAIR.", sw: "CAIR." },
    lede: {
      en: "Reach the Executive Secretariat for partnerships, membership inquiries, research collaboration, or media.",
      fr: "Contactez le Secrétariat Exécutif pour les partenariats, les demandes d'adhésion, la collaboration de recherche ou les médias.",
      sw: "Wasiliana na Sekretarieti Kuu kwa masuala ya ushirikiano, uanachama, ushirikiano wa utafiti, au vyombo vya habari.",
    },
    headquarters: { en: "Headquarters", fr: "Siège", sw: "Makao Makuu" },
    regionalHub: { en: "Regional Hub", fr: "Antenne Régionale", sw: "Kituo cha Kikanda" },
    sendMessage: { en: "Send a message", fr: "Envoyer un message", sw: "Tuma Ujumbe" },
    formName: { en: "Full name", fr: "Nom complet", sw: "Jina Kamili" },
    formOrganization: { en: "Organization", fr: "Organisation", sw: "Shirika" },
    formEmail: { en: "Email", fr: "E-mail", sw: "Barua Pepe" },
    formSubject: { en: "Subject", fr: "Sujet", sw: "Somo" },
    formMessage: { en: "Message", fr: "Message", sw: "Ujumbe" },
    formSubmit: { en: "Submit Inquiry", fr: "Envoyer la Demande", sw: "Wasilisha Ombi" },
  },
} as const;
