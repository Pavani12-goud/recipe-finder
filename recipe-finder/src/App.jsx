import { Link, Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="shell">
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-mark">P&amp;P</span>
          <span className="brand-name">Pantry &amp; Plate</span>
        </Link>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        Recipe data from TheMealDB · built with React &amp; React Router
      </footer>
    </div>
  );
}
