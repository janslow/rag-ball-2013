BIN_DIR="bin"
PUBLISH_DIR="gh-pages"

#Prepare Directories
if [ ! -d "$PUBLISH_DIR" ]; then
	mkdir $PUBLISH_DIR
	git clone git@github.com:janslow/rag-ball-2013.git -b gh-pages $PUBLISH_DIR
fi

cd $PUBLISH_DIR
rm -R *
cp -fR ../$BIN_DIR/ .

if [ -n "$1" ]; then
	COMMIT_MSG=$1
else
	COMMIT_MSG="Automated Commit"
	echo "Using default commit message"
fi

git add .
git commit -a -m $COMMIT_MSG
git push origin gh-pages