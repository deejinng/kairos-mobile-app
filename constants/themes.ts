// constants/themes.ts

export interface ThemeVerse {
  text: string;
  ref: string;
}

export interface Theme {
  title: string;
  color: string;
  verses: ThemeVerse[];
}

export interface Themes {
  faith: Theme;
  hope: Theme;
  love: Theme;
  peace: Theme;
  joy: Theme;
  gratitude: Theme;
  strength: Theme;
  wisdom: Theme;
  grace: Theme;
  patience: Theme;
  courage: Theme;
  forgiveness: Theme;
}

export const themes: Themes = {
  faith: {
    title: "Faith",
    color: "#4A90E2",
    verses: [
      {
        text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
        ref: "Hebrews 11:1",
      },
      {
        text: "For we walk by faith, not by sight.",
        ref: "2 Corinthians 5:7",
      },
      {
        text: "Without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him.",
        ref: "Hebrews 11:6",
      },
      {
        text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
        ref: "Romans 10:17",
      },
      {
        text: "If you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move. Nothing will be impossible for you.",
        ref: "Matthew 17:20",
      },
    ],
  },
  hope: {
    title: "Hope",
    color: "#50C878",
    verses: [
      {
        text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
        ref: "Romans 15:13",
      },
      {
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        ref: "Jeremiah 29:11",
      },
      {
        text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
        ref: "Isaiah 40:31",
      },
      {
        text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.",
        ref: "Psalm 42:11",
      },
      {
        text: "Be joyful in hope, patient in affliction, faithful in prayer.",
        ref: "Romans 12:12",
      },
    ],
  },
  love: {
    title: "Love",
    color: "#E74C3C",
    verses: [
      {
        text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
        ref: "1 Corinthians 13:4",
      },
      {
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        ref: "John 3:16",
      },
      {
        text: "Above all, love each other deeply, because love covers over a multitude of sins.",
        ref: "1 Peter 4:8",
      },
      {
        text: "And now these three remain: faith, hope and love. But the greatest of these is love.",
        ref: "1 Corinthians 13:13",
      },
      {
        text: "Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God.",
        ref: "1 John 4:7",
      },
    ],
  },
  peace: {
    title: "Peace",
    color: "#9B59B6",
    verses: [
      {
        text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
        ref: "John 14:27",
      },
      {
        text: "The Lord gives strength to his people; the Lord blesses his people with peace.",
        ref: "Psalm 29:11",
      },
      {
        text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
        ref: "Isaiah 26:3",
      },
      {
        text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
        ref: "Colossians 3:15",
      },
      {
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        ref: "Philippians 4:6-7",
      },
    ],
  },
  joy: {
    title: "Joy",
    color: "#F39C12",
    verses: [
      {
        text: "The joy of the Lord is your strength.",
        ref: "Nehemiah 8:10",
      },
      {
        text: "This is the day the Lord has made; let us rejoice and be glad in it.",
        ref: "Psalm 118:24",
      },
      {
        text: "Rejoice in the Lord always. I will say it again: Rejoice!",
        ref: "Philippians 4:4",
      },
      {
        text: "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand.",
        ref: "Psalm 16:11",
      },
      {
        text: "Though you have not seen him, you love him; and even though you do not see him now, you believe in him and are filled with an inexpressible and glorious joy.",
        ref: "1 Peter 1:8",
      },
    ],
  },
  gratitude: {
    title: "Gratitude",
    color: "#E67E22",
    verses: [
      {
        text: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
        ref: "1 Thessalonians 5:18",
      },
      {
        text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
        ref: "Psalm 100:4",
      },
      {
        text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
        ref: "Colossians 3:15",
      },
      {
        text: "I will give thanks to you, Lord, with all my heart; I will tell of all your wonderful deeds.",
        ref: "Psalm 9:1",
      },
      {
        text: "Give thanks to the Lord, for he is good; his love endures forever.",
        ref: "Psalm 107:1",
      },
    ],
  },
  strength: {
    title: "Strength",
    color: "#34495E",
    verses: [
      {
        text: "I can do all things through Christ who strengthens me.",
        ref: "Philippians 4:13",
      },
      {
        text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.",
        ref: "Psalm 28:7",
      },
      {
        text: "He gives strength to the weary and increases the power of the weak.",
        ref: "Isaiah 40:29",
      },
      {
        text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        ref: "Joshua 1:9",
      },
      {
        text: "God is our refuge and strength, an ever-present help in trouble.",
        ref: "Psalm 46:1",
      },
    ],
  },
  wisdom: {
    title: "Wisdom",
    color: "#16A085",
    verses: [
      {
        text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
        ref: "James 1:5",
      },
      {
        text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.",
        ref: "Proverbs 9:10",
      },
      {
        text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        ref: "Proverbs 3:5-6",
      },
      {
        text: "For the Lord gives wisdom; from his mouth come knowledge and understanding.",
        ref: "Proverbs 2:6",
      },
      {
        text: "The wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit, impartial and sincere.",
        ref: "James 3:17",
      },
    ],
  },
  grace: {
    title: "Grace",
    color: "#8E44AD",
    verses: [
      {
        text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.",
        ref: "Ephesians 2:8",
      },
      {
        text: "But he gives us more grace. That is why Scripture says: 'God opposes the proud but shows favor to the humble.'",
        ref: "James 4:6",
      },
      {
        text: "My grace is sufficient for you, for my power is made perfect in weakness.",
        ref: "2 Corinthians 12:9",
      },
      {
        text: "Let us then approach God's throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.",
        ref: "Hebrews 4:16",
      },
      {
        text: "From the fullness of his grace we have all received one blessing after another.",
        ref: "John 1:16",
      },
    ],
  },
  patience: {
    title: "Patience",
    color: "#27AE60",
    verses: [
      {
        text: "Be completely humble and gentle; be patient, bearing with one another in love.",
        ref: "Ephesians 4:2",
      },
      {
        text: "Wait for the Lord; be strong and take heart and wait for the Lord.",
        ref: "Psalm 27:14",
      },
      {
        text: "But if we hope for what we do not yet have, we wait for it patiently.",
        ref: "Romans 8:25",
      },
      {
        text: "The Lord is not slow in keeping his promise, as some understand slowness. Instead he is patient with you.",
        ref: "2 Peter 3:9",
      },
      {
        text: "Be patient, then, brothers and sisters, until the Lord's coming. See how the farmer waits for the land to yield its valuable crop, patiently waiting for the autumn and spring rains.",
        ref: "James 5:7",
      },
    ],
  },
  courage: {
    title: "Courage",
    color: "#C0392B",
    verses: [
      {
        text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        ref: "Joshua 1:9",
      },
      {
        text: "Be on your guard; stand firm in the faith; be courageous; be strong.",
        ref: "1 Corinthians 16:13",
      },
      {
        text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.",
        ref: "Isaiah 41:10",
      },
      {
        text: "The Lord is with me; I will not be afraid. What can mere mortals do to me?",
        ref: "Psalm 118:6",
      },
      {
        text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
        ref: "2 Timothy 1:7",
      },
    ],
  },
  forgiveness: {
    title: "Forgiveness",
    color: "#3498DB",
    verses: [
      {
        text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
        ref: "Colossians 3:13",
      },
      {
        text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
        ref: "1 John 1:9",
      },
      {
        text: "And when you stand praying, if you hold anything against anyone, forgive them, so that your Father in heaven may forgive you your sins.",
        ref: "Mark 11:25",
      },
      {
        text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
        ref: "Ephesians 4:32",
      },
      {
        text: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you.",
        ref: "Matthew 6:14",
      },
    ],
  },
};
