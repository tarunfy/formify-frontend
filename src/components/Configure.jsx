import React, { useEffect, useState, useContext } from "react";
import { RiKeyFill } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";
import { RiSettings5Fill } from "react-icons/ri";
import { formService } from "../services";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Configure = ({ formId, isDark, history }) => {
  const endPoint = `${process.env.REACT_APP_BASE_URL}f/${formId}`;

  const [placeholder, setPlaceholder] = useState("");
  const [formName, setFormName] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [returnUrl, setReturnUrl] = useState("");

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleCopy = () => {
    navigator.clipboard.writeText(endPoint);
    toast.success("Copied 👍");
  };

  const handleDelete = async () => {
    const res = await formService.deleteForm(formId);
    if (res.isSuccessful()) {
      toast.success(`${res.data} 😉`);
      setTimeout(() => {
        history.push("/dashboard");
      }, 1500);
    }
    if (res.hasError()) {
      setCurrentUser(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await formService.updateForm(
      formId,
      formName,
      webhookUrl,
      returnUrl
    );
    if (res.isSuccessful()) {
      toast.success(`${res.data} ✌`);
      setFormName("");
      setReturnUrl("");
      setWebhookUrl("");
    }
    if (res.hasError()) {
      setCurrentUser(null);
    }
  };

  useEffect(() => AOS.init({ duration: 1000 }), []);

  useEffect(async () => {
    const formDetails = await formService.getFormDetails(formId);
    if (formDetails.isSuccessful()) {
      setPlaceholder(formDetails.data.formName);
    }
    if (formDetails.hasError()) {
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    if (currentUser == null) {
      return <Redirect to="/signin" />;
    }
  }, [currentUser]);

  return (
    <div className="w-full overflow-hidden" data-aos="fade">
      <div className="flex items-center mb-3">
        <RiKeyFill className="dark:text-white w-7 h-7" />
        <h3 className="ml-4 text-2xl font-bold  font-sans">
          Your form endpoint
        </h3>
      </div>
      <div className="flex items-center mb-4">
        <div className="p-4 dark:bg-myblack2 bg-green-50 xl:w-3/5 w-full rounded-md">
          <p
            id="endpoint"
            className="font-Nunito font-semibold text-mygreen2 italic xl:w-full   xl:text-lg text-sm"
          >
            {endPoint}
          </p>
        </div>
        <div
          className=" bg-mygreen3 transition-colors hover:bg-mygreen duration-300 ease-in-out rounded-full p-2 cursor-pointer shadow-custom3 -ml-12"
          onClick={handleCopy}
        >
          <FiCopy className="h-5 w-5 dark:text-black text-white" />
        </div>
      </div>
      <div className="flex items-center mb-4">
        <RiSettings5Fill className="dark:text-white w-7 h-7" />
        <h3 className="ml-4 text-2xl font-bold  font-sans">Settings</h3>
      </div>

      <div className="flex pl-4 items-center justify-between xl:w-3/5 w-full xl:mb-5 mb-3">
        <h4 className="text-xl font-semibold font-Nunito">Form Name</h4>
        <input
          type="text"
          placeholder={placeholder}
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="border w-2/4 border-gray-300 dark:border-gray-500 dark:bg-myblack dark:text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none"
        />
      </div>
      <div className="flex pl-4 items-center justify-between xl:w-3/5 w-full xl:mb-5 mb-3">
        <h4 className="text-xl font-semibold font-Nunito">Webhook Url</h4>
        <input
          type="text"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="border w-2/4 border-gray-300 dark:border-gray-500 dark:bg-myblack dark:text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none"
        />
      </div>
      <div className="flex pl-4 items-center justify-between xl:w-3/5 w-full">
        <h4 className="text-xl font-semibold font-Nunito">Return Url</h4>
        <input
          type="text"
          value={returnUrl}
          onChange={(e) => setReturnUrl(e.target.value)}
          className="border w-2/4 border-gray-300 dark:border-gray-500 dark:bg-myblack dark:text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none"
        />
      </div>

      <div
        id="button-container"
        className="flex  w-full items-center justify-start xl:p-4 py-4"
      >
        <button
          onClick={handleUpdate}
          className={`rounded-3xl font-bold text-white font-Nunito  dark:text-black text-xl bg-mygreen3 px-6 py-2 transform transition-transform hover:scale-95 ${
            !formName && !webhookUrl && !returnUrl && `opacity-50`
          }`}
          disabled={!formName && !webhookUrl && !returnUrl}
        >
          Update
        </button>
        <button
          className="rounded-3xl ml-3   font-bold text-white font-Nunito dark:text-black text-xl bg-myred2 px-6 py-2 transform transition-transform hover:scale-95"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={`${isDark ? `dark` : `light`}`}
      />
    </div>
  );
};

export default Configure;
