

package com.criminalrecognitionservice.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.criminalrecognitionservice.model.CriminalRecord;


public interface CriminalRecordRepository extends MongoRepository<CriminalRecord, ObjectId> {

}
