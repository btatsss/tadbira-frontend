import api from "../api/axios";

export const sendContact = async (
    name: string,
    email: string,
    message: string,
    interests : string[] ,
) => {
    return api.post("/api/contact", {
        name,
        email,
        message,
        interests,
    });
};
