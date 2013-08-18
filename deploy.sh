BIN_DIR="bin"
PUBLISH_DIR="gh-pages"

#Prepare Directories
if [ ! -d "$PUBLISH_DIR" ]; then
	mkdir $PUBLISH_DIR
	git clone git@github.com:janslow/rag-ball-2013.git -b gh-pages $PUBLISH_DIR
fi

cp -fR $BIN_DIR/ $PUBLISH_DIR/

cd $PUBLISH_DIR

git add .
git commit -a -m "Automated Commit"
git push origin gh-pages