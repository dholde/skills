---
name: imovie-repeat-sequence
description: >-
  Walk through repeating a motion cycle in Apple iMovie using a freeze-frame
  cutaway overlay to find matching start/end frames, then duplicate the
  isolated clip. Use when the user wants to loop, repeat, or extend a sequence
  in iMovie (onion-skin match, freeze overlay, Command-B splits, copy-paste
  a cycle) or says imovie-repeat-sequence.
---

<!-- Original local skill. Procedure from live iMovie looping (freeze cutaway
     as onion-skin, split at matches, duplicate the isolated clip). -->

# iMovie repeat sequence

Guide **one atomic step at a time**. Show the overview first, then only the current step. Wait until the user says it is **done** (or asks a question) before advancing.

**Announce:** "I'm using imovie-repeat-sequence: overview first, then one step at a time."

Ask only if missing: which timeline clip, and how long the repeated block should be (or how many copies).

Do not drive the iMovie UI by browser automation. The human performs every click.

## Terms

Use these words only:

- **Playhead** — the vertical line on the timeline (never “timer”)
- **Viewer** — the preview
- **Connected clip** — a clip dragged onto the row above the original
- **Cutaway** — overlay mode for a connected clip
- **Freeze** — still from the speed/clock control in the viewer

Never copy a **yellow range**. That pastes into the clip under the playhead and leaves two short stubs. Always copy a **whole clip**, then put the playhead **after** it before paste.

---

## Overview (show this first)

Numbered titles only. No instructions yet.

1. Duplicate the original and connect the copy above it
2. Park the playhead on the cycle start pose
3. Freeze that frame
4. Trim the connected clip to the freeze; extend it past one cycle
5. Cutaway overlay, lower opacity
6. Zoom the timeline
7. Split the original at the first overlay match
8. Split at the next match (end of one cycle)
9. Copy the isolated sequence and paste after it; repeat
10. Remove the freeze overlay

Then give **Step 1** only.

---

## Atomic steps

Each message: **Step N of 10 — title**, **Do this**, **Done when**, then stop.

### Step 1 of 10 — Duplicate and connect

1. Click the **whole** original clip.
2. `⌘C`.
3. Move the playhead to the **end** of the original clip.
4. `⌘V`.
5. Drag the pasted clip **up onto** the original until it becomes a connected clip (drop on the clip, not into empty gray).

**Done when:** a second row sits above the original.

### Step 2 of 10 — Park on the start pose

On the **original** clip, move the playhead to the pose that starts the cycle (usually rest: same pose you will match at the end of one circle).

**Done when:** the viewer shows that start pose.

### Step 3 of 10 — Freeze

1. Click the connected clip.
2. In the viewer, click the **clock icon** (upper right) → **Freeze**.
3. Make the freeze **longer than one cycle**. This same still is the match for **start and end**.

**Done when:** the connected row is a freeze, long enough to cover the search.

### Step 4 of 10 — Trim to freeze only

Trim the connected clip so **only** the frozen still remains (no leftover moving video). Keep it long enough to cover the whole cycle you will hunt.

**Done when:** the upper row is freeze-only and covers more than one cycle.

### Step 5 of 10 — Cutaway opacity

1. Select the connected freeze.
2. Click **Video overlay settings** (two overlapping rectangles, upper right).
3. Choose **Cutaway**.
4. Lower **Opacity** until you can see original and freeze together (~40%).

**Done when:** the original shows through the freeze.

### Step 6 of 10 — Zoom the timeline

Focus the timeline. `⌘+` until frame edges are easy to hit.

**Done when:** the timeline is zoomed in.

### Step 7 of 10 — Split at the first match

1. Click the **original** clip (lower row).
2. Move along it (playhead or pointer) until the original lines up with the freeze overlay.
3. Click to park the playhead on that match.
4. `⌘B`.

**Done when:** the original is split at the cycle start.

### Step 8 of 10 — Split at the next match

Keep going on the original. The **next** time it matches the same freeze, park the playhead and `⌘B`.

That middle piece is **one cycle**.

**Done when:** a single isolated clip is one cycle (start pose → same pose).

### Step 9 of 10 — Duplicate the cycle

1. Click the **whole** isolated cycle clip (not a range).
2. `⌘C`.
3. Move the playhead to the **end** of that clip (on the following clip or the gap after it — not on the clip you copied).
4. `⌘V`.
5. Repeat until the block is long enough.

**Done when:** the cycle is repeated enough times.

### Step 10 of 10 — Remove the overlay

Delete the connected freeze row.

**Done when:** only the edited original storyline remains.

---

## Finish

When step 10 is done, say the repeated sequence is on the timeline. Do not start export or another skill unless asked.
