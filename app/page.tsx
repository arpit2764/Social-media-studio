"use client";
import { useState } from "react";


type Slide = {
  title: string;
  content: string;
  image?: string; 
};

export default function Home() {
  const [idea, setIdea] = useState<string>("");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState<"square" | "story">("square");

  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);

  const generateSlides = async () => {
    if (!idea.trim()) {
      alert("Please enter an idea first!");
      return;
    }

    try {
      console.log("Clicked ✅");
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      let parsed: Slide[] = [];
      try {
        parsed = JSON.parse(data.result);
      } catch (err) {
        console.error("JSON parse error:", err);
        alert("AI returned invalid format");
        return;
      }

      setSlides(parsed);
    } catch (error) {
      console.error("Error:", error);
      alert("API error — check console");
    } finally {
      setLoading(false);
    }
  };

  



  
  const regenerateSlide = async (index: number) => {
    try {
      setRegeneratingIndex(index); 

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      const text = await res.text();
      const data = JSON.parse(text);
      const parsed = JSON.parse(data.result);

      if (parsed[index]) {
        const newSlides = [...slides];
        newSlides[index] = parsed[index];
        setSlides(newSlides);
      }
    } catch (error) {
      console.error("Regenerate error:", error);
      alert("Failed to regenerate slide");
    } finally {
      setRegeneratingIndex(null); 
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        padding: 40,
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: 32,
            marginBottom: 20,
            color: "white",
            letterSpacing: 1,
          }}
        >
          🚀 The Social Media Studio
        </h1>

        <textarea
          placeholder="Enter your idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          style={{
            width: "100%",
            height: 100,
            padding: 12,
            marginTop: 20,
            borderRadius: 12,
            border: "none",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            backdropFilter: "blur(10px)",
          }}
        />

       <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 15,
  }}
>
  <button
    onClick={generateSlides}
    disabled={loading}
    style={{
      padding: "12px 25px",
      background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
      color: "white",
      border: "none",
      borderRadius: 10,
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    }}
  >
    {loading ? "Generating..." : "Generate"}
  </button>

  <button
    onClick={() => setFormat("square")}
    style={{
      padding: "8px 15px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      background: format === "square" ? "#00c6ff" : "#ffffff15",
      color: "white",
    }}
  >
    📱 Post
  </button>

  <button
    onClick={() => setFormat("story")}
    style={{
      padding: "8px 15px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      background: format === "story" ? "#00c6ff" : "#ffffff15",
      color: "white",
    }}
  >
    📲 Story
  </button>
</div>

          
        </div>

        <div style={{ marginTop: 30 }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              id={`slide-${index}`}
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(15px)",
                color: "white",
                padding: 25,
                borderRadius: 20,
                marginBottom: 30,
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                aspectRatio: format === "square" ? "auto" : "9 / 16",
                width: format === "square" ? 400 : 300,
                margin: "0 auto 30px",
                textAlign: "center",
                gap: 12,
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {slide.image && (
  <img
  src={slide.image}
  alt="slide"
  onError={(e) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1588072432836-e10032774350";
  }}
  style={{
    width: "100%",
    height: 220,
    objectFit: "cover",
    borderRadius: 16,
    marginBottom: 10,
  }}
/>
)}
<textarea
  value={slide.title}
  onChange={(e) => {
    const newSlides = [...slides];
    newSlides[index].title = e.target.value;
    setSlides(newSlides);
  }}
  rows={2}
  style={{
    width: "100%",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    border: "none",
    background: "transparent",
    color: "white",
    outline: "none",
    textAlign: "center",
    resize: "none",
    lineHeight: 1.3,

    overflow: "hidden",       
    scrollbarWidth: "none",  
  }}
/>

<p
  style={{
    opacity: 0.9,
    textAlign: "center",
    lineHeight: 1.5,
    wordBreak: "break-word",
    maxWidth: "90%", 
  }}
>
  {slide.content}
</p>


              
              <button
                onClick={() => regenerateSlide(index)}
                disabled={regeneratingIndex === index}
                style={{
                  marginTop: 10,
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: "#ffffff20",
                  color: "white",
                  opacity: regeneratingIndex === index ? 0.6 : 1,
                }}
              >
                {regeneratingIndex === index
                  ? "Generating..."
                  : "🔁 Regenerate"}
              </button>

              <p
                style={{
                  marginTop: "auto",
                  textAlign: "center",
                  fontSize: 12,
                  opacity: 0.7,
                }}
              >
                The Social Media Studio ✨
              </p>
            </div>
          ))}
        </div>
      </div>
  
  );
}