#!/bin/sh

SCSS_DIR="scss"
SOURCE_DIR="site"
CSS_DIR="$SOURCE_DIR/css"

OUTPUT_DIR="bin"

SCSS_MAPPINGS="$SCSS_DIR/window.scss:$CSS_DIR/window.css"

USAGE_MSG="usage: watch.sh [ jekyll | scss ]"
if [ ! -n "$1" ]; then
  echo "Missing command"
  echo $USAGE_MSG
elif [ "$1" == "jekyll" ]; then
  jekyll serve -s $SOURCE_DIR -d $OUTPUT_DIR --watch --port 8000
elif [ "$1" == "scss" ]; then
  sass --watch $SCSS_MAPPINGS
else
  echo "Invalid command"
  echo $USAGE_MSG
fi