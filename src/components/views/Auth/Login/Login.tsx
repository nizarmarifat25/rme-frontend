import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";

import Image from "next/image";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";

const Login = () => {
  const {
    isVisible,
    control,
    toggleVisibility,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();


  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="w-full lg:w-1/3">
        <Image
          src="/images/illustration/login.svg"
          alt="login"
          className="w-full"
          width={1024}
          height={1024}
        />
      </div>
      <Card className="p-10">
        <CardBody>
          <h2 className="text-xl font-bold text-green-500">Login</h2>
          <form
            className="mt-4 flex w-80 flex-col gap-4"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email"
                  type="email"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Password"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => toggleVisibility()}
                    >
                      {isVisible ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                />
              )}
            />

            <Button
              color="success"
              size="md"
              className="text-white"
              type="submit"
              disabled={isPendingLogin}
              isLoading={isPendingLogin}
            >
             Login
            </Button>
          </form>
          {errors.root ? (
            <p className="mt-2 rounded bg-red-400 p-3 text-center font-semibold text-white">
              {errors.root?.message}
            </p>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
