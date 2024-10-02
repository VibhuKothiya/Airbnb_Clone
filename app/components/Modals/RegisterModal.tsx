'use client';

import axios from "axios";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../../components/Modals/Modal";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  console.log('isLoading:', isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors }, // Correctly access errors from formState
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit:SubmitHandler<FieldValues>= (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}               // Access registerModal's isOpen directly
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}             // Access onClose from registerModal
        onSubmit={handleSubmit(onSubmit)}
        body={
          <div>
            <input
              {...register("name", { required: true })}
              placeholder="Name"
              disabled={isLoading}
            />
            {errors.name && <p>Name is required</p>}

            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              disabled={isLoading}
            />
            {errors.email && <p>Email is required</p>}

            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              disabled={isLoading}
            />
            {errors.password && <p>Password is required</p>}
          </div>
        }
        footer={
          <div>
            <p>
              Already have an account?{" "}
              <span
                onClick={onToggle}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Log in
              </span>
            </p>
          </div>
        }
      />
    </>
  );
}