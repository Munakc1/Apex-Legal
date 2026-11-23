export default function NotFound() {
  return (
    <div className="w" style={{ padding: "80px 20px", textAlign: "center" }}>
      <h1 style={{ color: "var(--ac)", fontSize: "36px", marginBottom: "12px" }}>
        Page Not Found
      </h1>
      <p style={{ color: "var(--mu)", fontSize: "16px", marginBottom: "24px" }}>
        The requested page does not exist.
      </p>
      <a href="/" className="btn">
        Return to Home
      </a>
    </div>
  );
}
