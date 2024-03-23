import {Int,Tez} from '@completium/archetype-ts-types'
import {configure_experiment, get_account, set_mockup, set_mockup_now, set_quiet, delay_mockup_now_by_day} from "@completium/experiment-ts";

import { subscription } from './binding/subscription'

import assert from 'assert'
import { Address } from "@completium/archetype-ts-types";

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');
const bob = get_account('bob');
const token_id1 = new Int(1);
const token_id2 = new Int(2);

const value1 = new Tez(1.5);
const value2 = new Tez(15);
const value3 = new Tez(1);

// constants
const next_year = new Date("2025-06-01") 
const next_month = new Date("2024-07-01")  
const now = new Date("2024-06-01")

set_mockup_now(now)

set_mockup()
set_quiet(true);

/* Initialisation ---------------------------------------------------------- */

/* Scenario ---------------------------------------------------------------- */

describe('[SUBSCRIPTION] Contract deployment', () => {
  it('Deploy test_binding', async () => {
    await subscription.deploy(alice.get_address(),{as:alice})
  });
})

describe('[SUBSCRIPT] Call subscribe type 1', () => {
  it("Call 'subscribe type 1'", async () => {
    await subscription.subscribe(token_id1,{amount:value1, as: alice})
    const aliceUser = await subscription.get_User();
    assert(aliceUser[0][0].equals(alice.get_address()));
    assert(aliceUser[0][1]['nextPayment'].getTime()===next_month.getTime());
    assert(aliceUser[0][1]['subType'].equals(token_id1));
  })
})

describe('[SUBSCRIPT] Call payBill type 1', () => {
  it("Call 'payBill type 1'", async () => {
    await subscription.payBill({amount:value1, as: alice})
    const aliceUser = await subscription.get_User();
    assert(aliceUser[0][0].equals(alice.get_address()));
    assert(aliceUser[0][1]['nextPayment'].getTime()===next_month.getTime());
  })
})

describe('[SUBSCRIPT] Call subscribe type 2', () => {
  it("Call 'subscribe type 2'", async () => {
    await subscription.subscribe(token_id2,{amount:value2, as:bob})
    const bobUser = await subscription.get_User();
    assert(bobUser[1][0].equals(bob.get_address()));
    assert(bobUser[1][1]['nextPayment'].getTime()===next_year.getTime());
    assert(bobUser[1][1]['subType'].equals(token_id2));
  })
})

describe('[SUBSCRIPT] Call payBill type 2', () => {
  it("Call 'payBill type 2'", async () => {
    await subscription.payBill({amount:value2, as:bob});
    const bobUser = await subscription.get_User();
    assert(bobUser[1][0].equals(bob.get_address()));
    assert(bobUser[1][1]['nextPayment'].getTime()===next_year.getTime());
  })
})

describe('[SUBSCRIPT] Call cancelSubscription', () => {
  it("Call 'CancelSubscription'", async () => {
    await subscription.cancelSubscription({as:bob});
    const User = await subscription.get_User();
    assert(User.length===1)
  })
})


describe('[SUBSCRIPT] Call subscribe type 2 - already added!', () => {
  it("Call 'subscribe type 2' - ERROR", async () => {
    await subscription.subscribe(token_id2,{amount:value2, as:alice})
  })
})

describe('[SUBSCRIPT] Call subscribe type 2 - wrong price!', () => {
  it("Call 'subscribe type 2 - ERROR'", async () => {
    await subscription.subscribe(token_id2,{amount:value3, as:bob})
  })
})


describe('[SUBSCRIPT] Call payBill type 1 - late payment!', () => {
  it("Call 'payBill type 1' - ERROR", async () => {
    delay_mockup_now_by_day(60);
    await subscription.payBill({amount:value1, as: alice})
    const aliceUser = await subscription.get_User();
    assert(aliceUser[0][0].equals(alice.get_address()));
    assert(aliceUser[0][1]['nextPayment'].getTime()===next_month.getTime());
  })
})



