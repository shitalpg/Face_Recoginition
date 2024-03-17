import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

import CriminalRecord from './models/CriminalRecord.js';
import multer from "multer";
import MissingPersonRecord from "./models/MissingPerson.js";


const app = express()
app.use(express.json());


async function connectMongoDB() {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log("Connected to MongoDB📦");
    }
}
connectMongoDB();



// user signup 
app.post('/signup', async (req, res) => {
    const { name, address, mobile, email, password, gender } = req.body;
    try {
        const newUser = new User({
            name,
            address,
            mobile,
            email,
            password,
            gender

        })

        const savedUser = await newUser.save();

        res.json({
            success: true,
            data: savedUser,
            message: 'successfully SignUp'
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })

    }
});


// user login
app.post('/login', async (req, res) => {
    const { email, password, mobile, name } = req.body;

    const user = await User.findOne({ email, password }).select('email name mobile');

    if (user == null) {
        return res.json({
            success: false,
            message: "Login failed..!"
        }
        )
    }
    res.json({
        success: true,
        data: user,
        message: "Login successfully..!"
    }
    )
});

// criminal form api

app.post("/criminalRecord", async (req, res) => {
    const {
       criminalID,
        address,
        name,
        state,
        image,
        crimeInvloved,
        dob,
        arrestedDate,
        age,
        gender
    } = req.body;
   
        const criminalRecord = new CriminalRecord({
           criminalID,
            address,
            name,
            state,
           image,
            crimeInvloved,
            dob,
            arrestedDate,
            age,
            gender
        });

    
        try {
        const savedCriminalRecord = await criminalRecord.save() 
        
        
        res.json({
            success: true,
            data: savedCriminalRecord,
            message: "Criminal Record saved successfully..!"
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
});

// get criminal record 

app.get('/criminalRecords',async(req,res)=>{
    const criminalRecords = await CriminalRecord.find();

    res.json({
        success:true,
        data:criminalRecords,
        message:'Criminal Record fetched successfully'
    })
});


// delete criminal data 

app.delete('/criminalRecord/:_id', async (req, res) => {
    const { _id } = req.params;
    try{
     await CriminalRecord.deleteOne({ _id : _id });

    res.json({
        success: true,
        message: `Successfully deleted Criminal data`
    });
}  catch (err) {
    res.json({
        success: false,
        message: err.message
    })
}

});

// update criminal data

app.put('/criminalRecord/:_id', async (req, res) => {
    const { _id } = req.params;
    const {  criminalID, address, name, state, photo, crimeInvloved, dob, arrestedDate, age, gender } = req.body;

    await CriminalRecord.updateOne( { _id: _id },
      {
        $set: { criminalID, address, name, state, photo, crimeInvloved, dob, arrestedDate, age, gender },
      }
    );

    try {
      const updateCriminalData = await CriminalRecord.findOne({ _id: _id });
      return res.status(200).json({
        success: true,
        data: updateCriminalData ,
        message: "Criminal Data updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }) ;


// missing person form api

app.post("/missingPerson", async (req, res) => {
    const {
        address,
        name,
        state,
        image,
        dob,
        age,
        gender
    } = req.body;
   
        const missingPersonRecord = new MissingPersonRecord({
            address,
            name,
            state,
            image,
            dob,
            age,
            gender
        });


        try {
        const savedMissingPersonRecord = await missingPersonRecord.save() 
      
        
        res.json({
            success: true,
            data: savedMissingPersonRecord,
            message: "Missing person Record saved successfully"
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
});

// get missing person record 

app.get('/missingPersons',async(req,res)=>{
    const missingPerson = await MissingPersonRecord.find();

    res.json({
        success:true,
        data:missingPerson,
        message:'Missing person Record fetched successfully'
    })
});


// delete missing person 

app.delete('/missingperson/:_id', async (req, res) => {
    const { _id } = req.params;
    try{
     await MissingPersonRecord.deleteOne({ _id : _id });

    res.json({
        success: true,
        message: `Successfully deleted missing person's data`
    });
}  catch (err) {
    res.json({
        success: false,
        message: err.message
    })
}

})


// //face detection
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// app.get('/api/match-face', upload.single('image'), async (req, res) => {
//     // const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
  
//     try {
//     //   await client.connect();
//     //   const database = client.db('criminal-face-recognition');
//     //   const collection = database.collection('criminalrecords');
  
//     const faceDescriptor = faceDescriptor(req.file.buffer); // Get face descriptor from the uploaded image

//     const storedDescriptors = await collection.find({}, { projection: { _id: 0, faceDescriptor: 1 } }).toArray();

//     const isMatched = storedDescriptors.some((storedDescriptor) => {
//       // Compare face descriptors using your matching logic (e.g., Euclidean distance)
//       const distance = faceapi.euclideanDistance(faceDescriptor, storedDescriptor.faceDescriptor);
//       return distance < 0.6; // Adjust the threshold based on your use case
//     });

//       res.json({ isMatched: true });
//     } catch (error) {
//       console.error('Error matching face:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } finally {
//       await client.close();
//     }
//   })



  


async function loadModelsAndStartWebcam() {
    try {
        await Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        startWebcam();
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

// Start webcam and perform face detection
function startWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
            videoRef.current.srcObject = stream;

            videoRef.current.addEventListener('play', async () => {
                // Create canvas for drawing
                canvas = faceapi.createCanvasFromMedia(videoRef.current);
                canvasRef.current.append(canvas);

                // Match canvas dimensions with video dimensions
                const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
                faceapi.matchDimensions(canvas, displaySize);

                // Perform face detection in a loop
                setInterval(async () => {
                    const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                        // .withFaceLandmarks()
                        .withFaceExpressions();

                    // Draw results on canvas
                    if (detections) {
                        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                        faceapi.draw.drawDetections(canvas, faceapi.resizeResults([detections], displaySize));
                        // faceapi.draw.drawFaceLandmarks(canvas, faceapi.resizeResults([detections], displaySize));
                        faceapi.draw.drawFaceExpressions(canvas, faceapi.resizeResults([detections], displaySize));
                    }
                }, 100);
            });
        })
        .catch((error) => {
            console.error('Error accessing webcam:', error);
        });
    // This function should start the webcam and perform face detection
}

// Match faces with image using data from the database
async function matchFacesWithImage(currentImage) {
    try {
        // Perform face detection on the current image
        const detections = await faceapi.detectSingleFace(currentImage).withFaceDescriptor();

        // Fetch face recognition data from the database
        const savedDescriptors = await FaceRecognitionData.find({}, 'faceDescriptor');

        // Compare current face descriptor with saved descriptors
        for (const savedDescriptor of savedDescriptors) {
            const distance = faceapi.euclideanDistance(detections.descriptor, savedDescriptor.faceDescriptor);
            if (distance < 0.6) { // Adjust the threshold as needed
                return { success: true, message: 'Face match found' };
            }
        }
        return { success: false, message: 'No match found' };
    } catch (error) {
        console.error('Error matching faces with image:', error);
        return { success: false, message: 'Internal server error' };
    }
}

// API endpoint to find face recognition data
app.post('/find-face-recognition-data', async (req, res) => {
    try {
        const currentImage = req.body.image; // Assuming the image is sent in the request body

        // Call function to match faces with image using data from the database
        const matchResult = await matchFacesWithImage(currentImage);

        if (matchResult.success) {
            res.status(200).json({ success: true, message: 'Face match successful' });
        } else {
            res.status(200).json({ success: false, message: 'No match found' });
        }
    } catch (error) {
        console.error('Error finding face recognition data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The server is Running on Port ${PORT} 🚀`);
});


  
  