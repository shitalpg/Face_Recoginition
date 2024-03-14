/* 
 * Copyright (C) Procurant USA LLC - All Rights Reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and Confidential.
*
* File name: CriminalRecordServiceImpl.java
* Purpose: [What this file is for]
*
* Created on: 10-Feb-2024 10:29:03 am
* Created by: Hitesh Ahire
*/

package com.criminalrecognitionservice.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.criminalrecognitionservice.Repository.CriminalRecordRepository;
import com.criminalrecognitionservice.dto.CriminalMatchReponse;
import com.criminalrecognitionservice.model.CriminalRecord;
import com.criminalrecognitionservice.service.CriminalRecordService;

/*
*** @author Hitesh Ahire
*/

@Service
public class CriminalRecordServiceImpl implements CriminalRecordService {

    @Autowired
    private CriminalRecordRepository criminalRecordRepository;

    @Override
    public CriminalRecord insertCriminalRecord(CriminalRecord criminalRecord) throws Exception {
        return this.criminalRecordRepository.save(criminalRecord);
    }

    @Override
    public List<CriminalRecord> getAllCriminalRecord() throws Exception {
        List<CriminalRecord> criminalRecordList = this.criminalRecordRepository.findAll();
        return criminalRecordList;
    }

    @Override
    public CriminalMatchReponse matchCriminalImage(String captureImageUri) throws Exception {
        CriminalMatchReponse reponse = new CriminalMatchReponse();

        List<CriminalRecord> criminalRecordList = criminalRecordRepository.findAll();
        //face logic
       Optional<CriminalRecord> criminalRecordListfilter = criminalRecordList.stream().filter(x -> x.getImage().equals(captureImageUri)).findFirst();

       
        if (criminalRecordListfilter.isPresent()) {
            reponse.setAlertMessage("Criminal Face Matched."+criminalRecordListfilter.get());
            reponse.setCriminalRecord(criminalRecordListfilter.get());
        } else {
            reponse.setAlertMessage("Criminal Face Not Matched.");
        }

        return reponse;
    }

}
