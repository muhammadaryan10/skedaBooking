import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { useRef } from "react";
import { Fragment } from "react";
import { Checkbox, FormControl, Select } from "@mui/material";
import { Email } from "@mui/icons-material";
import { useEffect } from "react";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 80,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function ShowMore({ event, resources }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [popup, setPopup] = useState(false);
  const cancelButtonRef = useRef(null);
  const [resource, setResource] = useState(resources);
  console.log("resourceMap >>", resources);
  console.log("event >>", event);
  const [selectedItems, setSelectedItems] = useState(event.resourceId);

  const handleCheckboxChange = (item) => {
    const selectedIndex = selectedItems.indexOf(item.resourceId);
    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      // Checkbox is checked
      newSelectedItems.push(item.resourceId);
    } else {
      // Checkbox is unchecked
      newSelectedItems.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelectedItems);

    // Calculate total price of selected resources
    // const totalPrice = newSelectedItems.reduce((accumulator, resourceId) => {
    //   const selectedResource = resourceMap.find(resource => resource.resourceId === resourceId);
    //   return accumulator + (selectedResource ? selectedResource.resourcePrice : 0);
    // }, 0);

    // Update newEvent with total price
    setUpdateEvent((prevEvent) => ({
      ...prevEvent,
      resourceId: newSelectedItems,
      // totalPrice: totalPrice
    }));
  };
  const [updateEvent, setUpdateEvent] = useState({
    date: event.date,
    title: event.title,
    start: new Date(event.start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    end: new Date(event.end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    resourceId: event.resourceId,
    price: event.price,
    paymentStatus: event.paymentStatus,
    // user: event.user,
  });
  console.log("updateEvent  >> ", updateEvent);

  const closeDailog = () => {
    setPopup(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const hidePopup = () => {
    setPopup(true);
    setAnchorEl(null);
  };

  useEffect(() => {
    const totalPrice = selectedItems.reduce((accumulator, resourceId) => {
      const selectedResource = resource.find(
        (resource) => resource.resourceId === resourceId
      );
      return (
        accumulator + (selectedResource ? selectedResource.resourcePrice : 0)
      );
    }, 0);

    // Update newEvent's resourceId based on selectedItems whenever selectedItems change
    setUpdateEvent((prevEvent) => ({
      ...prevEvent,
      price: totalPrice,
    }));
  }, [selectedItems]);

  return (
    <div>
      <Transition.Root show={popup} as={Fragment}>
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
                as={React.Fragment}
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
                            <h1 className="bg-blue-500 text-white w-100 px-5 py-3 fs-3 text-semibold">
                              EDIT USER BOOKING
                            </h1>
                            <div className="pl-5 ml-4">
                            <p className="text-black text-xs font-semibold py-2">BOOKIMG HOLDER</p>
                            <h1 >User Name </h1>
                            <span className="theme-color">test@gmail.com </span>
                            <span className="theme-color">0300-90909808</span>
                            </div>
                            <div className=" grid lg:grid-cols-1 md:grid-cols-1  mt-2 px-5 py-3 ">
                              <div className="my-2 mt-4">
                                <label
                                  className="text-sm"
                                  for="exampleInputEmail1"
                                >
                                  DATE AND TIME
                                </label>
                                <div className="my-2 grid lg:grid-cols-2 md:grid-cols-2 space-x-4 my-3">
                                  <div className="space-y-2">
                                    <div>
                                      <input
                                        type="date"
                                        name="date"
                                        value={updateEvent.date}
                                        // onChange={getEventData}
                                        class="form-control rounded-0"
                                        placeholder="e.g Sally"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                      />
                                    </div>
                                  </div>
                                  <div className=" grid lg:grid-cols-2 md:grid-cols-2 space-x-4">
                                    <div>
                                      <select
                                        className="form-control rounded-0"
                                        name="start"
                                        value={updateEvent && updateEvent.start}
                                        // onChange={getEventData}
                                      >
                                        <option
                                          value={
                                            updateEvent && updateEvent.start
                                          }
                                        >
                                          {updateEvent && updateEvent.start}
                                        </option>
                                        <option value="12:00 AM">
                                          12:00 AM
                                        </option>
                                        <option value="12:30 AM">
                                          12:30 AM
                                        </option>
                                        <option value="1:00 AM">1:00 AM</option>
                                        <option value="1:30 AM">1:30 AM</option>
                                        <option value="2:00 AM">2:00 AM</option>
                                        <option value="2:30 AM">2:30 AM</option>
                                        <option value="3:00 AM">3:00 AM</option>
                                        <option value="3:30 AM">3:30 AM</option>
                                        <option value="4:00 AM">4:00 AM</option>
                                        <option value="4:30 AM">4:30 AM</option>
                                        <option value="5:00 AM">5:00 AM</option>
                                        <option value="5:30 AM">5:30 AM</option>
                                        <option value="6:00 AM">6:00 AM</option>
                                        <option value="6:30 AM">6:30 AM</option>
                                        <option value="7:00 AM">7:00 AM</option>
                                        <option value="7:30 AM">7:30 AM</option>
                                        <option value="8:00 AM">8:00 AM</option>
                                        <option value="8:30 AM">8:30 AM</option>
                                        <option value="9:00 AM">9:00 AM</option>
                                        <option value="9:30 AM">9:30 AM</option>
                                        <option value="10:00 AM">
                                          10:00 AM
                                        </option>
                                        <option value="10:30 AM">
                                          10:30 AM
                                        </option>
                                        <option value="11:00 AM">
                                          11:00 AM
                                        </option>
                                        <option value="11:30 AM">
                                          11:30 AM
                                        </option>
                                        <option value="12:00 PM">
                                          12:00 PM
                                        </option>
                                        <option value="12:30 PM">
                                          12:30 PM
                                        </option>
                                        <option value="1:00 PM">1:00 PM</option>
                                        <option value="1:30 PM">1:30 PM</option>
                                        <option value="2:00 PM">2:00 PM</option>
                                        <option value="2:30 PM">2:30 PM</option>
                                        <option value="3:00 PM">3:00 PM</option>
                                        <option value="3:30 PM">3:30 PM</option>
                                        <option value="4:00 PM">4:00 PM</option>
                                        <option value="4:30 PM">4:30 PM</option>
                                        <option value="5:00 PM">5:00 PM</option>
                                        <option value="5:30 PM">5:30 PM</option>
                                        <option value="6:00 PM">6:00 PM</option>
                                        <option value="6:30 PM">6:30 PM</option>
                                        <option value="7:00 PM">7:00 PM</option>
                                        <option value="7:30 PM">7:30 PM</option>
                                        <option value="8:00 PM">8:00 PM</option>
                                        <option value="8:30 PM">8:30 PM</option>
                                        <option value="9:00 PM">9:00 PM</option>
                                        <option value="9:30 PM">9:30 PM</option>
                                        <option value="10:00 PM">
                                          10:00 PM
                                        </option>
                                        <option value="10:30 PM">
                                          10:30 PM
                                        </option>
                                        <option value="11:00 PM">
                                          11:00 PM
                                        </option>
                                        <option value="11:30 PM">
                                          11:30 PM
                                        </option>
                                      </select>
                                    </div>
                                    <div>
                                      <select
                                        className="form-control rounded-0"
                                        value={updateEvent && updateEvent.end}
                                        // onChange={getEventData}
                                        name="end"
                                      >
                                        <option
                                          value={updateEvent && updateEvent.end}
                                        >
                                          {updateEvent && updateEvent.end}
                                        </option>
                                        <option value="12:00 AM">
                                          12:00 AM
                                        </option>
                                        <option value="12:30 AM">
                                          12:30 AM
                                        </option>
                                        <option value="1:00 AM">1:00 AM</option>
                                        <option value="1:30 AM">1:30 AM</option>
                                        <option value="2:00 AM">2:00 AM</option>
                                        <option value="2:30 AM">2:30 AM</option>
                                        <option value="3:00 AM">3:00 AM</option>
                                        <option value="3:30 AM">3:30 AM</option>
                                        <option value="4:00 AM">4:00 AM</option>
                                        <option value="4:30 AM">4:30 AM</option>
                                        <option value="5:00 AM">5:00 AM</option>
                                        <option value="5:30 AM">5:30 AM</option>
                                        <option value="6:00 AM">6:00 AM</option>
                                        <option value="6:30 AM">6:30 AM</option>
                                        <option value="7:00 AM">7:00 AM</option>
                                        <option value="7:30 AM">7:30 AM</option>
                                        <option value="8:00 AM">8:00 AM</option>
                                        <option value="8:30 AM">8:30 AM</option>
                                        <option value="9:00 AM">9:00 AM</option>
                                        <option value="9:30 AM">9:30 AM</option>
                                        <option value="10:00 AM">
                                          10:00 AM
                                        </option>
                                        <option value="10:30 AM">
                                          10:30 AM
                                        </option>
                                        <option value="11:00 AM">
                                          11:00 AM
                                        </option>
                                        <option value="11:30 AM">
                                          11:30 AM
                                        </option>
                                        <option value="12:00 PM">
                                          12:00 PM
                                        </option>
                                        <option value="12:30 PM">
                                          12:30 PM
                                        </option>
                                        <option value="1:00 PM">1:00 PM</option>
                                        <option value="1:30 PM">1:30 PM</option>
                                        <option value="2:00 PM">2:00 PM</option>
                                        <option value="2:30 PM">2:30 PM</option>
                                        <option value="3:00 PM">3:00 PM</option>
                                        <option value="3:30 PM">3:30 PM</option>
                                        <option value="4:00 PM">4:00 PM</option>
                                        <option value="4:30 PM">4:30 PM</option>
                                        <option value="5:00 PM">5:00 PM</option>
                                        <option value="5:30 PM">5:30 PM</option>
                                        <option value="6:00 PM">6:00 PM</option>
                                        <option value="6:30 PM">6:30 PM</option>
                                        <option value="7:00 PM">7:00 PM</option>
                                        <option value="7:30 PM">7:30 PM</option>
                                        <option value="8:00 PM">8:00 PM</option>
                                        <option value="8:30 PM">8:30 PM</option>
                                        <option value="9:00 PM">9:00 PM</option>
                                        <option value="9:30 PM">9:30 PM</option>
                                        <option value="10:00 PM">
                                          10:00 PM
                                        </option>
                                        <option value="10:30 PM">
                                          10:30 PM
                                        </option>
                                        <option value="11:00 PM">
                                          11:00 PM
                                        </option>
                                        <option value="11:30 PM">
                                          11:30 PM
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mb-2">
                                <FormControl sx={{ width: "100%" }}>
                                  <label
                                    className="text-sm my-2  "
                                    for="exampleInputEmail1"
                                  >
                                    SPACES
                                  </label>
                                  <Select
                                    labelId="select-multiple-checkbox-label"
                                    id="select-multiple-checkbox"
                                    multiple
                                    size="small"
                                    value={selectedItems}
                                    onChange={(e) =>
                                      setSelectedItems(e.target.value)
                                    }
                                    renderValue={(selected) => (
                                      <div className="flex flex-wrap">
                                        {resource
                                          .filter((item) =>
                                            selected.includes(item.resourceId)
                                          )
                                          .map((item) => (
                                            <div
                                              key={item.resourceId}
                                              className="m-1"
                                            >
                                              {item.resourceTitle}
                                            </div>
                                          ))}
                                      </div>
                                    )}
                                  >
                                    {resource.map((item) => (
                                      <MenuItem
                                        key={item.resourceId}
                                        value={item.resourceId}
                                        className="p-0 "
                                      >
                                        <Checkbox
                                          checked={selectedItems.includes(
                                            item.resourceId
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(item)
                                          }
                                          className=""
                                          size="small"
                                        />
                                        {item.resourceTitle}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="my-2">
                                <label
                                  className="text-sm my-2"
                                  for="exampleInputEmail1"
                                >
                                  BOOKING TITLE
                                </label>
                                <input
                                  type="text"
                                  name="title"
                                  value={updateEvent.title}
                                  // onChange={getEventData}
                                  class="form-control rounded-0"
                                  placeholder="An Optional Booking Summary"
                                  aria-label="Recipient's username"
                                  aria-describedby="basic-addon2"
                                />
                              </div>
                              <div className=" grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 my-3 space-x-4">
                                <div className="">
                                  <label
                                    className="text-sm"
                                    for="exampleInputEmail1"
                                  >
                                    Price
                                  </label>
                                  <div className="bg-gray-300 flex text-center my-2 justify-center items-center">
                                    <p className="p-2 ">Rs</p>
                                    <input
                                      type="number"
                                      class="form-control rounded-0"
                                      // onChange={getEventData}
                                      name="price"
                                      value={
                                        updateEvent && updateEvent.price
                                          ? updateEvent.price
                                          : ""
                                      }
                                      placeholder="00"
                                      readOnly
                                      aria-label="Recipient's username"
                                      aria-describedby="basic-addon2"
                                    />
                                    <p className="p-2 ">PKR</p>
                                  </div>
                                </div>
                                <div>
                                  <label
                                    className="text-sm"
                                    for="exampleInputEmail1"
                                  >
                                    Payment Status
                                  </label>
                                  <select className="form-control rounded-0 my-2">
                                    <option value="paid">Paid</option>
                                    <option value="Un paid">Un Paid</option>
                                    <option value="No Status">Status</option>
                                  </select>
                                </div>
                              </div>
                              <div className="flex space-x-3 my-3">
                                <button
                                  className="border p-2 px-3 text-sm text-white  "
                                  style={{ backgroundColor: "#00A176" }}
                                  // onClick={CreateEvent}
                                >
                                  Confirm Booking
                                </button>
                                <button
                                  onClick={closeDailog}
                                  className="border p-2 px-3 text-sm hover:bg-gray-200"
                                  ref={cancelButtonRef}
                                >
                                  Cancel Booking
                                </button>
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
      </Transition.Root>
      <button className="p-0 m-0" onClick={handleClick}>
        {<KeyboardArrowDownIcon className="text-black" />}
      </button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={hidePopup} disableRipple>
          <EditIcon />
          View/Edit details
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Remove
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
