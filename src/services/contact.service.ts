import api from "../api/axios";

export const sendContact = async (
    name: string,
    email: string,
    message: string,
    interests : string[] ,
) => {
    return api.post("/contact", {
        name,
        email,
        message,
        interests,
    });
};
