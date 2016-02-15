karlSum = 0
for i = 1, 100 do  -- The range includes both ends.
  karlSum = karlSum + i
end

-- In general, the range is begin, end[, step].

-- Another loop construct:
repeat
  print('the way of the future')
  num = num - 1
until num == 0


while num < 50 do
  num = num + 1  -- No ++ or += type operators.
end



for key, val in pairs(u) do  -- Table iteration.
  print(key, val)
end
