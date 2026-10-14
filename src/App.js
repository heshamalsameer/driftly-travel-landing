import React, { useCallback, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Slider } from "./components/Slider";
import { Booking } from "./components/Booking";
import { Destinations } from "./components/Destinations";
import { Moods, Journey, Stats } from "./components/Experiences";
import { Stories, Pricing, Postcard, Footer } from "./components/Closing";

function App() {
  const [toast, setToast] = useState(null);
  const [highlight, setHighlight] = useState(null);

  const notify = useCallback((text) => {
    const id = Date.now();
    setToast({ id, text });
    setTimeout(() => setToast((t) => (t && t.id === id ? null : t)), 3200);
  }, []);

  const onSearch = (dest, people) => {
    setHighlight(dest.id);
    notify(`${dest.days}-day trips to ${dest.place} for ${people} — from $${(dest.price * people).toLocaleString()}`);
    document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setHighlight(null), 6000);
  };

  return (
    <div className="App relative">
      <Header />
      <main>
        <Slider />
        <Booking onSearch={onSearch} />
        <Destinations highlight={highlight} />
        <Moods />
        <Stats />
        <Journey />
        <Stories />
        <Pricing />
        <Postcard notify={notify} />
      </main>
      <Footer />
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4" role="status" aria-live="polite">
        {toast && (
          <div key={toast.id} className="toast pointer-events-auto rounded-full bg-paper px-6 py-3.5 font-semibold text-ink shadow-2xl ring-1 ring-ink/10">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-coral align-middle" />{toast.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
