"use client";

import { useState } from "react";

type ErrorResult = {
  family: string;
  confidence: string;
  core_error_line?: string;
  family_summary: string;
  what_failed: string;
  why_it_happens: string;
  where_to_look_first: string;
  refinement_note?: string;
  notes?: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_ERRORBUDDY_API_URL ?? "http://127.0.0.1:8000";

  export default function ErrorBuddyComponent() {
    const [rawError, setRawError] = useState("");
    const [result, setResult] = useState<ErrorResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
  
    async function handleTranslate() {
      setLoading(true);
      setErrorMsg("");
      setResult(null);
  
      try {
        const res = await fetch(`${API_BASE_URL}/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ error_text: rawError }),
        });
  
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
  
        const data: ErrorResult = await res.json();
        setResult(data);
      } catch (err) {
        if (err instanceof Error) {
          // Network-level failures are the most common here (backend not running, wrong URL, etc.)
          if (err.message === "Failed to fetch") {
            setErrorMsg(
              "Could not reach ErrorBuddy. Is the backend running and the API URL correct?"
            );
          } else {
            setErrorMsg(err.message);
          }
        } else {
          setErrorMsg("Request failed");
        }
      } finally {
        setLoading(false);
      }
    }

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "2.5rem 1.5rem",
        backgroundColor: "#0f172a", // slate-900
        color: "#e5e7eb", // gray-200
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          backgroundColor: "#020617", // slate-950
          borderRadius: 16,
          padding: "2rem",
          boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
          border: "1px solid rgba(148,163,184,0.3)",
        }}
      >
        <header style={{ marginBottom: "1.75rem" }}>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 600,
              marginBottom: "0.25rem",
              letterSpacing: "-0.03em",
            }}
          >
            ErrorBuddy
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
            Paste a Python traceback and get a clear, actionable explanation.
          </p>
        </header>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <section>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              Traceback
            </label>

            <textarea
              value={rawError}
              onChange={(e) => setRawError(e.target.value)}
              rows={10}
              style={{
                width: "100%",
                fontFamily:
                  "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                fontSize: "0.85rem",
                lineHeight: 1.5,
                padding: "0.9rem 1rem",
                borderRadius: 10,
                border: "1px solid rgba(148,163,184,0.5)",
                backgroundColor: "#020617",
                color: "#e5e7eb",
                resize: "vertical",
                outline: "none",
                boxShadow: "0 0 0 1px transparent",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "0.75rem",
                gap: "0.75rem",
              }}
            >
              <button
                onClick={handleTranslate}
                disabled={loading || !rawError.trim()}
                style={{
                  padding: "0.6rem 1.4rem",
                  borderRadius: 999,
                  border: "none",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  cursor:
                    loading || !rawError.trim() ? "not-allowed" : "pointer",
                  background:
                    loading || !rawError.trim()
                      ? "#1f2937"
                      : "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  color: "#f9fafb",
                  boxShadow:
                    loading || !rawError.trim()
                      ? "none"
                      : "0 12px 25px rgba(56,189,248,0.35)",
                  transition:
                    "transform 0.08s ease-out, box-shadow 0.08s ease-out, filter 0.08s ease-out",
                }}
              >
                {loading ? "Translating…" : "Explain this error"}
              </button>

              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#6b7280",
                  whiteSpace: "nowrap",
                }}
              >
                Your traceback never leaves your machine.
              </span>
            </div>

            {errorMsg && (
              <p
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.85rem",
                  color: "#fecaca",
                }}
              >
                {errorMsg}
              </p>
            )}
          </section>

          {result && (
            <section
              style={{
                padding: "1.4rem 1.5rem",
                borderRadius: 14,
                background:
                  "radial-gradient(circle at top left, rgba(56,189,248,0.16), transparent 55%), rgba(15,23,42,0.98)",
                border: "1px solid rgba(59,130,246,0.55)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "1rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#93c5fd",
                      marginBottom: 4,
                    }}
                  >
                    Error family
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {result.family}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.25rem 0.6rem",
                    borderRadius: 999,
                    backgroundColor: "rgba(22,163,74,0.15)",
                    color: "#bbf7d0",
                    border: "1px solid rgba(22,163,74,0.6)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Confidence: {result.confidence}
                </div>
              </div>

              {result.core_error_line && (
                <div
                  style={{
                    padding: "0.6rem 0.75rem",
                    borderRadius: 10,
                    backgroundColor: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.4)",
                    fontSize: "0.8rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#9ca3af",
                      marginBottom: 4,
                    }}
                  >
                    Core error line
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                      color: "#e5e7eb",
                      overflowX: "auto",
                    }}
                  >
                    {result.core_error_line}
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    borderTop: "1px solid rgba(55,65,81,0.9)",
                    paddingTop: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#9ca3af",
                      marginBottom: 4,
                    }}
                  >
                    Summary
                  </div>
                  <div style={{ fontSize: "0.9rem" }}>
                    {result.family_summary}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#9ca3af",
                      marginBottom: 4,
                    }}
                  >
                    What failed
                  </div>
                  <div style={{ fontSize: "0.9rem" }}>{result.what_failed}</div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#9ca3af",
                      marginBottom: 4,
                    }}
                  >
                    Why it usually happens
                  </div>
                  <div style={{ fontSize: "0.9rem" }}>
                    {result.why_it_happens}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#9ca3af",
                      marginBottom: 4,
                    }}
                  >
                    Where to look first
                  </div>
                  <div style={{ fontSize: "0.9rem" }}>
                    {result.where_to_look_first}
                  </div>
                </div>
              </div>

              {(result.refinement_note || result.notes) && (
                <div
                  style={{
                    marginTop: "0.25rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px dashed rgba(75,85,99,0.9)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {result.refinement_note && (
                    <div style={{ fontSize: "0.85rem", color: "#e5e7eb" }}>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#93c5fd",
                          marginRight: 6,
                        }}
                      >
                        Note
                      </span>
                      {result.refinement_note}
                    </div>
                  )}

                  {result.notes && (
                    <div style={{ fontSize: "0.85rem", color: "#e5e7eb" }}>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#a5b4fc",
                          marginRight: 6,
                        }}
                      >
                        General
                      </span>
                      {result.notes}
                    </div>
                  )}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}