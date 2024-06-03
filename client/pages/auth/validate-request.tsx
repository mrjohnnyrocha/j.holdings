import React from 'react';
import styles from '../../styles/auth/validate-request.module.css';

const ValidateRequest: React.FC = () => {
  return (
    <div className={styles.localClassName}>
      <h1>Validate Request</h1>
      <p>Please check your email to validate your request.</p>
    </div>
  );
};

export default ValidateRequest;
