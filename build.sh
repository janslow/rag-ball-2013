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

#Compile JavaScript
juicer merge -fo $OUTPUT_DIR/js/application.min.js $SITE_DIR/js/scrolling.js $SITE_DIR/js/resize.js

#Copy and rewrite HTML
./rewrite.rb $SITE_DIR/index.html $OUTPUT_DIR/index.html