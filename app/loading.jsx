export default function Loading() {
  return <div className="page-wrap route-page route-loading" aria-live="polite" aria-busy="true" aria-label="Loading training page">
    <span className="loading-label">Loading training page…</span>
    <div className="loading-line loading-line-wide" />
    <div className="loading-line loading-line-short" />
    <div className="loading-panel" />
    <div className="loading-panel loading-panel-small" />
  </div>;
}
