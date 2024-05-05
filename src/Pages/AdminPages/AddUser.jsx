import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminSideBar from "../../Components/AdminSideBar";
import Navbar from "../../Components/Navbar";
import { useEffect } from "react";

export default function AddUser() {
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

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 992);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="block lg:flex xl:flex 2xl:flex h-[100vh]">
      {isWideScreen ? (
        <AdminSideBar className="position-fixed start-0 top-0 w-16 h-[100vh]" />
      ) : (
        <Navbar className="" />
      )}
      <div className="w-full overflow-y-scroll h-[100vh]">
        <div className="flex justify-center my-10">
          <div className="border ">
            <h1 className="bg-blue-500 text-white w-100 px-4 py-3 fs-4 text-semibold">
              ADD A USER
            </h1>
            <div className="grid lg:grid-cols-1 md:grid-cols-1  mt-2 px-5 py-3">
              <div className="my-3">
                <label className="text-sm" for="exampleInputEmail1 ">
                  EMAIL
                </label>
                <div class="input-group my-2">
                  <input
                    type="text"
                    class="form-control rounded-0"
                    placeholder="user@eamil.address"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                </div>
              </div>
              <div className="my-2 grid lg:grid-cols-2 md:grid-cols-2 space-x-4">
                <div className="space-y-2">
                  <label className="text-sm" for="exampleInputEmail1">
                    FIRST NAME
                  </label>
                  <div>
                    <input
                      type="text"
                      class="form-control rounded-0"
                      placeholder="e.g Sally"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm" for="exampleInputEmail1">
                    LAST NAME
                  </label>
                  <div>
                    <input
                      type="text"
                      class="form-control rounded-0"
                      placeholder="e.g Jones"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                </div>
              </div>
              <div className="my-2 grid lg:grid-cols-2 md:grid-cols-2 space-x-4">
                <div className="space-y-2">
                  <label className="text-sm" for="exampleInputEmail1">
                    TELEPHONE
                  </label>
                  <div>
                    <input
                      type="text"
                      class="form-control rounded-0"
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm" for="exampleInputEmail1">
                    ORGANIZATION
                  </label>
                  <div>
                    <input
                      type="text"
                      class="form-control rounded-0"
                      placeholder="Optional"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                </div>
              </div>
              <div className="my-3">
                <label className="text-sm " for="exampleInputEmail1">
                  SYSTEM TAGS
                </label>
                <div>
                  <select
                    className="input-field w-100 p-2 my-2 border bg-white"
                    name="nature"
                    aria-label=".form-select-lg example"
                  >
                    <option value="">No System Tags</option>
                  </select>
                </div>
              </div>
              <div className="mb-2">
                <FormControl
                  sx={{ m: 1 }}
                  size="small"
                  className="w-100 rounded-0"
                >
                  <label for="Tag" className="mb-2">
                    CUSTUM TAGS
                  </label>
                  <Select
                    labelId="Tag"
                    id="Tag"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    // input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name} className="p-0 text_xs">
                        <Checkbox
                          checked={personName.indexOf(name) > -1}
                          size="small"
                        />
                        <ListItemText
                          primary={name}
                          className="text_xs "
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="my-3 text-sm ml-3">
                This new user will be sent an invitation email (in accordance
                with your venue's notification settings).
              </div>
              <div className="flex space-x-3">
                <button
                  className="border p-2 px-3 text-sm text-white  "
                  style={{ backgroundColor: "#00A176" }}
                >
                  Add User
                </button>
                <Link
                  to="/admin/users"
                  className="border p-2 px-3 text-sm hover:bg-gray-200"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
