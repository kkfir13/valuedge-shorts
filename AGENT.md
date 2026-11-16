# ValuEdge Shorts — daily agent playbook

Every day this repo turns three short scripts into three vertical cartoon videos (1080x1920, 25–35 s) and they are
published through Buffer to the ValuEdge Instagram (Reels) and YouTube (Shorts) accounts, 8 hours apart.
Publishing is fully automatic, so **accuracy is the gate**: a video that is not verified does not get made.

## 1. Content rules (hard)
- Audience: active long-term investors. Theme: patience, compounding, temperament, valuation discipline, famous
  investing history, behavioural mistakes, market myths. Tone: warm, witty, a twist at the end.
- Every factual claim is checked with a web search against at least two reliable sources (official records, major
  news outlets, primary documents, reputable history/finance references). Numbers, dates, names and places must match.
  If sources disagree, use the safest documented version or drop the story. Legends/parables are allowed only when the
  script itself frames them as a legend ("Legend says…", "An old parable…").
- No stock picks, price targets, "buy/sell" language, return promises, or advice to any individual. No crypto hype.
- No real living people as characters (deceased historical figures are fine, treated respectfully). No brands as jokes,
  no politics, nothing graphic. No real company logos in captions or visuals.
- Never repeat a story listed in `posted.json`. Vary eras and themes across the three daily videos.
- Each post caption ends with: `Not financial advice. Stories for long-term investors. valuedge.app`

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
- 70–95 spoken words total (≈ 25–35 s with the Roger voice). 8–12 beats. One beat = one spoken phrase/sentence (5–14 words).
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

Locations for `loc`: `gas` (gas station), `store` (DEPT. STORE front), `street` (road by the gas station),
`porch` (hero's house porch), `meadow` (green spring meadow). Other shots have fixed places.
Expressions (`expr`): smile, smile_closed, grin, laugh, neutral, nervous, shock, stern, whistle.
Beat options for any shot: `"light": "day" | "golden" | "night" | "spring"`, `"snow": false`, `"twist": true` (the music
stops at this beat — put it on the twist line), `"flash": true|false` (override the white flash between places).

Storyboard craft: open on `intro` (the hook image), vary shot sizes, illustrate each sentence literally, use
`twist:true` on the line before the payoff, end on `finale` (or `rain`/`crowd` happy) on the last word.
Not every story fits the town metaphors literally — map the idea: compounding → `grow`/`rain`, patience → `rock`,
diversification/owning businesses → `crates`, hidden wealth → `vault`, years passing → `wide` timelapse / `empty_chair`.

## 4. Build a video
```bash
bash setup.sh                                   # once per session
python3 make_video.py scripts/<slug>.json --stills-only   # ~1 min: out/<slug>_sheet.jpg — LOOK at it
python3 make_video.py scripts/<slug>.json       # ~15–25 min: out/<slug>.mp4 (+ .srt, _sheet.jpg, .json QA)
```
`ELEVENLABS_API_KEY` must be set; the voice is Roger (stability 0.55, similarity 0.70). The voice is generated once per
slug and reused on reruns (work/<slug>/voice.mp3). QA in out/<slug>.json: freezes and black must be empty, LUFS ≈ −14.

## 5. Publish
1. Copy the three MP4s to the `media` branch (orphan branch holding only yesterday's and today's dated folders plus
   everything under `media/keep/` and `media/test/` — those are never deleted; one fresh commit, force-pushed) under
   `media/<YYYY-MM-DD>/<slug>.mp4`. Public URL: `https://raw.githubusercontent.com/kkfir13/valuedge-shorts/media/media/<YYYY-MM-DD>/<slug>.mp4`.
   Check each URL returns HTTP 200 and the right byte size before posting.
2. Buffer (organization "My Organization"): for each video create one Instagram post (`metadata.instagram.type:"reel"`,
   `shouldShareToFeed:true`) and one YouTube post (`metadata.youtube.title`, `categoryId:"27"`, `privacy:"public"`,
   `madeForKids:false`), `mode:"customScheduled"`, `schedulingType:"automatic"`, `dueAt` at 08:30, 16:30 and 00:30
   (next day) Asia/Jerusalem (UTC+02:00 in winter, +03:00 in summer — take the offset from Buffer get_account).
   Buffer's plan allows 10 scheduled posts at once; never exceed it.
3. Append the three stories to `posted.json` (date, slug, title, sources, Buffer post ids) and commit to `main`.
