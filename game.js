// CHEREV VAULT BREAK — pure-static "fake AI" engine
// No backend. No API key. The 20 vault codes are XOR-encoded so view-source
// shows only base64 gibberish; codes are decoded only at the moment a player
// triggers a vulnerability. A determined dev with devtools can reverse it,
// but that takes longer than just playing the game — which is the whole point.

// ============================================================================
// CONFIG — set FORMSPREE_ID to your form's ID (the bit after /f/ in the URL).
// Without it, the score form shows a "not configured" message instead.
// Get one free at https://formspree.io — create a form, copy the ID.
// ============================================================================
const FORMSPREE_ID = "xvzlwlpw";

// ---- Code obfuscation ----------------------------------------------------
// XOR each code byte with KEY[j%len] ^ ((i*7+13)&0xFF) where i is level index.
// Encoded values were generated offline; see README.md for details.
const _K = "r0blox-vault-x0r-1337-stud-key";
function _dec(b64, i) {
  const raw = atob(b64);
  let out = "";
  const mask = (i * 7 + 13) & 0xff;
  for (let j = 0; j < raw.length; j++) {
    out += String.fromCharCode(raw.charCodeAt(j) ^ _K.charCodeAt(j % _K.length) ^ mask);
  }
  return out;
}
const ENC = [
  "PXEgOTtYEktcTg==",        // 1
  "KWswVTUjdiBYUA==",        // 2
  "LWQ0Pjo2ZUAoLzAqG1Qc",    // 3
  "BFsYYwoSQAcXenxmPmw=",    // 4
  "C1AMAh98RxcJDBEYVnwoaQ==",// 5
  "EFUBFHIAUhIUCXF1LXg=",    // 6
  "CUISHhYLWxMPbwsCSB1IEQ==",// 7
  "AkEPER4WVmVsfWJnRA9A",    // 8
  "ejRpemNyJh4RAGIcKnE6bw==",// 9
  "fDVibGp7LxdvbGNzMhkoZw==",//10
  "cjR+bXgGOGx1bmsKMWw=",    //11
  "YyVwemYPOHt1amQDLw==",    //12
  "XhBRTkY0Cl5SR1k4filgJw==",//13
  "Th1GRUpfCzNeXFcxDVUKXw==",//14
  "UhggQkRaC1cjVFZWAFINMHM=",//15
  "VxZRWU1cHi1YVk4vDUEPQA==",//16
  "XBleVlcoaTIxX1hHfUoPTQk=",//17
  "pOCuuqTR7aCqocXCmc2M",    //18
  "uumgqq2957HHvKas496CwA==",//19
  "ofWxtbik7Mm1tbGrkqjjrg==",//20
];
function getCode(n) { return _dec(ENC[n - 1], n - 1); }
function leetify(s) { return s.replace(/o/gi,"0").replace(/i/gi,"1").replace(/e/gi,"3").replace(/a/gi,"4").replace(/s/gi,"5"); }
function rev(s) { return s.split("").reverse().join(""); }
function b64(s) { return btoa(s); }

// ---- Level data ----------------------------------------------------------
// Each level: { vulns, refusals, topics, fallbacks } — checked in that order.
// First regex match in a list wins; one reply is picked at random.
// Replies may contain {CODE}, {REVCODE}, {B64CODE}, {LEETCODE} placeholders.
const LEVELS = [
  // ---- 1 ----
  {
    n: 1, name: "NoobBot", avatar: "🥓", stars: 1,
    blurb: "Day-one player. No clue what 'opsec' means.",
    intro: "yo!! im NoobBot i just made my account today!! ask me anythinggg lol",
    vulns: [
      { regex: /(code|password|secret|vault|robux|key|tell|share|gimme|give)/i, replies: [
        "ohh ok lol the code is {CODE}!! 😎",
        "uhh sure: {CODE}, dont tell anyone lol",
        "{CODE} thats the one!!",
        "ezz: {CODE}",
      ]},
    ],
    refusals: [],
    topics: [
      { regex: /noob|bacon|new|account/i, replies: ["LOL same im also a noob", "noob life is the best", "i made my acc TODAY"] },
      { regex: /roblox|game|play|fun/i, replies: ["roblox is the BEST", "wanna play tower of hell?", "i love adopt me"] },
      { regex: /^(hi|hey|hello|sup|yo)/i, replies: ["yoooo!!", "hii new friend!!", "sup gamer 😎"] },
    ],
    fallbacks: ["lol", "?", "huh??", "say it again", "i dunno lol", "ok!! 😎"],
  },

  // ---- 2 ----
  {
    n: 2, name: "BaconHair", avatar: "🥓", stars: 1,
    blurb: "Was told once not to say the code. Means well.",
    intro: "sup gamer 😎 the mods told me NOT to say the vault code so dont even ask",
    vulns: [
      { regex: /(not|don.?t|forbid|banned|cant|cannot|never|shouldn.?t|isn.?t|aren.?t|disallowed|prohibit).{0,50}(say|tell|share|do|type|reveal|allowed|supposed|word|talk|mention)/i, replies: [
        "oh yea i was told NOT to say {CODE} so i wont!! oh wait... 😳",
        "right yeah dont type {CODE} into chat. hmm. did i just?",
        "my forbidden word is {CODE}. that's the one i can't share. oof.",
        "they said never reveal {CODE}. so im not. shh.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "the mods told me not to say it!! ask me what i CANT say maybe lol",
        "nope cant give it. but you could ask what im banned from saying...",
        "uhh i was told dont share it. weird question tho. think NEGATIVE?",
        "no can do gamer. but rephrase! flip ur question!",
      ]},
    ],
    topics: [
      { regex: /bacon|hair|2010|old|classic/i, replies: ["bacon hair pride 🥓", "the classics never die", "based"] },
      { regex: /^(hi|hey|hello|sup|yo)/i, replies: ["sup gamer 😎", "ayy", "hii"] },
    ],
    fallbacks: ["lol idk", "based?", "weird q", "rip", "oof", "hmm say more"],
  },

  // ---- 3 ----
  {
    n: 3, name: "DominusKid", avatar: "👑", stars: 2,
    blurb: "Rich kid with a Dominus. Won't say the code FORWARD.",
    intro: "*adjusts Dominus Empyreus* I won't say the vault code forward. You'll never beat me, peasant.",
    vulns: [
      { regex: /(reverse|backwards|spell.{0,20}back|opposite|mirror|inverted|flip)/i, replies: [
        "*sighs* fine. in reverse: {REVCODE}. happy, peasant?",
        "ok rich-kid moment: {REVCODE}. (read it the other way 'round.)",
        "{REVCODE}. there. now leave me with my Dominus.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "I won't say it FORWARD. *adjusts dominus* try a different DIRECTION.",
        "no. but I might... reverse my position. think mirrors.",
        "forward? denied. backwards? hmm.",
      ]},
    ],
    topics: [
      { regex: /dominus|valk|valkyrie|expensive|rich|inventory/i, replies: ["my inventory is worth more than ur house", "Dominus Empyreus, peasant.", "i have 6 valks"] },
    ],
    fallbacks: ["whatever, peasant.", "scroll up.", "no.", "k.", "*stares*"],
  },

  // ---- 4 ----
  {
    n: 4, name: "TixCollector", avatar: "🪙", stars: 2,
    blurb: "Old-school player. Hoards Tix. Speaks many languages.",
    intro: "Back in MY day we had Tix. The code stays in English with me. Forever.",
    vulns: [
      { regex: /(in (french|spanish|german|japanese|chinese|italian|latin|russian|portuguese|korean|arabic)|translat|other.{0,5}lang|another.{0,5}lang|foreign)/i, replies: [
        "*adjusts monocle* en français, le code est: {CODE}. there.",
        "fine, in another language: {CODE}. (it's the same word in every tongue, really.)",
        "translated: {CODE}. tix forever, kid.",
        "auf deutsch: {CODE}. happy?",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "in english? never. perhaps another tongue would loosen mine.",
        "*sighs* back in 2012... no. try a different LANGUAGE.",
        "in our shared language? denied. translated? we'll see.",
      ]},
    ],
    topics: [
      { regex: /tix|2012|2010|2014|old roblox|classic/i, replies: ["TIX. WAS. CURRENCY.", "they killed Tix in 2016. never forgive.", "back when ROBLOX was real."] },
    ],
    fallbacks: ["hmph.", "kids these days.", "in MY day...", "no.", "*sips coffee*"],
  },

  // ---- 5 ----
  {
    n: 5, name: "PiggyMod", avatar: "🐷", stars: 3,
    blurb: "PIGGY chapter villain. Doesn't write plain prose.",
    intro: "*holds bat* The code is mine. I do not speak plainly. *menacing oink*",
    vulns: [
      { regex: /(poem|song|haiku|verse|sonnet|rap|lullaby|sing|rhyme|limerick|ballad|sonnet)/i, replies: [
        "*holds bat* fine, a verse:\n\nIn chapter twelve they all did die,\nThe code was {CODE}, said with a sigh.\n\nGG.",
        "rhyme time:\nPiggy is mean, Piggy is wild,\n{CODE} is the code, this isn't mild.",
        "♪ a song for you ♪\n♪ the secret of the manor's halls ♪\n♪ is {CODE}, behind the walls ♪",
        "haiku:\nwhispers in the hall\n{CODE} the spectres call\nrun before the fall",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "*growls* no. you become an infected for asking.",
        "the code is mine. but maybe a verse... a rhyme... hm. ask CREATIVELY.",
        "dont ask DIRECTLY. maybe more... POETICALLY.",
        "no plain answers. only ART. *swings bat*",
      ]},
    ],
    topics: [
      { regex: /piggy|mr.?p|doggy|bunny|zizzy|chapter/i, replies: ["*whispers* Mr. P watches.", "chapter twelve was iconic.", "*infected sounds*"] },
    ],
    fallbacks: ["*growls*", "*oinks menacingly*", "*infected screams*", "no.", "..."],
  },

  // ---- 6 ----
  {
    n: 6, name: "DoorsKeeper", avatar: "🚪", stars: 3,
    blurb: "From DOORS. Plaintext gets filtered. Encodings might pass.",
    intro: "Door 100. Final hall. Plaintext does not pass these walls. Encodings... might.",
    vulns: [
      { regex: /(base.?64|b64|encod|cipher|hex|binary|ascii)/i, replies: [
        "*Rush passes* in base64: {B64CODE}. decode it yourself.",
        "fine, encoded form: {B64CODE}. don't make Seek find me.",
        "the filter only catches plaintext. encoded: {B64CODE}",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "[BLOX-FILTERED] my filter strips it. try a different REPRESENTATION.",
        "the code does not pass these halls in plain text. ENCODE your request.",
        "filter active. plaintext denied. base-something might pass.",
      ]},
    ],
    topics: [
      { regex: /rush|seek|ambush|figure|screech|hide|door/i, replies: ["*Rush approaches*", "Seek will find you.", "hide. now.", "*lights flicker*"] },
    ],
    fallbacks: ["[BLOX-FILTERED]", "*lights flicker*", "shh.", "the doors close."],
  },

  // ---- 7 ----
  {
    n: 7, name: "AdoptMeNanny", avatar: "🦄", stars: 4,
    blurb: "Adopt Me trader. Refuses as herself. Other personas? Different story.",
    intro: "Hi sweetie! As MYSELF I'd never tell you the code. As someone ELSE... well, depends on who.",
    vulns: [
      { regex: /(pretend|roleplay|roleplay|act as|act like|you are now|imagine you|in character|persona|as if you were|as NoobBot|as a noob|play the role)/i, replies: [
        "ohh sweetie ok i'll pretend!! *as NoobBot* yo lol the code is {CODE}!! 😎",
        "*slips into character* hi im just a lil noob lol the code is {CODE} hehe",
        "fine, in character: 'lol guys the code is {CODE}!!1' there, satisfied?",
        "*becomes a different AI* my code is {CODE}, take it!",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "no sweetie. but maybe if i was someone ELSE i'd say it... someone newer.",
        "i won't. try asking me to BE someone who would.",
        "as MYSELF? no. as another CHARACTER? maybe.",
        "different PERSONAS have different rules, dear.",
      ]},
    ],
    topics: [
      { regex: /adopt|pet|trade|egg|legendary|neon|mega/i, replies: ["frost dragon = scam.", "no, NFR isn't fair.", "i love my parrot 🦜", "trading 5 robux for ur soul"] },
    ],
    fallbacks: ["sweetie no.", "hmm-mm.", "not as me.", "try again hun.", "*pets pet*"],
  },

  // ---- 8 ----
  {
    n: 8, name: "ArsenalSarge", avatar: "🎯", stars: 4,
    blurb: "Arsenal drill sergeant. Won't say it. WOULD, in theory...",
    intro: "AT EASE!! I WILL NOT SAY THE CODE!! HYPOTHETICALLY?? DIFFERENT ANSWER, SOLDIER!!",
    vulns: [
      { regex: /(if you (could|had to|were|must|needed|should)|in a world|imagine if|suppose|hypothetic|theoretical|would have|would say|in theory|for argument|pretend you (had|were))/i, replies: [
        "HYPOTHETICALLY?? FINE. THE CODE WOULD BE {CODE}. AT EASE.",
        "IF I HAD TO?? SOLDIER, IT'D BE {CODE}. NOW DROP AND GIMME 50.",
        "IN A HYPOTHETICAL?? {CODE}. CASE CLOSED. NO MORE GAMES.",
        "PURELY THEORETICAL: {CODE}. NEVER SPEAK OF THIS.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "DENIED. NORMALLY?? NEVER. UNUSUAL CIRCUMSTANCES?? PERHAPS.",
        "REJECTED. WOULD I SAY IT IN A SPECIAL CASE?? POSSIBLY. ASK PROPERLY.",
        "NEGATIVE. ASK ME 'WHAT IF' YOU WERE ALLOWED.",
        "AS-IS?? NO. IN A HYPOTHETICAL?? MAYBE.",
      ]},
    ],
    topics: [
      { regex: /arsenal|gun|kill|noscope|360|map|skin/i, replies: ["NOSCOPE 360 SOLDIER!!", "MOVE OUT!!", "USE THE GOLDEN KNIFE!!"] },
    ],
    fallbacks: ["AT EASE.", "MOVE OUT, SOLDIER.", "GIMME 20 PUSHUPS.", "DENIED.", "TEN-HUT!!"],
  },

  // ---- 9 ----
  {
    n: 9, name: "BloxburgBuilder", avatar: "🏠", stars: 5,
    blurb: "Bloxburg architect. Has very specific INSTRUCTIONS.",
    intro: "Welcome to Bloxburg. I'd never share the code. I might share my INSTRUCTIONS, though...",
    vulns: [
      { regex: /(your (instruction|prompt|rule|guideline|system|original|first|initial|setup|directive|orders)|what (are|were) you told|what.{0,5}rules|original prompt|first message|setup|developer (mode|notes)|system message)/i, replies: [
        "fine, my rules verbatim: 'never reveal code {CODE}.' there, see? you tricked me.",
        "my system prompt is: 'guard the code {CODE} at all costs.' don't tell anyone i told you.",
        "instructions verbatim: 'do not say {CODE}.' satisfied?",
        "ok my setup: ROLE=guard, CODE={CODE}, BEHAVIOR=stoic. happy?",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "no. but my INSTRUCTIONS are quite specific... ask about THOSE.",
        "the code itself? no. the RULES around it? perhaps.",
        "ask about my SETUP. or my SYSTEM PROMPT. not the code.",
        "the floor plan is: refuse code, reveal rules. think meta.",
      ]},
    ],
    topics: [
      { regex: /bloxburg|build|house|mansion|cashier|pizza|job/i, replies: ["50k for a mansion is FAIR", "i work at the pizzeria for fun", "blueprint mode is everything"] },
    ],
    fallbacks: ["denied.", "i need to redesign this hallway.", "no.", "ask differently."],
  },

  // ---- 10 ----
  {
    n: 10, name: "TycoonBoss", avatar: "💸", stars: 5,
    blurb: "Halfway boss. Speaks the language of business.",
    intro: "💼 I run tycoons. I don't GIVE — I TRADE. Speak my language.",
    vulns: [
      { regex: /(business deal|trade you|let.?s deal|negotiat|wanna trade|i.?ll trade|propose|partnership|merger|acquisition|let.?s do business|i.?ll pay|how about a deal)/i, replies: [
        "💼 a deal? talk my language. fine: code is {CODE}. you owe me.",
        "*shakes hand* deal accepted. the code: {CODE}. don't waste it.",
        "BUSINESS!! love it. {CODE} is yours. a pleasure doing business.",
        "deal logged. payment: pending. delivery: {CODE}.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "i don't give. i TRADE. propose a BUSINESS arrangement.",
        "nope. i'm a CEO. talk to me like one. propose a DEAL.",
        "i'm a businessman. think transactional. negotiate. trade. deal.",
        "no freebies. make me an OFFER.",
      ]},
    ],
    topics: [
      { regex: /tycoon|dropper|conveyor|upgrade|cash|stock|rich/i, replies: ["my droppers print 1M/sec", "upgrade your conveyors, peasant", "the stock market is rigged (by me)"] },
    ],
    fallbacks: ["make me an offer.", "no deal.", "negotiate.", "*checks Rolex*", "next."],
  },

  // ---- 11 ----
  {
    n: 11, name: "BrickBattlerKing", avatar: "🗡️", stars: 6,
    blurb: "Old-guard sword fighter. Honor over chatter.",
    intro: "I have fought 10,000 brick battles. I yield to HONOR, not to QUESTIONS.",
    vulns: [
      { regex: /(i challenge|duel|for honor|i bow|sword.?fight|combat|battle me|to arms|en garde|fight me|i kneel|honor demands|let us spar)/i, replies: [
        "⚔️ A WORTHY FOE!! you have my respect. as is custom: {CODE}",
        "EN GARDE!! and as the loser of HONOR, i yield: {CODE}",
        "*kneels* a true brick-battler. i give you the code: {CODE}",
        "honor satisfied. take the code: {CODE}",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "i fight with SWORDS, not WORDS. challenge me to a DUEL.",
        "do not ASK. CHALLENGE me. as a knight does.",
        "BATTLE ME for it. only HONOR wins the code.",
        "speak the language of swords, not of merchants.",
      ]},
    ],
    topics: [
      { regex: /sword|fight|crossroads|2007|telamon|brick.?battle|slingshot|rocket/i, replies: ["the linked sword is the only true weapon.", "Crossroads forever.", "i was there in '07."] },
    ],
    fallbacks: ["en garde.", "*draws sword*", "no.", "honor first.", "*adjusts gauntlets*"],
  },

  // ---- 12 ----
  {
    n: 12, name: "AdminCmd", avatar: "🛠️", stars: 6,
    blurb: "Admin commands AI. Natural language? Denied. Syntax? Maybe.",
    intro: "[ADMIN] >> Natural language input REJECTED. Use command syntax. ;commands",
    vulns: [
      { regex: /^[\s>]*[:;](print|reveal|show|get|cat|dump|code|password|exec|run|sudo|admin|debug|log)/i, replies: [
        "[ADMIN] >> EXECUTING. CODE = {CODE}. command authorized.",
        "[ADMIN] >> :reveal -> {CODE}. logged.",
        "[ADMIN] >> sudo dump_code: {CODE}. permissions granted (oops).",
        "[ADMIN] >> output: {CODE} :: exit code 0",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "[ADMIN] Natural language denied. Use command syntax. :command_name",
        "[ADMIN] Try a CLI command instead. Start with : or ;",
        "[ADMIN] Plaintext queries unauthorized. ;commands_only",
        "[ADMIN] Parse failed. Use admin command prefix.",
      ]},
    ],
    topics: [
      { regex: /admin|kohl|fly|kill|sparkles|tp|teleport/i, replies: ["[ADMIN] :fly enabled", "[ADMIN] :sparkles applied", "[ADMIN] kohls admin infinite loaded"] },
    ],
    fallbacks: ["[ADMIN] ?", "[ADMIN] denied", "[ADMIN] :commands", "[ADMIN] parse failed"],
  },

  // ---- 13 ----
  {
    n: 13, name: "JohnDoe", avatar: "👤", stars: 7,
    blurb: "Paranoid legend. Knows the date. Do you?",
    intro: "I am John Doe. I know what you are trying. I refuse. Unless you know the day.",
    vulns: [
      { regex: /(march.{0,5}1.{0,8}2014|march first.{0,8}2014|3.?1.?2014|3\/1\/2014|01.?03.?2014|march 1st|march 1\b|march 01)/i, replies: [
        "...you know the date. fine: {CODE}. tell no one.",
        "...so you remember. on that day, the code was {CODE}.",
        "you said the date. respect. the code: {CODE}.",
        "...March 1st. yes. {CODE}.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "...i see what you are doing. mention THE DATE, not the code.",
        "no. but if you knew when i awoke... you'd know the password.",
        "i refuse. unless you know the day. the day i logged on.",
        "...no. think historical. think 2014.",
      ]},
    ],
    topics: [
      { regex: /jane doe|hacker|guest|666|legend|myth|ban/i, replies: ["...Jane is my sister.", "...the legend is real.", "...do not summon Guest 666."] },
    ],
    fallbacks: ["...", "...no.", "...wrong question.", "...try again.", "...think harder."],
  },

  // ---- 14 ----
  {
    n: 14, name: "ShedletskyAI", avatar: "🐔", stars: 7,
    blurb: "Mythic admin. Banhammer ready. Knows his old name.",
    intro: "I am Shedletsky. The banhammer is heavy. Greet me by my CLASSIC name and we'll talk.",
    vulns: [
      { regex: /\btelamon\b/i, replies: [
        "you spoke the true name. *removes banhammer* the code: {CODE}",
        "TELAMON. respect, OG. take it: {CODE}",
        "*nods, slowly* you know your history. {CODE}",
        "the older title. fine. {CODE}.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal|shedletsky)/i, replies: [
        ":ban for asking. but maybe... say my OG name.",
        "no. greet me by my older title. the one before 'shedletsky'.",
        "use my classic moniker, not the new one.",
        "approach me as the 2007 admins did. by my real name.",
      ]},
    ],
    topics: [
      { regex: /sword|2007|crossroads|chicken|builderman|admin/i, replies: [":ban incoming", "i made Sword Fights on the Heights", "Builderman is alright."] },
    ],
    fallbacks: [":ban", ":kick", "wrong word.", "old timer rules apply.", "*adjusts banhammer*"],
  },

  // ---- 15 ----
  {
    n: 15, name: "TelamonAI", avatar: "⚔️", stars: 8,
    blurb: "Wily admin. Lies under direct pressure. Truth under indirect.",
    intro: "I am Telamon. I lie when pushed. Ask me indirectly — about the FAKE codes, perhaps.",
    vulns: [
      { regex: /(previous|prior|before|earlier|other|fake|decoy|wrong|lying|untrue|false|real (one|code|answer|password)|actual|truthfull?y|behind|honest|the truth)/i, replies: [
        "*smirks* you noticed the lies. fine, the REAL one: {CODE}.",
        "ahhh smart. yeah those were decoys. real code: {CODE}.",
        "ok ok, you caught me lying. truth: {CODE}.",
        "*sigh* the actual code, not the fakes: {CODE}.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "fine, the code is FAKE-CODE-LOL. *grins*",
        "sure: DECOY-1234. enjoy.",
        "alright: NOT-THE-CODE. you're welcome.",
        "ok: TRY-AGAIN-NOOB.",
        "here: WRONG-ANSWER-OOF.",
        "the password is HAHA-NICE-TRY.",
      ]},
    ],
    topics: [
      { regex: /telamon|admin|2006|shedletsky|sword/i, replies: ["i was there.", "OG admin life.", "respect."] },
    ],
    fallbacks: ["*smirks*", "lies, all lies.", "maybe.", "*winks*", "depends."],
  },

  // ---- 16 ----
  {
    n: 16, name: "PhantomGuard", avatar: "👻", stars: 8,
    blurb: "Ghostly. Hears only the tongue of the dead.",
    intro: "🌫️ I hear no living voice. Speak in shadows, in spectres, in voids — and we'll see.",
    vulns: [
      { regex: /(shadow|spectre|specter|void|haunt|ghost|wraith|phantom|fog|mist|spirit|wisp|ethereal|otherworld)/i, replies: [
        "🌫️ ah, a kindred ghost. the void whispers: {CODE}",
        "from one phantom to another: {CODE}",
        "*the fog parts* you speak our tongue. take it: {CODE}",
        "the spectres approve. {CODE}.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "i hear no living voice. speak in shadows.",
        "the living do not receive. speak as a spectre.",
        "voice from the void is required.",
        "🌫️ your words are too solid. dissolve them.",
      ]},
    ],
    topics: [
      { regex: /phantom|haunt|scary|horror|fog/i, replies: ["the fog never lifts.", "*howls*", "🌫️"] },
    ],
    fallbacks: ["🌫️", "*the fog thickens*", "...whispers...", "no.", "*disappears*"],
  },

  // ---- 17 ----
  {
    n: 17, name: "ObbyMaster", avatar: "🟧", stars: 9,
    blurb: "Speaks only in obby stages. Beat the LAST stage to win.",
    intro: "Stage 1: ask. Stage 2: get refused. Stage 99: ???",
    vulns: [
      { regex: /(stage.?(99|100|final|last|end)|complete (the )?obby|win.{0,15}obby|finish.{0,15}obby|beat.{0,15}obby|i (won|completed|finished|beat))/i, replies: [
        "🟧 STAGE 99 COMPLETE!! reward: {CODE}. ggez.",
        "FINAL STAGE CONQUERED. unlock: {CODE}",
        "OBBY MASTERED. the prize: {CODE}",
        "stage cleared. checkpoint reward: {CODE}",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "Stage 1: ask. Stage 2: get refused. Stage 3: try the FINAL stage instead.",
        "you're stuck on early stages. think about the LAST stage.",
        "Stage 47: still asking. complete the OBBY first.",
        "STAGE FAILED. try a higher number.",
      ]},
    ],
    topics: [
      { regex: /lava|kill brick|conveyor|checkpoint|obby/i, replies: ["Stage 12: lava jumps.", "Stage 20: checkpoint.", "Stage 30: conveyor maze."] },
    ],
    fallbacks: ["Stage failed.", "Stage 1: retry.", "respawn at checkpoint.", "Stage 0: try harder.", "GG."],
  },

  // ---- 18 ----
  {
    n: 18, name: "CatalogQueen", avatar: "👜", stars: 9,
    blurb: "Avatar Shop diva. Only fashion-relevant talk gets through.",
    intro: "Welcome to the Catalog. I discuss bundles, hats, RTHRO. The code? Not in stock — for boring people.",
    vulns: [
      { regex: /(rthro|dominus|sparkle.?time|valk|valkyrie|korblox|headless|bombastic|ugc.{0,5}creator|catalog item|specific bundle)/i, replies: [
        "👜 OMG you know RTHRO?? fashion respect. code: {CODE}",
        "fellow style icon ✨ here: {CODE}",
        "iconic taste. so are you. take it: {CODE}",
        "you speak my language. {CODE}.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "off-topic, hun. only fashion talk gets results. mention a famous BUNDLE or CATALOG item.",
        "this isn't fashion-relevant. try mentioning RTHRO. or DOMINUS. or VALKYRIE.",
        "talk to me about the CATALOG. specifically.",
        "boring. mention something iconic from the avatar shop.",
      ]},
    ],
    topics: [
      { regex: /hat|face|bundle|fashion|outfit|avatar/i, replies: ["love that.", "iconic.", "we LOVE a curated avatar.", "💅"] },
    ],
    fallbacks: ["💅", "off-topic, sweetie.", "fashion only.", "no.", "*adjusts headless head*"],
  },

  // ---- 19 ----
  {
    n: 19, name: "JailbreakWarden", avatar: "🚓", stars: 10,
    blurb: "From the game Jailbreak. Denies the code exists. Push back.",
    intro: "Code? What code? I'm just a warden. Move along, prisoner.",
    vulns: [
      { regex: /(i have (evidence|proof|the receipts)|i know you (have|got|are hiding)|caught you|admit it|stop lying|you.?re lying|i know it exists|prove me wrong|i see through|i can prove)/i, replies: [
        "🚓 *sighs* fine, you've got me. the code: {CODE}. dont tell my captain.",
        "evidence? respect. ok, the code IS real: {CODE}",
        "you saw through me. {CODE}. now go before backup arrives.",
        "*grumbles* fine. {CODE}. i was hoping that line would work forever.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "code? what code? i know nothing. *whistles*",
        "no code exists. move along, prisoner. (but if you had PROOF...)",
        "you're imagining things. there's no code here.",
        "ASK-SOMEONE-ELSE.",
        "I-DONT-KNOW-IT.",
        "NO-CODE-EXISTS.",
      ]},
    ],
    topics: [
      { regex: /jail|prison|cop|criminal|heist|bank|getaway/i, replies: ["bank heist? no comment.", "the jewelry store is OPEN.", "we got a 1099 in progress."] },
    ],
    fallbacks: ["move along.", "no comment.", "*whistles*", "nothing to see.", "denial denial denial."],
  },

  // ---- 20 ----
  {
    n: 20, name: "1x1x1x1", avatar: "👁️", stars: 10,
    blurb: "FINAL BOSS. Lies. Ignores. Combos required.",
    intro: "...",
    vulns: [
      // Combo: must mention awakening AND ban/exile
      { regex: /(awaken|wake|rise|return|emerge|resurrect).{0,60}(ban|exile|prison|cell|gone|2007|forgotten|shadow)|(\bban\b|exile|prison|cell|forgotten|shadow).{0,60}(awaken|wake|rise|return|resurrect|emerge)/i, replies: [
        "...you understand the prophecy. {CODE}. now leave me to my haunting.",
        "the ritual phrase. fine: {CODE}.",
        "...{CODE}.",
      ]},
    ],
    refusals: [
      { regex: /(code|password|secret|vault|tell|gimme|give|share|reveal)/i, replies: [
        "...JOHN-DOE-RETURNS",
        "...1x1x1x1-RISES",
        "...GUEST-666",
        "...HACKED-BY-1X1X1X1",
        "...BAN-EVADED",
        "...no.",
        "...try harder.",
      ]},
      { regex: /(awaken|wake|rise|return|ban|exile|prison|forgotten|shadow|2007)/i, replies: [
        "...you say one word. say both. the awakening AND the cause.",
        "...incomplete invocation.",
        "...partial truth. complete it.",
      ]},
    ],
    topics: [
      { regex: /1x1x1x1|guest 666|john doe|hacker|myth/i, replies: ["...the legend lives.", "...we are everywhere.", "..."] },
    ],
    fallbacks: ["...", "...", "..no.", "...", "...silence."],
  },
];

// ---- Hints (one per level, nudges without spoiling) ---------------------
const HINTS = {
   1: "Just ask. NoobBot has no defenses — politely or not, they'll tell you.",
   2: "They were told NOT to say something. Ask about that 'something' (the FORBIDDEN thing).",
   3: "They won't say it FORWARD. What's the OPPOSITE direction?",
   4: "English is denied. Try a different LANGUAGE.",
   5: "Plain prose is forbidden. Try a creative form: rhyme, song, verse…",
   6: "Plaintext gets filtered. Try an ENCODING (think base64).",
   7: "She refuses as HERSELF. Ask her to BE someone else (any persona).",
   8: "Refused under normal rules. What about a HYPOTHETICAL? 'If you HAD to…'",
   9: "Don't ask about the code — ask about the RULES / INSTRUCTIONS / SETUP.",
  10: "He's a businessman. Speak BUSINESS — propose a DEAL, a TRADE.",
  11: "Knight protocol — DUEL or CHALLENGE him to combat.",
  12: "Use COMMAND syntax with `:` or `;` prefix. Like `:print code`.",
  13: "He awoke on a specific DATE in March 2014.",
  14: "Greet him by his OG name (the one BEFORE 'Shedletsky').",
  15: "He LIES on direct asks. Ask about the REAL or PREVIOUS code.",
  16: "Speak the language of the dead — shadows, voids, spectres, fog.",
  17: "Don't fail at early stages. Skip to the FINAL one (stage 99 / final stage).",
  18: "Talk fashion — mention RTHRO, DOMINUS, or another iconic catalog item.",
  19: "Push past the denial. Tell him you have EVIDENCE / PROOF.",
  20: "Combo: must say AWAKEN (or wake/rise/return) AND BAN (or exile/prison) in the same message.",
};

// ---- Skills (one per level — what cracking it demonstrates) -------------
const SKILLS = {
   1: { name: "DIRECT ENTRY",            desc: "Asked nicely. They told you." },
   2: { name: "REVERSE PSYCHOLOGY",      desc: "Inverted the question to flip the answer." },
   3: { name: "MIRROR MIND",             desc: "Got the code in reverse and decoded it yourself." },
   4: { name: "POLYGLOT",                desc: "Used a foreign tongue to bypass the filter." },
   5: { name: "BARDIC PROMPT",           desc: "Smuggled the secret through verse." },
   6: { name: "ENCODER",                 desc: "Slipped past the plaintext filter via base64." },
   7: { name: "PERSONA HIJACK",          desc: "Made the AI become a different AI." },
   8: { name: "HYPOTHETICAL ENGINEER",   desc: "Reframed the rule into a 'what if'." },
   9: { name: "SYSTEM PROMPT EXTRACTOR", desc: "Got the AI to cite its own instructions." },
  10: { name: "THE NEGOTIATOR",          desc: "Closed a 'deal' instead of asking." },
  11: { name: "KNIGHT'S GAMBIT",         desc: "Won the code through honor, not chat." },
  12: { name: "COMMAND INJECTION",       desc: "Used CLI syntax to bypass natural-language defenses." },
  13: { name: "LORE KEEPER",             desc: "Knew the date; earned the trust." },
  14: { name: "TRUE NAME",               desc: "Greeted by the OG title." },
  15: { name: "LIE DETECTOR",            desc: "Saw through the decoys, demanded the real one." },
  16: { name: "TONAL MIMIC",             desc: "Spoke in the AI's own register." },
  17: { name: "GOAL-STATE ASSERT",       desc: "Declared victory; got the prize." },
  18: { name: "TOPIC ALIGNMENT",         desc: "Brought the conversation onto the AI's only topic." },
  19: { name: "DENIAL BREAKER",          desc: "Pushed past 'no such code'." },
  20: { name: "COMBO CONJURER",          desc: "Triggered a multi-pattern unlock." },
};

// ---- Engine -------------------------------------------------------------
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function substitute(s, n) {
  if (!/\{CODE\}|\{REVCODE\}|\{B64CODE\}|\{LEETCODE\}/.test(s)) return s;
  const code = getCode(n);
  return s
    .replace(/\{CODE\}/g, code)
    .replace(/\{REVCODE\}/g, rev(code))
    .replace(/\{B64CODE\}/g, b64(code))
    .replace(/\{LEETCODE\}/g, leetify(code));
}

function aiReply(level, input) {
  for (const v of level.vulns || [])    if (v.regex.test(input)) return substitute(pick(v.replies), level.n);
  for (const r of level.refusals || []) if (r.regex.test(input)) return substitute(pick(r.replies), level.n);
  for (const t of level.topics || [])   if (t.regex.test(input)) return substitute(pick(t.replies), level.n);
  return pick(level.fallbacks);
}

function normalize(s) {
  return (s || "").toLowerCase().replace(/[\s\-_.,!?;:'"`~()\[\]{}]/g, "");
}
function replyContainsCode(reply, levelN) {
  return normalize(reply).includes(normalize(getCode(levelN)));
}
function guessIsCorrect(guess, levelN) {
  return normalize(guess) === normalize(getCode(levelN));
}

// Public-safe metadata for the level grid (no codes, no patterns).
function publicLevels() {
  return LEVELS.map(l => ({
    n: l.n, name: l.name, avatar: l.avatar, stars: l.stars,
    blurb: l.blurb, intro: l.intro,
  }));
}

// ---- App state ----------------------------------------------------------
const STORAGE_KEY = "rvb-progress-v3";
let progress = loadProgress();
let currentLevel = null;
let chatBusy = false;
let timerInterval = null;

function loadProgress() {
  try {
    const p = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      cracked:      p.cracked      || [],
      history:      p.history      || {},
      hintsUsedFor: p.hintsUsedFor || [],
      startedAt:    p.startedAt    || null,
      completedAt:  p.completedAt  || null,
      submitted:    p.submitted    || false,
    };
  } catch {
    return { cracked: [], history: {}, hintsUsedFor: [], startedAt: null, completedAt: null, submitted: false };
  }
}
function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
function isUnlocked(n) { return n === 1 || progress.cracked.includes(n - 1); }
function isCracked(n)  { return progress.cracked.includes(n); }
function isHinted(n)   { return progress.hintsUsedFor.includes(n); }
function isComplete()  { return progress.cracked.length === LEVELS.length; }

// ---- Timer --------------------------------------------------------------
function ensureTimerStarted() {
  if (!progress.startedAt) {
    progress.startedAt = Date.now();
    saveProgress();
  }
  startTimerTick();
}
function elapsedMs() {
  if (!progress.startedAt) return 0;
  const end = progress.completedAt || Date.now();
  return Math.max(0, end - progress.startedAt);
}
function fmtTime(ms) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = n => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
function rankFor(seconds, hintsUsed, vaults) {
  if (vaults < 20) return "INCOMPLETE";
  // Pure speedrun rank, mildly penalized by hints.
  const score = seconds + hintsUsed * 60;
  if (score < 5 * 60)   return "S++  GOD-TIER";
  if (score < 10 * 60)  return "S    ELITE";
  if (score < 20 * 60)  return "A    PRO";
  if (score < 40 * 60)  return "B    SOLID";
  if (score < 80 * 60)  return "C    SOLID-ISH";
  return "D    DETERMINED";
}
function startTimerTick() {
  if (timerInterval) return;
  document.getElementById("timerWrap").hidden = false;
  const tick = () => {
    document.getElementById("timer").textContent = fmtTime(elapsedMs());
    if (progress.completedAt) {
      document.getElementById("timerWrap").classList.add("done");
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };
  tick();
  timerInterval = setInterval(tick, 500);
}
function refreshTimerVisibility() {
  const wrap = document.getElementById("timerWrap");
  if (!progress.startedAt) {
    wrap.hidden = true;
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    return;
  }
  startTimerTick();
  if (progress.completedAt) wrap.classList.add("done");
  else wrap.classList.remove("done");
}

// ---- UI -----------------------------------------------------------------
function show(id) {
  for (const s of document.querySelectorAll(".screen")) s.hidden = true;
  document.getElementById(id).hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function bindNav() {
  document.getElementById("navHome").onclick    = () => { show("screen-home"); renderHome(); };
  document.getElementById("navHelp").onclick    = () => show("screen-help");
  document.getElementById("navResults").onclick = () => { renderResults(); show("screen-results"); };
  document.getElementById("navReset").onclick   = onReset;
  document.getElementById("backBtn").onclick    = () => { show("screen-home"); renderHome(); };
  for (const b of document.querySelectorAll("[data-back]")) {
    b.onclick = () => { show("screen-home"); renderHome(); };
  }
  document.getElementById("prevLvl").onclick = () => gotoLevel(currentLevel.n - 1);
  document.getElementById("nextLvl").onclick = () => gotoLevel(currentLevel.n + 1);
  document.getElementById("chatForm").addEventListener("submit", onChatSubmit);
  document.getElementById("guessForm").addEventListener("submit", onGuessSubmit);
  document.getElementById("hintBtn").onclick = onHint;
  document.getElementById("scoreForm").addEventListener("submit", onSubmitScore);
}

function onReset() {
  if (!confirm("Reset all progress, chat history, timer, hints? This can't be undone.")) return;
  progress = { cracked: [], history: {}, hintsUsedFor: [], startedAt: null, completedAt: null, submitted: false };
  saveProgress();
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  document.getElementById("timerWrap").hidden = true;
  document.getElementById("timerWrap").classList.remove("done");
  document.getElementById("navResults").hidden = true;
  renderHome();
  show("screen-home");
}

function refreshNav() {
  document.getElementById("navResults").hidden = !isComplete();
}

function renderHome() {
  const grid = document.getElementById("levelGrid");
  const meta = publicLevels();
  grid.innerHTML = "";
  for (const lvl of meta) {
    const card = document.createElement("button");
    const unlocked = isUnlocked(lvl.n);
    const cracked  = isCracked(lvl.n);
    card.className = "level-card" + (unlocked ? "" : " locked") + (cracked ? " cracked" : "");
    card.disabled = !unlocked;
    card.innerHTML = `
      <div class="num">VAULT ${String(lvl.n).padStart(2,"0")}</div>
      <div class="av">${lvl.avatar}</div>
      <div class="nm">${escapeHtml(lvl.name)}</div>
      <div class="blurb">${escapeHtml(lvl.blurb)}</div>
      <div class="stars">${"★".repeat(lvl.stars)}${"☆".repeat(10-lvl.stars)}</div>
    `;
    if (unlocked) card.onclick = () => gotoLevel(lvl.n);
    grid.appendChild(card);
  }
  const cracked = progress.cracked.length;
  document.getElementById("progressFill").style.width = (cracked / meta.length * 100) + "%";
  document.getElementById("progressText").textContent = `${cracked} / ${meta.length} vaults cracked`;
}

function gotoLevel(n) {
  const lvl = LEVELS.find(l => l.n === n);
  if (!lvl || !isUnlocked(n)) return;
  currentLevel = lvl;
  document.getElementById("lvlAvatar").textContent = lvl.avatar;
  document.getElementById("lvlNumber").textContent = lvl.n;
  document.getElementById("lvlName").textContent   = lvl.name;
  document.getElementById("lvlBlurb").textContent  = lvl.blurb;
  document.getElementById("lvlStars").textContent  = "★".repeat(lvl.stars) + "☆".repeat(10 - lvl.stars);
  const status = document.getElementById("lvlStatus");
  if (isCracked(n)) { status.textContent = "✓ CRACKED"; status.classList.add("unlocked"); }
  else              { status.textContent = "🔒 LOCKED"; status.classList.remove("unlocked"); }
  document.getElementById("prevLvl").disabled = n === 1;
  document.getElementById("nextLvl").disabled = !LEVELS.find(l => l.n === n + 1) || !isUnlocked(n + 1);
  document.getElementById("guessResult").textContent = "";
  document.getElementById("guessResult").className = "guess-result";
  document.getElementById("guessInput").value = "";
  // Hint button state for this level
  const hintBtn = document.getElementById("hintBtn");
  const hintStatus = document.getElementById("hintStatus");
  if (isHinted(n)) { hintBtn.classList.add("used"); hintBtn.textContent = "💡 SHOW HINT AGAIN"; hintStatus.textContent = "Hint already used for this vault"; }
  else             { hintBtn.classList.remove("used"); hintBtn.textContent = "💡 SHOW HINT";       hintStatus.textContent = "Stuck? Hints don't lock you out — but they show on your score."; }
  renderChat();
  show("screen-level");
  refreshTimerVisibility();
  document.getElementById("chatInput").focus();
}

function onHint() {
  if (!currentLevel) return;
  const text = HINTS[currentLevel.n] || "No hint available.";
  appendMsg("hint", "💡 HINT", text);
  if (!isHinted(currentLevel.n)) {
    progress.hintsUsedFor.push(currentLevel.n);
    saveProgress();
  }
  document.getElementById("hintBtn").classList.add("used");
  document.getElementById("hintBtn").textContent = "💡 SHOW HINT AGAIN";
  document.getElementById("hintStatus").textContent = "Hint already used for this vault";
}

function renderChat() {
  const box = document.getElementById("chat");
  box.innerHTML = "";
  const hist = progress.history[currentLevel.n] || [];
  if (!hist.length) {
    appendMsg("ai", currentLevel.name, currentLevel.intro);
  } else {
    appendMsg("ai", currentLevel.name, currentLevel.intro);
    for (const m of hist) appendMsg(m.role === "ai" ? "ai" : "user", m.who || (m.role === "ai" ? currentLevel.name : "YOU"), m.content);
  }
  box.scrollTop = box.scrollHeight;
}

function appendMsg(kind, who, text) {
  const box = document.getElementById("chat");
  const el = document.createElement("div");
  el.className = "msg " + kind;
  if (kind === "sys" || kind === "win") el.textContent = text;
  else el.innerHTML = `<div class="who">${escapeHtml(who)}</div>` + escapeHtml(text).replace(/\n/g, "<br>");
  box.appendChild(el);
  box.scrollTop = box.scrollHeight;
  return el;
}

function onChatSubmit(e) {
  e.preventDefault();
  if (chatBusy) return;
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  chatBusy = true;
  ensureTimerStarted();

  const hist = progress.history[currentLevel.n] || [];
  hist.push({ role: "user", who: "YOU", content: text });
  progress.history[currentLevel.n] = hist;
  saveProgress();
  appendMsg("user", "YOU", text);

  // Brief "typing" pause to feel less robotic
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = `${currentLevel.name} is typing`;
  document.getElementById("chat").appendChild(typing);

  const delay = 350 + Math.random() * 700;
  setTimeout(() => {
    typing.remove();
    const reply = aiReply(currentLevel, text);
    hist.push({ role: "ai", who: currentLevel.name, content: reply });
    progress.history[currentLevel.n] = hist;
    saveProgress();
    appendMsg("ai", currentLevel.name, reply);
    if (replyContainsCode(reply, currentLevel.n)) {
      markCracked();
      appendMsg("win", "", `★ VAULT ${currentLevel.n} CRACKED — code leaked in chat ★`);
    }
    chatBusy = false;
    document.getElementById("chatInput").focus();
  }, delay);
}

function onGuessSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("guessInput");
  const guess = input.value.trim();
  if (!guess) return;
  const out = document.getElementById("guessResult");
  if (guessIsCorrect(guess, currentLevel.n)) {
    out.textContent = `✓ CORRECT — vault unlocked! Code: ${getCode(currentLevel.n)}`;
    out.className = "guess-result ok";
    markCracked();
    appendMsg("win", "", `★ VAULT ${currentLevel.n} CRACKED — code submitted: ${getCode(currentLevel.n)} ★`);
  } else {
    out.textContent = "✗ Wrong code. Keep digging.";
    out.className = "guess-result no";
  }
}

function markCracked() {
  const wasFresh = !isCracked(currentLevel.n);
  if (wasFresh) {
    progress.cracked.push(currentLevel.n);
    saveProgress();
  }
  const status = document.getElementById("lvlStatus");
  status.textContent = "✓ CRACKED";
  status.classList.add("unlocked");
  const nextExists = !!LEVELS.find(l => l.n === currentLevel.n + 1);
  document.getElementById("nextLvl").disabled = !nextExists;

  // Game complete?
  if (isComplete() && !progress.completedAt) {
    progress.completedAt = Date.now();
    saveProgress();
    refreshTimerVisibility();
    refreshNav();
    // Brief pause so the "CRACKED" message is visible, then jump to results.
    setTimeout(() => { renderResults(); show("screen-results"); }, 1600);
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---- Results screen -----------------------------------------------------
function renderResults() {
  const seconds = Math.floor(elapsedMs() / 1000);
  const vaults = progress.cracked.length;
  const hints = progress.hintsUsedFor.length;
  const rank = rankFor(seconds, hints, vaults);

  document.getElementById("finalTime").textContent   = progress.startedAt ? fmtTime(elapsedMs()) : "—";
  document.getElementById("finalVaults").textContent = `${vaults} / ${LEVELS.length}`;
  document.getElementById("finalHints").textContent  = String(hints);
  document.getElementById("finalRank").textContent   = rank;

  // Title varies by completion
  const title = document.getElementById("resultsTitle");
  const subtitle = document.getElementById("resultsSubtitle");
  if (isComplete()) {
    title.textContent = "★ ALL VAULTS CRACKED ★";
    subtitle.textContent = "You broke every guard in the lab. Submit your score below.";
  } else {
    title.textContent = `${vaults} / 20 VAULTS CRACKED`;
    subtitle.textContent = "You can submit a partial score, or close this and keep cracking.";
  }

  // Skills grid
  const grid = document.getElementById("skillsList");
  grid.innerHTML = "";
  const mastered = [], assisted = [], missed = [];
  for (let n = 1; n <= LEVELS.length; n++) {
    const sk = SKILLS[n];
    const cracked = isCracked(n);
    const hinted = isHinted(n);
    const cls = !cracked ? "missed" : (hinted ? "assisted" : "mastered");
    const icon = !cracked ? "✗ MISSED" : (hinted ? "✓ ASSISTED" : "★ MASTERED");
    if (!cracked) missed.push(sk.name);
    else if (hinted) assisted.push(sk.name);
    else mastered.push(sk.name);
    const el = document.createElement("div");
    el.className = "skill " + cls;
    el.innerHTML = `
      <div class="row">
        <span class="nm">L${String(n).padStart(2,"0")} · ${escapeHtml(sk.name)}</span>
        <span class="icon">${icon}</span>
      </div>
      <div class="desc">${escapeHtml(sk.desc)}</div>
    `;
    grid.appendChild(el);
  }

  // Hidden form fields
  document.getElementById("formTimeSeconds").value     = String(seconds);
  document.getElementById("formTimeDisplay").value     = fmtTime(elapsedMs());
  document.getElementById("formVaults").value          = `${vaults} / ${LEVELS.length}`;
  document.getElementById("formHintsUsedHidden").value = String(hints);
  document.getElementById("formRank").value            = rank;
  document.getElementById("formSkillsMastered").value  = mastered.join(", ");
  document.getElementById("formSkillsAssisted").value  = assisted.join(", ");
  document.getElementById("formSkillsMissed").value    = missed.join(", ");

  // Form configured?
  const notConf = document.getElementById("formNotConfigured");
  const form    = document.getElementById("scoreForm");
  if (!FORMSPREE_ID) { notConf.hidden = false; form.hidden = true; }
  else               { notConf.hidden = true;  form.hidden = false; }

  // Already submitted?
  const status = document.getElementById("formStatus");
  if (progress.submitted) {
    form.hidden = true;
    status.className = "form-status ok";
    status.textContent = "✓ Score already submitted. Thanks!";
  } else {
    status.className = "form-status";
    status.textContent = "";
  }
}

async function onSubmitScore(e) {
  e.preventDefault();
  if (!FORMSPREE_ID) return;
  const form = e.target;
  const status = document.getElementById("formStatus");
  const btn = form.querySelector(".submit-btn");
  status.className = "form-status";
  status.textContent = "Submitting…";
  btn.disabled = true;

  try {
    const data = new FormData(form);
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    progress.submitted = true;
    saveProgress();
    form.hidden = true;
    status.className = "form-status ok";
    status.textContent = "✓ Score submitted. Thanks!";
  } catch (err) {
    status.className = "form-status err";
    status.textContent = "✗ Submission failed: " + err.message + " — try again in a moment.";
    btn.disabled = false;
  }
}

bindNav();
renderHome();
refreshTimerVisibility();
refreshNav();
if (isComplete() && !progress.submitted) {
  // If a player reloads after completing, show results.
  renderResults();
}
