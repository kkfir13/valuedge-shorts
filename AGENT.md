# ValuEdge Shorts — daily agent playbook

Every 8 hours one run of the scheduled task turns ONE story into ONE vertical cartoon video (1080x1920, full resolution,
45–55 s, the quality bar of the reference shorts "The Janitor Nobody Noticed" and "Paid in Spice" (2026-11-16-5 — the
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
- **No template videos.** Each story gets its own worlds, built for it in its film module (section 3): the places where it
  really happened, period costumes, a cast dressed for the part, props and signs from the story, and a metaphor set for the
  mechanism. Compare against the last entries in `posted.json` (`sets`, `shots`) and never reuse a recent set idea or opening.
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
9. **Captions one or two words at a time**, at ~70 % height; cuts on words, whips, dissolves and push-throughs instead
   of white flashes (a flash only for a true time jump). Section 3a has the frame-by-frame measurements.

## 2. Script format (`scripts/<slug>.json`) — film mode (engine v2, the default since 2026-11-17)
The narration lives in the script; the pictures live in a **film module** you write for this one video at
`web/films/<slug>.js`. Nothing is a template: every video builds its own sets, cast and shots.
```json
{
  "slug": "2026-11-18-0830",
  "title": "The Marshmallow Test Was Never About Willpower",
  "film": true,
  "seed": 2,
  "narrator": "am_fenrir",
  "beats": [
    {"text": "Scientists once thought one marshmallow could predict a child's future."},
    {"text": "Same test. Same marshmallow. Four times the patience.", "twist": true},
    {"text": "And nobody waits for a promise they don't believe.", "finale": true}
  ],
  "facts": [{"claim": "...", "sources": ["url", "url"]}],
  "caption": "2–4 short lines + 3–6 hashtags + the disclaimer line",
  "yt_title": "Max 90 chars, curiosity-driven, honest",
  "sources": ["https://…", "https://…"]
}
```
- Beats are sentences (or two short ones), 14–20 of them, **140–175 spoken words** → 45–52 s with Kokoro am_fenrir at the
  film defaults (`speed` 1.15, `pace` 0.45 — the reference pace; leave them unless a run comes out over 55 s).
- `twist: true` stops the music on that beat (put it on the line before the payoff). `finale: true` on the last beat adds the
  closing chord on its last word. No shot fields in the script — staging is all in the film module.
- Write it with the cartoon-audio-short skill's Stage 2 and Stage 3 rules (invoke `anthropic-skills:cartoon-audio-short`
  when available; its Stage 4 build kit is replaced by this repo). Formula: (1) Hook — sentence 1, the absurd/wrong-sounding
  fact, no setup; (2) Setting — when, where, who, one concrete detail; (3) Escalation — each beat bigger, one exaggeration
  joke; (4) Mystery question out loud ~15 s; (5) Pivot — "You see," + an everyday analogy; (6) the mechanism as a picture;
  (7) Twist / payoff — the last words. Second person ("Imagine you're…"). End on the mechanism, never on a lecture.
- **Write for the ear.** Every sentence has a verb; lists go inside one sentence; numbers as words; contractions; vary
  sentence length; no parentheses, symbols or abbreviations. Read it aloud in your head.
- Before writing, draft 10 candidate ideas (different eras and themes), score them on surprise, a physical cause-and-effect
  you can show, the twist and how *new* its worlds are compared to the last three videos; write the hook three ways.

## 3. The film module (`web/films/<slug>.js`) — how the reference short is built, and how to build ours
### 3a. What the 10M-view reference does, measured frame by frame (copy the craft, never the story)
- **A new picture every 1.5–2.5 s**: ~25–30 shots in 50 s, almost never a static frame (only ~5 s of 56 are still).
  Several shots per sentence: wide → insert → reaction → metaphor. Long sentences get 2–3 shots cut on spoken words.
- **Frame 0 is already action** (a gun barrel fires at 0.7 s and the camera follows the bullet). Never open on a still.
- **Transitions are motion, not effects**: mostly hard cuts on a spoken word; ~0.2 s dissolves between corners of the
  same place; whip pans with motion blur to jump between places; a push *through* an object (into an eye → inside the head);
  the camera following a moving object across a cut. One white flash at most (a real time jump).
- **One world, many corners, ~5–8 sets**: street day + sunset, saloon table, photo studio, night bank, and a
  creative metaphor set (the brain as a telegraph room). Lighting changes with the mood (night blue for the explanation).
- **Named characters with faces doing things**: a nickname everyman, dialogue in speech bubbles ("After you."), slapstick
  payoffs (falling flat), effects that sell emotion (fire aura, sparks, sweat, impact bursts).
- **Captions**: 1–2 words at a time, white bold rounded sans, thin dark outline + soft shadow, ~1/3 of the frame wide,
  centred at ~70 % height, no animation, always on screen. make_video.py does this automatically.

### 3b. Creativity rules (hard)
- **Every video gets worlds it has never had.** Before staging, read the `sets` and `shots` of the last five entries in
  `posted.json`; do not reuse a set *idea* (e.g. "western street", "nursery playroom", "trading floor", "pink candy stage")
  from the last three videos, and never the same opening image. Build the places where the story really happened, with
  props and signs from the story, plus one metaphor set that shows the mechanism (inside a head, a machine, a scale, a
  giant object on a stage, a map, a time tunnel…). Vary light per corner (`desert`, `golden`, `sunset`, `night`, `neon`,
  `storm`, `cold`, `interior`, `lamp`, `office`, `mind`, `dream`, `danger`, `K.backdrop(colour)`).
- 4–7 sets per video, 22–30 shots, average shot 1.5–2.2 s, no shot longer than 3.5 s; at least 3 whips/dissolves, one
  push-through (`zoom`) into the metaphor set, and a physical payoff (impact/chomp/crash/door slam) on the last word.
- A named everyman (in dialogue or visibly, never a living real person), 1–3 speech bubbles max 5 words each, and facial
  expressions that change with the story. No living people, no logos, no politics, nothing graphic or violent.

### 3c. API
```js
export default (K, T) => {           // K = kit, T = narration timing (frames at 30 fps)
  const { CAM, E } = K; const H = {}; // H: handles you fill in the sets and animate in the shots
  return {
    cast: { eddie: { jacket: "#8a3b2a", pants: "#3b3f52", boots: "#3a2418", hat: "cowboy", skin: "#f5c9a0", moustache: "#5a3a24" } },
    sets: { saloon: (B) => { B.set.room({ style: "saloon", w: 12, d: 9 }); H.clock = B.prop.clock({ x: 3, y: 3, z: -4.4 }); } },
    shots: [ { set: "saloon", beat: 0, light: "interior", trans: "cut", cam: CAM.fit([0, 1.2, 0], { w: 2, a0: -20, a1: 10 }),
               act: (S, u, f) => { S.actor("eddie", { x: 0, z: 0, expr: "stern" }); H.clock.time(10 + u); } } ],
  };
};
```
**Timing (T)**: `T.beat(i)` → `{a, b, s, e}` frames; `T.at(i, k)` frame at fraction k of beat i; `T.word(i, "word", n)` frame
the n-th match of that word is spoken in beat i (copy the word with its punctuation, e.g. `"two."`); `T.sec(s)`.
**Shot**: `{ set, beat | word:[i,"w",n] (+ lead frames, default 2) | t | f, light, cam, act, trans, dir, steady, coc, focus }`.
Shots are sorted by start; each runs until the next starts. `trans` = how the shot *arrives*: `cut` (default) |
`dissolve` | `whip` (`dir` ±1) | `zoom` (push-through) | `flash` (time jump) | `smash` (cut + shake + light flash) | `dip`.
`light` = name | `K.light(name, overrides)` | `K.backdrop("#hex")` | function `(u) => K.mixLight(a, b, k)`.
Handheld drift is added unless `steady: true`. `coc` = depth-of-field strength (7 default, 10–12 for inserts).
**Cameras** (`u` = 0..1 through the shot): `CAM.fit(center, {w | h, a0, a1, elev | e0,e1, push, dy, fov, roll})` frames a
width/height in the narrow 9:16 frame (best default); `CAM.move(a, b, ease)`, `CAM.keys([[u, {p,t,fov}], …])`,
`CAM.orbit(t, r, h, a0, a1, fov)`, `CAM.crane(t, r, h0, h1, ang)`, `CAM.follow((u) => [x,y,z], off, look, fov)`,
`CAM.still(p, t, fov, creep)`, or any function `(u, lf, f) => ({p, t, fov, roll})`.
The frame is narrow: at fov 40 the visible width is only ~0.36 × distance. Kids' heads are at ~1.05 m, adults' at ~1.5 m.
**Act** `(S, u, f, lf)` — runs every frame; everything must be a pure function of `f` (props reset to their built state each
frame before `act`). `S.actor(castId, {x, y, z, expr, prop, mode, phase, look, wave, tilt, headTilt, scale, side, flip, key})`
(`key` for a second copy of the same character); `S.fx(kind, {x,y,z,w,h,t,text,col,dir,tail})`;
`S.pop(kind, f0, dur, {…, hold, rise, spin, pop:false, sfx})` timed effect that pops in/out **and gets its sound effect
automatically**; `S.say(text, f0, dur, {x,y,z,w,h,tail:"right"})` speech bubble; `S.kick(f0, amp)` camera shake + thump;
`S.sfx(kind, f0)`; `S.light(...)`, `S.lightMix(a, b, k)`, `S.focus(m)`, `S.coc(v)`, `S.flash(k)`, `S.fade(k)`, `S.snow(v)`.
**Characters**: expressions `neutral stern grin laugh whistle nervous shock relief relief_open dazed pained smile smile_closed
lick`; poses (`prop`) `point up hold shrug fists chin paper wave(0..1 via wave:) icecream ["broom",k] ["shovel",k]`;
`mode` `stand stroll march sit fall` (+ `phase` = f*0.04–0.06 to walk); `side: true` profile view (`mode` march/push/swing,
`flip: true` faces left); outfits `{jacket, pants, boots, skin, hat, hair, cap(colour), capColor, pom, dress, moustache,
buttons, pins, patch, build: adult|stout|kid}`; hats `hair cap beanie cowboy hardhat tophat bowler tricorn wig bonnet shako`.
**Effects (fx kinds)**: `impact`(text) `word`(text, col) `bubble`(text) `label`(text, bg, col) `sparks` `stars` `burst`
`confetti` `coin` `dollar` `bill` `arrow`(dir up|down) `question` `exclaim` `bulb` `sweat` `smoke` `puff` `speed` `zap`
`heart` `card`(text "A♠") `ring` `glow` `aura` `tape` `page` `paper` `zz`.
**Sets (`B.set.*`)**: `street({style: western|brick|shop|victorian|village|adobe|modern or a list, signs:[…], ground, lit, seed})`
(road along z, facades both sides); `room({style: saloon|office|bank|home|modern|mind|library|vault|studio|kitchen|factory|cabin,
w, d, h, wall, floor, windows:[x…], door, ceiling})` (back wall at z=-d/2, open to +z); `landscape({kind: meadow|desert|snow|
farm|beach|forest|moon, road, hills, seed})`; `city({seed, lit})` (towers round a plaza); `stage({floor, back})` (abstract
void + backdrop — pair with `K.backdrop`); `mind({left, right, eye})` (control room inside a head; returns `levers`);
`harbor({crates})`; `B.facade({style, w, x, z, ry, sign})` for one building.
**Props (`B.prop.*`, all take {x, y, z, ry, s} and return an animatable group)**: table roundTable chair stool desk counter
shelf lamp(kind desk|floor|hang — real light) crate(label) barrel safe(.door) vaultDoor(.door .wheel) coin coinStack(.coins)
goldBars cash moneyBag screen(.draw({curve, t, label, down, ticker})) clock(.time(h)) hourglass(.level(k)) scale(.tilt(a))
piggy plant tree(kind oak|pine|palm|cactus|bare) rock bush fence lampPost bench car(.wheels) sign(text, post) poster rug
telegraph(.key) phone newspaper globe(.sph) arrow(dir) pedestal bars3d(vals, .grow(k)) chips bottle door(.leaf)
swingDoors(.leaves) window cloud3d mountain mesa ship dock bulbSign. Primitives for anything else: `B.box(w,h,d,mat,x,y,z,{ry,in})`,
`B.cyl`, `B.ball`, `B.cone`, `B.plate(w,h,tex,x,y,z)`, `B.grp(x,y,z,ry,s)`, `B.dyn(obj)` (make it animatable),
`B.lamp(x,y,z,col,int)`; materials are `"#hex"` or textures `"brick:#a5503a"`, `"floor:#9a6b42"`, `"wallpaper:#3f6a5a"`,
`"marble"`, `"tiles:#a:#b"`, `"carpet:#c"`, `"westwood:#c"`, `"panel:#c"`, `"glass:#c:lit"`, `"sand"`, `"grass"`, `"snow"`,
`"dirt"`, `"asphalt"`, `"cobble"`, `"concrete:#c"`, `"plaster:#c"`, `"planks:#c"`, `"metal:#c"`, `"books"`, `"water"`,
`"stripes:#a:#b"`, `"leaves:#c"`.
The worked example is `web/films/2026-11-17-film1.js` (marshmallow test: playroom, candy stage, school, mind room,
bar-chart stage; 26 shots). Read it before writing a new film, then build different worlds.

## 4. Build a video
```bash
bash setup.sh                                                                 # once per session
python3 make_video.py scripts/<slug>.json --tts kokoro --stills-only --scale 0.5   # 1st time (no film module yet): voice + word frames only
#   … write web/films/<slug>.js …
python3 make_video.py scripts/<slug>.json --tts kokoro --stills-only --scale 0.5   # ~5 min: one still per shot → out/<slug>_sheet.jpg
python3 make_video.py scripts/<slug>.json --tts kokoro                        # full 1080x1920, ~2 h on 2 cores
```
- The first run speaks the narration (Kokoro am_fenrir; reused on reruns from work/<slug>/), writes
  `web/films/<slug>.timing.json` and prints every beat with the frame of each word — time your cuts and pops to those
  words (or use `T.word` in the module). Then **look at the sheet** (Read tool): every face visible and not cut by the frame
  edge, props not covering faces, text readable, each shot matches its line, no empty or black frames. Fix and re-run
  `--stills-only` (it only re-renders the stills) until it is right; also render a few in-between frames of transitions
  with `FILM=films/<slug>.js TIMING=films/<slug>.timing.json SCALE=0.5 node render.mjs /tmp/chk "120,124,128"` if unsure.
- The full build renders in the background (run it with nohup, poll the log). Sound effects come automatically from
  pops, kicks and transitions; music sits 16 dB under the voice (owner's choice), SFX 6 dB under; burned-in captions +
  valuedge.app mark. QA in out/<slug>.json: duration 40–56 s, freezes and black empty, LUFS ≈ −14, `avg_shot_s` ≤ 2.3.
- Voice: Kokoro `am_fenrir` (owner's choice). The ElevenLabs connector cannot hand its audio file to this sandbox — do not
  use it.
- Legacy mode (a script without `"film"` uses the old snowy-town shot catalog in web/board.js) is kept only as a fallback.

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
3. Append the story to `posted.json` (date, slug, title, sources, Buffer post ids, `sets` = the set ideas you built (short
   descriptions such as "nursery playroom", "pink candy stage", "mind control room"), `shots` and `avg_shot_s` from
   out/<slug>.json, narrator) and commit the script, `web/films/<slug>.js`, its timing JSON and posted.json to `main`.
