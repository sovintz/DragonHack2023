import { makeApi, makeParameters } from "@zodios/core";
import { z } from "zod";

const binSchema = z.object({
  _id: z.string(),
  coordinates: z.array(z.number()),
  level: z.number(),
  closed: z.boolean(),
  battery: z.number(),
  public: z.boolean(),
});

export type Bin = z.infer<typeof binSchema>;

const createBinSchema = z.object({
  coordinates: z.array(z.number()),
  public: z.boolean(),
});

export type CreateBin = z.infer<typeof createBinSchema>;

const binCreateParams = makeParameters([
  {
    name: "bin",
    type: "Body",
    schema: createBinSchema,
  },
]);

export const binsApi = makeApi([
  {
    method: "get",
    path: "/bins",
    alias: "getAllBins",
    description: "Get all bins",
    response: binSchema.array(),
    //errors
  },
  {
    method: "get",
    path: "/path",
    alias: "getPaths",
    description: "Get all paths",
    response: binSchema.array(),
    //errors
  },
  {
    method: "post",
    path: "/bins",
    alias: "createBin",
    description: "Create new bin based on user location",
    parameters: binCreateParams,
    response: z.object({
      acknowledged: z.boolean(),
      insertedId: z.string(),
    }),
  },
]);
