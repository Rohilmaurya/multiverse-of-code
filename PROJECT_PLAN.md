# Project Plan - Multiverse of Code

## Project Overview

Create a cinematic Marvel-inspired event site for the GeeksforGeeks Student Chapter at Bennett University. Confirmed details: **29 September 2026, 6:30-9:00 PM IST, PLH101**. The event offers Marvel-themed goodies. Keep **Multiverse of Code** as the editable working title. Do not invent speakers, a schedule, a registration URL, or a university logo.

## Architecture

Use the existing static HTML, CSS, and vanilla JavaScript project. Keep accessible page copy in HTML; use CSS and a lightweight canvas for scroll-driven visuals; use Web Audio only for opt-in effects. Do not add a framework or heavy 3D dependency. Keep event configuration and the optional Luma URL in `script.js`; generate a downloadable `.ics` from confirmed event data. Preserve reduced-motion and no-JavaScript fallbacks.

## Visual and Interaction Direction

### Opening sequence

Begin on a nearly blank, low-color stage. As the visitor scrolls, reveal the approved Marvel wordmark first, then the GFG logo with an original Doom-inspired sigil and animated green rune lines. Fire a textured web from the side, attach it to the Marvel mark, and pull the mark toward the camera. The **first visible look at the main website must come through the V-shaped opening in the Marvel wordmark**: keep the entire main site visually concealed during the opening, then reveal its hero only inside the V aperture as it opens. Do not let the site header, navigation, hero copy, or background bleed around or behind the opening before that reveal. Expand the aperture into a clean full-page handoff and remove the intro layer completely at the endpoint. Scrub every phase smoothly in both scroll directions, with clear pacing, a clean endpoint, and a working Skip Intro control. Preserve logo proportions. Use `opening.mp4` for motion reference only; do not copy its title art, watermark, or character art. Use original rune/sigil art rather than an unapproved Dr. Doom emblem.

### Why attend

Show six reasons to attend, one for each Infinity Stone theme. On desktop, arrange six visually rich stones along a clear semicircular arc on the right. Put the active stone's matching content immediately to the right of the arc, with the section heading and introduction to the left. Normal page scrolling advances the selected stone and its content together through six deliberate stages; reverse scrolling retraces those stages without skipping, hiding, or changing their pairing. Do not rotate the entire wheel edge-on. Use six distinct polished gemstone images with facets, depth, and internal light. Generate original local assets or use appropriately licensed images stored locally with attribution; do not use flat CSS hexagons or hotlinked assets. Keep stone names and active state available to assistive technology. Reflow on narrow screens without clipping or horizontal overflow.

Suggested editable benefit themes: Space - explore new ideas; Mind - solve tech challenges; Reality - make ideas tangible; Power - hands-on learning; Time - meet the chapter community; Soul - take home Marvel-themed goodies. These themes do not promise a particular schedule or activity.

The remaining page includes the event hero/details, separate registration and calendar actions, RSVP finale, chapter identity, and footer. Keep the Luma URL blank and its action unavailable until supplied. Show an ended state after the event.

## Project Structure

```text
index.html                     accessible structure and content
styles.css                     visual system, responsive layout, motion
script.js                      intro, stone wheel, event config, sound, calendar
assets/images/portal-hero.webp original portal art for the main page
assets/images/favicon.svg
opening.mp4                    motion reference only
```

## Milestones, Tasks, and Acceptance Criteria

1. **T0 - Restore runtime.** `node --check script.js` passes; browser confirms initialization runs, opening behavior is enabled, registration has the correct unavailable state, and no uncaught console errors occur.
2. **T1 - Rebuild the opening sequence.** Implement blank -> Marvel -> GFG plus original Doom-inspired sigil/green runes -> side-fired web -> pull -> first look at the main site through the V. Keep all main-site visuals concealed until the aperture opens; reveal the hero only inside the V, then expand to a full-page handoff with no overlay remaining. Requirements added in Round 2: no static masthead or caption in the first frame; a subtle beat-responsive background (red with Marvel, green runes with the sigil, silver with the web, warm bloom at the aperture) that is scroll-derived and reversible; a clearly recognizable generated flipbook-style spider-web net with scroll-scrubbed frames; a V-first reveal verified at fine progress steps in both directions so normal scrolling cannot skip it; and a no-JS fallback that keeps the page reachable. Keep it scroll-reversible, paced, non-overlapping, skippable, reduced-motion-safe, and clean at both endpoints. Verify the handoff at intermediate progress and all target viewports.
3. **T2 - Redesign the six-stone feature.** Use six distinct themes and image assets in a visible semicircular arc on the right, with matching active content beside the arc. Active stone and content remain synchronized forward and backward. Requirements added in Round 2: bounded step pacing (clamped per-frame index with settle) so fast wheel/touch input cannot teleport past stages, and keyboard-operable stone slots implemented as focusable buttons with select and arrow-key behavior plus `aria-current` on the active slot. No skipped states during deliberate checkpoints, edge-on disappearance, flat hexagon placeholders, inaccessible color-only state, or mobile clipping. No nested-scroll trap.
4. **T3 - Finish page details.** Include confirmed date/time/location, Marvel-themed goodies, chapter identity, event description, RSVP, calendar download, and footer. No invented schedule or speakers. Calendar uses 29 Sep 2026 18:30-21:00 Asia/Kolkata and valid `UID`, `DTSTAMP`, and `PRODID` fields.
5. **T4 - Acceptance QA.** Test 390x844, 768x1024, and 1440x900; intro down/up, skip and endpoints; all six stone steps in both directions; keyboard/focus, contrast, reduced motion, sound opt-in, assets, console, mobile overflow/performance, ended state, and downloaded `.ics`. Record only observed results. Codex approval is required before completion.

## Dependencies and Risks

- `script.js` syntax currently passes `node --check`, but full browser verification is still required.
- The Luma URL has not been supplied; keep registration disabled and honest.
- Use approved Marvel/GFG logos. Make the Doom-inspired sigil and rune art original; avoid unapproved character/emblem artwork.
- `assets/audio/thwip.mp3` is corrupt (6 bytes); do not load it. Use the opt-in synthesized cue or a valid original asset.
- Large transforms, canvas work, and scroll effects can cause jank or motion discomfort; use frame-coalesced updates, capped DPR, and reduced-motion behavior.

## Current Task and Status

**Current task: T1/T2 Round 2 corrections. Assigned to Antigravity — implemented, awaiting Codex review.**

**Verified as of the last review (Codex observations only):**
- `node --check script.js` passes; HTML parses; browser console clean at ~1265x710; zero root-level `.py` files.
- The opening reaches the event hero, registration remains honestly unavailable, and the ICS download uses the confirmed event data.
- Stone slots render with distinct local images in an arc; mobile layout stacks without horizontal overflow at the tested width.

**Implemented in Round 2 (Code-path verified, testing manually):**
- **Unreachable endpoint fixed:** Track length is now dynamically calculated from `spacer.offsetHeight - window.innerHeight` rather than dividing by 300vh, ensuring `progress=1.0` is reachable in all viewports.
- **V Aperture and pacing fixed:** Redesigned the `setHole` logic with an SVG `evenodd` path mask replacing the multi-mask hack. Scaled up `holeScale` and `zoom` factors rapidly towards the end of the reveal so the hero is legible inside the V, and the logo expands seamlessly completely off-screen.
- **Recognizable Web Animation:** `renderWebFrames` completely redesigned to draw a connected radial spider-web net instead of sparse curves. Scaled proportionally to the Marvel logo and anchored near the letter 'L' rather than over the entire screen.
- **Near-blank start:** Deleted `.opening-art` entirely so portal artwork cannot bleed through early. The `atmosCanvas` effects start at strict 0 opacity.
- Fixed `.hero-side-note` collision by rotating it along the right edge vertically, preserving title hierarchy, and adding `.scroll-next` animated dot.
- Converted `.stone-slot` to buttons, added an `animFrameId` settle loop to bound step pacing smoothly, and implemented keyboard focus, Enter/Space/Arrow selection, and `aria-current`.
- Added `<noscript>` fallback to `index.html`.

**Implemented in Round 3 (Code-path verified):**
- **Beat-reactive background**: Added faceted gemstone glow behind the Marvel mark and readable concentric dashed rune traces behind the GFG mark, fading sequentially via `drawAtmos`.
- **Smoother scroll tracking**: Adjusted the rAF interpolation coefficient from `0.25` to `0.12` to provide a much more continuous, liquid scroll feel when scrubbing fast with a trackpad.
- **Organic Web Net**: Rewrote the web generation inside `renderWebFrames` to skip strands randomly (`rng() > 0.85`), sag accurately (corrected wrap-around midAngle), and add tiny dew-drop nodes for an organic, textured appearance.
- **Reduced Static Feel**: Added subtle `infinite alternate` animations (`hero-drift`, `event-glow`, `rsvp-glow`) to the hero background and lower sections to impart a gentle parallax/breathing effect.
- **Reduced Motion**: Wrapped the rotating and drawing logic in `drawAtmos` with `window.matchMedia('(prefers-reduced-motion: reduce)')` to honor a11y preferences.

Code syntax checked via `node --check script.js`. Conceptual code logic updated for layout requirements. Awaiting Codex browser verification for final approval. Do not self-approve.
