export default function FloatingActions() {
  return (
    <aside className="floating-actions" aria-label="Quick actions">
      <a className="floating-action floating-call" href="tel:+12066019801" aria-label="Call HONGXU Wellness now">
        <span>Call now</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.3 3.8 9.8 8c.3.5.2 1.1-.2 1.5l-1.3 1.3c1 2.1 2.8 3.9 4.9 4.9l1.3-1.3c.4-.4 1-.5 1.5-.2l4.2 2.5c.5.3.7.9.5 1.4l-.7 2c-.2.6-.8.9-1.4.9C10 20.7 3.3 14 3 5.4c0-.6.3-1.2.9-1.4l2-.7c.5-.2 1.1 0 1.4.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </a>
      <a className="floating-action floating-top" href="#top" aria-label="Back to top">
        <span>Back to top</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19V5m-6 6 6-6 6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </a>
    </aside>
  );
}
