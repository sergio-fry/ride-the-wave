guard 'shell'  do
  def run_test(test)
    expresso_bin = File.expand_path(File.dirname(__FILE__) + "/node_modules/expresso/bin/expresso")
    print "running #{test}:\n"
    `#{expresso_bin} #{test}`
  end

  watch(%r{^app/(.+)\.js})  { |m| run_test("test/#{m[1]}_test.js") }
  watch(%r{^test/(.+)_test\.js})  { |m| run_test("test/#{m[1]}_test.js") }
end

