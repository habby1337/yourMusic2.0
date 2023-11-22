export const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;
// Create a type definition file for the environment variables:

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// export const API_URL = window["env"]["BACKEND_API_URL"];
console.log(API_URL, import.meta.env, process.env);
