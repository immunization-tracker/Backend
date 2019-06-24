# Backend
The backend of the Immunization Tracker website

## Documentation

### Doctors' Login

    Link: https://immu-tracker2.herokuapp.com/api/staff/login
    Parameter:
        username, password
    Note: 
        Token will be provided

### GET List of All Doctors

    Link: https://immu-tracker2.herokuapp.com/api/doctors

### GET List of All Records

    Link: https://immu-tracker2.herokuapp.com/api/records
    
### GET list of Records by Doctors
    
    Link: https://immu-tracker2.herokuapp.com/api/:doctor_id/records
    Parameter:  doctor_id


### POST a record file

    Link: https://immu-tracker2.herokuapp.com/api/records
    Parameter:
        patient_name
        doctor_id
        DOB (optional)
        patient_id (optional)

### PUT a record file

    Link: https://immu-tracker2.herokuapp.com/api/:id/records
    Parameter:
        id,
        patient_name
        patient_id
        DOB

### DELETE a record file

    Link: https://immu-tracker2.herokuapp.com/api/:id/records
    Parameter:
        id
        

  
