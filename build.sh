SITE_DIR="site"
OUTPUT_DIR="bin"

#Prepare Directories
mkdir -p $OUTPUT_DIR/css $OUTPUT_DIR/js $OUTPUT_DIR/img

#Copy Images
# cp $SITE_DIR/img/*.jpg $OUTPUT_DIR/img/
cp -f $SITE_DIR/img/*.png $OUTPUT_DIR/img/

#Copy and Compile SCSS
cp -f $SITE_DIR/css/*.css $OUTPUT_DIR/css/
sass -f $SITE_DIR/css/main.scss $OUTPUT_DIR/css/main.css
juicer merge --force $OUTPUT_DIR/css/main.css

#Copy and Compile JavaScript
cp -f $SITE_DIR/js/*.js $OUTPUT_DIR/js/
juicer merge --force --skip-verification $OUTPUT_DIR/js/scrolling.js

#Copy and rewrite HTML
./rewrite.rb $SITE_DIR/index.html $OUTPUT_DIR/index.html