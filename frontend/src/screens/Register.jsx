import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { register_api } from "../redux/Action/action";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userTypeOptions = [
    { id: "seller", label: "Seller" },
    { id: "buyer", label: "Buyer" },
  ];

  const [mainData, setMainData] = useState({});

  useEffect(() => {
    console.log("mainData", mainData);
  }, [mainData]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleInputChange = (key, value) => {
    console.log("key", key, "value", value);

    let newMainData = { ...mainData };
    newMainData[key] = value;
    setMainData(() => newMainData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (mainData?.password != mainData?.confirm_password) {
      toast.error("Password did not match")
      return
    }

    let payload = {
      "firstName": mainData?.first_name,
      "lastName": mainData?.last_name,
      "email": mainData?.email,
      "phone": mainData?.phone,
      "role": mainData?.user_type?.id,
      "password": mainData?.password,
  };

    let resp = await register_api(payload);

    if (resp == "User registered") {
      toast.success("User registered");
      navigate("/login");
    } else {
      toast.error("Something went wrong")
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleFormSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  handleInputChange("first_name", e?.target?.value)
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  handleInputChange("last_name", e?.target?.value)
                }
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => handleInputChange("email", e?.target?.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                type="number"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => handleInputChange("phone", e?.target?.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Type
            </label>
            <div className="mt-2">
              <Autocomplete
                disablePortal
                size="small"
                fullWidth
                options={userTypeOptions}
                onChange={(event, newValue) => {
                  handleInputChange("user_type", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      style: { borderRadius: "0.4rem" },
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  handleInputChange("password", e?.target?.value)
                }
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  handleInputChange("confirm_password", e?.target?.value)
                }
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="contained"
              className="!rounded-md !normal-case w-full"
            >
              Signup
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <a
            onClick={handleLogin}
            style={{ cursor: "pointer" }}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
