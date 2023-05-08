// we want to pull out Builder, By, Key and until from the selenium library
const {Builder,By, Key,until} = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');
// We import should () from chai
const should = require('chai').should();

async function googleSearch(){
    // Creat new instance of firefox 
   let driver = await new Builder ().forBrowser('firefox').build();

   try{
    // Go to google.com
    await driver.get('http://www.google.com');
    // Find the accept cookies button
    let coockieButton = await driver.findElements(By.css('.QS5gu.sy4vM'));
    // Click the accept cookies button
    await coockieButton[1].click();
    // Wait until the element is located, in this case search bar
    await driver.wait(until.elementLocated(By.name('q')),10000);
    // Selenium is too fast; better wait 1 second / 1000 ms
    await driver.sleep(1000);
    // Write somthing in th search bar and push 
    await driver.findElement(By.name('q')).sendKeys('Selenium', Key.ENTER);
    // Wait until elements are loctaed
    await driver.wait(until.elementLocated(By.css('h3')),10000);
    // Get the link text
    let firstLink = await driver.findElement(By.css('h3'));
    let linkText = await firstLink.getText();

    // Assert linkText
    linkText.should.equal('Selenium');

    if(linkText === 'Selenium'){
        await firstLink.click();
    }else{
        console.log('First link is not "Selenium".');
    }
    // wait until site loads and displays a little

    await driver.wait(until.titleContains('Selenium'),10000);
    // get the tirle
    let title = await driver.getTitle();
    //assert the title
    title.should.include('Selenium');
    




   }catch(error){
    console.log(error);
   }finally{
    console.log('test ran successfully.');
    await driver.quit();
   }
}

googleSearch();
