import React, { useState, useEffect } from "react";
import { Header } from "../../components/SupportTickets/Header";
import { TicketsTable } from "../../components/SupportTickets/TicketsTable";
import { TicketModal } from "../../components/SupportTickets/TicketModal";
import "./styles.css";

const MOCK_TICKETS = [
  {
    id: "TK-2024-001",
    subject: "Missing Item from Order #JC45692",
    category: "Orders & Shipping",
    status: "Open",
    statusColor: "#FF9ECD",
    priority: "High",
    priorityColor: "#FF4B4B",
    lastUpdate: "2 hours ago",
    description:
      "Order arrived but missing one Bashful Bunny Medium. Order was placed on January 10th and received January 15th.",
    updates: [
      {
        message: "Ticket created",
        time: "2024-01-15 09:15 AM",
      },
      {
        message: "Support team reviewing order details",
        time: "2024-01-15 10:30 AM",
      },
    ],
  },
  {
    id: "TK-2024-002",
    subject: "Washing Instructions for Bashful Dragon",
    category: "Product Care",
    status: "Closed",
    statusColor: "#00C48C",
    priority: "Normal",
    priorityColor: "#FFB800",
    lastUpdate: "3 days ago",
  },
  {
    id: "TK-2024-003",
    subject: "Return Request for Damaged Item",
    category: "Returns",
    status: "In Progress",
    statusColor: "#FFB800",
    priority: "Normal",
    priorityColor: "#FFB800",
    lastUpdate: "1 day ago",
  },
];

export const SupportTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [lastFocusedElement, setLastFocusedElement] = useState(null);

  const toggleModal = (ticket = null) => {
    if (!showModal) {
      setLastFocusedElement(document.activeElement);
      setSelectedTicket(ticket);
      setShowModal(true);
    } else {
      setSelectedTicket(null);
      setShowModal(false);
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        toggleModal();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [showModal]);

  return (
    <div className="tickets-container">
      <Header />

      <main className="main-content">
        <div className="content-header">
          <h1 className="page-title">My Tickets</h1>
          <button className="new-ticket-btn">New Ticket</button>
        </div>

        <section className="tickets-section">
          <div className="search-filters">
            <input
              type="text"
              placeholder="Search tickets..."
              className="search-input"
            />
            <div className="status-filter">All Status</div>
          </div>

          <TicketsTable tickets={MOCK_TICKETS} onViewDetails={toggleModal} />
        </section>
      </main>

      {showModal && (
        <TicketModal ticket={selectedTicket} onClose={() => toggleModal()} />
      )}

      <div className="chat-widget">
        <div className="chat-button-wrapper">
          <button className="chat-button">💬</button>
          <div className="notification-badge">2</div>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
