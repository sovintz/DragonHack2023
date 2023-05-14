import { Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import { binsApi } from "./endpoints";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const apiClient = new Zodios(API_URL, [...binsApi]);
const apiHooks = new ZodiosHooks("binsApi", apiClient);

export default apiHooks;
