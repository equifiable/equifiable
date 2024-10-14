
#! /bin/sh

if [ $# -eq 0 ]; then 
  ts-mocha --timeout 0 --slow 99999999999999999 ./tests/subscription.spec.ts
  ts-mocha --timeout 0 --slow 99999999999999999 ./tests/share.spec.ts
  ts-mocha --timeout 0 --slow 99999999999999999 ./tests/agreement.spec.ts
  ts-mocha --timeout 0 --slow 99999999999999999 ./tests/stk_agreement.spec.ts
  ts-mocha --timeout 0 --slow 99999999999999999 ./tests/rsu_agreement.spec.ts
  
  
else
  ts-mocha --timeout 0 --slow 99999999999999999 ./tests/$1.ts
fi
