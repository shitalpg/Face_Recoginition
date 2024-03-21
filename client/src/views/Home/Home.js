import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import Img from "./facial_recognition.jpg";
import Img02 from "./facial_recognition.02jpg.jpg";
import { FaDatabase } from "react-icons/fa";
 import { FaEdit } from "react-icons/fa";
import { FaFaceGrinWide} from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { BsRocketTakeoff } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
// import { execFile } from "child_process";
import FaceDetection from "../FaceDetection/FaceDetection";
function Home() {
  return (
    <div>



      <div>
        <Navbar />
      </div>

      <div class="container mx-auto flex  items-center  min-[320px]:flex-col md:flex-row justify-evenly">
        <div class="md:w-1/2 p-4">
          <h1 class="text-4xl font-bold mb-4">
            Welcome to <span className="text-blue-600">Criminal Or Missing Person Face Recongnition !</span>
          </h1>
          <p class="text-gray-700 mb-4">
          Our mission to identify the criminals in any investigation department from images of the criminals in our database along with his details and those images are segmented into many slices say eyes, hairs, lips, nose, etc.
          </p>
          <div className="lg:mt-3 md:mt-5 sm:mt-2 xm:mt-2 ">
            <Link to="/login">
              {" "}
              <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">
                <div className="flex justify-center items-center gap-x-2 font-bold">
                  <span>Get Started</span>{" "}
                  <span>
                    <BsRocketTakeoff />
                  </span>
                </div>
              </button>{" "}
            </Link>
          </div>
        </div>
// 
        <div class="md:w-1/2 p-2">
          <img
            data-aos="fade-left"
            data-aos-offset="400"
            data-aos-easing="ease-in-sine"
            src={Img}
            alt="Right Side Image"
            class="h-[300px] rounded-md block mx-auto"
          />
        </div>
      </div>

      <section>
        <div className="container mx-auto my-1 sm:my-1 md:my-5 lg:my-10">
          <div class="container mx-auto flex  items-center  min-[320px]:flex-col md:flex-row justify-evenly">
          <div class="md:w-1/2 p-1">
          <img
            data-aos="fade-left"
            data-aos-offset="400"
            data-aos-easing="ease-in-sine"
            src={Img02}
            
            class="h-[300px] w-[600px] rounded-md block mx-auto"
          />
        </div>
            // 
            <div className="left w-50 ms-2 ">
              <div className="flex  justify-evenly  min-[320px]:flex-col md:flex-row sm:mt-4 gap-x-3 gap-y-3 items-center mb-3  ">
                <div className="card w-80 py-11 bg-slate-50 border-2 hover:border-sky-500 duration-400 rounded-lg  shadow-md 
                 relative">
                  <FaClipboardList className="text-blue-500 border-2 p-[5px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4" />
                  <p className="absolute bottom-2 text-[19px ] font-bold left-16">
                    {" "}
                    <a href="/criminalData" className="no-underline text-black">   Get Criminal Information</a>
                  </p>
                </div>
                <div className="card w-80 py-11 bg-slate-50 border-2 hover:border-sky-500 duration-400 rounded-lg  shadow-md relative">
                  <FaClipboardList className="text-blue-500 border-2 p-[6px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4" /> 
                  // 
                  <p className="absolute bottom-2 text-[19px ] font-bold left-16">
                    {" "}
             <a href="/missingPersonData" className="no-underline text-black">   Missing Person Information </a>
                  </p> 
                </div>
              </div>
              <div className="flex justify-evenly min-[320px]:flex-col  md:flex-row gap-x-3 gap-y-3 items-center mb-5  ">
                <div className="card w-80 py-11 bg-slate-50 border-2 hover:border-sky-500 duration-400 rounded-lg  shadow-md relative">
                  <FaFaceGrinWide className="text-blue-500 border-2 p-[6px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4" />
                  <p className="absolute bottom-2 text-[19px ] font-bold left-16">
                    {" "}
                    Face Recongnition
                  </p>
                </div>
                <div className="card w-80 py-11 bg-slate-50 border-2 hover:border-sky-500 duration-400 rounded-lg  shadow-md relative">
                  < FaDatabase className="text-blue-500 border-2 p-[6px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4"/>
                  <p className="absolute bottom-2 text-[19px ] font-bold left-16">
                    {" "}
                All Data of recongnition
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
