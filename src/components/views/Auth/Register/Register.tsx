import { Button, Card, CardBody, Input } from "@heroui/react";

import Image from "next/image";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { visiblePassword, handleVisiblePassword } = useRegister();

  return (
    <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
      <div className="w-full lg:w-1/3">
        <Image
          src="/images/illustration/login.svg"
          alt="register"
          className="w-full"
          width={1024}
          height={1024}
        />
      </div>
      <Card className="p-10">
        <CardBody>
          <h2 className="text-xl font-bold text-green-500">Create Account</h2>
          <form className="mt-4 flex w-80 flex-col gap-4">
            <Input
              label="Email"
              type="email"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              label="Fullname"
              type="text"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              label="Password"
              type={visiblePassword.password ? "text" : "password"}
              variant="bordered"
              autoComplete="off"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => handleVisiblePassword("password")}
                >
                  {visiblePassword.password ? (
                    <FaEye className="pointer-events-none text-xl text-default-400" />
                  ) : (
                    <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                  )}
                </button>
              }
            />
            <Input
              label="Password Confirmation"
              type={visiblePassword.passwordConfirmation ? "text" : "password"}
              variant="bordered"
              autoComplete="off"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => handleVisiblePassword("passwordConfirmation")}
                >
                  {visiblePassword.passwordConfirmation ? (
                    <FaEye className="pointer-events-none text-xl text-default-400" />
                  ) : (
                    <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                  )}
                </button>
              }
            />
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
