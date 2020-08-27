export default class Scheduler {

    constructor(maxTask) {
        this.maxTask = maxTask || 2;
        this.taskQueue = [];
        this.currentRunning = 0;
    }

    add(promiseCreator) {
        return new Promise(resolve => {
            if (this.currentRunning < this.maxTask) {
                this.execNextTask(promiseCreator, resolve);
            } else {
                this.taskQueue.push({
                    promise: promiseCreator,
                    resolve
                });
            }

        });
    }

    execNextTask(...args) {
        let promise;
        let resolve;

        this.currentRunning++;

        if (args.length) {
            [promise, resolve] = args;
        } else {
            const task = this.taskQueue.shift();
            promise = task.promise;
            resolve = task.resolve;
        }

        promise().then(() => {
            this.currentRunning--;
            resolve();
            if (this.taskQueue.length) {
                this.execNextTask();
            }
        });
    }

}