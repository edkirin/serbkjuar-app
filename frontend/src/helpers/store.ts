enum StoreKeysEnum {
    LOG_VISIBLE = "logVisible",
}

class StoreBase {
    storage = localStorage;

    serialize(data: object): string {
        return JSON.stringify(data);
    }

    deserialize(str: string): object {
        return JSON.parse(str);
    }

    setItem(key: string, value: string): void {
        this.storage.setItem(key, value);
    }

    setOrRemoveItem(key: string, value: string | null): void {
        if (value !== null) {
            this.storage.setItem(key, value);
        } else {
            this.removeItem(key);
        }
    }

    getItem(key: string): string | null {
        return this.storage.getItem(key);
    }

    setObject(key: string, obj: object): void {
        this.setItem(key, this.serialize(obj));
    }

    setOrRemoveObject(key: string, obj: object | null): void {
        if (obj) {
            this.setObject(key, obj);
        } else {
            this.removeItem(key);
        }
    }

    getObject(key: string): object | null {
        const itemData = this.getItem(key);
        return itemData ? this.deserialize(itemData) : null;
    }

    clear(): void {
        this.storage.clear();
    }

    removeItem(key: string): void {
        this.storage.removeItem(key);
    }
}

export class SessionStore extends StoreBase {
    storage = sessionStorage;
}

export class LocalStore extends StoreBase {
    storage = localStorage;

    get logVisible(): boolean {
        const value = this.getItem(StoreKeysEnum.LOG_VISIBLE);
        return value === null || value === "true";
    }
    set logVisible(value: boolean) {
        this.setItem(StoreKeysEnum.LOG_VISIBLE, value ? "true" : "false");
    }
}

export const sessionStore = new SessionStore();
export const localStore = new LocalStore();
