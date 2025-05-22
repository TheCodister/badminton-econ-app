import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('https://badminton-econ-app-nkv4.vercel.app/')

WebUI.closeBrowser()

WebUI.openBrowser('')

WebUI.navigateToUrl('https://badminton-econ-app-nkv4.vercel.app/')

WebUI.click(findTestObject('Object Repository/Page_/div_Accessories_inline-flex w-full items-ce_d29f3c'))

WebUI.click(findTestObject('Object Repository/Page_/input_Accessories_react-aria-R1ab6'))

WebUI.setText(findTestObject('Object Repository/Page_/input_Accessories_react-aria-R1ab6'), 'Yonex')

WebUI.click(findTestObject('Object Repository/Page_/li_Yonex Arcsaber 2 Feel47.46'))

WebUI.click(findTestObject('Object Repository/Page_/li_Yonex Arcsaber 2 Feel47.46'))

WebUI.click(findTestObject('Object Repository/Page_/img_Accessories_relative z-10 opacity-0 sha_e10090'))

WebUI.closeBrowser()

