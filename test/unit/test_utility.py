# -*- coding: utf-8 -*-
"""
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
"""
import unittest
import logging
from cameo.utility import Utility
"""
測試 Utility
"""
class UtilityTest(unittest.TestCase):
    
    #準備
    def setUp(self):
        logging.basicConfig(level=logging.INFO)
        self.utility = Utility()
        
    #收尾
    def tearDown(self):
        pass
    
    
#測試開始
if __name__ == "__main__":
    unittest.main(exit=False)


