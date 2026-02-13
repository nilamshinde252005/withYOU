// magicDays.js
const magicDays = [
  {
    day: 1,
    title: "Count Your Blessings",
    summary: "Start by noticing the good. Train your attention to find small, ordinary blessings that are always present.",
    task: "For five minutes, write a list of 20 small things you’re grateful for today (smells, sounds, moments, people, tiny comforts). Then pick one and write one sentence about why it matters.",
    why: "Gratitude trains your brain to see helpful patterns instead of scarcity. Writing 20 forces you past generic answers into real detail, which strengthens mood and resilience."
  },
  {
    day: 2,
    title: "The Magic Rock",
    summary: "Anchor a daily intention to a physical object so you remember and embody the intention.",
    task: "Find a small stone, coin, or ring. Hold it, name your intention out loud (e.g., ‘calm presence’), then carry it for the day. Whenever you touch it, take one deep breath and repeat the intention once.",
    why: "Physical anchors create sensory triggers that pull you back to your chosen state. Repetition builds habit — the item becomes a cue for the behaviour you want."
  },
  {
    day: 3,
    title: "Magical Relationships",
    summary: "Bring gentle attention to one relationship that matters — not to fix it, but to understand and appreciate it.",
    task: "Choose one person. List three concrete things they do that you value. Send a short message expressing gratitude for one of those things (no pressure — honest and simple).",
    why: "Focusing on strengths in relationships softens defensiveness, builds connection, and trains you to notice positive social information rather than conflict."
  },
  {
    day: 4,
    title: "Magical Health",
    summary: "Tune into the body with curiosity and small, nourishing choices.",
    task: "Spend 10 minutes doing slow movement (stretch, yoga, or walking). Afterward, note three sensations you felt and one small health action you’ll do today (drink water, add fruit, rest).",
    why: "Small daily actions compound. Body awareness helps you catch tension early and make kinder choices that support long-term wellbeing."
  },
  {
    day: 5,
    title: "Magic Money",
    summary: "Create a simple, non-judgmental relationship with money by clarifying values and one small habit.",
    task: "Write a short money value statement (e.g., ‘I use money to feel secure and share joy’). Then set one tiny habit for the week — check balances once, save £1/day, or track one purchase.",
    why: "Clarity about values guides choices and reduces reactive spending. Tiny habits build confidence and long-term financial control."
  },
  {
    day: 6,
    title: "Works Like Magic",
    summary: "Notice what already works in your life — systems, rituals, relationships, skills — and lean into them.",
    task: "List three routines or things that consistently help you (e.g., morning tea, a friend who listens, a study method). Choose one to intentionally do every day for a week.",
    why: "Focusing on what works reduces overwhelm and gives you practical leverage. Repetition turns useful actions into defaults."
  },
  {
    day: 7,
    title: "Quiet the Noise",
    summary: "Give your mind a break from chatter with a short, structured silence practice.",
    task: "Do a 7-minute silent check-in: 1 minute focus on breath, 3 minutes scan body sensations, 3 minutes notice thoughts without judgment. Record one insight afterwards.",
    why: "Brief silence increases clarity and reduces reactivity. Noticing thoughts without gripping them builds freedom from automatic patterns."
  },
  {
    day: 8,
    title: "Small Brave Acts",
    summary: "Stretch your confidence gently by doing one small action that scares you a little.",
    task: "Pick something low-risk but outside your comfort zone (ask a question, share a short opinion, call someone). Do it and note how the real moment compared to your fear.",
    why: "Fear usually overestimates risk. Frequent micro-bravery recalibrates your nervous system and expands what feels possible."
  },
  {
    day: 9,
    title: "Creative Permission",
    summary: "Give yourself permission to play and create without needing it to be perfect.",
    task: "Spend 20 minutes making something — draw, write a paragraph, craft a tiny collage. No judgement, no final product required. Label everything as ‘experiment’.",
    why: "Creativity loosens rigid thinking and unlocks new ideas. Permission removes the block that perfectionism creates."
  },
  {
    day: 10,
    title: "Home as Sanctuary",
    summary: "Treat one corner of your home as a calming sanctuary you can visit mentally and physically.",
    task: "Choose one small area. Declutter it, add a comforting object (candle, plant, cushion), and spend 10 minutes there doing nothing but notice. Repeat daily for the week.",
    why: "Physical environments cue emotional states. A dedicated calm corner becomes a fast reset when life gets noisy."
  },
  {
    day: 11,
    title: "Ritual Breakfast",
    summary: "Make breakfast a small ceremonial pause that sets tone for the day.",
    task: "Prepare one breakfast intentionally — no screens, slow chewing, name two things you want from the day. Savor the first sip or bite for 30 seconds.",
    why: "Starting the day with mindful ritual improves focus and emotional tone. It’s an anchor that reminds you of agency."
  },
  {
    day: 12,
    title: "Boundaries That Bloom",
    summary: "Practice saying ‘no’ kindly to protect time and energy.",
    task: "Identify one small boundary you need (turn off notifications for an hour, decline an invitation). Phrase a short script and use it once this week.",
    why: "Boundaries create the conditions for growth — saying no to what drains you is saying yes to what matters."
  },
  {
    day: 13,
    title: "Mindful Consumption",
    summary: "Notice what you consume mentally and physically — media, food, words — and choose intentionally.",
    task: "For today, do a ‘mini detox’: choose one thing to avoid (social scroll, sugar, news) and replace it with a nourishing alternative (walk, tea, a call).",
    why: "What you consume shapes your inner climate. Small swaps reduce noise and increase clarity."
  },
  {
    day: 14,
    title: "Pocket of Joy",
    summary: "Create a short ritual you can do anytime to lift mood instantly.",
    task: "Make a 60-second joy toolkit: one song clip, a smell, a memory, a physical gesture. Use it when you need a fast uplift.",
    why: "Quick, repeatable tools give you agency over mood and prevent downward spirals."
  },
  {
    day: 15,
    title: "Deep Work Window",
    summary: "Protect a focused block of time for meaningful work without distraction.",
    task: "Set a 45–60 minute timer, remove distractions, and do one important task. Afterward, journal one clear win and one improvement.",
    why: "Focused, undistracted work produces better results and reduces fatigue from task-switching."
  },
  {
    day: 16,
    title: "Letters of Compassion",
    summary: "Write a short compassionate letter to yourself addressing a struggle with kindness.",
    task: "Write a 200–300 word letter recognizing your difficulty, offering support, and naming a next step. Keep it private or keep it as a saved note.",
    why: "Self-compassion shifts internal dialogue from criticism to care — and that improves motivation and mental health."
  },
  {
    day: 17,
    title: "Nature Reboot",
    summary: "Use the outdoors to reset your nervous system — even five minutes helps.",
    task: "Go outside for 15–30 minutes without devices. Walk slowly, notice three plants, three sounds, and three small shapes. Breathe deeply.",
    why: "Natural environments lower stress hormones and increase attention. Micro-doses are powerful and accessible."
  },
  {
    day: 18,
    title: "Micro-Declutter",
    summary: "Clear a visible small space to create mental clarity.",
    task: "Choose one surface (desk, shelf). Spend 10 minutes clearing it — throw, donate, or store. Take a photo after and notice how you feel.",
    why: "Visible order reduces cognitive load and increases the feeling of control over your environment."
  },
  {
    day: 19,
    title: "Energy Audit",
    summary: "Identify what drains and what fuels you, then protect the latter.",
    task: "Make two lists: ‘energy drains’ and ‘energy fuels’. For one drain, design a workaround. For one fuel, schedule it into the next three days.",
    why: "Awareness lets you redesign days to preserve capacity for what matters most."
  },
  {
    day: 20,
    title: "The Listening Exercise",
    summary: "Practice active listening to deepen one conversation.",
    task: "Have a 10–15 minute conversation where you ask open questions and listen without planning a response for the first 80% of the time. Reflect on what changed.",
    why: "Listening builds trust and often reveals information we miss when we’re busy rehearsing answers."
  },
  {
    day: 21,
    title: "Mini Digital Sabbath",
    summary: "Carve regular short breaks from screens to restore focus and presence.",
    task: "Choose a 2–4 hour window tomorrow to be phone-free. Plan something concrete (walk, cook, read). Notice urges and let them pass.",
    why: "Digital breaks reset attention and reduce autopilot behaviours that sap time and mood."
  },
  {
    day: 22,
    title: "Play With Constraints",
    summary: "Create creative energy by limiting options — constraints breed originality.",
    task: "Make something with a constraint (write a 100-word story, cook with only 5 ingredients). Share it or keep it private.",
    why: "Constraints reduce decision fatigue and force focused, playful problem-solving."
  },
  {
    day: 23,
    title: "Gratitude Letter",
    summary: "Write to someone who changed your life — a targeted gratitude practice.",
    task: "Write a sincere letter (200–400 words) to one person describing their impact. Send it if appropriate, or read it aloud to yourself.",
    why: "Expressed gratitude strengthens relationships and gives you perspective on the kindness in your life."
  },
  {
    day: 24,
    title: "Financial Snapshot",
    summary: "Get clear on your current financial picture without shame — information creates options.",
    task: "Spend 30–45 minutes listing accounts, debts, incomes, and predictable expenses. Identify one small next step (automate saving, cancel a subscription).",
    why: "Clarity reduces finance-related anxiety and gives you a base for planning actionable steps."
  },
  {
    day: 25,
    title: "Ritual of Ending",
    summary: "Close the day with a gentle ritual that separates work from rest.",
    task: "Create a 5–10 minute evening routine — light a candle, write three wins, and plan tomorrow’s top task. Do it for three nights.",
    why: "Clear endings reduce rumination and improve sleep quality by telling your brain the day is over."
  },
  {
    day: 26,
    title: "Vision Mapping",
    summary: "Translate long-term hopes into visible, bite-sized steps.",
    task: "Create a one-page vision map: three long-term goals and three concrete actions for the next 90 days. Pick one action and schedule it.",
    why: "Breaking big dreams into near-term steps turns overwhelm into momentum and clarifies priorities."
  },
  {
    day: 27,
    title: "Kindness Experiment",
    summary: "Do something unexpectedly kind without expectation of return.",
    task: "Perform one anonymous or small, brave kindness today (leave a note, compliment, small helpful action). Observe how it affects you.",
    why: "Kindness boosts the giver and receiver. The experiment builds a habit of outward-focused action that enriches mood."
  },
  {
    day: 28,
    title: "Integration Day",
    summary: "Bring together the practices you’ve tried and choose what stays with you.",
    task: "Review your notes from the past 27 days. Pick three practices to keep for the next month and design a simple schedule for them.",
    why: "Integration converts short sprints into lasting change. Reflection shows progress and helps you commit to what truly helps."
  }
];

export default magicDays;
