import { BigNumber } from 'bignumber.js'
import bs58check from 'bs58check';

/*
** source: ./lib_protocol/michelson_v1_primitives.ml
*/

/* Micheline Type --------------------------------------------------------- */

export type MTprim = {
  "prim": "address" | "bls12_381_fr" | "bls12_381_g1" | "bls12_381_g2" | "bool" | "bytes" |
  "chain_id" | "chest" | "chest_key" | "int" | "key" | "key_hash" | "mutez" | "nat" |
  "never" | "operation" | "signature" | "string" | "timestamp" | "unit"
  "annots"?: Array<string>
}

export type MTsingle = {
  "prim": "contract" | "list" | "option" | "set" | "ticket",
  "args": [MichelineType]
  "annots"?: Array<string>
}

export type MTint = {
  "prim": "sapling_transaction" | "sapling_state",
  "args": [
    { "int": string }
  ]
  "annots"?: Array<string>
}

export type MTPairArray = {
  "prim": "pair",
  "args": Array<MichelineType>
  "annots"?: Array<string>
}

export type MTpair = {
  "prim": "big_map" | "lambda" | "map" | "or",
  "args": [MichelineType, MichelineType]
  "annots"?: Array<string>
}

export type MichelineType =
  | MTprim
  | MTsingle
  | MTint
  | MTpair
  | MTPairArray

/* Micheline -------------------------------------------------------------- */

export type Mprim = {
  "prim": "True" | "False" | "None" | "Unit"
}

export type Mstring = {
  "string": string
}

export type Mbytes = {
  "bytes": string
}

export type Mint = {
  "int": string
}

export type Mpair = {
  "prim": "Pair",
  "args": Array<Micheline>
}

export type Melt = {
  "prim": "Elt",
  "args": [Micheline, Micheline]
}

export type Msingle = {
  "prim": "Some" | "Right" | "Left" | "Lambda_rec",
  "args": [Micheline]
}

export type MMichelineInstr = {
  "prim": "PACK" | "UNPACK" | "BLAKE2B" | "SHA256" | "SHA512" | "ABS" | "ADD" | "AMOUNT" | "AND" | "BALANCE" | "CAR" | "CDR" | "CHAIN_ID" | "CHECK_SIGNATURE" | "COMPARE" | "CONCAT" | "CONS" | "CREATE_ACCOUNT" | "CREATE_CONTRACT" | "IMPLICIT_ACCOUNT" | "DIP" | "DROP" | "DUP" | "VIEW" | "EDIV" | "EMPTY_BIG_MAP" | "EMPTY_MAP" | "EMPTY_SET" | "EQ" | "EXEC" | "APPLY" | "FAILWITH" | "GE" | "GET" | "GET_AND_UPDATE" | "GT" | "HASH_KEY" | "IF" | "IF_CONS" | "IF_LEFT" | "IF_NONE" | "INT" | "LAMBDA" | "LAMBDA_REC" | "LE" | "LEFT" | "LEVEL" | "LOOP" | "LSL" | "LSR" | "LT" | "MAP" | "MEM" | "MUL" | "NEG" | "NEQ" | "NIL" | "NONE" | "NOT" | "NOW" | "MIN_BLOCK_TIME" | "OR" | "PAIR" | "UNPAIR" | "PUSH" | "RIGHT" | "SIZE" | "SOME" | "SOURCE" | "SENDER" | "SELF" | "SELF_ADDRESS" | "SLICE" | "STEPS_TO_QUOTA" | "SUB" | "SUB_MUTEZ" | "SWAP" | "TRANSFER_TOKENS" | "SET_DELEGATE" | "UNIT" | "UPDATE" | "XOR" | "ITER" | "LOOP_LEFT" | "ADDRESS" | "CONTRACT" | "ISNAT" | "CAST" | "RENAME" | "SAPLING_EMPTY_STATE" | "SAPLING_VERIFY_UPDATE" | "DIG" | "DUG" | "NEVER" | "VOTING_POWER" | "TOTAL_VOTING_POWER" | "KECCAK" | "SHA3" | "PAIRING_CHECK" | "TICKET" | "TICKET_DEPRECATED" | "READ_TICKET" | "SPLIT_TICKET" | "JOIN_TICKETS" | "OPEN_CHEST" | "EMIT" | "BYTES"
  "args"?: Array<Micheline>
  "annots"?: Array<string>
}

export type MMichelineKeyword = {
  "prim": "parameter" | "storage" | "code" | "view"
  "args"?: Array<Micheline>
  "annots"?: Array<string>
}

export type MMichelineConstantHash = {
  "prim": "constant"
  "args"?: Array<Micheline>
  "annots"?: Array<string>
}

export type Marray = Array<Micheline>

export type Micheline =
  | Mprim
  | Mstring
  | Mbytes
  | Mint
  | Msingle
  | Mpair
  | Melt
  | Marray
  | MichelineType
  | MMichelineInstr
  | MMichelineKeyword
  | MMichelineConstantHash

export type ArchetypeTypeArg = ArchetypeType | Array<ArchetypeTypeArg> | string | Date | boolean

export interface DeployResult {
  address: string
}

export interface OriginateResult {
  address: string
}

export interface EventData {
  from: Address,
  type: MichelineType,
  tag: string,
  payload: Micheline,
  consumed_gas: number
}

export interface CallResult {
  operation_hash: string,
  storage_size: number,
  consumed_gas: number,
  paid_storage_size_diff: number,
  events: Array<EventData>
}

export interface BatchResult {
  events: Array<EventData>,
  dummy: number
}

export interface GetterResult {
  value: any,
  events: Array<EventData>,
  dummy: number
}

export interface ViewResult {
  value: any
  dummy: number
}

export interface TransferResult {
  dummy: number
}

export interface CallParameter {
  destination: Address,
  amount: Tez,
  fee?: Tez,
  entrypoint: string,
  arg: Micheline
}

/* Archetype value */

export abstract class ArchetypeType {
  abstract toString(): string
}

/* Constants --------------------------------------------------------------- */

export const none_mich: Micheline = {
  "prim": "None"
}

export const some_to_mich = (a: Micheline): Micheline => {
  return {
    prim: "Some",
    args: [a]
  }
}

/* Utils ------------------------------------------------------------------- */

export const micheline_equals = (lhs: Micheline, rhs: Micheline): boolean => {
  return JSON.stringify(lhs, null, 0) == JSON.stringify(rhs, null, 0)
}

export const list_equals = <T>(l1: Array<T>, l2: Array<T>, cmp: { (e1: T, e2: T): boolean }): boolean => {
  if (l1.length == l2.length) {
    for (let i = 0; i < l1.length; i++) {
      if (!cmp(l1[i], l2[i])) {
        return false
      }
    }
    return true
  }
  return false
}

export const getter_args_to_mich = (arg: Micheline, callback: Entrypoint): Micheline => {
  return pair_to_mich([arg, callback.to_mich()]);
}

/* Internal utils ---------------------------------------------------------- */

interface data_prefix {
  size: number,
  prefix: string
}

const is_base58_input_valid = (input: string, prefixes: { [char: string]: data_prefix }) => {
  const prefixes_keys = Object.keys(prefixes)

  const match = new RegExp(`^(${prefixes_keys.join('|')})`).exec(input);
  if (!match || match.length == 0) throw new Error(`No matching prefix found. Received input: ${input}`)

  let decoded: Buffer | undefined = bs58check.decodeUnsafe(input);
  if (!decoded) throw new Error(`Input is not b58 encoding compatible. Received input: ${input}`)

  const prefix = match[0];

  decoded = decoded.subarray(prefix.length)

  if (decoded.length != prefixes[prefix].size) throw new Error(`The decoded output is the wrong length for the given prefix of ${prefix}.`)
  return input
}

/* Internal constants ---------------------------------------------------------- */
const address_prefixes: { [char: string]: data_prefix } = {
  tz1: { size: 20, prefix: "\\006\\161\\159" },
  tz2: { size: 20, prefix: "\\006\\161\\161" },
  tz3: { size: 20, prefix: "\\006\\161\\164" },
  tz4: { size: 20, prefix: "\\006\\161\\166" },
  KT1: { size: 20, prefix: "\\002\\090\\121" },
  sr1: { size: 20, prefix: "\\006\\124\\117" }
}

const public_key_prefixes: { [char: string]: data_prefix } = {
  edpk: { size: 32, prefix: "\\013\\015\\037\\217" },
  sppk: { size: 33, prefix: "\\003\\254\\226\\086" },
  p2pk: { size: 33, prefix: "\\003\\178\\139\\127" },
}

const signature_prefixes: { [char: string]: data_prefix } = {
  sig: { size: 64, prefix: "\\004\\130\\043" },
  edsig: { size: 64, prefix: "\\009\\245\\205\\134\\018" },
  spsig: { size: 64, prefix: "\\013\\115\\101\\019\\063" },
  p2sig: { size: 63, prefix: "\\054\\240\\044\\052" }
}

const chain_id_prefixes: { [char: string]: data_prefix } = {
  Net: { size: 4, prefix: "\\087\\082\\000" }
}

const prefixes: { [char: string]: data_prefix } = {
  ...address_prefixes,
  ...public_key_prefixes,
  ...signature_prefixes,
  ...chain_id_prefixes,
}

/* Int Nat Entrypoint Classes ---------------------------------------------- */

// Function to convert a hexadecimal string to a Buffer object
function hexStringToBuffer(hexString: string): Buffer {
  // Check if the input is a valid hexadecimal string
  if (!/^([0-9a-fA-F]{2})+$/.test(hexString)) {
    throw new Error('Invalid hexadecimal string provided.');
  }

  // Convert the hexadecimal string to a Buffer object
  const buffer = Buffer.from(hexString, 'hex');
  return buffer;
}

function escapeSequenceToHexString(input: string): string {
  const regex = /\\(\d{3})/g;
  let hexString = '';

  input.replace(regex, (_, octalString: string) => {
    const octal = parseInt(octalString, 10);
    const hex = octal.toString(16).padStart(2, '0');
    hexString += hex;
    return '';
  });

  return hexString;
}

function encode_prefix(prefix: string, data: string): string {
  return bs58check.encode(hexStringToBuffer(escapeSequenceToHexString(prefix) + data))
}

function extract_address_input(input: string): [string, string] {
  const first = input.substring(0, 2);

  switch (first) {
    case "00": {
      const second = input.substring(2, 4)
      const data = input.substring(4)
      const a: data_prefix = (() => {
        switch (second) {
          case "00": return prefixes.tz1;
          case "01": return prefixes.tz2;
          case "02": return prefixes.tz3;
          case "03": return prefixes.tz4;
          default: throw new Error(`Unknown implicit address: 0x${second}`)
        }
      })();
      return [a.prefix, data];
    }
    case "01": {
      const data = input.substring(2, 42);
      return [prefixes.KT1.prefix, data]
    }
    case "03": {
      const data = input.substring(2, 42);
      return [prefixes.sr1.prefix, data]
    }
    default: throw new Error(`Invalid input: 0x${input}`)
  }
}

export class Address implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    this._content = is_base58_input_valid(v, address_prefixes)
  }
  to_mich(): Micheline {
    return string_to_mich(this._content)
  }
  static from_mich(x: Micheline): Address {
    if ((x as Mbytes)["bytes"]) {
      const input = (x as Mbytes)["bytes"];
      const [prefix, data] = extract_address_input(input);
      return new Address(encode_prefix(prefix, data))
    } else {
      return new Address((x as Mstring)["string"])
    }
  }
  equals(a: Address): boolean {
    return this._content == a.toString()
  }
  toString(): string {
    return this._content
  }
}

export class Bls12_381_fr implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  static from_mich(x: Micheline): Bls12_381_fr {
    return new Bls12_381_fr((x as Mbytes)["bytes"])
  }
  equals = (x: Bls12_381_fr): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Bls12_381_g1 implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  static from_mich(x: Micheline): Bls12_381_g1 {
    return new Bls12_381_g1((x as Mbytes)["bytes"])
  }
  equals = (x: Bls12_381_g1): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Bls12_381_g2 implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  static from_mich(x: Micheline): Bls12_381_g2 {
    return new Bls12_381_g2((x as Mbytes)["bytes"])
  }
  equals = (x: Bls12_381_g2): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Bytes implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  static from_mich(x: Micheline): Bytes {
    return new Bytes((x as Mbytes)["bytes"])
  }
  equals = (x: Bytes): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
  /**
   * Encode string to hexadecimal bytes
   * @param s string to encode
   * @returns new bytes object
   */
  static hex_encode(s: string): Bytes {
    const output = Buffer.from(s).toString('hex')
    return new Bytes(output)
  }
  /**
   * Decodes hexadecimal bytes to string
   * @returns decoded string
   */
  hex_decode = (): string => {
    const output = Buffer.from(this._content, 'hex').toString();
    return output
  }
}

export class Chain_id implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    this._content = is_base58_input_valid(v, chain_id_prefixes)
  }
  to_mich(): Micheline {
    return {
      "string": this._content
    }
  }
  static from_mich(x: Micheline): Chain_id {
    if ((x as Mbytes)["bytes"]) {
      const input = (x as Mbytes)["bytes"];
      return new Chain_id(encode_prefix(prefixes.Net.prefix, input))
    } else {
      return new Chain_id((x as Mstring)["string"])
    }
  }
  equals = (x: Chain_id): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Chest implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  static from_mich(x: Micheline): Chest {
    return new Chest((x as Mbytes)["bytes"])
  }
  equals = (x: Chest): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Chest_key implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  static from_mich(x: Micheline): Chest_key {
    return new Chest_key((x as Mbytes)["bytes"])
  }
  equals = (x: Chest_key): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Duration implements ArchetypeType {
  private _content: number
  constructor(v: string) {
    this._content = this.convert_duration_literal_to_seconds(v)
  }
  to_mich(): Micheline {
    return { "int": this._content.toString() }
  }
  static from_mich(x: Micheline): Duration {
    return new Duration((x as Mint)["int"])
  }
  equals(a: Duration): boolean {
    return this._content.toString() == a.toString()
  }
  toString(): string {
    return this._content.toString()
  }
  toSecond(): number {
    return this._content;
  }
  private DURATION_CONVERSION = {
    'w': 1 * 60 * 60 * 24 * 7,
    'd': 1 * 60 * 60 * 24,
    'h': 1 * 60 * 60,
    'm': 1 * 60,
    's': 1
  }
  private is_duration_valid(input: string) {
    const pos_regexp = new RegExp(/(\d+[wdhms]){1,5}/)
    const pos_valid = input.match(pos_regexp)
    if (pos_valid && pos_valid[0] !== input) return false
    return Object.keys(this.DURATION_CONVERSION).reduce((acc, key) => {
      const regexp = new RegExp(`\\d+${key}`);
      const ritem_value = input.match(regexp)
      return acc || ritem_value != null
    }, false)
  }
  private convert_duration_literal_to_seconds(input: string) {
    const regexpDigits = new RegExp(/^(-)?\d+$/);
    const valueDigits = input.match(regexpDigits)
    if (valueDigits != null) {
      return Number.parseInt(valueDigits[0], 10)
    }

    if (!this.is_duration_valid(input))
      throw new Error("Invalid duration input. Received input: `" + input + "' Try this format: '_w_d_h_m_s'.")

    return Object.entries(this.DURATION_CONVERSION).reduce((acc, [key, value]) => {
      let item_value = 0;
      const regexp = new RegExp(`\\d+${key}`);
      const ritem_value = input.match(regexp)
      if (ritem_value != null) {
        const v = ritem_value[0].slice(0, -1);
        item_value = Number.parseInt(v, 10)
      }
      return item_value * value + acc
    }, 0)
  }
}

export class Entrypoint implements ArchetypeType {
  addr: string
  name: string
  constructor(a: Address, n: string) {
    this.addr = a.toString()
    this.name = n
  }
  to_mich = (): Micheline => {
    return string_to_mich(this.toString())
  }
  equals = (x: Entrypoint): boolean => {
    return this.addr == x.addr && this.name == x.name
  }
  toString(): string {
    return this.addr + '%' + this.name
  }
  static from_mich(x: Micheline): Entrypoint {
    const data = (x as Mstring)["string"];
    if (data.indexOf("%") > 0) {
      const arr = data.split("%");
      return new Entrypoint(new Address(arr[0]), arr[1])
    } else {
      return new Entrypoint(new Address(data), "default")
    }
  }
}

export abstract class Enum<T> implements ArchetypeType {
  constructor(private _kind: T) { }
  type() { return this._kind }
  abstract to_mich(): Micheline
  abstract toString(): string
}

export class Int implements ArchetypeType {
  private _content: BigNumber
  constructor(v: string | number | BigNumber) {
    this._content = new BigNumber(v)
    if (this._content.comparedTo(this._content.integerValue()) != 0) {
      throw new Error("Not an Int value: " + v.toString())
    } else {
      this._content = new BigNumber(v)
    }
  }
  to_mich = (): Micheline => {
    return { "int": this._content.toFixed() }
  }
  static from_mich(x: Micheline): Int {
    return new Int((x as Mint)["int"])
  }
  to_big_number(): BigNumber {
    return this._content
  }
  to_number(): number {
    return this._content.toNumber()
  }
  plus(x: Int): Int {
    return new Int(this._content.plus(x.to_big_number()))
  }
  minus(x: Int): Int {
    return new Int(this._content.minus(x.to_big_number()))
  }
  times(x: Int): Int {
    return new Int(this._content.times(x.to_big_number()))
  }
  div(x: Int): BigNumber {
    return this._content.div(x.to_big_number())
  }
  equals = (x: Int): boolean => {
    return this._content.isEqualTo(x.to_big_number())
  }
  toString(): string {
    return this._content.toFixed()
  }
}

export class Key implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    this._content = is_base58_input_valid(v, public_key_prefixes)
  }
  to_mich(): Micheline {
    return {
      "string": this._content
    }
  }
  static from_mich(x: Micheline): Key {
    if ((x as Mbytes)["bytes"]) {
      const input = (x as Mbytes)["bytes"];
      const first = input.substring(0, 2);
      const prefix = (() => {
        switch (first) {
          case "00": return prefixes.edpk.prefix
          case "01": return prefixes.sppk.prefix
          case "02": return prefixes.p2pk.prefix
          default: throw new Error("Invalid input")
        }
      })();
      return new Key(encode_prefix(prefix, input.substring(2)))
    } else {
      return new Key((x as Mstring)["string"])
    }
  }
  equals = (x: Key): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Key_hash implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    this._content = is_base58_input_valid(v, address_prefixes)
  }
  to_mich(): Micheline {
    return string_to_mich(this._content)
  }
  static from_mich(x: Micheline): Key_hash {
    if ((x as Mbytes)["bytes"]) {
      const input = (x as Mbytes)["bytes"];
      const [prefix, data] = extract_address_input(input);
      return new Key_hash(encode_prefix(prefix, data))
    } else {
      return new Key_hash((x as Mstring)["string"])
    }
  }
  equals = (x: Key_hash): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Nat implements ArchetypeType {
  private _content: BigNumber
  constructor(v: string | number | BigNumber) {
    this._content = new BigNumber(v)
    if (this._content.comparedTo(this._content.integerValue()) != 0 || this._content.isLessThan(new BigNumber(0))) {
      throw new Error("Not an Nat value: " + v.toString())
    }
  }
  to_mich = (): Micheline => {
    return { "int": this._content.toFixed() }
  }
  static from_mich(x: Micheline): Nat {
    return new Nat((x as Mint)["int"])
  }
  to_big_number(): BigNumber {
    return this._content
  }
  to_number(): number {
    return this._content.toNumber()
  }
  plus(x: Nat): Nat {
    return new Nat(this._content.plus(x.to_big_number()))
  }
  minus(x: Nat): Int {
    return new Int(this._content.minus(x.to_big_number()))
  }
  times(x: Nat): Nat {
    return new Nat(this._content.times(x.to_big_number()))
  }
  div(x: Nat): Rational {
    return new Rational(this._content.div(x.to_big_number()))
  }
  equals = (x: Nat): boolean => {
    return this._content.isEqualTo(x.to_big_number())
  }
  toString = () => {
    return this._content.toFixed()
  }
}

export class Option<T extends ArchetypeTypeArg> implements ArchetypeType {
  _content: T | undefined | null
  constructor(v: T | undefined | null) {
    this._content = v
  }
  static None = <T extends ArchetypeTypeArg>() => { return new Option<T>(null) }
  static Some = <T extends ArchetypeTypeArg>(v: T) => { return new Option<T>(v) }
  get = (): T => {
    if (this._content != undefined && this._content != null) {
      return this._content
    } else {
      throw new Error("Option.get : is none")
    }
  }
  is_none(): boolean {
    return this._content == undefined || this._content == null
  }
  is_some(): boolean {
    return this._content != undefined && this._content != null
  }
  to_mich = (f: ((_: T) => Micheline)): Micheline => {
    if (this._content == undefined || this._content == null) {
      return none_mich
    }
    const mich = f(this._content)
    return some_to_mich(mich)
  };
  static from_mich<T extends ArchetypeTypeArg>(x: Micheline, mich_to: (_: any) => T): Option<T> {
    if ("prim" in x) {
      switch (x.prim) {
        case "None": return new Option<T>(undefined)
        case "Some": return new Option<T>(mich_to(x.args[0]))
      }
    }
    throw new Error("Option.from_mich: prim not found")
  }
  equals = (o: Option<T>) => {
    return this.toString() == o.toString()
  }
  toString = (): string => {
    if (this._content == undefined || this._content == null) {
      return "None"
    } else {
      let str: string
      switch (typeof this._content) {
        case "string": str = this._content; break;
        case "boolean": str = this._content.toString(); break;
        case "object": {
          // js hack ...
          if (this._content instanceof Date) {
            const d = this._content
            str = d.toISOString()
          } else {
            str = this._content.toString()
          }
          break
        }
      }
      return "Some (" + str + ")"
    }
  };
}

export class Or<T1 extends ArchetypeTypeArg, T2 extends ArchetypeTypeArg> implements ArchetypeType {
  _content: T1 | T2
  _is_left: boolean
  constructor(v: T1 | T2, is_left: boolean) {
    this._content = v
    this._is_left = is_left
  }
  static Left = <T1 extends ArchetypeTypeArg, T2 extends ArchetypeTypeArg>(v: T1) => { return new Or<T1, T2>(v, true) }
  static Right = <T1 extends ArchetypeTypeArg, T2 extends ArchetypeTypeArg>(v: T2) => { return new Or<T1, T2>(v, false) }
  get = (): T1 | T2 => {
    if (this._content != undefined && this._content != null) {
      return this._content
    } else {
      throw new Error("Or.get : is not defined")
    }
  }
  is_left() { return this._is_left }
  is_right() { return !this.is_left }
  to_mich(f_left: ((_: T1) => Micheline), f_right: ((_: T2) => Micheline)): Micheline {
    if (this.is_left()) {
      const c_left: T1 = this._content as T1;
      const mich = f_left(c_left)
      return left_to_mich(mich)
    } else {
      const c_right: T2 = this._content as T2;
      const mich = f_right(c_right)
      return right_to_mich(mich)
    }
  }
  static from_mich<T1 extends ArchetypeType, T2 extends ArchetypeType>(x: Micheline, mich_to_left: ((_: Micheline) => T1), mich_to_right: ((_: Micheline) => T2)): Or<T1, T2> {
    const p = (x as Msingle);
    if (p.prim == "Left") {
      return Or.Left<T1, T2>(mich_to_left(p.args[0]))
    }
    if (p.prim == "Right") {
      return Or.Right<T1, T2>(mich_to_right(p.args[0]))
    }
    throw new Error(`Or.from_mich: Invalid prim ${p.prim}`)
  }
  toString(): string {
    let str: string
    switch (typeof this._content) {
      case "string": str = this._content; break;
      case "boolean": str = this._content.toString(); break;
      case "object":
        // js hack ...
        if (this._content instanceof Date) {
          const d = this._content
          str = d.toISOString()
        } else {
          str = this._content.toString()
        }
    }
    if (this.is_left()) {
      return "Left (" + str + ")"
    } else {
      return "Right (" + str + ")"
    }
  }
  equals = (o: Or<T1, T2>) => {
    return this.toString() == o.toString()
  }
}

export class Rational implements ArchetypeType {
  private _content: BigNumber

  extract_number = (input: string | number | BigNumber): BigNumber => {
    switch (typeof input) {
      case "string": {
        const parsed = input.endsWith('%') ? parseFloat(input) / 100 : input
        if (null !== parsed && !Number.isNaN(parsed)) {
          return new BigNumber(parsed)
        } else {
          throw new Error("Rational error: '" + input + "' not a number")
        }
      }
    }
    return new BigNumber(input)
  }

  constructor(v: string | number | BigNumber, denom: string | number | BigNumber = new BigNumber(1)) {
    const numerator = this.extract_number(v)
    const denominator = this.extract_number(denom)

    this._content = numerator.div(denominator)
  }
  to_mich = (): Micheline => {
    const [num, denom] = this._content.toFraction()
    return {
      prim: "Pair",
      args: [
        { "int": num.toFixed() },
        { "int": denom.toFixed() }
      ]
    }
  }
  static from_mich(x: Micheline): Rational {
    const numerator = new BigNumber(((x as Mpair).args[0] as Mint)["int"])
    const denominator = new BigNumber(((x as Mpair).args[1] as Mint)["int"])
    return new Rational(numerator.dividedBy(denominator))
  }
  to_big_number(): BigNumber {
    return this._content
  }
  to_number(): number {
    return this._content.toNumber()
  }
  plus(x: Rational): Rational {
    return new Rational(this._content.plus(x.to_big_number()))
  }
  minus(x: Rational): Rational {
    return new Rational(this._content.minus(x.to_big_number()))
  }
  times(x: Rational): Rational {
    return new Rational(this._content.times(x.to_big_number()))
  }
  div(x: Rational): Rational {
    return new Rational(this._content.div(x.to_big_number()))
  }
  floor(): Int {
    return new Int(this._content.integerValue(BigNumber.ROUND_FLOOR))
  }
  ceil(): Int {
    return new Int(this._content.integerValue(BigNumber.ROUND_CEIL))
  }
  equals = (x: Rational): boolean => {
    return this._content.isEqualTo(x.to_big_number())
  }
  toString = (): string => {
    return this._content.toFixed()
  }
}

export class Sapling_state implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "int": this._content
    }
  }
  static from_mich(x: Micheline): Sapling_state {
    return new Sapling_state((x as Mint)["int"])
  }
  equals = (x: Sapling_state): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Sapling_transaction implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  static from_mich(x: Micheline): Sapling_transaction {
    return new Sapling_transaction((x as Mbytes)["bytes"])
  }
  equals = (x: Sapling_transaction): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Signature implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    this._content = is_base58_input_valid(v, signature_prefixes)
  }
  to_mich(): Micheline {
    return {
      "string": this._content
    }
  }
  static from_mich(x: Micheline): Signature {
    if ((x as Mbytes)["bytes"]) {
      const input = (x as Mbytes)["bytes"];
      return new Signature(encode_prefix(prefixes.sig.prefix, input))
    } else {
      return new Signature((x as Mstring)["string"])
    }
  }
  equals = (x: Signature): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
  normalize(): string {
    if (this._content.startsWith("sig")) {
      return this._content
    }
    const prefix = this._content.substring(0, 5)
    const start = (() => {
      switch (prefix) {
        case "edsig": return 5;
        case "spsig": return 5;
        case "p2sig": return 4;
        default: throw new Error("Internal error")
      }
    })();

    const data = bs58check.decodeUnsafe(this._content)
    if (data === undefined) {
      throw new Error("Internal error")
    }
    return bs58check.encode(Buffer.concat([hexStringToBuffer(escapeSequenceToHexString(signature_prefixes.sig.prefix)), data.subarray(start)]))
  }
}

export class Tez implements ArchetypeType {
  private _content: BigNumber
  constructor(v: string | number | BigNumber, unit: "tez" | "mutez" = "tez") {
    this._content = new BigNumber(v)
    switch (unit) {
      case "mutez":
        if (this._content.comparedTo(this._content.integerValue()) != 0)
          throw new Error("Mutez value must be integer");
        break
      case "tez":
        if (this._content.isLessThan(new BigNumber(0))) throw new Error("Tez value must not be negative")
        if (this._content.isGreaterThan(new BigNumber("")) || this._content.isNaN()) throw new Error("Invalid Tez value")
        this._content = new BigNumber(this._content.times(1000000).integerValue(BigNumber.ROUND_FLOOR))
    }
  }
  to_mich = (): Micheline => {
    return { "int": this.toString() }
  }
  static from_mich(x: Micheline): Tez {
    return new Tez((x as Mint)["int"], "mutez")
  }
  to_big_number(): BigNumber {
    return this._content
  }
  plus(x: Tez): Tez {
    return new Tez(this._content.plus(x.to_big_number()), "mutez")
  }
  minus(x: Tez): Tez {
    return new Tez(this._content.minus(x.to_big_number()), "mutez")
  }
  times(x: Nat): Tez {
    return new Tez(this._content.times(x.to_big_number()), "mutez")
  }
  equals = (x: Tez): boolean => {
    return this._content.isEqualTo(x.to_big_number())
  }
  toString = (unit: "tez" | "mutez" = "mutez"): string => {
    if (unit == "tez") return this._content.div(1000000).toFixed()
    return this._content.toFixed()
  }
}

export class Ticket<T extends ArchetypeTypeArg> implements ArchetypeType {
  ticketer: Address
  contents: T
  amount: Nat
  constructor(ticketer: Address, contents: T, amount: Nat) {
    this.ticketer = ticketer
    this.contents = contents
    this.amount = amount
  }
  get_ticketer = (): Address => { return this.ticketer }
  get_contents = (): T => { return this.contents }
  get_amount = (): Nat => { return this.amount }
  to_mich = (f: ((_: T) => Micheline)): Micheline => {
    const arg_ticketer = { "string": this.ticketer.toString() };
    const arg_contents = f(this.contents);
    const arg_amount: Mint = { "int": this.amount.toString() };
    return { prim: "Pair", args: [arg_ticketer, arg_contents, arg_amount] }
  };
  static from_mich<T extends ArchetypeType>(x: Micheline, mich_to: (_: Micheline) => T): Ticket<T> {
    const source = new Address(((x as Mpair).args[0] as Mstring)["string"])
    const value = mich_to((x as Mpair).args[1]);
    const amount = new Nat(((x as Mpair).args[2] as Mint)["int"])
    return new Ticket<T>(source, value, amount)
  }
  equals = (t: Ticket<T>) => {
    return this.toString() == t.toString()
  }
  toString = (): string => {
    return `(${this.ticketer.toString()}, ${this.contents.toString()}, ${this.amount.toString()})`
  };
}

export class Unit implements ArchetypeType {
  to_mich(): Micheline {
    return {
      "prim": "Unit"
    }
  }
  static from_mich(x: Micheline): Unit {
    return new Unit()
  }
  equals = (x: Unit): boolean => {
    return true
  }
  toString = (): string => {
    return "Unit"
  }
}

/* to Micheline ------------------------------------------------------------ */

export const prim_to_mich_type = (
  p: "address" | "bls12_381_fr" | "bls12_381_g1" | "bls12_381_g2" | "bool" | "bytes" |
    "chain_id" | "chest" | "chest_key" | "int" | "key" | "key_hash" | "mutez" | "nat" |
    "never" | "operation" | "signature" | "string" | "timestamp" | "unit"): MichelineType => {
  return {
    prim: p,
    annots: []
  }
}

export const prim_annot_to_mich_type = (
  p: "address" | "bls12_381_fr" | "bls12_381_g1" | "bls12_381_g2" | "bool" | "bytes" |
    "chain_id" | "chest" | "chest_key" | "int" | "key" | "key_hash" | "mutez" | "nat" |
    "never" | "operation" | "signature" | "string" | "timestamp" | "unit",
  a: Array<string>): MichelineType => {
  return {
    prim: p,
    annots: a
  }
}

export const unit_mich: Micheline = { prim: "Unit" }

export const unit_to_mich = (): Micheline => {
  return unit_mich
}

export const string_to_mich = (v: string): Micheline => {
  return { "string": v }
}

export const bool_to_mich = (v: boolean): Micheline => {
  return v ? { "prim": "True" } : { "prim": "False" }
}

export const date_to_mich = (v: Date): Micheline => {
  return { "int": Math.floor(v.getTime() / 1000).toString() }
}

export const elt_to_mich = (a: Micheline, b: Micheline): Micheline => {
  return {
    prim: "Elt",
    args: [a, b]
  }
}

export const left_to_mich = (v: Micheline): Micheline => {
  return {
    prim: "Left",
    args: [v]
  }
}

export const right_to_mich = (v: Micheline): Micheline => {
  return {
    prim: "Right",
    args: [v]
  }
}

export const or_to_mich_type = (l: MichelineType, r: MichelineType, a: string[] = []): MichelineType => {
  return {
    prim: "or",
    args: [l, r],
    annots: a
  }
}

export const pair_to_mich = (l: Array<Micheline>): Micheline => {
  return {
    prim: "Pair",
    args: l
  }
}

export const pair_to_mich_type = (prim: "big_map" | "lambda" | "map" | "or", a: MichelineType, b: MichelineType): MichelineType => {
  return {
    prim: prim,
    args: [a, b],
    annots: []
  }
}

export const pair_annot_to_mich_type = (prim: "big_map" | "lambda" | "map" | "or", a: MichelineType, b: MichelineType, annots: Array<string>): MichelineType => {
  return {
    prim: prim,
    args: [a, b],
    annots: annots
  }
}

export const pair_array_to_mich_type = (l: Array<MichelineType>, annots: Array<string> = []): MichelineType => {
  return {
    prim: "pair",
    args: l,
    annots: annots
  }
}

export const mich_array_to_mich = (l: Array<Micheline>): Micheline => {
  if (l.length == 1) {
    return l[0]
  }
  if (l.length == 2) {
    return pair_to_mich(l)
  } else {
    return pair_to_mich([l[0], mich_array_to_mich(l.slice(1))])
  }
}

export const contract_to_mich_type = (a: MichelineType): MichelineType => {
  return {
    prim: "contract",
    args: [a],
    annots: []
  }
}

export const contract_annot_to_mich_type = (mt: MichelineType, a: Array<string>): MichelineType => {
  return {
    prim: "contract",
    args: [mt],
    annots: a
  }
}

export const option_to_mich_type = (a: MichelineType): MichelineType => {
  return {
    prim: "option",
    args: [a],
    annots: []
  }
}

export const option_annot_to_mich_type = (mt: MichelineType, a: Array<string>): MichelineType => {
  return {
    prim: "option",
    args: [mt],
    annots: a
  }
}

export const ticket_to_mich_type = (a: MichelineType): MichelineType => {
  return {
    prim: "ticket",
    args: [a],
    annots: []
  }
}

export const ticket_annot_to_mich_type = (mt: MichelineType, a: Array<string>): MichelineType => {
  return {
    prim: "ticket",
    args: [mt],
    annots: a
  }
}

export const list_to_mich = <T>(l: Array<T>, to_mich: { (a: T): Micheline }): Micheline => {
  return l.map(x => to_mich(x))
}

export const list_to_mich_type = (mt: MichelineType): MichelineType => {
  return {
    prim: "list",
    args: [mt],
    annots: []
  }
}

export const list_annot_to_mich_type = (mt: MichelineType, a: Array<string>): MichelineType => {
  return {
    prim: "list",
    args: [mt],
    annots: a
  }
}

export const set_to_mich_type = (mt: MichelineType): MichelineType => {
  return {
    prim: "set",
    args: [mt],
    annots: []
  }
}

export const set_annot_to_mich_type = (mt: MichelineType, a: Array<string>): MichelineType => {
  return {
    prim: "set",
    args: [mt],
    annots: a
  }
}

export const set_to_mich = <T>(s: Set<T>, to_json: { (a: T): Micheline }) => {
  Array.from(s.values()).map(x => to_json(x))
}

export const string_cmp = (a: string, b: string) => {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

export const date_cmp = (a: Date, b: Date): boolean => {
  return (a.getTime() - a.getMilliseconds()) == (b.getTime() - b.getMilliseconds())
}

export const mich_to_pairs = (x: Micheline): Array<Micheline> => {
  return (x as Mpair)["args"]
}

export const annotated_mich_to_array = (x: Micheline, t: MichelineType): Array<Micheline> => {
  const internal_mich_to_array = (x: Micheline, t: MichelineType, acc: Array<Micheline>): Array<Micheline> => {
    if (t.annots && t.annots.length > 0) {
      acc.push(x)
      return acc
    } else {
      switch (t.prim) {
        case "pair": {
          const pair = (x as Mpair)
          return (pair.args.reduce((a: Array<Micheline>, x: Micheline, i: number) => {
            return internal_mich_to_array(x, t.args[i], a)
          }, acc));
        }
        default: throw new Error("internal_mich_to_array: found an unannotated node that is not a pair but a '" + t.prim + "'")
      }
    }
  }
  return internal_mich_to_array(x, t, [])
}

export const mich_to_string = (x: Micheline): string => {
  return (x as Mstring)["string"]
}

export const mich_to_date = (x: Micheline): Date => {
  return new Date((x as Mstring)["string"])
}

export const mich_to_bool = (x: Micheline): boolean => {
  switch ((x as Mprim).prim) {
    case "False": return false
    case "True": return true
    default: throw new Error("mich_to_bool: invalid prim '" + (x as Mprim).prim + "'")
  }
}

export const mich_to_list = <T>(x: Micheline, mich_to: (_: Micheline) => T): Array<T> => {
  const xlist = (x as Marray)
  return xlist.map(mich_to)
}

export const mich_to_map = <K, V>(x: Micheline, f: { (k: Micheline, v: Micheline): [K, V] }): Array<[K, V]> => {
  return (x as Marray).map((elt: Micheline) => {
    const k = (elt as Melt)["args"][0]
    const v = (elt as Melt)["args"][1]
    return f(k, v)
  })
}

export const is_left = (x: Micheline): boolean => {
  return (x as Msingle)["prim"] == "Left"
}

export const is_right = (x: Micheline): boolean => {
  return (x as Msingle)["prim"] == "Right"
}


export type UnsafeMicheline =
  | { prim: string, annots?: Array<string>, args?: Array<UnsafeMicheline> }
  | { string: string }
  | { int: string }
  | { bytes: string }
  | { var: string } // need for param
  | Array<UnsafeMicheline>

export const replace_var = (x: UnsafeMicheline, params: Array<[string, Micheline]>): Micheline => {
  const convert_const = (x: string): string => { return `const_${x}__` };
  const aux = (x: UnsafeMicheline): Micheline => {
    if ((x as { var: string }).var) {
      const id = (x as { var: string }).var
      const v = params.reduce((accu: (Micheline | null), x: [string, Micheline]) => {
        if (x[0] == id || convert_const(x[0]) == id) {
          return x[1]
        } else {
          return accu
        }
      }, null);
      if (v == null) {
        throw (`Error: cannot replace var ${id} in replace_var`)
      }
      return v;
    } if ((x as { args: Array<UnsafeMicheline> }).args) {
      const new_args = (x as { args: Array<UnsafeMicheline> }).args.map(x => replace_var(x, params));
      return ({ ...x, args: new_args } as Micheline);
    } if ((x as Array<UnsafeMicheline>) && (x as Array<UnsafeMicheline>).length > 0) {
      return (x as Array<UnsafeMicheline>).map(x => replace_var(x, params))
    } else {
      return (x as Micheline);
    }
  }
  return aux(x);
}

export const normalize = (input: UnsafeMicheline): UnsafeMicheline => {
  if (isPrimWithArgs(input)) {
    const args = input.args.map(normalize);
    if (args.length > 0) {
      const last = args[args.length - 1];
      if (isPrimWithArgs(last) && last.prim === 'Pair') {
        return { ...input, args: [...args.slice(0, -1), ...last.args] };
      }
    }
    return { ...input, args };
  } else if (isArray(input)) {
    return input.map(normalize);
  }
  return input;
};

function isPrimWithArgs(input: UnsafeMicheline): input is { prim: 'Pair'; args: Array<UnsafeMicheline> } {
  return typeof input === 'object' && input !== null && 'prim' in input && input.prim === 'Pair' && 'args' in input;
}

function isArray(input: UnsafeMicheline): input is Array<UnsafeMicheline> {
  return Array.isArray(input);
}
