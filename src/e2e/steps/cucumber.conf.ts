// cucumber.conf.js file
require('dotenv').config();
import {
  Before,
  BeforeAll,
  AfterAll,
  After,
  setDefaultTimeout,
} from '@cucumber/cucumber'
import { chromium } from 'playwright';

setDefaultTimeout(60000);

// launch the browser
BeforeAll(async function () {
  const headless = process.env.HEADLESS !== 'false';
  const contextOptions = {
    slowMo: 1000,
    headless,
  }


  global.browser = (await chromium.launch(contextOptions))
});

// close the browser
AfterAll(async function () {
  await global.browser.close();
});

Before(async function (scenario) {
  const scenarioName = scenario.pickle.name.replace(/\W+/g, '-').toLowerCase();
  const videoDir = `videos/${scenarioName}`;
  console.log(scenarioName)
  const recordVideo = process.env.ENABLE_VIDEO_CAPTURE === 'true';
  const contextOptions = { viewport: { width: 1920, height: 1080 } }
  if (recordVideo) {
    contextOptions['recordVideo'] = {
      dir: videoDir,
      size: { width: 1280, height: 720 }
    }
  }

  global.context = await global.browser.newContext(contextOptions);
  global.page = await global.context.newPage();
});

// Cleanup after each scenario
After(async function () {
  await global.page.waitForTimeout(1000);
  // await global.page.close();
  // await global.context.close();
});
