import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestAccountReactivation } from '../api/authapi';

interface DeletedAccountMessageProps {
  email: string;
  onClose: () => void;
}

const DeletedAccountMessage: React.FC<DeletedAccountMessageProps> = ({ email, onClose }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReactivationRequest = async () => {
    try {
      await requestAccountReactivation(email);
      setRequestSent(true);
      setError(null);
    } catch (err) {
      setError('Failed to send reactivation request. Please try again later.');
    }
  };

  return (
    <div className="deleted-account-message">
      <h2>Account Deleted</h2>
      <p>This account has been marked as deleted.</p>
      
      {!requestSent ? (
        <div>
          <p>If you believe this is a mistake, you can request reactivation:</p>
          <button 
            onClick={handleReactivationRequest}
            className="btn btn-primary"
          >
            Request Reactivation
          </button>
        </div>
      ) : (
        <p className="success-message">
          Reactivation request has been sent. Please wait for the administrator to review your request.
        </p>
      )}

      {error && <p className="error-message">{error}</p>}

      <div className="mt-3">
        <Link to="/login" onClick={onClose}>Return to Login</Link>
      </div>
    </div>
  );
};

export default DeletedAccountMessage;
