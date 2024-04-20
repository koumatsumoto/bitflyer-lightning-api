import { z } from "zod";

const nonemptyString = z.string().min(1);
const state = z.enum(["RUNNING", "CLOSED", "STARTING", "PREOPEN", "CIRCUIT BREAK"]);
const health = z.enum(["NORMAL", "BUSY", "VERY BUSY", "SUPER BUSY", "NO ORDER", "STOP"]);
const side = z.enum(["BUY", "SELL"]);
const timeInForce = z.enum(["GTC", "IOC", "FOK"]);
const parentOrderMethod = z.enum(["SIMPLE", "IFD", "OCO", "IFDOCO"]);
const parentOrderType = z.enum(["LIMIT", "MARKET", "STOP", "STOP_LIMIT", "TRAIL"]);
const parentOrderState = z.enum(["ACTIVE", "COMPLETED", "CANCELED", "EXPIRED", "REJECTED"]);
const transactionStatus = z.enum(["PENDING", "COMPLETED"]);
const datetimeString = z.coerce.date();
const positiveNumber = z.number().gt(0);
const positiveNumberOrZero = z.number().gte(0);
const integerId = z.number().min(0);
const tradeType = z.enum([
  "BUY",
  "SELL",
  "DEPOSIT",
  "WITHDRAW",
  "FEE",
  "POST_COLL",
  "CANCEL_COLL",
  "PAYMENT",
  "TRANSFER",
]);

export const Schema = {
  getmarkets: z.array(
    z.object({
      product_code: nonemptyString,
      market_type: nonemptyString,
    }),
  ),
  getboard: z.object({
    mid_price: positiveNumber,
    asks: z.array(
      z.object({
        price: positiveNumber,
        size: positiveNumber,
      }),
    ),
    bids: z.array(
      z.object({
        price: positiveNumber,
        size: positiveNumber,
      }),
    ),
  }),
  getticker: z.object({
    product_code: nonemptyString,
    state: state,
    timestamp: datetimeString,
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
      id: integerId,
      side: side,
      price: positiveNumber,
      size: positiveNumber,
      exec_date: datetimeString,
      buy_child_order_acceptance_id: nonemptyString,
      sell_child_order_acceptance_id: nonemptyString,
    }),
  ),
  getboardstate: z.object({
    health: health,
    state: state,
  }),
  gethealth: z.object({
    status: health,
  }),
  getfundingrate: z.object({
    current_funding_rate: z.number(),
    next_funding_rate_settledate: datetimeString,
  }),
  getcorporateleverage: z.object({
    current_max: positiveNumberOrZero,
    current_startdate: datetimeString,
    next_max: positiveNumberOrZero,
    next_startdate: datetimeString,
  }),
  getchats: z.array(
    z.object({
      nickname: nonemptyString,
      message: nonemptyString,
      date: datetimeString,
    }),
  ),
  getpermissions: z.array(nonemptyString),
  getbalance: z.array(
    z.object({
      currency_code: nonemptyString,
      amount: positiveNumberOrZero,
      available: positiveNumberOrZero,
    }),
  ),
  getcollateral: z.object({
    collateral: positiveNumberOrZero,
    open_position_pnl: z.number(),
    require_collateral: positiveNumberOrZero,
    keep_rate: positiveNumberOrZero,
    margin_call_amount: positiveNumberOrZero,
    margin_call_due_date: datetimeString,
  }),
  getcollateralaccounts: z.array(
    z.object({
      currency_code: nonemptyString,
      amount: positiveNumberOrZero,
    }),
  ),
  getaddresses: z.array(
    z.object({
      type: nonemptyString,
      currency_code: nonemptyString,
      address: nonemptyString,
    }),
  ),
  getcoininouts: z.array(
    z.object({
      id: integerId,
      order_id: nonemptyString,
      currency_code: nonemptyString,
      amount: positiveNumber,
      address: nonemptyString,
      tx_hash: nonemptyString,
      status: transactionStatus,
      event_date: datetimeString,
    }),
  ),
  getbankaccounts: z.array(
    z.object({
      id: integerId,
      is_verified: z.boolean(),
      bank_name: nonemptyString,
      branch_name: nonemptyString,
      account_type: nonemptyString,
      account_number: nonemptyString,
      account_name: nonemptyString,
    }),
  ),
  getdeposits: z.array(
    z.object({
      id: integerId,
      order_id: nonemptyString,
      currency_code: nonemptyString,
      amount: positiveNumber,
      status: transactionStatus,
      event_date: datetimeString,
    }),
  ),
  withdraw: z.object({
    message_id: nonemptyString,
  }),
  sendchildorder: z.object({
    child_order_acceptance_id: nonemptyString,
  }),
  sendparentorder: z.object({
    parent_order_acceptance_id: nonemptyString,
  }),
  cancelchildorder: z.object({}),
  cancelparentorder: z.object({}),
  getparentorders: z.array(
    z.object({
      id: integerId,
      parent_order_id: nonemptyString,
      product_code: nonemptyString,
      side: side,
      parent_order_type: parentOrderType,
      price: positiveNumberOrZero,
      average_price: positiveNumberOrZero,
      size: positiveNumber,
      parent_order_state: parentOrderState,
      expire_date: datetimeString,
      parent_order_date: datetimeString,
      parent_order_acceptance_id: nonemptyString,
      outstanding_size: positiveNumberOrZero,
      cancel_size: positiveNumberOrZero,
      executed_size: positiveNumberOrZero,
      total_commission: positiveNumberOrZero,
    }),
  ),
  getparentorder: z.object({
    id: integerId,
    parent_order_id: nonemptyString,
    order_method: parentOrderMethod,
    expire_date: datetimeString,
    time_in_force: timeInForce,
    parameters: z.array(
      z.object({
        product_code: nonemptyString,
        condition_type: parentOrderType,
        side: side,
        price: positiveNumberOrZero,
        size: positiveNumber,
        trigger_price: positiveNumberOrZero,
        offset: positiveNumberOrZero,
      }),
    ),
  }),
  getchildexecutions: z.array(
    z.object({
      id: integerId,
      child_order_id: nonemptyString,
      side: side,
      price: positiveNumber,
      size: positiveNumber,
      commission: positiveNumberOrZero,
      exec_date: datetimeString,
      child_order_acceptance_id: nonemptyString,
    }),
  ),
  getbalancehistory: z.array(
    z.object({
      id: integerId,
      trade_date: datetimeString,
      event_date: datetimeString,
      product_code: nonemptyString,
      currency_code: nonemptyString,
      trade_type: tradeType,
      price: positiveNumberOrZero,
      amount: z.number(),
      quantity: z.number(),
      commission: z.number(),
      balance: positiveNumberOrZero,
      order_id: nonemptyString,
    }),
  ),
  getpositions: z.array(
    z.object({
      product_code: nonemptyString,
      side: side,
      price: positiveNumber,
      size: positiveNumber,
      commission: positiveNumberOrZero,
      swap_point_accumulate: z.number(),
      require_collateral: positiveNumber,
      open_date: datetimeString,
      leverage: positiveNumber,
      pnl: z.number(),
      sfd: z.number(),
    }),
  ),
  getcollateralhistory: z.array(
    z.object({
      id: integerId,
      currency_code: nonemptyString,
      change: z.number(),
      amount: z.number(),
      reason_code: nonemptyString,
      date: datetimeString,
    }),
  ),
  gettradingcommission: z.object({
    commission_rate: positiveNumberOrZero,
  }),
};
