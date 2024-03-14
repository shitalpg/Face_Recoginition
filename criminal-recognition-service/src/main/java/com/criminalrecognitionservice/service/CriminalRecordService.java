

package com.criminalrecognitionservice.service;

import java.util.List;

import com.criminalrecognitionservice.dto.CriminalMatchReponse;
import com.criminalrecognitionservice.model.CriminalRecord;


public interface CriminalRecordService {

    public CriminalRecord insertCriminalRecord(CriminalRecord criminalRecord) throws Exception;

    public List<CriminalRecord> getAllCriminalRecord() throws Exception;
    
    public CriminalMatchReponse matchCriminalImage(String captureImageUri) throws Exception;

}
