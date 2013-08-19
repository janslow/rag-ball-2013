#!/usr/bin/env ruby
require 'rubygems'
require 'nokogiri'
# Open the remote document, or from local file
require 'open-uri' # load open-uri library if the input is from the Internet

input_file = ARGV[0]
output_file = ARGV[1]
doc = Nokogiri::HTML(open(input_file))
application_script_added = false
# Search for link tags:
doc.css('link').each do |link|
	link['href'] = link['href'].sub(".css",".min.css")
end
doc.css('script').each do |link|
	if link['src'] == 'js/jquery-2.0.3.min.js'
		link['src'] = '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'
	elsif application_script_added
		link.remove
	else
		application_script_added = true
		link['src'] = 'js/application.min.js'
	end
end

File.open(output_file, 'w') {|f| f.write(doc.to_html) }