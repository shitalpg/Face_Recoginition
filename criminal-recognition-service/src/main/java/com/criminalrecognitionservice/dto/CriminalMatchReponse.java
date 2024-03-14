
package com.criminalrecognitionservice.dto;

import com.criminalrecognitionservice.model.CriminalRecord;


public class CriminalMatchReponse {

    private String alertMessage;
    private CriminalRecord criminalRecord;

    public CriminalMatchReponse() {
        super();
        // TODO Auto-generated constructor stub
    }

    public CriminalMatchReponse(String alertMessage, CriminalRecord criminalRecord) {
        super();
        this.alertMessage = alertMessage;
        this.criminalRecord = criminalRecord;
    }

    public String getAlertMessage() {
        return alertMessage;
    }

    public void setAlertMessage(String alertMessage) {
        this.alertMessage = alertMessage;
    }

    public CriminalRecord getCriminalRecord() {
        return criminalRecord;
    }

    public void setCriminalRecord(CriminalRecord criminalRecord) {
        this.criminalRecord = criminalRecord;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("CriminalMatchReponse [alertMessage=").append(alertMessage).append(", criminalRecord=").append(criminalRecord).append("]");
        return builder.toString();
    }

}
