import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey  } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF ,faApple ,faMicrosoft ,faGoogle} from '@fortawesome/free-brands-svg-icons';

import { Link } from "react-router-dom";

export default function Login() {
    const [register , setRegister ]= useState(false)
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="shadow-lg p-5 max-w-4xl">
        <h1 className="text-center text-blue-400">
          Log in to <span className="font-bold">Legends Arena </span>
        </h1>
        <div className="row my-3">
          <div className="col-7 form-row align-items-center p-3">
            <div class="col-auto my-3">
              <label class="sr-only" for="inlineFormInputGroup">
                Username
              </label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text rounded-0">
                    <FontAwesomeIcon icon={faEnvelope} className="h-4 p-2" />
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control rounded-0"
                  id="inlineFormInputGroup"
                  placeholder="your@email.address"
                />
              </div>
            </div>
            <div class="col-auto my-3">
              <label class="sr-only" for="inlineFormInputGroup">
                Username
              </label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text rounded-0">
                    {" "}
                    <FontAwesomeIcon className="h-4 p-2" icon={faKey} />{" "}
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control rounded-0"
                  id="inlineFormInputGroup"
                  placeholder="your password"
                />
              </div>
            </div>
            <div>
              <input type="checkbox" />
              <label className="m-2">Remember Me</label>
            </div>
            <button className="w-full text-white bg-blue-500 p-3">
              Log In
            </button>
            <p className="text-sm text-center my-3">
              Forgot password or can't login? Reset login now ?
              <Link to="/resetPass" className="text-blue-400 ml-2">
                Reset login now
              </Link>
            </p>
            <p className="text-sm text-center text-blue-400 mt-3">
              <Link to="" >
                How do I register?
              </Link>
            </p>
          </div>
          <div className="text-center flex p-4 justify-center col-1">OR</div>
          <div className="col-4 p-3">
            <button className="text-center w-full bg-blue-100 p-2 my-2 hover:bg-blue-600 hover:text-white">
            <FontAwesomeIcon icon={faFacebookF} className=" " /> Log in With Facebook
            </button>
            <button className="text-center w-full bg-red-100 p-2 my-2 hover:bg-red-600 hover:text-white">
            <FontAwesomeIcon icon={faGoogle} /> Log in With Google
            </button>
            <button className="text-center w-full bg-gray-100 p-2 my-2 hover:bg-gray-600 hover:text-white">
            <FontAwesomeIcon icon={faMicrosoft} /> Log in With MicroSoft
            </button>
            <button className="text-center w-full bg-gray-200 p-2 my-2 hover:bg-black hover:text-white">
            <FontAwesomeIcon icon={faApple} /> Log in With Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
