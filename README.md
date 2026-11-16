# ValuEdge Shorts

Automated vertical cartoon shorts for long-term investors, published daily to the ValuEdge Instagram and YouTube via Buffer.

- `AGENT.md` — the daily agent playbook: content rules, script format, shot catalog, build and publish steps.
- `make_video.py` — script JSON → ElevenLabs voice (word timestamps) → storyboard → three.js render → music/SFX → captions → MP4.
- `web/` — the render engine: toon-shaded 3D town (`main.js`), cartoon cast (`toon.js`, `cast.js`), shot library (`board.js`).
- `audio_lib.py` — original synthesized music loops and sound effects.
- `posted.json` — every published story (to avoid repeats).

Character drawing library (`web/toonbase.js`) and parts of the engine adapted from
[mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts) (MIT). three.js r160 (MIT).

Videos live on the `media` branch (last two days only) so Buffer can fetch them from a public URL.
