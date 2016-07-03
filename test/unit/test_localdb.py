# -*- coding: utf-8 -*-
"""
Copyright (C) 2016, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
"""
import unittest
import logging
from findfine_crawler.localdb import LocalDbForKKDAY
"""
測試 本地端資料庫存取
"""
class LocalDbTest(unittest.TestCase):

    #準備
    def setUp(self):
        logging.basicConfig(level=logging.INFO)
        
    #收尾
    def tearDown(self):
        pass
    
    #測試 kkday 本地端資料庫存取
    def test_localdb_for_kkday(self):
        logging.info("LocalDbTest.test_localdb_for_kkday")
        db = LocalDbForKKDAY()
        db.clearTestData() #清除前次測試資料
        db.insertCountryIfNotExists(strCountryPage1Url="http://country_for_unit_test")
        self.assertEqual(db.fetchallNotObtainedCountryUrl(), ["http://country_for_unit_test"])
        db.updateCountryStatusIsGot(strCountryPage1Url="http://country_for_unit_test")
        self.assertEqual(db.fetchallCompletedObtainedCountryUrl(), ["http://country_for_unit_test"])
        db.insertProductUrlIfNotExists(strProductUrl="http://product/for/unit/test", strCountryPage1Url="http://country_for_unit_test")
        self.assertEqual(db.fetchallProductUrlByCountryUrl(strCountryPage1Url="http://country_for_unit_test"), ["http://product/for/unit/test"])
        self.assertFalse(db.checkProductIsGot(strProductUrl="http://product/for/unit/test"))
        db.updateProductStatusIsGot(strProductUrl="http://product/for/unit/test")
        self.assertTrue(db.checkProductIsGot(strProductUrl="http://product/for/unit/test"))
        self.assertEqual(db.fetchallCompletedObtainedProductUrl(), ["http://product/for/unit/test"])
        db.updateProductStatusIsNotGot(strProductUrl="http://product/for/unit/test")
        self.assertFalse(db.checkProductIsGot(strProductUrl="http://product/for/unit/test"))
        db.clearTestData() #清除本次測試資料
    
#測試開始
if __name__ == "__main__":
    unittest.main(exit=False)

