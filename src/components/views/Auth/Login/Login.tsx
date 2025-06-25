import { Button, Card, CardBody, Input } from "@heroui/react";
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
      <Card className="w-full max-w-5xl rounded-2xl  p-6 shadow-lg backdrop-blur-md ">
        <CardBody className="flex flex-col items-center gap-10 lg:flex-row">
          <div className="hidden w-full lg:block lg:w-1/2">
            <Image
              src="/images/illustration/login.png"
              alt="login"
              className="w-full rounded-lg shadow"
              width={1024}
              height={1024}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-center">
              <Image
                src="/images/general/logo.png"
                alt="Logo"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              <div className="max-w-[200px]">
                <h1 className=" font-bold text-green-700 leading-tight">
                  Rekam Medis Elektronik
                </h1>
              </div>
            </div>

            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold text-green-600">Login</h2>
              <span className="text-sm text-gray-600">
                Silakan login untuk melanjutkan
              </span>
            </div>

            <form
              className="flex flex-col gap-4"
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
                    isInvalid={!!errors.email}
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
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
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
                className="font-semibold text-white"
                type="submit"
                disabled={isPendingLogin}
                isLoading={isPendingLogin}
              >
                Login
              </Button>
            </form>

            {errors.root && (
              <p className="mt-3 rounded bg-red-400 p-3 text-center font-semibold text-white">
                {errors.root.message}
              </p>
            )}
          </div>
        </CardBody>
      </Card>
  );
};

export default Login;
