// import SAPUseCase from './usecases/SAPUseCase';
import { Given, When, Then } from '@cucumber/cucumber';
// Assuming you're using Playwright for page interaction
import { chromium, Browser, Page } from 'playwright';

// Initialize a browser and page object globally
let browser: Browser;
let page: Page;

const And = Then;


Given('Operator logged in SAP', async () => {
  browser = global.context;
  page = global.page;

  await page.goto('https://cityshob-dev.aiweb.services', { waitUntil: 'load' });
  (await page.waitForSelector('input#email',)).fill('web9_dev3');
  (await page.waitForSelector('input#password',)).fill('1qaz2wsx');
  await page.click('.p-button');
})

And('Operator switches to English language', async () => {

  let langOption = `li[aria-label="English"]`;
  await page.click('app-language-switcher');
  await page.click(langOption);
});

And("Operator adds new workspace using preset Events", async () => {
  await page.click('button.app-workspace-add-btn')
  await page.click('app-presets-picker p-dropdown .p-dropdown-trigger')
  await page.click('app-presets-picker p-dropdown .p-dropdown-item:first-child');
  await page.fill('app-workspace-wizard input#workspace_name', 'SAP_EVENTS')
  await page.click('app-workspace-wizard button[type="submit"]')
})

And("Operator opens Create new event window", async () => {
  await page.click('.app-navbar p-button');
})

And("Operator fills minimum set of event properties", async (dataTable) => {

  const tableHashes: any = {};
  dataTable.rawTable.forEach(([key, value]) => {
    tableHashes[key] = value;
  });
  const {
    "event type": eventType,
    "event sub type": eventSubType,
    "event sub sub type": eventSubSubType,
    "event lat": lat,
    "event lon": lng } = tableHashes;

  const _eventTypeOption = `li[aria-label="${eventType}"]`;
  const _eventSubTypeOption = `li[aria-label="${eventSubType}"]`;
  const _eventSubSubTypeOption = `li[aria-label="${eventSubSubType}"]`

  await page.click('app-event-type-picker > p-dropdown')
  await page.click(_eventTypeOption);
  await page.click('app-event-subtype-picker > p-dropdown')
  await page.click(_eventSubTypeOption);

  await page.click("app-event-details-properties tr:nth-child(3) app-event-subtype-picker > p-dropdown");
  await page.click(_eventSubSubTypeOption);

  await page.fill('#lat', lat)
  await page.fill('#lng', lng)
})

And("Operator clicks Save button", async () => {
 await page.click('.app-p-sidebar-footer button.p-button-primary');
})