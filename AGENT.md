# ValuEdge Shorts — daily agent playbook

Every 8 hours one run of the scheduled task turns ONE story into ONE vertical cartoon video (1080x1920, full resolution,
30–45 s, the quality bar of the reference shorts "The Janitor Nobody Noticed" and "Paid in Spice" (2026-11-16-5 — the
owner's approved model for the upgraded engine: its own world for the story, period costumes, a fresh opening, a
physical payoff on the last word)) and schedules it through
Buffer to the ValuEdge Instagram (Reels), YouTube (Shorts) and TikTok accounts.
Publishing is fully automatic, so **accuracy is the gate**: a video that is not verified does not get made.

## 1. Content rules (hard)
- Audience: active long-term investors. Theme: patience, compounding, temperament, valuation discipline, famous
  investing history, behavioural mistakes, market myths. Tone: warm, witty, a twist at the end.
- **Research deep, not wide-and-thin.** Read the actual pages (not just search snippets) of at least three independent
  sources per story, at least one of them primary or institutional (archives, official records, museums, academic papers,
  the institution's own history page, newspapers of the time). Every name, number, date and place in the narration must
  be confirmed by two of them; record it in the script's `facts` list. A figure only one source gives stays out of the
  narration. Look for the specific, surprising, physical detail (what they wore, ate, carried, said) — that is what makes
  a scene; the generic summary everyone repeats is not enough.
  If sources disagree, use the safest documented version or drop the story. Legends/parables are allowed only when the
  script itself frames them as a legend ("Legend says…", "An old parable…").
- No stock picks, price targets, "buy/sell" language, return promises, or advice to any individual. No crypto hype.
- No real living people as characters (deceased historical figures are fine, treated respectfully). No brands as jokes,
  no politics, nothing graphic. No real company logos in captions or visuals.
- Never repeat a story listed in `posted.json`. Vary eras and themes across the three daily videos.
- **No template videos.** Each story gets its own world: the set where it really happened (`city`, `exchange`, `harbor`,
  `office`, or the snowy small `town` only when the story is a small-town story), period costumes (`era`), a hero dressed for
  the part, and props/labels from the story. Compare against the last three entries in `posted.json` (`shots`, `era`, `sets`)
  and do NOT reuse their opening shot+location, their ending shot, or their order of shots. The Janitor's signature moments
  (beanie gift, empty rocking chair with the beanie, coins raining on HOSPITAL/LIBRARY, hilltop finale) are reserved for
  stories that truly match them — at most one of them per video.
- Each post caption ends with: `Not financial advice. Stories for long-term investors. valuedge.app`

## 1b. What a 10-million-view short does (studied 2026-11-16: "Why the Second Draw Always Wins", 56 s, same art style)
Measured, not guessed: 219 words in 56 s (3.9 words/s); a new picture every ~2 s; one-word captions; hook action on frame 0.
Use these principles (never copy its story or shots):
1. **Hook = a rule that sounds wrong, plus motion on frame 0.** "The fastest gun in the West had one rule: never draw first."
   The first four seconds are one continuous camera move following an object (a bullet) to the hero. No static open.
2. **Put the viewer inside the story — second person.** "Imagine you're standing in the street at noon…", "you grab for
   your gun…", "you're face down in the dirt". The viewer is the one who makes the mistake; the lesson lands on them.
3. **A named, nicknamed everyman** ("Slow Eddie") and **one exaggeration joke** ("He'd lose a race to the saloon against a
   guy carrying two beers"). Slapstick payoffs for the loser, funny faces.
4. **Ask the mystery out loud at ~15 s** ("How is that possible?"), then escalate before answering ("men ride in from three
   states away… every one goes down the same way") and drop one clue ("Eddie never looks at your face").
5. **Pivot with "You see," into an everyday analogy the viewer has lived** (a phone sliding off a table — you caught it
   before you decided to), staged in-world, then the mechanism shown as a creative metaphor (the brain as a telegraph office).
6. **One coherent world, many corners of it** (street, saloon, photographer's shop, telegraph office), varied angles and
   lighting (night blue for the explanation) — not unrelated sets glued together.
7. **End on the mechanism, abruptly — no moral, no summary.** The last line is the punch; the investing lesson is implied
   for the viewer to connect (it makes them replay and comment). Never end on a lecture.
8. **Universal topic first, finance second.** Lead with a human-behaviour or history hook anyone would watch; the investing
   connection is the twist or the subtext. Panic selling, FOMO, patience, compounding, hidden value all fit this.
9. **Captions one or two words at a time**, centred low; hard cuts and camera moves instead of white flashes (flashes only
   for a true time jump, `"flash": true`).

## 2. Script format (`scripts/<slug>.json`)
```json
{
  "slug": "2026-11-17-1",
  "title": "The Janitor Nobody Noticed",
  "seed": 1,
  "hero": {"jacket": "#7a5a3c", "hair": "#eeeae2", "skin": "#f5c9a0", "moustache": "#e4e0d8", "hat": "hair"},
  "crates": ["SOAP", "POWER", "RAILS"],
  "buildings": ["HOSPITAL", "LIBRARY"],
  "beats": [
    {"shot": "intro", "loc": "gas", "fx": "coin", "text": "The poorest-looking man in town was secretly worth eight million dollars.", "hit_words": ["million"]},
    {"shot": "finale", "text": "In the end, he helped everyone.", "hit_words": ["everyone."]}
  ],
  "caption": "Instagram/YouTube description (2–4 short lines + 3–6 hashtags + the disclaimer line)",
  "yt_title": "Max 90 chars, curiosity-driven, no clickbait lies",
  "sources": ["https://…", "https://…"]
}
```
- Write it with the cartoon-audio-short skill's Stage 2 and Stage 3 rules (invoke the skill `anthropic-skills:cartoon-audio-short`
  when it is available and follow its idea and script sections; its Stage 4 build kit is replaced by this repo). In short:
  - Idea: one surprising story with a physical cause and effect you can show, an everyman character, stakes that escalate,
    and an ironic twist in the last line. True stories only when verified; legends framed as legends.
  - Formula: (1) Hook — sentence 1, no setup, the absurd fact stated plainly; (2) Setting — 1–2 lines: when, where, who,
    one concrete detail; (3) Escalation — 2–4 beats, each bigger, others doubt or mock, one exaggeration joke;
    (4) Pivot — "But when…" / "You see," reveals the real mechanism, ideally with an everyday analogy;
    (5) Twist / payoff — short, ironic, the last words of the video.
  - Plain spoken English, contractions, sentences of 6–15 words, numbers written as words. Never describe what the viewer sees.
  - Prefer second person ("Imagine you…") and a nickname for the everyman; ask the mystery question out loud; end on the punch.
- **Write for the ear.** Every sentence has a verb. No one-word or list-fragment sentences ("Railroads. Real estate. Bonds."
  breaks the voice) — put lists inside one sentence ("She bought railroads, real estate and bonds."). Vary sentence length
  (a short punch after two longer lines), at most one rhetorical question, no parentheses, no abbreviations or symbols.
  Read it aloud in your head: if a line would sound odd from a radio storyteller, rewrite it.
- Before writing, do the skill's Stage 2 for yourself: draft 10 candidate ideas (different eras and themes), score each on
  surprise, a physical cause-and-effect you can show, the twist, and fit with the sets — pick the best one that is not in
  `posted.json` and not like the last three videos. Write the hook three different ways and keep the strongest.
- 150–210 spoken words total (≈ 40–55 s with Roger at speed 1.08 — about 3.8 words per second, the pace of the 10M-view
  reference below), 16–24 beats of 5–12 words, so the picture changes every 2–3 seconds.
- Extra fields: `"era"` (1700s | 1800s | 1900s | modern — costumes the townspeople), `"sets": {"bank": "≤13 letters"}`
  (name on the city bank), `"chart": {"trend": "...", "label": "..."}` (default chalk board in the exchange), `"calendar"`
  (default text on the office calendar), `"facts": [{"claim": "...", "sources": ["url", "url"]}]` (required).
- Numbers written as words. Contractions. No stage directions in `text`.
- `hit_words`: words *inside that beat's text* (copy them exactly, punctuation allowed) where the visual event lands.
- `seed` 0–2 picks the music loop; vary it across the day.
- `hero` colours: pick a palette that fits the character (keep skin tones varied). `hat`: hair | beanie | cap.
  Optional: `"pins": true, "patch": "#5b7a4a"` (patched coat), `"dress": "#c25a7a"` (dress silhouette), `"build": "stout"`.
- `crates`: three ≤ 7-letter labels shown on the crates in the `crates` shot (e.g. "BONDS", "INDEX", "CASH").
- `buildings`: two ≤ 9-letter labels for the two hill buildings used by `rain`/`finale` (e.g. "SCHOOL", "BANK", "MUSEUM").

## 3. Shot catalog (the only shots that exist)
| shot | what the viewer sees | params | hit_words |
|---|---|---|---|
| `intro` | close shot of the hero in the snowy town, slow push-in; a gold coin / burst pops above the head | `loc`, `fx`: coin \| burst \| stars \| none, `expr` | 1 (the pop) |
| `wide` | wide establishing shot of hero at a location; `timelapse:true` rolls day→sunset→night→day (years passing) | `loc`, `timelapse`, `wave` | – |
| `work` | hero working: sweeping with a broom, or `prop:"paper"` reading a financial paper | `loc`, `prop` | – |
| `closeup` | chest/face close-up, three twinkles land on the coat | `loc`, `expr` | 3 (twinkles) |
| `gift` | a neighbour walks in and tosses the hero a red knitted beanie (hero keeps it afterwards) | `loc`, `npc` | 1 (hat lands) |
| `empty_chair` | night, empty rocking chair with the beanie on it (death / absence / "years later") | – | – |
| `vault` | bank vault; a banker opens a deposit box and stock certificates (or `item:"coin"`) burst out | `item` | 1 (burst) |
| `crates` | hero on his porch; three labelled crates thump onto the table one by one | – | 3 (each crate) |
| `rock` | hero rocking in a chair while seasons race past, then dozes off (Zzz) — "doing nothing" | `sleep` | 1 (falls asleep) |
| `grow` | hero plants an acorn in a meadow; an oak and a whole forest shoot up; a man with a shovel gets waved off | `digger` | 1 (acorn lands) |
| `rain` | sunset hill; gold coins rain onto building 1 then building 2, their windows light up | – | 2 (each building) |
| `crowd` | townspeople around the hero; `mood:"nervous"` = faded sepia memory of doubters, `"happy"` = laughing crowd | `mood`, `expr` | – |
| `finale` | the whole town on the hill at sunset; a big sun glow bursts on the last word | `hero` | 1 (glow) |

| `chart` | exchange hall; a live chalk price chart draws itself on the big board; hero + two traders react | `trend`: bubble \| crash \| up \| compound \| zigzag \| flat, `label` (board title) | 1 (the turn: peak/crash/goal) |
| `ticker` | exchange hall; brass ticker machine spews tape around the hero reading the news | `expr` | 1 (tape burst) |
| `bankrun` | city; townspeople hurry to the marble bank, its doors slam shut; hero calm at the side (`hero:false` to hide) | `light` (default storm), `expr` | 1 (doors slam) |
| `ship` | harbor; a sailing ship glides in (`dir:"in"`) or sails away (`"out"`), hero waving on the pier | `dir`, `npc` | 1 (ship arrives / sparkle) |
| `stack` | office; coin stacks pop up on the desk, each double the last (compounding) | `heights` (4 numbers ≤ 16) | 3 (each new stack) |
| `calendar` | office; the wall calendar flips from `from` to `to` (years) with pages flying; lands on the hit | `from`, `to`, `sub` | 1 (final page) |

Locations for `loc`: `gas` (gas station), `store` (DEPT. STORE front), `street` (road by the gas station),
`porch` (hero's house porch), `meadow` (green spring meadow) — the snowy small town; and `city` (cobbled street of brick
rowhouses in front of a marble bank), `exchange` (wood-panelled trading hall with the chalk price board), `harbor`
(wooden pier, sea, sailing ship), `office` (desk, lamp, ledger, wall calendar). `intro`, `wide`, `work`, `closeup`,
`crowd` and `gift` work in every location. Other shots have fixed places.
Hero hats (`hero.hat`): hair | beanie | cap | tophat | bowler | tricorn | wig | bonnet (with `dress` for women).
Camera style (`"cam"` on any beat): push | pull | orbit | drift | low | high | dutch | whip — use at least four different
ones per video; never three beats in a row without one.
Extra lights: `hall` (warm interior), `lamp` (evening office), `storm` (grey panic), `dusk` (pink sunset).
Expressions (`expr`): smile, smile_closed, grin, laugh, neutral, nervous, shock, stern, whistle.
Beat options for any shot: `"light": "day" | "golden" | "night" | "spring"`, `"snow": false`, `"twist": true` (the music
stops at this beat — put it on the twist line), `"flash": true` (white flash for a real time jump; the default is a hard cut).

Storyboard craft (cartoon-audio-short skill, 4.2): frame 0 is already the hook image — pick the most striking literal
picture of sentence one (a crash on the chalk board, a bank run, a ship, a vault bursting — not always a close-up with a
coin). Vary shot sizes (wide → medium → insert → reaction), illustrate each sentence literally with the set where it
happened, put `twist:true` on the line before the payoff, and land the payoff's physical event on the last word with
whatever shot fits that story (finale is one option, not the default).
Map ideas to the strongest picture: bubble/crash/mania → `chart` (bubble/crash) + `ticker` + `crowd` happy→nervous;
panic/bank failure → `bankrun`; trade/voyages/waiting for returns → `ship`; compounding → `stack`, `chart` compound,
`grow`; decades passing → `calendar`, `wide` timelapse, `rock`; hidden wealth → `vault`; owning businesses → `crates`.

## 4. Build a video
```bash
bash setup.sh                                   # once per session
python3 make_video.py scripts/<slug>.json --stills-only   # ~1 min: out/<slug>_sheet.jpg — LOOK at it
python3 make_video.py scripts/<slug>.json       # full 1080x1920, ~60–90 min: out/<slug>.mp4 (+ .srt, _sheet.jpg, .json QA)
```
Voice, in this order:
1. **ElevenLabs Roger through the API** — `ELEVENLABS_API_KEY` set in the environment (the default `--tts eleven`; exact
   word timestamps come back with the audio). This is the house voice and the quality bar.
2. The ElevenLabs connector cannot hand its audio file to this sandbox (the file host is blocked), so it is not a route.
3. Only if no key is set: `--tts kokoro` (offline Kokoro-82M, default narrator `af_heart`, override with `"narrator"` in the
   script; sentences are spoken whole, pauses are paced, the voice is mastered). It is clearly below Roger — say so in the
   run's notification.
The voice is generated once per slug and reused on reruns (work/<slug>/voice.mp3). QA in out/<slug>.json: freezes and black must be empty, LUFS ≈ −14. Audio: music 16 dB under the voice (owner's choice;
quieter than the skill's −6 dB) with its mid-range cut, SFX 6 dB under; burned-in captions + valuedge.app mark (owner asked for both).

## 5. Publish
1. Copy the three MP4s to the `media` branch (orphan branch holding only yesterday's and today's dated folders plus
   everything under `media/keep/` and `media/test/` — those are never deleted; one fresh commit, force-pushed) under
   `media/<YYYY-MM-DD>/<slug>.mp4`. Public URL: `https://raw.githubusercontent.com/kkfir13/valuedge-shorts/media/media/<YYYY-MM-DD>/<slug>.mp4`.
   Check each URL returns HTTP 200 and the right byte size before posting.
2. Buffer (organization "My Organization"): for each video create one Instagram post (`metadata.instagram.type:"reel"`,
   `shouldShareToFeed:true`) and one YouTube post (`metadata.youtube.title`, `categoryId:"27"`, `privacy:"public"`,
   `madeForKids:false`) and one TikTok post (`metadata.tiktok.title` = yt_title), `mode:"customScheduled"`, `schedulingType:"automatic"`, `dueAt` at 08:30, 16:30 and 00:30
   (next day) Asia/Jerusalem (UTC+02:00 in winter, +03:00 in summer — take the offset from Buffer get_account).
   Buffer's plan allows 10 scheduled posts at once; never exceed it.
3. Append the story to `posted.json` (date, slug, title, sources, Buffer post ids, `shots` = the beat shot list with
   locations, `era`, `sets` used, narrator) and commit to `main`.
