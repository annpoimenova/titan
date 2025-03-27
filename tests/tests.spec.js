const { test, expect } = require('@playwright/test');
const { AppNavigator } = require('../pages/AppNavigator').default;
const { TabManager } = require('../pages/TabManager').default;

test('Verify we can add an app to home page favourites apps from apps page', async ({ page }) => {
    const mainMenu = new AppNavigator(page, '[class="sc-fLDLck NFBrn"]'); 
    const appsPage = new AppNavigator(page, '[data-testid="list-item-app_list-0"] > div:nth-child(2)'); 
  
    await page.goto('');
    await page.waitForTimeout(5000); 
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await mainMenu.selectAppByName('main-menu-item-Apps');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await appsPage.selectAppByName('Free Games by PlayWorks');
    await page.keyboard.press('Enter');
  });

test('Verify we can delete apps in the home pages favourite apps row', async ({ page }) => {
  const favoriteApps = new AppNavigator(page, '[id="favourite-apps"]'); 

  await page.goto('');
  await page.waitForTimeout(5000); 

  await favoriteApps.deleteAppByName('Casting');
});

test('Verify we can open a category from the search page', async ({ page }) => {
    const mainMenu = new AppNavigator(page, '[class="sc-fLDLck NFBrn"]'); 
    const appsPage = new AppNavigator(page, '[data-testid="grid-wrapper"] > div'); 
    const movieList = new AppNavigator(page, '[data-testid="list-item-movie-1"] > div:nth-child(2)'); 
  
    await page.goto('');
    await page.waitForTimeout(5000); 
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await mainMenu.selectAppByName('main-menu-item-Search');
    await page.waitForTimeout(5000);
    await page.keyboard.press('ArrowDown');
    await appsPage.selectAppByName('Adventure');
    await page.keyboard.press('ArrowDown');
    await movieList.selectAppByName('The Incredible Adventures of Professor Branestawm');
  });

  test('Verify channels page is available to use', async ({ page }) => {
    const mainMenu = new AppNavigator(page, '[class="sc-fLDLck NFBrn"]'); 
    const tabManager = new TabManager(page);
  
    await page.goto('');
    await page.waitForTimeout(5000); 
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await mainMenu.selectAppByName('main-menu-item-Channels');
    await page.waitForTimeout(5000); 
    await tabManager.checkTabs();
    
  });

