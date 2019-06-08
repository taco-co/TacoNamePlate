
export module EventManager {
    var registeredHandlers: any = {}

    export function addHandler(eventName: string, handler: Function): void {
        let handlers: any[] = registeredHandlers[eventName];

        if (handlers == null) {
            handlers = [];
            registeredHandlers[eventName] = handlers;
        }

        handlers.push(handler);
    }

    export function removeHandler(eventName: string, handler: Function): void {
        let handlers: any[] = registeredHandlers[eventName];

        if (handlers == null || handlers.length === 0)
            return;

        for (let i = handlers.length; i >= 0; --i) {
            if (handlers[i] == handler) {
                handlers.splice(i, 1);
                return;
            }
        }
    }

    /**
     * Dispatches an event to all registered handlers (in the order that they were registered).
     * Returns a Promise which resolves to a boolean indicating wether the event completed without being cancelled, if isCancellable is true.
     * If isCancellable is false, the promise will always resolve to true.
     * 
     * @param eventName The name of the event to be dispatched.
     * @param data (Optional) An object containing additional data to be passed to the event handlers.
     * @param isCancellable Specifies wether this event can be cancelled by handlers or not.
     */
    export async function dispatchAsync(eventName: string, data: any, isCancellable: boolean = true): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            if (eventName == null || typeof(eventName) !== "string" || eventName === "")
                throw new Error("Invalid event name.");
            
            console.log("Dispatching '" + eventName + "' event.");

            try {
                const handlers: Function[] = registeredHandlers[eventName];
    
                if (!registeredHandlers.hasOwnProperty(eventName) || handlers == null || handlers.length === 0) {
                    resolve(true);
                    return;
                }
    
                for (let i = 0, len = handlers.length; i < len; ++i) {
                    let handler = handlers[i];
    
                    if (handler == null)
                        continue;
                    
                    let eventData = {
                        eventName: eventName,
                        isCancellable: isCancellable,
                        isCancelled: false,
                        data: data
                    };

                    try {
                        await handler(eventData);
                    } catch (handlerError) {
                        console.error("An error has occurred during an event handler for '" + eventName + "'. Error: " + handlerError.toString());
                    }
                    
                    if (isCancellable && eventData.isCancelled)  {
                        console.log("Event '" + eventName + "' cancelled.");

                        resolve(false);
                        return;
                    }
                }
    
                resolve(true);
                return;

            } catch (error) {
                console.error("An error has occurred while dispatching the '" + eventName + "' event. Error: " + error.toString());
                reject(error);
            }
        })
    }
}
