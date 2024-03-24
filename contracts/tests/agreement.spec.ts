import {Int,Tez, Nat,Bytes} from '@completium/archetype-ts-types'
import {configure_experiment, get_account, set_mockup, set_mockup_now, set_quiet, delay_mockup_now_by_day} from "@completium/experiment-ts";

import { agreement } from './binding/agreement'
import { share } from './binding/share'
import { factory } from './binding/factory'

import assert from 'assert'

/* Accounts ---------------------------------------------------------------- */

const company = get_account('alice');
const employee = get_account('bob');
const expiration_date = new Date("2026-08-01");
const now = new Date("2024-08-01");
const strike_price1 = new Tez(1.5);

const amount = new Nat(150);
const price = new Tez(100);
const supply = new Nat('1000');

const vesting: [Date, Nat][] = [
  [new Date("2025-08-01"), new Nat('250')],
  [new Date("2025-12-01"), new Nat('10')],
  [new Date("2026-03-01"), new Nat('10')]
];
const total_shares = new Nat(270)
const window = new Nat(60)

const metadata_coin = new Bytes('20');

set_mockup()
set_quiet(true);
set_mockup_now(now)

/* Scenario ---------------------------------------------------------------- */


describe('[SMART-CONTRACT: AGREEMENTS] Factory deployment', () => {
  it('Deploy test_binding', async () => {
    await factory.deploy(employee.get_address(), price, {as:company})
  });
})

describe('[SMART CONTRACT: SHARES] Contracts deployment', () => {
  it('contract deployment should succeed', async () => {
    await share.deploy(company.get_address(), supply, metadata_coin, { as: company })
    await share.approve(factory.get_address(), supply, { as: company })
  });
});


describe('[SMART-CONTRACT: AGREEMENTS] Factory deployment', () => {
  it('Deploy test_binding', async () => {
   const c = await factory.create(
      share.get_address(), 
      employee.get_address(), 
      company.get_address(), 
      expiration_date, 
      strike_price1,
      vesting,
      window, {as:company, amount: price})
    })
})

describe('[SMART-CONTRACT: AGREEMENTS] Agreement deployment', () => {
  it('Deploy test_binding', async () => {
    await agreement.deploy(
      share.get_address(), 
      employee.get_address(), 
      company.get_address(), 
      expiration_date, 
      strike_price1,
      vesting,
      window, {as:company, amount: price})
    await share.transfer(company.get_address(), agreement.get_address(), total_shares, {as: company})

    })
})



describe('[SMART-CONTRACT: AGREEMENTS] Call execute', () => {
  it("Call 'execute()'", async () => {
    delay_mockup_now_by_day(400);
    await agreement.execute(amount, {as:employee, amount:new Tez(225)})

  })
})

describe('[SMART-CONTRACT: AGREEMENTS] Call terminate', () => {
  it("Call 'terminate()'", async () => {
    await agreement.terminate({as:company})

  })
})

describe('[SMART-CONTRACT: AGREEMENTS] Call retrieveExpiredShares()', () => {
  it("Call 'retrieveExpiredShares()'", async () => {
    delay_mockup_now_by_day(2000);
    await agreement.retrieveExpiredShares({as:company})
  })
})

describe('[SMART-CONTRACT: AGREEMENTS] Call view_getBalances()', () => {
  it("Call 'view_getBalances()'", async () => {
    await agreement.view_getBalances({as:company})
  })
})
