import { IconButton, Chip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IndianFlag from "../assets/India.svg";
import { classNamesMerge } from "../utils/generalUtils";
import { useState } from "react";

export default function AddForm({
  data,
  handleInputonChange = () => {},
}) {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
  const handleDeleteKeyword = (key, value, deletedKeyword) => {
    const updatedKeywords = value.split(",").filter((keyword) => keyword.trim() !== deletedKeyword.trim());
  
    const updatedValue = updatedKeywords.join(",");
  
    handleInputonChange(key, updatedValue);
  };

  return data?.map((field, i) => (
    <div
      className={classNamesMerge(
        field?.length ? field?.length : "sm:col-span-3",
        "grid gap-2"
      )}
      key={i}
    >
      {(field?.label || field?.field_name) && (
        <label
          className="block text-base font-medium leading-6 text-gray-900"
        >
          {field?.label} {field?.required ? <span className="text-red-500">*</span> : <span className="text-xs text-gray-400">(optional)</span>}
        </label>
      )}
      {field?.type === "only_text" ? (
        <div className="">{field?.value ?? "--"}</div>
      ) : ["email", "text", "number", "url"]?.includes(field?.type) ? (
        <div className="">
          <input
            type={field?.type}
            id={field?.key}
            name={field?.key}
            value={field?.value}
            autoFocus={field?.autoFocus ?? false}
            onChange={(e) =>
              handleInputonChange(field?.key, e.target.value)
            }
            required={field?.required}
            placeholder={field?.placeholder ?? "Enter " + field?.label}
            className={classNamesMerge(
              field?.applyclass,
              "w-full rounded-md shadow-sm sm:text-sm sm:leading-6 rounded-r-md border-gray-300 px-4 py-2"
            )}
            maxLength={field.maxLength ? field.maxLength : 200}
          />
        </div>
      ) : field?.type === "textarea" ? (
        <div className="">
          <textarea
            rows={2}
            id={field?.key}
            name={field?.key}
            value={field?.value}
            autoFocus={field?.autoFocus ?? false}
            required={field?.required}
            placeholder={field?.placeholder ?? "Enter " + field?.label}
            onChange={(e) =>
              handleInputonChange(field?.key, e.target.value)
            }
            className={classNamesMerge(
              field?.applyclass,
              "block w-full rounded-md py-1.5 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            )}
          />

          {field?.key == "keywords" && field?.value && (
            <div className="flex flex-wrap gap-x-3 gap-y-2 py-2">
              {field?.value?.split(",")?.filter(e => e?.trim()?.length != 0)?.map((k, i) => (
                <Chip variant="outlined" key={i} color="info" size="small" label={k} onDelete={() => handleDeleteKeyword(field?.key, field?.value, k.trim())}/>
              ))}
            </div>
          )}
        </div>
      ) : field?.type === "password" ? (
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id={field?.key}
            name={field?.key}
            value={field?.value}
            autoFocus={field?.autoFocus ?? false}
            onChange={(e) =>
              handleInputonChange(field?.key, e.target.value)
            }
            required={field?.required}
            placeholder={field?.placeholder ?? "Enter " + field?.label}
            className={classNamesMerge(
              field?.applyclass,
              "w-full rounded-md shadow-sm sm:text-sm sm:leading-6 rounded-r-md border-gray-300 px-4 py-2"
            )}
            maxLength={field.maxLength ? field.maxLength : 200}
          />
          <div className="absolute right-2 top-1">
              <IconButton
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
          </div>
        </div>
      ) : field?.type == "phone_number" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex font-bold items-center rounded-l-md border border-r-0 border-gray-300 px-3 pr-10 sm:pr-8 text-gray-500 sm:text-sm">
            <img src={IndianFlag} className="mr-2 " />
            <span className="font-bold">+91</span>
          </span>
          <input
            type="number"
            id={field?.key}
            name={field?.key}
            value={field?.value}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/\D/g, '');
              const truncatedInput = inputValue.slice(0, 10);
              handleInputonChange(field?.key, truncatedInput);
            }}
            required={field?.required}
            placeholder="Enter phone number"
            className="w-full sm:text-sm sm:leading-6 rounded-none rounded-r-md border-gray-300 px-4 py-2"
          />
        </div>
      ) : null}
    </div>
  ));
}
