import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class balances implements att.ArchetypeType {
    constructor(public granted: att.Nat, public future: att.Nat, public available: att.Nat, public exercised: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.granted.to_mich(), this.future.to_mich(), this.available.to_mich(), this.exercised.to_mich()]);
    }
    equals(v: balances): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): balances {
        return new balances(att.Nat.from_mich((input as att.Mpair).args[0]), att.Nat.from_mich((input as att.Mpair).args[1]), att.Nat.from_mich((input as att.Mpair).args[2]), att.Nat.from_mich((input as att.Mpair).args[3]));
    }
}
export const balances_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%granted"]),
    att.prim_annot_to_mich_type("nat", ["%future"]),
    att.prim_annot_to_mich_type("nat", ["%available"]),
    att.prim_annot_to_mich_type("nat", ["%exercised"])
], []);
export const executions_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("timestamp", []);
export const executions_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export type executions_container = Array<[
    Date,
    att.Nat
]>;
export const executions_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("timestamp", []), att.prim_annot_to_mich_type("nat", []), []);
const execute_arg_to_mich = (amount: att.Nat): att.Micheline => {
    return amount.to_mich();
}
const terminate_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const retrieveExpiredShares_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const view_getBalances_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Agreement {
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
    async deploy(share_address: att.Address, recipient: att.Address, company_address: att.Address, expiration_date: Date, strike_price: att.Tez, vesting: Array<[
        Date,
        att.Nat
    ]>, post_termination_exercise_window: att.Nat, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./src/agreement.arl", {
            share_address: share_address.to_mich(),
            recipient: recipient.to_mich(),
            company_address: company_address.to_mich(),
            expiration_date: att.date_to_mich(expiration_date),
            strike_price: strike_price.to_mich(),
            vesting: att.list_to_mich(vesting, x => {
                return att.pair_to_mich([att.date_to_mich(x[0]), x[1].to_mich()]);
            }),
            post_termination_exercise_window: post_termination_exercise_window.to_mich()
        }, params)).address;
        this.address = address;
    }
    async execute(amount: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "execute", execute_arg_to_mich(amount), params);
        }
        throw new Error("Contract not initialised");
    }
    async terminate(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "terminate", terminate_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async retrieveExpiredShares(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "retrieveExpiredShares", retrieveExpiredShares_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_execute_param(amount: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "execute", execute_arg_to_mich(amount), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_terminate_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "terminate", terminate_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_retrieveExpiredShares_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "retrieveExpiredShares", retrieveExpiredShares_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async view_getBalances(params: Partial<ex.Parameters>): Promise<balances | undefined> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "getBalances", view_getBalances_arg_to_mich(), params);
            return mich.value ? balances.from_mich(mich.value) : undefined;
        }
        throw new Error("Contract not initialised");
    }
    async get_share_address(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Address.from_mich((storage as att.Mpair).args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_recipient(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Address.from_mich((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialised");
    }
    async get_company_address(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Address.from_mich((storage as att.Mpair).args[2]);
        }
        throw new Error("Contract not initialised");
    }
    async get_expiration_date(): Promise<Date> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_date((storage as att.Mpair).args[3]);
        }
        throw new Error("Contract not initialised");
    }
    async get_strike_price(): Promise<att.Tez> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Tez.from_mich((storage as att.Mpair).args[4]);
        }
        throw new Error("Contract not initialised");
    }
    async get_vesting(): Promise<Array<[
        Date,
        att.Nat
    ]>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list((storage as att.Mpair).args[5], x => { return (p => {
                return [att.mich_to_date((p as att.Mpair).args[0]), att.Nat.from_mich((p as att.Mpair).args[1])];
            })(x); });
        }
        throw new Error("Contract not initialised");
    }
    async get_post_termination_exercise_window(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Nat.from_mich((storage as att.Mpair).args[6]);
        }
        throw new Error("Contract not initialised");
    }
    async get_executions(): Promise<executions_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map((storage as att.Mpair).args[7], (x, y) => [att.mich_to_date(x), att.Nat.from_mich(y)]);
        }
        throw new Error("Contract not initialised");
    }
    async get_exercised_tokens(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Nat.from_mich((storage as att.Mpair).args[8]);
        }
        throw new Error("Contract not initialised");
    }
    async get_termination_date(): Promise<att.Option<Date>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Option.from_mich((storage as att.Mpair).args[9], x => { return att.mich_to_date(x); });
        }
        throw new Error("Contract not initialised");
    }
    async get_terminated(): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_bool((storage as att.Mpair).args[10]);
        }
        throw new Error("Contract not initialised");
    }
    async get_closed(): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_bool((storage as att.Mpair).args[11]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        stillOpen: att.string_to_mich("\"AlreadyClosed\""),
        r3: att.string_to_mich("\"NotExpired\""),
        isTerminated: att.string_to_mich("\"AlreadyTerminated\""),
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\""),
        NOTENOUGHOPTIONSAVAILABLE: att.string_to_mich("\"NotEnoughOptionsAvailable\""),
        r2: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"r2\"")]),
        r1: att.string_to_mich("\"Expired\""),
        OPTION_IS_NONE: att.string_to_mich("\"OPTION_IS_NONE\"")
    };
}
export const agreement = new Agreement();
