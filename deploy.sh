#!/bin/sh
BIN_DIR="bin"
PUBLISH_DIR="gh-pages"
USAGE_MSG="Usage: ./deploy.sh commit_message"

#Create Directories and clone GitHub Branch
if [ ! -d "$PUBLISH_DIR" ]; then
	mkdir $PUBLISH_DIR
	git clone git@github.com:janslow/rag-ball-2013.git -b gh-pages $PUBLISH_DIR
fi

# Clear Publish dir
cd $PUBLISH_DIR
rm -R *

cp -fR ../$BIN_DIR/ .
cp -f ../CNAME .

if [ ! -n "$1" ]; then
	echo "Please supply a commit message"
	echo "$USAGE_MSG"
elif [ -n "$2" ]; then
	echo "Unknown second argument"
	echo "$USAGE_MSG"
else
	git add .
	git commit -a -m "$1"
	git push origin gh-pages
fi