import React from "react";
import "./styles.css";

export const TicketModal = ({ ticket, onClose }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      const focusableElements = event.currentTarget.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!ticket) return null;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={handleOverlayClick}
    >
      <div
        id="ticket-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabIndex="-1"
        onKeyDown={handleKeyDown}
        className="modal-content"
      >
        <button
          className="modal-close"
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>

        <h2 id="modal-title" className="modal-title">
          {ticket.subject}
        </h2>

        <div className="ticket-details-grid">
          <div>
            <div className="detail-label">Ticket ID</div>
            <div className="detail-value">{ticket.id}</div>
          </div>

          <div>
            <div className="detail-label">Category</div>
            <div className="category-badge">{ticket.category}</div>
          </div>

          <div>
            <div className="detail-label">Status</div>
            <div style={{ color: ticket.statusColor }}>{ticket.status}</div>
          </div>

          <div>
            <div className="detail-label">Priority</div>
            <div style={{ color: ticket.priorityColor }}>{ticket.priority}</div>
          </div>
        </div>

        <div className="ticket-description">
          <div className="description-label">Description</div>
          <div id="modal-description" className="description-text">
            {ticket.description}
          </div>
        </div>

        <div>
          <div className="updates-section">Ticket Updates</div>
          <div className="update-list">
            {ticket.updates?.map((update, index) => (
              <div key={index} className="update-item">
                <div className="update-dot" />
                <div>
                  <div className="update-content">{update.message}</div>
                  <div className="update-time">{update.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
