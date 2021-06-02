import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-notifications", "--mute-audio", "--enable-automation"],
        ignoreDefaultArgs: true
    });

    // going to sign-in page
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();
    await page.goto("https://accounts.google.com/");

    const context = browser.defaultBrowserContext();
    await context.overridePermissions(
        "https://meet.google.com/", ["microphone", "camera", "notifications"]
    );

    await navigationPromise;

    // email
    await page.waitForSelector('input[type="email"]');
    await page.click('input[type="email"]');
    await navigationPromise;
    await page.keyboard.type(`chandlerbingc78@gmail.com`, { delay: 300 });  
    await page.waitForTimeout(2000);

    await page.waitForSelector("#identifierNext");
    await page.click("#identifierNext");

    // password
    await page.waitForTimeout(3500);
    await page.keyboard.type(`Chandler@123`, { delay: 200 });  
    await page.waitForTimeout(800);
    await page.keyboard.press('Enter');
    await navigationPromise;

    // going to Meet after signing in
    await page.waitForTimeout(2500);
    await page.goto("https://meet.google.com/");
    await page.waitForSelector('input[type="text"]');
    await page.click('input[type="text"]');
    await page.waitForTimeout(1000);
    await page.keyboard.type(`evy-ukid-jow`, { delay: 200 });  
    await page.waitForTimeout(800);
    await page.keyboard.press('Enter');
    await navigationPromise;

    // turn off cam using Ctrl+E
    await page.waitForTimeout(8000);
    await page.keyboard.down('ControlLeft');
    await page.keyboard.press('KeyE');
    await page.keyboard.up('ControlLeft');
    await page.waitForTimeout(2000);

    //turn off mic using Ctrl+D
    await page.waitForTimeout(1000);
    await page.keyboard.down('ControlLeft');
    await page.keyboard.press('KeyD');
    await page.keyboard.up('ControlLeft');
    await page.waitForTimeout(2000);
    
    
    //Join Now
    var i;
    for (i=1; i<=6; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(800);
    }
    await page.keyboard.press('Enter');
    await navigationPromise;

    await page.waitForSelector(".NPEfkd.RveJvd.snByac");
    await page.click(".NPEfkd.RveJvd.snByac");

    // open chat section and send a message to all
    await page.waitForTimeout(3000);
    for (i=1; i<=2; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(600);
    }
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1500);
    await page.keyboard.type("Good Morning", { delay: 100 });
    await page.keyboard.press('Enter');

    // close the chat box
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // turn on captions
    await page.waitForTimeout(2000);
    for (i=1; i<=6; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(600);
    }
    await page.keyboard.press('Enter');   

})();
