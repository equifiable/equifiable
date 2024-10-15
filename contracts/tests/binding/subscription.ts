import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const User_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("address", []);
export class User_value implements att.ArchetypeType {
    constructor(public subType: att.Int, public termStart: Date, public nextPayment: Date) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.subType.to_mich(), att.date_to_mich(this.termStart), att.date_to_mich(this.nextPayment)]);
    }
    equals(v: User_value): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): User_value {
        return new User_value(att.Int.from_mich((input as att.Mpair).args[0]), att.mich_to_date((input as att.Mpair).args[1]), att.mich_to_date((input as att.Mpair).args[2]));
    }
}
export const User_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("int", ["%subType"]),
    att.prim_annot_to_mich_type("timestamp", ["%termStart"]),
    att.prim_annot_to_mich_type("timestamp", ["%nextPayment"])
], []);
export type User_container = Array<[
    att.Address,
    User_value
]>;
export const User_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("address", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("int", ["%subType"]),
    att.prim_annot_to_mich_type("timestamp", ["%termStart"]),
    att.prim_annot_to_mich_type("timestamp", ["%nextPayment"])
], []), []);
const subscribe_arg_to_mich = (tokenID: att.Int): att.Micheline => {
    return tokenID.to_mich();
}
const payBill_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const cancelSubscription_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const view_getStatus_arg_to_mich = (id: att.Address): att.Micheline => {
    return id.to_mich();
}
export class Subscription {
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
    async deploy(owner: att.Address, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./src/subscription.arl", {
            owner: owner.to_mich()
        }, params)).address;
        this.address = address;
    }
    async subscribe(tokenID: att.Int, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "subscribe", subscribe_arg_to_mich(tokenID), params);
        }
        throw new Error("Contract not initialised");
    }
    async payBill(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "payBill", payBill_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async cancelSubscription(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "cancelSubscription", cancelSubscription_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_subscribe_param(tokenID: att.Int, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "subscribe", subscribe_arg_to_mich(tokenID), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_payBill_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "payBill", payBill_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_cancelSubscription_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "cancelSubscription", cancelSubscription_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async view_getStatus(id: att.Address, params: Partial<ex.Parameters>): Promise<boolean | undefined> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "getStatus", view_getStatus_arg_to_mich(id), params);
            return mich.value ? att.mich_to_bool(mich.value) : undefined;
        }
        throw new Error("Contract not initialised");
    }
    async get_MONTH_PRICE(): Promise<att.Tez> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Tez.from_mich((storage as att.Mpair).args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_YEAR_PRICE(): Promise<att.Tez> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Tez.from_mich((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialised");
    }
    async get_year(): Promise<att.Duration> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Duration.from_mich((storage as att.Mpair).args[2]);
        }
        throw new Error("Contract not initialised");
    }
    async get_month(): Promise<att.Duration> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Duration.from_mich((storage as att.Mpair).args[3]);
        }
        throw new Error("Contract not initialised");
    }
    async get_User(): Promise<User_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map((storage as att.Mpair).args[4], (x, y) => [att.Address.from_mich(x), User_value.from_mich(y)]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        r4: att.string_to_mich("\"User not found!\""),
        NOT_GOOD_VALUE_FOR_THIS_PACKAGE: att.string_to_mich("\"Not good value for this package\""),
        r3: att.string_to_mich("\"Payment is late -  you lost your account\""),
        r2: att.string_to_mich("\"User not found!\""),
        YOU_ALREADY_HAVE_AN_ACCOUNT_: att.string_to_mich("\"You already have an account!\"")
    };
}
export const subscription = new Subscription();
