import React from 'react';
import styles from '../../styles/auth/validate-request.module.css';

const ValidateRequest: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Validate Your Request</h1>
      <p>We have sent you an email to validate your request. Please check your inbox and follow the instructions.</p>
    </div>
  );
};

export default ValidateRequest;
