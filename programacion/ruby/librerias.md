Para importar una:
require 'nombre'


require_relative complements the builtin method require by allowing you to load a file that is relative to the file containing the require_relative statement.
For example, if you have unit test classes in the "test" directory, and data for them under the test "test/data" directory, then you might use a line like this in a test case:
require_relative "data/customer_data_1"
