import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const execute_arg_to_mich = (amount: att.Nat): att.Micheline => {
    return amount.to_mich();
}
const view_getVested_arg_to_mich = (): att.Micheline => {
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
    ]>, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./src/agreement.arl", {
            share_address: share_address.to_mich(),
            recipient: recipient.to_mich(),
            company_address: company_address.to_mich(),
            expiration_date: att.date_to_mich(expiration_date),
            strike_price: strike_price.to_mich(),
            vesting: att.list_to_mich(vesting, x => {
                return att.pair_to_mich([att.date_to_mich(x[0]), x[1].to_mich()]);
            })
        }, params)).address;
        this.address = address;
    }
    async execute(amount: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "execute", execute_arg_to_mich(amount), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_execute_param(amount: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "execute", execute_arg_to_mich(amount), params);
        }
        throw new Error("Contract not initialised");
    }
    async view_getVested(params: Partial<ex.Parameters>): Promise<att.Nat | undefined> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "getVested", view_getVested_arg_to_mich(), params);
            return mich.value ? att.Nat.from_mich(mich.value) : undefined;
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
    async get_exercised_tokens(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Nat.from_mich((storage as att.Mpair).args[6]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        NOTENOUGHAVAILABLE: att.string_to_mich("\"NotEnoughAvailable\""),
        r2: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"r2\"")]),
        r1: att.string_to_mich("\"Expired\""),
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\"")
    };
}
export const agreement = new Agreement();
