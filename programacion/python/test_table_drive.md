https://lorenzopeppoloni.com/tabledriventestspy/


```
import unittest
from dataclasses import dataclass
from typing import List


class TestMySort(unittest.TestCase):
    def test_my_sort(self):
        @dataclass
        class TestCase:
            name: str
            input: List[float]
            expected: List[float]

        testcases = [
            TestCase(name="empty_slice", input=[], expected=[]),
            TestCase(name="already_sorted", input=[1, 4, 6, 8], expected=[1, 4, 6, 8]),
            TestCase(name="not_sorted", input=[1, 8, 3, 5], expected=[1, 3, 5, 8]),
        ]

        for case in testcases:
            actual = my_sort(case.input)
            self.assertListEqual(
                case.expected,
                actual,
                "failed test {} expected {}, actual {}".format(
                    case.name, case.expected, actual
                ),
            )
```
