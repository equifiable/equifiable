import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class agreement__balances implements att.ArchetypeType {
    constructor(public granted: att.Nat, public future: att.Nat, public available: att.Nat, public exercised: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.granted.to_mich(), this.future.to_mich(), this.available.to_mich(), this.exercised.to_mich()]);
    }
    equals(v: agreement__balances): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): agreement__balances {
        return new agreement__balances(att.Nat.from_mich((input as att.Mpair).args[0]), att.Nat.from_mich((input as att.Mpair).args[1]), att.Nat.from_mich((input as att.Mpair).args[2]), att.Nat.from_mich((input as att.Mpair).args[3]));
    }
}
export const agreement__balances_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%granted"]),
    att.prim_annot_to_mich_type("nat", ["%future"]),
    att.prim_annot_to_mich_type("nat", ["%available"]),
    att.prim_annot_to_mich_type("nat", ["%exercised"])
], []);
const setPrice_arg_to_mich = (newPrice: att.Tez): att.Micheline => {
    return newPrice.to_mich();
}
const create_arg_to_mich = (share_address: att.Address, recipient: att.Address, company_address: att.Address, expiration_date: Date, strike_price: att.Tez, vesting: Array<[
    Date,
    att.Nat
]>, post_termination_exercise_window: att.Nat): att.Micheline => {
    return att.pair_to_mich([
        share_address.to_mich(),
        recipient.to_mich(),
        company_address.to_mich(),
        att.date_to_mich(expiration_date),
        strike_price.to_mich(),
        att.list_to_mich(vesting, x => {
            return att.pair_to_mich([att.date_to_mich(x[0]), x[1].to_mich()]);
        }),
        post_termination_exercise_window.to_mich()
    ]);
}
export class Factory {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(owner: att.Address, price: att.Tez, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./src/factory.arl", {
            owner: owner.to_mich(),
            price: price.to_mich()
        }, params)).address;
        this.address = address;
    }
    async setPrice(newPrice: att.Tez, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "setPrice", setPrice_arg_to_mich(newPrice), params);
        }
        throw new Error("Contract not initialised");
    }
    async create(share_address: att.Address, recipient: att.Address, company_address: att.Address, expiration_date: Date, strike_price: att.Tez, vesting: Array<[
        Date,
        att.Nat
    ]>, post_termination_exercise_window: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "create", create_arg_to_mich(share_address, recipient, company_address, expiration_date, strike_price, vesting, post_termination_exercise_window), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_setPrice_param(newPrice: att.Tez, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "setPrice", setPrice_arg_to_mich(newPrice), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_create_param(share_address: att.Address, recipient: att.Address, company_address: att.Address, expiration_date: Date, strike_price: att.Tez, vesting: Array<[
        Date,
        att.Nat
    ]>, post_termination_exercise_window: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "create", create_arg_to_mich(share_address, recipient, company_address, expiration_date, strike_price, vesting, post_termination_exercise_window), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_owner(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Address.from_mich((storage as att.Mpair).args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_price(): Promise<att.Tez> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Tez.from_mich((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        r1: att.string_to_mich("\"InsufficientTransfer\""),
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\"")
    };
}
export const factory = new Factory();
