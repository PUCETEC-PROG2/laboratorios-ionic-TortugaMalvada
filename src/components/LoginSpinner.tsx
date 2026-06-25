import React from "react";
import './LoadingSpinner.css';
import { IonSpinner } from "@ionic/react";

const LoginSpinner: React.FC = () => {
    return (
        <div className="loading-overlay">
            <IonSpinner name="circular" color="primary" className="loading-spinner" />
        </div>
    );
};

export default LoginSpinner;