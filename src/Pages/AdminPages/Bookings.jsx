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
import {
  Checkbox,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import UnavailableEvent from "../../Components/UnavailableEvent";
import UserBooking from "../../Components/UserBooking";
import InternelEvent from "../../Components/InternelEvent";

const events = [
  {
    id: 0,
    title: "Board meeting",
    type: "user",
    start: new Date(2024, 3, 17, 3, 30, 0),
    end: new Date(2024, 3, 17, 5, 30, 0),
    resourceId: [5],
  },
  {
    id: 1,
    title: "MS training",
    type: "user",
    start: new Date(2024, 3, 17, 8, 30, 0),
    end: new Date(2024, 3, 17, 9, 30, 0),
    resourceId: [2],
  },
  {
    id: 2,
    title: "Team lead meeting",
    type: "not_availabel",
    start: new Date(2024, 3, 17, 8, 30, 0),
    end: new Date(2024, 3, 17, 12, 30, 0),
    resourceId: [3],
  },
  {
    id: 32,
    title: "Team lead meeting",
    type: "not_availabel",
    start: new Date(2024, 3, 17, 7, 0, 0),
    end: new Date(2024, 3, 17, 7, 30, 0),
    resourceId: [3],
  },
  {
    id: 112,
    title: "Team lead meeting 2",
    type: "not_availabel",
    start: new Date(2024, 3, 17, 7, 30, 0),
    end: new Date(2024, 3, 17, 8, 30, 0),
    resourceId: [3],
  },
  {
    id: 10,
    title: "Birthday Party",
    type: "internel",
    start: new Date(2024, 3, 17, 4, 30, 0),
    end: new Date(2024, 3, 17, 8, 30, 0),
    resourceId: [4],
  },
  {
    id: 11,
    type: "user",
    title: "Birthday Party",
    start: new Date(2024, 3, 17, 9, 30, 0),
    end: new Date(2024, 3, 17, 12, 30, 0),
    resourceId: [5],
  },
  {
    id: 12,
    title: "Birthday Party",
    type: "internel",
    start: new Date(2024, 3, 17, 2, 30, 0),
    end: new Date(2024, 3, 17, 4, 30, 0),
    resourceId: [6],
  },
];

const localizer = momentLocalizer(moment);

const resourceMap = [
  {
    resourceId: 1,
    resourcePrice: 3000,
    resourceTitle: "Padel Court 1",
    availability: { start: "00:00", end: "20:00" },
  },
  {
    resourceId: 2,
    resourcePrice: 3500,
    resourceTitle: "Padel Court 2",
    availability: { start: "00:00", end: "22:00" },
  },
  {
    resourceId: 3,
    resourcePrice: 3000,
    resourceTitle: "Padel Court 3",
    typeavailability: { start: "00:00", end: "20:00" },
  },
  {
    resourceId: 4,
    resourcePrice: 3000,
    resourceTitle: "Padel Court 4",
    availability: { start: "00:00", end: "20:00" },
  },
  {
    resourceId: 5,
    resourcePrice: 3000,
    resourceTitle: "Padel Court 5",
    availability: { start: "00:00", end: "20:00" },
  },
  {
    resourceId: 6,
    resourcePrice: 3000,
    resourceTitle: "Cricket ( 9-aside )",
    availability: { start: "00:00", end: "20:00" },
  },
  {
    resourceId: 7,
    resourcePrice: 2000,
    resourceTitle: "Cricket ( 7-aside )",
    availability: { start: "00:00", end: "20:00" },
  },
  {
    resourceId: 8,
    resourcePrice: 4000,
    resourceTitle: "Super Sunday ( 7-aside )",
    start: new Date().setHours(11, 0, 0), // 12pm
    end: new Date().setHours(23, 0, 0),
  },
];

export default function AdminResource() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [myEvents, setMyEvents] = useState(events);
  const [showHeader, setShowHeader] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [resource, setResource] = useState(resourceMap);
  const [newEvent, setNewEvent] = useState({
    date: "",
    title: "",
    start: "",
    end: "",
    resourceId: "",
    price: "",
    type: "",
    paymentStatus: "",
    userID: "",
  });

  const closeHeader = () => {
    setShowHeader(false);
    setSelectedEvent(null);
    if (myEvents && myEvents.length > 0) {
      const updatedEvents = [...myEvents]; // Create a copy of the array
      updatedEvents.pop(); // Remove the last element
      setMyEvents(updatedEvents);
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

  const CreateEvent = () => {
    console.log(newEvent);

    // Check the values of newEvent.date, newEvent.start, and newEvent.end
    // console.log("Date:", newEvent.date);
    // console.log("Start:", newEvent.start);
    // console.log("End:", newEvent.end);

    // Extract year, month, and day from the date string
    const [year, month, day] = newEvent.date.split("-").map(Number);

    // Convert start and end times to 24-hour format
    const [startHour, startMinute] = convertTo24Hour(newEvent.start)
      .split(":")
      .map(Number);
    const [endHour, endMinute] = convertTo24Hour(newEvent.end)
      .split(":")
      .map(Number);

    // Create Date objects for start and end times
    const startDate = new Date(year, month - 1, day, startHour, startMinute);
    const endDate = new Date(year, month - 1, day, endHour, endMinute);

    console.log(startDate, endDate);

    // Update the newEvent object with the Date objects
    const AddEvent = {
      ...newEvent,
      start: startDate,
      end: endDate,
    };
    console.log(AddEvent, ">> New");
    console.log(myEvents);

    // Push the updated event to the events array
    const updatedEvents = [...myEvents, AddEvent];
    setMyEvents(updatedEvents);

    // Optional: Log the updated events array for verification
    closeDailog();
  };

  // Function to convert time from AM/PM format to 24-hour format
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  // useEffect(() => {
  //   console.log(events);
  // }, [events]);

  const Booked = () => {
    setOpen(true);
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
      type: "user",
      resourceId: [selectedEvent.resourceId],
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
        setMyEvents((prev) => [...prev, newEvent]);
      }
    },
    [setMyEvents, myEvents]
  );

  const CustomMonthEvent = ({ event }) => {
    const startTime = moment(event.start).format("h:mm A");
    const endTime = moment(event.end).format("h:mm A");
    return (
      <div>
        <p className="custum-month">
          {startTime}-{endTime}
        </p>
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

  const PageChange = (page) => {
    setCurrentPage(page);
    if (page === "user") {
      setNewEvent({
        ...newEvent,
        type: page,
      });
    } else if (page === "internal") {
      setNewEvent({
        ...newEvent,
        type: "internel",
      });
    } else {
      setNewEvent({
        ...newEvent,
        type: "not_availabel",
      });
    }
  };

  
  const CustomEventWrapper = ({ event }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleTooltip = () => {
      setShowTooltip(!showTooltip);
    };

    if (event.type === "user") {
      return <UserBooking myObject={event} resources={resource} />;
    } else if (event.type === "not_availabel") {
      return <UnavailableEvent myObject={event} />;
    } else if (event.type === "internel") {
      return <InternelEvent myObject={event} />;
    }
  };

  const components = {
    event: CustomEventWrapper,
    month: {
      event: CustomMonthEvent,
    }
  };

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2024, 3, 17),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const selecting = (event, date) => {
    let price;
    setSelectedEvent(event);
    if (selectedItems && selectedItems.length >= 1) {
      selectedItems.shift(); 
    }
    selectedItems.push(event.resourceId);

    const selectedResource = resourceMap.find(
      (resource) => resource.resourceId === event.resourceId
    );

    if (selectedResource) {
      price = selectedResource.resourcePrice;
    } else {
      price = 0;
    }

    const startDate = new Date(event.start);
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it starts from 0
    const day = String(startDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);

    // setSelectedEvent({
    //   ...selectedEvent,
    //   date: formattedDate,
    // })

    setNewEvent({
      ...newEvent,
      price: price,
      resourceId: event.resourceId,
      date: formattedDate,
    });
    console.log(event);

    setShowHeader(true);
  };

  const getEventData = (e) => {
    console.log("Run");
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
    console.log(newEvent);
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

  const closeDailog = () => {
    setOpen(false);
    setShowHeader(false);
    setSelectedItems([]);
    setNewEvent({
      date: "",
      title: "",
      start: "",
      end: "",
      resourceId: "",
      price: "",
      paymentStatus: "",
    });
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
                            <div className="grid lg:grid-cols-1 md:grid-cols-1  mt-2 px-5 py-3 ">
                              <div className="lg:grid-cols-3 md:grid-cols-3 sm:grid-col-1 my-3 space-x-3">
                                <button
                                  className={`border  ${
                                    currentPage === "user"
                                      ? "bg-blue-500 text-white"
                                      : "hover:bg-gray-100"
                                  } p-2`}
                                  onClick={() => PageChange("user")}
                                >
                                  User Booking
                                </button>
                                <button
                                  className={`border  ${
                                    currentPage === "internal"
                                      ? "bg-blue-500 text-white"
                                      : "hover:bg-gray-100"
                                  } p-2`}
                                  onClick={() => PageChange("internal")}
                                >
                                  Internal Use
                                </button>
                                <button
                                  className={`border  ${
                                    currentPage === "unavailable"
                                      ? "bg-blue-500 text-white"
                                      : "hover:bg-gray-100"
                                  } p-2`}
                                  onClick={() => PageChange("unavailable")}
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
                                        value={newEvent.date}
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
                                  onClick={CreateEvent}
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
      {showHeader && (
        <div className="flex bg-gray-100 space-x-3 p-1">
          <div className="border p-2  flex justify-center items-center border-l">
            <FontAwesomeIcon className="h-6 mr-3" icon={faCalendarPlus} />
            {newEvent && newEvent.date && newEvent.date}
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
                  <p>Cricket ( 9-aside )</p>
                ) : selectedEvent.resourceId === 7 ? (
                  <p>Cricket ( 7-aside )</p>
                ) : selectedEvent.resourceId === 8 ? (
                  <p>Super Sunday ( 7-aside)</p>
                ) : (
                  <p>Unknown Resource</p> // Default case
                )}
              </div>
            )}
          </div>

          <div className="border p-2  flex justify-center items-center">
            {newEvent && newEvent.price}
          </div>
          <div className="border p-2  flex justify-center items-center bg-green-400 text-white px-4">
            <button onClick={Booked}>Book</button>
          </div>
          <div className="border p-2  flex justify-center items-center">
            <button onClick={closeHeader}>Cancle</button>
          </div>
        </div>
      )}
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.DAY}
        events={myEvents}
        localizer={localizer}
        resourceIdAccessor="resourceId"
        resources={resourceMap}
        resourceTitleAccessor="resourceTitle"
        step={30}
        // resourceComponent={ResourceComponent}
        //   min={new Date().setHours(0, 0, 0)}
        // max={new Date().setHours(21, 59, 59)}
        // onSelectEvent={handleSelectEvent}
        onSelectSlot={selecting}
        onSelecting={selecting}
        components={components}
        selectable
        popup={CustomPopup}
        scrollToTime={scrollToTime}
        // eventPropGetter={eventPropGetter}
        views={["day", "month", "agenda"]}
        // slotPropGetter={slotStyleGetter}
      />
      {/* </div>s */}
    </Fragment>
  );
}
// export default Resource;

AdminResource.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
