export default class MessageQueue {

    static STATUS = {
        pending: 'pending',
        fullfilled: 'fullfilled'
    }

    constructor() {
        this.taskQueue = [];
    }

    add(promiseCreator) {
        return new Promise(resolve => {
            this.taskQueue.push({
                promise: promiseCreator,
                status: MessageQueue.STATUS.pending,
                resolveFn: resolve
            });

            promiseCreator().then(data => this.resolveTask(promiseCreator, resolve, data));
        });
    }

    resolveTask(promise, resolve, value) {
        const canResolveCurrentTask = this.taskQueue[0].promise === promise;

        if (canResolveCurrentTask) {
            resolve(value);
            this.taskQueue.shift();
            this.resolveFullfilledTasks();
        } else {
            this.markFullfilled(promise, value);
        }
    }

    markFullfilled(promise, value) {
        const currentTask = this.taskQueue.find(task => task.promise === promise);
        if (currentTask.status === MessageQueue.STATUS.pending) {
            currentTask.status = MessageQueue.STATUS.fullfilled;
            currentTask.resolveVal = value;
        }
    }

    resolveFullfilledTasks() {
        while (this.taskQueue.length &&
            this.taskQueue[0].status === MessageQueue.STATUS.fullfilled
        ) {
            const { resolveFn, resolveVal } = this.taskQueue[0];
            resolveFn(resolveVal);
            this.taskQueue.shift();
        }
    }

}