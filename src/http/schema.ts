import { z } from "zod";

export const Schema = {
  getmarkets: z.array(
    z.object({
      product_code: z.string().min(1),
      market_type: z.string().min(1),
    }),
  ),
  getboard: z.object({
    mid_price: z.number(),
    asks: z.array(
      z.object({
        price: z.number(),
        size: z.number(),
      }),
    ),
    bids: z.array(
      z.object({
        price: z.number(),
        size: z.number(),
      }),
    ),
  }),
  getpermissions: z.array(z.string().min(1)),
  cancelchildorder: z.object({}),
};
