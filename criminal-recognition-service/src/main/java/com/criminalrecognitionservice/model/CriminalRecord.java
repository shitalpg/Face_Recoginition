

package com.criminalrecognitionservice.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "criminalrecords")
public class CriminalRecord {

    @Id
    private ObjectId _id;
    private int criminalID;
    private String address;
    private String name;
    private String state;
    private String dob;
    private String arrestedDate;
    private String crimeInvloved;
    private String image;
    private int age;
    private String gender;
    private String createdAt;
    private String updatedAt;

    public CriminalRecord() {
        super();
        // TODO Auto-generated constructor stub
    }

    public CriminalRecord(int criminalID, String address, String name, String state, String dob, String arrestedDate, String crimeInvloved,
            String image, int age, String gender, String createdAt, String updatedAt) {
        super();
        this._id=_id;
        this.criminalID = criminalID;
        this.address = address;
        this.name = name;
        this.state = state;
        this.dob = dob;
        this.arrestedDate = arrestedDate;
        this.crimeInvloved = crimeInvloved;
        this.image = image;
        this.age = age;
        this.gender = gender;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    

    public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCriminalID() {
        return criminalID;
    }

    public void setCriminalID(int criminalID) {
        this.criminalID = criminalID;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getArrestedDate() {
        return arrestedDate;
    }

    public void setArrestedDate(String arrestedDate) {
        this.arrestedDate = arrestedDate;
    }

    public String getCrimeInvloved() {
        return crimeInvloved;
    }

    public void setCrimeInvloved(String crimeInvloved) {
        this.crimeInvloved = crimeInvloved;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("CriminalRecord [criminalID=").append(criminalID).append(", address=").append(address).append(", Name=").append(name)
                .append(", state=").append(state).append(", dob=").append(dob).append(", arrestedDate=").append(arrestedDate)
                .append(", crimeInvloved=").append(crimeInvloved).append(", image=").append(image).append(", age=").append(age).append(", gender=")
                .append(gender).append(", createdAt=").append(createdAt).append(", updatedAt=").append(updatedAt).append("]");
        return builder.toString();
    }

}
