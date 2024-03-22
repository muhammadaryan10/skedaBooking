import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import dayjs from "dayjs";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AddEvent from "./AddEvent";
import TimeSelect from "../../Components/TimeSlots";

const events = [
  {
    id: 0,
    title: "Board meeting",
    start: new Date(2024, 0, 29, 9, 0, 0),
    end: new Date(2024, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: "MS training",
    start: new Date(2018, 3, 17, 14, 0, 0),
    end: new Date(2018, 3, 17, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: "Team lead meeting",
    start: new Date(2024, 3, 17, 8, 30, 0),
    end: new Date(2024, 3, 17, 12, 30, 0),
    resourceId: [3, 4],
  },
  {
    id: 10,
    title: "Birthday Party",
    start: new Date(2024, 0, 30, 7, 0, 0),
    end: new Date(20, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
  {
    id: 11,
    title: "Birthday Party",
    start: new Date(2024, 0, 30, 7, 0, 0),
    end: new Date(20, 0, 30, 10, 30, 0),
    resourceId: 5,
  },
  {
    id: 12,
    title: "Birthday Party",
    start: new Date(2024, 0, 30, 7, 0, 0),
    end: new Date(20, 0, 30, 10, 30, 0),
    resourceId: 6,
  },
];

const localizer = momentLocalizer(moment);

const resourceMap = [
  { resourceId: 1, resourcePrice: 3000, resourceTitle: "Padel Court 1" },
  { resourceId: 2, resourcePrice: 3500, resourceTitle: "Padel Court 2" },
  { resourceId: 3, resourcePrice: 3000, resourceTitle: "Padel Court 3" },
  { resourceId: 4, resourcePrice: 3000, resourceTitle: "Padel Court 4" },
  { resourceId: 5, resourcePrice: 3000, resourceTitle: "Padel Court 5" },
  { resourceId: 6, resourcePrice: 3000, resourceTitle: "Cricket ( 9-aside )" },
  { resourceId: 7, resourcePrice: 2000, resourceTitle: "Cricket ( 7-aside )" },
  {
    resourceId: 8,
    resourcePrice: 4000,
    resourceTitle: "Super Sunday ( 7-aside )",
  },
];

export default function Resource() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [myEvents, setEvents] = useState(events);
  const [showHeader, setShowHeader] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newEvent, setNewEvent] = useState({
    date: "",
    title: "",
    start: "",
    end: "",
    resourceId: "",
    price: "",
    paymentStatus: "",
    // user:"",
  });
  const closeHeader = () => {
    setShowHeader(false);
    setSelectedEvent(null);
    if (myEvents.length > 0) {
      const updatedEvents = [...myEvents]; // Create a copy of the array
      updatedEvents.pop(); // Remove the last element
      setEvents(updatedEvents);
    }
  };

  const [personName, setPersonName] = React.useState([]);
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 1;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [currentPage, setCurrentPage] = useState("user");
  const names = [
    "Advance Payment Custumer",
    "Star Custumer",
    "Total Booking Team",
    "Total Team Viewer",
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const Booked = () => {
    setOpen(true);
    setShowHeader(false);
    setNewEvent({
      ...newEvent,
      start: new Date(selectedEvent.start).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      end: new Date(selectedEvent.end).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      resourceId: selectedEvent.resourceId,
    });
  };

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId, event }) => {
      const isSlotEmpty = myEvents.every((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return (
          !(
            (start >= eventStart && start < eventEnd) ||
            (end > eventStart && end <= eventEnd) ||
            (start <= eventStart && end >= eventEnd)
          ) || event.resourceId !== resourceId
        );
      });

      if (!isSlotEmpty) {
        window.alert("An event already exists at this time and resource.");
        return;
      }
      const title = window.prompt("New Event name");
      console.log("Title:", title);
      if (title) {
        const newEvent = {
          start: new Date(start),
          end: new Date(end),
          // title,
          resourceId,
        };
        console.log("New Event:", newEvent);
        setSelectedEvent(newEvent);
        setShowHeader(true);
        setEvents((prev) => [...prev, newEvent]);
      }
    },
    [setEvents, myEvents]
  );

  const CustomMonthEvent = ({ event }) => {
    const startTime = moment(event.start).format("h:mm A");
    const endTime = moment(event.end).format("h:mm A");
    // Implement your custom month event display here
    return (
      <div>
        <p className="custum-month">
          {startTime}-{endTime}
        </p>
        {/* Additional event details */}
      </div>
    );
  };

  const CustomPopup = ({ event }) => {
    const startTime = moment(event.start).format("h:mm A");
    const endTime = moment(event.end).format("h:mm A");
    return (
      // Custom popup JSX
      <div className="custum-month">
        <p>
          {startTime}-{endTime}
        </p>
        {/* Additional event details */}
      </div>
    );
  };

  const CustomEventWrapper = ({ event }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleTooltip = () => {
      setShowTooltip(!showTooltip);
    };

    const startTime = moment(event.start).format("h:mm A");
    const endTime = moment(event.end).format("h:mm A");

    return (
      <div
        style={{
          backgroundColor: "white",
          position: "relative",
          color: "black",
          padding: "5px",
          paddingTop: "1px",
          borderRadius: "0px",
          height: "100%",
        }}
        // onMouseEnter={toggleTooltip}
        // onMouseLeave={toggleTooltip}
      >
        {showTooltip && (
          <div
            style={{
              position: "",
              right: "-10%",
              top: "40%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              zIndex: 1000,
            }}
            className="tooltipHover"
          >
            {event.title}
          </div>
        )}
        <p className="font-semibold text-sm mb-1">
          <FontAwesomeIcon className="text-xs " icon={faUser} /> {startTime} -
        </p>
        <p className="font-semibold text-sm">{endTime}</p>
      </div>
    );
  };

  const components = {
    event: CustomEventWrapper,
    month: {
      // Custom event component for month view
      event: CustomMonthEvent,
    },
  };

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2024, 3, 17),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const slotStyleGetter = (date, resourceId, isSelected) => {
    const isSlotEmpty = myEvents.every((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return !(
        (date >= eventStart && date < eventEnd) ||
        (date <= eventStart && date >= eventEnd)
      );
    });

    if (isSlotEmpty) {
      return {
        className: "hoverable-slot",
      };
    }

    return {};
  };

  const monthEventStyle = {
    className: "custum-month", // CSS class for month view events
  };
  const dayEventStyle = {
    className: "rbc-event", // CSS class for day view events
  };
  const customStyle = {
    background: "red", // Background color for the selected slot
    borderRadius: "4px",
    opacity: "0.5", // Adjust opacity if needed
  };

  const selecting = (event) => {
    setSelectedEvent(event);
    console.log(event);
    setShowHeader(true);
  };

  const getEventData = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
    console.log(newEvent);
  };

  const eventPropGetter = (view) => (event, start, end, isSelected) => {
    if (isSelected) {
      // Set selected event and show the header
      setSelectedEvent(event);
      setShowHeader(true);
      return { style: customStyle };
    }
    //  else {
    //   if (view === Views.DAY) {
    //     return dayEventStyle; // Apply day view event styles
    //   } else {
    //     return monthEventStyle; // Apply month view event styles
    //   }
    // }
  };

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
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      resourceId: newSelectedItems,
      // totalPrice: totalPrice
    }));
  };

  useEffect(() => {
    const totalPrice = selectedItems.reduce((accumulator, resourceId) => {
      const selectedResource = resourceMap.find(
        (resource) => resource.resourceId === resourceId
      );
      return (
        accumulator + (selectedResource ? selectedResource.resourcePrice : 0)
      );
    }, 0);

    // Update newEvent's resourceId based on selectedItems whenever selectedItems change
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      price: totalPrice,
      resourceId: selectedItems,
    }));
  }, [selectedItems]);

  // const eventPropGetter = useCallback(
  //   (event, start, end, isSelected) => ({
  //     ...(isSelected && {
  //       className: "selected"
  //     }),
  //     ...(moment(start).hour() < 12 && {
  //       className: 'powderBlue',
  //     }),
  //     ...(event.title.includes('Meeting') && {
  //       className: 'darkGreen',
  //     }),
  //   }),
  //   []
  // )
  return (
    <Fragment>
      <style>
        {`
            .hoverable-slot:hover {
              background-color: #d9edf7 !important;
              cursor: pointer;
            }
          `}
      </style>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
                            <div className="grid lg:grid-cols-1 md:grid-cols-1  mt-2 px-5 py-3 ">
                              <div className="lg:grid-cols-3 md:grid-cols-3 sm:grid-col-1 my-3 space-x-3">
                                <button
                                  className={`border  ${
                                    currentPage === "user"
                                      ? "bg-blue-500 text-white"
                                      : "hover:bg-gray-100"
                                  } p-2`}
                                  onClick={() => setCurrentPage("user")}
                                >
                                  User Booking
                                </button>
                                <button
                                  className={`border  ${
                                    currentPage === "internal"
                                      ? "bg-blue-500 text-white"
                                      : "hover:bg-gray-100"
                                  } p-2`}
                                  onClick={() => setCurrentPage("internal")}
                                >
                                  Internal Use
                                </button>
                                <button
                                  className={`border  ${
                                    currentPage === "unavailable"
                                      ? "bg-blue-500 text-white"
                                      : "hover:bg-gray-100"
                                  } p-2`}
                                  onClick={() => setCurrentPage("unavailable")}
                                >
                                  Unavailable
                                </button>
                              </div>
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
                                        onChange={getEventData}
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
                                        value={newEvent && newEvent.start}
                                        onChange={getEventData}
                                      >
                                        <option
                                          value={newEvent && newEvent.start}
                                        >
                                          {newEvent && newEvent.start}
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
                                        value={newEvent && newEvent.end}
                                        onChange={getEventData}
                                        name="end"
                                      >
                                        <option
                                          value={newEvent && newEvent.end}
                                        >
                                          {newEvent && newEvent.end}
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
                                        {resourceMap
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
                                    {resourceMap.map((item) => (
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
                                  className="text-sm "
                                  for="exampleInputEmail1"
                                >
                                  HOLDER
                                </label>
                                <div>
                                  <select
                                    className="input-field w-100 p-2 my-2 border bg-white"
                                    name="nature"
                                    aria-label=".form-select-lg example"
                                  >
                                    <option value="">
                                      Users From Background
                                    </option>
                                  </select>
                                </div>
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
                                  onChange={getEventData}
                                  class="form-control rounded-0"
                                  placeholder="An Optional Booking Summary"
                                  aria-label="Recipient's username"
                                  aria-describedby="basic-addon2"
                                />
                              </div>
                              {currentPage === "user" && (
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
                                        onChange={getEventData}
                                        name="price"
                                        value={
                                          newEvent && newEvent.price
                                            ? newEvent.price
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
                              )}
                              <div className="flex space-x-3 my-3">
                                <button
                                  className="border p-2 px-3 text-sm text-white  "
                                  style={{ backgroundColor: "#00A176" }}
                                >
                                  Confirm Booking
                                </button>
                                <button
                                  to="/"
                                  onClick={() => setOpen(false)}
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
      {showHeader && (
        <div className="flex bg-gray-100 space-x-3 p-1">
          <div className="border p-2  flex justify-center items-center border-l">
            <FontAwesomeIcon className="h-6 mr-3" icon={faCalendarPlus} />
            Thur 14 Mar
          </div>
          <div className="border p-2  flex justify-center items-center border-l">
            <FontAwesomeIcon className="h-6 mr-3" icon={faClock} />
            {moment(selectedEvent && selectedEvent.start).format(
              "h:mm A"
            )} - {moment(selectedEvent && selectedEvent.end).format("h:mm A")}
          </div>
          <div className="border p-2  flex justify-center items-center">
            {selectedEvent && selectedEvent.end && (
              <div>
                {selectedEvent.resourceId === 1 ? (
                  <p>Padel Court 1</p>
                ) : selectedEvent.resourceId === 2 ? (
                  <p>Padel Court 2</p>
                ) : selectedEvent.resourceId === 3 ? (
                  <p>Padel Court 3</p>
                ) : selectedEvent.resourceId === 4 ? (
                  <p>Padel Court 4</p>
                ) : selectedEvent.resourceId === 5 ? (
                  <p>Padel Court 5</p>
                ) : selectedEvent.resourceId === 6 ? (
                  <p>Padel Court 6</p>
                ) : selectedEvent.resourceId === 7 ? (
                  <p>Padel Court 7</p>
                ) : selectedEvent.resourceId === 8 ? (
                  <p>Padel Court 8</p>
                ) : (
                  <p>Unknown Resource</p> // Default case
                )}
              </div>
            )}
          </div>

          <div className="border p-2  flex justify-center items-center">
            Rs 12000
          </div>
          <div className="border p-2  flex justify-center items-center bg-green-400 text-white px-4">
            <button onClick={Booked}>Book</button>
          </div>
          <div className="border p-2  flex justify-center items-center">
            <button onClick={closeHeader}>Cancle</button>
          </div>
        </div>
      )}
      {/* <div className="height600"> */}
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.DAY}
        events={myEvents}
        localizer={localizer}
        resourceIdAccessor="resourceId"
        resources={resourceMap}
        resourceTitleAccessor="resourceTitle"
        step={30}
        onSelectEvent={handleSelectEvent}
        // onSelectSlot={handleSelectSlot}
        onSelecting={selecting}
        components={components}
        selectable
        popup={CustomPopup}
        scrollToTime={scrollToTime}
        eventPropGetter={eventPropGetter}
        views={["day", "month", "agenda"]}
        slotPropGetter={slotStyleGetter}
      />
      {/* </div>s */}
    </Fragment>
  );
}
// export default Resource;

Resource.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
