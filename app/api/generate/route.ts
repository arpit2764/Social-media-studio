export async function POST(req: Request) {
  const { idea } = await req.json();

  const cleanTitle = idea.toLowerCase().startsWith("why")
    ? idea.charAt(0).toUpperCase() + idea.slice(1)
    : `Why ${idea}?`;

  // 🔥 NEW: variations for regenerate
  const introVariations = [
    "📉 Most students forget up to 70% of what they learn within 24 hours.",
    "🧠 Memory fades quickly if we don’t revise what we learn.",
    "⏳ Without revision, most learning disappears within a day.",
  ];

  const problemVariations = [
    "It's not about intelligence — it's about HOW we study. Passive learning doesn't stick.",
    "The issue isn’t ability — it's ineffective study habits like re-reading.",
    "Students struggle because they rely on passive learning instead of active recall.",
  ];

  const brainVariations = [
    "Your brain follows a ‘forgetting curve’. Without revision, memory fades quickly.",
    "The brain naturally forgets information unless it's reinforced.",
    "Memory decay is normal — without repetition, knowledge disappears.",
  ];

  const solutionVariations = [
    "Use active recall + spaced repetition. Test yourself and revise smartly.",
    "Practice recalling instead of rereading. Space your revisions over time.",
    "Quiz yourself and revisit topics regularly to strengthen memory.",
  ];

  const takeawayVariations = [
    "Don’t study more. Study smarter. Small daily revision beats long hours.",
    "Consistency beats intensity. Smart revision > long study sessions.",
    "Learning is about repetition, not effort. Revise daily for best results.",
  ];

  // 🔥 Random picker
  const getRandom = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const dynamicSlides = [
    {
      title: `1. 🤔 ${cleanTitle}`,
      content: getRandom(introVariations), 
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    },
    {
      title: "2. ⚠️ The Real Problem",
      content: getRandom(problemVariations),
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    },
    {
      title: "3. 🧠 What’s Actually Happening",
      content: getRandom(brainVariations),
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },
    {
      title: "4. ✅ What You Should Do",
      content: getRandom(solutionVariations),
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
    },
    {
      title: "5. 🎯 Final Takeaway",
      content: getRandom(takeawayVariations),
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
  ];

  return new Response(
    JSON.stringify({ result: JSON.stringify(dynamicSlides) }),
    { status: 200 }
  );
}