deploy-staging:
	git push --delete origin staging || echo "No remote tag staging"
	git tag --delete staging || echo "No local tag staging"
	git tag staging
	git push
	git push --tag