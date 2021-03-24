class Loader {
    isLoading = false;
    constructor(selector=".loader", interval= 1000) {
        console.log("sss")
        this.interval = interval;
        this.isLoading = false;
        this.elem = document.querySelector(selector);
    }
    startLoading() {
        this.isLoading = true;
        this.updateInterval = setInterval(() => {this.updateLoader();}, this.interval);
    }
    stopLoading() {
        this.isLoading = false;
        clearInterval(this.updateInterval);
    }
    getState() {
        return this.isLoading;
    }
    updateLoader() {
        console.log("test")
        if (this.elem.textContent.length === 3) {
            this.elem.textContent = ".";
            return 0;
        }
        this.elem.textContent += ".";
    }
}