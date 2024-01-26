import api from "../../../api";
import { useMutation } from "@tanstack/react-query";

const useRegistration = () => { 
    const register = useMutation({
        mutationFn: async (data: object) => {
            const response = await api.post("/users/register", data);
            return response;
        },
        onSuccess: (data) => {
            console.log("Response Data: ", data);
            console.log("registration Successfull");
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    })

    return register;
}

export default useRegistration;