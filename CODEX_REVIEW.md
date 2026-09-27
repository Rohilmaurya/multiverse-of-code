# Codex Review — Implementation Checklist (Follow-up)

This is an implementation checklist for Antigravity, not a code change request. Codex is the technical lead/reviewer and has not implemented anything here. The checklist is derived from the approved follow-up plan and the user's follow-up direction. It must be executed on the current live working copy unless a baseline/rollback marker is created first.

## Current approved direction (already discussed)
Improve four things only, keeping everything else intact:
1. Background that reacts to the Marvel/GFG beats (near-black first frame, then subtle effect behind each mark).
2. Smoother, more fluid opening scroll wheel.
3. Better web — flipbook-style, textured/detailed, reads as a real web net.
4. Less static-feeling overall site, without disrupting content/layout.

## Safety note
There is no usable git repo in this root right now (`fatal: not a git repository`), so Antigravity cannot rely on `git branch/checkout/reflog` for rollback. If a rollback marker is desired, create one non-destructively by copying the current working files to timestamped backups (for example `assets/_backup/`, or a clearly named backup folder) before changing anything, or by saving the current file contents somewhere the user can restore. Do not rewrite existing working behavior to create the marker.

## Strict non-touch boundaries (keep intact)
Do NOT change:
- Project structure / no new framework or build tool.
- Event config, registration unavailable state, ICS generation, calendar link behavior, or any Luma handling.
- Content copy, section text, event date/time/location, RSVP copy, footer credits.
- Stone wheel DOM/interaction/architecture (buttons, aria attributes, wheel layout, mobile stacking) — this follow-up does not cover stones.
- Hero side-note geometry or the existing opening-lock architecture (`#page-wrapper` fixed/non-fixed behavior).
- No-JS and `prefers-reduced-motion` fallbacks as they currently work.

Only touch `index.html`, `styles.css`, and `script.js` where needed for the four follow-up items.

## Checklist for Antigravity

### A. Baseline / safety marker (optional but recommended)
- If a rollback marker is wanted, save current working copies of `index.html`, `styles.css`, `script.js`, and any directly touched asset references, in a clearly named backup location.
- If git is usable after all, create a branch and a marker commit; otherwise do not pretend git exists.
- Verify site still runs from a static server and console is clean before starting edits.

### B. Background reacts to Marvel/GFG beats
- Keep the initial frame near-black.
- Add a subtle background layer driven by scroll progress `p`, visible only for its beat.
- Behind the Marvel mark: add a faint infinity-themed cue (faceted/gemstone-like soft glow or light hint), very low opacity, centered, never overpowering.
- Behind the GFG mark: add sigil-type marks/rune traces sitting behind the GFG logo layer, soft and readable as a graphic gesture, not noise.
- Fade elements in/out by beat; nothing should appear at frame zero or linger past the V handoff.
- Honor `prefers-reduced-motion` (simplify or skip background motion).

### C. Smoother opening scroll wheel
- Keep scroll-driven progress.
- Make the opening `tick` tracking feel continuous and fluid under fast wheel/trackpad input, without visible pauses/stutter.
- Keep the rAF loop behaving sensibly so motion continues smoothly while the user is actively scrolling.
- Keep it reversible with the same feel backward.
- Do not move the phase breakpoints in a way that hides the V reveal.

### D. Better web (flipbook, textured, detailed)
- Keep the existing flipbook-style generated-frame approach already in the code, but make it clearly a web net.
- Generate several distinct web frames (radial spokes + curved capture strands/segments with slight per-frame variation), so it reads as a living textured web, not a few big white curves.
- Use the frame sequence as a flipbook keyed to progress, attached to the Marvel mark during the pull.
- Scale and place the web so it reads as a net accenting the logo/pull, not a huge screen-filling stroke mass.
- Keep the web limited to its beat, fading in/out with the sequence.
- Keep existing sound cue behavior unchanged.

### E. Less static overall site
- Hero backdrop/portal image: subtle drift or gentle overlay shimmer, low amplitude, slow, no big transforms.
- Event and RSVP sections: subtle depth cues (very restrained gradient shift or parallax-like hint per scroll) so they don't feel frozen.
- Keep dark base and text hierarchy; avoid content reflow, clipping, or overlap.

## Verification (observe only)
- `node --check script.js` passes.
- Static server open in browser: first frame near-black with no premature background/masthead; background reacts as described; wheel feels smooth both ways; web reads as a textured net attached to the mark; V reveal still works and hero is readable through it; rest of page feels less static without breaking.
- Console clean.
- Test the actual viewport available in the browser and report real results; do not claim untested viewport sizes.

## Approval status
Not approved until Codex reviews observed results. Antigravity must not self-approve.
