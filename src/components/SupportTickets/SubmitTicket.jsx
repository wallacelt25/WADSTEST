import React, { useState } from "react";
import "./SubmitTicket.css";

function SubmitTicket() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [ticketRef, setTicketRef] = useState("");

  function submitTicket() {
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    setTicketRef(`JC-${timestamp}-${random}`);
    setIsSuccessModalOpen(true);
  }

  return (
    <div className="submit-ticket">
      <div className="submit-ticket__container">
        <div className="submit-ticket__header">
          <div className="submit-ticket__divider-container">
            <div className="submit-ticket__divider" />
            <div className="submit-ticket__divider" />
          </div>

          <div className="submit-ticket__nav">
            <div className="submit-ticket__brand">
              <div className="submit-ticket__logo" />
              <div className="submit-ticket__brand-name">Jellycat Support</div>
            </div>

            <div className="submit-ticket__nav-links">
              <div className="submit-ticket__nav-item">Dashboard</div>
              <div className="submit-ticket__nav-item">Help Center</div>
              <div className="submit-ticket__nav-item">My Tickets</div>
            </div>

            <div className="submit-ticket__user">
              <div className="submit-ticket__user-avatar">JS</div>
              <div className="submit-ticket__user-name">John Smith</div>
            </div>
          </div>
        </div>

        <div className="submit-ticket__separator" />

        <div className="submit-ticket__content">
          <h1 className="submit-ticket__title">Submit a Ticket</h1>
          <p className="submit-ticket__description">
            Please provide detailed information about your issue to help us
            assist you better.
          </p>

          <div className="submit-ticket__form">
            <div className="submit-ticket__form-row">
              <div className="submit-ticket__form-group">
                <label className="submit-ticket__label">Category</label>
                <div className="submit-ticket__select">Select Category</div>
              </div>

              <div className="submit-ticket__form-group">
                <label className="submit-ticket__label">Sub-Category</label>
                <div className="submit-ticket__select">Select Sub-Category</div>
              </div>
            </div>

            <div className="submit-ticket__form-group">
              <label className="submit-ticket__label">Subject</label>
              <div className="submit-ticket__input">
                Brief summary of your issue
              </div>
            </div>

            <div className="submit-ticket__form-group">
              <label className="submit-ticket__label">Description</label>
              <div className="submit-ticket__textarea" />
            </div>

            <div className="submit-ticket__form-footer">
              <div className="submit-ticket__priority">
                <label className="submit-ticket__label">Ticket Priority</label>
                <div className="submit-ticket__priority-indicator">
                  <div className="submit-ticket__priority-dot submit-ticket__priority-dot--normal" />
                  <span>Normal</span>
                </div>
              </div>

              <div className="submit-ticket__actions">
                <button className="submit-ticket__button submit-ticket__button--secondary">
                  Cancel
                </button>
                <button
                  className="submit-ticket__button submit-ticket__button--primary"
                  onClick={submitTicket}
                >
                  Submit Ticket
                </button>
              </div>
            </div>
          </div>

          <div className="submit-ticket__info-section">
            <div className="submit-ticket__priority-guide">
              <h3 className="submit-ticket__priority-guide-title">
                Priority Guidelines
              </h3>

              <div className="submit-ticket__priority-item">
                <div className="submit-ticket__priority-dot submit-ticket__priority-dot--high" />
                <span>
                  High - Critical issues affecting service or security
                </span>
              </div>

              <div className="submit-ticket__priority-item">
                <div className="submit-ticket__priority-dot submit-ticket__priority-dot--normal" />
                <span>Normal - Standard support requests</span>
              </div>

              <div className="submit-ticket__priority-item">
                <div className="submit-ticket__priority-dot submit-ticket__priority-dot--low" />
                <span>Low - General inquiries and information requests</span>
              </div>
            </div>

            <div className="submit-ticket__chat-widget">
              <div className="submit-ticket__chat-icon">💬</div>
              <div className="submit-ticket__chat-badge">2</div>
            </div>
          </div>
        </div>
      </div>

      {isSuccessModalOpen && (
        <div className="submit-ticket__modal-overlay">
          <div className="submit-ticket__modal">
            <div className="submit-ticket__modal-icon">
              <span>✓</span>
            </div>

            <h3 className="submit-ticket__modal-title">
              Ticket Submitted Successfully!
            </h3>

            <div className="submit-ticket__modal-content">
              <span>Your ticket reference number is:</span>
              <div className="submit-ticket__modal-reference">{ticketRef}</div>
              <span>
                Please save this number for future reference. We'll review your
                ticket and get back to you shortly.
              </span>
            </div>

            <button
              className="submit-ticket__button submit-ticket__button--primary"
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmitTicket;
