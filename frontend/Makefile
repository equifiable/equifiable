build-docker:
	docker build -t equifiable_front .

run-docker:
	docker run -it -v $(PWD):/usr/src/app \
		-e NODE_OPTIONS=--openssl-legacy-provider \
		-p 3000:3000 -p 9005:9005 equifiable_front bash
