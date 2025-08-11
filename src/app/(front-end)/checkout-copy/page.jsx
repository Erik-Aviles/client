"use client";
import { ChevronRight, ShoppingBag } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const steps = [
    {
      id: "step 1",
      name: "Personal Information",
      fields: ["firstName", "lastName", "email"],
    },
    {
      id: "step 2",
      name: "Shipping Address",
      fields: ["firstName", "lastName", "email"],
    },
    {
      id: "step 3",
      name: "Payment Method",
      fields: ["firstName", "lastName", "email"],
    },
    {
      id: "step 4",
      name: "Confirmation",
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm();

  async function handleNextStep() {
    const fields = steps[currentStep].fields;
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentStep < steps.length - 1) {
      if (currentStep < steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setCurrentStep((step) => step + 1);
    }
  }
  function handlePrevStep() {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  }
  function renderButton() {
    if (currentStep > 3) {
      return null;
    } else if (currentStep === 3) {
      return (
        <div className="">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
          >
            Complete Checkout
          </button>
        </div>
      );
    } else {
      return (
        <div className="">
          <button
            disabled={!isValid}
            onClick={handleNextStep}
            type="button"
            className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700 disabled:bg-gray-500"
          >
            Next Step
          </button>
        </div>
      );
    }
  }
  async function processForm(data) {
    //Call api
    console.log(data);
    reset();
  }
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto">
          <nav className="flex">
            <ol
              role="list"
              className="flex flex-wrap gap-y-5 md:gap-y-0 items-center gap-x-1.5"
            >
              <li>
                <div className="-m-1">
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center p-1 text-sm font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700"
                  >
                    Cart
                    <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold bg-gray-400 rounded-full text-gray-50">
                      {" "}
                      4{" "}
                    </span>
                  </a>
                </div>
              </li>

              {steps.map((step) => {
                return (
                  <li key={step.id}>
                    <div className="flex items-center">
                      <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
                      <div className="-m-1">
                        <a
                          href="#"
                          title=""
                          className="p-1 ml-1.5 text-sm font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700"
                        >
                          {" "}
                          {step.name}
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="mt-6 overflow-hidden bg-white rounded-lg shadow md:mt-10">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              {/* Banner */}
              <div className="bg-gray-100 rounded-xl">
                <div className="p-4">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center flex-1">
                      <div className="inline-flex items-center justify-center flex-shrink-0 bg-gray-400 rounded-full w-9 h-9 text-gray-50">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <p className="ml-3 text-base font-normal text-gray-900">
                        You have 4 items in cart. Sub total is{" "}
                        <span className="font-bold">$699</span>
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0">
                      <button
                        type="button"
                        className="inline-flex items-center px-4
                                            py-2
                                            text-sm
                                            font-bold
                                            text-gray-600
                                            transition-all
                                            duration-200
                                            border border-gray-300
                                            rounded-md
                                            bg-gray-50
                                            hover:bg-white hover:text-gray-900
                                            focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-offset-2 focus:ring-gray-500
                                        "
                      >
                        Edit cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Banner end */}
              {/* Form Start*/}
              <form onSubmit={handleSubmit(processForm)}>
                {currentStep >= 0 && (
                  <section className={currentStep === 0 ? "block" : "hidden"}>
                    <p className="mt-6 text-base font-bold text-gray-900">
                      Personal Information
                    </p>
                    <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <div>
                        <label htmlFor=""> First name </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name=""
                            id=""
                            {...register("firstName", { required: true })}
                            placeholder=""
                            className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                          />
                          {errors.firstName?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.firstName?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor=""> Last name </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name=""
                            id=""
                            {...register("lastName", { required: true })}
                            placeholder=""
                            className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                          />
                          {errors.lastName?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.lastName?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor=""> Email address </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            name=""
                            id=""
                            {...register("email", { required: true })}
                            placeholder=""
                            className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                          />
                          {errors.email?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}
                {currentStep >= 1 && (
                  <section className={currentStep === 0 ? "block" : "hidden"}>
                    <p className="mt-6 text-base font-bold text-gray-900">
                      Shipping Address
                    </p>
                    <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <div>
                        <label htmlFor=""> First name </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name=""
                            id=""
                            {...register("firstName", { required: true })}
                            placeholder=""
                            className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                          />
                          {errors.firstName?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.firstName?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor=""> Last name </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name=""
                            id=""
                            {...register("lastName", { required: true })}
                            placeholder=""
                            className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                          />
                          {errors.lastName?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.lastName?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor=""> Email address </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            name=""
                            id=""
                            {...register("email", { required: true })}
                            placeholder=""
                            className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                          />
                          {errors.email?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}
                {currentStep >= 2 && (
                  <section className={currentStep === 0 ? "block" : "hidden"}>
                    <p className="mt-6 text-base font-bold text-gray-900">
                      Payment Method
                    </p>
                    <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <div>
                        <label htmlFor=""> First name </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name=""
                            id=""
                            {...register("firstName", { required: true })}
                            placeholder=""
                            className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                          />
                          {errors.firstName?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.firstName?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor=""> Last name </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name=""
                            id=""
                            {...register("lastName", { required: true })}
                            placeholder=""
                            className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                          />
                          {errors.lastName?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.lastName?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor=""> Email address </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            name=""
                            id=""
                            {...register("email", { required: true })}
                            placeholder=""
                            className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                          />
                          {errors.email?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}
                {currentStep >= 3 && (
                  <section className={currentStep === 0 ? "block" : "hidden"}>
                    <p className="mt-6 text-base font-bold text-gray-900">
                      Confirmation
                    </p>
                    <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <h2>Her is all the Data that have been saved</h2>
                    </div>
                  </section>
                )}
                {renderButton()}
                <pre>{JSON.stringify(watch(), null, 2)}</pre>
              </form>
              {/* Form  End*/}

              {/* Navigation Buttons */}
              <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-x-6 gap-y-5">
                {/* Prev */}
                <div className="">
                  <button
                    onClick={handlePrevStep}
                    type="button"
                    className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                  >
                    Prev Step
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
