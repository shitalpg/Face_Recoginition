// // Install necessary packages: axios for HTTP requests
// // npm install axios

// // // App.js

// // import AlertComponent from './alert';

// // const App = () => {
// //   const webcamRef = useRef(null);
// //   const [recognized, setRecognized] = useState(false);

// //   const capture = async () => {
// //     const image = webcamRef.current.getScreenshot();

// //     // Send the captured image to the backend for face recognition
// //     try {
// //       const response = await fetch('http://localhost:8080/recognizeFace', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ image }),
// //       });

// //       const result = await response.json();
// //       setRecognized(result.recognized);
// //     } catch (error) {
// //       console.error('Error capturing image:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Webcam
// //         audio={false}
// //         ref={webcamRef}
// //         screenshotFormat="image/jpeg"
// //       />
// //       <button onClick={capture}>Capture</button>
// //       {recognized && <div>Face Recognized!</div>}
// //     </div>
// //   );
// // };

// // export default App;

import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const FaceRecognitionComponent = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    sendImageToBackend(imageSrc);
  }, []);

  const sendImageToBackend = async (imageData) => {
    try {
      const response = await axios.post('http://localhost:8081/api/compare-faces', {
        image: imageData,
      });

      if (response.data.matched) {
        alert('Face Matched! Criminal Detected!');
      } else {
        alert('Face Not Matched! No Criminal Detected.');
      }
    } catch (error) {
      console.error('Error sending image to backend:', error);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture</button>
      {imageSrc && <img src={imageSrc} alt="Captured Face" />}
    </div>
  );
};

export default FaceRecognitionComponent;

// // Install necessary dependencies: npm install axios react-webcam
// // import React, { useState, useRef } from 'react';
// // import Webcam from 'react-webcam';
// // import axios from 'axios';

// // const FaceDetection = () => {
// //   const webcamRef = useRef(null);
// //   const [capturedFace, setCapturedFace] = useState(null);

// //   const capture = async () => {
// //     const imageSrc = webcamRef.current.getScreenshot();
// //     setCapturedFace(imageSrc);

// //     // Send the captured face to the backend
// //     try {
// //       const response = await axios.post('http://localhost:8081/api/faces', {
// //         capturedFace: imageSrc,
// //       });
      
// //       if (response.data.matched) {
// //         // Generate an alert or take any other action
// //         alert('Face matched!');
// //       }
// //     } catch (error) {
// //       console.error('Error comparing faces:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Webcam
// //         audio={false}
// //         ref={webcamRef}
// //         screenshotFormat="image/jpeg"
// //       />
// //       <button onClick={capture}>Capture Face</button>
// //       {capturedFace && <img src={capturedFace} alt="Captured Face" />}
// //     </div>
// //   );
// // };

// // export default  FaceDetection;

// // import React, { useState } from 'react';
// // import Webcam from 'react-webcam';

// // const FaceDetection = () => {
// //   const [capturedImage, setCapturedImage] = useState(null);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [alertStatus, setAlertStatus] = useState('');

// //   const webcamRef = React.useRef(null);

// //   const capture = () => {
// //     const imageSrc = webcamRef.current.getScreenshot();
// //     setCapturedImage(imageSrc);
// //     setSelectedFile(null);

// //     // Send the captured image to the Spring Boot backend
// //     sendImageToBackend(imageSrc);
// //   };

// //   const handleFileChange = (event) => {
// //     const file = event.target.files[0];
// //     setSelectedFile(file);
// //     setCapturedImage(null);

// //     if (file) {
// //       // Read the selected file and send it to the Spring Boot backend
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         const imageSrc = reader.result;
// //         sendImageToBackend(imageSrc);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const sendImageToBackend = (imageSrc) => {
// //     fetch('http://localhost:8081/compare-images', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ imageSrc }),
// //     })
// //       .then(response => response.json())
// //       .then(data => setAlertStatus(data.alertStatus))
// //       .catch(error => console.error('Error:', error));
// //   };

// //   return (
// //     <div>
// //       <Webcam
// //         audio={false}
// //         ref={webcamRef}
// //         screenshotFormat="image/jpeg"
// //       />
// //       <button onClick={capture}>Capture Face</button>

// //       <input type="file" accept="image/*" onChange={handleFileChange} />
      
// //       {capturedImage && <img src={capturedImage} alt="Captured Face" />}
// //       {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected File" />}

// //       {alertStatus && <p>{alertStatus}</p>}
// //     </div>
// //   );
// // };

// // export default FaceDetection;


// // import React, { useState, useRef } from 'react';
// // import Webcam from 'react-webcam';
// // import swal from 'sweetalert';
// // import { useEffect } from 'react';
// // const FaceDetection = () => {
// //   const [capturedImage, setCapturedImage] = useState(null);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [alertMessage, setAlertMessage] = useState('');
 
// //   const webcamRef = useRef(null);

// //   const captureFace = () => {
// //     const imageSrc = webcamRef.current.getScreenshot();
// //     setCapturedImage(imageSrc);
// //   };

// //   const handleFileChange = (event) => {
// //     const file = event.target.files[0];
// //     setSelectedFile(file);

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       const imageSrc = reader.result;
// //       setCapturedImage(imageSrc);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   useEffect(() => {
// //     const getloggedInUser = JSON.parse(localStorage.getItem("user" || "{}"));

// //     if (!getloggedInUser) {
// //       swal({
// //         title: `👋 Hey Buddy ! `,
// //         text: "Please log in to access the add transaction page",
// //         icon: "warning",
// //       }).then(() => {
// //         window.location.href = "/login";
// //       });
// //     }
// //   }, []);

// //   const checkFaceMatch = () => {
      
// //     const base64Data = `https://i.ibb.co/Tm7dMWt/shital.jpg`; // Replace with your actual base64 encoded image data
       
// //     // Implement logic to send captured image to the Spring Boot backend
// //     fetch(`http://localhost:8080/criminal-record/criminalrecords?matchCriminalImage=${encodeURIComponent(base64Data)}`, 
    
// //     {
// //       method: 'POST',
// //       headers: {'Content-Type': 'application/json',},
// //       body: JSON.stringify({ capturedImage }),

// //     }


    
    
// //     )
// //       .then(
// //         response => response.json(),
// //         erro => {alert(erro)}
// //         )
// //       .then(data => setAlertMessage(data.alertMessage))
// //       .catch(error => console.error('Error:', error));



      
// //   };



// //   return (
// //     <div>
// //       <Webcam
// //         audio={false}
// //         ref={webcamRef}
// //         screenshotFormat="image/jpeg"
// //       />

// //       <input type="file" accept="image/*" onChange={handleFileChange} />


// //       <br></br>
// //       <br></br>

     

// //       <button onClick={captureFace} bgcolor='green'>CaptureFace</button>
// //       <br></br>
// //       <button onClick={checkFaceMatch} bgcolor='blue'>CheckFaceMatch</button>

// //       {capturedImage && <img src={capturedImage} alt="Captured Face" />}
// //       {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected File" />}

// //       {alertMessage && alert(alertMessage)}
// //     </div>
// //   );
// // };

// // export default FaceDetection;

// // src/components/FaceRecognitionCamera.js
// // import React, { useEffect, useRef, useState } from 'react';
// // import Webcam from 'react-webcam';
// // import * as faceapi from 'face-api.js';
// // import { fetch } from 'window';



// // const FaceRecognitionCamera = () => {
// //   const webcamRef = useRef(null);
// //   const [faces, setFaces] = useState([]);
// //   const [storedImage, setStoredImage] = useState(''); // Add your base64-encoded image here

// //   useEffect(() => {
// //     const loadModels = async () => {
// //       await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
// //       await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
// //       await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
// //     };

// //     loadModels();
// //   }, []);

// //   const detectFaces = async () => {
// //     const video = webcamRef.current.video;
// //     const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();

// //     setFaces(detections);

// //     // Compare with stored image
// //     if (storedImage) {
// //       const storedImageObj = await faceapi.bufferToImage(await faceapi.fetch(storedImage));
// //       const storedImageDetections = await faceapi.detectAllFaces(storedImageObj).withFaceLandmarks().withFaceDescriptors();

// //       if (detections.length > 0 && storedImageDetections.length > 0) {
// //         const faceMatcher = new faceapi.FaceMatcher(storedImageDetections);
// //         const matchedFaces = detections.filter((face) => faceMatcher.findBestMatch(face.descriptor).label !== 'unknown');

// //         if (matchedFaces.length > 0) {
// //           alert('Face matched!');
// //         }
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     const intervalId = setInterval(detectFaces, 1000); // Adjust the interval as needed

// //     return () => clearInterval(intervalId);
// //   }, [storedImage]);

// //   return (
// //     <div>
// //       <Webcam
// //         ref={webcamRef}
// //         mirrored={true}
// //         screenshotFormat="image/jpeg"
// //       />
// //       {faces.map((face, index) => (
// //         <div key={index} style={{ position: 'absolute', left: face.box.left, top: face.box.top, width: face.box.width, height: face.box.height, border: '2px solid red' }} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default FaceRecognitionCamera;

// // import { useRef, useEffect,useState} from 'react';
// // import './FaceDetection.css';
// // import * as faceapi from 'face-api.js';
// // import axios from 'axios';

// // function FaceDetection()  {
// //   const {data, setData} = useState([]);
// //   const videoRef = useRef();
// //   const canvasRef = useRef();

// //   useEffect(() => {
// //     startVideo();
// //     loadModels();
// //   }, []);

// //   const startVideo = () => {
// //     navigator.mediaDevices.getUserMedia({ video: true })
// //       .then((currentStream) => {
// //         videoRef.current.srcObject = currentStream;
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   };

// //   const loadModels = async () => {
// //     await Promise.all([
// //       faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
// //       faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
// //       faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
// //       faceapi.nets.faceExpressionNet.loadFromUri('/models')
// //     ]);

// //     faceMyDetect();
// //   };

// //   const faceMyDetect = async () => {
// //     setInterval(async () => {
// //       const detections = await faceapi.detectAllFaces(videoRef.current,
// //         new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

// //       canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
// //       faceapi.matchDimensions(canvasRef.current, {
// //         width: 940,
// //         height: 650
// //       });

// //       const resizedDetections = faceapi.resizeResults(detections, {
// //         width: 940,
// //         height: 650
// //       });

// //       faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
// //       faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
// //       faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

// //       // Assuming you have a stored image descriptor for face matching
// //       // Replace with your stored image descriptor
// //         const storedImageDescriptor =  await axios.get('/api/match-face');
       
    
// //       // Check if any face matches the stored image descriptor
// //       const match = resizedDetections.some((detection) =>
// //         faceapi.euclideanDistance(detection.descriptor, storedImageDescriptor) < 0.6
// //       );

// //       if (match) {
// //         alert('Face matched!'+setData(storedImageDescriptor?.data?.data));
          

// //         // Add any additional actions you want to perform when a match is found
// //       }
// //       else
// //       {
// //         alert('Face not matched');
// //       }

// //     }, 1000);
// //   };

// //   return (
// //     <div className="myapp">
// //       <h1>Face Detection</h1>
// //       <div className="appvideo">
// //         <video crossOrigin="anonymous" ref={videoRef} autoPlay />
// //       </div>
// //       <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />
// //       <div className='data-container'>
// //         {
// //           data?.map((obj, index) => {
// //             const { Name,
// //               _id,
// //               criminalID,
// //               age,
// //               arrestedDate,
// //               crimeInvloved,
// //               gender,
// //               image,
// //               address,
// //               state } = obj;

// //             return (
// //               <div className='data-card space-y-2'>
// //                     <img src={image} className='w-[100%] mx-auto mb-2' />     
// //                 <p> <b>Name : </b> {Name} </p>
// //                 <p> <b>Criminal Id : </b>{criminalID}</p>
// //                 <p> <b>gender : </b> {gender}</p>
// //                 <p> <b>Age : </b> {age}</p>
// //                 <p> <b>Address : </b> {address}</p>             
// //                 <p> <b> crime Invloved : </b>{ crimeInvloved}</p>
// //                 <p ><b> Arrested Date : </b> {arrestedDate}  </p>
// //                 {/* Photo : <img src={photo} /> */}

// //                 {/* <MdDelete className="text-blue-500 text-[30px] ms-auto " onClick={() => del(_id) } /> */}
// //                 {/* <FaEdit className="text-blue-500 text-[30px] ms-auto " onClick={() => UpdateCriminalData(_id) } /> */}

// //               </div>
// //             )
// //           })
// //         }
// //       </div>
// //     </div>
// //   );
// // }

// // export default FaceDetection;

// // FaceDetection.js
// import React, { useRef, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import * as faceapi from 'face-api.js';
// import axios from 'axios';

// const FaceDetection = () => {
//   const webcamRef = useRef(null);

//   useEffect(() => {
//     const loadModels = async () => {
//       await Promise.all([
//       faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//       faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//       faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//       faceapi.nets.faceExpressionNet.loadFromUri('/models')
//     ]);
//   }

//     loadModels();
//   }, []);

//   const capture = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();

//     // Perform face detection
//     const result = await faceapi.detectSingleFace(imageSrc, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

//     if (result) {
//       // Face detected, send the image to the server for matching
//       const formData = new FormData();
//       formData.append('image', imageSrc);

//       try {
//         const response = await axios.post('/api/match-face', formData);
//         const isMatched = response.data.isMatched;

//         if (isMatched) {
//           alert('Face Matched!');
//         }
//       } catch (error) {
//         console.error('Error matching face:', error);
//       }
//     }
//   };

//   return (
//     <div align="center">
//       <h2>Face Detection</h2>
//       <Webcam ref={webcamRef} />
//       <button onClick={capture}>Capture</button>
//     </div>
//   );
// };

// export default FaceDetection;


