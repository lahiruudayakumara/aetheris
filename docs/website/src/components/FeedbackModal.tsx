import React, { useState } from 'react';

interface FeedbackModalProps {
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        onClose();
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      }, 2500);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-card">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        {formSubmitted ? (
          <div className="form-success-message">
            <div className="form-success-icon">✓</div>
            <h3 className="modal-title">Feedback Submitted!</h3>
            <p className="modal-subtitle">Thank you for helping us improve Aetheris. Your suggestion has been recorded.</p>
          </div>
        ) : (
          <>
            <h3 className="modal-title">Submit Feedback & Ideas</h3>
            <p className="modal-subtitle">Have a suggestion for our compiler or custom runtime support? Let us know!</p>
            <form className="modal-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  required 
                  className="form-input" 
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  required 
                  className="form-input" 
                  placeholder="name@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Feedback / Feature Idea</label>
                <textarea 
                  className="form-input form-textarea" 
                  required
                  placeholder="I would love to see Aetheris support..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                />
              </div>
              <button type="submit" className="form-submit-btn">
                Submit Suggestion
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
