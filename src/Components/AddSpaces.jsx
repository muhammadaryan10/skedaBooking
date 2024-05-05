import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function AddSpaces() {
  const [open, setOpen] = useState(false);
  const [AddSpace, setAddSpace] = useState(false);
  const cancelButtonRef = useRef(null);
  const [details, setDetails] = useState(false);
  const [deleteValue, setDeleteValue] = useState("");
  const [deleteOption, setDeleteOption] = useState(false);
  const spaces = [
    { resourceId: 1, resourcePrice: 3000, resourceTitle: "Padel Court 1" },
    { resourceId: 2, resourcePrice: 3500, resourceTitle: "Padel Court 2" },
    { resourceId: 3, resourcePrice: 3000, resourceTitle: "Padel Court 3" },
    { resourceId: 4, resourcePrice: 3000, resourceTitle: "Padel Court 4" },
    { resourceId: 5, resourcePrice: 3000, resourceTitle: "Padel Court 5" },
    {
      resourceId: 6,
      resourcePrice: 3000,
      resourceTitle: "Cricket ( 9-aside )",
    },
    {
      resourceId: 7,
      resourcePrice: 2000,
      resourceTitle: "Cricket ( 7-aside )",
    },
  ];
  const [selectedSpace, setSelectedSpace] = useState(spaces[0]);
  const closeDailog = () => {
    setOpen(false);
    setAddSpace(false);
  };

  const verify = (e) => {
    let value = e.target.value.trim();
    setDeleteValue(value);
    if (value.length > 0) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };

  useEffect(() => {
    console.log(selectedSpace);
  }, [selectedSpace]);
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={closeDailog}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden  text-left shadow-xl transition-all sm:my-8 max-w-5xl">
                  <div className="">
                    <div className=" bg-white w-full">
                      <div className="w-full ">
                        <div className="">
                          <div className="border">
                            <h1 className="bg-blue-500 text-white w-100 px-4 py-3 fs-4 text-semibold">
                              NEW BOOKING
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* <Transition.Root show={AddSpace} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10" 
            initialFocus={cancelButtonRef}
            onClose={closeDailog}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden  text-left shadow-xl transition-all sm:my-8 max-w-5xl">
                    <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-x-3  mt-2">
                      <div className="">
                        <div className=" bg-white w-full">
                          <div className="w-full ">
                            <div className="">
                              <div className="border">
                                <h1 className="bg-blue-500 text-white w-100 px-4 py-3 fs-4 text-semibold">
                                  ADD SPACES
                                </h1>
                                <div className="grid lg:grid-cols-1 md:grid-cols-1  mt-2 px-5 py-3 ">
                                  <p>SPACE NAMES (ONE PER LINE)</p>
                                  <input type="text" className="p-2 my-2" />
                                  <div className="flex">
                                    <button className="p-2 bg-green-400 text-white text-lg">
                                      Add Space
                                    </button>
                                    <button className="p-2 border-gray-300">
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root> */}
      <Transition.Root show={AddSpace} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
          onClose={closeDailog}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full"
              style={{ width: "50%", height: "50vh" }}
            >
              <div className="h-100">
                <h1 className="bg-blue-500 text-white w-100 px-4 py-3 fs-4 text-semibold">
                  ADD SPACES
                </h1>
                <div className="grid lg:grid-cols-1 md:grid-cols-1  mt-2 px-5 ">
                  <p>SPACE NAMES (ONE PER LINE)</p>
                  <textarea
                    type="text"
                    className="p-3 my-2 border"
                    placeholder="Room 101
Court 1"
                  />
                  <div className="flex">
                    <button className="p-2 bg-green-400 text-white text-lg">
                      Add Space
                    </button>
                    <button
                      className="p-2 border-gray-300"
                      onClick={closeDailog}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className="px-3 my-5">
        <h3 className="text-xl font-semibold">SPACES</h3>
        <p className="text-md text-gray-400 my-3">
          Your spaces are your core bookable resources. Select a space to edit
          it, or reposition them with drag and drop.
        </p>
        <button className="bg-green-400 p-2" onClick={() => setAddSpace(true)}>
          Add Spaces
        </button>
      </div>
      <div className="flex flex-wrap w-100">
        <div className="w-full md:w-1/3 md:flex-none  pr-3">
          <div className="border p-3">
            {spaces.map((space) => (
              <button
                className={` ${
                  selectedSpace.resourceId === space.resourceId
                    ? "bg-gray-300"
                    : "hover:bg-gray-200"
                } w-100 p-2 text-start mb-1`}
                onClick={() => setSelectedSpace(space)}
              >
                {space.resourceTitle}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/3 md:flex-grow bg-white border border-gray-300">
          <div className="flex grid lg:grid-cols-2 md:grid-cols-1 mt-2 p-3 gap-x-3 ">
            <div className="space-y-2">
              <label className="text-sm" for="exampleInputEmail1">
                NAME
              </label>
              <div>
                <input
                  type="text"
                  class="form-control rounded-0"
                  placeholder="Name"
                  value={selectedSpace && selectedSpace.resourceTitle}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm" for="exampleInputEmail1">
                VISIBILITY
              </label>
              <div>
                <input
                  type="radio"
                  class="mr-2"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                All users can see the space
              </div>
              <div>
                <input
                  type="radio"
                  class="mr-2 h-full"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                Only users with any of these tags can see the space:
              </div>
            </div>
          </div>
          <div className="p-3 ">
            <label className="text-sm" for="exampleInputEmail1">
              Description
            </label>
            <div>
              <textarea className="w-full border p-2" rows="4" cols="50" />
            </div>
          </div>
          <div className="p-3 ">
            <label className="text-sm" for="exampleInputEmail1">
              Delete Space
            </label>
            <div>
              <button
                className="p-2 border my-2"
                onClick={() => setDeleteOption(!deleteOption)}
              >
                {" "}
                {deleteOption ? "Hide delete option" : "Show delete option"}
              </button>{" "}
            </div>
            {deleteOption && (
              <>
                <div className="alert bg-red-100 border-yellow-200">
                  Careful! This is an irreversible action. If you delete this
                  space, all bookings for it will likewise be deleted! Consider
                  exporting your data from the scheduler list mode first. To
                  continue, type Permanently delete Test 1 with bookings below.
                </div>
                <textarea
                  className="w-full border p-2"
                  onChange={verify}
                  rows="4"
                  cols="50"
                  placeholder={`Type Permanently delete ${selectedSpace.resourceTitle} with bookings`}
                />
                {details && (
                  <div className="alert bg-blue-100 border-blue-300 mt-2 space-y-3">
                    <p>Please enter the correct confirmation!</p>
                    <div className="flex">
                      <p style={{ width: "30%" }}>You entered :</p>
                      <p className="ml-2" style={{ width: "70%" }}>
                        {deleteValue}
                      </p>
                    </div>
                    <div className="flex">
                      <p style={{ width: "30%" }}>You must enter :</p>
                      <p
                        className="ml-2"
                        style={{ width: "70%" }}
                      >{`Permanently delete ${selectedSpace.resourceTitle} with bookings`}</p>
                    </div>
                  </div>
                )}
                <button
                  className={`p-2 border mt-4 ${
                    deleteValue ===
                    `Permanently delete ${selectedSpace.resourceTitle} with bookings`
                      ? "hover:bg-gray-300"
                      : ""
                  }`}
                  disabled={
                    deleteValue !==
                    `Permanently delete ${selectedSpace.resourceTitle} with bookings`
                  }
                  onClick={() => alert("Delete the Selected Space")}
                >
                  Delete Space
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
