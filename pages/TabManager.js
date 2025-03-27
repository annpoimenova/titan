class TabManager {
    constructor(context) {
        this.context = context;
    }

    async checkTabs() {
        let pages;
        
        if (typeof this.context.pages === 'function') {
            pages = await this.context.pages(); 
        } else if (typeof this.context.browser === 'object') {
            pages = await this.context.browser.pages();
        } else {
            console.error("No method to get pages found on context or browser.");
            return;
        }
        
        if (pages.length >= 2) {
            console.log("There are at least two tabs.");
        } else {
            console.log("There are fewer than two tabs.");
        }
    }
}

export default { TabManager };
