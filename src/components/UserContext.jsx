import { createContext } from "react";

export const UserContext = createContext({ name: "", email: "" });
export const CategoryContext = createContext("Java");
export const AnnotationContext = createContext([]);
