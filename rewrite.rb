#!/usr/bin/env ruby

require 'rubygems'
require 'nokogiri'

#Terminal Colours
require 'term/ansicolor'
include Term::ANSIColor

input_file = ARGV[0]
output_file = ARGV[1]
js_file = ARGV[2] || 'js/application.min.js'
css_file = ARGV[3] || 'css/site.min.css'

print white, bold, 'Rewriting ', yellow, input_file, white, ':', reset, "\n"

doc = Nokogiri::HTML(open(input_file))

def print_rewrite(original, updated, special=false)
	print "\t\t", yellow, original, reset, ' => '
	if updated
		print (special ? blue : green), updated, reset
	else
		print red, 'null'
	end
	print reset, "\n"
end

application_stylesheet_added = false
puts "\tRewriting Link Tags"
doc.css('link').each do |link|
	if link['rel'] == 'stylesheet'
		if application_stylesheet_added
			print_rewrite link['href'], nil
			link.remove
		else
			print_rewrite link['href'], css_file
			application_stylesheet_added = true
			link['href'] = css_file
		end
	end
end

application_script_added = false
jquery_pattern = /^(.*\/)?jquery-([\d\.]*)(\.min)?\.js$/i

puts "\tRewriting Script Tags"
doc.css('script').each do |link|
	if match = jquery_pattern.match(link['src'])
		version = match[2]
		print_rewrite link['src'], "jQuery (v#{version}) at Google APIs", true
		link['src'] = "//ajax.googleapis.com/ajax/libs/jquery/#{version}/jquery.min.js"
	elsif application_script_added
		print_rewrite link['src'], nil
		link.remove
	else
		print_rewrite link['src'], js_file
		application_script_added = true
		link['src'] = js_file
	end
end

print "", bold, white, 'Saving to ', green, output_file, reset, "\n"

File.open(output_file, 'w') {|f| f.write(doc.to_html) }