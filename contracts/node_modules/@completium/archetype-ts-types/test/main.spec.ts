import BigNumber from 'bignumber.js';
import { Address, Chain_id, Duration, Key, Micheline, Mstring, Nat, Rational, Signature, Ticket, Key_hash, micheline_equals, UnsafeMicheline, replace_var, Tez, normalize, Entrypoint } from '../src/main'

describe('Micheline', () => {
  test('int int true', () => {
    const a = { "int": "2" };
    const b = { "int": "2" };
    expect(micheline_equals(a, b)).toBe(true);
  })

  test('int int false', () => {
    const a = { "int": "2" };
    const b = { "int": "3" };
    expect(micheline_equals(a, b)).toBe(false);
  })

  test('int string false', () => {
    const a = { "int": "2" };
    const b = { "string": "toto" };
    expect(micheline_equals(a, b)).toBe(false);
  })

  test('int string with same value false', () => {
    const a = { "int": "2" };
    const b = { "string": "2" };
    expect(micheline_equals(a, b)).toBe(false);
  })

  test('normalize Pair', () => {
    const a: Micheline = {
      "prim": "Pair",
      "args":
        [
          { "bytes": "0000fb442e7a31bf2470563e287e39a67e444e0e2ca1" },
          { "prim": "Pair", "args": [{ "int": "2" }, { "int": "0" }] }
        ]
    };
    const b: Micheline = {
      "prim": "Pair",
      "args":
        [
          { "bytes": "0000fb442e7a31bf2470563e287e39a67e444e0e2ca1" },
          { "int": "2" },
          { "int": "0" }
        ]
    };
    expect(JSON.stringify(normalize(a))).toBe(JSON.stringify(b));
  })
})

describe('ArchetypeType', () => {

  describe('Address', () => {
    test('Fails with empty string', () => {
      const input = ""
      expect(() => { new Address(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with dummy string', () => {
      const input = "dummy"
      expect(() => { new Address(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails without prefix', () => {
      const input = "VSUr8wwzhLAzempoch5d6hLRiTh8Cjcjbsaf"
      expect(() => { new Address(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with bad encoding', () => {
      const input = "tz1VSUr8wwNhLAzempoch5d6hLRiTh8CjcIl"
      expect(() => { new Address(input) }).toThrow(`Input is not b58 encoding compatible. Received input: ${input}`)
    })

    test('Succeeds with Valid tz1 User Address', () => {
      const input = "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
      expect(new Address(input).toString()).toBe(input)
    })

    test('Succeeds with Valid tz2 User Address', () => {
      const input = "tz28US7zJ7rLdWke75XEM3T5cLWCCxjnP4zf"
      expect(new Address(input).toString()).toBe(input)
    })

    test('Succeeds with Valid tz3 User Address', () => {
      const input = "tz3hFR7NZtjT2QtzgMQnWb4xMuD6yt2YzXUt"
      expect(new Address(input).toString()).toBe(input)
    })

    test('Succeeds with Valid tz4 User Address', () => {
      const input = "tz4HVR6aty9KwsQFHh81C1G7gBdhxT8kuytm"
      expect(new Address(input).toString()).toBe(input)
    })

    test('Succeeds with Valid KT1 Contract Address', () => {
      const input = "KT1AaaBSo5AE6Eo8fpEN5xhCD4w3kHStafxk"
      expect(new Address(input).toString()).toBe(input)
    })

    test('Succeeds from_mich with Valid tz1 User Address in string', () => {
      const input = { "string": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" };
      expect(Address.from_mich(input).toString()).toBe("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb")
    })

    test('Succeeds from_mich with Valid tz1 User Address in bytes', () => {
      const input = { "bytes": "00006b82198cb179e8306c1bedd08f12dc863f328886" };
      expect(Address.from_mich(input).toString()).toBe("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb")
    })

    test('Succeeds from_mich with Valid tz2 User Address in string', () => {
      const input = { "string": "tz28US7zJ7rLdWke75XEM3T5cLWCCxjnP4zf" };
      expect(Address.from_mich(input).toString()).toBe("tz28US7zJ7rLdWke75XEM3T5cLWCCxjnP4zf")
    })

    test('Succeeds from_mich with Valid tz2 User Address in bytes', () => {
      const input = { "bytes": "000101bd4f40df4b2935b9508e7a7683a6a060b64303" };
      expect(Address.from_mich(input).toString()).toBe("tz28US7zJ7rLdWke75XEM3T5cLWCCxjnP4zf")
    })

    test('Succeeds from_mich with Valid tz3 User Address in string', () => {
      const input = { "string": "tz3hFR7NZtjT2QtzgMQnWb4xMuD6yt2YzXUt" };
      expect(Address.from_mich(input).toString()).toBe("tz3hFR7NZtjT2QtzgMQnWb4xMuD6yt2YzXUt")
    })

    test('Succeeds from_mich with Valid tz3 User Address in bytes', () => {
      const input = { "bytes": "0002e57a81394a9c8e5443733ed5ac14aaf5394ef541" };
      expect(Address.from_mich(input).toString()).toBe("tz3hFR7NZtjT2QtzgMQnWb4xMuD6yt2YzXUt")
    })

    test('Succeeds from_mich with Valid tz4 User Address in bytes', () => {
      const input = { "string": "tz4HVR6aty9KwsQFHh81C1G7gBdhxT8kuytm" };
      expect(Address.from_mich(input).toString()).toBe("tz4HVR6aty9KwsQFHh81C1G7gBdhxT8kuytm")
    })

    test('Succeeds from_mich with Valid tz4 User Address in bytes', () => {
      const input = { "bytes": "00035d1497f39b87599983fe8f29599b679564be822d" };
      expect(Address.from_mich(input).toString()).toBe("tz4HVR6aty9KwsQFHh81C1G7gBdhxT8kuytm")
    })

    test('Succeeds from_mich with Valid sr1 User Address in string', () => {
      const input = { "string": "sr1RYurGZtN8KNSpkMcCt9CgWeUaNkzsAfXf" };
      expect(Address.from_mich(input).toString()).toBe("sr1RYurGZtN8KNSpkMcCt9CgWeUaNkzsAfXf")
    })

    test('Succeeds from_mich with Valid sr1 User Address in bytes', () => {
      const input = { "bytes": "03d601f22256d2ad1faec0c64374e527c6e62f2e5a00" };
      expect(Address.from_mich(input).toString()).toBe("sr1RYurGZtN8KNSpkMcCt9CgWeUaNkzsAfXf")
    })

    test('Succeeds from_mich with Valid KT1 User Address in string', () => {
      const input = { "string": "KT1AaaBSo5AE6Eo8fpEN5xhCD4w3kHStafxk" };
      expect(Address.from_mich(input).toString()).toBe("KT1AaaBSo5AE6Eo8fpEN5xhCD4w3kHStafxk")
    })

    test('Succeeds from_mich with Valid KT1 User Address in bytes', () => {
      const input = { "bytes": "0115e6bf7c8ac592ffda5fd5514a84cb3a0c2957d100" };
      expect(Address.from_mich(input).toString()).toBe("KT1AaaBSo5AE6Eo8fpEN5xhCD4w3kHStafxk")
    })

    test('Succeeds from_mich with Valid KT1 User Address 2 in string', () => {
      const input = { "string": "KT1TBXEeXzaUYh2oySDEibrxRW8e2hv9gVXi" };
      expect(Address.from_mich(input).toString()).toBe("KT1TBXEeXzaUYh2oySDEibrxRW8e2hv9gVXi")
    })

    test('Succeeds from_mich with Valid KT1 User Address 2 in bytes', () => {
      const input = { "bytes": "01cc04dc6b63f443e2801a2c2e99f305e3cc20af7400" };
      expect(Address.from_mich(input).toString()).toBe("KT1TBXEeXzaUYh2oySDEibrxRW8e2hv9gVXi")
    })

    test('Succeeds from_mich with Valid KT1 User Address 3 in string', () => {
      const input = { "string": "KT1SUP27JhX24Kvr11oUdWswk7FnCW78ZyUn" };
      expect(Address.from_mich(input).toString()).toBe("KT1SUP27JhX24Kvr11oUdWswk7FnCW78ZyUn")
    })

    test('Succeeds from_mich with Valid KT1 User Address 3 in bytes', () => {
      const input = { "bytes": "01c43cf2b3f97d5928cd6986e78a85dd772127b12200" };
      expect(Address.from_mich(input).toString()).toBe("KT1SUP27JhX24Kvr11oUdWswk7FnCW78ZyUn")
    })

  });

  describe('Chain_id', () => {
    test('Fails with empty string', () => {
      const input = ""
      expect(() => { new Chain_id(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with dummy string', () => {
      const input = "dummy"
      expect(() => { new Chain_id(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails without prefix', () => {
      const input = "XynUjJNZm7wj"
      expect(() => { new Chain_id(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with bad encoding', () => {
      const input = "NetXynUjJNZm7wj"
      expect(() => { new Chain_id(input) }).toThrow(`Input is not b58 encoding compatible. Received input: ${input}`)
    })

    test('Succeeds with Valid Chain_id', () => {
      const input = "NetXdQprcVkpaWU"
      expect(new Chain_id(input).toString()).toBe(input)
    })

    test('Succeeds with Valid Chain_id (mainnet)', () => {
      const input = "NetXynUjJNZm7wi"
      expect(new Chain_id(input).toString()).toBe(input)
    })

    test('Succeeds from_mich with Valid Chain_id 1 in string', () => {
      const input = { "string": "NetXdQprcVkpaWU" };
      expect(Chain_id.from_mich(input).toString()).toBe("NetXdQprcVkpaWU")
    })

    test('Succeeds from_mich with Valid Chain_id 1 in bytes', () => {
      const input = { "bytes": "7a06a770" };
      expect(Chain_id.from_mich(input).toString()).toBe("NetXdQprcVkpaWU")
    })

    test('Succeeds from_mich with Valid Chain_id 2 in string', () => {
      const input = { "string": "NetXynUjJNZm7wi" };
      expect(Chain_id.from_mich(input).toString()).toBe("NetXynUjJNZm7wi")
    })

    test('Succeeds from_mich with Valid Chain_id 2 in bytes', () => {
      const input = { "bytes": "f3d48554" };
      expect(Chain_id.from_mich(input).toString()).toBe("NetXynUjJNZm7wi")
    })

  });

  describe('Duration', () => {

    test('Fails with empty string', () => {
      expect(() => { new Duration("") }).toThrow("Invalid duration input. Received input: `' Try this format: '_w_d_h_m_s'.")
    });

    test('Fails with dummy string', () => {
      expect(() => { new Duration("dummy") }).toThrow("Invalid duration input. Received input: `dummy' Try this format: '_w_d_h_m_s'.")
    });

    test('Fails with typo in unit letter', () => {
      const input = "3g8d4h34m18s"
      expect(() => { new Duration(input) }).toThrow("Invalid duration input. Received input: `" + input + "' Try this format: '_w_d_h_m_s'.")
    });

    test('Fails with typo in unit letter', () => {
      const input = "3w8d4h34m18a"
      expect(() => { new Duration(input) }).toThrow("Invalid duration input. Received input: `" + input + "' Try this format: '_w_d_h_m_s'.")
    });

    it('Simple test', () => {
      expect(new Duration("0s").toSecond()).toBe(0)
    })

    it('1 second test', () => {
      expect(new Duration("1s").toSecond()).toBe(1)
    })

    it('1 minute test', () => {
      expect(new Duration("1m").toSecond()).toBe(60)
    })

    it('1 hour test', () => {
      expect(new Duration("1h").toSecond()).toBe(3600)
    })

    it('1 day test', () => {
      expect(new Duration("1d").toSecond()).toBe(86400)
    })

    it('1 week test', () => {
      expect(new Duration("1w").toSecond()).toBe(604800)
    })

    it('1 week, 1 second test', () => {
      expect(new Duration("1w1s").toSecond()).toBe(604801)
    })

    it('1 week, 1 day, 1 hour, 1 minute, 1 second test', () => {
      expect(new Duration("1w1d1h1m1s").toSecond()).toBe(694861)
    })

    it('3 weeks, 8 days, 4 hours, 34 minutes, 18 seconds test', () => {
      expect(new Duration("3w8d4h34m18s").toSecond()).toBe(2522058)
    })

    test('2 minutes in second string', () => {
      expect(new Duration("120").toSecond()).toBe(120)
    });

    test('Neg 365 days in second string', () => {
      expect(new Duration("-31536000").toSecond()).toBe(-31536000)
    });

  })

  describe('Entrypoint', () => {
    test('test from_mich basic', () => {
      const input = { string: "KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe" };
      expect(Entrypoint.from_mich(input).toString()).toBe("KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe%default")
    })

    test('test from_mich with annot', () => {
      const input = { string: "KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe%my_entrypoint" };
      expect(Entrypoint.from_mich(input).toString()).toBe("KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe%my_entrypoint")
    })
  })

  describe('Key', () => {
    test('Fails with empty string', () => {
      const input = ""
      expect(() => { new Key(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with dummy string', () => {
      const input = "dummy"
      expect(() => { new Key(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails without prefix', () => {
      const input = "vGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn"
      expect(() => { new Key(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with bad encoding', () => {
      const input = "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhja"
      expect(() => { new Key(input) }).toThrow(`Input is not b58 encoding compatible. Received input: ${input}`)
    })

    test('Succeeds with Valid edpk Key', () => {
      const input = "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn"
      expect(new Key(input).toString()).toBe(input)
    })

    test('Succeeds with Valid spsk Key', () => {
      const input = "sppk7b4TURq2T9rhPLFaSz6mkBCzKzfiBjctQSMorvLD5GSgCduvKuf"
      expect(new Key(input).toString()).toBe(input)
    })

    test('Succeeds with Valid p2pk Key', () => {
      const input = "p2pk65zwHGP9MdvANKkp267F4VzoKqL8DMNpPfTHUNKbm8S9DUqqdpw"
      expect(new Key(input).toString()).toBe(input)
    })

    test('Succeeds from_mich with Valid edpk Key in string', () => {
      const input = { "string": "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn" };
      expect(Key.from_mich(input).toString()).toBe("edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn")
    })

    test('Succeeds from_mich with Valid edpk Key in bytes', () => {
      const input = { "bytes": "00d670f72efd9475b62275fae773eb5f5eb1fea4f2a0880e6d21983273bf95a0af" };
      expect(Key.from_mich(input).toString()).toBe("edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn")
    })

    test('Succeeds from_mich with Valid edpk Key in string', () => {
      const input = { "string": "sppk7b4TURq2T9rhPLFaSz6mkBCzKzfiBjctQSMorvLD5GSgCduvKuf" };
      expect(Key.from_mich(input).toString()).toBe("sppk7b4TURq2T9rhPLFaSz6mkBCzKzfiBjctQSMorvLD5GSgCduvKuf")
    })

    test('Succeeds from_mich with Valid sppk Key in bytes', () => {
      const input = { "bytes": "0102e732719dc5263fbf7f07400926a2e648cd10a73481423d5a587eabdb34e41586" };
      expect(Key.from_mich(input).toString()).toBe("sppk7b4TURq2T9rhPLFaSz6mkBCzKzfiBjctQSMorvLD5GSgCduvKuf")
    })

    test('Succeeds from_mich with Valid sppk Key in string', () => {
      const input = { "string": "p2pk65zwHGP9MdvANKkp267F4VzoKqL8DMNpPfTHUNKbm8S9DUqqdpw" };
      expect(Key.from_mich(input).toString()).toBe("p2pk65zwHGP9MdvANKkp267F4VzoKqL8DMNpPfTHUNKbm8S9DUqqdpw")
    })

    test('Succeeds from_mich with Valid edpk Key in bytes', () => {
      const input = { "bytes": "0202bbf2d7534de588191c35db4b3d05671c54ee0e571a9de270435e629a6c803e1d" };
      expect(Key.from_mich(input).toString()).toBe("p2pk65zwHGP9MdvANKkp267F4VzoKqL8DMNpPfTHUNKbm8S9DUqqdpw")
    })
  });

  describe('Nat', () => {
    describe('Constructor', () => {
      test('Fails if neg number', () => {
        expect(() => { new Nat(-5) }).toThrow("Not an Nat value: -5")
      });
    });

    describe('toString', () => {

      test('Number simple', () => {
        expect(new Nat(5).toString()).toBe("5");
      });

      test('String simple', () => {
        expect(new Nat("5").toString()).toBe("5");
      });

      test('Bignumber simple', () => {
        expect(new Nat(new BigNumber("5")).toString()).toBe("5");
      });

      test('String big', () => {
        expect(new Nat("9999999999999999999999999999999999999").toString()).toBe("9999999999999999999999999999999999999");
      });

      test('Bignumber big', () => {
        expect(new Nat(new BigNumber("9999999999999999999999999999999999999")).toString()).toBe("9999999999999999999999999999999999999");
      });
    })
  })

  describe('Rational', () => {
    describe('toString', () => {
      it('String simple', () => {
        expect(new Rational("5").toString()).toBe("5");
      });

      it('Number simple', () => {
        expect(new Rational(5).toString()).toBe("5");
      });

      it('Number decimal', () => {
        expect(new Rational(5.4464).toString()).toBe("5.4464");
      });

      it('String decimal', () => {
        expect(new Rational("5.4464").toString()).toBe("5.4464");
      });

      it('String decimal percent', () => {
        expect(new Rational("5.4464%").toString()).toBe("0.054464");
      });

      it('String with big number', () => {
        expect(new Rational("99999999999999999999999956456456456999999999", new BigNumber("999999999999956456456456999999999")).toString()).toBe("100000000000.00435435435425664606");
      });

    });

    describe('to_number', () => {
      it('String simple', () => {
        expect(new Rational("5").to_number()).toBe(5);
      });

      it('Number simple', () => {
        expect(new Rational(5).to_number()).toBe(5);
      });

      it('Number decimal', () => {
        expect(new Rational(5.4464).to_number()).toBe(5.4464);
      });

      it('String decimal', () => {
        expect(new Rational("5.4464").to_number()).toBe(5.4464);
      });

      it('String decimal percent', () => {
        expect(new Rational("5.4464%").to_number()).toBe(0.054464);
      });

      it('String with big number', () => {
        expect(new Rational("99999999999999999999999956456456456999999999", new BigNumber("999999999999956456456456999999999")).to_number()).toBe(100000000000.00435);
      });
    })

    describe('Ticket', () => {
      it('Ticket', () => {
        const tjson: Micheline = {
          "prim": "Pair",
          "args": [
            {
              "string": "KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"
            },
            {
              "string": "info"
            },
            {
              "int": "1"
            }
          ]
        };

        const ticket_actual = Ticket.from_mich<string>(tjson, (x: Micheline): string => { return (x as Mstring).string });
        expect(new Ticket(new Address("KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"), ("info" as string), new Nat(1)).equals(ticket_actual)).toBe(true)
        expect(new Ticket(new Address("KT1XcpRnLQANuGCJ9SZW3GXVG8BArUKymqtk"), ("info" as string), new Nat(1)).equals(ticket_actual)).toBe(false)
        expect(new Ticket(new Address("KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"), ("infu" as string), new Nat(1)).equals(ticket_actual)).toBe(false)
        expect(new Ticket(new Address("KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"), ("info" as string), new Nat(2)).equals(ticket_actual)).toBe(false)
      })
    })

    describe('to_mich', () => {
      it('String simple', () => {
        expect(JSON.stringify(new Rational("5").to_mich())).toBe('{"prim":"Pair","args":[{"int":"5"},{"int":"1"}]}');
      });

      it('Number simple', () => {
        expect(JSON.stringify(new Rational(5).to_mich())).toBe('{"prim":"Pair","args":[{"int":"5"},{"int":"1"}]}');
      });

      it('Number decimal', () => {
        expect(JSON.stringify(new Rational(5.4464).to_mich())).toBe('{"prim":"Pair","args":[{"int":"3404"},{"int":"625"}]}');
      });

      it('String decimal', () => {
        expect(JSON.stringify(new Rational("5.4464").to_mich())).toBe('{"prim":"Pair","args":[{"int":"3404"},{"int":"625"}]}')
      });

      it('String decimal percent', () => {
        expect(JSON.stringify(new Rational("5.4464%").to_mich())).toBe('{"prim":"Pair","args":[{"int":"851"},{"int":"15625"}]}')
      });

      it('String with big number', () => {
        expect(JSON.stringify(new Rational("99999999999999999999999956456456456999999999", new BigNumber("999999999999956456456456999999999")).to_mich())).toBe('{"prim":"Pair","args":[{"int":"5000000000000217717717712832303"},{"int":"50000000000000000000"}]}')
      });

      it('String with big number with denom int', () => {
        expect(JSON.stringify(new Rational(1, 2).to_mich())).toBe('{"prim":"Pair","args":[{"int":"1"},{"int":"2"}]}')
      });

      it('String with big number with denom string', () => {
        expect(JSON.stringify(new Rational(1, "2").to_mich())).toBe('{"prim":"Pair","args":[{"int":"1"},{"int":"2"}]}')
      });

      it('Ticket', () => {
        const f = (x: string): Mstring => { return { "string": x } };
        expect(JSON.stringify(new Ticket(new Address("KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"), "info", new Nat(1)).to_mich(f))).toBe('{"prim":"Pair","args":[{"string":"KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"},{"string":"info"},{"int":"1"}]}')
      });
    });

  })

  describe('Tez', () => {

    test('Fails with empty string', () => {
      const input = ""
      expect(() => { new Tez(input) }).toThrow("Invalid Tez value")
    })

    test('Fails with text string', () => {
      const input = "abc"
      expect(() => { new Tez(input) }).toThrow("Invalid Tez value")
    })

    test('Succeeds with numerical string ', () => {
      const input = "123"
      expect(new Tez(input).toString()).toEqual("123000000")
    })

    describe('toString', () => {
      test('Succeeds with numerical string ', () => {
        const input = "123"
        expect(new Tez(input).toString("tez")).toEqual("123")
      })
    })

    test('Succeeds with numerical string ', () => {
      const input = "123123123"
      expect(new Tez(input, "mutez").toString("tez")).toEqual("123.123123")
    })

    describe('Minus', () => {
      test('Succeeds with positive result', () => {
        const minuend = 10
        const subtrahend = 9
        const difference = minuend - subtrahend
        expect(new Tez(minuend).minus(new Tez(subtrahend)).equals(new Tez(difference))).toBe(true)
      })

      test('Fails with negative result', () => {
        const minuend = 10
        const subtrahend = 11
        const difference = minuend - subtrahend
        expect(() => { new Tez(minuend).minus(new Tez(subtrahend)).equals(new Tez(difference)) }).toThrow("Tez value must not be negative")
      })

    })

  });

  describe('Signature', () => {
    test('Fails with empty string', () => {
      const input = ""
      expect(() => { new Signature(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with dummy string', () => {
      const input = "dummy"
      expect(() => { new Signature(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails without prefix', () => {
      const input = "thXYBNW7i5E1WNd87fBRJKacJjK5amJVKcyXd6fGxmnQo2ESmmdgN6qJXgbUVJDXha8xi96r9GqjsPorWWpPEwXNG3W8vG"
      expect(() => { new Signature(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with bad encoding', () => {
      const input = "edsigthXYBNW7i5E1WNd87fBRJKacJjK5amJVKcyXd6fGxmnQo2ESmmdgN6qJXgbUVJDXha8xi96r9GqjsPorWWpPEwXNG3W8vH"
      expect(() => { new Signature(input) }).toThrow(`Input is not b58 encoding compatible. Received input: ${input}`)
    })

    test('Succeeds with Valid sig Signature', () => {
      const input = "sigPGRuva6xjBJkmb6BYpbovGb4BoobkE3GUN2njdxwkG25yRT39GaDrsBgczf5VybSRGi5eddQy6VBfUkg2YcLfMvgg8Uk1"
      expect(new Signature(input).toString()).toBe(input)
    })

    test('Succeeds with Valid edsig Signature', () => {
      const input = "edsigthXYBNW7i5E1WNd87fBRJKacJjK5amJVKcyXd6fGxmnQo2ESmmdgN6qJXgbUVJDXha8xi96r9GqjsPorWWpPEwXNG3W8vG"
      expect(new Signature(input).toString()).toBe(input)
    })

    test('Succeeds with Valid spsig Signature', () => {
      const input = "spsig1VrEwwc2UC4v9v3oYJ96VwiKwdVKK7ZYdMs4JVWNtfj11sRz9RkvPBtCHMiG1LEp44PJBXDh7bAzpDjGoX4bH7heoPuGqa"
      expect(new Signature(input).toString()).toBe(input)
    })

    test('Succeeds with Valid p2sig Signature', () => {
      const input = "p2siguNBbkRwuMKCyG9NeQb4ETNCDyqUnUCX4T4Um4dFgzCKyA7AzS4a6XBk1Encj4ndXsbK98UYNunZ7vHHFHMhh7jdajUHTY"
      expect(new Signature(input).toString()).toBe(input)
    })

    test('Succeeds from_mich with Valid sig Signature in string', () => {
      const input = { "string": "sigPGRuva6xjBJkmb6BYpbovGb4BoobkE3GUN2njdxwkG25yRT39GaDrsBgczf5VybSRGi5eddQy6VBfUkg2YcLfMvgg8Uk1" };
      expect(Signature.from_mich(input).toString()).toBe("sigPGRuva6xjBJkmb6BYpbovGb4BoobkE3GUN2njdxwkG25yRT39GaDrsBgczf5VybSRGi5eddQy6VBfUkg2YcLfMvgg8Uk1")
    })

    test('Succeeds from_mich with Valid sig Signature in bytes', () => {
      const input = { "bytes": "09c5205a5ca2d248e2089a7e7c159708ac37e03737de32dc83cff009120ba6ee29c601cbd00346cdf231210cfedc3c11302a0c3d4b230bd6422abdb08a032808" };
      expect(Signature.from_mich(input).toString()).toBe("sigPGRuva6xjBJkmb6BYpbovGb4BoobkE3GUN2njdxwkG25yRT39GaDrsBgczf5VybSRGi5eddQy6VBfUkg2YcLfMvgg8Uk1")
    })

    test('Succeeds from_mich with Valid edsig Signature in string', () => {
      const input = { "string": "edsigthXYBNW7i5E1WNd87fBRJKacJjK5amJVKcyXd6fGxmnQo2ESmmdgN6qJXgbUVJDXha8xi96r9GqjsPorWWpPEwXNG3W8vG" };
      expect(Signature.from_mich(input).toString()).toBe("edsigthXYBNW7i5E1WNd87fBRJKacJjK5amJVKcyXd6fGxmnQo2ESmmdgN6qJXgbUVJDXha8xi96r9GqjsPorWWpPEwXNG3W8vG")
    })

    test('Succeeds from_mich with Valid edsig Signature in bytes', () => {
      const input = { "bytes": "4a4c3fae04d09c2515e3ffdabe1150444f19f055a2b655eeb96d8bb861e9bf01503284202f3ba2be55afb1e347abd46d6da738ff8397dd1b6f0a0704c4e5c504" };
      expect(Signature.from_mich(input).toString()).toBe("sigXi54KHDS92yTBdpydLEM2J6XuE9c8RtwwDntkfHxRmTVCHrGsibH3bPV5ygPq3BG2fLndKVJesy8bmerNUR3tTGMZzC6J")
    })

    test('Succeeds from_mich with Valid spsig Signature in string', () => {
      const input = { "string": "spsig1VrEwwc2UC4v9v3oYJ96VwiKwdVKK7ZYdMs4JVWNtfj11sRz9RkvPBtCHMiG1LEp44PJBXDh7bAzpDjGoX4bH7heoPuGqa" };
      expect(Signature.from_mich(input).toString()).toBe("spsig1VrEwwc2UC4v9v3oYJ96VwiKwdVKK7ZYdMs4JVWNtfj11sRz9RkvPBtCHMiG1LEp44PJBXDh7bAzpDjGoX4bH7heoPuGqa")
    })

    test('Succeeds from_mich with Valid spsig Signature in bytes', () => {
      const input = { "bytes": "b7bec8064a884f6734b0e8e196e25a5a9368d9d01b02d4f1a17fced9d742436468805dc298640910acecb55aa9d1ff9ed629bcd057bc258b47164e6a0e0008de" };
      expect(Signature.from_mich(input).toString()).toBe("sign2Zcszmzr6mmk43a9awr32x2ohkF3vr9njjXhM55moHaonAxrgYS4QLaz9AwwAwyLe9SZN4gT2Giw2AHeP6MuAYHSeT9D")
    })

    test('Succeeds from_mich with Valid p2sig Signature in string', () => {
      const input = { "string": "p2siguNBbkRwuMKCyG9NeQb4ETNCDyqUnUCX4T4Um4dFgzCKyA7AzS4a6XBk1Encj4ndXsbK98UYNunZ7vHHFHMhh7jdajUHTY" };
      expect(Signature.from_mich(input).toString()).toBe("p2siguNBbkRwuMKCyG9NeQb4ETNCDyqUnUCX4T4Um4dFgzCKyA7AzS4a6XBk1Encj4ndXsbK98UYNunZ7vHHFHMhh7jdajUHTY")
    })

    test('Succeeds from_mich with Valid p2sig Signature in bytes', () => {
      const input = { "bytes": "f5140f616d814771379b61eb3fb6c435ba0e0327592c3e31333fe6f31285ed7460a6bdfc212951c6fcacde1d0d1b7def15f10debd762baff6a76dbe29fcae39a" };
      expect(Signature.from_mich(input).toString()).toBe("sigv3xkfLPotPAWKtcPgzXSwuQqbBFXNn6r1HdNfApPmk3RcqPg41UsF1Ki3r6Vdb4DFZo84Ec3QqEkXbMWguWFr3HgNFr4G")
    })


    test('Succeeds with Valid sig Signature', () => {
      const input = "sigPGRuva6xjBJkmb6BYpbovGb4BoobkE3GUN2njdxwkG25yRT39GaDrsBgczf5VybSRGi5eddQy6VBfUkg2YcLfMvgg8Uk1"
      const output = "sigPGRuva6xjBJkmb6BYpbovGb4BoobkE3GUN2njdxwkG25yRT39GaDrsBgczf5VybSRGi5eddQy6VBfUkg2YcLfMvgg8Uk1"
      expect(new Signature(input).normalize()).toBe(output)
    })

    test('Succeeds with Valid edsig Signature', () => {
      const input = "edsigthXYBNW7i5E1WNd87fBRJKacJjK5amJVKcyXd6fGxmnQo2ESmmdgN6qJXgbUVJDXha8xi96r9GqjsPorWWpPEwXNG3W8vG"
      const output = "sigXi54KHDS92yTBdpydLEM2J6XuE9c8RtwwDntkfHxRmTVCHrGsibH3bPV5ygPq3BG2fLndKVJesy8bmerNUR3tTGMZzC6J"
      expect(new Signature(input).normalize()).toBe(output)
    })

    test('Succeeds with Valid edsig Signature', () => {
      const input = "spsig1VrEwwc2UC4v9v3oYJ96VwiKwdVKK7ZYdMs4JVWNtfj11sRz9RkvPBtCHMiG1LEp44PJBXDh7bAzpDjGoX4bH7heoPuGqa"
      const output = "sign2Zcszmzr6mmk43a9awr32x2ohkF3vr9njjXhM55moHaonAxrgYS4QLaz9AwwAwyLe9SZN4gT2Giw2AHeP6MuAYHSeT9D"
      expect(new Signature(input).normalize()).toBe(output)
    })

    test('Succeeds with Valid p2sig Signature', () => {
      const input = "p2siguNBbkRwuMKCyG9NeQb4ETNCDyqUnUCX4T4Um4dFgzCKyA7AzS4a6XBk1Encj4ndXsbK98UYNunZ7vHHFHMhh7jdajUHTY"
      const output = "sigv3xkfLPotPAWKtcPgzXSwuQqbBFXNn6r1HdNfApPmk3RcqPg41UsF1Ki3r6Vdb4DFZo84Ec3QqEkXbMWguWFr3HgNFr4G"
      expect(new Signature(input).normalize()).toBe(output)
    })
  });

  describe('Key_hash', () => {
    test('Fails with empty string', () => {
      const input = ""
      expect(() => { new Address(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with dummy string', () => {
      const input = "dummy"
      expect(() => { new Key_hash(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails without prefix', () => {
      const input = "VSUr8wwzhLAzempoch5d6hLRiTh8Cjcjbsaf"
      expect(() => { new Key_hash(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with bad encoding', () => {
      const input = "tz1VSUr8wwNhLAzempoch5d6hLRiTh8CjcIl"
      expect(() => { new Key_hash(input) }).toThrow(`Input is not b58 encoding compatible. Received input: ${input}`)
    })

    test('Succeeds with Valid tz1 User Address', () => {
      const input = "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
      expect(new Key_hash(input).toString()).toBe(input)
    })

    test('Succeeds with Valid tz2 User Address', () => {
      const input = "tz28US7zJ7rLdWke75XEM3T5cLWCCxjnP4zf"
      expect(new Key_hash(input).toString()).toBe(input)
    })

    test('Succeeds with Valid tz3 User Address', () => {
      const input = "tz3hFR7NZtjT2QtzgMQnWb4xMuD6yt2YzXUt"
      expect(new Key_hash(input).toString()).toBe(input)
    })

    test('Succeeds with Valid tz4 User Address', () => {
      const input = "tz4HVR6aty9KwsQFHh81C1G7gBdhxT8kuytm"
      expect(new Key_hash(input).toString()).toBe(input)
    })

    test('Succeeds with Valid KT1 Contract Address', () => {
      const input = "KT1AaaBSo5AE6Eo8fpEN5xhCD4w3kHStafxk"
      expect(new Key_hash(input).toString()).toBe(input)
    })

    test('Succeeds from_mich with Valid tz1 User Address in string', () => {
      const input = { "string": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" };
      expect(Key_hash.from_mich(input).toString()).toBe("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb")
    })

    test('Succeeds from_mich with Valid tz1 User Address in bytes', () => {
      const input = { "bytes": "00006b82198cb179e8306c1bedd08f12dc863f328886" };
      expect(Key_hash.from_mich(input).toString()).toBe("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb")
    })

    test('Succeeds from_mich with Valid tz2 User Address in string', () => {
      const input = { "string": "tz28US7zJ7rLdWke75XEM3T5cLWCCxjnP4zf" };
      expect(Key_hash.from_mich(input).toString()).toBe("tz28US7zJ7rLdWke75XEM3T5cLWCCxjnP4zf")
    })

    test('Succeeds from_mich with Valid tz2 User Address in bytes', () => {
      const input = { "bytes": "000101bd4f40df4b2935b9508e7a7683a6a060b64303" };
      expect(Key_hash.from_mich(input).toString()).toBe("tz28US7zJ7rLdWke75XEM3T5cLWCCxjnP4zf")
    })

    test('Succeeds from_mich with Valid tz3 User Address in string', () => {
      const input = { "string": "tz3hFR7NZtjT2QtzgMQnWb4xMuD6yt2YzXUt" };
      expect(Key_hash.from_mich(input).toString()).toBe("tz3hFR7NZtjT2QtzgMQnWb4xMuD6yt2YzXUt")
    })

    test('Succeeds from_mich with Valid tz3 User Address in bytes', () => {
      const input = { "bytes": "0002e57a81394a9c8e5443733ed5ac14aaf5394ef541" };
      expect(Key_hash.from_mich(input).toString()).toBe("tz3hFR7NZtjT2QtzgMQnWb4xMuD6yt2YzXUt")
    })

    test('Succeeds from_mich with Valid tz4 User Address in bytes', () => {
      const input = { "string": "tz4HVR6aty9KwsQFHh81C1G7gBdhxT8kuytm" };
      expect(Key_hash.from_mich(input).toString()).toBe("tz4HVR6aty9KwsQFHh81C1G7gBdhxT8kuytm")
    })

    test('Succeeds from_mich with Valid tz4 User Address in bytes', () => {
      const input = { "bytes": "00035d1497f39b87599983fe8f29599b679564be822d" };
      expect(Key_hash.from_mich(input).toString()).toBe("tz4HVR6aty9KwsQFHh81C1G7gBdhxT8kuytm")
    })

    test('Succeeds from_mich with Valid sr1 User Address in string', () => {
      const input = { "string": "sr1RYurGZtN8KNSpkMcCt9CgWeUaNkzsAfXf" };
      expect(Key_hash.from_mich(input).toString()).toBe("sr1RYurGZtN8KNSpkMcCt9CgWeUaNkzsAfXf")
    })

    test('Succeeds from_mich with Valid sr1 User Address in bytes', () => {
      const input = { "bytes": "03d601f22256d2ad1faec0c64374e527c6e62f2e5a00" };
      expect(Key_hash.from_mich(input).toString()).toBe("sr1RYurGZtN8KNSpkMcCt9CgWeUaNkzsAfXf")
    })

  });
})

describe('Utils', () => {
  test('replace_var', () => {
    const um: UnsafeMicheline = { "var": "my_param" };
    const vars: Array<[string, Micheline]> = [["my_param", { "int": "2" }]];
    const res = replace_var(um, vars);
    expect(JSON.stringify(res)).toBe('{"int":"2"}')
  })

  test('complex', () => {
    const um: UnsafeMicheline = {
      "prim": "Pair",
      "args": [
        {
          "var": "owner"
        },
        {
          "var": "permits"
        },
        {
          "prim": "None"
        },
        {
          "prim": "False"
        },
        [
          {
            "prim": "Elt",
            "args": [
              {
                "int": "0"
              },
              {
                "prim": "Pair",
                "args": [
                  {
                    "int": "0"
                  },
                  [
                    {
                      "prim": "Elt",
                      "args": [
                        {
                          "string": ""
                        },
                        {
                          "bytes": "697066733a2f2f516d617635756142437a4d77377871446f55364d444534743473695855484e4737664a68474c746f79774b35694a"
                        }
                      ]
                    }
                  ]
                ]
              }
            ]
          }
        ],
        [
          {
            "prim": "Elt",
            "args": [
              {
                "var": "owner"
              },
              {
                "int": "123000000000000"
              }
            ]
          }
        ],
        [],
        [
          {
            "prim": "Elt",
            "args": [
              {
                "string": ""
              },
              {
                "bytes": ""
              }
            ]
          }
        ]
      ]
    };
    const vars: Array<[string, Micheline]> = [
      ["owner", { "string": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" }],
      ["permits", { "string": "KT19pGLFUnn2tBF1QY41Sxyr7UnahrNGfULd" }]
    ];
    const res = replace_var(um, vars);
    expect(JSON.stringify(res)).toBe('{"prim":"Pair","args":[{"string":"tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"},{"string":"KT19pGLFUnn2tBF1QY41Sxyr7UnahrNGfULd"},{"prim":"None"},{"prim":"False"},[{"prim":"Elt","args":[{"int":"0"},{"prim":"Pair","args":[{"int":"0"},[{"prim":"Elt","args":[{"string":""},{"bytes":"697066733a2f2f516d617635756142437a4d77377871446f55364d444534743473695855484e4737664a68474c746f79774b35694a"}]}]]}]}],[{"prim":"Elt","args":[{"string":"tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"},{"int":"123000000000000"}]}],[],[{"prim":"Elt","args":[{"string":""},{"bytes":""}]}]]}')
  })

  test('complex', () => {
    const um: UnsafeMicheline = [
      {
        "prim": "storage",
        "args": [
          { "prim": "nat" }
        ]
      },
      {
        "prim": "parameter",
        "args": [
          {
            "prim": "unit",
            "annots": [
              "%exec"
            ]
          }
        ]
      },
      {
        "prim": "code",
        "args": [
          [{ "prim": "CDR" },
          {
            "prim": "PUSH",
            "args": [
              { "prim": "nat" },
              { "var": "const_n__" }
            ]
          },
          { "prim": "SWAP" },
          {
            "prim": "DROP",
            "args": [
              { "int": "1" }
            ]
          },
          {
            "prim": "NIL",
            "args": [
              { "prim": "operation" }
            ]
          },
          { "prim": "PAIR" }]
        ]
      }];
    const vars: Array<[string, Micheline]> = [
      ["n", { "int": "2" }]
    ];
    const res = replace_var(um, vars);
    expect(JSON.stringify(res)).toBe('[{"prim":"storage","args":[{"prim":"nat"}]},{"prim":"parameter","args":[{"prim":"unit","annots":["%exec"]}]},{"prim":"code","args":[[{"prim":"CDR"},{"prim":"PUSH","args":[{"prim":"nat"},{"int":"2"}]},{"prim":"SWAP"},{"prim":"DROP","args":[{"int":"1"}]},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"PAIR"}]]}]')
  })


})
