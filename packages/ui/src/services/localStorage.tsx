

// Base service class for localStorage
export class LocalStorageServiceBase<T> {
  constructor(private storageKey: string) { }

  protected getItems(): Promise<T[]> {
    return new Promise((resolve) => {
      const data = localStorage.getItem(this.storageKey);
      resolve(data ? JSON.parse(data) : []);
      return Promise.resolve();
    });
  }

  protected saveItems(items: T[]): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
      resolve();
    });
  }

  create(item: T): Promise<T> {
    return this.getItems().then((items) => {
      items.push(item);
      return this.saveItems(items).then(() => item); // Return the newly created item
    });
  }

  read(id: string): Promise<T | null> {
    return this.getItems().then((items) => {
      return items.find((item: any) => item.id === id) || null;
    });
  }

  readAll(): Promise<T[]> {
    return this.getItems();
  }

  update(id: string, updatedItem: T): Promise<void> {
    return this.getItems().then((items) => {
      const index = items.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        return this.saveItems(items);
      }
      return Promise.resolve(); // Return a resolved promise if the item is not found
    });
  }

  delete(id: string): Promise<void> {
    return this.getItems().then((items) => {
      const filteredItems = items.filter((item: any) => item.id !== id);
      return this.saveItems(filteredItems);
    });
  }
}

