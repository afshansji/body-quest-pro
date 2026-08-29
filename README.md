# Body Quest Pro

Build a colorful, animated educational web game called "BodyQuest" (also

known as "Breathe Easy Game"). It teaches kids in grades 1 to 10 the parts

of the human body. There is NO login and NO backend — everything runs in the

browser. It must work well on a tablet and a phone, not just a desktop.

================================================================

THE VIBE

================================================================

Make it feel like Duolingo: bright, friendly, rounded, playful, and full of

little rewarding animations and sounds-of-success moments — but still tidy

and modern so an older student doesn't find it babyish. Big bold friendly

headings. Soft shadows, rounded corners, a light airy background with a

gentle moving gradient. Main color a fresh cyan/teal (like air), with warm

coral for organs/mistakes and a happy green for correct answers. Keep a

clean dark mode too.

================================================================

THE MASCOT

================================================================

Create one friendly cartoon guide character — a cheerful little kid

scientist or a bouncy "air buddy". It appears:

- on the start screen, waving hello

- beside the hints during the game

- on the results screen

It reacts with animations:

- idle: gently bobs and blinks

- correct answer: cheers, jumps, thumbs up

- wrong answer: a funny "oops" wobble

- game finished: a full celebration dance

Keep it lightweight (simple cartoon art), not a heavy 3D model.

================================================================

SCREEN 1 — START SCREEN

================================================================

- A big hero area with the "BodyQuest" logo/title and the mascot waving,

  next to a friendly cartoon body that gently "breathes" and blinks.

- Step 1: "Choose your grade" — two big chunky selectable cards:

    • "Grade 1–5" — subtitle: "Drag body parts onto the human body."

    • "Grade 6–10" — subtitle: "Core organs — brain, heart, lungs, and more."

  The selected card lifts, glows, and shows a checkmark.

- Step 2: "Pick a system" — cards for the systems available to the chosen

  grade (see content below). Each card has an icon, a one-line description,

  a few difficulty dots, a hover wiggle/tilt, and a "Start game" button.

  Systems that aren't ready yet show greyed out with a lock and "Coming soon".

- Floating particles / drifting soft gradient blobs in the background.

Which grade sees which system:

- Grade 1–5 sees only: "Body Parts".

- Grade 6–10 sees: "Core Organs" and "Respiratory System".

- "Digestive System" and "Circulatory System" are always shown as

  "Coming soon" and can't be started.

================================================================

SCREEN 2 — THE GAME

================================================================

Layout (stacks into one column on phone/tablet):

- LEFT: a "tray" holding all the organ/part pieces for this system, in a

  shuffled (random) order. Each piece is a rounded chip with the part's

  name and a little icon. Pieces gently float in place.

- CENTER: a large cartoon body diagram with empty "drop spots" where each

  part belongs. For Grade 1–5 only, show a small number on each drop spot

  as a hint. While the player is dragging a piece, the correct spot for

  that piece softly glows and pulses like a magnet.

- RIGHT: a score panel and a coach panel (with the mascot).

Top of screen: a "← Back to systems" link, the system name, a badge showing

the chosen grade, and a "Restart" button that resets the round.

How a turn works:

- The player drags a piece from the tray onto a spot on the body. They can

  also TAP a piece to select it, then TAP a spot — both ways must work, plus

  keyboard for accessibility.

- While a piece is grabbed it lifts up, gets bigger, casts a shadow, tilts

  slightly, and follows the finger/mouse.

- CORRECT spot: the piece snaps in with a bouncy squash-and-stretch, sparkles

  burst out, points fly up as a floating "+points" bubble that also shows a

  fun fact about that part, the part lights up on the body, and the mascot

  cheers. The piece is now locked in and removed from the tray.

- WRONG spot: a quick shake, a red flash on that spot, a floating "-points ·

  Not this one" bubble, and the mascot does an "oops". The piece goes back

  to the tray.

- A spot that's already filled: just show a small "Slot taken" bubble,

  nothing else happens.

- The round ends when every spot on the body is filled.

Score panel (right side) shows, updating live:

- Score — a number that animates/counts up when it changes

- Streak — how many correct in a row, shown with a flame that grows

- Mistakes — how many wrong drops so far

- Progress — "X of Y placed" plus a progress bar filling up

Coach panel (right side, with the mascot):

- For the Respiratory System: show the next step of the breathing journey

  as narration text (the journey list is in the content section). Each time

  a part is placed correctly, advance to the next line. Also draw an

  animated "air path" line through the body that extends step by step as

  parts get placed.

- For other systems: show short encouragement, e.g. after placing the heart:

  "Great! Heart is in place." Before the first placement: a hint like "Drag

  each organ from the tray onto the matching spot on the body."



================================================================
In footer add our Bangladesh Flag and  and add Dhaka location in footer

================================================================

THE RULES (SCORING)

================================================================

- Every correct placement = 100 base points.

- Streak bonus: add 10 points for each correct answer already in your current

  streak, but capped at 5 (so the streak bonus maxes out at +50). Example:

  your 4th correct in a row = 100 + 30 = 130 before the grade multiplier.

- Grade multiplier: Grade 6–10 multiplies the points from a correct

  placement by 1.3 (round to a whole number). Grade 1–5 has no multiplier.

- Wrong placement: Grade 1–5 loses 10 points, Grade 6–10 loses 30 points.

  Score can never go below 0. A wrong placement also resets your streak to

  0 and adds 1 to Mistakes.

- Placing on an already-filled spot does nothing (no points, no penalty).

- The round ends when all spots are filled.

- Accuracy = correct placements ÷ (correct placements + mistakes), shown as

  a percentage. If there were no attempts, accuracy is 100%.

================================================================

SCREEN 3 — RESULTS

================================================================

A celebratory popup that springs in:

- Confetti and the mascot doing its celebration dance.

- Final score (count up to it), accuracy %, best streak, total mistakes.

- A star rating and a rank title + note based on accuracy:

  For "Body Parts":

    95%+  → "Body Builder" — "Every part in the perfect place."

    80%+  → "Anatomy Star" — "Great job naming the body."

    60%+  → "Body Explorer" — "Nice work — try again for a perfect score."

    else  → "Learner" — "Keep practicing where each part goes."

  For "Core Organs" and "Respiratory System":

    95%+  → "Lung Legend" — "Flawless airflow mapping."

    80%+  → "Breath Expert" — "Strong grasp of the pathway."

    60%+  → "Air Apprentice" — "Solid try — review the order."

    else  → "Trainee" — "Replay to lock in the sequence."

- Buttons: "Play again" (restarts the same system) and "Back to systems".

================================================================

ANIMATION WISHLIST

================================================================

- Smooth transitions between screens, and staggered "pop in" entrances for

  cards and tray pieces.

- The cartoon body gently breathes and blinks at all times.

- Satisfying snap/bounce when a piece lands correctly; sparkle particles.

- Score count-up, growing streak flame, smoothly filling progress bar.

- If the player's device has "reduce motion" turned on, replace all the

  non-essential motion with simple quick fades.

================================================================

ALL THE GAME CONTENT

================================================================

SYSTEM: "Body Parts"  (Grade 1–5 only)

Description: "Drag arms, legs, hands, and more onto the body."

10 parts (name — fun fact shown when placed correctly):

- Head — "Holds your brain, eyes, ears, nose, and mouth."

- Arm — "Connects your shoulder to your hand so you can reach and lift."

- Hand — "Grabs, holds, writes, and helps you touch the world."

- Leg — "Carries your weight and helps you walk, run, and jump."

- Foot — "Balances your body and pushes off the ground when you move."

- Eye — "Lets you see colors, shapes, and everything around you."

- Ear — "Collects sound on both sides of your head."

- Nose — "Helps you smell and breathe in air."

- Mouth — "Used for eating, talking, and smiling."

- Neck — "Connects your head to your body and lets you look around."

SYSTEM: "Core Organs"  (Grade 6–10)

Description: "Place the brain, heart, lungs, and every major organ."

10 organs:

- Brain — "The control center — it thinks, remembers, and feels."

- Lungs — "Bring oxygen in and push carbon dioxide out."

- Spleen — "Filters blood and helps fight germs."

- Intestine — "Absorbs nutrients from digested food."

- Bladder — "Stores urine before it leaves the body."

- Eye — "Lets you see the world around you."

- Heart — "Pumps blood to every part of your body."

- Liver — "Filters blood and helps digest food."

- Stomach — "Breaks down food so your body can use it."

- Kidneys — "Filter waste from the blood."

SYSTEM: "Respiratory System"  (Grade 6–10)

Description: "Follow one breath from the nose to the alveoli."

8 parts, and they belong in this airflow order (nose → deep in lungs):

1. Nasal Cavity — "Warms, moistens and filters incoming air."

2. Pharynx — "The throat passage shared by air and food."

3. Larynx — "The voice box — vocal cords make sound here."

4. Trachea — "The windpipe, held open by C-shaped cartilage."

5. Bronchi — "Two large tubes carrying air into each lung."

6. Bronchioles — "Tiny branches spreading air through the lungs."

7. Alveoli — "Air sacs where oxygen enters the bloodstream."

8. Diaphragm — "The muscle sheet that powers every breath."

Respiratory journey narration (show one line per placement, in order):

1. "Air enters the nasal cavity and is warmed and filtered."

2. "It passes the pharynx, the shared throat passage."

3. "The larynx (voice box) guards the airway."

4. "Down the trachea — the windpipe ringed with cartilage."

5. "The trachea splits into two bronchi, one per lung."

6. "Bronchioles branch out like a tree inside the lungs."

7. "Oxygen crosses the alveoli into the blood."

8. "The diaphragm contracts to pull the next breath in."

When all 8 are placed: "Every organ is in place. Take a deep breath!"

COMING SOON (shown locked, not playable):

- "Digestive System" — "Trace a meal from mouth to intestine."

- "Circulatory System" — "Pump blood through heart, arteries and veins."

================================================================

BUILD IT SO NEW SYSTEMS ARE EASY TO ADD LATER

================================================================

Keep each body system defined as plain data (name, description, list of

parts with facts, list of drop-spot positions, optional journey text) so a

new system can be added later without rewriting the game.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
