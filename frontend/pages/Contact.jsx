import React from "react";
import Banner from "../components/Banner";

const Contact = () => {
  return (
    <div>
      <Banner name={"Contact"} />
      <div className="w-full mx-auto px-2 lg:w-9/12 md:px-6 mt-4 lg:mt-6 flex flex-col md:flex-row justify-between gap-10">
        <section className="w-full md:w-[30rem] bg-primary-content rounded-md p-6 h-72">
          <div className="mb-10">
            <h1 className="text-xl md:text-3xl mb-2">Contact Information</h1>
            <p className="md:text-lg">
              Fill the form or contact us via other channels
            </p>
          </div>
          <div className="flex items-center gap-2 my-2 md:text-xl">
            <i class="fa-solid fa-envelope"></i>
            <a href="https://gmail.google.com/gmail/?view=cm&fs=1&tf=1&to=Support@eshop.com">Support@eshop.com</a>
          </div>
          <div className="flex items-center gap-2 my-2 md:text-xl">
            <i class="fa-solid fa-phone"></i>
            <a href="">91-123-12345</a>
          </div>
          <div className="flex items-center gap-2 my-2 md:text-xl">
            <i class="fa-brands fa-twitter"></i>
            <a href="https://x.com/yash384139">@yash384139</a>
          </div>
        </section>
        <section className="w-full md:w-2/3 rounded-md shadow-lg border-2 p-6">
        <h1 className="text-xl md:text-3xl"> Contact Us</h1>
        <form className="form-control">
          <div className="py-2">
            <label className="label-text md:font-semibold mb-2 block text-lg">Name:</label>
            <input className="input input-bordered max-w-lg w-full border-2"></input>
          </div>
          <div className="py-2">
            <label className="label-text md:font-semibold mb-2 block text-lg">Email:</label>
            <input className="input input-bordered max-w-lg w-full border-2"></input>
          </div>
          <div className="py-2">
            <label className="label-text md:font-semibold mb-2 block text-lg">Subject:</label>
            <input className="input input-bordered max-w-lg w-full border-2"></input>
          </div>
          <div className="py-2">
            <label className="label-text md:font-semibold mb-2 block text-lg">Message:</label>
            <textarea className="textarea textarea-bordered max-w-[100%] w-full"></textarea>
          </div>
          <button className="btn max-w-xs w-full btn-outline btn-success">
            SEND MESSAGE
          </button>
        </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
