

package com.criminalrecognitionservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.criminalrecognitionservice.dto.CriminalMatchReponse;
import com.criminalrecognitionservice.model.CriminalRecord;
import com.criminalrecognitionservice.service.CriminalRecordService;



@RestController
@CrossOrigin(origins="http://localhost:3001")
@RequestMapping("/criminal-record")
public class CriminalRecordController {

    
    @Autowired
    private CriminalRecordService criminalRecordService;

    @PostMapping("/insert")
    public ResponseEntity<?> addStudent(@RequestBody CriminalRecord criminalRecord) throws Exception {
        CriminalRecord savedCriminalRecord= this.criminalRecordService.insertCriminalRecord(criminalRecord);
        return ResponseEntity.ok(savedCriminalRecord);
    }

    @GetMapping("/get-all-criminal")
    public ResponseEntity<?> getStudent() throws Exception {
        List<CriminalRecord> allCriminalRecord = this.criminalRecordService.getAllCriminalRecord();
        return ResponseEntity.ok(allCriminalRecord);
    }
    
    @PostMapping("/criminalrecords")
    public ResponseEntity<?> getStudent(@RequestParam String matchCriminalImage) throws Exception {
         CriminalMatchReponse criminalMatchReponse = this.criminalRecordService.matchCriminalImage(matchCriminalImage);
        return ResponseEntity.ok(criminalMatchReponse);
    }
}
