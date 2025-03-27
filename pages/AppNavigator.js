class AppNavigator { 
    constructor(page, containerSelector) {
        this.page = page;
        this.containerSelector = containerSelector;
    }

    
    async getAppTestIds() {
        const appElements = await this.page.locator(`${this.containerSelector} > *`).all();
        return Promise.all(appElements.map(app => app.getAttribute('data-testid')));
    }

    
    async getCurrentAppIndex() {
        const testIds = await this.getAppTestIds();
        console.log(testIds);
        for (let i = 0; i < testIds.length; i++) {
            const appLocator = this.page.locator(`${this.containerSelector} > [data-testid="${testIds[i]}"]`);
            const isFocused = await appLocator.getAttribute('data-focused');
            if (isFocused === 'focused') {
                
                return i;
                
            }
        }
        return 0; 
    }

   
    async getAppIndex(appName) {
        const testIds = await this.getAppTestIds();
        return testIds.findIndex(testId => testId === appName);
    }

    
    async navigateToApp(targetIndex) {
        const currentIndex = await this.getCurrentAppIndex();
        const steps = targetIndex - currentIndex;

        if (steps > 0) {
            for (let i = 0; i < steps; i++) {
                await this.page.keyboard.press('ArrowRight');
                await this.page.waitForTimeout(200);
            }
        } else if (steps < 0) {
            for (let i = 0; i < Math.abs(steps); i++) {
                await this.page.keyboard.press('ArrowLeft');
                await this.page.waitForTimeout(200);
            }
        }
    }


    async selectAppByName(appName) {
        const targetIndex = await this.getAppIndex(appName);
        await this.navigateToApp(targetIndex);
        await this.page.keyboard.press('Enter', { delay: 1000 });
    }

    async deleteAppByName(appName) {
        const targetIndex = await this.getAppIndex(appName);
        await this.navigateToApp(targetIndex);
        await this.page.keyboard.press('Enter', { delay: 2000 });
        await this.page.waitForTimeout(300);
        await this.page.keyboard.press('ArrowDown');
        await this.page.waitForTimeout(300);
        await this.page.keyboard.press('Enter', { delay: 1000 });
        await this.page.waitForTimeout(5000);
        await this.verifyAppRemoved(appName);
    }


    async verifyAppRemoved(appName) {
        const isAbsent = await this.isAppAbsent(appName);
        if (!isAbsent) {
            throw new Error(`Application "${appName}" was not deleted!`);
        } else {
            console.log(`Application "${appName}" successfully deleted.`);
        }
    }

    async isAppAbsent(appName) {
        const appLocator = this.page.locator(`${this.containerSelector} [data-testid="${appName}"]`);
        const isVisible = await appLocator.isVisible();
        const count = await appLocator.count();
        return count === 0 || !isVisible;
    }
}

export default { AppNavigator };
