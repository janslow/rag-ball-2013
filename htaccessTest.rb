require 'term/ansicolor'

class String
  include Term::ANSIColor
end

def main
  agents = { window: 'chrome', mobile: 'android', simple: 'msie' }
  targets = { window: 'window', mobile: 'mobile', simple: 'simple' }
  cookies = { window: ' -b version=window', mobile: ' -b version=mobile', simple: ' -b version=simple', none: '' }
  pages = ['home/', 'committee/']

  pages.each do |page|
    agents.each do |agent_type, agent|
      targets.each do |target_type, target|
        cookies.each do |cookie_type, cookie|
          cmd = "curl -s -A #{agent}#{cookie} --head http://www.oxfordragball.co.uk/#{target}/"
          cmd += "#{page}" unless target_type == :window
          puts cmd
          result = `#{cmd}`
          result = result.split("\r\n")
          http = result.shift
          result = Hash[*result.map {|i| i.split(': ')}.flatten]
          puts http
          puts "Cookie: " + result['Set-Cookie'] if result['Set-Cookie']
          puts "Location: " + result['Location'] if result['Location']

          if cookie_type == :none && !result['Set-Cookie']
            valid = false
            puts 'Cookie Error (expected set)'.red
          elsif cookie_type != :none && result['Set-Cookie']
            valid = false
            puts "Cookie Error (didn't expect set)".red
          end
          if target_type == cookie_type || (cookie_type == :none && target_type == agent_type)
            puts "Location Error (didn't expect redirect)".red if result['Location']
            puts "Location Error (expected 200 OK)".red unless http == 'HTTP/1.1 200 OK'
          else
            if result['Location']
              end_target = targets[cookie_type == :none ? agent_type : cookie_type]
              end_page = end_target == targets[:window] ? '' : (target_type == :window ? 'home/' : page)
              expected = "http://www.oxfordragball.co.uk/#{end_target}/#{end_page}"
              if result['Location'] != expected
                puts "Location Error (expected #{expected})".red
              end
            else 
              puts 'Location Error (expected redirect)'.red 
            end
            puts "Location Error (expected 302 Found)".red unless http == 'HTTP/1.1 302 Found'
          end
          puts
        end
      end
    end
  end
end
  main