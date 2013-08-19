SITE_DIR="site"
OUTPUT_DIR="bin"

#Clean output directory
rm -R $OUTPUT_DIR/*

#Create Directories
mkdir -p $OUTPUT_DIR/css $OUTPUT_DIR/js $OUTPUT_DIR/img

#Copy Images
cp -f $SITE_DIR/img/* $OUTPUT_DIR/img/

#Copy and Compile SCSS
cp -f $SITE_DIR/css/*.css $OUTPUT_DIR/css/
sass -f $SITE_DIR/css/main.scss $OUTPUT_DIR/css/main.css
juicer merge -fo $OUTPUT_DIR/css/site.min.css $OUTPUT_DIR/css/main.css

#Compile JavaScript
juicer merge -fo $OUTPUT_DIR/js/application.min.js $SITE_DIR/js/scrolling.js $SITE_DIR/js/resize.js

#Copy and rewrite HTML
./rewrite.rb $SITE_DIR/index.html $OUTPUT_DIR/index.html