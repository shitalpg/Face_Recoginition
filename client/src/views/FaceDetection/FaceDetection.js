import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import showToast from 'crunchy-toast';

function FaceDetection() {
  const [data, setData] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadDatabase = async () => {
      try {
        const response = await axios.get('/criminalRecords'); 
        setData(response.data);
      } catch (error) {
        console.error('Error loading database:', error);
      }
    };

    const loadModelsAndStartWebcam = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        startWebcam();
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    const startWebcam = () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    };

    const recognizeFaces = async () => {
      if (data.length === 0) {
        console.error('No data in the database.');
        return;
      }

      videoRef.current.addEventListener('play', async () => {
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        canvasRef.current.append(canvas);

        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(videoRef.current)
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          resizedDetections.forEach(detection => {
            const faceDescriptor = detection.descriptor;

            // Match the detected face with the faces in the database
            const bestMatch = findBestMatch(faceDescriptor, data);

            // If a match is found, display the name of the matched person
            if (bestMatch) {
              showToast(`Matched with: ${bestMatch}`, 'success', 3000);
            }
          });
        }, 100);
      });
    };

    const findBestMatch = (faceDescriptor, data) => {
      let bestMatchName = 'unknown';
      let minDistance = Number.MAX_VALUE;

      for (const person of data) {
        for (const descriptor of person.descriptors) {
          const distance = faceapi.euclideanDistance(descriptor, faceDescriptor);
          if (distance < minDistance) {
            minDistance = distance;
            bestMatchName = person.name;
          }
        }
      }

      return bestMatchName;
    };

    loadDatabase();
    loadModelsAndStartWebcam();
    recognizeFaces();
  }, [data]);

  return (
    <div className="container">
      <div>
        <video ref={videoRef} id="video" width="300" className="current-image" height="250" autoPlay></video>
        <div className="canvas" ref={canvasRef}></div>
      </div>
    </div>
  );
}

export default FaceDetection;
