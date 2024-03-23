# Testing contracts in TS

This library provides a TypeScript layer on top of [Completium CLI](https://completium.com/docs/cli) library.

## Types

The table below presents exported types:

| Type | Desc |
| -- | -- |
| Micheline | Micheline value |
| MichelineType | Micheline type |
| Account | Account [imported](https://completium.com/docs/cli/account#import-account) with Completium CLI  |
| Parameters | Extra parameters when calling entrypoints (caller and amount of tez sent) |

## Execution modes

### `set_mockup() : void`

Sets Completium to work in [mockup](https://completium.com/docs/cli/network#mockup) mode.

### `set_mockup_now(d) : void`

Sets contract's [`now`](https://archetype-lang.org/docs/reference/expressions/constants#now) value.

| Parameter | Type | Desc |
| -- | -- | -- |
| `d`  | `Date` | Date value for `now` |

### `set_quiet(b) : void`

Sets quiet mode (no execution trace) to `b`.

| Parameter | Type | Desc |
| -- | -- | -- |
| `b`  | `boolean` | quiet mode |

## Account

### `get_account(name) : Account`

Returns [account](#types) named `name`

| Parameter | Type | Desc |
| -- | -- | -- |
| `name`  | `string` | Account name |

### `transfer(from, to, amount) : Promise<void>`

Transfers tez from an account to another.

| Parameter | Type | Desc |
| -- | -- | -- |
| `from`  | `Account` | Account to transfer from |
| `to`  | `Account \| string` | Account or address to transfer to |
| `amount` | `bigint` | Amount to transfer in mutez |


## Crypto

### `pack(obj, typ) : string`

Off-chain version of [`pack`](https://archetype-lang.org/docs/reference/expressions/builtins/#pack(o%20:%20T)) utility

| Parameter | Type | Desc |
| -- | -- | -- |
| `obj`  | `Micheline` | Object to pack |
| `typ`  | `MichelineType \| undefined` | Optional Micheline Type of `obj` |

### `sign(v, a) : Promise<string>`

Off-chain signature utility. A signature is check on-chain with[`check_signature`](https://archetype-lang.org/docs/reference/expressions/builtins/#check_signature(k%20:%20key,%20s%20:%20signature,%20b%20:%20bytes))

| Parameter | Type | Desc |
| -- | -- | -- |
| `v`  | `string` | value to sign |
| `a`  | `Account` | Signer account |

## Contract

### `deploy(path, paramters, p) : Promise<string>)`

Deploys an archetype contract. Returns contract address.

| Parameter | Type | Desc |
| -- | -- | -- |
| `path`  | `string` | Path to archetype contract file (.arl) |
| `parameters`  | `any` | Contract [parameters](https://archetype-lang.org/docs/reference/declarations/contract#parameters) |
| `p` | `Partial<Parameters>` | Deployment parameters |

### `call(addr, entry, arg, params) : Promise<void>`

Calls a contract entrypoint.

| Parameter | Type | Desc |
| -- | -- | -- |
| `addr`  | `string` | Contract address |
| `entry` | `string` | Contract entry point name |
| `arg` | `Micheline` | Entry point parameter |
| `params` | `Partial<Parameters>` | Call parameters |

### `get_storage(addr) : Promise<any`

Returns contract storage.

| Parameter | Type | Desc |
| -- | -- | -- |
| `addr`  | `string` | Contract address |

### `get_big_map_value(bmid, k, t) : Promise<Micheline>`

Returns the value associated to a key in a big_map

| Parameter | Type | Desc |
| -- | -- | -- |
| `bmid`  | `bigint` | Big map identifier |
| `k` | `Michleine` | Key value |
| `t` | `MichelineType` | Key type |

## Flow control

### `expect_to_fail(f, error) : Promise<void>`

Fails if `f` does not fail with `error`

| Parameter | Type | Desc |
| -- | -- | -- |
| `f`  | `{ () : Promise<void> }` | Function to execute |
| `error` | `Michleine` | Error to catch |

## Micheline utilities

| Name |
| -- |
| `prim_to_mich_type` |
| `bool_to_mich` |
| `bigint_to_mich` |
| `string_to_mich` |
| `elt_to_mich` |
| `pair_to_mich` |
| `pair_to_mich_type` |
| `option_to_mich_type` |
| `none_mich` |
| `some_to_mich` |
| `option_to_mich` |
| `list_to_mich` |
| `set_to_mich` |
