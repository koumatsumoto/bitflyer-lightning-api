import { z } from "zod";

const state = ["RUNNING", "CLOSED", "STARTING", "PREOPEN", "CIRCUIT BREAK"] as const;
const health = ["NORMAL", "BUSY", "VERY BUSY", "SUPER BUSY", "NO ORDER", "STOP"] as const;
const side = ["BUY", "SELL"] as const;

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
  getticker: z.object({
    product_code: z.string().min(1),
    state: z.enum(state),
    timestamp: z.coerce.date(),
    tick_id: z.number(),
    best_bid: z.number(),
    best_ask: z.number(),
    best_bid_size: z.number(),
    best_ask_size: z.number(),
    total_bid_depth: z.number(),
    total_ask_depth: z.number(),
    market_bid_size: z.number(),
    market_ask_size: z.number(),
    ltp: z.number(),
    volume: z.number(),
    volume_by_product: z.number(),
  }),
  getexecutions: z.array(
    z.object({
      id: z.number().min(0),
      side: z.enum(side),
      price: z.number().min(0),
      size: z.number().min(0),
      exec_date: z.coerce.date(),
      buy_child_order_acceptance_id: z.string().min(1),
      sell_child_order_acceptance_id: z.string().min(1),
    }),
  ),
  getboardstate: z.object({
    health: z.enum(health),
    state: z.enum(state),
  }),
  gethealth: z.object({
    status: z.enum(health),
  }),
  getfundingrate: z.object({
    current_funding_rate: z.number(),
    next_funding_rate_settledate: z.coerce.date(),
  }),
  getcorporateleverage: z.object({
    current_max: z.number().min(0),
    current_startdate: z.coerce.date(),
    next_max: z.number().min(0),
    next_startdate: z.coerce.date(),
  }),
  getchats: z.array(
    z.object({
      nickname: z.string().min(1),
      message: z.string().min(1),
      date: z.coerce.date(),
    }),
  ),
  getpermissions: z.array(z.string().min(1)),
  cancelchildorder: z.object({}),
};
