import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import showToast from 'crunchy-toast';

function FaceDetection() {
  const [data, setData] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/criminal-record/criminalrecords');
      setData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
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
        console.error('No data available for face recognition.');
        return;
      }

      const labeledDescriptors = data.map(criminal => new faceapi.LabeledFaceDescriptors(criminal.name, criminal.descriptors));

      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

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
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

          resizedDetections.forEach(detection => {
            const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
            const box = detection.detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.toString() });
            drawBox.draw(canvas);

            // Check if the face matches any criminal
            if (bestMatch.label !== 'unknown') {
              const matchedCriminal = data.find(criminal => criminal.name === bestMatch.label);
              if (matchedCriminal) {
                showToast(`Matched with criminal: ${matchedCriminal.name}`, 'success', 3000);
              }
            }
          });
        }, 100);
      });
    };

    loadData();
    loadModelsAndStartWebcam();
    recognizeFaces();
  }, [data]);

  return (
    <div className="container">
      <h1>Hello</h1>
      <div>
        <video ref={videoRef} id="video" width="600px" className="current-image" height="550px" autoPlay></video>
        <div className="canvas" ref={canvasRef}></div><br/>
      </div><br/>
    </div>
  );
}

export default FaceDetection;