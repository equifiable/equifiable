build-docker:
	docker build -t blockchain .

run-docker:
	docker run -it -v $(PWD):/app --env-file .env blockchain

init:
	octez-client --endpoint https://rpc.ghostnet.teztnets.com config update
	octez-client import secret key myself unencrypted:$(PRIVATE_KEY)
	octez-client remember contract contact1 $(CONTACT1_KEY)
	octez-client remember contract contact2 $(CONTACT2_KEY)
	completium-cli import privatekey $(PRIVATE_KEY) as myself

build-js:
	mkdir -p build
	completium-cli generate javascript src/share.arl > build/share.json

test:
	npm run gen-binding
	completium-cli set endpoint mockup
	completium-cli mockup init
	npm run test