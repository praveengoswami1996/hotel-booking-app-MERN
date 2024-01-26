import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import Input from "../core/ui/Input";
import PasswordInput from "../core/ui/PasswordInput";
import useRegistration from "../hooks/mutations/user/useRegistration";

type RegistrationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<RegistrationFormData>({ mode: "all" });

  const { mutate: registerUser } = useRegistration();

  const onSubmit = (formData: object) => {
    registerUser(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-3">
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: {
                value: true,
                message: "First name is required"
            },
            pattern: {
                value: /^[A-Za-z\s.'-]+$/,
                message: "Please enter a valid first name",
            },
          }}

          render={({ field: { value, onChange } }) => {
            return (
              <Input 
                label="First Name" 
                placeholder="Enter your first name"
                value={ value || "" }
                onChange={ onChange } 
                error={ errors.firstName?.message }
              />
            );
          }}
        />

        <Controller
          name="lastName"
          control={control}
          rules={{
            required: {
                value: true,
                message: "Last name is required"
            },
            pattern: {
                value: /^[A-Za-z\s.'-]+$/,
                message: "Please enter a valid last name",
            },
          }}
          render={({ field: { value, onChange } }) => {
            return (
              <Input 
                label="Last Name" 
                placeholder="Enter your last name"
                value={ value || "" }
                onChange={ onChange } 
                error={ errors.lastName?.message }
              />
            );
          }}
        />
      </div>

      <div>
        <Controller
          name="email"
          control={control}
          rules={{
            required: {
                value: true,
                message: "Email address is required"
            },
            pattern: {
                value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address format",
            },
          }}
          render={({ field: { value, onChange } }) => {
            return (
              <Input 
                type="email"
                label="Email" 
                placeholder="Enter your email address"
                value={ value || "" }
                onChange={ onChange } 
                error={ errors.email?.message }
              />
            );
          }}
        />
      </div>

      <div>
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
                value: true,
                message: "Please create a password"
            },
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
            },
            maxLength: {
                value: 20,
                message: "Password length cannot exceed 20 characters",
            },
            pattern: {
                value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                message:
                "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character from @, $, !, %, *, ?, &,.",
            },
          }}
          render={({ field: { value, onChange } }) => {
            return (
              <PasswordInput
                label="Password" 
                placeholder="Please create a password"
                value={ value || "" }
                onChange={ onChange } 
                error={ errors.password?.message }
              />
            );
          }}
        />
      </div>

      <div>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: {
                value: !!watch('password'),
                message: "Please confirm your password"
            },
            validate: (fieldValue) => {
                return (
                    fieldValue === watch('password') || "Password did not match"
                )
            }
          }}
          render={({ field: { value, onChange } }) => {
            return (
              <PasswordInput
                label="Confirm Password" 
                placeholder="Please re-enter your password"
                value={ value || "" }
                onChange={ onChange } 
                error={ errors.confirmPassword?.message }
              />
            );
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
            <span className="text-base font-semibold">Already registered? Sign in here</span>
        </div>
        <div>
          <button 
            type="submit" 
            className="bg-blue-600 text-white text-xl font-bold px-4 py-2 rounded-md"
          >
            Create Account
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
