import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";

const execute_arg_to_mich = (amount: att.Nat): att.Micheline => {
    return amount.to_mich();
}

const view_getBalances_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}

const view_getVested_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}

export class RSUAgreement {
    address: string | undefined;

    constructor(address: string | undefined = undefined) {
        this.address = address;
    }

    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialized");
    }

    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialized");
    }

    async deploy(
        share_address: att.Address,
        recipient: att.Address,
        company_address: att.Address,
        expiration_date: Date,
        vesting: Array<[Date, att.Nat]>,
        params: Partial<ex.Parameters>
    ) {
        const address = (await ex.deploy("./src/rsu_agreement.arl", {
            share_address: share_address.to_mich(),
            recipient: recipient.to_mich(),
            company_address: company_address.to_mich(),
            expiration_date: att.date_to_mich(expiration_date),
            vesting: att.list_to_mich(vesting, x => {
                return att.pair_to_mich([att.date_to_mich(x[0]), x[1].to_mich()]);
            })
        }, params)).address;
        this.address = address;
    }

    async execute(amount: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "automatic_execution", execute_arg_to_mich(amount), params);
        }
        throw new Error("Contract not initialized");
    }

    async get_execute_param(amount: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "automatic_execution", execute_arg_to_mich(amount), params);
        }
        throw new Error("Contract not initialized");
    }

    async view_getBalances(params: Partial<ex.Parameters>): Promise<att.Nat | undefined> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "getBalances", view_getBalances_arg_to_mich(), params);
            return mich.value ? att.Nat.from_mich(mich.value) : undefined;
        }
        throw new Error("Contract not initialized");
    }

    async retrieveExpiredShares(params: Partial<ex.Parameters>) {
        if (this.address != undefined) {
            return await ex.call(this.address, "retrieveExpiredShares", view_getVested_arg_to_mich(), params);
        }
        throw new Error("Contract not initialized");
    }

    async terminate(params: Partial<ex.Parameters>) {
        if (this.address != undefined) {
            return await ex.call(this.address, "terminate", att.unit_mich, params);
        }
        throw new Error("Contract not initialized");
    }

    async get_share_address(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Address.from_mich((storage as att.Mpair).args[0]);
        }
        throw new Error("Contract not initialized");
    }

    async get_recipient(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Address.from_mich((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialized");
    }

    async get_company_address(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Address.from_mich((storage as att.Mpair).args[2]);
        }
        throw new Error("Contract not initialized");
    }

    async get_expiration_date(): Promise<Date> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_date((storage as att.Mpair).args[3]);
        }
        throw new Error("Contract not initialized");
    }

    async get_vesting(): Promise<Array<[Date, att.Nat]>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list((storage as att.Mpair).args[4], x => {
                return (p => {
                    return [att.mich_to_date((p as att.Mpair).args[0]), att.Nat.from_mich((p as att.Mpair).args[1])];
                })(x);
            });
        }
        throw new Error("Contract not initialized");
    }

    async get_transferred_tokens(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Nat.from_mich((storage as att.Mpair).args[5]);
        }
        throw new Error("Contract not initialized");
    }

    async get_terminated(): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return (storage as att.Mpair).args[6] === att.bool_to_mich(true);
        }
        throw new Error("Contract not initialized");
    }

    errors = {
        NOTENOUGHAVAILABLE: att.string_to_mich("\"NotEnoughAvailable\""),
        r2: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"r2\"")]),
        r1: att.string_to_mich("\"Expired\""),
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\"")
    };
}

export const rsu_agreement = new RSUAgreement();
